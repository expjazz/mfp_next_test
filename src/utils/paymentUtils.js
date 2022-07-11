import { noDiscountList, noPromoList } from '../constants/requestTypes/requestDetails';
import { calculateBalanceAmount } from './dataformatter';
import { isEmpty } from './dataStructures';

export const getDiscount = (type, promoDetails, rate) => {
	if (noPromoList.indexOf(type) >= 0 || isEmpty(promoDetails)) {
		return null;
	}
	return calculateBalanceAmount(rate, promoDetails);
};

export const getDiscountedPrice = (type, discount, rate) => {
	if (!isEmpty(discount) && noDiscountList.indexOf(type) < 0) {
		const dis = Number(parseFloat(discount.discount).toFixed(0));
		if (
			discount.product_type.find(
				item => item.label === type || item.label === 'All products',
			)
		) {
			let amount = rate - rate * (dis / 100);
			amount = amount > 2 ? amount : 2;
			return amount;
		}
	}
	return '';
};

export const getDiscountedPriceTempFix = (type, discount, rate) => {
	if (!isEmpty(discount) && noDiscountList.indexOf(type) < 0) {
		const dis = Number(parseFloat(discount.discount).toFixed(0));
		if (
			discount.product_type.find(
				item => item.label === type || item.label === 'All products',
			)
		) {
			let amount = rate - rate * (dis / 100);
			amount = amount > 2 ? amount : 2;
			return amount;
		}
	}
	return rate;
};

export const hasDiscount = (type, discount) => {
	if (!isEmpty(discount)) {
		if (
			discount.product_type.find(
				item => item.label === type || item.label === 'All products',
			)
		) {
			return true;
		}
	}
	return false;
};
