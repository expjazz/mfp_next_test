import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos, getProfessions } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';
import axios from 'axios';
import { localeEntity } from 'src/services/entities/localeEntity';
import { fetchOccasionlist } from 'src/services/myfanpark/ocassionsActions';
import { generalLoader, paymentFetchSuccess, playPauseMedia, recordTrigger, updateMediaStore, updateToast, useGeneral } from 'src/context/general';
import { Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import PurchaseStarLayout from 'components/PageStyles/CelebrityId/Layout/Purchase';
import { getStarName } from 'src/utils/dataToStringFormatter';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { getRating } from 'src/services/myfanpark/celebActions';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { isCelebLocStorage, locStorage } from 'src/utils/localStorageUtils';
import Recorder from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/components/QA/Recorder';
import { getDiscount, getDiscountedPrice, hasDiscount } from 'src/utils/paymentUtils';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import Payment from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/components/QA/Payment';
import { starsonaRequest, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import getAWSCredentials from 'src/utils/AWSUpload';
import { locations } from 'src/constants/locations';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import CancelConfirmation from 'components/PageStyles/CelebrityId/PurchaseSection/components/CancelConfirmation';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { generateProductId, isVodacom, isVodacomIOS } from 'customHooks/domUtils';
import { useTranslation } from 'next-i18next';
import localApi from 'src/lib/localApi';
import cmsAPI from 'src/lib/cmsApi';
import { cmsFetch } from 'src/services/fetch';

// recordTrigger: value => {
//   dispatch(recordTrigger(value));
// },
// updateMediaStore: payload => {
//   dispatch(updateMediaStore(payload));
// },
// playPauseMedia: value => {
//   dispatch(playPauseMedia(value));
// },
function PurchaserQa(props) {
	const { t } = useTranslation();
	const [bookingId, updateBookingId] = useState('');
	const router = useRouter();
	const { celebrityId } = router.query;
	const { entityId, entityToken } = props.partnerData;
	const { data: fanData } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const [confirmCancel, setConfirmCancel] = useState(false);
	const [step, setStep] = useState(1);
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const [state, dispatch] = useGeneral();
	const { commonReducer } = state;
	const { file: videoFile,
		videoSrc,
		recorded,
		playPauseMedia: playPauseMediaFlg,
		shouldRecord,
		recordedTime
	} = commonReducer;
	const backHandler = () => {
		if (step === 2) {
			setStep(1);
		} else {
			setConfirmCancel(true);
		}
	};

	const confirmBackHandler = () => {
		setConfirmCancel(false);
		locStorage.removeItem('req_data');
		router.back();
	};
	const isBookable = isCelebLocStorage() && celebrityData?.isBookable;
	const {
		showContent,
		promoCode,
		updateLocalStore,
		toggContent,

	} = useContext(StarContext);

	const uploadSuccess = payload => (bookingID, res) => {
		// updateLocalStore({
		//   ...{ lang },
		//   resp: {
		//     booking: bookingID,
		//     videoUrl: res.data.request_video.s3_video_url,
		//   },
		//   requestId: bookingID,
		//   fileName: payload.fileName,
		// });

		generalLoader(dispatch, false);
		updateBookingId(bookingID);
		setStep(2);
	};

	const callRequest = fileName => {
		const payload = {
			starDetail: {
				id: celebrityData?.user.id,
			},
			question: '',
			date: '',
			language: lang.id,
			type: requestTypesKeys.qa,
			fileName,
			public_request: true,
			...(reqData.requestId ? { requestId: reqData.requestId } : {}),
		};
		starsonaRequest(
			payload,
			true,
			uploadSuccess(payload),
			payload => generalLoader(dispatch, payload),
			payload => updateToast(dispatch, payload),
			payload => paymentFetchSuccess(dispatch, payload)
		);
	};
	const handleQAUpload = () => {
		let test = false;
		let uploadVideo = null;
		if (!videoFile && reqData.fileName) {
			callRequest(reqData.fileName);
		} else {
			if (test && videoFile.name && typeof videoFile.name === 'string') {
				uploadVideo = videoFile;
			} else {
				uploadVideo = new File([videoFile], 'askVideo.mp4');
			}
			generalLoader(dispatch, true);
			getAWSCredentials(locations.askAwsVideoCredentials, uploadVideo)
				.then(response => {
					if (response && response.filename) {
						// For vodacom we need to use CMS to video upload
						let payload = null;
						let path = null;
						if (isVodacomIOS()) {
							path = `${process.env.NEXT_PUBLIC_CMS_SERVICE_ENDPOINT}${cmsAPI.imageUpload}`;
							payload = {
								file: response.jsonFile,
								response: response.response,
							};
						} else {
							path = response.url.replace('s3.', 's3-accelerate.');
							payload = response.formData;
						}
						axios.post(path, payload)
							.then(() => {
								callRequest(response.filename);
							})
							.catch((err) => {
								console.log(err);
								updateToast(dispatch, {
									value: true,
									message: t('purchase_flow.upload_failed'),
									variant: 'error',
									global: true
								});
								generalLoader(dispatch, false);
							});
					}
				})
				.catch(err => {
					updateToast(dispatch, {
						value: true,
						message: err.message,
						variant: 'error',
						global: true
					});
					generalLoader(dispatch, false);
				});
		}
	};
	const onContinue = () => {
		handleQAUpload();
	};
	const reqDataString = null;
	const reqData = reqDataString ? reqDataString : {};
	const [lang, setLang] = useState(reqData?.lang || {});
	const onSelectLang = language => {
		setLang(language);
	};

	const hasDis = hasDiscount(
		'Video shoutouts',
		celebrityData?.celebrity_details.discount,
	);

	const discount = useMemo(() => {
		const amount = hasDis
			? getDiscountedPrice(
				'Video shoutouts',
				celebrityData?.celebrity_details.discount,
				celebrityData?.celebrity_details.rate,
			)
			: getDiscount(
				requestTypesKeys.shoutout,
				promoCode,
				celebrityData?.celebrity_details.rate,
			);
		return amount || amount === 0 ? amount :celebrityData?.celebrity_details.rate;
	}, [celebrityData?.celebrity_details.rate, promoCode]);

	const starNM = getStarName(
		celebrityData?.user.nick_name,
		celebrityData?.user.first_name,
		celebrityData?.user.last_name,
	);

	useEffect(() => {
		if (isLoggedIn)
			bookingInitiate({
				celebrity: celebrityData?.user.id,
				request_type: requestTypesKeys.qa,
				id: null,
			});
	}, [isLoggedIn]);

	// const { data: userData } = useFetchLoggedUser()

	// const zeroPayment = bookingID => {
	//   zeroPayBooking(
	//     {
	//       amount: discount,
	//       reference: bookingID,
	//       promoCode: promoCode.code,
	//     },
	//     dispatch,
	//     fanData?.user.authentication_token
	//   );
	// };
	const localCurrency = useCurrencyData();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'product-page-view',
				product_type: 'qa',
				product_id:  generateProductId('qa', {
					star: celebrityData?.user,
				})
			});
		}
	}, []);
	const zeroPayment = bookingID => {
		zeroPayBooking(
			{
				amount: discount,
				reference: bookingID,
				promoCode: promoCode.code,
				originalPrice: celebrityData?.celebrity_details.rate,
				currency: localCurrency?.abbr,
				localAmount: numberToDecimalWithFractionTwo(
					getLocalAmount(discount),
					false,
					false,
				)
			},
			dispatch,
			fanData?.user.authentication_token
		).then(bool => {
			if (bool) {
				router.push(`/${router.query?.celebrityId}/thankyou?zero_pay=true`);
			}
		});
	};
	return (
		<>
			<Wrapper className="pay-wrp" isVodacom={isVodacom()}>
				<FontAwesomeIcon
					icon={faChevronLeft}
					onClick={backHandler}
					className="web-back top-back"
				/>
				{
					step === 1 && (

						<Recorder
							{...props}
							{...commonReducer}
							redPlay={commonReducer.playPauseMedia}
							lang={lang}
							hasDis={false}
							playPauseMediaFlg={playPauseMediaFlg}
							videoSrc={videoSrc}
							recorded={recorded}
							shouldRecord={shouldRecord}
							recordedTime={recordedTime}
							updateMediaStore={payload => updateMediaStore(dispatch, payload)}
							discount={discount}
							playPauseMediaAction={payload =>  playPauseMedia(dispatch, payload)}
							playPauseMedia={payload =>  playPauseMedia(dispatch, payload)}
							recordTrigger={payload => recordTrigger(dispatch, payload)}
							fanData={{avatar: ''}}
							onContinue={onContinue}
							onSelectLang={onSelectLang}
							starData={{celbData: celebrityData?.celebrity_details,
								userData: celebrityData?.user,
								avatar: getAvtar(celebrityData?.user.avatar_photo)
							}}
							starNM={starNM}
							title="qa"
						/>
					)
				}
				{
					step === 2 && (
						<Payment
							{...props}
							// hasDis={hasDis}
							promoDet={promoCode}
							finalPrice={discount}
							bookingId={bookingId}
							starData={{
								celbData: celebrityData?.celebrity_details,
								userData: celebrityData?.user
							}}
							zeroPayment={zeroPayment}
							setStep={() => setStep(1)}
						/>
					)
				}
				{confirmCancel && (
					<CancelConfirmation
						open={confirmCancel}
						onClose={setConfirmCancel}
						goBack={confirmBackHandler}
						starNM={starNM}
					/>
				)}
			</Wrapper>
		</>
	);
}

PurchaserQa.getLayout = page => (
	<PurchaseStarLayout pageProps={{...page.props, checkoutMode: true}} >
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

		await queryClient.prefetchQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }));

		// await queryClient.prefetchQuery(['featuredVideos', celebrityId], () => getFeaturedVideos({ celebrityId, limit: 20, offset: 0 }))

		// await queryClient.prefetchQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }))

		// await queryClient.prefetchQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }))

		// await queryClient.prefetchQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0))

		// await queryClient.prefetchQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }))
		// await queryClient.prefetchQuery(['celebrityTopProducts', celebrityId], () => getCelebrityTopProducts({ celebrityId }))

		// await queryClient.prefetchQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0))
		// await queryClient.prefetchQuery(['celebrityFanRating', celebrityId], () => getRating(celebrityId,
		//   [
		//     requestTypesKeys.shoutout,
		//     requestTypesKeys.event,
		//     requestTypesKeys.qa,
		//   ].join(','),
		// ))

		// await queryClient.prefetchQuery(['shoutout-occasions', 1, entityId], () => fetchOccasionlist(1, entityId))
		// const professions = await getProfessions()

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				partnerData: { entityId, entityToken },
				// professions,
				...(await serverSideTranslations(locale, ['common', 'footer'])),

			},
			revalidate: 60,
		};
	} catch (e) {
		return {
			notFound: true
		};
	}
}

export default PurchaserQa;
