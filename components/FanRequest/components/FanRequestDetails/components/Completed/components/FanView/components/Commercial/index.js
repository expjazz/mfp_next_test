/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import ActionBar from 'components/ActionBar';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { getLocalAmount } from 'utils/currencyUtils';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { Description, HeadingH2 } from 'styles/TextStyled';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { completedStatusList } from 'src/constants/requestStatusList';
import ImageUpload from './components/FileUpload';
import BookingStyled from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper } from './styled';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const Commercial = props => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const { commercial_details: reqDetails = {} } = props.bookingData;
	const [actionTabActive, setActionTab] = useState(false);
	const [tip, setTip] = useState(null);

	const tipPayment = (type, value) => {
		if (type === 'tip') {
			setTip(value);
		} else {
			props.onCompleteAction(type, value);
		}
	};

	const actionActive = value => {
		setActionTab(value);
	};

	const shareText = () => {
		return t('my_videos.fun_title', {
			celebrity: props.bookingData.celebrity,
			title: reqDetails.fun_stuff ? reqDetails.fun_stuff.title : '',
		});
	};

	return (
		<Wrapper actionTabActive={actionTabActive}>
			<BookingStyled.Layout starMode={false}>
				<BookingStyled.LeftSection className="left-section">
					<ImageUpload
						delivMethod={reqDetails.delivery_method}
						bookingData={props.bookingData}
						actionTabActive={actionTabActive}
						updateToast={props.updateToast}
					/>
					{reqDetails.celebrity_reply &&
            reqDetails.delivery_method !== deliveryMethods.videoCalls && (
						<Description className="note-info">
							{reqDetails.celebrity_reply}
						</Description>
					)}
				</BookingStyled.LeftSection>
				<BookingStyled.RightSection>
					{!tip && (
						<React.Fragment>
							<FanViewStyled.DetailWrapper isPublic={false}>
								{completedStatusList.indexOf(props.bookingData.request_status) > -1 && (
									<section className="action-root">
										<ActionBar
											initialSelection
											bookingId={props.bookingData.booking_id}
											disableRating={
												props.isBookingStar || props.bookingData.has_rating
											}
											disableReaction={
												props.isBookingStar || props.bookingData.has_reaction
											}
											disableComment={
												props.bookingData.has_comment && !props.isBookingStar
											}
											disableTips={props.isBookingStar}
											rateProps={{
												onSuccessMsg: t('common.request_rated'),
											}}
											onAction={tipPayment}
											beforeShare={() => {}}
											commentDetails={{
												maxLength: 104,
												thresholdLimit: 97,
											}}
											shareDetails={{
												smsTitle: shareText(),
												download: false,
												title: shareText(),
												body: shareText(),
												shareUrl: `${window.location.host}/${props.bookingData.celebrity_vanity}`,
											}}
											onSelectAction={() => {}}
											actionActive={actionActive}
											shareDisable={
												reqDetails.delivery_method ===
                        deliveryMethods.videoCalls
											}
											activeTab={props.activeTab}
										/>
									</section>
								)}
							</FanViewStyled.DetailWrapper>
							{props.renderCommentList()}
						</React.Fragment>
					)}
					{tip && (
						<React.Fragment>
							<FontAwesomeIcon
								icon={faArrowLeft}
								onClick={() => {
									setTip(null);
								}}
								className="tip-back"
							/>
							<HeadingH2 className="payment-heading">
								{t('common.payment_details_Cap')}
							</HeadingH2>

							<div className="detail-item">
								<span className="detail-title">{t('common.tip')}</span>
								<span className="detail-value">
									{getLocalSymbol()}
									{numberToDecimalWithFractionTwo(
										getLocalAmount(tip),
										false,
										false,
									)}
								</span>
							</div>

							<div className="detail-item">
								<span className="detail-title head-caps">
									{t('common.total')}
								</span>
								<span className="detail-value val-caps">
									{getLocalSymbol()}
									{numberToDecimalWithFractionTwo(
										getLocalAmount(tip),
										false,
										false,
									)}
								</span>
							</div>

							<Checkout
								promoDetails={{}}
								starData={{
									userData: {
										first_name: props.bookingData.celebrity_first_name,
										user_id: props.bookingData.celebrity_vanity,
										id: props.bookingData.celebrity_id,
									},
									celbData: {
										rate: getLocalAmount(tip),
										charity: props.bookingData.charity,
										bookingPrice: getLocalAmount(tip),
										availability: true,
									},
								}}
								onOptileFail={() => setTip(null)}
								returnUrl={`${window.location.origin}${window.location.pathname}?request_id=${props.bookingData.id}`}
								bookingId={props.bookingData.id}
								deferral="NON_DEFERRED"
								realReturnUrl={`${window.location.origin}${window.location.pathname}?request_id=${props.bookingData.id}`}
								type="tip"
							/>
						</React.Fragment>
					)}
				</BookingStyled.RightSection>
			</BookingStyled.Layout>
		</Wrapper>
	);
};

Commercial.propTypes = {
	bookingData: PropTypes.object.isRequired,
	renderCommentList: PropTypes.func.isRequired,
	onCompleteAction: PropTypes.func.isRequired,
	isBookingStar: PropTypes.bool.isRequired,
	updateToast: PropTypes.func.isRequired,
};

export default Commercial;
