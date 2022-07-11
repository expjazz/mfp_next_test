import axios from 'axios';
import Api from 'src/lib/api';
import localApi from 'src/lib/localApi';
import paymentApi from 'src/lib/paymentApi';
import { axiosFetch, localFetch, paymentFetch } from '../fetch';
// import logdna from '@logdna/browser';

export const getOptile = async (reqPayload, optilePayload) => {
	// const logdna = (await import('@logdna/browser')).default;
	// logdna.info('req payload', reqPayload);
	// logdna.info('optile payload', optilePayload);
	return axiosFetch
		.post(Api.optileList, { ...reqPayload, optile_data: optilePayload })
		.then(resp => {
			return resp;
		})
		.catch(err => {
			return err;
		});
};

export const getPaymentStatus = async bookingId => {
	try {

		const { data } = await paymentFetch.get(`${paymentApi.paymentStatus}?bookingId=${bookingId}`, {
			headers: {
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMjYxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwic3ViIjoiMjkiLCJzY3AiOiJ1c2VyIiwiYXVkIjpudWxsLCJpYXQiOjE2MTYwMDU0MTQsImV4cCI6MTY0NzU0MTQxNCwianRpIjoiNmExNmEyYzItYjE4NC00MjVlLWFlNGMtMmEwNmU3NTViMTg5In0.cvtoOs7rowI5XHjDKOxgHjmUmwN08MZ7Mow191rik68'}
		});
		return data;
	} catch(e) {
		return { error: true  };
	}

};

export const paystackToPaymentService = async payload => {
	try {
		const { data } = await paymentFetch.post(paymentApi.paystack, payload);
		return data;
	} catch(e) {
		return { error: true  };
	}
};

export const getPaystackCards = async token => {
	try {
		const { data } = await paymentFetch.get(paymentApi.paystackCards, {
			headers: {
				Authorization: `Bearer ${token}`
			},
		});
		return data;
	} catch(e) {
		return { error: true  };
	}
};

export const getVodapayUrl = async (body, domain = 'vodacom.myfanpark.com') => {
	try {
		const resp = await localFetch.post(`https://${domain}${localApi.vodacomPay}`, body);
		return resp.data.data;
	} catch (e) {
		console.log(e);
	}
};

export const postVodapayPending = async body => {
	const resp = await paymentFetch.post(paymentApi.vodacomPending, body);
	return resp;
};

export const postVodapayTest = async body => {
	const resp = await axios.post('https://webhook.site/e50ce355-b9c8-4a98-866f-d2de44e5dfd1', body);
	return resp;
};

export const postVodapaySuccess = async body => {
	try {
		const resp = await paymentFetch.post(paymentApi.vodapaySuccess, body);
		return resp;
	} catch (e) {
		console.log(e);
	}
};