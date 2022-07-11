import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import logdna from '@logdna/browser';

// import { getLocalAmount } from 'utils/currencyUtils';
// import { callSmartLook } from 'services/analytics/smartLook';
// import { loaderAction, localUpdateToast } from 'store/shared/actions/commonActions';
// import { getOptile } from 'services/request';
// import { Container, OptileLayout } from './styled';
// import { generateProductId } from 'src/utils/domUtils';
import { generalLoader, useGeneral } from 'src/context/general';
// import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { locStorage, sessStorage } from 'src/utils/localStorageUtils';
import { generateProductId, haveLogDNA, isBrowser, isVodacom } from 'customHooks/domUtils';
import { OptileLayout, Container } from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { isEmpty } from 'src/utils/dataStructures';
import { getOptile } from 'src/services/myfanpark/paymentActions';
import { useRouter } from 'next/router';
import { getGaThankyouCategory, getGaThankyouTitle } from './utils';
// import Paystack from 'components/Paystack';
// import VodapayCheckout from 'components/VodapayCheckout';

import dynamic from 'next/dynamic';

const Paystack = dynamic(() => import('components/Paystack'), { ssr: false });
const VodapayCheckout = dynamic(() => import('components/VodapayCheckout'), { ssr: false });


const Checkout = props => {
	const router = useRouter();
	const [getLocalSymbol, getLocalAmount, getUSDAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const currencyData = useCurrencyData();
	const reqDataString = isBrowser() ? locStorage.getItem('req_data') : null;
	const [state, dispatch] = useGeneral();
	const loaderAction = payload => generalLoader(dispatch, payload);
	const localUpdateToast = payload => generalLoader(dispatch, payload);
	const { data: entityData } = useGetPartner();
	const { data: fanData } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const reqData = reqDataString ? reqDataString : {};
	// const { data: celebrityData } = useGetCelebrityData()
	const [optileSource, setOptileSource] = useState(null);
	const { bookingPrice } = props.starData.celbData;

	const changeLocaleToUpper = str => {
		const arr = str.split('_');
		arr[1] = arr[1].toUpperCase();
		return arr.join('_');
	};
	const optileCall = async () => {
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
		loaderAction(true);
		const reqPayload = {
			starsona: props.bookingId || (reqData.resp ? reqData.resp.booking : ''),
			amount: parseFloat(bookingPrice).toFixed(2),
			promocode:
      reqData && reqData.promoCode && reqData.promoCode?.code
      	? reqData.promoCode?.code
      	: props.promoDetails?.code,
			currency: currencyData.abbr,
			type: props.type || 'booking',
		};
		const optilePayload = {
			transactionId: `tr-${Math.random()}${Date.now()}`,
			country: entityData?.partnerData.country_code,
			integration: 'HOSTED',
			customer: {
				email: fanData?.user.email,
				registration: {
					id: fanData?.user.optile_registration_id
						? fanData?.user.optile_registration_id
						: null,
				},
			},
			payment: {
				amount: parseFloat(bookingPrice).toFixed(2),
				currency: currencyData.abbr,
				reference: JSON.stringify({
					bookingId:
          props.bookingId || (reqData.resp ? reqData.resp.booking : ''),
					promocodeId:
          reqData && reqData.promoCode && reqData.promoCode?.id
          	? reqData.promoCode?.id
          	: props.promoDetails?.id || '',
					checkout_flow_type: 'nextjs',
					type: props.type,

				}),
			},
			allowDelete: true,
			style: {
				hostedVersion: 'v3',
				resolution: '3x',
				cssOverride:
        'https://starsona-prb-usea1.s3.amazonaws.com/common/optile_checkout_style.css',
				language: !isEmpty(props.language)
					? changeLocaleToUpper(props.language.code.replace('-', '_'))
					: 'en_US',
			},
			...props.deferral === 'DEFERRED' ? {preselection: {deferral: props.deferral}} : { preselection: {} },
			callback: {
				returnUrl: props.realReturnUrl || `${window.location.origin}/${router.query.celebrityId || props.starData?.userData?.user_id}/thankyou`,
				cancelUrl: `${window.location.origin}/${router.query.celebrityId || props.starData?.userData?.user_id}/thankyou`,
			},
		};
		console.log('req payload log', reqPayload);
		console.log('optile payload log', JSON.stringify(optilePayload));
		logdna.log('req payload log', reqPayload);
		logdna.log('optile payload log', JSON.stringify(optilePayload));
		logdna.info('req payload info', reqPayload);
		logdna.info('optile payload info', JSON.stringify(optilePayload));
		getOptile(
			reqPayload,
			optilePayload
		)
			.then(res => {
				if (res && res.data && res.data.data && res.data.data.redirect) {
					setOptileSource(res.data.data.redirect.url);
				} else if (
					res.data &&
          res.data.data.status &&
          res.data.data.status.code &&
          res.data.data.status.code === 'rejected'
				) {
					props.onOptileFail();
					localUpdateToast({
						value: true,
						message: res.data.data.resultInfo,
						variant: 'error',
						global: true
					});
				} else if (res.response) {
					props.onOptileFail();
					localUpdateToast({
						value: true,
						message: res.response.data.error.message,
						variant: 'error',
						global: true
					});
				} else {
					props.onOptileFail();
					localUpdateToast({
						value: true,
						message: t('common.payment_failed'),
						variant: 'error',
						global: true
					});
				}
				loaderAction(false);
			}).catch((e) => {
				// props.onOptileFail();
				localUpdateToast({
					value: true,
					message: t('common.payment_failed'),
					variant: 'error',
					global: true
				});
				loaderAction(false);
			});
	};

	useEffect(() => {

		if (
			bookingPrice &&
      bookingPrice > 0 &&
      (props.bookingId || (reqData.resp && reqData.resp.booking))
		) {
			let category = '';
			const path = router.asPath;
			const arr = path.split('/');
			const title = arr[arr.length - 1];
			if (window.dataLayer) {
				const obj = {
					star: props.starData.userData,
				};
				if (path.includes('social')) {
					obj.social_media = props.social.social_media;
					obj.title = props.social.title;
					category = 'social';
				} else if (path.includes('merch')) {
					obj.title = props.product.title;
					obj.id = props.product.numeric_id;
					category = 'merch';
				} else if (path.includes('fun')) {
					obj.title = props.funStuff.title;
					obj.id = props.funStuff.numeric_id;
					category = 'funstuff';
				} else if (path.includes('shoutout')) {
					if (path.includes('event')) {
						category = 'announcement';
						obj.title = 'Event';
					} else if (path.includes('qa')) {
						category = 'qa';
						obj.title = 'Q&A';
					} else {
						category = 'shoutout';
					}
				} else if (path.includes('chat')) {
					category = 'dm';
				} else if (path.includes('live')) {
					obj.title = props.funStuff.title;
					obj.id = props.funStuff.numeric_id;
					category = 'funstuff';
				}
				const id = generateProductId(category, obj);
				// const id = 2
				const eventData = {
					realAmount: parseInt(bookingPrice, 10),
					localAmount: getLocalAmount(bookingPrice).toFixed(2),
					promoCode: props.promoDetails?.code,
					localCurrency: currencyData.abbr,
					talent: props.starData.userData.nick_name
						? props.starData.userData.nick_name
						: `${props.starData.userData.first_name} ${props.starData.userData.last_name}`,
					product: title,
					product_id: id,
					amount: bookingPrice,
				};
				// callSmartLook('track', 'want-to-pay', eventData);
				window.dataLayer.push({
					event: 'want-to-pay',
					...eventData,
				});
				sessStorage.setItem('ga_checkout', {
					category: getGaThankyouCategory(category, path),
					name: getGaThankyouTitle(title),
					product_id: id,
					quantity: 1,
					coupon: '',
				});
			}
			locStorage.setItem(
				'req_data',
				{
					...reqData,
					promoCode: props.promoDetails || {},
					type: props.type || 'booking',
					amount: props.type === 'tip' ? getUSDAmount(bookingPrice) : bookingPrice,
					bookingId: props.bookingId,
				},
			);
			if (!isVodacom()) {
				optileCall();
			}
		}
	}, [bookingPrice]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const getOptileIframe = () => {
		if (isBrowser() && window.dataLayer) {
			window.dataLayer.push({
				event: 'Payment initiated',
			});
		}
		return (
			<OptileLayout className="optile_wrap">
				<iframe
					src={optileSource}
					scrolling="no"
					title="optile"
					frameBorder="0"
				></iframe>
			</OptileLayout>
		);
	};
	if (isVodacom()) {
		return <VodapayCheckout
			{...props}
			zeroPayment={() => props.zeroPayment(props.bookingId)}
			isZeroPay={bookingPrice <= 0}
			returnUrl={props.realReturnUrl}
			reference={{
				bookingId:
              props.bookingId || (reqData.resp ? reqData.resp.booking : ''),
				promocodeId:
              reqData && reqData.promoCode && reqData.promoCode?.id
              	? reqData.promoCode?.id
              	: props.promoDetails?.id || '',
				checkout_flow_type: 'nextjs',
				type: props.type,

			}}
		/>;
	}

	const hidePaystack = true;

	if (!hidePaystack && entityData?.partnerData?.entity_id === 'STARSONA-US-1' && bookingPrice > 0) {
		return <Paystack {...props} />;
	}


	return (
		<Container className="pay-container">
			{bookingPrice <= 0 && (
				<FlexCenter>
					<Button onClick={() => props.zeroPayment(props.bookingId)} data-cy="pay-btn">
						{t('common.pay')}
					</Button>
				</FlexCenter>
			)}
			<React.Fragment>
				{optileSource && isLoggedIn && getOptileIframe()}
			</React.Fragment>
		</Container>
	);
};

Checkout.propTypes = {
	loaderAction: PropTypes.func.isRequired,
	starData: PropTypes.object.isRequired,
	returnUrl: PropTypes.string,
	currencyData: PropTypes.object.isRequired,
	bookingId: PropTypes.string,
	promoDetails: PropTypes.object,
	onOptileFail: PropTypes.func,
	match: PropTypes.object.isRequired,
	localUpdateToast: PropTypes.func.isRequired,
	deferral: PropTypes.string,
	language: PropTypes.object,
	zeroPayment: PropTypes.oneOfType([PropTypes.func, null]),
	type: PropTypes.string,
};

Checkout.defaultProps = {
	returnUrl: '',
	onOptileFail: () => {},
	bookingId: '',
	deferral: 'DEFERRED',
	promoDetails: {},
	language: {},
	zeroPayment: null,
	type: '',
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
//   sourceList: state.paymentDetails.sourceList,
//   fanDatails: state.userDetails.settings_userDetails,
//   entityData: state.entity.data,
//   currencyData: state.entity.currencyData,
//   language: state.entity.languageData,
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     loaderAction: state => dispatch(loaderAction(state)),
//     localUpdateToast: toastObj => {
//       dispatch(localUpdateToast({ ...toastObj, global: true }));
//     },
//   };
// }

Checkout.defaultProps = {
	title: 'Booking Request',
	description: 'Booking Request'
};
export default Checkout;
