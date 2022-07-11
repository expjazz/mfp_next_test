import React from 'react';
import PropTypes from 'prop-types';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { HeadingH2 } from 'styles/TextStyled';
import { DetailWrapper } from '../../../../../outterStyled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const SocialPayment = ({
	fanData,
	starData,
	social,
	t,
	promoDet,
	finalPrice,
	hasDis,
	...props
}) => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	return (
		<Wrapper>
			<HeadingH2 className="payment-heading">
				{t('common.payment_details_Cap')}
			</HeadingH2>
			<DetailWrapper>
				<li className="detail">
					<span className="detail-head">
						{social.social_media} - {social.title}
					</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(social.amount),
							false,
							false,
						)}
					</span>
				</li>
				<li className="detail">
					<span className="detail-head">
						{t('purchase_flow.additional_request')}
					</span>
					<span className="detail-value">
						{props.info}
					</span>
				</li>
				{social.amount != finalPrice && (
					<li className="detail">
						<span className="detail-head name">
							{t(hasDis ? 'common.discount' : 'common.promo_code_discount')}
						</span>
						<span className="detail-value">
              -{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(social.amount - finalPrice),
								false,
								false,
							)}
						</span>
					</li>
				)}
				<li className="detail bold">
					<span className="detail-head">{t('common.total')}</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(finalPrice),
							false,
							false,
						)}
					</span>
				</li>
			</DetailWrapper>
			<Checkout
				fanData={fanData}
				social={social}
				title={`${social.social_media} - ${social.title}`}
				promoDetails={hasDis ? {} : promoDet}
				starData={{
					userData: starData.userData,
					celbData: {
						...starData.celbData,
						rate: social.amount,
						bookingPrice: finalPrice,
					},
				}}
				returnUrl={`${window.location.origin}${window.location.pathname}`}
				bookingId={props.bookingId}
				zeroPayment={props.zeroPayment}
				onOptileFail={props.onOptileFail}
			/>
		</Wrapper>
	);
};

SocialPayment.propTypes = {
	social: PropTypes.object.isRequired,
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	zeroPayment: PropTypes.func.isRequired,
	promoDet: PropTypes.object,
	disabled: PropTypes.bool.isRequired,
	finalPrice: PropTypes.string.isRequired,
	hasDis: PropTypes.bool.isRequired,
	optileCheckout: PropTypes.bool.isRequired,
	bookingId: PropTypes.string,
	onOptileFail: PropTypes.func.isRequired,
};

SocialPayment.defaultProps = {
	bookingId: '',
	promoDet: {},
};

export default SocialPayment;
