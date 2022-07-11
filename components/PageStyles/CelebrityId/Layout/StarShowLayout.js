import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useQueryClient } from 'react-query';
import { animated, useTransition } from 'react-spring';
import { ThemeProvider } from '@emotion/react';
import { useScroll } from '../../../../customHooks/domUtils/useScroll';
import { useLastParam } from '../../../../customHooks/navigationUtils';
import { accountStatus } from '../../../../src/constants/stars/accountStatus';
import { tabsList } from '../../../../src/constants/stars/celebrityId';
import { editGeneralState, generalLoader, setShowHow, toggleSignup, updateToast, useGeneral } from '../../../../src/context/general';
import {  getCelebrityFunStuff, getCelebrityProducts,  getCelebritySocial } from '../../../../src/services/myfanpark';
import BannerSection from '../../../BannerSection';
import DescripSection from '../../../DescripSection';
import HeaderV3 from '../../../HeaderV3';
import StarFooter from '../../../StarFooter';
import TabWrap from '../../../TabWrap';
import ReqList from '../components/ReqList';
import StarHeader from '../components/StarHeader';
import { starAllowedServices } from '../constants';
import StarProfileStyled, { BannerWrap, ExpWrapper, StickyWrapper, TabContentWrap, TabWrapper } from '../styled';
import Head from 'next/head';
import { getStarName } from '../../../../src/utils/dataToStringFormatter';
import SchemaGenerator from './SchemaGenerator/SchemaGenerator';
import { getCurrentUrl } from '../../../../customHooks/domUtils';
import FollowButton from '../components/FollowButton';
import { isCelebLocStorage, locStorage } from '../../../../src/utils/localStorageUtils';
import { useCelebCustomPromoImgs, useCelebPromoImgs, useGetCelebrityData, useGetCelebSocial, useGetPartner, useGetProfessions } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { updateProfilePhoto } from 'src/services/myfanpark/updateCelebActions';
import { updateUserDetails } from 'src/services/myfanpark/celebActions';
import { StarContext } from '../PurchaseSection/StarContext';
import StarDetails from '../components/StarDetails';
import { setSignupFlow, useSession } from 'src/context/session';
import DiscountBanner from 'components/DiscountBanner';
import AlertSection from 'components/AlertSection';
import { superSportProfessions } from 'components/Homepages/SuperSport/constants';
import FooterComp from 'components/Footer';
function StarShowLayout({children, pageProps}) {
	const isMobile = useMediaQuery('(max-width: 831px)');
	const router = useRouter();
	const [state, dispatch] = useGeneral();
	const { data: { professions } } = useGetProfessions();
	const sessionDispatch = useSession()[1];
	const { celebrityId } = router.query;
	const { data: promoTempUrls } = useCelebPromoImgs(celebrityId);
	const { data: customPromoImgsUrls } =  useCelebCustomPromoImgs(celebrityId);
	// const { data: promoImgs } = useCelebPromoImgs(celebrityId)
	const getUserId = () => {
		return celebrityId.toLowerCase();
	};
	const { data: fanData, isStar } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	// const isStar = fanData?.celebrity_details && !isEmpty(fanData?.celebrity_details)
	const [editMode, setEditMode] = useState(false);
	const toggleEditMode = () => {
		setEditMode(!editMode);
	};
	const [showExpHead, toggExpHead] = useState(false);
	const { entityToken, entityId } = pageProps.partnerData;
	// const { partnerData } = pageProps
	const { data } = useGetPartner();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const isMyProfile = fanData?.user.id === celebrityData?.user.id;
	const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
	const { data: celebritySocialData, isLoading: celebritySocialLoading, error: celebritySocialError } = useGetCelebSocial(celebrityId);
	const { data: celebrityProducts } = useQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }));

	const [headerHeight, updateHeaderHeight] = useState(0);
	const updateHeadHeight = () => {
		if (headerRef && headerRef.current && headerHeight === 0) {
			updateHeaderHeight(headerRef.current.clientHeight);
		}
	};
	// const getCurrentUrl = () => {
	//   return `https://${router.query.site}/_site/${router.query.site}${router.asPath}`
	//   // return ''
	// }
	const headNavRef = useRef(null);
	const isBookable = isCelebLocStorage() && celebrityData?.isBookable;
	const searchRef = useRef(null);
	const isDirectLink = () => {
		if (typeof window === 'undefined') return;
		const referURL = document.referrer;
		// const { direct_view: directView } = parseQueryString(pageProps.location.search);
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
	const arrayToCollapse = ['bio', 'shoutout', 'chat', 'social','fun', 'live', 'merch', 'commercial', 'thankyou', 'tip'];
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
	Object.keys(celebrityData?.celebrity_details?.services || {}).forEach(row => {
		const temp = {};
		activeServices[starAllowedServices[row]] = celebrityData?.celebrity_details.services[row];
		// activeServices.push(temp)
	});
	const headerAnimation = useTransition(showSticky, { from: { opacity: 0, display: 'flex' },
		enter: { opacity: 1 },
		leave: { opacity: 0, display: 'none'  },
		config: { tension: 430, friction: 120 },
	});
	const handleBack = () => {
		router.asPath.includes('thankyou') ? router.push(`/${router?.query?.celebrityId}`, undefined, { shallow: true }) : router.back();
	};
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
						onBack={() => handleBack}
						digitalGoodsList={digitalGoodsList}
						hasActionHead={isMyProfile && isMobile && !hideAction}
						// hasActionHead={isMyProfile && isMobile && !hideAction}
						editMode={editMode}
						toggleEditMode={toggleEditMode}
						professionsList={pageProps.professions}
						entityData={partnerData}
						currencyData={currencyData}
						languageData={pageProps.partnerData.language}
						dynamicFilters={[]}
						t={t}
						config={pageProps.configData}
						isLoggedIn={isLoggedIn}
						suggestionsList={[]}
						isStar={isStar}
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
				professionsList={pageProps.professions}
				showBack
				showBanner
				timerEnd={timerEnd}
				entityData={partnerData}
				currencyData={currencyData}
				languageData={partnerData.language}
				dynamicFilters={dynamicFilter}
				t={t}
				config={pageProps.configData}
				suggestionsList={[]}
				isStar={isStar}
				isLoggedIn={isLoggedIn}
				searchRef={searchRef}
				smallEntitySelect
				userValue={{
					error: '',
					fromSocialMedia: false,
					isStar: isStar,
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
	// const [showHow, setShowHow] = useState(false);
	const onTabChange = tab => {
		if (tab.value === 'bio') {
			router.push(`/${celebrityId}/bio`);
		} else if (tab.value === 'home' || tab.value === 'posts') {
			router.push(`/${celebrityId}`);
		} else {
			router.push(`/${celebrityId}/shoutout`);
		}
	};
	const checkoutMode = !!pageProps.checkoutMode;
	const digitalGoodsList = celebrityFunStuffData?.fun_stuff;
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
					showActive={true}
					activeServices={activeServices}
					hasSuggestions={partnerData?.allow_fan_suggestion}
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
	const toMarkExp = ['social', 'fun', 'merch', 'commercial', 'thankyou', 'chat', 'tip', 'live'];
	const {pathname} = router;
	if (toMarkExp.find(param => pathname.includes(param))) {
		selectedTab = { label: t('star_profile.exp'), value: 'exp' };
	} else {

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
		professions.length,
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
	const clientShareImage = () => {
		if (router.query?.tid?.[0]) {
			let array = router.query?.ct ? customPromoImgsUrls : promoTempUrls;
			if (!array) array = [];
			const image = array.find(row => row.id == router.query.tid[0]);
			let finalParam = 'bg_url';
			if (router.query?.ct) {
				finalParam = 'image';
			} else if (router.query?.fb) {
				finalParam = 'fb_bg_url';
			}
			if (image) return image[finalParam];
		}
		return celebrityData?.user.avatar_photo?.image_url;
	};
	const shareImage = clientShareImage();

	const getMetaKeywords = () => t('star_profile.meta_keywords', {
		name: `${celebrityData?.user.first_name} ${
			celebrityData?.user.last_name
		} ${
			celebrityData?.user.nick_name
				? `, ${celebrityData?.user.nick_name}`
				: ''
		}`,
	});

	// dummy

	const localUpdateToast = payload => updateToast(dispatch, { ...payload, global: true });
	const loaderAction = payload => generalLoader(dispatch, payload);
	const queryClient = useQueryClient();
	const localUpdateCelebDetails = payload => updateUserDetails(
		celebrityData?.user.id,
		payload,
		false,
		true,
		false,
		localUpdateToast,
		loaderAction,
		celebrityData,
		queryClient,
		t,
		true
	);

	const localUpdateProfilePhoto = obj => {
		return updateProfilePhoto(obj, true, true, localUpdateToast, loaderAction, queryClient, celebrityData);
	};

	const [promoCode, updatePromoCode] = useState(celebrityData?.celebrity_details?.promocode || {});

	const isLastParam = () => {
		if (router.asPath) {
			const arr = router.asPath.split('/');
			return arr[arr.length - 1];
		} else {
			return null;
		}
	};

	const isHomePage = isLastParam() === getUserId() || isLastParam() === 'posts';
	useEffect(() => {
		if (celebrityData?.celebrity_details?.promocode) {
			updatePromoCode(celebrityData?.celebrity_details?.promocode);
		}
	}, [celebrityData?.celebrity_details?.promocode]);
	return (
		<ThemeProvider
			theme={theme => ({
				...theme,
				...config,
			})}
		>
			<StarContext.Provider
				value={{
					starDetails: celebrityData?.celebrity_details,
					collapsed: collapsedMode,
					updateCollapse: setCollapse,
					promoCode,
					updatePromoCode,
					updateLocalStore: () => {},
					showContent: true,
					toggContent: () => {},
					scrollToElem: () => {},
					isStar,
					isBookable: isBookable,
					onPurchaseComplete: () => {},
				}}
			>

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
						loaded={true}
					>
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
						{/* {!showSticky && renderHeader(config)} */}
						<>

							<StickyWrapper
								showSticky={showSticky}
								collapsed={collapsedMode}
								checkoutMode={checkoutMode}
							>
								{/* {(showSticky) &&
                    renderHeader(config, showSticky)} */}
								{renderHeader(config, showSticky)}
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
							{
								!collapsedMode && (
									<DiscountBanner />
								)
							}
						</>

						{
							!collapsedMode && (


								<BannerWrap>
									<BannerSection
										profileImage={celebrityData?.user.avatar_photo?.image_url}
										starName={getStarName(
											celebrityData?.user.nick_name,
											celebrityData?.user.first_name,
											celebrityData?.user.last_name,
										)}
										bannerImage={celebrityData?.celebrity_details.banner_image}
										minimalView={isDirectLink()}
										profileVideo={celebrityData?.user.profile_video}
										updateProfilePhoto={localUpdateProfilePhoto}
										loaderAction={payload => generalLoader(dispatch, payload)}
										updateToast={payload => updateToast(dispatch, { ...payload, global: true })}
										updateCelebDetails={localUpdateCelebDetails}
										curUserData={{
											userDetails: celebrityData?.user,
											celebDetails: celebrityData?.celebrity_details,
										}}
										logedinUserData={fanData}
										updateUserDetails={() => {}}
										isMyProfile={isMobile ? isMyProfile && editMode : isMyProfile}
									/>
								</BannerWrap>

							)
						}
						{!collapsedMode && (
							<DescripSection
								isMyProfile={isMyProfile}
								description={celebrityData?.celebrity_details.description}
								headline={'celebrityData?.celebrity_details.headline'}
								starName={celebrityData?.user.nick_name}
								fullName={getStarName(
									celebrityData?.user.nick_name,
									celebrityData?.user.first_name,
									celebrityData?.user.last_name,
								)}
								responseTime={celebrityData?.celebrity_details.average_response_value}
								setShowHow={(bool) => {
									setShowHow(dispatch, bool);
								}
								}
								isBookable={isBookable}
								starId={celebrityData?.user.user_id}
								// setShowHow={() => setShowHow(true)}
							/>
						)}
						{celebrityData?.user?.talent_status === accountStatus.paused && (
							<AlertSection
								celebId={celebrityData?.user?.id}
								alertText={t('common.temp_unavailable')}
								alertButton={t('common.alert_available')}
							/>
						)}
						{isMobile && isHomePage && (
							<StarProfileStyled.Wrapper withPadding>
								<StarDetails showFollow />
							</StarProfileStyled.Wrapper>
						)}
						<TabWrapper
							ref={tabsNode}
							headerHeight={headerHeight}
							directView={isDirectLink()}
							showSticky={showSticky}
							loaded={true}
						>
							<TabWrap
								tabsList={tabsList(t, celebrityData?.user.allow_posts)}
								autoSelect={false}
								showTabs={!checkoutMode}
								selected={selectedTab}
								tabPortal={showSticky ? 'tabs-render' : ''}
								tabProps={{
									listClass: 'tab-list',
									listItemClass: 'tab-item',
								}}
								onTabChange={onTabChange}
							>
								{(selectedTab, setTab) => (
									<TabContentWrap
										expHeight={expHeight}
										collapsed={collapsedMode}
										showSticky={showSticky}
										ref={tabContent}
										checkoutMode={checkoutMode}
									>
										<>
											{!checkoutMode &&
                        renderExpHead({
                        	showHome: false,
                        })}
											{children}
										</>
									</TabContentWrap>
								)}
							</TabWrap>
						</TabWrapper>
						{
							partnerData?.entity_id !== 'SUPERSPORT-ZA-1' ? (

								<StarFooter
									userDetails={celebrityData?.user}
									hideCategory={!isDirectLink()}
									hideSearch={!isDirectLink()}
									celebDetails={celebrityData?.celebrity_details}
									digitalGoodsList={digitalGoodsList}
									entityData={partnerData}
									isStar={isStar}
									isLoggedIn={isLoggedIn}
									languageData={languageData}
									currencyData={currencyData}
									professionsList={pageProps.professions}
									setSignupFlow={payload => setSignupFlow(sessionDispatch, payload)}
									toggleSignup={payload => toggleSignup(dispatch, payload)}
								/>
							) : (
								<FooterComp
									reverseLogo
									filters={state.filters}
									className="partner-footer"
									professionCompleteLink
									showSearch
									showCat
									darkMode
									isV3
									isStar={false}
									professionsProp={superSportProfessions}
								/>
							)
						}

					</StarProfileStyled.Container>
				</StarProfileStyled>
			</StarContext.Provider>

		</ThemeProvider>
	);
}

export default StarShowLayout;
