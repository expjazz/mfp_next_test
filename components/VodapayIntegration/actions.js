import vodacomApi from 'src/lib/vodacomApi';
import { getRequestTime, localFetch, vodacomFetch } from 'src/services/fetch';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import localApi from 'src/lib/localApi';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { locStorage } from 'src/utils/localStorageUtils';
import moment from 'moment';

export const testAuthCode = () => {
	return vodacomFetch.post(vodacomApi.testUserId, {
		'clientId': '2022040764269405968863',
		'userId': '216610000000446291765',
		'scopes': 'auth_user',
	}, );
};

export const applyToken = (authCode, domain = 'vodacom.myfanpark.com') => {
	return localFetch.post(`https://${domain}${localApi.applyToken}`, {
		grantType:'AUTHORIZATION_CODE',
		authCode: authCode
	});
	// const requestTime =  getRequestTime();
	// const unsigned = `POST ${process.env.NEXT_PUBLIC_VODAPAY_BASE_URL} ${vodacomApi.applyToken} \n
	// ${process.env.NEXT_PUBLIC_VODACOM_CLIENT_ID}.${requestTime}.post`;
	// alert(unsigned);
	// const first = sha256(unsigned);
	// alert(first);
	// const signedContent = Base64.stringify(first, 'privateKey');
	// alert(signedContent);
	// return vodacomFetch.post(vodacomApi.applyToken, {
	// 	grantType:'AUTHORIZATION_CODE',
	// 	authCode: authCode
	// }, {
	// 	headers: {
	// 		'request-time': requestTime,

	// 	}
	// });
};

export const inquiryUserInfo = (accessToken, domain = 'vodacom.myfanpark.com') => {
	return localFetch.post(`https://${domain}${localApi.inquiryUserInfo}`, {
		authClientId: process.env.NEXT_PUBLIC_VODACOM_CLIENT_ID,
		accessToken,
	});
};

