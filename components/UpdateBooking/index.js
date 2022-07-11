import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Heading } from 'styles/TextStyled';
import { commercialBooking } from 'src/services/';
import BackHeader from 'components/BackHeader';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { isCallCompleted } from 'src/utils/videoCall';
import RequestFlowPopup from '../RequestFlowPopup';
import TextArea from '../TextArea';
import PrimaryButton from '../SecondaryButton';
import Dropdown from '../Dropdown';
import ModalHeader from '../ModalHeader';
import BookingTitle from '../BookingTitle';
import { otherInject } from './utils';
import { commercialStatus } from 'src/constants/requestStatusList';
import { requestTypes } from 'src/constants/requestTypes';
// import { toggleUpdateBooking } from '../../store/shared/actions/toggleModals';
// import { changeRequestStatus } from '../../pages/myVideos/actions/handleRequests';
// import { changeBookingStatus } from '../../pages/Bookings/actions/handleRequests';
import UpdateStyled, { CharCount } from './styled';
import { useConfigPartner, useGetPartner } from 'customHooks/reactQueryHooks';
import { generalLoader, toggleUpdateBooking, updateToast, useGeneral } from 'src/context/general';
import { getReasonData } from 'src/utils/declineReasons';
import { changeBookingStatus, changeRequestStatus } from 'src/services/myfanpark/bookingActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

const UpdateBooking = props => {
	const router = useRouter();
	const { t } = useTranslation();
	const { data: entityData } = useGetPartner();
	const { data: userData } = useFetchLoggedUser();
	const { data: config } = useConfigPartner();
	const [state, dispatch] = useGeneral();
	const queryClient = useQueryClient();
	const localChangeBookingStatus = (requestId, requestStatus, comment, starView) => {
		return changeBookingStatus(
			requestId,
			requestStatus,
			comment,
			starView,
			userData,
			dispatch,
			queryClient,
			() => {},
			t
		);
	};
	const localChangeRequestStatus = (requestId, requestStatus, comment) => {
		return changeRequestStatus(requestId, requestStatus, comment, dispatch);
	};
	const loaderAction = payload => generalLoader(dispatch, payload);

	const localUpdateToast = payload => updateToast(dispatch, payload);
	const { updateBookingModal } = state.modals;
	const localToggleUpdateBooking = (state, requestId, mode, requestData, onSuccess) => () => {
		toggleUpdateBooking(dispatch, state, requestId, mode, requestData, onSuccess);
	};
	//   config: state.config.data,
	//   updateBooking: state.modals.updateBookingModal,
	const { starMode, requestData } = updateBookingModal;
	const [showSuccess, toggleSuccess] = useState(false);
	const [declineReasons, setReasonList] = useState([]);
	const [reasonComment, setReasonComment] = useState('');
	const [reason, setReason] = useState({});

	useEffect(() => {
		if (
			updateBookingModal.starMode &&
      commercialStatus.indexOf(requestData.request_status) >= 0
		) {

			setReasonList(config?.commercialCancel || []);


		} else if (
			updateBookingModal.starMode &&
      (requestTypes[requestData.request_type] === 'digitalGoods' ||
        requestTypes[requestData.request_type] === 'Products' ||
        requestTypes[requestData.request_type] === 'Social Promotion' ||
        requestTypes[requestData.request_type] === 'Social Shout-out' ||
        requestTypes[requestData.request_type] === 'Message')
		) {
			const { fun_stuff_request_details: funDetails } = requestData;
			if (
				funDetails &&
        funDetails.delivery_method === deliveryMethods.videoCalls &&
        isCallCompleted(
        	funDetails.meeting_date,
        	funDetails.fun_stuff.meeting_duration,
        )
			) {
				setReasonList(config?.videoDecline);


			} else {

				setReasonList(
					config?.newProductDecline
						? config?.newProductDecline[requestData.request_type]
						: [],
				);

			}
		} else if (updateBookingModal.starMode) {
			setReasonList(
				config?.requestFeedback
					? config?.requestFeedback.map((reasonItem, index) => {
						return {
							label: reasonItem,
							value: index,
						};
					})
					: [],
			);

		} else if (
			!updateBookingModal.starMode &&
      (requestTypes[requestData.request_type] === 'digitalGoods' ||
        requestTypes[requestData.request_type] === 'Products' ||
        requestTypes[requestData.request_type] === 'Social Promotion' ||
        requestTypes[requestData.request_type] === 'Social Shout-out' ||
        requestTypes[requestData.request_type] === 'Message')
		) {

			setReasonList(
				config?.newProductCancel
					? config?.newProductCancel[requestData.request_type]
					: [],
			);

		} else {

			setReasonList(config?.cancelReasons || []);

		}
	}, []);

	const updateReason = option => {
		setReason(option);
	};

	const onReasonSubmit = () => {
		if (
			updateBookingModal.starMode &&
      commercialStatus.indexOf(requestData.request_status) >= 0
		) {
			loaderAction(true);
			commercialBooking({
				booking_id: requestData.booking_id,
				comment:
          reason.label !== 'Other'
          	? reason.label
          	: `${reasonComment || 'Other'}`,
				type: 'cancelled',
			})
				.then(resp => {
					loaderAction(false);
					updateBookingModal.onSuccess(requestData.booking_id);
					localToggleUpdateBooking(false)();
				})
				.catch(exception => {
					localUpdateToast({
						value: true,
						message: exception.response
							? exception.response.data.error.message
							: t('common.something_wrong'),
						variant: 'error',
						global: !updateBookingModal.starMode,
					});
				});
		} else if (updateBookingModal.starMode) {
			localChangeBookingStatus(
				updateBookingModal.requestId,
				5,
				reason.label !== 'Other'
					? `${entityData?.partnerData?.talent_singular_name} cancellation: ${reason.label}`
					: `${entityData?.partnerData?.talent_singular_name} cancellation: ${reasonComment || 'other'}`,
				updateBookingModal.starMode,
			) // decline a booking
				.then(() => {
					updateBookingModal.onSuccess(requestData.booking_id);
					queryClient.refetchQueries(['bookings']);
					localToggleUpdateBooking(false)();
				});
		} else {
			localChangeRequestStatus(
				updateBookingModal.requestId,
				5,
				reason.label || 'Other',
			).then((resp) => {
				if (resp) {
					updateBookingModal.onSuccess(requestData.booking_id);
					toggleSuccess(true);
				}
			});
		}
	};

	const onBrowseStars = () => {
		router.push('/browse-stars');
		localToggleUpdateBooking(false)();
	};

	const getHeading = () => {
		const title = requestData.customTitle
			? requestData.customTitle
			: t('common.decline_request');
		return title;
	};

	return (
		<RequestFlowPopup
			disableClose
			noPadding={!starMode}
			classes={{ root: starMode ? 'alternate-modal-root' : '' }}
			closePopUp={localToggleUpdateBooking(false)}
		>
			{!starMode && (
				<ModalHeader
					starImage={
						requestData.avatar_photo && requestData.avatar_photo.thumbnail_url
					}
					closeHandler={localToggleUpdateBooking(false)}
					customHeading={<BookingTitle secondary requestData={requestData} />}
				/>
			)}
			<UpdateStyled starMode={starMode}>
				{starMode && (
					<BackHeader
						rootClass="update-header"
						backHandler={localToggleUpdateBooking(false)}
						closeHandler={localToggleUpdateBooking(false)}
						label=""
					/>
				)}
				{!showSuccess ? (
					<React.Fragment>
						<Heading
							className="heading"
							style={updateBookingModal.renderProps.headingStyles}
						>
							{updateBookingModal.renderProps.heading || (
								<React.Fragment>
									{starMode
										? getHeading()
										: t('common.cancel_request_confirm')}
								</React.Fragment>
							)}
						</Heading>
						{!updateBookingModal.renderProps.hideDropdown && (
							<Dropdown
								rootClass="drop-down"
								className="select-drop"
								selected={reason}
								secondary
								options={[
									...declineReasons,
									...otherInject(starMode, declineReasons),
								]}
								labelKey="label"
								valueKey="value"
								placeHolder={!starMode ? t('common.selectReason') : t('common.selectOne')}
								onChange={updateReason}
							/>
						)}
						{starMode && reason.label === 'Other' && (
							<>
								<TextArea
									inputProps={{
										className: 'reason-textfield',
										placeholder:
                    t('common.reason_for_decline',{purchaserSingle:entityData?.parnterData?.talent_singular_name}),
										value: reasonComment,
										onChange: event => setReasonComment(event.target.value),
										maxLength: 230,
									}}
								/>
								<CharCount>
									{t('common.char_remains', {
										length: 230 - (reasonComment?.length || 0)
									})}
								</CharCount>
							</>
						)}
						<PrimaryButton
							onClick={
								updateBookingModal.renderProps.primBtnClick || onReasonSubmit
							}
							disabled={!reason.label}
							className="prim-btn"
							{...updateBookingModal.renderProps.primBtnProps}
						>
							{updateBookingModal.renderProps.primBtnText || (
								<React.Fragment>
									{starMode ? t('common.submitButton') : t('common.cancel_request')}
								</React.Fragment>
							)}
						</PrimaryButton>
						{!starMode && (
							<PrimaryButton
								className="secondary-btn"
								secondary
								onClick={
									updateBookingModal.renderProps.secBtnClick ||
                  localToggleUpdateBooking(false)
								}
								{...updateBookingModal.renderProps.secBtnProps}
							>
								{updateBookingModal.renderProps.secBtnText ||
                  t('common.continue_request')}
							</PrimaryButton>
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						<Heading className="heading">
							{t('common.cancelled_request')}
						</Heading>
						<PrimaryButton onClick={onBrowseStars}>{t('common.browseStars')}</PrimaryButton>
						<PrimaryButton
							className="secondary-btn"
							secondary
							onClick={localToggleUpdateBooking(false)}
						>
							{t('common.view_orders')}
						</PrimaryButton>
					</React.Fragment>
				)}
			</UpdateStyled>
		</RequestFlowPopup>
	);
};


// const mapStateToProps = state => ({
//   config: state.config.data,
//   updateBooking: state.modals.updateBookingModal,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleUpdateBooking: (state, requestId) => () =>
//     dispatch(toggleUpdateBooking(state, requestId)),
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: obj => dispatch(updateToast(obj)),
//   changeBookingStatus: (requestId, requestStatus, comment, starView) =>
//     dispatch(changeBookingStatus(requestId, requestStatus, comment, starView)),
//   changeRequestStatus: (requestId, requestStatus, comment) =>
//     dispatch(changeRequestStatus(requestId, requestStatus, comment)),
// });

export default UpdateBooking;