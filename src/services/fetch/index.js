import axios from 'axios';
import moment from 'moment';

const axiosFetch = axios.create({
	baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
	// baseURL: 'https://app.staging.starsona.com/api/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'device': 'web',
		'version': '4.4'
	},
});

const paymentFetch = axios.create({
	baseURL: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_ENDPOINT,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

const cmsFetch = axios.create({
	baseURL: process.env.NEXT_PUBLIC_CMS_SERVICE_ENDPOINT,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

export const getRequestTime = () => {
	const now = moment();
	const time = now.format('yyyy-MM-DDTHH:mm:ssZ');

	return time;
};

const vodacomFetch = axios.create({
	baseURL: process.env.NEXT_PUBLIC_VODAPAY_BASE_URL,
	headers: {
		'client-id': process.env.NEXT_PUBLIC_VODACOM_CLIENT_ID,
		'request-time': getRequestTime(),
		'Content-Type': 'application/json',
		// eslint-disable-next-line quotes
		// 'signature': "algorithm=RSA256, keyVersion=1, signature=-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4ROZOpjRxCuUUnUX5JPQ\nfLmUWsffmBZWfKhe4VXZR7dAJmG1KXBBRWfBUONkc0Nt3z+IcekpTyF5JpyMq7gH\nuW7DaoV8bkyvXLE9LtXl35kHDL4Roc5MBFzQPBu20Yv/cJSC0HfCzzuPb+pa7Dg5\nGyqMLLc7IIMqyOZYZCNas6GZ0R9A0hYjBJYOjkZ4hk5mRvCyDUyrIQglC19we//Z\nSJxy49EzWZRP19TOWZNDO8qMin2YDP2miOWBFApiZRrTFlmUOdOTnQ9ZlR2NjBNW\nHCXPx0XYLKL0J/JieyQluf1ZgrBluGDfldiRmkC+YoGy4YWYjUd/wJmg2LQUp1jb\n9QIDAQAB\n-----END PUBLIC KEY-----\n"

	}
});

const localFetch = axios.create({
	headers: {
		'client-id': process.env.NEXT_PUBLIC_VODACOM_CLIENT_ID,
		'request-time': getRequestTime(),
		'Content-Type': 'application/json',
	}});

// const vodacomHeaderContructor = (method, endPoint, bodyData, isRequest = true) => {
// 	const timeStampKey = isRequest?'request-time':'response-time';
// 	const time = getRequestTime;
// 	const signatureValue = signature.generate(method, endPoint, time, bodyData);
// 	const headers = {
// 		'Content-Type': 'application/json',
// 		'client-id': process.env.NEXT_PUBLIC_VODACOM_CLIENT_ID,
// 		'signature': `algorithm=RSA256, keyVersion=1, signature=${signatureValue}`
// 	};

// 	headers[timeStampKey] = time;

// 	return headers;
// };

export { axiosFetch, paymentFetch, cmsFetch, vodacomFetch, localFetch };