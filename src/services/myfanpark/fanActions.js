import { generalLoader } from 'src/context/general';
import Api from 'src/lib/api';
import { parseUserData } from 'src/utils/parseUser';
import { axiosFetch } from '../fetch';

export const fetchFanActivitiesList = (
	bookingId,
	offset,
	refresh,
	prevData = { count: 0 },
	apiOptions = {},
	dispatch = () => {},
	isLoggedIn = true,
) => {
	const { count } = prevData;
	const limit = 20;
	const { isPublic, isAll, isBookingId } = apiOptions;
	let apiUrl = '';
	if (isPublic) {
		if (isAll) {
			apiUrl = !isLoggedIn
				? `${Api.getRecentActivity}${bookingId}/public_list/${
					isBookingId ? '?starsona=true' : ''
				}`
				: `${Api.getRecentActivity}${bookingId}/public_list/${
					isBookingId ? '?starsona=true' : ''
				}`;
		} else {
			apiUrl = !isLoggedIn
				? `${
					Api.getRecentActivity
				}${bookingId}/public_list/?offset=${offset}&limit=${limit}${
					isBookingId ? '&starsona=true' : ''
				}`
				: `${
					Api.getRecentActivity
				}${bookingId}/public_list/?offset=${offset}&limit=${limit}${
					isBookingId ? '&starsona=true' : ''
				}`;
		}
	} else if (isAll) {
		apiUrl = `${Api.getRecentActivity}${bookingId}/${
			isBookingId ? '?starsona=true' : ''
		}`;
	} else {
		apiUrl = `${
			Api.getRecentActivity
		}${bookingId}/?offset=${offset}&limit=${limit}${
			isBookingId ? '&starsona=true' : ''
		}`;
	}
	generalLoader(dispatch, true);
	return axiosFetch
		.get(apiUrl)
		.then(resp => {
			generalLoader(dispatch, false);
			if (resp.data && resp.data.success) {
				let list = prevData.data || [];
				const newCount = offset === 0 ? resp.data.data.count : count;
				if (refresh) {
					list = resp.data.data.recent_activities;
				} else {
					list = [...list, ...resp.data.data.recent_activities];
				}
				return {
					data: list,
					count: newCount,
					offset,
					loading: false,
					limit: 20
				};
			}
		})
		.catch(exception => {
			generalLoader(dispatch, false);
			console.log('recent activities error: ', exception);
		});
};

export const fetchCelebDetails = (id, templateId, fullQuery = '', dispatch = () => {}, isLoggedIn = true, entity = '') => {
	if (!id) return null;
	let API_URL;
	if (isLoggedIn) {
		API_URL = `${Api.authGetCelebDetails}${id}/?entity=${entity}${
			templateId ? `&tid=${templateId}${fullQuery}` : ''
		}`;
	} else {
		API_URL = `${Api.getCelebDetails(id)}?entity=${entity}${
			templateId ? `&tid=${templateId}${fullQuery}` : ''
		}`;
	}
	generalLoader(dispatch, true);
	return axiosFetch
		.get(API_URL)
		.then(resp => {
			if (resp.data && resp.data.success && resp.data.data.user.celebrity) {
				generalLoader(dispatch, false);
				return parseUserData(resp.data.data);
			} else {
				const error = resp.data.success ? 'Wrong account' : 'Something went wrong. Please try again.';
				generalLoader(dispatch, false);
				updateToast(dispatch, {
					value: true,
					message: error,
					variant: 'error',
				});
			}
		})
		.catch(exception => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message:
          exception.response && exception.response.data
          	? exception.response.data.error.message
          	: '',
				variant: 'error',
			});
		});
};

export const fetchFavouritesList = (offset, refresh, dispatch, isLoggedIn, prevData) => {
	// generalLoader(dispatch, true)
	const limit = 20;
	return axiosFetch.get(`${Api.getUserFavourites}?offset=${offset}&limit=${limit}`)
		.then((resp) => {
			generalLoader(dispatch, false);
			if (resp.data && resp.data.success && isLoggedIn) {
				let list = prevData.data;
				const { count } = resp.data.data;
				if (refresh) {
					list = resp.data.data.celebrity_list;
				} else {
					list = [...list, ...resp.data.data.celebrity_list];
				}
				return {
					data: list,
					offset,
					count,
					limit: 20
				};
			} else {
				return {
					data: [],
					offset,
					count,
					limit: 20
				};
				// dispatch(favouritesListFetchEnd());
			}
		}).catch((exception) => {
			generalLoader(dispatch, false);
		});
};

export const postNewAudioExternalFile = (file, uniqueId) => {
	return axiosFetch.post(Api.postExternalAudio, {
		unique_id: uniqueId,
		file
	});
};

export const deleteNewAudioExternalFile = (uniqueId) => {
	return axiosFetch.delete(`${Api.postExternalAudio}1/`, {
		unique_id: uniqueId,
	});
};