import { isBrowser } from 'customHooks/domUtils';
import Api from 'src/lib/api';
import { locStorage } from 'src/utils/localStorageUtils';
import { axiosFetch } from '../fetch';
import { QueryClient } from 'react-query';
import { fetchUserDetails } from 'customHooks/sessionUtils/useFetchLoggedUser';
import axios from 'axios';
import { loginFetchIncorrect, loginNoErrors, registerTempSuccess } from 'src/context/session';
import { ROLES } from 'src/constants/userType';
import { checkStripe } from './stripeActions';
import { generalLoader } from 'src/context/general';
import { isEmpty } from 'src/utils/dataStructures';
const entity = value => value;
export const loginUser = (
	loginEmail,
	loginPassword,
	loginOptions,
	setUserId,
	callback,
	updateToast,
	generalLoader,
	queryClient = null,
	dispatch = null,
	sessionDispatch = null
) => {
	// this cannot run in the server
	if (!isBrowser()) return;
	if (sessionDispatch) {
		loginNoErrors(sessionDispatch);
	}
	if (generalLoader) {
		generalLoader(true);
	}  const options = {
		username: loginEmail,
		password: loginPassword,
	};

	if (loginOptions && loginOptions.preventStarLogin) {
		options.booking = true;
	}

	return axiosFetch
		.post(Api.login, options)
		.then(resp => {
			if (generalLoader) {
				generalLoader(false);
			}
			// Block vodacom users from logging in
			if (resp.data && resp.data.success) {
				if (resp.data?.data?.user?.vd_id) {
					updateToast({
						value: true,
						message: 'You are not allowed to login with this account',
						variant: 'error',
						global: true,
					});
					return;
				}
				locStorage.setItem('data', resp.data.data);
				axiosFetch.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`;
				//axios.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`
				if (setUserId) {
					setUserId(resp.data.data.user.id);
				}
				if (callback) { callback(); }
				if (queryClient) {
					queryClient.setQueryData(['loggedUser'], resp.data.data);
				}
				if (dispatch) {
					checkStripe(dispatch);
				}
				return resp.data.data;
				// // queryClient.fetchQuery(["loggedUser", resp.data.data.user_id], () => fetchUserDetails(resp.data.data.user_id))
				// updateToast({
				//   value: true,
				//   message: `${entity(
				//     'talentSingle',
				//   )} has been favourited successfully.`,
				//   variant: 'success',
				// })
			}
		}).catch(exception => {
			if (generalLoader) {
				generalLoader(false);
			}
			updateToast({
				value: true,
				message: exception.response?.data?.error?.message,
				variant: 'error',
				global: true,
			});
			if (
				exception &&
        exception.response &&
        exception.response.status === 400 &&
        sessionDispatch
			) {
				loginFetchIncorrect(sessionDispatch,
					{incorrectError: exception.response.data.error.message,
						statusCode: exception.response.status,
						errorCode: exception.response.data.error.code,});
			}});
};


export const registerUser = (
	arg
) => {
	const [
		{
			firstName,
			lastName,
			email,
			password,
			phNo,
			phCode,
			role,
			referral,
			source,
			fbId,
			gpId,
			instId,
			temp,
			twId,
			extraParams = {},
		},
		callBack,
		queryClient,
		sessionDispatch,
		generalLoader,
		updateToast,
		dispatch = null,
		signupDetails = {}
	] = arg;
	if (generalLoader) {
		generalLoader(true);
	}
	let tempDetails;
	// const signupDetails = getState().signupDetails;
	if (locStorage) {
		tempDetails = locStorage.getItem('tempAuthToken');
	}
	// dispatch(registerFetchStart());
	let method = 'post';
	if (
		!isEmpty(tempDetails) ||
    (!isEmpty(signupDetails.registered) && !signupDetails.isSocial)
	) {
		method = 'put';
	}
	let header = {
		first_name: firstName,
		last_name: lastName,
		email,
		role,
		referral_code: referral,
		password,
		temp,
		...extraParams,
		phone_number: phNo,
		country_code: phCode,
	};

	if (source) {
		header = {
			...header,
			sign_up_source: source,
			fb_id: fbId,
			gp_id: gpId,
			in_id: instId,
			tw_id: twId,
		};
	}
	// if (loader) {
	//   dispatch(loaderAction(true));
	// }
	return axiosFetch[method](Api.register, header)
		.then(resp => {
			if (generalLoader) {
				generalLoader(false);
			}      // if (loader) {
			//   dispatch(loaderAction(false));
			// }
			if (resp.data && resp.data.success) {
				const obj = {
					...resp.data.data,
					celebrity_details: {},
				};
				if (role === 'R1002') {
					const tempToken = resp.data.data.user.authentication_token;
					locStorage.setItem('tempAuthToken', tempToken);
					registerTempSuccess(sessionDispatch, resp.data.data.user);
				} else {
					locStorage.setItem('data', resp.data.data);
					// console.log('response', resp.data.data)
					axiosFetch.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`;
					//axios.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`
					queryClient.setQueryData(['loggedUser'], resp.data.data);
				}
				if (callBack) callBack();
				if (dispatch) checkStripe(dispatch);
				return resp.data.data;
			}
		})
		.catch(exception => {
			if (generalLoader) {
				generalLoader(false);
			}
			updateToast({
				value: true,
				message: exception.response.data.error?.message,
				variant: 'error',
				global: true
			});
		});
};

export const celebritySignupProfile = data => {
	return axiosFetch
		.post(Api.celebrityProfile, {
			...data,
		})
		.then(resp => resp.data.success);
};

export const socialMediaLogin = (
	{
		userName,
		firstName,
		lastName,
		phNo,
		phCode,
		source,
		profilePhoto,
		role,
		fbId,
		gpId,
		instId,
		referral,
		twId,
		vdId
	},
	loginOptions,
	loader,
	callBack,
	updateToast,
	generalLoader,
	queryClient,
	dispatch = null,
	vodacom = false
) => {
	if(generalLoader) {
		generalLoader(true);
	}
	let options = {
		username: userName,
		first_name: firstName,
		last_name: lastName,
		sign_up_source: source,
		profile_photo: profilePhoto,
		role,
		fb_id: fbId,
		gp_id: gpId,
		in_id: instId,
		tw_id: twId,
		vd_id: vdId,
		referral_code: referral,
	};
	if (role === ROLES.star || vodacom) {
		options = {
			...options,
			phone_number: phNo,
			country_code: phCode,
		};
	}
	if (loginOptions && loginOptions.preventStarLogin) {
		options = { ...options, booking: true };
	}
	// dispatch(socialMediaLoginFetchStart());
	// if (loader) {
	//   dispatch(loaderAction(true));
	// }
	return axiosFetch
		.post(Api.socialMediaLogin, options)
		.then(resp => {
			if (generalLoader) {
				generalLoader(false);
			}
			// if (loader) {
			//   dispatch(loaderAction(false));
			// }
			if (resp.data && resp.data.success) {
				locStorage.setItem('data', resp.data.data);
				// dispatch(socialMediaLoginFetchSuccess(resp.data.data));
				axiosFetch.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`;
				//axios.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`
				if (callBack) callBack();
				if (dispatch) checkStripe(dispatch);
				// queryClient.setQueryData(["loggedUser"], resp.data.data)
				return resp.data.data;
				// dispatch(fetchUserDetails(resp.data.data.user.id));
			} else {
				if (resp.data.status === '400') {
					// if (loader) {
					updateToast({
						value: true,
						message: resp.data.error.message,
						variant: 'error',
						global: true
					});
					// }
					// dispatch(
					//   socialMediaLoginFetchIncorrect(
					//     resp.data.error.message,
					//     resp.data.status,
					//   ),
					// );
				} else if (resp.data.status === '410') {
					// dispatch(
					//   socialMediaLoginFetchIncorrect(
					//     resp.data.error.message,
					//     resp.data.status,
					//   ),
					// );
				} else if (resp.data.status === '310') {
					// dispatch(
					//   socialMediaLoginFetchIncorrect(
					//     resp.data.error.message,
					//     resp.data.status,
					//   ),
					// );
				}
			}
			return resp;
		})
		.catch(exception => {
			if(generalLoader) {
				generalLoader(false);
			}
			// if (loader) {
			// dispatch(loaderAction(false));
			updateToast({
				value: true,
				message: exception.response.data.error.message,
				variant: 'error',
				global: true
			});
			// }
			// dispatch(socialMediaLoginFetchEnd());
			// dispatch(
			//   socialMediaLoginFetchFailed(exception.response.data.error.message),
			// );
		});
};

export const changePassword = (
	data,
	callBack,
	toastGlobal = true,
	loaderAction = () => {},
	fanData = {},
	queryClient = {},
	updateToast = () => {},
	t = () => {}
) => {
	// dispatch(changePasswordStart());
	loaderAction(true);
	return axiosFetch
		.post(Api.changePassword, data)
		.then(resp => {
			// dispatch(changePasswordEnd());
			if (resp.data && resp.data.success) {
				// dispatch(changePasswordSuccess(resp.data.data));
				const obj = {
					...fanData,
					user: {
						...fanData?.user,
						has_password: true
					}
				};
				queryClient.setQueryData(['loggedUser'], obj);

				if (callBack) callBack();
			} else if (resp.data && resp.data.error) {
				// dispatch(changePasswordFailed(resp.data.error));
			}
			loaderAction(false);
			updateToast({
				value: true,
				message: t('common.update_success'),
				variant: 'success',
				global: true,
			});
		})
		.catch(exception => {
			loaderAction(false);
			// dispatch(changePasswordEnd());
			// dispatch(changePasswordFailed(exception));
			updateToast({
				value: true,
				message: exception.response?.data.error.message,
				variant: 'error',
				global: true,
			});
		});
};

/**
 * This function will check if there is a
 * celebrity with the credentials but with
 * an incomplete profile, and redirect to the correct flow accordingly
 * @param {*} data Needs to be an object containing both username and password
 * @param {*} dispatch Function to change the outter loader via context
 * @param sessionDispatch Function to change the session context
 */
export const isCelebProfileComplete = async (
	data,
	dispatch = () => {},
	sessionDispatch = () => {}
) => {
	generalLoader(dispatch, true);
	const resp = await axiosFetch.post(Api.isCelebProfileComplete, data);
	if (resp.data && resp.data.success) {
		if (resp.data.data.celebrity_profile_not_complete) {
			const user = resp.data.data.user_restricted_data;
			const tempToken = user.authentication_token;
			locStorage.setItem('tempAuthToken', tempToken);
			registerTempSuccess(sessionDispatch, user);
		}
		generalLoader(dispatch, false);
		return resp.data.data;
	}
	generalLoader(dispatch, false);
};