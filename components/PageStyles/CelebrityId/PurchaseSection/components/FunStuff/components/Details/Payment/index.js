import React from 'react';
import PropTypes from 'prop-types';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { HeadingH2 } from 'styles/TextStyled';
import { DetailWrapper } from '../../../../../outterStyled';
import { Wrapper } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const FunPayment = ({
	fanData,
	starData,
	funStuff,
	promoDet,
	finalPrice,
	hasDis,
	starNM,
	details,
	...props
}) => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	return (
		<Wrapper>
			<HeadingH2 className="payment-heading">
				{t('common.payment_details_Cap')}
			</HeadingH2>
			<DetailWrapper>
				<li className="detail">
					<span className="detail-head name">
						{t('common.itemFrom', { item: funStuff.title, starName: starNM })}
					</span>
					<span className="detail-value">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(funStuff.price),
							false,
							false,
						)}
					</span>
				</li>
				{funStuff.price != finalPrice && (
					<li className="detail">
						<span className="detail-head">
							{t(hasDis ? 'common.discount' : 'common.promo_code_discount')}
						</span>
						<span className="detail-value">
              -{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(funStuff.price - finalPrice),
								false,
								false,
							)}
						</span>
					</li>
				)}
				{
					details && (
						<li className="detail">
							<span className="detail-head name">
						Details
							</span>
							<span className="detail-value">
								{details}
							</span>
						</li>
					)
				}
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
				title={t('common.itemFrom', { item: funStuff.title, starName: starNM })}
				fanData={fanData}
				funStuff={funStuff}
				promoDetails={hasDis ? {} : promoDet}
				starData={{
					userData: starData.userData,
					celbData: {
						...starData.celbData,
						rate: funStuff.price,
						bookingPrice: finalPrice,
					},
				}}
				// returnUrl={`${window.location.origin}${window.location.pathname}`}
				bookingId={props.bookingId}
				zeroPayment={props.zeroPayment}
				onOptileFail={props.onOptileFail}
			/>
		</Wrapper>
	);
};

FunPayment.propTypes = {
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

FunPayment.defaultProps = {
	bookingId: '',
	promoDet: {},
};

export default FunPayment;
