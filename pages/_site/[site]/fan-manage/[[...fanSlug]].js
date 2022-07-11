import PageContainer from 'components/PageStyles/ManageStar/PageContainer';
import ManageStyled from 'components/PageStyles/ManageFan/styled';
import { faHome, faArrowSquareRight } from '@fortawesome/pro-light-svg-icons';
import dynamic from 'next/dynamic';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { isVodacom, useResizeObserver } from 'customHooks/domUtils';
import { useFetchCeleb, useFetchFanActivities, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser, { useLogout, useProfileLogout } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { localeEntity } from 'src/services/entities/localeEntity';
import { getAllProfessions, getConfig, getEntity } from 'src/services/myfanpark';
import FanManageHeader from 'components/FanManageHeader';
import { getLinks } from 'components/PageStyles/ManageFan/constants';
import Sidebar from 'components/Sidebar';
import { useCurrencyData } from 'customHooks/currencyUtils';
import Toast from 'components/Toast';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import { cloneDeep } from 'src/utils/dataStructures';
import { updateNotification, updateNotificationViewed, updateUserDetails } from 'src/services/myfanpark/celebActions';
import FanManageFooter from 'components/FanManageFooter';
import { sessStorage } from 'src/utils/localStorageUtils';
import { postVodapaySuccess } from 'src/services/myfanpark/paymentActions';

const MyStars = dynamic(() => import('components/MyStars'), {
	ssr: false
});

const ReferralProgram = dynamic(() => import('components/SettingsComponents/ReferralProgram'), {
	ssr: false
});

const FanSettings = dynamic(() => import('components/FanSettings'), {
	ssr: false
});

const FavoriteStars = dynamic(() => import('components/FavoriteStars'), {
	ssr: false
});
const FanRequest = dynamic(() => import('components/FanRequest'), {
	ssr: false
});

function FanManage(props) {
	const [{data: starDetails}, fetchCelebDetails] = useFetchCeleb();
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const currencyData = useCurrencyData();
	const logout = useProfileLogout();
	const [{data: fetchActData}, queryFetchAct] = useFetchFanActivities();
	const fetchUserDetails = () => {
		queryClient.refetchQueries(['loggedUser']);
	};
	const localFetchAct = (bookingId, offset, refresh, apiOptions) => {
		queryClient.refetchQueries(['fan-act-list']);
		queryFetchAct(fetchActData?.data, bookingId, offset, refresh, apiOptions);
	};
	const { data: userData } = useFetchLoggedUser();
	const userValue = userData?.user;
	const celebValue = userData?.celebrity_details;
	const { data: entityData } = useGetPartner();
	const [state, dispatch] = useGeneral();
	const localUpdateToast = payload => updateToast(dispatch, payload);
	const loaderAction = payload => generalLoader(dispatch, payload);
	const favouriteCount = userData?.user.favorite_count;
	const asRep = userData?.user.mark_as_rep;
	// const unseenCount = userData?.notificationCount
	const unseenCount = 0;
	const [headerHeight, updateHeaderHeight] = useState(0);
	const [headRef, setHeadRef] = useState(null);
	const router = useRouter();
	const isLoggedIn = !!userData;
	const { query, asPath: pathname } = router;
	const {fanSlug} = query;
	const getHeaderHeight = size => {
		if (size.height) {
			updateHeaderHeight(size.height);
		}
	};

	useResizeObserver({ current: headRef }, getHeaderHeight);


	const goBack = () => {
		router.back();
	};

	const localUserDetailsUpdateHandler = obj => {
		const userData = queryClient.getQueryData(['loggedUser']);
		const temp = cloneDeep(userData?.user);
		temp.notification_settings = { ...temp.notification_settings, ...obj };
		const newUser = {
			user: temp,
			celebrity_details: userData?.celebrity_details
		};
		updateUserDetails(
			temp.id,
			newUser,
			undefined,
			false,
			false,
			payload => updateToast(dispatch, payload),
			payload => generalLoader(dispatch, payload),
			userData,
			queryClient,
			t,
			true
		);
	};
	const postUpdateUserDetails = (id, obj, callBack, globalToast = false) => {
		updateUserDetails(
			id,
			obj,
			callBack,
			globalToast,
			false,
			payload => updateToast(dispatch, payload),
			payload => generalLoader(dispatch, payload),
			userData,
			queryClient,
			t,
			true
		);
	};

	const localUpdateNotification = obj => {
		updateNotification(
			obj,
			true,
			false,
			true,
			dispatch,
			queryClient
		);
	};
	const redirect = useMemo(() => {
		if (
			pathname === '/fan-manage' &&
      (document.body.getBoundingClientRect().width >= 832 ||
        window.innerWidth >= 832)
		) {
			return true;
		}
		return false;
	}, [pathname]);

	useEffect(() => {
		if (redirect) {
			router.push('/fan-manage/my-videos', undefined, { shallow: true });
		}
	}, [pathname]);
	useEffect(() => {
		if (window.FreshworksWidget) {
			window.FreshworksWidget('hide', 'launcher');
		}
	}, []);

	const localUpdateUserDetails = obj => {
		queryClient.setQueryData(['loggedUser', obj]);
	};

	useEffect(() => {
		if (headRef) {
			getHeaderHeight({
				size: headRef.clientHeight,
			});
		}
	}, [isLoggedIn]);

	// useEffect(() => {
	// 	updateToast(dispatch, {
	// 		value: false,
	// 		message: '',
	// 		variant: '',
	// 		global: true,
	// 	});
	// }, []);

	const getRoutes = () => {
		switch(pathname) {
		case '/fan-manage/favorites':
			return (
				<ErrorHandler>
					<FavoriteStars
						currencyData={currencyData}
					/>
				</ErrorHandler>
			);
		case '/fan-manage/referral':
			return (
				<ErrorHandler>
					<ReferralProgram />
				</ErrorHandler>
			);
		case '/fan-manage/my-stars':
			return (
				<ErrorHandler>
					<MyStars
						updateToast={localUpdateToast}
						loaderAction={loaderAction}
						entityData={entityData?.partnerData}
					/>
				</ErrorHandler>
			);
		default:
			if (fanSlug?.[0] === 'my-videos') {
				return (
					<ErrorHandler>
						<FanRequest
							fetchUserDetails={fetchUserDetails}
							starDetails={starDetails}
							currencyData={currencyData}
							updateUserDetails={localUpdateUserDetails}
							fetchActivitiesList={localFetchAct}
							isLoggedIn={isLoggedIn}
							userDetails={userValue}
							celebrityDetails={celebValue}
							updateNotificationCount={() => {}}
							activitiesList={fetchActData}
							resetActivitiesList={() => {}}
							fetchCelebDetails={fetchCelebDetails}
						/>
					</ErrorHandler>
				);
			}
			if (fanSlug?.[0] === 'settings') {
				return (
					<ErrorHandler>
						<FanSettings
							userDetails={userData?.user}
							entityData={entityData?.partnerData}
							asRep={userData?.user?.mark_as_rep}
							stripeCard={state.stripeRegistration.cardDetails}
							stripeUrl={state.stripeRegistration.stripeURL}
							dashboardURL={state.stripeRegistration.dashboardURL}
							updateNotificationViewed={() => updateNotificationViewed(queryClient)}
							updateUserDetails={postUpdateUserDetails}
							userDetailsUpdateHandler={localUserDetailsUpdateHandler}
							updateNotification={localUpdateNotification}
						/>
					</ErrorHandler>
				);
			}
			return null;
		}
	};
	return (
		<>
			<ErrorHandler>
				<Toast custom />
			</ErrorHandler>
			<ManageStyled headerHeight={headerHeight}>
				<FanManageHeader
					forwardRef={setHeadRef}
					isLoggedIn={isLoggedIn}
					userValue={userValue}
					celebValue={celebValue}
					dispatch={dispatch}
					entityData={entityData?.partnerData}
					links={[
						{
							linkName: t('fan_manage.links.home'),
							key: 'Home',
							url: '/fan-manage',
							icon: faHome,
						},
						...getLinks({
							t,
							favouriteCount: 0,
							// favouriteCount: props.favouriteCount,
							unseenCount: unseenCount,
							asRep: asRep,
							entityData: entityData?.partnerData,
						}),
						{
							linkName: t('fan_manage.links.browse', {
								talent: entityData?.partnerData.talentPlural,
							}),
							selectedName: 'browse-stars',
							url: '/browse-stars',
							icon: faStar,
						},
						{
							linkName: t('common.logout'),
							key: 'logout',
							'sel-url': '',
							icon: faArrowSquareRight,
							onClick: logout,
						},
					]}
				/>
				<ManageStyled.Container headerHeight={headerHeight}>
					<ManageStyled.MobileHeading
						hidden={pathname !== '/fan-manage'}
					>
						{t('fan_manage.heading', { siteName: entityData?.partnerData?.partner_name })}
					</ManageStyled.MobileHeading>
					<ManageStyled.SidebarWrapper
						hidden={pathname !== '/fan-manage'}
					>
						<Sidebar
							shallow
							isLoggedIn={isLoggedIn}
							userDetails={userValue}
							celebDetails={celebValue}
							dispatch={dispatch}
							entityData={entityData?.partnerData}
							isStar={false}
							links={[
								...getLinks({
									t,
									favouriteCount: 0,
									// favouriteCount: props.favouriteCount,
									unseenCount: unseenCount,
									asRep: asRep,
									entityData: entityData?.partnerData,
								}),
								{
									linkName: t('fan_manage.links.browse', {
										talent: entityData?.partnerData?.talentPlural,
									}),
									selectedName: 'browse-stars',
									url: '/browse-stars',
									icon: faStar,
								},
							]}
							arrow
						/>
					</ManageStyled.SidebarWrapper>
					<ManageStyled.RightContent>
						{pathname.includes('/fan-manage/my-videos') && (
							<BackHeader
								backHandler={() => router.push('/fan-manage')}
								label={
									query.from === 'request'
										? t('common.activity')
										: t('common.menu')
								}
								heading={t('common.activity')}
								headerCls="header-label"
								noHelp
							/>
						)}
						{getRoutes()}
					</ManageStyled.RightContent>
				</ManageStyled.Container>
				{headerHeight > 0 && <FanManageFooter />}
			</ManageStyled>
		</>
	);
}


FanManage.getLayout = page => (
	<PageContainer {...page.props} >
		{page}
	</PageContainer>
);

export default FanManage;

export async function getServerSideProps({locale, params: { site }}) {
	// const { partnerData, currencyData, languageData } = await getEntity(site, locale)
	// const entityId = partnerData.entity_id
	// const entityToken = partnerData.public_token

	// axios.interceptors.request.use(config => {
	//   config.headers['entity-id'] = entityId
	//   config.headers['entity-token'] = entityToken
	// })

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale));
	// await queryClient.prefetchQuery('config', () => getConfig(entityId, entityToken))
	// await queryClient.prefetchQuery('professions', () => getAllProfessions())
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),
		}
	};

}
