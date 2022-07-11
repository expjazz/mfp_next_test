/* eslint-disable camelcase */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import ActionBar from 'components/ActionBar';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { Description, HeadingH2 } from 'styles/TextStyled';
import DownloadHandler from 'components/DownloadHandler';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import TypeChooser from './components/TypeChooser';
import BookingStyled from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const FunStuff = props => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const { fun_stuff_request_details: funStuffDetails = {} } = props.bookingData;
	const [actionTabActive, setActionTab] = useState(false);
	const [tip, setTip] = useState(null);

	const tipPayment = (type, value) => {
		if (type === 'tip') {
			setTip(value);
		} else {
			props.onCompleteAction(type, value);
		}
	};

	const recordedFile = useMemo(() => {
		return funStuffDetails.request_files ? funStuffDetails.request_files.find(req => req.recorded) : null;
	}, [props.bookingData.booking_id, funStuffDetails]);

	const actionActive = value => {
		setActionTab(value);
	};

	const onFunClick = (funFiles, index) => () => {
		if (!isEmpty(funStuffDetails)) {
			const fileName = funFiles.processed_file_name || funFiles.file_name;
			const type = fileName ? fileName.split(/[.;+_]/).pop() : '';
			const url = {
				bookingId: funStuffDetails.fun_stuff_request_hash,
				fileNM: funFiles.processed_file_name || funFiles.file_name,
				downloadNM: `${props.bookingData.celebrity.replace(' ', '_')}_${
					funStuffDetails.fun_stuff_request_id
				}_${index}.${type}`,
				type: `${funFiles.file_type}/${type}`,
			};
			props.downloadFunc(
				`${env('SERVER_URL')}fun_stuff/download/${url.bookingId}?file_name=${
					url.fileNM
				}&download_name=${url.downloadNM}&content_type=${url.type}`,
			);
		}
	};

	const shareText = () => {
		return {
			title: t('my_videos.share_funstuff_title', {
				funstuffTitle: funStuffDetails.fun_stuff
					? funStuffDetails.fun_stuff.title
					: '',
				celebrity: props.bookingData.celebrity,
				siteName: props.entityData?.siteName,
				celebrity_nick_name: props.bookingData.celebrity_nick_name
					? props.bookingData.celebrity_nick_name
					: props.bookingData.celebrity_first_name,
			}),
			body: t('my_videos.share_funstuff_body', {
				celebrity: props.bookingData.celebrity,
				purchaserPlural: props.entityData?.purchaserPlural,
				fun_stuff: funStuffDetails.fun_stuff
					? funStuffDetails.fun_stuff.title
					: '',
				siteName: props.entityData?.siteName,
			}),
		};
	};

	return (
		<Wrapper actionTabActive={actionTabActive}>
			<BookingStyled.Layout>
				<BookingStyled.LeftSection className="left-section">
					<TypeChooser
						delivMethod={funStuffDetails.delivery_method}
						bookingData={props.bookingData}
						onFunClick={onFunClick}
						actionTabActive={actionTabActive}
						updateToast={props.updateToast}
					/>

					{/* Showing the talent reply whenever the
          request is not of type text (to avoid
          text showing up twice) */}

					{funStuffDetails.celebrity_reply &&
            funStuffDetails.delivery_method !== deliveryMethods.text && (
						<Description className="note-info">
							{funStuffDetails.celebrity_reply}
						</Description>
					)}
				</BookingStyled.LeftSection>
				<BookingStyled.RightSection>
					{!tip && (
						<React.Fragment>
							<FanViewStyled.DetailWrapper>
								{props.bookingData.complete_status === 'completed' && (
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
												smsTitle: shareText().title,
												download: false,
												downloadUrl: recordedFile ? recordedFile.processed_file_url || recordedFile.original_file_url : '',
												title: shareText().title,
												body: shareText().body,
												shareUrl: `${window.location.host}/${props.bookingData.celebrity_vanity}`,
											}}
											onSelectAction={() => {}}
											actionActive={actionActive}
											shareDisable={
												funStuffDetails.delivery_method ===
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
								realReturnUrl={`${window.location.origin}${window.location.pathname}?request_id=${props.bookingData.id}`}
								deferral="NON_DEFERRED"
								type="tip"
							/>
						</React.Fragment>
					)}
				</BookingStyled.RightSection>
			</BookingStyled.Layout>
		</Wrapper>
	);
};

FunStuff.propTypes = {
	bookingData: PropTypes.object.isRequired,
	renderCommentList: PropTypes.func.isRequired,
	isBookingStar: PropTypes.bool.isRequired,
	updateToast: PropTypes.func.isRequired,
	onCompleteAction: PropTypes.func.isRequired,
};

export default DownloadHandler(FunStuff);
