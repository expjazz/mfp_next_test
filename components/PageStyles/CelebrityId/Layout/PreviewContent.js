import { useMediaQuery } from '@material-ui/core'
import { useScroll } from 'customHooks/domUtils/useScroll'
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { editModals, useGeneral } from 'src/context/general'
import { getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos } from 'src/services/myfanpark'
import { tabsList } from 'src/constants/stars/celebrityId'
import { useTransition } from '@react-spring/core'
import { ThemeProvider } from '@emotion/react'
import StarHeader from '../components/StarHeader'
import HeaderV3 from 'components/HeaderV3'
import { ExpWrapper } from '../styled'
import ReqList from '../components/ReqList'
import HowWorks from 'components/HowWorks'
import PostSection from '../components/PostSection'
import { formatTopProds } from '../components/TopProducts/utils'
import { createPortal } from 'react-dom'
import { accountStatus } from 'src/constants/stars/accountStatus'
import { starAllowedServices } from '../constants'
import { isCelebLocStorage } from 'src/utils/localStorageUtils'
function PreviewContent(props) {
  const router = useRouter()
  useEffect(() => {
    router.prefetch(`/${celebrityId}/bio`)
  }, [])
  const { celebrityId } = router.query
  const getUserId = () => {
    return celebrityId.toLowerCase()
  }
  const [state, dispatch] = useGeneral()
  const { filters: { dynamicFilter } } = state
  // dummy commit
  const [showExpHead, toggExpHead] = useState(false);
  const { entityId, entityToken } = props.partnerData
  const { data } = useGetPartner()
  const { partnerData, currencyData: apiCurrency, languageData  } = data
  const currencyData = state?.currencyData || apiCurrency;
  const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData()
  const { data: featuredVideosData, isLoading: featuredVideoLoading, error: featuredError } = useQuery(['featuredVideos', celebrityId], () => getFeaturedVideos({ celebrityId, limit: 20, offset: 0 }))
  const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }))
  const { data: celebritySocialData, isLoading: celebritySocialLoading, error: celebritySocialError } = useQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }))
  const { data: celebrityReactionsFull, isLoading: celebrityReactionsFullLoading, error: celebrityReactionsFullError } = useQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0))

  const { data: celebrityProducts } = useQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }))
  const { data: celebrityTopProducts } = useQuery(['celebrityTopProducts', celebrityId], () => getCelebrityTopProducts({ celebrityId }))

  const { data: celebritySimilarStars } = useQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0))
  const [headerHeight, updateHeaderHeight] = useState(0);
  const updateHeadHeight = () => {
    if (headerRef && headerRef.current && headerHeight === 0) {
      updateHeaderHeight(headerRef.current.clientHeight);
    }
  };
  const isBookable = isCelebLocStorage() && celebrityData?.isBookable
  const headNavRef = useRef(null);
  const searchRef = useRef(null)
  const isDirectLink = () => {
    if (typeof window === 'undefined') return;
    const referURL = document.referrer;
    // const { direct_view: directView } = parseQueryString(props.location.search);
    // return (
    //   (referURL === '' && window.history.length <= 2) ||
    //   (referURL !== '' && !referURL.includes(window.location.origin)) ||
    //   directView
    // );
    return true
  };
  const config = {
    ...celebrityData?.celebrity_details.page_color,
    ...celebrityData?.celebrity_details.page_font,
  }

  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const detContent = useRef(null)
  const tabsNode = useRef(null);
  const [collapsedMode, setCollapse] = useState(false)

  const { showSticky } = useScroll({
    headerHeight,
    isDesktop: true,
    node: tabsNode,
    loaded: true,
    collapsedMode,
  });
  const { t } = useTranslation()
  const headerRef = useRef(null)
  const [currTab, selectTab] = useState(tabsList(t)[0]);
  const [expHeight, updateExpHeight] = useState(0);

  const [timerUpdate, setTimerUpdate] = useState(false);
  const timerEnd = () => {
    setTimerUpdate(true);
  };

  const activeServices = {}
  Object.keys(celebrityData?.celebrity_details.services).forEach(row => {
    const temp = {}
    activeServices[starAllowedServices[row]] = celebrityData?.celebrity_details.services[row]
    // activeServices.push(temp)
  })
  const headerAnimation = useTransition(showSticky, { from: { opacity: 0, display: 'block' },
  enter: { opacity: 1 },
  leave: { opacity: 0, display: 'none'  },
  config: { tension: 430, friction: 120 },
  })
  const renderHeader = (config, hideAction = false) => {
    if (!isDesktop) {
      return (
        <ThemeProvider
          theme={theme => ({
            ...theme,
            ...config,
          })}
        >
          <StarHeader
            forwardRef={headerRef}
            userDetails={celebrityData?.user}
            showSticky={showSticky}
            celebDetails={celebrityData?.celebrity_details}
            onBack={() => {}}
            digitalGoodsList={digitalGoodsList}
            hasActionHead={isMyProfile && isMobile && !hideAction}
            editMode={false}
            toggleEditMode={() => {}}
            professionsList={props.professions}
            entityData={partnerData}
            currencyData={currencyData}
            languageData={props.partnerData.language}
            dynamicFilters={dynamicFilter}
            t={t}
            config={props.configData}
            isLoggedIn={false}
            suggestionsList={[]}
            isStar={false}
            celebDetails={{}}
          />
        </ThemeProvider>
      );
    } else if (isDesktop) {
      return (<HeaderV3
        forwardRef={headerRef}
        navRef={headNavRef}
        classes={{
          innerContent: 'inner-head',
        }}
        smallEntitySelect={isDesktop}
        professionsList={props.professions}
        showBack
        showBanner
        timerEnd={timerEnd}
        entityData={partnerData}
        currencyData={currencyData}
        languageData={props.partnerData.language}
        dynamicFilters={dynamicFilter}
        t={t}
        config={props.configData}
        suggestionsList={[]}
        searchRef={searchRef}
        smallEntitySelect
        userValue={{
          error: '',
          fromSocialMedia: false,
          isStar: false,
          loading: false,
          role: '',
          settings_celebrityDetails: {},
          settings_userDetails: {},
          userDataLoaded: false
        }}
        searchProps={{
          placeholder: 'Search for your favorite Talent' }}
      />)
    }
  }
  const isMyProfile = false;
  const [showHow, setShowHow] = useState(false);
  const onTabChange = tab => {
    selectTab(tab)
  }
  const checkoutMode = false
  const digitalGoodsList = celebrityFunStuffData.fun_stuff
  const tabContent = useRef(null)
  const expRef = useRef(null)
  const renderExpHead = (expProps = {}) => {
    const expRender = () => {
      return (<ExpWrapper
        ref={expRef}
        headerHeight={headerHeight}
        directView={isDirectLink()}
        showSticky={showSticky}
      >
        {expProps.renderContent ? expProps.renderContent() : null}
        <ReqList
          userId={getUserId()}
          showHome
          showActive={false}
          activeServices={activeServices}
          hasSuggestions={props.partnerData.allow_fan_suggestion}
          digitalGoodsList={digitalGoodsList}
          {...expProps}
        />
        {/* <h3>out</h3> */}
      </ExpWrapper>)
    }
    return showSticky && typeof document !== 'undefined'
    ? createPortal(expRender(), document.getElementById('exp-render'))
    : expRender();
  }

  const toggleBookingModal = (active, bookingData, reaction) => {
    if (active) {
      editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: true, requestId: bookingData.id, data: { ...bookingData, isPublic: true} } })
    } else {
      editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: false, requestId: bookingData.id, data: { ...bookingData, isPublic: true } } })
    }
  }
  const renderTab = (selectedTab, setTab) => {
    return (
      <>
          {showHow && (
            <HowWorks
              respTime={celebrityData?.celebrity_details?.responseTime}
              logo={partnerData?.logo}
              onClose={() => setShowHow(false)}
            />
          )}
          <PostSection
            userId={getUserId()}
            topProds={formatTopProds(celebrityTopProducts)}
            loaderAction={props.loaderAction}
            detailsLoading={props.detailsLoading}
            isBookable={isBookable}
            history={props.history}
            toggleLogin={props.toggleLogin}
            isLoggedIn={props.isLoggedIn}
            celebDetails={props.celebDetails}
            toggleBookingModal={toggleBookingModal}
            setShowHow={setShowHow}
            digitalGoodsList={digitalGoodsList}
            location={props.location}
            isFollow={false}
            celebDetails={celebrityData?.celebrity_details}
            userDetails={celebrityData?.user}
            similarStars={celebritySimilarStars?.similar_stars || []}
            shoutVideos={{count: featuredVideosData.count, limit: 20, offset: 0, data: featuredVideosData.featured_videos}}
            reactionVideos={{count: celebrityReactionsFull?.count || 0, data: celebrityReactionsFull ? celebrityReactionsFull['reactions-details'] : []}}
          />
      </>
    )
  }

  useEffect(() => {
    setTimeout(
      () => {
        updateHeadHeight();
      },
      showSticky ? 0 : 2000,
    );
    if (headerRef && headerRef.current) {
      headerRef.current.addEventListener('transitionstart', updateHeadHeight);
      headerRef.current.addEventListener('transitionend', updateHeadHeight);
    }
    return () => {
      if (headerRef && headerRef.current) {
        headerRef.current.removeEventListener(
          'transitionstart',
          updateHeadHeight,
        );
        headerRef.current.removeEventListener(
          'transitionend',
          updateHeadHeight,
        );
      }
    };
  }, [
    headerRef.current,
    isDesktop,
    timerUpdate,
    showSticky,
    showExpHead,
    collapsedMode,
    checkoutMode,
    props.professions.length,
  ]);

  useEffect(() => {
    updateHeadHeight();
  }, [headerRef.current, showSticky, showExpHead, collapsedMode, checkoutMode]);
  useEffect(() => {
    if (expRef && expRef.current) {
      updateExpHeight(expRef.current.clientHeight);
    } else {
      updateExpHeight(0);
    }
  }, [
    currTab,
    expRef.current,
    showSticky,
    collapsedMode,
    checkoutMode,
    showExpHead,
  ]);

  return renderTab()
}

export default PreviewContent
