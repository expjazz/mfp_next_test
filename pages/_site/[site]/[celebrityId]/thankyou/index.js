import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos, getProfessions } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import Pusher from 'pusher-js';
import { dehydrate } from 'react-query/hydration';
import axios from 'axios';
import PurchaseStarLayout from 'components/PageStyles/CelebrityId/Layout/Purchase';
import { localeEntity } from 'src/services/entities/localeEntity';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { CardAndButtonWrapper, CardWrapper, FooterCard, ShoutOutVideoWrapper, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/styled';
import { useTranslation } from 'next-i18next';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { starAllowedServices } from 'components/PageStyles/CelebrityId/constants';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { getActiveOptions } from 'components/PageStyles/CelebrityId/utils';
import { generalLoader, resetBookingData, updateToast, useGeneral } from 'src/context/general';
import { ButtonWrap, HeadingH1, HeadingH2B, Hr, Ul } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { reqList } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/utils';
import RequestCard from 'components/RequestCard';
import Link from 'next/link';
import { isEmpty } from 'src/utils/dataStructures';
import { DescriptionP, LinkText } from 'styles/TextStyled';
import VideoList from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/components/VideoList';
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide';
import { getShortName, getStarName } from 'src/utils/dataToStringFormatter';
import { requestTypesKeys, requestTypeStreamKeys } from 'src/constants/requestTypes';
import { getRating } from 'src/services/myfanpark/celebActions';
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage';
import { useMediaQuery } from '@material-ui/core';
import Follow from 'components/PageStyles/CelebrityId/PurchaseSection/components/Follow';
import { locStorage, sessStorage } from 'src/utils/localStorageUtils';
import Script from 'next/script';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import Success from 'components/Success';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import { successData } from 'components/PageStyles/CelebrityId/PurchaseSection/constants';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { updateNotification } from 'src/services/myfanpark/noticiationActions';
import { getPaymentStatus, postVodapaySuccess } from 'src/services/myfanpark/paymentActions';
import Loader from 'components/Loader';
import ThankContainer from 'components/PageStyles/CelebrityId/thankyou/styled';
import { changePassword } from 'src/services/myfanpark/loginActions';
import { useCurrencyData } from 'customHooks/currencyUtils';
import { isBrowser, isVodacom } from 'customHooks/domUtils';

function Thankyou() {
	const { t } = useTranslation();
	const router = useRouter();
	const [booking, setBooking] = useState(false);
	const [websocket, setWebsocket] = useState(false);
	const currencyData = useCurrencyData();
	const reference = router.query?.reference ? JSON.parse(router.query.reference) : {};
	// console.log(router.query?.reference ? JSON.parse(router.query.reference) : '', 'hrhrhr')
	useEffect(() => {
		if (websocket) {
			let bookingId = '';
			try{
				bookingId = router.query?.reference ? JSON.parse(router.query.reference).bookingId : '';
			} catch (e) {
				console.log(e);
			}
			try {

				const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_PAYMENT_KEY, {
					cluster: 'us2'
				});
				const channel = pusher.subscribe(`payment-${bookingId}`);
				channel.bind('optile_event', data => {
					console.log(data, 'pusher data');
				});
			} catch (e) {
				console.log(e, 'pusher error');
			}
		}
	}, [websocket]);
	// const bookingId = 'mep9B6aM'
	// useEffect(() => {
	// }, [])
	const getPayment = async (bookingId) => {
		let data = null;
		try {
			data = await getPaymentStatus(bookingId);

		} catch (e) {
			data = null;
		}
		if (!data || data.error) {
			setWebsocket(true);
			setTimeout(async () => {
				let data = null;
				try {
					data = await getPaymentStatus(bookingId);
				} catch (e) {
					data = null;
				}
				if (!data || data.error) {
					setBooking({error: true});
				} else {
					setBooking(data);
				}
			}, 15000);
		} else {
			setBooking(data);
			setWebsocket(false);
		}
	};
	useEffect(() => {
		if (router.query?.zero_pay || router.query.vodacom) {
			return;
		}
		let bookingId = '';
		try{
			bookingId = router.query?.reference ? JSON.parse(router.query.reference).bookingId : '';
		} catch (e) {
			console.log(e);
		}
		if (bookingId) {
			getPayment(bookingId);
		}

	}, [router.query]);
	const backHandler = () => {
		router.back();
	};
	const { data: fanData } =  useFetchLoggedUser();
	const { data: entityData } = useGetPartner();
	const { data: celebrityData } = useGetCelebrityData();
	const [state, dispatch] = useGeneral();
	const loaderAction = payload => generalLoader(dispatch, payload);
	const localUpdateToast = payload => updateToast(dispatch, payload);
	const handleReqType = () => {
		if (router.query.commercial) {
			return requestTypesKeys.commercial;
		}
		return requestTypeStreamKeys[booking?.id] || 1;
	};
	const queryClient = useQueryClient();
	let data = successData({
		t,
		callBack: () => {},
		key: handleReqType(),
		starName: getShortName(
			celebrityData?.user.nick_name,
			celebrityData?.user.first_name,
		),
		entityData: entityData?.partnerData});
	const updateNotf = obj => {
		updateNotification(
			obj,
			true,
			false,
			true,
			!!fanData,
			loaderAction,
			localUpdateToast,
			queryClient,
			fanData,
			t
		);
	};
	const starNM = getStarName(
		celebrityData?.user.nick_name,
		celebrityData?.user.first_name
	);

	if (router.query.suggest) {
		data.successMsg = t('common.thank_you_suggestion');
		data.note = t('purchase_flow.suggestion_note', { starNM });
	}

	const withoutPayment = () => {
		// Considering paystack as zero pay since the confirmation occurs on the previous page
		return router.query?.commercial || router.query?.suggest || router.query?.zero_pay || router.query?.paystack || router.query.vodacom;
	};
	const localChangePassword = (obj, callback) => {
		changePassword(
			obj,
			callback,
			true,
			loaderAction,
			fanData,
			queryClient,
			localUpdateToast,
			t
		);
	};
	const renderProcessing = () =>  {
		if (!router.query.error && (!booking.error && router.query.interactionReason !== 'NETWORK_FAILURE')) {

			return (
				<>
					<HeadingH2B className="success-head">Processing</HeadingH2B>
					<DescriptionP>Please wait while we confirm the transaction</DescriptionP>
					<Loader />
				</>
			);
		} else {

			let errorMsg = 'There was an error. Please try again or contact support';
			let title = 'Error';
			if (isVodacom()) {
				title = 'Order cancelled';
				errorMsg = 'If you would like to purchase this experience at a later point, please resubmit your request';
			}
			return (
				<>
					<HeadingH2B className="success-head">{title}</HeadingH2B>
					<DescriptionP>{errorMsg}</DescriptionP>
				</>
			); }
	};

	const renderSuccess = () => reference?.type === 'tip' ? (
		<React.Fragment>
			<div className="success-wrap">
				<span className="success-title">{t('my_videos.tip_sent')}</span>
			</div>
			<LinkText className="back-link">
				<Link href={`/${router?.query?.celebrityId}`}>
					<a>
            Back to request
					</a>
				</Link>
			</LinkText>
		</React.Fragment>
	) : (
		<Success {...data}
			notfSettings={fanData?.user.notification_settings}
			userDataLoaded={!!fanData}
			hasPassword={fanData?.user?.has_password}
			starDetails={
				{userData: celebrityData?.user,
					celbData: celebrityData?.celebrity_details}
			}
			userDataLoaded={!!fanData}
			updateNotf={updateNotf}
			changePassword={localChangePassword}
		/>
	);

	useEffect(() => {
		const reqData = locStorage.getItem('req_data');
		if (router.query?.interactionCode === 'PROCEED') {
			const reference =
      router.query.reference && JSON.parse(decodeURIComponent(router.query.reference));
			const optileData = {
				...router.query,
				reference: (typeof reference === 'object' && reference.bookingId) || '',
				promocodeId:
          (typeof reference === 'object' && router.query.promocodeId) || '',
			};
			const tempReqData = {
				promoCode: optileData?.promoCode || reqData?.promoCode?.code,
			};
			if (window.dataLayer) {
				window.dataLayer.push({
					event: 'payment-success',
					bookingID: optileData.reference,
					realAmount: parseInt(reqData?.amount || optileData.amount, 10),
					localAmount: optileData.amount,
					promoCode: tempReqData?.promoCode,
					localCurrency: currencyData.abbr,
					talent: celebrityData?.user.nick_name
						? celebrityData?.user.nick_name
						: `${celebrityData?.user.first_name} ${celebrityData?.user.last_name}`,
					product: router.query?.celebrityId,
					amount: reqData?.amount || optileData.amount,
				});

				const gaObj = sessStorage.getItem('ga_checkout');
				if (window.dataLayer) {

					window.dataLayer.push({
						ecommerce: {
							purchase: {
								actionField: {
									id: optileData.transactionId, // Transaction ID. Required
									revenue: optileData.amount,
									coupon: optileData?.promoCode || reqData?.promoCode?.code,
								},
								products: [
									gaObj,
								],
							},
						},
					});
				}
			}
			sessStorage.removeItem('ga_checkout');
		}
	}, [router.query]);
	const reqData = !isBrowser() ? {} : locStorage.getItem('req_data');
	useEffect(() => {
		// if (isVodacom()) {
		locStorage.removeItem('req_data');
		resetBookingData(dispatch);
		// }
	}, [reqData]);
	return (
		<>
			{/* <Script
        src="https://js.pusher.com/7.0.3/pusher.min.js"
      /> */}
			<>
				<Wrapper reqDisplay>
					{/* <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={backHandler}
            className="web-back back-top"
          /> */}
					<ThankContainer>
						{(booking && !booking.error) || withoutPayment() ? (
							renderSuccess()

						) : renderProcessing()}
						{/* {returnUrl && (
              <LinkText className="conv-link">
                <Link href={returnUrl}>Back to conversation</Link>
              </LinkText>
            )} */}
					</ThankContainer>
				</Wrapper>
				<Hr mob />
			</>
		</>
	);
}

Thankyou.getLayout = page => (
	<PurchaseStarLayout pageProps={page.props} >
		{page}
	</PurchaseStarLayout>
);

export async function getStaticPaths() {
	return {
		paths: [
			// { params:  { celebrityId: 'primrose' }, locale: 'en-US' },
			// { params:  { celebrityId: 'primrose' }, locale: 'en-ZA' },
			// { params:  { celebrityId: 'primrose' }, locale: 'en-IN' },
			// { params:  { celebrityId: 'primrose' }, locale: 'en-CA' },
			// { params:  { celebrityId: 'primrose' }, locale: 'de' }
		],
		fallback: 'blocking',
	};
}

export async function getStaticProps(props) {
	const { params: { celebrityId, site }, locale } = props;

	try {

		const { partnerData, currencyData, languageData } = await getEntity(site, locale);
		const entityId = partnerData.entity_id;
		const entityToken = partnerData.public_token;

		const queryClient = new QueryClient();
		await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData });
		try {
			await queryClient.fetchQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }));
		} catch(e) {
			return {
				notFound: true
			};
		}


		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				partnerData: { entityId, entityToken },
				...(await serverSideTranslations(locale, ['common', 'footer'])),

			},
			revalidate: 60,
		};
	} catch (e) {
		return {
			props: {
				error: e.message
			}
		};
	}
}

export default Thankyou;
