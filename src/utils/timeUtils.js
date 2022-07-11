import moment from 'moment';
import { i18n } from 'next-i18next';

export const getTime = (time, show7day = false) => {
	if (show7day) {
		const dateofvisit = moment(time);
		const today = moment();
		const days = today.diff(dateofvisit, 'days');
		if (days > 6) return moment(time).format('MMM D, YYYY hh:mmA');
	}
	moment.relativeTimeThreshold('s', 0);
	moment.relativeTimeThreshold('m', 60);
	moment.relativeTimeThreshold('h', 24);
	moment.relativeTimeThreshold('d', 25);

	const timeObject = moment(time);
	// moment.updateLocale("en", {
	//   relativeTime: {
	//     m: "a min",
	//     mm: "%d min",
	//   }
	// })
	return timeObject.fromNow();
};

export const getTimeString = timeString => {
	const momentObj = moment(timeString, 'hh:mm:ss');
	const hoursString =
    momentObj.hours() > 0
    	? `${i18n.t('common.hourCount', { count: momentObj.hours() })} `
    	: '';
	const minutesString =
    momentObj.minutes() > 0
    	? `${i18n.t('common.minuteCount', { count: momentObj.minutes() })} `
    	: '';
	const secondsString =
    momentObj.seconds() > 0
    	? `${i18n.t('common.secondCount', { count: momentObj.seconds() })} `
    	: '';
	return `${hoursString}${minutesString}${secondsString}`;
};

export const canStarShare = date => {
	const validShareDate =
    (date && moment().diff(moment(date), 'days') > 1) || !date;
	return validShareDate;
};

export const tzAbbr = dateInput => {
	const dateObject = dateInput || new Date();
	const dateString = dateObject + '';
	let tzAbbr =
    dateString.match(/\(([^\)]+)\)$/) || dateString.match(/([A-Z]+) [\d]{4}$/);
	if (tzAbbr) {
		let result = tzAbbr[1]?.match(/[A-Z]/g)?.join('');
		if (result) tzAbbr = result;
	}
	return tzAbbr;
};
