import { ThemeProvider } from '@emotion/react';
import { useMediaQuery } from '@material-ui/core';
import HeaderV3 from 'components/HeaderV3';
import TabWrap from 'components/TabWrap';
import { getCurrentUrl } from 'customHooks/domUtils';
import { useScroll } from 'customHooks/domUtils/useScroll';
import { useLastParam } from 'customHooks/navigationUtils';
import { useGetCelebrityData, useGetCelebSocial, useGetPartner } from 'customHooks/reactQueryHooks';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from 'react-query';
import { useTransition, animated } from 'react-spring';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { tabsList } from 'src/constants/stars/celebrityId';
import { editGeneralState, useGeneral } from 'src/context/general';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos } from 'src/services/myfanpark';
import { getStarName } from 'src/utils/dataToStringFormatter';
import { isCelebLocStorage, locStorage } from 'src/utils/localStorageUtils';
import FollowButton from '../../components/FollowButton';
import ReqList from '../../components/ReqList';
import StarHeader from '../../components/StarHeader';
import { starAllowedServices } from '../../constants';
import StarProfileStyled, { ExpWrapper, StickyWrapper, TabContentWrap, TabWrapper } from '../../styled';
import SchemaGenerator from '../SchemaGenerator/SchemaGenerator';

function InnerProductLayoutContent(props) {
	const router = useRouter();
	const [state, dispatch] = useGeneral();
	const { celebrityId } = router.query;
	const getUserId = () => {
		return celebrityId.toLowerCase();
	};
	const [showExpHead, toggExpHead] = useState(false);
	const { entityToken, entityId } = props.partnerData;
	// const { partnerData } = props
	const { data } = useGetPartner();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: featuredVideosData, isLoading: featuredVideoLoading, error: featuredError } = useQuery(['featuredVideos', celebrityId], () => getFeaturedVideos({ celebrityId, limit: 20, offset: 0 }));
	const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
	const { data: celebritySocialData, isLoading: celebritySocialLoading, error: celebritySocialError } = useGetCelebSocial(celebrityId);
	const { data: celebrityReactionsFull, isLoading: celebrityReactionsFullLoading, error: celebrityReactionsFullError } = useQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0));
	const { data: celebrityProducts } = useQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }));
	const { data: celebrityTopProducts } = useQuery(['celebrityTopProducts', celebrityId], () => getCelebrityTopProducts({ celebrityId }));

	const { data: celebritySimilarStars } = useQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0));

	const [headerHeight, updateHeaderHeight] = useState(0);
	const updateHeadHeight = () => {
		if (headerRef && headerRef.current && headerHeight === 0) {
			updateHeaderHeight(headerRef.current.clientHeight);
		}
	};

	const headNavRef = useRef(null);
	const isBookable =  isCelebLocStorage() && celebrityData?.isBookable;
	const searchRef = useRef(null);
	const isDirectLink = () => {
		if (typeof window === 'undefined') return;
		const referURL = document.referrer;
		// const { direct_view: directView } = parseQueryString(props.location.search);
		// return (
		//   (referURL === '' && window.history.length <= 2) ||
		//   (referURL !== '' && !referURL.includes(window.location.origin)) ||
		//   directView
		// );
		return true;
	};
	const config = {
		...celebrityData?.celebrity_details.page_color,
		...celebrityData?.celebrity_details.page_font,
	};


	const isDesktop = useMediaQuery('(min-width: 1280px)');
	const detContent = useRef(null);
	const tabsNode = useRef(null);
	const arrayToCollapse = ['bio', 'shoutout'];
	const [collapsedMode, setCollapse] = useState(!!arrayToCollapse.find(val => router.pathname.includes(val)));
	useEffect(() => {
		if (!arrayToCollapse.find(val => router.pathname.includes(val)) && collapsedMode) {
			setCollapse(false);
		} else if (!!arrayToCollapse.find(val => router.pathname.includes(val)) && !collapsedMode) {
			setCollapse(true);
		}
	}, [router.pathname, router.asPath]);
	const { showSticky } = useScroll({
		headerHeight,
		isDesktop: true,
		node: tabsNode,
		loaded: true,
		collapsedMode,
	});
	const { t } = useTranslation();
	const headerRef = useRef(null);
	const [currTab, selectTab] = useState(tabsList(t)[0]);
	const [expHeight, updateExpHeight] = useState(0);

	const [timerUpdate, setTimerUpdate] = useState(false);
	const timerEnd = () => {
		setTimerUpdate(true);
	};
	useEffect(() => {
		const storageCurrencyData = locStorage.getItem('currencyData');
		if (storageCurrencyData) {
			editGeneralState(dispatch, { payload: storageCurrencyData, key: 'currencyData' });
		} else {
			editGeneralState(dispatch, { payload: currencyData, key: 'currencyData' });
		}
	}, []);

	useEffect(() => {
		editGeneralState(dispatch, { payload: partnerData, key: 'partnerData' });
	}, []);
	const { filters: { dynamicFilter } } = state;
	const activeServices = {};
	Object.keys(celebrityData?.celebrity_details.services).forEach(row => {
		const temp = {};
		activeServices[starAllowedServices[row]] = celebrityData?.celebrity_details.services[row];
		// activeServices.push(temp)
	});
	// const headerAnimation = useTransitio(showSticky, { from: { opacity: 0, display: 'flex' },
	// enter: { opacity: 1 },
	// leave: { opacity: 0, display: 'none'  },
	// config: { tension: 430, friction: 120 },
	// })
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
						dynamicFilters={[]}
						t={t}
						config={props.configData}
						isLoggedIn={false} suggestionsList={[]}
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
				languageData={partnerData.language}
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
			/>);
		}
	};
	const isMyProfile = false;
	const [showHow, setShowHow] = useState(false);
	// router.prefetch(`${celebrityId}/bio`)
	const onTabChange = tab => {
		if (tab.value === 'bio') {
			router.push(`/${celebrityId}/bio`);
		} else if (tab.value === 'home' || tab.value === 'posts') {
			router.push(`/${celebrityId}`);
		} else {
			router.push(`/${celebrityId}/shoutout`);
		}
	};
	const checkoutMode = false;
	const digitalGoodsList = celebrityFunStuffData.fun_stuff;
	const tabContent = useRef(null);
	const expRef = useRef(null);
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
			</ExpWrapper>);
		};
		return showSticky && typeof document !== 'undefined'
			? createPortal(expRender(), document.getElementById('exp-render'))
			: expRender();
	};

	const toggleBookingModal = (_, bookingData, reaction) => {
		editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: true, requestId: bookingData.id, data: { ...bookingData } } });
	};
	const lastParam = useLastParam();
	let selectedTab = {};
	switch (lastParam) {
	case 'shoutout':
		selectedTab = { label: t('star_profile.exp'), value: 'exp' };
		break;
	case 'experiences':
		selectedTab = { label: t('star_profile.exp'), value: 'exp' };
		break;
	case 'bio':
		selectedTab = { label: t('star_profile.bio'), value: 'bio' };
		break;
	default:
		selectedTab = { label: t('star_profile.posts'), value: 'posts' };
		break;
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
	// if (!celebrityData) {
	//   return <h1>loading</h1>
	// }
	const getMetaTitle = () => {
		return t('star_profile.meta_title', {
			name: getStarName(
				celebrityData?.user.nick_name,
				celebrityData?.user.first_name,
				celebrityData?.user.last_name,
			),
			siteName: partnerData.partner_name || '',
		});
	};
	const shareImage = celebrityData?.user.avatar_photo?.image_url;

	const headerAnimation = useTransition(showSticky, { from: { opacity: 0, display: 'flex' },
		enter: { opacity: 1 },
		leave: { opacity: 0, display: 'none'  },
		config: { tension: 430, friction: 120 },
	});

	const getMetaKeywords = () => t('star_profile.meta_keywords', {
		name: `${celebrityData?.user.first_name} ${
			celebrityData?.user.last_name
		} ${
			celebrityData?.user.nick_name
				? `, ${celebrityData?.user.nick_name}`
				: ''
		}`,
	});



	return (
		<>
			<StarProfileStyled
				centerAlign={false}
				minimalView={isDirectLink()}
				headerHeight={headerHeight}
				headNavRef={headNavRef}
				isAvailable={isBookable}
				config={config}
				showSticky={showSticky}
			>
				<StarProfileStyled.Container
					fanView={!isDirectLink()}
					loaded={true}>
					<SchemaGenerator
						userDetails={celebrityData?.user}
						celebDetails={celebrityData?.celebrity_details}
						socialListData={celebritySocialData}
						productsList={celebrityProducts}
						digitalGoodsList={digitalGoodsList}
					/>
					<Head>
						<title>{getMetaTitle()}</title>
						<meta property="description" content="Starsona" data-react-helmet="true"/>
						<meta property="og:title" content={getMetaTitle()} data-react-helmet="true"/>
						<meta property="og:image" content={shareImage} data-react-helmet="true"/>
						<meta property="og:secure_url" content={shareImage} data-react-helmet="true"/>
						<meta property="og:site_name" content={partnerData.seo_site_name} data-react-helmet="true"/>
						<meta property="og:url" content={getCurrentUrl()} data-react-helmet="true"/>
						<meta property="og:type" content="website" data-react-helmet="true"/>
						<meta property="twitter:title" content={getMetaTitle()} data-react-helmet="true"/>
						<meta property="twitter:image" content={shareImage} data-react-helmet="true"/>
						<meta property="twitter:site" content={partnerData.seo_site_name} data-react-helmet="true"/>
						<meta property="twitter:creator" content={partnerData.seo_site_name} data-react-helmet="true"/>
						<meta property="keywords" content={getMetaKeywords()} data-react-helmet="true"/>
						<meta property="fb:app_id" content={process.env.NEXT_PUBLIC_fbId} data-react-helmet="true"/>
						<meta property="google-play-app" content={`app-id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`} data-react-helmet="true"/>
						<meta property="al:ios:app_store_id" content={process.env.NEXT_PUBLIC_IOS_APP_ID} data-react-helmet="true"/>
						<meta property="al:ios:url" content={`${process.env.NEXT_PUBLIC_ANDROID_APP_ID
						}://profile/?profile_id=${getUserId()}`} data-react-helmet="true"/>
						<meta property="al:ios:app_name" content={process.env.NEXT_PUBLIC_IOS_APP_NAME} data-react-helmet="true"/>
						<meta property="al:android:package" content={process.env.NEXT_PUBLIC_ANDROID_APP_ID} data-react-helmet="true"/>
						<meta property="al:android:url" content={`${process.env.NEXT_PUBLIC_ANDROID_APP_ID
						}://profile/?profile_id=${getUserId()}`} data-react-helmet="true"/>
						<meta property="al:android:app_name" content={process.env.NEXT_PUBLIC_ANDROID_APP_NAME} data-react-helmet="true"/>
					</Head>
					<>

						<StickyWrapper
							showSticky={showSticky}
							collapsed={collapsedMode}
							checkoutMode={true}
						>
							{/* {(showSticky) &&
              renderHeader(config, showSticky)} */}
							{renderHeader(config)}
							{showSticky && isDesktop && headerAnimation((style, item) => item &&
              <animated.section ref={detContent} style={style} className="sticky-star-details">
              	<span className="star-det">
              		<img
              			alt="star-pic"
              			className="star-pic"
              			src={celebrityData?.user.avatar_photo?.image_url}
              		/>
              		<span className="star-name">
              			{getStarName(
              				celebrityData?.user.nick_name,
              				celebrityData?.user.first_name,
              				celebrityData?.user.last_name,
              			)}
              		</span>
              	</span>
              	<FollowButton />
              </animated.section>
							)}
							<section id="tabs-render"></section>
							<section id="exp-render"></section>
						</StickyWrapper>
					</>

				</StarProfileStyled.Container>
			</StarProfileStyled>
		</>
	);
}

export default InnerProductLayoutContent;
