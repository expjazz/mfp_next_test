/* eslint-disable camelcase */
import { isEmpty } from 'src/utils/dataStructures';
import i18n from 'i18next';
import { isVodacom } from 'customHooks/domUtils';

export function numberToDollarFormatter(input) {
	let prefix = '$';
	if (input < 0) {
		prefix = '-$';
	}
	const newInput = Math.abs(parseFloat(input));
	return prefix + newInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberToCommaFormatter(input) {
	if (!input) {
		return 0;
	}
	if (typeof input === 'string') {
		return input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	return parseFloat(input, 10)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function commaToNumberFormatter(input) {
	if (!input) {
		return 0;
	}
	return parseFloat(input.replace(/,/g, ''), 10);
}

export function iosPriceFinder(actualPrice, priceList) {
	let iosPrice = '';
	for (let i = 0; i < priceList.length; i++) {
		const currentPrice = priceList[i].price;
		if (
			actualPrice === currentPrice ||
      parseFloat(actualPrice - currentPrice).toFixed(2) === '0.01'
		) {
			iosPrice = currentPrice;
			break;
		} else if (currentPrice > actualPrice) {
			iosPrice = currentPrice;
			break;
		}
	}
	return iosPrice;
}

/**
 *
 * @param {string} queryString query string to specify mini-program path
 * @returns Complete url with query string for vodapay
 */
export function generateVodacomShareLink(queryString) {
	const baseUrlVodacom = 'https://app.adjust.com/30q9i84?deep_link=';
	const encodedQuery = encodeURIComponent(queryString);
	const vodaPayload = `vodapaywallet://deeplink.htm?action=miniapp&miniappId=${process.env.NEXT_PUBLIC_VODACOM_APP_ID}&query=${encodedQuery}`;
	return `${baseUrlVodacom}${encodeURIComponent(vodaPayload)}`;
}

export function findCompletedVideo(bookingData) {
	if (bookingData && bookingData.request_video) {
		const finalVideo = bookingData.request_video.find(
			videoItem => videoItem.video_status === 1,
		);
		if (isVodacom() && finalVideo) {
			const queryString = `page=video&id=${finalVideo?.video_id}`;
			const vodapayLink = generateVodacomShareLink(queryString);
			finalVideo.video_url = vodapayLink || '';
		}
		return finalVideo || {};
	}
	return {};
}

export function parseQueryString(queryString) {
	const queryList = {};
	if (queryString) {
		const query = queryString.split('?')[1];
		const queryItem = query.split('&');
		queryItem.forEach(item => {
			const queryArray = item.split('=');
			queryList[queryArray[0]] = queryArray[1];
		});
	}
	return queryList;
}

export const getFor = bookingData => {
	const requestDetails = bookingData.request_details;
	if (
		requestDetails &&
    bookingData.occasion_id !== 18 &&
    bookingData.occasion_id !== 24
	) {
		const { is_myself, templateType, event_guest_honor } = requestDetails;
		let { stargramto } = requestDetails;
		if (templateType === 7) {
			stargramto = event_guest_honor;
		}
		if (!isEmpty(stargramto) && stargramto !== 'YOU') {
			return stargramto;
		}
		return bookingData.fan_first_name;
	}
	return bookingData.fan_first_name;
};

export const checkFromName = bookingData => {
	const requestDetails = bookingData.request_details;
	if (
		requestDetails &&
    requestDetails.is_myself !== undefined &&
    bookingData.occasion_id !== 18 &&
    bookingData.occasion_id !== 24 &&
    !requestDetails.is_myself
	) {
		const { templateType, stargramto } = requestDetails;
		let { stargramfrom } = requestDetails;
		if (templateType === 7 || templateType === 6) {
			stargramfrom = stargramto;
		}
		return stargramfrom;
	}
	return '';
};

export const getFrom = (bookingData, t = false) => {
	const stargramfrom = checkFromName(bookingData);
	if (!isEmpty(stargramfrom))
		return ` ${t ? t('open_bookings.from') : i18n.t('open_bookings.from')} ${stargramfrom}`;
	return '';
};

export const numberToDecimalWithFractionTwo = (
	number,
	showTrailing = false,
	showDollar = true,
) => {
	let numberStr = `${showDollar ? '$' : ''}${parseFloat(number)
		.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

	if (!showTrailing) {
		numberStr = numberStr.replace(/[.,]00$/, '');
	}
	return numberStr || 0;
};

export const getUserImage = imageObject => {
	return imageObject && (imageObject.thumbnail_url || imageObject.image_url);
};

export const validateEmail = email => {
	const regX = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	if (regX.test(email)) {
		return false;
	}
	return true;
};

export const getRandomString = arrayItem => {
	return arrayItem[Math.floor(Math.random() * arrayItem.length)];
};

export const calculateBalanceAmount = (rate, promoDetails) => {
	let balAmount = rate;
	if (!isEmpty(promoDetails)) {
		const offer =
      promoDetails.type === 'percentage'
      	? rate * (promoDetails.discount / 100)
      	: promoDetails.discount;
		balAmount = rate - offer;
	}
	return balAmount < 0 ? 0 : parseFloat(balAmount).toFixed(2);
};

export const arrayShuffle = array => {
	return array.sort(() => Math.random() - 0.5);
};

export const arrayIncludesArray = (arr, target) => {
	return target.every(v => arr.includes(v));
};

export const correctQueryTitle = query => Array.isArray(query) ? query[0] : query;