/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import ActionBar from 'components/ActionBar';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { HeadingH2 } from 'styles/TextStyled';
import DetailItem from 'components/DetailItem';
import BookingStyled from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const Products = props => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const { product_request_details: reqDetails } = props.bookingData;
	const [tip, setTip] = useState(null);

	const tipPayment = (type, value) => {
		if (type === 'tip') {
			setTip(value);
		} else {
			props.onCompleteAction(type, value);
		}
	};

	const shareText = () => {
		return {
			title: t('my_videos.share_product_title', {
				productTitle: reqDetails.product ? reqDetails.product.title : '',
				celebrity: props.bookingData.celebrity,
				siteName: props.entityData?.siteName,
			}),
			body: t('my_videos.share_product_body', {
				celebrity: props.bookingData.celebrity,
				purchaserPlural: props.entityData?.purchaserPlural,
				product: reqDetails.product ? reqDetails.product.title : '',
				siteName: props.entityData?.siteName,
			}),
		};
	};

	return (
		<Wrapper>
			<BookingStyled.Layout>
				<BookingStyled.LeftSection>
					<DetailItem
						classes={{
							root: 'detail-header',
							detailHead: 'detail-head',
							detailDesc: 'detail-desc',
						}}
						heading="Status"
						description="Shipped"
					/>
					<DetailItem
						classes={{
							root: 'detail-header',
							detailHead: 'detail-head',
							detailDesc: 'detail-desc',
						}}
						heading="Tracking number #"
						description={reqDetails.tracking_number}
					/>
				</BookingStyled.LeftSection>
				<BookingStyled.RightSection className="right-section">
					{!tip && (
						<React.Fragment>
							<FanViewStyled.DetailWrapper>
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
										shareDisable={false}
										onAction={tipPayment}
										beforeShare={() => {}}
										commentDetails={{
											maxLength: 104,
											thresholdLimit: 97,
										}}
										shareDetails={{
											smsTitle: shareText().title,
											download: false,
											title: shareText().title,
											body: shareText().body,
											shareUrl: `${window.location.host}/${props.bookingData.celebrity_vanity}`,
										}}
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

Products.propTypes = {
	bookingData: PropTypes.object.isRequired,
	renderCommentList: PropTypes.func.isRequired,
	onCompleteAction: PropTypes.func.isRequired,
	isBookingStar: PropTypes.bool.isRequired,
};

export default Products;
