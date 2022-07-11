import React, { useEffect, useRef, useState } from 'react';
import Button from 'components/SecondaryButton';
import logdna from '@logdna/browser';
import { Container } from './styled';
import { getVodapayUrl, postVodapayPending, postVodapaySuccess, postVodapayTest } from 'src/services/myfanpark/paymentActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import { generalLoader, resetBookingData, useGeneral } from 'src/context/general';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { parseVodacomResponse } from './utils';
import { haveLogDNA, isVodacom } from 'customHooks/domUtils';
import { locStorage, sessStorage } from 'src/utils/localStorageUtils';

function VodapayCheckout(props) {
	const {
		isZeroPay,
		zeroPayment
	} = props;
	const dispatch = useGeneral()[1];
	const [_, getLocalAmount, getUSDAmount] = useGetLocalAmount();
	const currencyData = useCurrencyData();
	const [paymentUrl, setPaymentUrl] = useState('');
	const buttonRef = useRef(null);
	const { data: loggedUser } = useFetchLoggedUser();
	const { bookingPrice } = props.starData.celbData;
	const router = useRouter();
	// const [_, setVodapayData] = useState(null);
	const paymentRedirect = (type) => {
		let url =  '';
		const vodapayData = sessStorage.getItem('vodapay_reference');
		switch (type) {
		case 'success':
			if (vodapayData) {
				const res = postVodapaySuccess(vodapayData);
				sessStorage.removeItem('vodapay_reference');
			}
			locStorage.removeItem('req_data');
			resetBookingData(dispatch);
			url = `/${router.query?.celebrityId}/thankyou?vodacom=true`;
			if (props.returnUrl) {
				url = `${props.returnUrl}?vodacom=true`;
			}
			router.push(url);
			break;
		case 'failure':
			sessStorage.removeItem('vodapay_reference');
			url = `/${router.query?.celebrityId}/thankyou?error=true&vodapayError=true`;
			if (props.returnUrl) {
				url = `${props.returnUrl}&error=true&vodapayError=true`;
			}
			router.push(url);
			break;
		default:
			break;
		}
		sessStorage.removeItem('vodapay_reference');
	};
	useEffect(() => {

		window.paymentRedirect = paymentRedirect;
		const amount = isVodacom() && props.type === 'tip' ? bookingPrice : getLocalAmount(bookingPrice);
		const vodapayData = {
			vd_id: loggedUser?.user?.vd_id || '216610000000446291765',
			title: props.title || 'title',
			amount,
			reference: props.reference || {},
			transaction_type: props.type || 'booking',
			returnUrl: props.returnUrl || 'https://myfanpark.com/',
		};
		generalLoader(dispatch, true);
		getVodapayUrl(vodapayData, router.query.site).then(resp => {
			if (!haveLogDNA()) {

				logdna.init(process.env.NEXT_PUBLIC_LOG_DNA, {
					disabled: typeof window === 'undefined',
				}).addContext({
					hostname: 'myFanPark web',
					app: 'myFanPark',
					indexMeta: true,
					Tag: 'LogDNA-Browser',
					console: true,
				});
			}
			const obj = {...resp, ...vodapayData};
			logdna.log('VodapayCheckout', obj);
			if (resp?.result?.resultStatus === 'A') {
				setPaymentUrl(resp.redirectActionForm.redirectUrl);
				// setVodapayData({...resp, ...vodapayData});
				sessionStorage.setItem('vodapay_reference', JSON.stringify({...resp, ...vodapayData}));
				const paymentParsed = parseVodacomResponse(obj);
				postVodapayTest();
				postVodapayPending({
					vodacom_purchase: { ...paymentParsed, vd_id: loggedUser?.user?.vd_id || '216610000000446291765', transaction_type: props.type || 'booking', local_amount: bookingPrice, local_currency: currencyData?.abbr || 'USD', amount: getUSDAmount(bookingPrice) },
				}).then(resp => {
					logdna.log('payment response', resp);
					// log something
				}).catch(e => {
					logdna.log('payment error', e);
				});
			}
			generalLoader(dispatch, false);
		}).catch(err => {
			generalLoader(dispatch, false);
		}
		);

	}, []);

	useEffect(() => {
		if (paymentUrl) {
			buttonRef.current.scrollIntoView();
		}

	}, [paymentUrl]);
	const handlePayment = () => {
		if (isZeroPay) {
			zeroPayment();
		} else {
			window.initiatePayment({paymentUrl});
		}
	};
	return (
		<Container>
			{(isZeroPay || paymentUrl) && <Button ref={buttonRef} onClick={handlePayment}>Pay</Button>}
		</Container>
	);
}

export default VodapayCheckout;