import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getConfig, getEntity, getFeaturedVideos, getProfessions } from '../../../../src/services/myfanpark';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';
import { createPortal } from 'react-dom';
import  {
	ExpWrapper,

} from '../../../../components/PageStyles/CelebrityId/styled';

import { useScroll } from '../../../../customHooks/domUtils/useScroll';
import { ThemeProvider } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import HeaderV3 from '../../../../components/HeaderV3';
import { editModals, setShowHow, useGeneral } from '../../../../src/context/general';

import { tabsList } from '../../../../src/constants/stars/celebrityId';
// import ReqList from './components/ReqList'
import ReqList from '../../../../components/PageStyles/CelebrityId/components/ReqList';
import { starAllowedServices } from '../../../../components/PageStyles/CelebrityId/constants';
import PostSection from '../../../../components/PageStyles/CelebrityId/components/PostSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTransition } from 'react-spring';
import StarHeader from '../../../../components/PageStyles/CelebrityId/components/StarHeader';
import { useMediaQuery } from '@material-ui/core';
import StarShowLayoutContainer from '../../../../components/PageStyles/CelebrityId/Layout/StarShowLayoutContainer';
import { useGetCelebFeaturedVideos, useGetCelebrityData, useGetCelebTopProducts, useGetPartner, useGetProfessions } from 'customHooks/reactQueryHooks';
import dynamic from 'next/dynamic';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';

const HowWorks = dynamic(() => import('components/HowWorks'));
function ShowStar(props) {
	const router = useRouter();
	useEffect(() => {
		router.prefetch(`/${celebrityId}/bio`);
	}, []);
	const { celebrityId } = router.query;
	const getUserId = () => {
		return celebrityId.toLowerCase();
	};
	const [state, dispatch] = useGeneral();
	const { filters: { dynamicFilter } } = state;
	// dummy commit
	const [showExpHead, toggExpHead] = useState(false);
	const { data: { professions } } = useGetProfessions();
	const { data } = useGetPartner();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: featuredVideosData, isLoading: featuredVideoLoading, error: featuredError } = useGetCelebFeaturedVideos();
	const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
	const { data: celebrityReactionsFull, isLoading: celebrityReactionsFullLoading, error: celebrityReactionsFullError } = useQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0));


	const { data: celebritySimilarStars } = useQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0));
	const [headerHeight, updateHeaderHeight] = useState(0);
	const updateHeadHeight = () => {
		if (headerRef && headerRef.current && headerHeight === 0) {
			updateHeaderHeight(headerRef.current.clientHeight);
		}
	};

	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'talent-page-view',
				product: celebrityData?.user.nick_name
					? celebrityData?.user.nick_name
					: `${celebrityData?.user.first_name}  ${celebrityData?.user.last_name}`,
				ecommerce: {
					click: {
						products: [
							{
								id: celebrityData?.user.nick_name
									? celebrityData?.user.nick_name
									: `${celebrityData?.user.first_name}  ${celebrityData?.user.last_name}`,
								name: celebrityData?.user.nick_name
									? celebrityData?.user.nick_name
									: `${celebrityData?.user.first_name}  ${celebrityData?.user.last_name}`,
							},
						],
					},
				},
			});
		}
	}, []);

	const headNavRef = useRef(null);
	const isBookable = isCelebLocStorage() && celebrityData?.isBookable;
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

	const isDesktop = useMediaQuery('(min-width: 1280px)');
	const tabsNode = useRef(null);
	const [collapsedMode, setCollapse] = useState(false);
	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'talent-page-view',
				product: celebrityData?.user.nick_name
					? celebrityData?.user.nick_name
					: `${celebrityData?.user.first_name}  ${celebrityData?.user.last_name}`,
				ecommerce: {
					click: {
						products: [
							{
								id: celebrityData?.user.nick_name
									? celebrityData?.user.nick_name
									: `${celebrityData?.user.first_name}  ${celebrityData?.user.last_name}`,
								name: celebrityData?.user.nick_name
									? celebrityData?.user.nick_name
									: `${celebrityData?.user.first_name}  ${celebrityData?.user.last_name}`,
							},
						],
					},
				},
			});
		}
	}, []);

	const config = {
		...celebrityData?.celebrity_details.page_color,
		...celebrityData?.celebrity_details.page_font,
	};

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

	const activeServices = {};
	Object.keys(celebrityData?.celebrity_details.services).forEach(row => {
		const temp = {};
		activeServices[starAllowedServices[row]] = celebrityData?.celebrity_details.services[row];
		// activeServices.push(temp)
	});
	const headerAnimation = useTransition(showSticky, { from: { opacity: 0, display: 'block' },
		enter: { opacity: 1 },
		leave: { opacity: 0, display: 'none'  },
		config: { tension: 430, friction: 120 },
	});

	const checkoutMode = false;
	const digitalGoodsList = celebrityFunStuffData?.fun_stuff;
	const expRef = useRef(null);

	const toggleBookingModal = (active, bookingData, reaction) => {
		if (active) {
			editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: true, requestId: bookingData.id, data: { ...bookingData, isPublic: true} } });
		} else {
			editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: false, requestId: bookingData.id, data: { ...bookingData, isPublic: true } } });
		}
	};
	const renderTab = (selectedTab, setTab) => {
		return (
			<>
				{state.showHow && (
					<HowWorks
						respTime={celebrityData?.celebrity_details?.responseTime}
						logo={partnerData?.logo}
						onClose={() => setShowHow(dispatch, false)}
					/>
				)}
				<PostSection
					userId={getUserId()}
					// topProds={formatTopProds(celebrityTopProducts)}
					loaderAction={props.loaderAction}
					detailsLoading={props.detailsLoading}
					isBookable={isBookable}
					history={props.history}
					toggleLogin={props.toggleLogin}
					isLoggedIn={props.isLoggedIn}
					celebDetails={celebrityData?.celebrity_details}
					toggleBookingModal={toggleBookingModal}
					setShowHow={(bool) => setShowHow(dispatch, bool)}
					digitalGoodsList={digitalGoodsList}
					location={props.location}
					isFollow={false}
					celebDetails={celebrityData?.celebrity_details}
					userDetails={celebrityData?.user}
					similarStars={celebritySimilarStars?.similar_stars || []}
					shoutVideos={{count: featuredVideosData?.count, limit: 20, offset: 0, data: featuredVideosData?.featured_videos || []}}
					reactionVideos={{count: celebrityReactionsFull?.count || 0, data: celebrityReactionsFull ? celebrityReactionsFull['reactions-details'] : []}}
				/>
			</>
		);
	};
	// dummy
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

	return renderTab();
}

ShowStar.getLayout = page => (
	<StarShowLayoutContainer pageProps={page.props} >
		{page}
	</StarShowLayoutContainer>
);

export default ShowStar;

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(props) {
	const { params: { celebrityId, site }, locale } = props;
	try {
		if (celebrityId == 404) {
			return {
				notFound: true
			};
		}

		const { partnerData, currencyData, languageData } = await getEntity(site, locale);
		const entityId = partnerData.entity_id;
		const entityToken = partnerData.public_token;
		const queryClient = new QueryClient();

		await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData });
		try {
			await queryClient.fetchQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }));
		} catch(e) {
			return {
				notFound: true
			};
		}

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				partnerData: { entityId: partnerData.entity_id, entityToken: partnerData.public_token },
				...(await serverSideTranslations(locale, ['common', 'footer'])),

			},
			revalidate: 60,
		};
	} catch (e) {
		return {
			notFound: true
		};
	}
}