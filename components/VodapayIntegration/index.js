import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { generalLoader, toggleLogin, updateToast, useGeneral } from 'src/context/general';
import { socialMediaLogin } from 'src/services/myfanpark/loginActions';
import { locStorage } from 'src/utils/localStorageUtils';
import { getServerDomain } from 'src/utils/urlUtils';
import { applyToken, inquiryUserInfo, testAuthCode } from './actions';
import { vodacomUserParser } from './utils';

function VodapayIntegration({children}) {
	let stagingTest = true;
	const [vodapay, setVodapay] = useState(false);
	const queryClient = useQueryClient();
	const dispatch = useGeneral()[1];
	const router = useRouter();

	const localUpdateToast = payload => updateToast(dispatch, payload);
	const vodacomToast = message => localUpdateToast({ message, global: true, variant: 'error', value: true });
	const loader = payload => generalLoader(dispatch, payload);
	const { data: userData, refetch } = useFetchLoggedUser();
	const vodacomLogin = (user, noRedirect = false) => {
		socialMediaLogin(user, {}, null, () => {
			if (!noRedirect) router.push('/browse-stars');
			refetch();
		}, localUpdateToast, loader, queryClient, null, true);
	};
	useEffect(() => {
		if (vodapay || window.my) {
			alert('Im working, script loaded');
		}
		if (window.my && locStorage.getItem('data')) {
			toggleLogin(dispatch, {noRedirect: true});
		}
	}, [vodapay]);
	useEffect(() => {
		if (router.query.site?.includes('vodacom') && vodapay) {
			window.testAuthCode = testAuthCode;
			const domain = process.env.ENV !== 'dev' ? router.query.site : getServerDomain();
			window.applyToken = (authCode) => applyToken(authCode, domain);
			window.inquiryUserInfo = token => inquiryUserInfo(token, domain);
			window.vodacomLogin = vodacomLogin;
			window.vodacomLoader = payload => generalLoader(dispatch, payload);
			window.vodacomUserParser = vodacomUserParser;
			window.vodacomToast = vodacomToast;
			window.isVodacomIos = true;
			// window.paymentRedirect = paymentRedirect;
		}
	}, [vodapay]);
	// if (!router.query?.site?.includes('vodacom')) {
	// 	return children;
	// }

	// useEffect(() => {
	// 	const script = document.createElement('script');
	// 	script.type = 'text/javascript';
	// 	script.addEventListener('load', () => {
	// 		alert('loaded script');
	// 		window.my = true;
	// 		setVodapay(true);
	// 	});
	// 	script.src = 'https://appx/web-view.min.js';
	// 	document.getElementsByTagName('head')[0].appendChild(script);
	// 	alert('script created');
	// }, []);
	return (
		<>
			{/* <Script strategy="beforeInteractive" onLoad={() => {alert('loaded script'); window.my = true; setVodapay(true);}} src="https://appx/web-view.min.js"/> */}
			<Script
				id='minipay-script'
			>
				{`
            if (window.my) {
              function sendMessage(data) {
                my.postMessage({name: data});
              }
              function postVodapayMessage(data) {
                my.postMessage(data)
              }
              function redirect(url) {
                my.navigateTo({url});
              }
              function initiatePayment(data) {
                my.postMessage({ ...data, name: 'initiatePayment' });
              }
              window.sendMiniPayMessage = sendMessage;
              window.redirectMiniPay = redirect;
              window.initiatePayment = initiatePayment;
              window.postVodapayMessage = postVodapayMessage;
            }
        `}
			</Script>
			<Script id="messageReceive">
				{`
          if (window.my) {
            function testAuthCode() {

            }
            my.onMessage = function (e) {
                if (e.getAuthCode) {
                  window.testAuthCode().then(resp => {
                    my.postMessage({reqData: resp, name: 'testLogin', noRedirect: e.noRedirect});
                  }).catch(e => {
                    alert(JSON.stringify(e));
                  });
                } else if (e.authCode) {
                  window.vodacomLoader(true);
                  window.applyToken(e.authCode).then(resp => {
                    const accessToken = resp.data.data.accessToken;
                    window.inquiryUserInfo(accessToken).then(resp => {
                      const user = window.vodacomUserParser(resp.data);
                      window.vodacomLogin(user, !!e.noRedirect);
                      window.vodacomLoader(false);
                    }).catch(e => {
                      alert('Login Error');
                      window.vodacomLoader(false);
                    });

                  });
                } else if (e.vodacomToast) {
                  window.vodacomToast(e.vodacomToast);
                } else if (e.paymentRedirect) {
                  window.paymentRedirect(e.paymentRedirect);
                }
              }
          }
        `}

			</Script>
			{children}
		</>
	);
}

export default VodapayIntegration;


// const accessToken = resp.data.accessToken;
// window.inquiryUserInfo(accessToken).then(resp => {
//   const user = window.vodacomUserParser(resp);
//   window.vodacomLogin(user, !!e.noRedirect);
//   window.vodacomLoader(false);
// }).catch(e => {
//   alert(JSON.stringify(e));
// });