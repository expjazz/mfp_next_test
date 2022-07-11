// import { accountStatus } from 'constants/requestTypes/accountStatus';
import { accountStatus } from '../../../../src/constants/stars/accountStatus';
import { requests } from '../constants';
// import { requests } from '../constants';

export const getList = (listData) => {
	let List = [];
	List = listData.map(listItem => {
		return {...listItem, lowest_price: listItem.lowest_rate, user_id: listItem.vanity_url};
	});
	return List;
};

export const getFilterIndex = (sort, defaultIndex) => {
	if (sort === 'az') {
		return process.env.NEXT_PUBLIC_SEARCH_ALPH_INDEX;
	} else if (sort === 'lpf') {
		return process.env.NEXT_PUBLIC_SEARCH_PRICE_ASC_INDEX;
	} else if (sort === 'hpf') {
		return process.env.NEXT_PUBLIC_SEARCH_PRICE_DESC_INDEX;
	}
	return defaultIndex;
};

const getProductAndPrice = (queryString, products, { lRate, uRate }) => {
	const array = products.split(',');
	const productAlgoliaHash = {
		commercial_requests: 'commercial_price_range',
		fun_items: 'fun_price_range',
		merchandise: 'merch_price_range',
		shoutouts: 'video_lowest_price',
		messages: 'dm_lowest_price',
		social_interactions: 'social_price_range',
		live_items: 'live_call_price_range',
		duet: 'social_price_range'
	};
	const complex = ['fun_items', 'social_interactions', 'live_items', 'merchandise', 'commercial_requests'];
	let newQueryString = `${queryString} (`;
	array.forEach((product, index) => {
		if (!complex.includes(product)) {

			if ((lRate === 1 && uRate === 500) || lRate === 100) {
				newQueryString = `${newQueryString} ${index === 0 ? '' : 'OR ' }${productAlgoliaHash[product]} >= ${lRate}`;
			} else {
				newQueryString = `${newQueryString} ${index === 0 ? '' : 'OR ' }${productAlgoliaHash[product]}: ${lRate} TO ${uRate}`;
			}
		} else {
			const rateInt = parseInt(lRate);
			if (rateInt < 1) {
				newQueryString = `${newQueryString} ${index === 0 ? '' : 'OR ' }${productAlgoliaHash[product]}.under_twenty >= ${0}`;
			} else if (rateInt <= 20) {
				newQueryString = `${newQueryString} ${index === 0 ? '' : 'OR ' }${productAlgoliaHash[product]}.twenty_fifty >= ${0}`;
			} else if (rateInt <= 50) {
				newQueryString = `${newQueryString} ${index === 0 ? '' : 'OR ' }${productAlgoliaHash[product]}.fifty_hundred >= ${0}`;
			} else if (rateInt <= 100) {
				newQueryString = `${newQueryString} ${index === 0 ? '' : 'OR ' }${productAlgoliaHash[product]}.over_hundred >= ${0}`;
			}
		}
	});
	return `${newQueryString  })`;
};

const getServiceQuery = (queryString, products, partnerData) => {
	let newQueryString = queryString;
	const productKeys = products.split(',');
	productKeys.forEach((prodKey, prodIndex) => {
		const foundReq = requests(partnerData).find(req => req.key === prodKey);
		if (foundReq) {
			if (prodIndex === 0) {
				newQueryString = `${newQueryString}(`;
			} else {
				newQueryString = `${newQueryString} AND (`;
			}
			foundReq.updateKeys.forEach((upKey, upIndex) => {
				if (upIndex !== 0) {
					newQueryString = `${newQueryString} OR `;
				}
				newQueryString = ` ${newQueryString}services.${upKey}:true`;
			});
			newQueryString = `${newQueryString})`;
		}
	});
	return newQueryString;
};

export const getFilterQuery = ({
	professions,
	uRate,
	lRate,
	tag,
	products,
	partnerData
}) => {
	const regionShare = partnerData?.entity_id !== 'SUPERSPORT-ZA-1';
	const entity = partnerData?.entity_id === 'SUPERSPORT-ZA-1' ? 'MYFANPARK-ZA-1' : partnerData?.entity_id;
	let queryString = `${!regionShare ? `readable_entity_name:${entity} AND ` : ''}(talent_status: ${accountStatus.live} OR talent_status: ${accountStatus.paused}) AND`;
	if (partnerData?.entity_id === 'SUPERSPORT-ZA-1') {
		queryString += ' professions:1 AND';
	}
	if (professions && Array.isArray(professions)) {
		professions.forEach((prof, index) => {
			if (!index) {
				queryString = `${queryString} (professions:${prof}${index === professions.length - 1 ? ')' : ' OR '}`;
			} else if (index === professions.length - 1) {
				queryString = `${queryString}professions:${prof})`;
			} else {
				queryString = `${queryString}professions:${prof} OR `;
			}
		});
		queryString = `${queryString} AND`;
	} else if (professions) {
		queryString = `${queryString} professions: ${professions}`;
		queryString = `${queryString} AND`;
	}
	if (tag) {
		queryString = `${queryString} _tags: ${tag} AND`;
	}
	if (!products) {
		if ((lRate === 1 && uRate === 500) || lRate === 100) {
			queryString = `${queryString} lowest_rate >= ${lRate}`;
		} else {
			queryString = `${queryString} lowest_rate: ${lRate} TO ${uRate}`;
		}
	}
	if (products) {
		queryString = getServiceQuery(queryString, products, partnerData);
		if (lRate !== 1 || uRate !== 500) {
			queryString = `${queryString} AND `;
			queryString = getProductAndPrice(queryString, products, { lRate, uRate });
		}

	}
	return queryString;
};
