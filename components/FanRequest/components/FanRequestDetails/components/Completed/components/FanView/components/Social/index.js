/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import ActionBar from 'components/ActionBar';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { HeadingH2 } from 'styles/TextStyled';
import DetailItem from 'components/DetailItem';
import BookingStyled, { EvidenceItem } from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper, ImageSection, EvidenceList } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const SocialMedia = props => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const { social_request_details: socialDetails = {} } = props.bookingData;
	const [tip, setTip] = useState(null);

	const tipPayment = (type, value) => {
		if (type === 'tip') {
			setTip(value);
		} else {
			props.onCompleteAction(type, value);
		}
	};

	return (
		<Wrapper>
			<BookingStyled.Layout starMode={false}>
				<BookingStyled.LeftSection>
					<DetailItem
						classes={{
							root: 'detail-header',
							detailHead: 'detail-head',
							detailDesc: 'detail-desc',
						}}
						heading="Status"
						description="Completed"
					/>
					<ImageSection hasEvidence={socialDetails.evidence_files}>
						<EvidenceList isScrollable={socialDetails.evidence_files}>
							{socialDetails.evidence_files
								? socialDetails.evidence_files.map(evidence => (
									<EvidenceItem
										className="evidence-item"
										imageUrl={evidence}
										key={evidence}
									/>
								))
								: isEmpty(socialDetails.celebrity_reply) && (
									<EvidenceItem className="evidence-item no-evidence">
										{t('my_videos.completed_social_media')}{' '}
										{props.isPromotion ? 'promotion.' : 'interaction.'}
									</EvidenceItem>
								)}
						</EvidenceList>
						{!isEmpty(socialDetails.celebrity_reply) && (
							<span className="text box">{socialDetails.celebrity_reply}</span>
						)}
					</ImageSection>
				</BookingStyled.LeftSection>
				<BookingStyled.RightSection>
					{!tip && (
						<React.Fragment>
							<FanViewStyled.DetailWrapper isPublic={false}>
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
										shareDisable
										onAction={tipPayment}
										beforeShare={() => {}}
										commentDetails={{
											maxLength: 104,
											thresholdLimit: 97,
										}}
										shareDetails={{}}
										onSelectAction={() => {}}
										activeTab={props.activeTab}
									/>
								</section>
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

SocialMedia.propTypes = {
	bookingData: PropTypes.object.isRequired,
	onCompleteAction: PropTypes.func.isRequired,
	renderCommentList: PropTypes.func.isRequired,
	isBookingStar: PropTypes.bool.isRequired,
	isPromotion: PropTypes.bool.isRequired,
};

export default SocialMedia;
