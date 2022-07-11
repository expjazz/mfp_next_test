import { getRequestTime } from 'src/services/fetch';
const signature = require('certificates/signature');

const vodacomHeaderContructor = (method, endPoint, bodyData, isRequest = true, bodyTime = null) => {
	const timeStampKey = isRequest? 'request-time':'response-time';
	const time = bodyTime || getRequestTime();
	const signatureValue = signature.generate(method, endPoint, time, bodyData);
	const headers = {
		'Content-Type': 'application/json',
		'client-id': process.env.NEXT_PUBLIC_VODACOM_CLIENT_ID,
		'signature': `algorithm=RSA256, keyVersion=1, signature=${signatureValue}`,
	};

	headers[timeStampKey] = time;

	return headers;
};

module.exports = vodacomHeaderContructor;