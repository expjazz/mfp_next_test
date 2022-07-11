import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { isVodacom } from 'customHooks/domUtils';
import moment from 'moment';
import { i18n } from 'next-i18next';
import { generalLoader, updateToast } from 'src/context/general';
import Api from 'src/lib/api';
import localApi from 'src/lib/localApi';
import paymentApi from 'src/lib/paymentApi';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { DJANGO_BASE_API, getLocalApiUrl, getServerDomain, IS_DEVELOPMENT } from 'src/utils/urlUtils';
import { axiosFetch, paymentFetch } from '../fetch';

export const fetchCelebVideosList = (id, offset, refresh, customLimit, celebVideos, router = {}) => {

	const { limit } = celebVideos;

	const newLimit = customLimit || limit;

	let path = `${Api.getVideosList}?limit=${newLimit}&offset=${offset}&user_id=${id}`;
	if (isVodacom()) {
		path = `${localApi.purchaseVideos}?base=${path}`;
	}
	return axiosFetch.get(path, {
		...(isVodacom() ? {
			baseURL: getLocalApiUrl()
		} : {})
	}).then((resp) => {
		if (resp.data && (resp.data.success || resp.data.status == 200)) {
			let list = celebVideos.data;
			const { count } = resp.data.data;
			if (refresh) {
				list = resp.data.data.featured_videos;
			} else {
				list = [...list, ...resp.data.data.featured_videos];
			}
			list = list.map(listItem => ({
				...listItem,
				type: 'video'
			}));
			return {
				data: list,
				loading: false,
				offset,
				count,
				limit: newLimit
			};
		} else {
			// dispatch(celebVideosListFetchEnd());
		}
	}).catch((exception) => {
		alert(JSON.stringify(exception));
		return {
			data: [],
			loading: false,
			offset,
			count: 0,
			limit: 0
		};
	});
};

export const getRating = (vanity, type, delivery) => {


	let url = `${Api.getRating}${vanity}?request_type=${type}`;
	if (delivery) {
		url = `${Api.getRating}${vanity}?request_type=${type}&delivery_method=${delivery}`;
	}
	let path = url;
	if (isVodacom()) {
		path = `${localApi.getDjangoDefault}?base=${path}`;
	}
	return axiosFetch.get(path, {
		...(isVodacom() ? {
			baseURL: getLocalApiUrl()
		} : {})
	}).then(resp => resp?.data.data).catch(() => {});
};


// export const updateProfilePhoto = (obj, showToast, global = true, updateToast, loaderAction = () => {}) => {
//   const API_URL = `${Api.updatePhoto}`;
//   if (loaderAction) {
//     loaderAction(true)
//   }
//   // dispatch(loaderAction(true));
//   return axiosFetch
//     .post(API_URL, obj)
//     .then(resp => {
//       if (loaderAction) {
//         loaderAction(false)
//       }
//       if (resp.data && resp.data.success) {
//         // dispatch(loaderAction(false));
//         if (showToast)
//           updateToast({
//             value: true,
//             message:  i18n.t('common.update_success'),
//             variant: 'success',
//             global,
//           })
//         return resp.data.data;
//       }

//       // dispatch(loaderAction(false));
//     })
//     .catch(exception => {
//       if (loaderAction) {
//         loaderAction(false)
//       }
//       updateToast({
//             value: true,
//             message: exception.response.data.error.message,
//             variant: 'error',
//             global,
//           })
//     });
// };

export const updateProfilePhoto = (
	obj,
	showToast,
	global = true,
	dispatch = () => {},
	queryClient,
	t
) => {
	const API_URL = `${Api.updatePhoto}`;
	let path = Api.updatePhoto;
	let body = obj;
	if (isVodacom()) {
		body = {
			base: path,
			data: body,
		};
		path = localApi.getDjangoDefault;
	}
	generalLoader(dispatch, true);
	return axiosFetch.post(path, body ,{
		...(isVodacom() ? {
			baseURL: getLocalApiUrl()
		} : {})
	}).then(resp => {
		if (resp.data && resp.data.success) {
			// dispatch(updateProfilePhotoFetchSuccess(resp.data.data));
			// dispatch(
			//   fetchUserDetails(getState().userDetails.settings_userDetails.id),
			// );
			queryClient.refetchQueries(['loggedUser']);
			generalLoader(dispatch, false);
			if (showToast)
				updateToast(dispatch, {
					value: true,
					message:  t('common.update_success'),
					variant: 'success',
					global,
				});
			return resp.data.data;
		}
		generalLoader(dispatch, false);
	})
		.catch(exception => {
			generalLoader(dispatch, false);
			if (showToast)
				updateToast({
					value: true,
					message: exception.response.data.error.message,
					variant: 'error',
					global,
				});

		});
};


export const updateUserDetails = (
	id,
	obj,
	callBack,
	toastGloabal = true,
	noToast = false,
	updateToast,
	loaderAction = () => {},
	user = {},
	queryClient = () => {() => {};},
	t = value => value,
	isCelebrity = false
) => {
	const isLoggedIn = !isEmpty(user);
	let API_URL;
	let options;
	if (isLoggedIn) {
		API_URL = `${Api.modifyUserDetails}/${id}/`;
		// options = {};
	}
	// dispatch(updateUserDetailsFetchStart());
	loaderAction(true);
	return axiosFetch
		.put(API_URL, obj)
		.then(resp => {
			if (resp.data && resp.data.success) {
				// dispatch(updateUserDetailsFetchEnd());
				// dispatch(updateUserDetailsFetchSuccess(resp.data.data));
				// const newDetails = resp.data.data;
				// const currentUserDetails = cloneDeep(
				//   getState().userDetails.settings_userDetails,
				// );
				// const currentCelebDetails = cloneDeep(
				//   getState().userDetails.settings_celebrity_details,
				// );
				// const finalDetails = {
				//   user: {
				//     ...currentUserDetails,
				//     ...newDetails.user,
				//   },
				//   celebrity_details: {
				//     ...currentCelebDetails,
				//     ...newDetails.celebrity_details,
				//   },
				// };
				const finalDetails = {
					user: {
						...user?.user,
						...resp?.data?.data?.user,
						avatarPhoto: getAvtar(resp.data.data?.user.avatar_photo)
					},
					celebrity_details: {
						...user?.celebrity_details,
						...resp?.data?.data?.celebrity_details
					}
				};
				queryClient.setQueryData(['loggedUser'], finalDetails);
				if (isCelebrity) {
					queryClient.setQueryData(['getCelebDetails'], resp.data.data);
				}
				// dispatch(userDetailsFetchSuccess(parseUserDetails(finalDetails)));
				if (!noToast) {
					updateToast({
						value: true,
						message: t('common.update_success'),
						variant: 'success',
						global: toastGloabal,
					});
				}
				if (callBack) callBack(resp.data.data);
			} else {
				// dispatch(updateUserDetailsFetchEnd());
				// dispatch(updateUserDetailsFetchFailed('404'));
			}
			loaderAction(false);
		})
		.catch(exception => {
			try {
				if (noToast && callBack) callBack();
				if (!noToast) {
					updateToast({
						value: true,
						message: exception.response.data.error.message,
						variant: 'error',
						global: toastGloabal,
					});

				}
			} catch (e) {
				updateToast({
					value: true,
					message:
              'An internal error has occurred. Please refresh and try again.',
					variant: 'error',
					global: toastGloabal,
				});
			}
			loaderAction(false);
			// dispatch(updateUserDetailsFetchEnd());
			// dispatch(updateUserDetailsFetchFailed(exception));
			return Promise.reject(exception);
		});
};

export const messages = (payload, callBack, loaderAction = () => {}, fnUser = {}, queryClient = null, updateToast = () => {}, t = () => {}) => {
	loaderAction(true);
	return axiosFetch
		.put(Api.services, payload)
		.then(resp => {
			const user = queryClient?.getQueryData(['loggedUser']);
			const celebrityDetails = {
				...user.celebrity_details,
				services: {
					...user.celebrity_details.services,
					...payload,
				},
			};
			const finalDetails = {
				user: user.user,
				celebrity_details: celebrityDetails,
			};
			queryClient.setQueryData(['loggedUser'], finalDetails);

			// dispatch(updateUserDetails(finalDetails));
			if (callBack) callBack(resp);
			loaderAction(false);
			updateToast({
				value: true,
				message: t('common.updatedSuccessfully'),
				variant: 'success',
				global: false,
			});

		})
		.catch(exception => {
			loaderAction(false);
			updateToast({
				value: true,
				message: exception.response?.data.error.message || t('refresh_error'),
				variant: 'error',
				global: false,
			});
		});
};

export const validatePromo = promo => {
	return axiosFetch
		.post(Api.validatePromo, {
			referral_code: promo,
		})
		.then(resp => resp.data);
};




export const followCelebrity = (celebrityId, follow, cancelUpdate, onSuccess, celebrityData, queryClient, isLoggedIn = false) => {
	let path = Api.followCelebrity;
	let body = {
		celebrity: celebrityId,
		follow,
	};
	if (isVodacom()) {
		body = {
			base: path,
			data: body,
		};
		path = localApi.getDjangoDefault;
	}
	return axiosFetch.post(path, body ,{
		...(isVodacom() ? {
			baseURL: getLocalApiUrl()
		} : {})
	}).then((res) => {
		if (!cancelUpdate) {
			// const { celebDetails } = getState().starDetails;
			if (!isEmpty(celebrityData?.celebrity_details) && celebrityData?.user.id === celebrityId) {
				const obj = {
					...celebrityData,
					user: {
						...celebrityData?.user,
						is_follow: follow,
					},
				};
				// dispatch(celebDetailstFetchFollowUpdate(obj));
				queryClient.setQueryData(['getCelebDetails', celebrityData?.user.user_id, isLoggedIn], obj);
			}
			if (onSuccess) {
				onSuccess();
			}
			//   if (getState().listData) {
			//     dispatch(updateCelebrityFollow(celebrityId, follow))
			//   }
			// }
			return res;
		}}).catch((exception) => {
		// dispatch(followCelebrityFailed(exception));
	});
};

export const getShareImage = (requestType = '') => {
	const queryString = requestType === 'live' ? '?live=true': `?request_type=${requestType}`;
	return axiosFetch(`${Api.sharePromoProfile}${queryString}`).then(
		resp => resp.data && resp.data.data,
	);
};

export const getCharityList = () => {
	return axiosFetch(`${Api.charity}`).then(resp => resp.data);
};

export const addCharity = (charityData, saveType = 'add') => {
	return axiosFetch
		.post(`${Api.charity}${saveType === 'update' ? charityData.id : ''}`, {
			charity: charityData.charityName,
			website: charityData.charityWebsite,
		})
		.then(resp => resp.data.success);
};

export const deleteCharity = charityId => {
	return axiosFetch
		.delete(`${Api.charity}${charityId}`)
		.then(resp => resp.data.success);
};

export const getFundRaiser = () => {
	return axiosFetch(`${Api.fundRaiser}`).then(resp => resp.data);
};

export const deleteFundraiser = fundraiserId => {
	return axiosFetch
		.delete(`${Api.fundRaiser}${fundraiserId}`)
		.then(resp => resp.data.success);
};

export const addFundRaiser = (fundRaiserData, saveType = 'add') => {
	let saveObject = {
		end_date: fundRaiserData.endDate,
		goal_amount: fundRaiserData.goalAmount,
	};
	if (saveType === 'add') {
		saveObject = {
			...saveObject,
			start_date: fundRaiserData.startDate,
			charity: fundRaiserData.charityName,
			website: fundRaiserData.charityWebsite,
		};
	}
	return axiosFetch
		.post(
			`${Api.fundRaiser}${fundRaiserData.id ? fundRaiserData.id : ''}`,
			saveObject,
		)
		.then(resp => resp.data.success);
};

export const fetchArticles = (offset, category, limit, dispatch) => {
	return axiosFetch
		.get(`${Api.articleOrIdeas}?type=1&offset=${offset}&limit=${limit}&category=${category}`)
		.then(resp => {
			if (resp.data && resp.data.success) {
				const list = [... resp.data.data.article_idea];
				const { count } = resp.data.data;
				return {
					data: list,
					offset,
					count,
					limit
				};
			} else {
			}
		})
		.catch((exception) => {
			updateToast(dispatch, {
				value: true,
				message: exception.response && exception.response.data ? exception.response.data.error.message : '',
				variant: 'error',
			});
		});
};

export const updateCourses = (courseId, updatedSection, oldCourses, queryClient) => {
	const selectCourse = oldCourses.find(course => course.id === courseId);
	const newCourseSections = selectCourse.sections.map(task => {
		if (task.id === updatedSection.id) {
			return updatedSection;
		}
		return task;
	});
	const newCourses = oldCourses.map(course => {
		if (course.id === courseId) {
			return ({
				...course,
				sections: newCourseSections,
			});
		}
		return course;
	});

	queryClient.setQueryData('courses', {
		data: newCourses,
		loading: false,
		error: null
	});
};

export const fetchCourses = dispatch => {
	return axiosFetch
		.get(Api.courses)
		.then(resp => {
			if (resp.data && resp.data.success) {

				return {data: resp.data?.data};
			} else {
				return resp.data;
			}
		})
		.catch((exception) => {
			updateToast(dispatch, {
				value: true,
				message: exception.response && exception.response.data ? exception.response.data.error.message : '',
				variant: 'error',
			});
		});
};

export const fetchIdeas = (offset, category, limit, dispatch) => {
	return axiosFetch
		.get(`${Api.articleOrIdeas}?type=2&offset=${offset}&limit=${limit}&category=${category}`)
		.then(resp => {
			if (resp.data && resp.data.success) {
				const list = [... resp.data.data.article_idea];
				const { count } = resp.data.data;
				return {
					data: list,
					offset,
					count,
					limit
				};
			}
		})
		.catch((exception) => {
			updateToast(dispatch, {
				value: true,
				message: exception.response && exception.response.data ? exception.response.data.error.message : '',
				variant: 'error',
			});
		});
};

export const getCollab = (vanity, payload, method, sort = false) => {
	let url =
    method === 'delete'
    	? `${Api.crosstalent}${payload}`
    	: `${Api.crosstalent}${vanity}`;
	if (method === 'post') {
		url = Api.crosstalent;
	}
	if (sort) {
		url = `${Api.crosstalent}${vanity}`;
	}
	return axiosFetch[method](url, method === 'delete' ? {} : payload).then(resp => resp.data && resp.data.data);
};

export const galleryImage = (type, id, fileName, dimensions = {}) => {
	let method = fileName ? 'post' : 'get';
	method = type === 'delete' ? 'delete' : method;
	const apiURL = `${Api.galleryImage}${id}`;
	const apiParams = fileName
		? {
			image: fileName,
			width: dimensions.width,
			height: dimensions.height,
		}
		: {};
	return axiosFetch[method](apiURL, apiParams).then(resp => resp.data);
};

export const handleExternal = (payload = {}) => {
	const fetchMeth = Object.keys(payload).length > 0 ? 'post' : 'get';
	return axiosFetch[fetchMeth](Api.extStoreSett, payload)
		.then(resp => resp.data && resp.data.data);
};

export const checkStarURLAvailability = starURL => {
	return axiosFetch(`${Api.checkStarUrlAvailability}?vanity_url=${starURL}`).then(
		resp => resp.data,
	);
};

export const fetchRecentActivity = () => {
	return axiosFetch.get(`${Api.getRecentActivity}?role=celebrity&limit=20&offset=0`).then((resp) => {
		if (resp.data && resp.data.success) {
			return {activityList: resp.data.data.recent_activities};
		} else {
		}
	}).catch((exception) => {

	});
};

export const handleUserLangs = (method = 'get', language = null) => {
	return axiosFetch[method](
		`${Api.userLanguages}${method === 'delete' ? language.id : ''}`,
		language
			? {
				language: language.id,
				...(language.default ? { default: language.default } : {}),
			}
			: {},
	).then(resp => resp.data && resp.data.data);
};

export const fetchGetCommercialTemplates = entity => {
	return axiosFetch.get(Api.getCommercialTemplate(entity)).then((resp) => {
		if (resp.data && resp.data.success) {
			return {
				templateOfferings: resp.data.data
			};
		}
	}).catch((exception) => {
	});
};

export const getAnalytics = filter => {
	return axiosFetch
		.get(`${Api.analytic}?months=${filter}`, {})
		.then(resp => resp.data && resp.data.data)
		.catch(e =>
			e.response && e.response.data && e.response.data.error
				? e.response.data.error
				: '',
		);
};

export const getFanDetails = (offset, limit, reqParams = {}) => {
	let API = Api.fanDetails;
	if (reqParams.id) {
		API = `${API}${reqParams.id}/?offset=${offset}&limit=${limit}`;
	} else {
		API = `${API}?fan_type=${reqParams.fanType}&months=${reqParams.time}&offset=${offset}&limit=${limit}`;
	}
	return axiosFetch(API).then(resp =>
		resp.data && resp.data.data ? resp.data.data : null,
	);
};

export const getSuggestionsList = (offset, limit) => {
	return axiosFetch
		.get(`${Api.suggestion}?offset=${offset}&limit=${limit}`, {})
		.then(resp => resp)
		.catch(() => {});
};

export const markCourse = courseDetails => {
	return axiosFetch
		.post(Api.markCourse, {
			course: courseDetails.courseId,
			section: courseDetails.taskId,
			done: courseDetails.done,
		})
		.then(resp => resp.data);
};

export const setArtView = id => {
	return axiosFetch
		.post(Api.articleOrIdeas, {
			id,
		})
		.then(resp => resp.data);
};

export const downloadEarningsPDF = (download, dispatch, t, entityData)=> {
	generalLoader(dispatch, true);
	return axiosFetch(`${Api.earningsDownload}?pdf=true`)
		.then(resp => {
			generalLoader(dispatch, false);
			if (resp && resp.data) {
				const downloadURL = `data:text/pdf;charset=utf-8,${encodeURIComponent(
					resp.data,
				)}`;
				const fileName = `${entityData?.partner_name}${moment().format(
					'YYYY',
				)}${moment().format('MM')}${moment().format('DD')}_Revenue.pdf`;
				download(downloadURL, false, true, fileName);
			}
		})
		.catch(e => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: t('common.downloadError'),
				variant: 'error',
			});
		});
};

export const downloadEarningsCSV = (download, dispatch, t, entityData)=> {
	generalLoader(dispatch, true);
	return axiosFetch(`${Api.earningsDownload}?pdf=true`)
		.then(resp => {
			generalLoader(dispatch, false);
			if (resp && resp.data) {
				const downloadURL = `data:text/pdf;charset=utf-8,${encodeURIComponent(
					resp.data,
				)}`;
				const fileName = `${entityData?.partner_name}${moment().format(
					'YYYY',
				)}${moment().format('MM')}${moment().format('DD')}_Revenue.csv`;
				download(downloadURL, false, true, fileName);
			}
		})
		.catch(e => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: t('common.downloadError'),
				variant: 'error',
			});
		});
};

export const updateNotification = (
	obj,
	toastGlobal = true,
	callback,
	showToast=true,
	dispatch = () => {},
	queryClient
) => {

	const API_URL = `${Api.updateNotification}`;

	generalLoader(dispatch, true);
	return axiosFetch
		.post(API_URL, obj)
		.then(resp => {
			if (resp.data && resp.data.success) {
				generalLoader(dispatch, false);
				const userData = queryClient.getQueryData(['loggedUser']);
				const finalUser = {
					...userData,
					user: {
						...userData.user,
						notification_settings: obj
					}
				};
				queryClient.setQueryData(['loggedUser'], finalUser);
				// dispatch(updateUserDetails(getUpdatedUserDetails(getState, obj)));
				// dispatch(updateNotificationFetchEnd());
				// dispatch(updateNotificationFetchSuccess(resp.data.data));
				if (callback) {
					callback();
				}
				if (showToast) {
					updateToast(dispatch, {
						value: true,
						message:  i18n.t('common.update_success'),
						variant: 'success',
						global: toastGlobal,
					});
				}
				return resp.data.data;
			} else {
				// dispatch(updateNotificationFetchEnd());
				// dispatch(updateNotificationFetchFailed('404'));
			}
			generalLoader(dispatch, false);
			if (showToast) {
				updateToast(dispatch, {
					value: true,
					message:  i18n.t('common.update_success'),
					variant: 'success',
					global: toastGlobal,
				});
			}
			return resp.data;
		})
		.catch(exception => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: exception.response.data.error.message,
				variant: 'error',
				global: toastGlobal,
			});
			return exception.response.data;
		});
};

export const fetchStarConcierge = (dispatch) => {
	generalLoader(dispatch, true);
	return axiosFetch
		.get(Api.starConcierge)
		.then(resp => {
			if (resp.data && resp.data.success) {
				// dispatch(starConciergeFetchSuccess(resp.data.data));
				generalLoader(dispatch, false);
				return {
					data: resp.data.data,
					loading: false,
					error: null
				};
			} else {
				// dispatch(loaderAction(false));
				// dispatch(starConciergeFetchFailed(resp.data));
			}
		})
		.catch((exception) => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: exception.response && exception.response.data ? exception.response.data.error.message : '',
				variant: 'error',
			});
		});
};

export const fetchAllPromoImgs = celebrityId => {
	let path = `${Api.getAllPromoImgs}?vanity=${celebrityId}`;
	if (isVodacom()) {
		path = `${localApi.purchaseVideos}?base=${path}`;
	}
	return axiosFetch.get(path, {
		...(isVodacom() ? {
			baseURL: getLocalApiUrl()
		} : {})
	}).then(resp => {
		if (resp.data && resp.data.success) {
			return resp.data.data;
		}
	});
};

export const fetchAllCustomPromoImgs = celebrityId => {
	let path = `${Api.getAllCustomPromoImgs}?vanity=${celebrityId}`;
	if (isVodacom()) {
		path = `${localApi.purchaseVideos}?base=${path}`;
	}
	return axiosFetch.get(path, {
		...(isVodacom() ? {
			baseURL: getLocalApiUrl()
		} : {})
	}).then(resp => {
		if (resp.data && resp.data.success) {
			return resp.data.data;
		}
	});
};

export const updateNotificationViewed = queryClient => {
	return axiosFetch.post(Api.notificationViewed)
		.then(resp => {

			const userData = queryClient.getQueryData(['loggedUser']);
			const temp = cloneDeep(userData);
			if (temp?.celebrity_details?.notification_settings) {
				temp.celebrity_details.notification_settings.is_viewed = true;
			}
			queryClient = queryClient.setQueryData(['loggedUser'], temp);
		});
};

export const handleDiscount = (method = 'get', payload = {}) => {
	const api = payload.id ? `${Api.discount}${payload.id}` : Api.discount;
	return axiosFetch[method](api, payload)
		.then(resp => resp.data && resp.data.data)
		.catch(e =>
			e.response && e.response.data && e.response.data.error
				? e.response.data.error
				: '',
		);
};

export const downloadFanDetails = dispatch => (fanType, timeLim, download) => {
	generalLoader(dispatch, true);
	return axiosFetch(
		`${Api.fanDetails}?fan_type=${fanType}&months=${timeLim}&download=true`,
	)
		.then(resp => {
			generalLoader(dispatch, false);
			if (resp && resp.data) {
				const downloadURL = `data:text/csv;charset=utf-8,${encodeURIComponent(
					resp.data,
				)}`;
				const fileName = 'Fan_information.csv';
				download(downloadURL, fileName);
			}
		})
		.catch(e => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: i18n.t('common.downloadError'),
				variant: 'error',
			});
		});
};

export const postTruzoCode = (id, obj, dispatch, queryClient) => {
	return paymentFetch.post(paymentApi.postTruzoCode, {
		...obj
	})
		.then(resp => {
			if (resp && resp.data) {
				// dispatch(updateTruzoInfo({ ...resp.data.data }))
				const data = queryClient.getQueryData(['loggedUser']);
				queryClient.setQueryData(['loggedUser'], {
					...data,
					user: {
						...data.user,
						truzo_auth_status: resp.data.data.truzo_auth_status,
						truzo_customer_id: resp.data.data.truzo_customer_id,
					},
				});
			}
			// dispatch(postTruzoCodeEnd())
			return {  success: true };
		}).catch(e => {
			updateToast(dispatch, {
				value: true,
				message: e.response.data.error,
				variant: 'error',
				global: false,

			});

			// dispatch(postTruzoCodeEnd())
		});
};

export const favoriteStar = (celebrityId, follow, queryClient) => {
	return axiosFetch.post(Api.followCelebrity, {
		celebrity: celebrityId,
		follow,
	}).then(() => {
		const userId = queryClient.getQueryData(['loggedUser']).user.user_id;
		queryClient.refetchQueries(['fan-fav', userId]);
	}).catch((exception) => {
		// dispatch(followCelebrityFailed(exception));
	});
};

