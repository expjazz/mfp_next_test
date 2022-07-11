import { requestTypeTitle } from '../constants/requestTypes';
import { getFor } from './dataformatter';

export const starProfessionsFormater = (list, type) => {
	let string = '';
	if (list) {
		list.forEach((profession, index) => {
			if (index === list.length - 1) {
				string += `${type === 'search' ? profession : profession.title}`;
			} else {
				string += `${
					type === 'search' ? profession : profession.title
				}\xa0|\xa0`;
			}
		});
		return string;
	}
};

export const getShortName = (nickName = '', firstName = '') => {
	return nickName && nickName !== '' ? nickName : firstName;
};

export const getStarName = (nickName = '', firstName = '', lastName = '') => {
	return nickName && nickName !== '' ? nickName : `${firstName} ${lastName}`;
};

export const getInititals = (firstName = '', lastName = '') => {
	return `${firstName.charAt(0)} ${lastName.charAt(0)}`;
};

export const videoTitleGenerator = (requestType, occasion) => {
	if (requestType === 3) {
		// Q&A video
		return `Q&A ${requestTypeTitle[requestType]}`;
	}
	return `${occasion} ${requestTypeTitle[requestType]}`;
};

export const shareTitleGenerator = (bookingType, fullName) => {
	let title = '';
	if (requestTypes[bookingType] === 'Shout-out') {
		title = `Watch this video shoutout from ${fullName}`;
	} else if (requestTypes[bookingType] === 'Event') {
		title = `Check out my video announcement courtesy of ${fullName}`;
	} else if (requestTypes[bookingType] === 'Q&A') {
		title = `${fullName} answers my ${entity('purchaserSingle')} question!`;
	}
	return title;
};

export const myVideoCancelReason = (
	cancelCode,
	starName = '',
	fanName = '',
) => {
	switch (cancelCode) {
	case 1:
		return i18n.t('common.cancelledBy', { name: fanName });
	case 2:
		return i18n.t('common.cancelledBy', { name: starName });
	case 3:
		return i18n.t('common.expiredRequest');
	default:
		return '';
	}
};

export const generateSmsTitle = bookingData => {
	const forUser = getFor(bookingData);
	return `Check out this ${requestTypeTitle[bookingData.request_type]} from ${
		bookingData.celebrity
	} ${forUser ? `for ${forUser}` : ''}`;
};

export const calcMessageAmt = baseAmt => {
	const getToFixed = val => {
		return parseFloat(Math.round(val)).toFixed(2);
	};
	let amount = 2.0;
	if (baseAmt > 499) {
		const split = baseAmt / 12;
		amount = Math.round(split / 10) * 10;
		return getToFixed(amount);
	} else if (baseAmt > 50) {
		amount = Math.round(baseAmt / 10);
		return getToFixed(amount);
	}
	amount = baseAmt / 8;
	if (amount >= 2) return getToFixed(amount);
	return getToFixed(2);
};

export const commaSeparator = (list, key) => {
	let string = '';
	if (list) {
		list.forEach((listItem, index) => {
			if (index === list.length - 1) {
				string += `${listItem[key]}`;
			} else {
				string += `${listItem[key]}, `;
			}
		});
		return string;
	}
};

export const pipeSeparator = (list, key) => {
	let string = '';
	if (list) {
		list.forEach((listItem, index) => {
			if (index === list.length - 1) {
				string += `${listItem[key]}`;
			} else {
				string += `${listItem[key]} | `;
			}
		});
		return string;
	}
};