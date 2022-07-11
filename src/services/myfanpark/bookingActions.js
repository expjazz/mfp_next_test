import moment from 'moment';
const i18n = { t: value => value };
import { generalLoader, updateToast } from 'src/context/general';
import Api from 'src/lib/api';
import paymentApi from 'src/lib/paymentApi';
import { cloneDeep } from 'src/utils/dataStructures';
import { axiosFetch, paymentFetch } from '../fetch';

const starsonaVideo = (filename, requestId, duration, callback, loaderAction = () => {}, updateToast = () => {}) => {
	return axiosFetch
		.post(Api.starsonaVideo, {
			video: filename,
			stragramz_request: requestId,
			duration,
		})
		.then(resp => {
			if (resp.data && resp.data.success) {
				if (callback) {
					callback(requestId, resp.data);
				}
				loaderAction(false);
			} else {
				loaderAction(false);
			}
		})
		.catch(exception => {
			loaderAction(false);
			// dispatch(requestPostFailed(exception.response.data.error));
			updateToast({
				value: true,
				message: exception.response.data.error.message,
				variant: 'error',
				global: true
			});
		});
};

export const starsonaRequest = (
	bookingData,
	publicStatus,
	callback,
	generalLoader,
	updateToast,
	paymentFetchSuccess
) => {
	const requestDetails = {
		stargramto: bookingData.stargramto,
		stargramfrom: bookingData.stargramfrom,
		relationship: bookingData.requestRelationshipData,
		from_audio_file_external_uploader: bookingData?.from_audio_file_external_uploader,
		to_audio_file_external_uploader: bookingData?.to_audio_file_external_uploader,
		host_audio_file_external_uploader: bookingData?.host_audio_file_external_uploader,
		honor_audio_file_external_uploader: bookingData?.honor_audio_file_external_uploader,
		show_relationship: true,
		question: bookingData.question,
		specifically_for: bookingData.specification,
		from_where: bookingData.from_where,
		for_what: bookingData.for_what,
		important_info: bookingData.importantinfo,
		date: bookingData.date
			? moment(bookingData.date).format('MMM D YYYY 00:00:00')
			: '',
		event_title: bookingData.event_title,
		event_guest_honor: bookingData.event_guest_honor,
		booking_statement: bookingData.booking_statement,
		is_myself: bookingData.is_myself,
		templateType: bookingData.templateType,
	};
	const formData = new FormData();
	formData.append('celebrity', bookingData.starDetail.id);
	formData.append('language', bookingData.language);
	formData.append('Content-Disposition', 'attachment');

	if (bookingData.type !== 3) {
		formData.append('occasion', bookingData.selectedValue);
	}
	formData.append('public_request', bookingData.public_request);
	formData.append('request_details', JSON.stringify(requestDetails));

	formData.append('request_type', bookingData.type);
	if (bookingData.from_audio_file) {
		formData.append('from_audio_file', bookingData.from_audio_file);
	}
	if (bookingData.to_audio_file) {
		formData.append('to_audio_file', bookingData.to_audio_file);
	}

	if (bookingData.host_audio_file) {
		formData.append('host_audio_file', bookingData.host_audio_file);
	}
	if (bookingData.honor_audio_file) {
		formData.append('honor_audio_file', bookingData.honor_audio_file);
	}

	if (bookingData.remove_audios) {
		formData.append('remove_audios', bookingData.remove_audios);
	}
	if (bookingData?.from_audio_file_external_uploader) {
		formData.append('from_audio_file_external_uploader', bookingData?.from_audio_file_external_uploader);
	}
	if (bookingData?.to_audio_file_external_uploader) {
		formData.append('to_audio_file_external_uploader', bookingData?.to_audio_file_external_uploader);
	}
	if (bookingData?.host_audio_file_external_uploader) {
		formData.append('host_audio_file_external_uploader', bookingData?.host_audio_file_external_uploader);
	}
	if (bookingData?.honor_audio_file_external_uploader) {
		formData.append('honor_audio_file_external_uploader', bookingData?.honor_audio_file_external_uploader);
	}

	let ApiUrl = Api.starsonaRequest;
	let method = 'post';
	if (bookingData.requestId) {
		ApiUrl = `${ApiUrl}${bookingData.requestId}/`;
		method = 'put';
	}
	if (generalLoader) {
		generalLoader(true);
	}
	return axiosFetch[method](ApiUrl, formData, {})
		.then(resp => {
			if (resp.data && resp.data.success) {
				if (bookingData.type === 3) {
					starsonaVideo(
						bookingData.fileName,
						resp.data.data.stargramz_response.id,
						'00:00',
						callback,
						generalLoader,
						updateToast
					);
					// Q&A


				} else if (callback) {
					callback(resp.data.data.stargramz_response.id);
				}
				if (paymentFetchSuccess) {
					paymentFetchSuccess(resp.data.data.stargramz_response);
				}
				return resp.data.data.stargramz_response;
			} else {
				if (generalLoader) {
					generalLoader(false);
				}
			}
		})
		.catch(exception => {
			if (generalLoader) {
				generalLoader(false);
			}

			updateToast({
				value: true,
				message: exception.response.data.error.message,
				variant: 'error',
				global: true
			});
		});
};

export const sendDirectMessage = (type, message, id, language = '') => {
	const payload = {
		type,
		...(language ? { language } : {}),
		...(type === 'request' ? { celebrity: id } : { booking_id: id }),
	};
	if (type !== 'seen') {
		payload.message = message;
	}
	return axiosFetch
		.post(Api.directMessage, payload)
		.then(resp => resp.data && resp.data.data)
		.catch(e =>
			e.response && e.response.data && e.response.data.error
				? e.response.data.error
				: '',
		);
};

export const sendSocialShoutout = (type, id, reqPayload) => {
	const payload = {
		type,
		...reqPayload,
		...(type === 'request' ? { celebrity: id } : { booking_id: id }),
	};
	return axiosFetch
		.post(Api.socialShoutout, payload)
		.then(resp => resp.data && resp.data.data)
		.catch(e =>
			e.response && e.response.data && e.response.data.error
				? e.response.data.error
				: '',
		);
};

export const sendDigitalGoods = (type, id, reqPayload) => {
	const payload = {
		type,
		...reqPayload,
		...(type === 'request' ? { celebrity: id } : { booking_id: id }),
	};
	return axiosFetch
		.post(Api.sendDigitalGoods, payload)
		.then(resp => resp.data && resp.data.data)
		.catch(e =>
			e.response && e.response.data && e.response.data.error
				? e.response.data.error
				: '',
		);
};

export const requestProduct = (type, id, reqPayload) => {
	const payload = {
		type,
		...reqPayload,
		...(type === 'request' ? { celebrity: id } : { booking_id: id }),
	};
	return axiosFetch
		.post(Api.requestProduct, payload)
		.then(resp => resp.data && resp.data.data)
		.catch(e =>
			e.response && e.response.data && e.response.data.error
				? e.response.data.error
				: '',
		);
};

export const commercialBooking = payload => {
	return axiosFetch.post(Api.commercialBooking, payload).then(resp => resp.data);
};

export const sendFeedback = (type, bookingId, data) => {
	let requestData = { booking: bookingId };
	if (type === 'rating') {
		requestData = {
			...requestData,
			type: 'rating',
			fan_rate: data.rating,
			comments: '',
			reason: '',
		};
	} else {
		requestData = {
			...requestData,
			type: 'reaction',
			file_type: data.fileType,
			reaction_file: data.fileName,
		};
	}
	return (axiosFetch.post(Api.requestFeedback, requestData)
		.then(resp => resp.data.success)
	);
};

export const setVideoViewStatus = (videoId) => {
	return axiosFetch(`${Api.setVideoView}${videoId}/`)
		.then(resp => resp.data);
};

export const getReactions = (bookingId) => {
	return axiosFetch(`${Api.getReactions}${bookingId}/`)
		.then(resp => ({ reactionFiles: resp.data.data['reactions-details'].reaction_files, tipDetails: resp.data.data['reactions-details'].tip_details }) );
};


export const suggestions = (method, vanity, payload) => {
	return axiosFetch[method](`${Api.suggestion}${vanity}`, payload)
		.then(resp => {
			return resp;
		})
		.catch(err => {
			return err;
		});
};

export const fetchFanAlert = (
	celebrityId,
	requestType,
	fanEmail,
	itemId = null,
	loaderAction = () => {},
	updateToast = () => {},
	fanData
) => {
	const isLoggedin = !!fanData;
	const initialData = {
		request_type: requestType,
		celebrity: celebrityId,
		id: itemId,
	};
	const data = isLoggedin
		? initialData
		: { ...initialData, unknown_fan_email: fanEmail };
	loaderAction(true);
	return axiosFetch
		.post(`${Api.alertfan}`, data)
		.then(resp => {
			loaderAction(false);
			return resp.data;
		})
		.catch(exception => {
			loaderAction(false);
			updateToast({
				value: true,
				message: exception.response.data.error.message,
				variant: 'error',
			});
		});
};

export const checkIfAnyBooking = async role => {
	try {
		const response = await axiosFetch.get(
			`${Api.getUserVideos}?status=all&limit=1&role=${role}`,
		);
		if (response.data && response.data.success) {
			if (response.data.data && response.data.data.request_list.length) {
				return true;
			}
			return false;
		}
		return false;
	} catch (e) {
		return false;
	}
};

export const responseVideo = (requestId, fileName, callBack, userData, queryClient, dispatch) => {
	const {
		pending_requests_count: pendingRequests,
	} = userData?.celebrity_details;
	return axiosFetch
		.post(
			Api.starsonaVideo,
			{
				video: fileName,
				stragramz_request: requestId,
				duration: '00:00',
			}
		)
		.then(resp => {
			if (resp.data && resp.data.success) {
				if (pendingRequests) {
					const { user, celebrity_details } = cloneDeep(
						userData,
					);
					const updatedUser = {
						user,
						celebrity_details: {
							...celebrity_details,
							pending_requests_count: pendingRequests - 1,
						},
					};
					queryClient.setQueryData(['loggedUser', updatedUser]);
				}
				if (callBack) callBack();
			} else {
			}
		})
		.catch(exception => {
			generalLoader(dispatch, false);
			alert(exception);
			updateToast(dispatch, {
				value: true,
				message: exception.response.data.error.message,
				variant: 'error',
				global: false,
			});
		});
};

export const changeRequestStatus = (requestId, requestStatus, comment, dispatch) => {
	generalLoader(dispatch, true);
	return axiosFetch
		.post(
			Api.changeRequestStatus,
			{
				id: requestId,
				status: requestStatus,
				comment,
			}
		)
		.then(resp => {
			generalLoader(dispatch, false);
			if (resp.data && resp.data.success) {

				// changeRequestList(dispatch, requestId, requestStatus)
			} else {
				// dispatch(requestFetchEnd(requestId, requestStatus));
			}
			return resp.data.success;
		})
		.catch(e => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: e?.response?.data?.error?.message || e,
				variant: 'error',
				global: true
			});
			return false;
		});
};

export const changeBookingStatus = (
	requestId,
	requestStatus,
	comment,
	starView,
	userData,
	dispatch,
	queryClient,
	hasDeclined = () => {},
	t
) => {
	const {
		pending_requests_count: pendingRequests,
	} = userData?.celebrity_details;
	generalLoader(dispatch, true);
	return axiosFetch
		.post(Api.changeRequestStatus, {
			id: requestId,
			status: requestStatus,
			comment,
		})
		.then(resp => {
			generalLoader(dispatch, false);
			if (resp.data && resp.data.success) {
				// dispatch(changeBookingList(requestId, requestStatus));
				hasDeclined(dispatch, true);
				updateToast(dispatch, {
					value: true,
					message: t('common.request_decline'),
					variant: 'success',
					global: !starView,
				});
				if (pendingRequests && requestStatus === 5) {
					const { user, celebrity_details } = cloneDeep(
						userData,
					);
					const updatedUser = {
						user,
						celebrity_details: {
							...celebrity_details,
							pending_requests_count: pendingRequests - 1,
						},
					};
					queryClient.setQueryData(['loggedUser'], updatedUser);
				}
			} else {
				// dispatch(requestFetchEnd(requestId, requestStatus));
			}
			return resp.data.success;
		})
		.catch(exception => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: exception.response.data.error.message,
				variant: 'error',
				global: !starView,
			});
		});
};

export const clarifiy = (id, message = '') => {
	const API = message ? Api.clarifyDet : `${Api.clarifyDet}${id}`;
	const method = message ? 'post' : 'get';
	const data = message
		? {
			request: id,
			message,
		}
		: {};
	return axiosFetch[method](API, data).then(resp => resp.data);
};

export const favoriteVideo = (bookingId, videoId, bookingsList, updateBookingsList = () => {}, dispatch = () => {}) => {
	return axiosFetch
		.post(Api.favoriteVideo, {
			booking: bookingId,
			video: videoId,
		})
		.then(resp => {
			if (resp.data && resp.data.success) {
				const originalList = cloneDeep(bookingsList.data);
				const booking = originalList.find(
					item => item.booking_id === bookingId,
				);
				updateBookingsList(bookingId, {
					...booking,
					video_favorite: !booking.video_favorite,
				});
			}
		}).catch(e => {
			updateToast(dispatch, {
				value: true,
				message: e?.response?.data?.error?.message || 'There was an error. Please try again soon',
				variant: 'error',
				global: true,
			});
		});
};

export const hideVideoFromProfile = videoId => {
	return axiosFetch
		.post(Api.hideVideoFromProfile, {
			video: videoId,
		})
		.then(resp => resp.data);
};

export const makeVideoPrivate = (bookingId, isPrivate) => {
	return axiosFetch
		.post(Api.videoPublicity, {
			booking: bookingId,
			public: !isPrivate,
		})
		.then(resp => resp.data);
};

export const zeroPayBooking = (payload, dispatch = () => {}, token = '') => {
	generalLoader(dispatch, true);
	const options = {
		url: paymentApi.zeroPay,
		data: payload,
		method: 'post',
		headers: {
			authorization: `token ${token}`
		}
	};
	return paymentFetch(options)
		.then(resp => {
			generalLoader(dispatch, false);
			if (resp.data?.success) {
				return true;
			} else {
				updateToast(dispatch, {
					value: true,
					message: 'There was an error. Please try again soon',
					variant: 'error',
					global: true
				});
				return false;
			}
		})
		.catch(e => {
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message: e?.response?.data?.error?.message || 'There was an error. Please try again soon',
				variant: 'error',
				global: true
			});
			return false;
		});
};

export const getBookings = (videoStatus, limit, offset, filterString, sortString, requestType) => {
	return axiosFetch.get(
		`${
			Api.getUserVideos
		}?status=${videoStatus}&limit=${limit}&offset=${offset}${filterString}${sortString}${
			requestType ? `&request_type=${requestType}` : ''
		}&role=celebrity_id`,
	).then(resp => {
		const list = resp.data.data.request_list || [];
		return list;
	}).catch(e => {
		console.log(e);
	});
};