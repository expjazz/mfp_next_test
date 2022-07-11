import React from 'react';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
// import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { getDiscount, getDiscountedPrice } from 'utils/paymentUtils';
// import { getLocalAmount } from 'utils/currencyUtils';
import { PriceBold, Discount, PriceWrap } from './styled';
import { numberToDecimalWithFractionTwo } from '../../src/utils/dataformatter';
import { isEmpty } from '../../src/utils/dataStructures';
import { getDiscount, getDiscountedPrice } from '../../src/utils/paymentUtils';
import { Strike } from '../../styles/CommonStyled';
import { useGetLocalAmount } from '../../customHooks/currencyUtils';

const RateDisplay = ({ type, rate, promoDetails, discountObj, rType, small }) => {
	let discount = 0;
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	if (!isEmpty(discountObj)) {
		discount = getDiscountedPrice(rType, discountObj, rate);
		discount = getLocalAmount(discount);
		if (!discount) {
			discount = getDiscount(
				type,
				!isEmpty(promoDetails) && promoDetails.type !== 'percentage' ? {
					...promoDetails,
					discount: getLocalAmount(promoDetails.discount),
				} : promoDetails,
				getLocalAmount(rate)
			);
		}
	} else {
		discount = getDiscount(
			type,
			!isEmpty(promoDetails) && promoDetails.type !== 'percentage' ? {
				...promoDetails,
				discount: getLocalAmount(promoDetails.discount),
			} : promoDetails,
			getLocalAmount(rate)
		);
	}
	if (discount === null || discount === getLocalAmount(rate)) {
		return (
			<PriceBold className='price-bold'>
				{getLocalSymbol()}
				{
					numberToDecimalWithFractionTwo(getLocalAmount(rate), false, false)
				}
			</PriceBold>
		);
	}
	return (
		<PriceWrap className='price-wrap' style={{ display: 'inline-flex' }}>
			<Strike>
				{getLocalSymbol()}
				{numberToDecimalWithFractionTwo(getLocalAmount(rate), false, false)}
			</Strike>
			<Discount>
				{getLocalSymbol()}
				{numberToDecimalWithFractionTwo(discount, false, false)}
			</Discount>
		</PriceWrap>
	);
};

RateDisplay.defaultProps = {
	promoDetails: {},
};

RateDisplay.propTypes = {
	type: PropTypes.number.isRequired,
	rate: PropTypes.string.isRequired,
	promoDetails: PropTypes.object,
	discountObj: PropTypes.object,
	rType: PropTypes.string,
};
RateDisplay.defaultProps = {
	rType: '',
	discountObj: {},
	promoDetails: {},
};

export default RateDisplay;
