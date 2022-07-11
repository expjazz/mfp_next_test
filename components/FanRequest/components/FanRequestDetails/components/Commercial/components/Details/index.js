import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import { FlexCenter, FlexBoxSB } from 'styles/CommonStyled';
import { commercialStatus } from 'src/constants/requestStatusList';
import { LinkText, HeadingH2 } from 'styles/TextStyled';
// import { callSmartLook } from 'services/analytics/smartLook';
// import { getLocalAmount } from 'utils/currencyUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import ReceiptDisplay from '../../../ReceiptDisplay';
import { generateReceipt } from './util';
import {
	Layout,
	DetailWrapper,
	DetailHead,
	DetailDesc,
	PaymentView,
} from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { locStorage } from 'src/utils/localStorageUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import dynamic from 'next/dynamic';
import { isVodacom } from 'customHooks/domUtils';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const Details = props => {
	const [getCurrencySymbol, getLocalAmount] = useGetLocalAmount();
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const reqDataString = locStorage.getItem('req_data');
	const reqData = reqDataString ? reqDataString : {};
	const { commercial_details: details, celebrity } = props.reqDetails;
	const { reqDetails, requestType, starName } = props;

	const changePaymentSuccess = () => {
		locStore.removeItem('req_data');
		props.paymentSuccess();
		// props.onUpdateRequest(reqDetails.booking_id);
	};

	const paymentSuccess = optileData => {
		if (
			requestType === 'commercial-open' &&
      reqData.type === 'booking' &&
      optileData.reference &&
      reqData.bookingId === optileData.reference
		) {
			props.createCharge(
				{
					starsona: optileData.reference,
					amount: optileData.amount,
					promocode: '',
					type: 'booking',
					currency: props.currencyData.abbr,
					optile_data: { paymentGateway: 'Optile', ...optileData },
				},
				() => {
					changePaymentSuccess();
					const eventData = {
						bookingID: optileData.reference,
						localAmount: optileData.amount,
						promoCode: '',
						localCurrency: props.currencyData.abbr,
						talent: reqDetails.celebrity,
						product: '',
						amount: details.star_price,
					};
					if (window.dataLayer) {
						window.dataLayer.push({
							event: 'payment-success',
							bookingID: optileData.reference,
							localAmount: optileData.amount,
							promoCode: '',
							localCurrency: props.currencyData.abbr,
							talent: reqDetails.celebrity,
							product: '',
							amount: details.star_price,
						});
						callSmartLook('track', 'payment-success', eventData);
						window.dataLayer.push({
							ecommerce: {
								purchase: {
									actionField: {
										id: optileData.transactionId, // Transaction ID. Required
										revenue: optileData.amount,
										coupon: '',
									},
									products: [
										{
											name: details.offering.title,
											price: details.star_price,
											category: 'Commercial',
											quantity: 1,
											coupon: '', // Optional fields may be omitted or set to empty string.
										},
									],
								},
							},
						});
					}
				},
			);
		}
	};

	const paymentFailed = optileData => {
		if (
			requestType === 'commercial-open' &&
      reqData.type === 'booking' &&
      optileData.reference &&
      reqData.bookingId === optileData.reference
		) {
			if (window.dataLayer) {
				window.dataLayer.push({
					event: 'payment-failure',
					bookingID: optileData.reference,
					localAmount: optileData.amount,
					promoCode: '',
					localCurrency: props.currencyData.abbr,
					talent: reqDetails.celebrity,
					product: '',
					amount: details.star_price,
				});
			}
			callSmartLook('track', 'payment-failure', {
				bookingID: optileData.reference,
				localAmount: optileData.amount,
				promoCode: '',
				localCurrency: props.currencyData.abbr,
				talent: reqDetails.celebrity,
				product: '',
				amount: details.star_price,
			});
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
	return (
		<Layout>
			<div className="content-data">
				<DetailWrapper className="image-wrapper">
					<span>
						<DetailHead>{t('common.ordered_item')}:</DetailHead>
						<DetailDesc>{details.offering.title}</DetailDesc>
						{details.offering ? (
							<DetailDesc>{details.offering.description}</DetailDesc>
						) : null}
					</span>
				</DetailWrapper>
				<DetailWrapper className="image-wrapper">
					<span>
						<DetailHead>{t('common.request_deatils')}</DetailHead>
						<DetailDesc>{celebrity}</DetailDesc>
						<DetailDesc className="capitalise">
							{details.fan_request}
						</DetailDesc>
					</span>
				</DetailWrapper>
				{details.description && (
					<DetailWrapper>
						<DetailHead>{t('common.request')}:</DetailHead>
						<DetailDesc>{details.fan_request}</DetailDesc>
					</DetailWrapper>
				)}
				<ReceiptDisplay
					detailClasses={{
						title: 'detail-title',
					}}
					receiptArray={generateReceipt({...props.reqDetails, getLocalAmount, getLocalSymbol: getCurrencySymbol, entityData: entityData?.partnerData})[requestType]}
				/>
				{(requestType === 'open' ||
          (requestType === 'commercial-open' && !details.star_approved)) && (
					<FlexCenter className="order-action">
						<LinkText onClick={props.cancelBooking}>
							{t('common.cancel_request')}
						</LinkText>
					</FlexCenter>
				)}
				{requestType === 'commercial-open' && details.star_approved && (
					<FlexBoxSB className="commercial-actions">
						<LinkText onClick={props.cancelBooking}>
							{t('common.cancel_request')}
						</LinkText>
						{reqDetails.commercial_details.offering ? (
							<LinkText>
								<Link
									href={`/${reqDetails.celebrity_vanity}/commercial/${reqDetails.commercial_details.offering.slug}`}
								>
									<a>

										{t('my_videos.submit_request', { star: starName })}
									</a>
								</Link>
							</LinkText>
						) : null}
					</FlexBoxSB>
				)}
			</div>
			{requestType === 'commercial-open' &&
        details.star_approved &&
        commercialStatus.includes(props.reqDetails.request_status) && (
				<PaymentView>
					<HeadingH2 className="payment-heading">
						{t('common.payment_details_Cap')}
					</HeadingH2>
					<DetailWrapper>
						<FlexBoxSB className="detail">
							<span className="detail-head">
								{t('common.commercial_request')}
							</span>
							<span className="detail-value">
								{getCurrencySymbol()}
								{numberToDecimalWithFractionTwo(
									getLocalAmount(details.star_price),
									false,
									false,
								)}
							</span>
						</FlexBoxSB>
						<FlexBoxSB className="detail bold">
							<span className="detail-head">{t('common.total')}</span>
							<span className="detail-value">
								{getCurrencySymbol()}
								{numberToDecimalWithFractionTwo(
									getLocalAmount(details.star_price),
									false,
									false,
								)}
							</span>
						</FlexBoxSB>
					</DetailWrapper>

					<Checkout
						promoDetails={{}}
						title={details.offering.title}
						description={details.offering.description}
						starData={{
							userData: {
								first_name: starName,
								user_id: reqDetails.celebrity_vanity,
								id: reqDetails.celebrity_id,
							},
							celbData: {
								rate: details.star_price,
								charity: reqDetails.charity,
								bookingPrice: details.star_price,
								availability: true,
							},
						}}
						returnUrl={`${window.location.origin}${window.location.pathname}?request_id=${reqDetails.id}`}
						realReturnUrl={`${window.location.origin}${window.location.pathname}?request_id=${reqDetails.id}${isVodacom() ? '&vodacom=true' : ''}`}
						bookingId={reqDetails.id}
						deferral="NON_DEFERRED"
					/>
				</PaymentView>
			)}
		</Layout>
	);
};

Details.propTypes = {
	reqDetails: PropTypes.object.isRequired,
	requestType: PropTypes.string,
	starName: PropTypes.string,
	cancelBooking: PropTypes.func.isRequired,
	paymentSuccess: PropTypes.func.isRequired,
	createCharge: PropTypes.func.isRequired,
	// onUpdateData: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	currencyData: PropTypes.object.isRequired,
};
Details.defaultProps = {
	requestType: '',
	starName: ' ',
};

export default Details;
