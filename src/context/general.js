import moment from 'moment';
import React from 'react';
import { cloneDeep } from 'src/utils/dataStructures';
import { locStorage } from 'src/utils/localStorageUtils';
import { initialState } from './initialState';

export const updateQueue = (baseQueue, newItem, type) => {
	let currentQueue = baseQueue;
	if (type === 'add') {
		const foundQueue = currentQueue.find(item => item.id === newItem.id);
		if (foundQueue) {
			currentQueue = currentQueue.filter(item => item.id !== newItem.id);
		}
		currentQueue = [...currentQueue, newItem];
	} else if (type === 'update') {
		currentQueue = currentQueue.map(item => {
			if (item.id === newItem.id) {
				return ({...item, ...newItem});
			}
			return item;
		});
	} else if (type === 'deleteWithParent') {
		currentQueue = currentQueue.filter(item => item.parentId !== newItem.parentId);
	} else {
		currentQueue = currentQueue.filter(item => item?.id !== newItem.id);
	}
	return currentQueue;
};

const GeneralContext = React.createContext({});
export const GeneralProvider = props => {
	const [state, dispatch] = React.useReducer((state, action) => {
		let tempState = cloneDeep(state);
		switch(action.type) {
		case 'add':
			tempState[action.key] = action.payload;
			return tempState;
		case 'modal':
			tempState = { ...state.modals };
			tempState[action.key] = action.payload;
			return { ...state, modals: tempState };
		case 'shouldUpdate':
			return { ...state, filters: { ...state.filters, needUpdate: action.payload } };
		case 'updateBookingData':
			tempState.purchaseFlow.bookingData = { ...action.payload };
			return tempState;
		case 'resetBookingData':
			tempState.purchaseFlow.bookingData = { ...initialState.purchaseFlow.bookingData };
			return tempState;
		case 'audioRecordHandler':
			tempState.commonReducer.audioFlags = { ...action.payload };
			return tempState;
		case 'resetRecording':
			tempState.audioRecorder.recorded[action.payload] = null;
			return tempState;
		case 'clearAll':
			return { ...state, audioRecorder: props.inititalState.audioRecorder };
		case 'commonReducer':
			tempState.audioRecorder.recorded[action.payload.key] = action.payload.audio;
			return tempState;
		case 'loginToSignup':
			tempState.modals.signUpModal = true;
			tempState.modals.loginModal.active = false;
			return tempState;
		case 'setVideoUploadedFlag':
			tempState.commonReducer.videoUploaded = action.payload;
			return tempState;
		case 'toggleSignup':
			tempState.modals.signUpModal = action.payload;
			return tempState;
		case 'signupToLogin':
			tempState.modals.signUpModal = false;
			tempState.modals.loginModal.active = true;
			return tempState;
		case 'setJustSignup':
			tempState.commonReducer.justSignup = action.payload;
			return tempState;
		case 'updateToast':
			tempState.toastObj = action.payload;
			return tempState;
		case 'playPauseMedia':
			tempState.commonReducer.playPauseMedia = action.payload !== undefined ? action.payload : !state.commonReducer.playPauseMedia;
			return tempState;
		case 'updateMediaStore':
			tempState.commonReducer = {
				...tempState.commonReducer,
				videoSrc: action.payload.videoSrc,
				file: action.payload.superBuffer,
				recordedTime: action.payload.recordedTime,
				recorded: action.payload.recorded,
			};
			return tempState;
		case 'recordTrigger':
			tempState.commonReducer.shouldRecord = action.payload !== undefined ? action.payload : !state.commonReducer.shouldRecord;
			return tempState;
		case 'generalLoader':
			tempState.commonReducer.loader = action.payload;
			return tempState;
		case 'toggleLogin':
			tempState.modals.loginModal = action.payload;
			return tempState;
		case 'loginOptions':
			tempState.modals.loginModal.options = action.payload;
			return tempState;
		case 'paymentFetchSuccess':
			tempState.paymentDetails.loading = false;
			tempState.paymentDetails.requestPostLoading = false;
			tempState.paymentDetails.requestDetails = action.payload;
			return tempState;
		case 'updateFavouritesQueue':
			tempState.celebrityToFollow = {
				...state.celebrityToFollow,
				...action.payload
			};
			return tempState;
		case 'updateSearchTerm':
			if (tempState.commonReducer.searchTerm === action.payload) return state;
			tempState.commonReducer.searchTerm = action.payload;
			return tempState;
		case 'updateSelectedSubCategory':
			tempState.filters.category.selected = action.payload.selectedList;
			tempState.filters.category.selectString = action.payload.subCatString;
			return tempState;
		case 'updatePriceRange':
			tempState.filters.lowPrice = action.payload.low;
			tempState.filters.highPrice = action.payload.high;
			return tempState;
		case 'updateProducts':
			tempState.filters.products = action.payload;
			return tempState;
		case 'updateAllFilters':
			tempState.filters = {
				...tempState.filters, ...action.payload
			};
			return tempState;
		case 'toggleMfpBanner':
			tempState.modals.mfpBanner = action.payload;
			return tempState;
		case 'regCollector':
			tempState.modals.regCollector = action.payload;
			return tempState;
		case 'toggleBookingModal':
			tempState.modals.bookingModal = action.payload;
			return tempState;
		case 'stripeRegistrationSuccess':
			tempState.stripeRegistration.loading = false;
			tempState.stripeRegistration.stripeURL = action.payload;
			return tempState;
		case 'checkStripeRegistrationSuccess':
			tempState.stripeRegistration.loading = false;
			tempState.stripeRegistration.cardDetails = action.payload.card_details;
			tempState.stripeRegistration.dashboardURL = action.payload.stripe_details.url;
			return tempState;
		case 'updateResumeUpload':
			tempState.resumableUpload.uploadObj[action.payload.key] = action.payload.request;
			return tempState;
		case 'pendingQueueUpdate':
			tempState.resumableUpload.pendingQueue = updateQueue(tempState.resumableUpload.pendingQueue, action.payload.newFile, action.payload.type);
			return tempState;
		case 'completedQueueUpdate':
			tempState.resumableUpload.completedQueueUpdate = action.payload;
			return tempState;
		case 'addResumeUpload':
			tempState.resumableUpload.uploadObj[action.payload.key] = action.payload.uploadObj;
			tempState.resumableUpload.showUploadBar = true;
			return tempState;
		case 'updateUploadPercent':
			let { pendingQueue, totalPercent: newPercent } = tempState.resumableUpload;
			if (pendingQueue.length) {
				newPercent = action.payload / pendingQueue.length;
			} else {
				newPercent = 100;
			}
			tempState.resumableUpload.totalPercent = newPercent;
			return tempState;
		case 'initiateUpload':
			tempState.resumableUpload.status = action.payload;
			return tempState;
		case 'toggleFullView':
			tempState.resumableUpload.fullUploadView = action.payload;
			return tempState;
		case 'toggleUploadBar':
			tempState.resumableUpload.showUploadBar = action.payload;
			return tempState;
		case 'toggleUpdateBooking':
			tempState.modals.updateBookingModal = {
				...state.modals.updateBookingModal,
				active: action.payload.state,
				requestId: action.payload.requestId,
				starMode: action.payload.starMode,
				requestData: action.payload.requestData,
				onSuccess: action.payload.onSuccess || state.modals?.updateBookingModal?.onSuccess,
				renderProps: action.payload.renderProps || {},
			};
		case 'confirmSave':
			tempState.commonReducer.confirmSave = action.payload;
			return tempState;
		case 'reset':
			return initialState;
		case 'showHow':
			tempState.showHow = action.payload;
			return tempState;
		default:
			return state;
		}
	}, props.inititalState);

	return <GeneralContext.Provider value={[state, dispatch]} {...props} />;
};

export const useGeneral = () => {
	const context = React.useContext(GeneralContext);
	if (context === undefined) {
		throw new Error('Cannot use outside of the provider');
	}
	return context;
};

export const withGeneral = Component => {
	return props => {
		const context = React.useContext(GeneralContext);

		if (context === undefined) {
			throw new Error('Cannot use outside of the provider');
		}

		return <Component generalContext={context} {...props} dispatch={context[1]} generalData={context[0]} />;
	};
};

export const editGeneralState = (dispatch, { payload, key }) => dispatch({ type: 'add', payload, key });

export const editModals = (dispatch, { payload, key }) => dispatch({ type: 'modal', payload, key });

export const setNeedUpdate = (dispatch, { payload }) => dispatch({type: 'shouldUpdate', payload,});

export const updateBookingData = (dispatch, payload) => dispatch({type: 'updateBookingData', payload});

export const audioRecordHandler = (dispatch, payload) => dispatch({type: 'audioRecordHandler', payload});

export const resetRecording = (dispatch, payload) => dispatch({ type: 'resetRecording', payload });

export const clearAll = (dispatch, payload) => dispatch({type: 'clearAll'});

export const saveAudioRecording = (dispatch, payload) => dispatch({type: 'commonReducer', payload});

export const loginToSignup = dispatch => dispatch({type: 'loginToSignup'});

export const setVideoUploadedFlag = (dispatch, payload) => dispatch({type: 'setVideoUploadedFlag', payload});

export const toggleSignup = (dispatch, payload) => dispatch({type: 'toggleSignup', payload});

export const signupToLogin = dispatch => dispatch({type: 'signupToLogin'});

export const setJustSignup = (dispatch, payload) => dispatch({type: 'setJustSignup', payload});

export const updateToast = (dispatch, payload) =>  dispatch({type: 'updateToast', payload: {...payload }});

export const playPauseMedia = (dispatch, payload) => dispatch({type: 'playPauseMedia', payload});

export const updateMediaStore = (dispatch, payload) => dispatch({type: 'updateMediaStore', payload});

export const recordTrigger = (dispatch, payload) => dispatch({type: 'recordTrigger', payload});

export const generalLoader = (dispatch, payload) => dispatch({type: 'generalLoader', payload});

export const toggleLogin = (dispatch, payload) => {
	if (window.sendMiniPayMessage) {
		locStorage.setItem('vodapayLogin', {
			pathname: window.location.pathname,
			time: moment().format(),
		});
		if (payload?.noRedirect || payload?.options?.noRedirect) {
			window.sendMiniPayMessage('loginUserNoRedirect');
		} else {
			window.sendMiniPayMessage('loginUser');
		}
		// window.openAuth();
		// window.redirectMiniPay('auth/auth');
	} else {
		dispatch({type: 'toggleLogin', payload});
	}
};

export const paymentFetchSuccess = (dispatch, payload) => dispatch({type: 'paymentFetchSuccess', payload});

export const updateFavouritesQueue = (dispatch, payload) => dispatch({type: 'updateFavouritesQueue', payload});

export const updateSearchTerm = (dispatch, payload) => dispatch({type: 'updateSearchTerm', payload});

export const updateSelectedSubCategory = (dispatch, selectedList, subCatString = '') => dispatch({type: 'updateSelectedSubCategory', payload: { selectedList, subCatString }});

export const updatePriceRange = (dispatch, low, high) => dispatch({type: 'updatePriceRange', payload: { low, high }});

export const updateProducts = (dispatch, payload) => { dispatch({type: 'updateProducts', payload});};

export const updateAllFilters = (dispatch, payload) => dispatch({type: 'updateAllFilters', payload});

export const toggleMfpBanner = (dispatch, payload) => dispatch({type: 'toggleMfpBanner', payload});

export const toggleRegCollector = (dispatch, payload) => dispatch({type: 'regCollector', payload});

export const toggleBookingModal = (dispatch, active, data, starMode, backLabel) => dispatch({type: 'toggleBookingModal', payload: {
	active,
	data,
	starMode,
	backLabel,
	requestId: data?.id
}});

export const stripeRegistrationSuccess = (dispatch, payload) => dispatch({type: 'stripeRegistrationSuccess', payload});

export const checkStripeRegistrationSuccess = (dispatch, payload) => dispatch({type: 'checkStripeRegistrationSuccess', payload});

export const updateResumeUpload = (dispatch, payload) => dispatch({type: 'updateResumeUpload', payload});

export const pendingQueueUpdate = (dispatch, payload) => dispatch({type: 'pendingQueueUpdate', payload});

export const completedQueueUpdate = (dispatch, payload) => dispatch({type: 'completedQueueUpdate', payload});

export const addResumeUpload = (dispatch, payload) => dispatch({type: 'addResumeUpload', payload});

export const updateUploadPercent = (dispatch, payload) => dispatch({type: 'updateUploadPercent', payload});

export const initiateUpload = (dispatch, payload) => dispatch({type: 'initiateUpload', payload});

export const toggleFullView = (dispatch, payload) => dispatch({type: 'toggleFullView', payload});

export const toggleUploadBar = (dispatch, payload) => dispatch({type: 'toggleUploadBar', payload});

export const toggleUpdateBooking = (dispatch, state, requestId, mode, requestData, onSuccess, renderProps) => {
	dispatch({
		type: 'toggleUpdateBooking',
		payload: {
			state,
			requestId,
			starMode: mode,
			requestData,
			onSuccess,
			renderProps
		}
	});
};

export const confirmSave = (dispatch, payload) => dispatch({type: 'confirmSave', payload});

export const resetState = dispatch => dispatch({type: 'reset'});

export const setShowHow = (dispatch, payload) => dispatch({type: 'showHow', payload});

export const loginOptions = (dispatch, payload) => dispatch({type: 'loginOptions', payload});

export const resetBookingData = dispatch => dispatch({type: 'resetBookingData'});