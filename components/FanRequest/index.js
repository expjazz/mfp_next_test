import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestTypes } from 'src/constants/requestTypes';
import Loader from 'components/Loader';
import TabWrap from 'components/TabWrap';
import FanRequestDetails from './components/FanRequestDetails';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import CancelledBookings from './components/CancelledBookings';
import Conversation from './components/Conversation';
import News from './components/News';
import ActionNeeded from './components/ActionNeeded';
import { options } from './constants';
// import { getRequestDetails } from 'src/services/request';
import {
	openStatusList,
	completedStatusList,
	celebCancelledStatusList,
} from 'src/constants/requestStatusList';
import Layout, { Wrapper } from './styled';
import { getRequestDetails } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import { generalLoader, toggleUpdateBooking, updateToast, useGeneral } from 'src/context/general';
import { useConfigPartner, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { locStorage } from 'src/utils/localStorageUtils';
import { route } from 'next/dist/server/router';
import { useGetLocalAmount } from 'customHooks/currencyUtils';

function FanRequest(props) {
	const [state, dispatch] = useGeneral();
	const { data: config } = useConfigPartner();
	const { data: entityData } = useGetPartner();
	const { data: userData } = useFetchLoggedUser();
	const [orderDetails, setOrderDetails] = useState(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [scrollPos, setScrollPos] = useState(0);
	const [selected, setSelected] = useState('');
	const loaderAction = payload => {
		generalLoader(dispatch, payload);
	};
	const localUpdateToast = payload => {
		updateToast(dispatch, payload);
	};
	const [activity, setActivity] = useState({});
	const urlTab = router.query?.fanSlug?.[1];
	const [selectedTab, setSelectedTab] = useState(
		options.find(tb => tb.value === urlTab) || options[0],
	);
	const queryString = router.query;

	const onTabChange = tab => {
		setSelectedTab(tab);
		router.push(`/fan-manage/my-videos/${tab.value}`, undefined, { shallow: true });
	};
	useEffect(() => {
		if (router.query.vodapayError) {
			updateToast(dispatch, {
				value: true,
				message: 'Your payment was not successful. Please try again.',
				variant: 'error',
				global: true,
			});
		}
	}, [router.query.vodapayError]);

	useEffect(() => {
		const handleRouteChange = () => {
			setOrderDetails(null);
		};
		router.events.on('routeChangeStart', handleRouteChange);
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	});

	const goToTop = () => {
		window.scrollTo(0, 0);
	};

	const setRequest = bookId => {
		setSelected(bookId);
	};

	const callRequestDetails = (id, fullloader = false) => {
		if (fullloader) {
			loaderAction(true);
		} else {
			setLoading(true);
		}
		getRequestDetails(id, true, true)
			.then(requestDetails => {
				if (requestDetails.success) {
					const newRequestDetails = requestDetails.data.stargramz_response;
					if (
						completedStatusList.indexOf(newRequestDetails.request_status) >=
              0 ||
            requestTypes[newRequestDetails.request_type] === 'Message'
					) {
						setOrderDetails(newRequestDetails);
					} else if (
						celebCancelledStatusList.indexOf(
							newRequestDetails.request_status,
						) >= 0 ||
            openStatusList.indexOf(newRequestDetails.request_status) >= 0
					) {
						setOrderDetails(requestDetails.data.stargramz_response);
					}
				}
				if (fullloader) {
					loaderAction(false);
				} else {
					setLoading(false);
				}
			})
			.catch(() => {
				if (fullloader) {
					loaderAction(false);
				} else {
					setLoading(false);
				}
			});
	};

	const onUpdateData = data => {
		setOrderDetails(data);
	};

	const getSelected = selectedBooking => {
		callRequestDetails(selectedBooking.request_hashed_id);
		setActivity(selectedBooking);
		setScrollPos(window.pageYOffset || document.documentElement.scrollTop);
		goToTop();
	};

	const scrollToPos = () => {
		window.scrollTo(0, scrollPos);
	};

	const closeHandler = () => {
		locStorage.removeItem('req_data');
		props.updateNotificationCount();
		setOrderDetails(null);
		localUpdateToast({
			value: false,
			message: '',
			variant: '',
			global: true,
		});
		scrollToPos();
		setTimeout(scrollToPos, 0);
	};

	const hasRequestId = queryString.request_id?.[0] !== '?';
	useEffect(() => {
		// props.fetchUserDetails(props.userDetails.user_id);
		// props.history.listen(() => {
		//   setOrderDetails(null);
		// });
		if (!hasRequestId && queryString.type === 'open') {
			router.push('/fan-manage/my-videos/open', undefined, { shallow: true });
		} else if (queryString.request_id) {
			callRequestDetails(queryString.request_id);
		}
	}, []);

	useEffect(() => {
		// if (
		//   window.location.origin !== 'http://localhost:8122' &&
		//   !window.__LogDNA__
		// ) {
		//   logdna.init(env('LOG_DNA')).addContext({
		//     hostname: 'myFanPark web',
		//     app: 'myFanPark',
		//     indexMeta: true,
		//     level: 'INFO',
		//     Tag: 'LogDNA-Browser',
		//     console: false,
		//   });
		// }
	}, []);

	const onFeedUpdate = () => {
		props.updateNotificationCount();
	};

	const localToggleUpdateBookings = (state, requestId, mode, requestData, onSuccess) => {
		toggleUpdateBooking(dispatch, state, requestId, mode, requestData, onSuccess);
	};


	const currencyFunctions = useGetLocalAmount();
	const renderTab = tab => {
		return (
			<React.Fragment>
				{tab === 'all' && (
					<AllBookings
						loaderAction={loaderAction}
						updateToast={localUpdateToast}
						currencyFunctions={currencyFunctions}
						entityData={entityData?.partnerData}
						config={config}
						getSelected={getSelected}
						goToTop={goToTop}
						onFeedUpdate={onFeedUpdate}
						streamTocken={userData?.user.getstream_token}
						scrollToPos={scrollToPos}
					/>
				)}
				{tab === 'action' && (
					<ActionNeeded
						loaderAction={loaderAction}
						currencyFunctions={currencyFunctions}
						updateToast={localUpdateToast}
						entityData={entityData?.partnerData}
						config={config}
						getSelected={getSelected}
						onFeedUpdate={onFeedUpdate}
						streamTocken={userData?.user.getstream_token}
						scrollToPos={scrollToPos}
					/>
				)}
				{tab === 'open' && (
					<OpenBookings
						fetchUserDetails={() => {}}
						currencyFunctions={currencyFunctions}
						loaderAction={loaderAction}
						updateToast={localUpdateToast}
						entityData={entityData?.partnerData}
						config={config}
						selected={selected}
						onFeedUpdate={onFeedUpdate}
						updateSelected={setRequest}
						getSelected={getSelected}
						streamTocken={userData?.user.getstream_token}
						scrollToPos={scrollToPos}
					/>
				)}
				{tab === 'completed' && (
					<CompletedBookings
						loaderAction={loaderAction}
						updateToast={localUpdateToast}
						entityData={entityData?.partnerData}
						config={config}
						getSelected={getSelected}
						onFeedUpdate={onFeedUpdate}
						streamTocken={userData?.user.getstream_token}
						scrollToPos={scrollToPos}
					/>
				)}
				{tab === 'news' && (
					<News
						loaderAction={loaderAction}
						currencyFunctions={currencyFunctions}
						updateToast={localUpdateToast}
						entityData={entityData?.partnerData}
						config={config}
						getSelected={getSelected}
						onFeedUpdate={onFeedUpdate}
						streamTocken={userData?.user.getstream_token}
						scrollToPos={scrollToPos}
					/>
				)}
				{tab === 'cancelled' && (
					<CancelledBookings
						loaderAction={loaderAction}
						currencyFunctions={currencyFunctions}
						updateToast={localUpdateToast}
						entityData={entityData?.partnerData}
						config={config}
						getSelected={getSelected}
						onFeedUpdate={onFeedUpdate}
						streamTocken={userData?.user.getstream_token}
						scrollToPos={scrollToPos}
					/>
				)}
				{tab === 'conversation' && (
					<Conversation
						loaderAction={loaderAction}
						currencyFunctions={currencyFunctions}
						updateToast={localUpdateToast}
						entityData={entityData?.partnerData}
						config={config}
						getSelected={getSelected}
						onFeedUpdate={onFeedUpdate}
						streamTocken={userData?.user.getstream_token}
						scrollToPos={scrollToPos}
					/>
				)}
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			{loading && <Loader />}
			{orderDetails ? (
				<FanRequestDetails
					{...props}
					toggleUpdateBooking={localToggleUpdateBookings}
					loaderAction={loaderAction}
					updateToast={localUpdateToast}
					entityData={entityData?.partnerData}
					config={config}
					reqDetails={orderDetails}
					closeHandler={closeHandler}
					goToTop={goToTop}
					reaction={activity.reaction}
					callRequestDetails={callRequestDetails}
					onUpdateData={onUpdateData}
				/>
			) : null}
			<Layout hidden={loading || orderDetails}>
				<Wrapper>
					<TabWrap
						tabsList={options}
						selected={selectedTab}
						tabProps={{
							listClass: 'tab-list',
							listItemClass: 'tab-item',
							hasScroll: true,
							// scrollProps: { autoHeight: true, autoHeightMax: 25 },
						}}
						onTabChange={onTabChange}
					>
						{(selTab, setTab) => <div>{renderTab(selTab, setTab)}</div>}
					</TabWrap>
				</Wrapper>
			</Layout>
		</React.Fragment>
	);
}

FanRequest.propTypes = {
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	config: PropTypes.object.isRequired,
	userDetails: PropTypes.object.isRequired,
	fetchUserDetails: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	updateNotificationCount: PropTypes.func.isRequired,
};

export default FanRequest;
