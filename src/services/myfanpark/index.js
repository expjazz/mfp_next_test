import algoliasearch from 'algoliasearch';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { accountStatus } from 'src/constants/stars/accountStatus';
import localApi from 'src/lib/localApi';
import { parseUserData } from 'src/utils/parseUser';
import { getLocalApiUrl } from 'src/utils/urlUtils';
import { getFilterIndex, getFilterQuery, getList } from '../../../components/PageStyles/BrowseStars/utils/getList';
import { isBrowser, isVodacom } from '../../../customHooks/domUtils';
import Api from '../../lib/api';
import { isEmpty, processConfig } from '../../utils/dataStructures';
import { axiosFetch, localFetch } from '../fetch';
const apiTest = false;
export const getProfessions = async () => {

	let path = Api.getAllProfessions;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const res = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});

	// const res = await axiosFetch.get(Api.getAllProfessions, {
	// 	headers: {
	// 		device: 'web'
	// 	}
	// });


	return res.data.data.professions;
};

export const getAllProfessions = async (selectedCategoryId = null) => {

	let path = Api.getAllProfessions;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const resp = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});

	// const resp = await axiosFetch.get(Api.getAllProfessions, {
	// 	headers: {
	// 		device: 'web'
	// 	}
	// });
	let childProfession = [];
	if (resp.data && resp.data.data && resp.data.data.professions) {
		resp.data.data.professions.forEach(prof => {
			childProfession = [...childProfession, ...prof.child];
		});
	}
	let professions = resp.data.data.professions;
	if (selectedCategoryId) {
		const selectedCategory = professions.find(row => row.id === selectedCategoryId);
		professions = [selectedCategory, ...selectedCategory.child];
	}
	return {
		professions,
		subcategories: childProfession,
		allProfessions: resp.data.data.professions
	};

};

export const getEntity = async (domain, locale = 'en-US') => {
	// const headers = {
	//   'entity-id': entityId,
	//   'entity-token': entityToken,
	//   // 'origin': 'https://myfanpark.com'
	//   // 'origin': 'https://staging.starsona.com/'
	// }
	if (!isBrowser()) {
		axiosFetch.defaults.headers.origin = `https://www.${domain}`;
	}

	// console.log(resp.data.data.partner.regions[0].entities, entityId, 'final response')
	// console.log(process.env.NEXT_PUBLIC_BASE_URL, 'origin')
	// console.log(process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true' ? 'a' : 'b', 'preview')
	let path = Api.getEntity;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}&domain=${`https://www.${domain}`}`;
	}


	const resp = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});
		// const resp = await axiosFetch.get(Api.getEntity);


	let partnerData = resp.data.data.partner;
	let currencyData = {
		code: partnerData.country_code,
		symbol: partnerData.currency_symbol,
		name: partnerData.currency_name,
		conversion_rate: 1,
	};
	let selRegion = {};
	if (resp.data.data.partner?.is_partner) {
		selRegion = partnerData.regions.find(region => region.entities.find(ent => locale.toLowerCase().includes(ent.country_code.toLowerCase()))) || partnerData.regions[0];
		currencyData = selRegion.currencies[0];
		partnerData = {...selRegion.entities[0], regions: partnerData.regions};
	}
	axiosFetch.defaults.headers.common['entity-id'] = partnerData.entity_id;
	axiosFetch.defaults.headers.common['entity-token'] = partnerData.public_token;

	currencyData = {
		abbr: currencyData.code,
		symbol: currencyData.symbol,
		name: currencyData.name,
		rate: currencyData.conversion_rate
	};


	const partnerDefLanguage = {
		'id': 1,
		'language': 'English',
		'code': 'en_US',
		'short': 'EN',
		'default': true
	};
	const languageData = selRegion?.languages?.[0] || partnerData.language?.[0] || partnerDefLanguage;
	partnerData = {
		...partnerData,
		purchaserSingle: partnerData.purchaser_singular_name || '',
		purchaserPlural: partnerData.purchaser_plural_name || '',
		talentSingle: partnerData.talent_singular_name || '',
		talentPlural: partnerData.talent_plural_name || '',
		storeName: partnerData.storefront_name || '',
		purchSingleCap: partnerData.purchaser_singular_name ? partnerData.purchaser_singular_name.charAt(0).toUpperCase() + partnerData.purchaser_singular_name.slice(1) : '',
		purchaserSingleCap: partnerData.purchaser_singular_name ? partnerData.purchaser_singular_name.charAt(0).toUpperCase() + partnerData.purchaser_singular_name.slice(1) : '',
		purchPluralCap: partnerData.purchaser_plural_name ? partnerData.purchaser_plural_name.charAt(0).toUpperCase() + partnerData.purchaser_plural_name.slice(1) : '',
		talentsSingleCap: partnerData.talent_singular_name ? partnerData.talent_singular_name.charAt(0).toUpperCase() + partnerData.talent_singular_name.slice(1) : '',
		talentsPluralCap: partnerData.talent_plural_name ? partnerData.talent_plural_name.charAt(0).toUpperCase() + partnerData.talent_plural_name.slice(1) : '',
		talentsUrlPrefix: partnerData.talent_plural_name ? partnerData.talent_plural_name.toLowerCase() : '',
		siteNameCaps: partnerData.partner_brand_name ? partnerData.partner_brand_name.charAt(0).toUpperCase() + partnerData.partner_brand_name.slice(1) : '',
		storeNameCaps: partnerData.storefront_name ? partnerData.storefront_name.charAt(0).toUpperCase() + partnerData.storefront_name.slice(1) : '',
		storeNameSmall: partnerData.storefront_name ? partnerData.storefront_name.charAt(0).toLowerCase() + partnerData.storefront_name.slice(1) : '',
		siteName: partnerData.partner_brand_name ? partnerData.partner_brand_name : partnerData.partner_name || '',
		seoTitle: partnerData.seo_title || '',
		seoDesc: partnerData.seo_description || '',
		seoImage: partnerData.seo_image || '',
		seoKeywords: partnerData.seo_keywords || '',
		seoSiteName: partnerData.seo_site_name || '',
		dateFormat: partnerData?.base_date_format,
		partner_name: partnerData?.partner_brand_name || partnerData?.partner_name,
		products: {
			[requestTypesKeys.shoutout]: partnerData.allow_video_shoutout,
			[requestTypesKeys.event]: partnerData.allow_video_shoutout,
			[requestTypesKeys.qa]: partnerData.allow_video_shoutout,
			[requestTypesKeys.message]: partnerData.allow_direct_message,
			[requestTypesKeys.digitalGoods]: partnerData.allow_funstuff,
			[requestTypesKeys.socialShoutout]: partnerData.allow_social_shoutout,
			live: partnerData.allow_live_call,
			[requestTypesKeys.products]: partnerData.allow_product,
			[requestTypesKeys.commercial]: partnerData.allow_commercial,
			[requestTypesKeys.promotion]: partnerData.allow_social_commercial,
		}
	};
	return { partnerData, currencyData, languageData };

};

export const getConfig = async (entityId, entityToken) => {
	const resp = await axiosFetch.get(Api.getConfig, {
		headers: {
			'entity-id': entityId,
			'entity-token': entityToken
		}
	});

	return processConfig(resp.data.data.config);
};

export const sendFanCelebritySuggestion = async ({email, starName}) => {
	try {

		const { data } = await axiosFetch.post(Api.fanCelebritySuggestion, {
			email,
			star_name: starName
		});
		if (data.success) {
			return true;
		}
	} catch (e) {
		return false;
	}
};

export const getCelebDetails = async ({ celebrityId, entityId, entityToken }, fanData = false, isStar = false, domain = '') => {
	if (!celebrityId || celebrityId === 'talent') return null;
	const baseUrl = fanData ? `${Api.authGetCelebDetails}${celebrityId}` : Api.getCelebDetails(celebrityId);

	let path = `${baseUrl}?entity=${entityId}`;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const resp = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});
	// const resp = await axiosFetch.get(path);
	const { data } = resp;
	if (data?.success) {
		const isBookable = Boolean((data.data?.user.talent_status === accountStatus.live || data.data?.user.talent_status === accountStatus.hidden) && !isStar );
		return {...parseUserData(data.data), isBookable};
	}
	throw new Error('404 response');
};

export const getFeaturedVideos = async ({ celebrityId, offset, limit }) => {

	let path = `${Api.getVideosList}?user_id=${celebrityId}&limit=${limit}&offset=${offset}`;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const { data } = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});

	if (data?.success) {
		return data.data;
	}
	throw new Error('404 response');

};

export const getCelebrityFunStuff = async ({ celebrityId }) => {
	let path = `${Api.digitalGoods}${celebrityId}`;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const { data } = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});

	if (data?.success) {
		return data.data;
	}
	throw new Error('404 response');
};

export const getCelebritySocial = async ({ celebrityId }) => {
	let path = `${Api.fetchSocialDetails}${celebrityId}`;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const { data } = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});
	if (data?.success) {
		return data.data;
	}
	throw new Error('404 response');

};

export const getCelebrityReactionsFull = async ({ celebrityId }, limit=10, offset=0) => {
	let path = `${Api.getStarReaction}${celebrityId}?limit=${limit}&offset=${offset}`;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const { data } = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});

	if (data?.success) {
		return data.data;
	}
	throw new Error('404 response');

};

export const getCelebrityProducts = async ({ celebrityId }) => {

	let path = `${Api.sendProducts}${celebrityId}`;
	if (isVodacom() || apiTest) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}

	const { data } = await axiosFetch.get(path, {
		...(isVodacom() || apiTest ? {
			baseURL: getLocalApiUrl()
		} : {})
	});

	if (data?.success) {
		return data.data;
	}
	throw new Error('404 response');

};

export const getCelebrityTopProducts = async ({ celebrityId }) => {

	const { data } = await axiosFetch.get(`${Api.topProducts}${celebrityId}`);

	if (data?.success) {
		return data.data;
	}
	throw new Error('404 response');

};

export const getCelebritySimilarStars = async ({ celebrityId }, limit=10, offset=0) => {

	const { data } = await axiosFetch.get(`${Api.similarStars}${celebrityId}?limit=${limit}&offset=${offset}`);

	if (data?.success) {
		return data.data;
	}
	throw new Error('404 response');

};

export const getRequestDetails = (
	bookingId,
	isLoggedIn,
	isBookingId,
	draft = false,
) => {
	let apiUrl = `${Api.getRequestDetails}${bookingId}/${
		isBookingId ? `?starsona=true&draft=${draft} ` : ''
	}`;
	if (!isLoggedIn) {
		apiUrl = `${Api.getRequestDetails}${bookingId}/get/${
			isBookingId ? `?starsona=true&draft=${draft} ` : ''
		}`;
	}
	return axiosFetch.get(apiUrl).then(resp => resp.data);
};

export const fetchActivitiesList = async (
	bookingId,
	offset,
	limit,
	refresh,
	apiOptions = {},
) => {
	const { isPublic, isAll, isBookingId } = apiOptions;
	const isLoggedIn = false;
	let apiUrl = '';
	apiUrl = `${Api.getRecentActivity}${bookingId}/public_list/?offset=${offset}&limit=${limit}&starsona=true`;
	const res = await axiosFetch.get(apiUrl);
	const data = res.data;
	if (data && data.success) {
		return data.data;
	}
	throw new Error('404 response');

};

export const getRecentRequest = (offset, limit, vanity) => {
	return axiosFetch
		.get(`${Api.recentRequestList}${vanity}?limit=${limit}&offset=${offset}`)
		.then(resp => {
			return resp.data.data;
		})
		.catch(err => {
			return err;
		});
};

export const getGalleryImage = async (celebrityId) => {
	const { data } = await axiosFetch.get(`${Api.galleryImage}${celebrityId}`);
	return data.data.gallery.map(image => {
		const width = image.thumbnail
			? image.thumbnail_width
			: image.width;
		const height = image.thumbnail
			? image.thumbnail_height
			: image.height;
		const ratio = width / height;
		return {
			...image,
			key: image.id,
			src: image.thumbnail || image.gallery_image,
			width,
			height,
			ratio,};});

};

export const fetchCelebrityList = (offset, refresh, filters, celebList, entityData, getUSDAmount = amount => amount) => {
	const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_ID, process.env.NEXT_PUBLIC_ALGOLIA_TOKEN);

	const {
		category,
		searchParam,
		lowPrice,
		highPrice,
		sortValue,
		products,
		countries,
		tag,
		regionCheck,
		dynamicFilter,
	} = filters;
	const subCategoryList = filters.category.selected;
	const professsion =
    subCategoryList && subCategoryList.length
    	? subCategoryList.map(cat => cat.id)
    	: category.value;
	const indexName = getFilterIndex(sortValue, entityData.algolia_index);
	const { currentHash, limit } = celebList;
	const filterQuery = getFilterQuery({
		professions: professsion,
		uRate: getUSDAmount(highPrice),
		lRate: getUSDAmount(lowPrice),
		tag: !isEmpty(tag) ? tag.id : null,
		products,
		partnerData: entityData
	});
	const index = client.initIndex(indexName);
	const hash = `${indexName}${filterQuery}${offset}${limit}`;
	if (currentHash !== hash) {
		const searchId = Date.now();
		return index
			.search('', {
				length: limit,
				optionalFilters: [
					`partner_entity_id:${entityData.entity_id}`
				],
				filters: `${filterQuery}`,
				// filters: filterQuery,
				offset,
			})
			.then((data) => {
				let list = celebList.data;
				const listData = getList(data.hits);
				const { nbHits: count } = data;
				if (refresh) {
					list = listData;
				} else {
					list = [...list, ...listData];
				}
				return {
					data: list,
					offset,
					limit,
					count,
					currentCategory: category.label,
					loading: false,
					searchParam,
					isLoggedIn: false,
					hash,
				};
				// return data
			})
			.catch(err => {
				console.log(err, 'error');
				return {
					data: celebList.data,
					offset,
					limit,
					count: celebList.count,
					currentCategory: category.label,
					loading: false,
					searchParam,
					isLoggedIn: false,
					hash,
				};
				// alert(err)
				// dispatch(celebListFetchFailed(err));
			});
	}
};

export const getSalesMessages = ({category, currentCat}) => {
	// if (typeof token !== typeof undefined) {
	//   token.cancel('Operation canceled due to new request.');
	// // }
	// console.log('inside sales messg')
	// alert('sales msg')
	const currentCatVal = category.selected.length === 1 ? category.selected[0].id : category.value;
	if (currentCat !== currentCatVal) {
		return axiosFetch.get(`${Api.getSaleMessages}?profession=${currentCatVal}`).then((resp) => {
			if (resp.data && resp.data.success) {
				return {
					messages: resp.data.data.messages,
					rowCount: resp.data.data.count
				};
				// dispatch(salesMessagesFetchSuccess(resp.data.data.messages, resp.data.data.count));
			} else {
			}
		}).catch((exception) => {
			// alert(exception)
		});
	}
};

export const getTagDetails = tagName => {
	return axiosFetch(`${Api.getTagDetails}?tag=${tagName}`).then(resp => resp.data).catch(e => ({ error: true }));
};

export const getV3Users = async users => {
	const { data: res } = await axiosFetch.post(Api.getV3Users, users);
	if (res.success) {
		return res.data;
	}

};

export const regCollectorAction = payload => {
	return axiosFetch
		.post(Api.regCollector, {
			...payload,
		})
		.then(resp => resp.data);
};

export const getEntityPaths = async (entityId, entityToken) => {
	const headers = {
		'entity-id': entityId,
		'entity-token': entityToken,
		// 'origin': 'https://myfanpark.com'
		// 'origin': 'https://staging.starsona.com/'
	};
	if (!isBrowser()) {
		headers.origin = process.env.NEXT_PUBLIC_BASE_URL;
	}
	const resp = await axiosFetch.get(Api.getEntity, {
		headers,
	});

	let partnerData = resp.data.data.partner;

	return partnerData.regions;
};

export const follow = (payload, method = 'get') => {
	return axiosFetch[method](`${Api.followSuggestions}`, payload)
		.then(resp => {
			return resp.data;
		})
		.catch(err => {
			return err;
		});
};

export const toggleActivityVisibility = (activityId, callBack, queryClient, dispatch) => {
	return axiosFetch
		.post(Api.toggleActivityVisibility, {
			activity: activityId,
		})
		.then(resp => {
			if (resp.data && resp.data.success) {
				if (callBack) callBack();
				// const {
				//   data: activitiesList,
				//   count,
				//   offset,
				// } = getState().activitiesList;
				// const activity = activitiesList.find(
				//   activityItem => activityItem.id === activityId,
				// );
				// const activityIndex = activitiesList.findIndex(
				//   activityItem => activityItem.id === activityId,
				// );
				// activity.public_visibility = !activity.public_visibility;
				// const newList = cloneDeep(activitiesList);
				// newList[activityIndex] = activity;
				// dispatch(activitiesListFetchSuccess(newList, count, offset));
				queryClient.refetchQueries(['fan-act-list']);
			}
		});
};

export const generalPromocode = async () => {
	const resp = await axiosFetch.get(Api.generalPromocode);
	if (resp?.data) {
		return resp?.data?.data?.promocodes;
	}
};