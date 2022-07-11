import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { HeadingH2 } from 'styles/TextStyled';
import { DetailWrapper } from '../../../../../outterStyled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const ProductPayment = ({
	fanData,
	starData,
	hasDis,
	starNM,
	promoDet,
	finalPrice,
	product,
	...props
}) => {
	const { t } = useTranslation();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();

	return (
		<Wrapper>
			<HeadingH2 className="payment-heading">
				{t('common.payment_details_Cap')}
			</HeadingH2>
			<DetailWrapper>
				<li className="detail">
					<span className="detail-head name">
						{t('common.itemFrom', { item: product.title, starName: starNM })}
					</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(product.price),
							false,
							false,
						)}
					</span>
				</li>
				{product.price != finalPrice && (
					<li className="detail">
						<span className="detail-head">
							{t(hasDis ? 'common.discount' : 'common.promo_code_discount')}
						</span>
						<span className="detail-value">
              -{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(product.price - finalPrice),
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
				title={t('common.itemFrom', { item: product.title, starName: starNM })}
				promoDetails={hasDis ? {} : promoDet}
				product={product}
				starData={{
					userData: starData.userData,
					celbData: {
						...starData.celbData,
						rate: product.price,
						bookingPrice: finalPrice,
					},
				}}
				returnUrl={`${window.location.origin}${window.location.pathname}`}
				bookingId={props.bookingId}
				deferral="NON_DEFERRED"
				zeroPayment={props.zeroPayment}
				onOptileFail={props.onOptileFail}
			/>
		</Wrapper>
	);
};

ProductPayment.propTypes = {
	product: PropTypes.object.isRequired,
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	paymentHandler: PropTypes.func.isRequired,
	zeroPayment: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	hasDis: PropTypes.bool.isRequired,
	optileCheckout: PropTypes.bool.isRequired,
	bookingId: PropTypes.string,
	onOptileFail: PropTypes.func.isRequired,
};

ProductPayment.defaultProps = {
	bookingId: '',
};

export default ProductPayment;
