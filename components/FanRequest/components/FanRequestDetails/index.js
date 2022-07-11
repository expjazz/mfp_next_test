import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'src/utils/dataStructures';
// import { getRequestDetails } from 'services/request';
// import {
//   updateUserDetails,
//   fetchUserDetails,
// } from 'store/shared/actions/getUserDetails';
// import {
//   fetchActivitiesList,
//   resetActivitiesList,
// } from 'store/shared/actions/getActivities';
// import {
//   paymentFetchSuccess,
//   updateCharge,
// } from 'store/shared/actions/processPayments';
// import {
//   toggleUpdateBooking,
//   toggleContactSupport,
// } from 'store/shared/actions/toggleModals';
// import { fetchCelebDetails } from 'pages/starProfile/actions/getCelebDetails';
import { useMedia, openHelp, useOptileParser } from 'customHooks/domUtils';
import {
	openStatusList,
	completedStatusList,
	commercialStatus,
} from 'src/constants/requestStatusList';
import { requestTypes, requestTypesKeys } from 'src/constants/requestTypes';
import Modal from 'components/Modal';
import TypeChooser from './components/TypeChooser';
import { Layout, ModalContainer } from './styled';
import { getRequestDetails } from 'src/services/myfanpark';
import { locStorage } from 'src/utils/localStorageUtils';

function FanRequestDetails(props) {
	const reqDataString = locStorage.getItem('req_data');
	const reqDetails = reqDataString ? reqDataString : {};
	const [requestStatus, updateRequestStatus] = useState('');
	const { request_type: reqType } = props.reqDetails;
	const isModalView = useMedia('(min-width:832px) and (max-width: 1279px)');
	const isMobile = useMedia('(max-width: 831px)');
	const [success, setSuccess] = useState(false);
	const { t } = useTranslation();

	const callActivityList = reqData => {
		props.fetchActivitiesList(reqData.booking_id, 0, true, {
			isBookingId: true,
			isAll: isMobile,
			isPublic: false,
		});
	};

	const paymentSuccess = () => {
		props.callRequestDetails(props.reqDetails.booking_id, true);
		setSuccess(!success);
	};

	const tipPaymentSuccess = optileData => {
		if (
			reqDetails.type === 'tip' &&
      optileData.reference &&
      reqDetails.bookingId === optileData.reference
		) {
			props.tipPayment(
				{
					starsona: optileData.reference,
					amount: optileData.amount,
					promocode: '',
					type: 'tip',
					currency: props.currencyData.abbr,
					optile_data: { paymentGateway: 'Optile', ...optileData },
				},
				() => {
					locStore.removeItem('req_data');
					props.callRequestDetails(props.reqDetails.booking_id, true);
				},
			);
		}
	};

	const paymentFailed = optileData => {
		if (
			reqDetails.type === 'tip' &&
      optileData.reference &&
      reqDetails.bookingId === optileData.reference
		) {
			props.updateToast({
				value: true,
				message:
          optileData && optileData.interactionReason === 'NETWORK_FAILURE'
          	? t('common.optile_network_failure')
          	: t('common.optile_default_error'),
				variant: 'error',
			});
		}
	};

	// useOptileParser(
	//   tipPaymentSuccess,
	//   paymentFailed,
	//   props.history.location.search,
	// );

	const onClarify = () => {
		const newRequestData = cloneDeep(props.reqDetails);
		newRequestData.message_status = 3; // send star clarification
		props.onUpdateData(newRequestData);
	};

	const onPrivacyChange = isPublic => {
		const newRequestData = cloneDeep(props.reqDetails);
		newRequestData.public_request = isPublic;
		props.onUpdateData(newRequestData);
	};

	const checkBookingProgress = () => {
		const isItemBooking =
      requestTypes[props.reqDetails.request_type] === 'digitalGoods' ||
      requestTypes[props.reqDetails.request_type] === 'Products';
		const isActive = props.reqDetails.complete_status !== 'not_started';
		return isItemBooking && isActive;
	};

	const onFanCompleteAction = (type, value, reType) => {
		const newRequestData = { ...props.reqDetails };
		if (reType === 'dm') {
			props.callRequestDetails(props.reqDetails.booking_id, true);
		}
		if (type === 'rating') {
			callActivityList(newRequestData);
			newRequestData.has_rating = true;
			props.fetchActivitiesList(newRequestData.booking_id, 0, true, {
				isBookingId: true,
				isAll: isMobile,
				isPublic: false,
			});
		} else if (type === 'reaction') {
			callActivityList(newRequestData);
			props.fetchUserDetails(props.userDetails.id);
			newRequestData.has_reaction = true;
			props.fetchActivitiesList(newRequestData.booking_id, 0, true, {
				isBookingId: true,
				isAll: isMobile,
				isPublic: false,
			});
		}
	};

	const cancelBooking = () => {
		props.toggleUpdateBooking(
			true,
			props.reqDetails.booking_id,
			false,
			props.reqDetails,
			// requestId => {
			//   props.removeActivity(requestId);
			// },
			() => {
				props.closeHandler();
				// props.fetchUserDetails(props.userDetails.id);
			},
			checkBookingProgress()
				? {
					hideDropdown: true,
					heading: t('my_videos.cancel_not_allowed'),
					headingStyles: { fontSize: '16px' },
					primBtnText: t('common.account_settings.contactsupport'),
					secBtnText: t('common.close'),
					primBtnProps: { secondary: true },
					secBtnProps: { secondary: false },
					primBtnClick: () => {
						props.toggleUpdateBooking(false);
						openHelp();
					},
					secBtnClick: () => props.toggleUpdateBooking(false),
				}
				: {},
		);
	};

	const updateStatus = () => {
		if (commercialStatus.indexOf(props.reqDetails.request_status) >= 0) {
			updateRequestStatus('commercial-open');
		} else if (openStatusList.indexOf(props.reqDetails.request_status) >= 0) {
			updateRequestStatus('open');
		} else if (
			completedStatusList.indexOf(props.reqDetails.request_status) >= 0
		) {
			updateRequestStatus('completed');
			if (
				props.userDetails.completed_fan_unseen_count &&
        props.reqDetails.fan_unseen
			) {
				props.updateUserDetails({
					user: {
						...props.userDetails,
						completed_fan_unseen_count:
              props.userDetails.completed_fan_unseen_count - 1,
					},
					celebrity_details: props.celebrityDetails,
				});
			}
		} else {
			updateRequestStatus('cancelled');
		}
	};

	useEffect(() => {
		updateStatus();
	}, [props.reqDetails.booking_id, props.reqDetails.request_status]);

	useEffect(() => {
		updateStatus();
		getRequestDetails(props.reqDetails.booking_id, true, true);
	}, []);

	useEffect(() => {
		props.goToTop();
	}, []);

	const getComponent = component => {
		if (isModalView || isMobile) {
			return (
				<React.Fragment>
					<Modal open onClose={props.closeHandler} disableBackdropClick={false}>
						<ModalContainer>{component}</ModalContainer>
					</Modal>
				</React.Fragment>
			);
		}
		return <React.Fragment>{component}</React.Fragment>;
	};

	return (
		<Layout>
			{getComponent(
				<TypeChooser
					reqType={reqType}
					{...props}
					onClarify={onClarify}
					requestType={requestStatus}
					cancelBooking={cancelBooking}
					onPrivacyChange={onPrivacyChange}
					// onUpdateData={props.onUpdateData}
					onFanCompleteAction={onFanCompleteAction}
					paymentSuccess={paymentSuccess}
					success={success}
					starName={props.reqDetails.celebrity}
				/>,
			)}
		</Layout>
	);
}

FanRequestDetails.propTypes = {
	history: PropTypes.object.isRequired,
	reqDetails: PropTypes.object.isRequired,
	userDetails: PropTypes.object.isRequired,
	celebrityDetails: PropTypes.object.isRequired,
	onUpdateData: PropTypes.func.isRequired,
	toggleUpdateBooking: PropTypes.func.isRequired,
	// removeActivity: PropTypes.func.isRequired,
	closeHandler: PropTypes.func.isRequired,
	fetchActivitiesList: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	tipPayment: PropTypes.func.isRequired,
	updateUserDetails: PropTypes.func.isRequired,
	currencyData: PropTypes.object.isRequired,
	goToTop: PropTypes.func.isRequired,
	fetchUserDetails: PropTypes.func.isRequired,
	callRequestDetails: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	toggleUpdateBooking: (
		state,
		requestId,
		mode,
		requestData,
		onSuccess,
		renderProps,
	) =>
		dispatch(
			toggleUpdateBooking(
				state,
				requestId,
				mode,
				requestData,
				onSuccess,
				renderProps,
			),
		),
	toggleContactSupport: state => dispatch(toggleContactSupport(state)),
	updateToast: errorObject =>
		dispatch(updateToast({ ...errorObject, global: false })),
	fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
	updateUserDetails: usrObj => dispatch(updateUserDetails(usrObj)),
	paymentFetchSuccess: data => {
		dispatch(paymentFetchSuccess(data));
	},
	loaderAction: state => dispatch(loaderAction(state)),
	createCharge: (payload, callBack) => {
		dispatch(updateCharge(payload, callBack));
	},
	resetActivitiesList: () => dispatch(resetActivitiesList()),
	fetchActivitiesList: (bookingId, offset, refresh, apiOptions) =>
		dispatch(fetchActivitiesList(bookingId, offset, refresh, apiOptions)),
	tipPayment: (payload, callBack) => {
		dispatch(updateCharge(payload, callBack));
	},
	fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default FanRequestDetails;


// defLangId: state.userDetails.settings_celebrityDetails.defaultLangId,
// userDetails: state.userDetails.settings_userDetails,
// celebrityDetails: state.userDetails.settings_celebrityDetails,
// entityData: state.entity.data,
// currencyData: state.entity.currencyData,
// language: state.entity.languageData,