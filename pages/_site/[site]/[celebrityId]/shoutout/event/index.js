import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos, getProfessions } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';
import axios from 'axios';
import { localeEntity } from 'src/services/entities/localeEntity';
import { fetchOccasionlist } from 'src/services/myfanpark/ocassionsActions';
import { generalLoader, paymentFetchSuccess, updateToast, useGeneral } from 'src/context/general';
import { Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import InnerProductLayoutContainer from 'components/PageStyles/CelebrityId/Layout/InnerProductLayout/InnerProductLayoutContainer';
import PurchaseStarLayout from 'components/PageStyles/CelebrityId/Layout/Purchase';
import Form from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/components/Shoutout/Form';
import { getStarName } from 'src/utils/dataToStringFormatter';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { getRating } from 'src/services/myfanpark/celebActions';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { starsonaRequest, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import CancelConfirmation from 'components/PageStyles/CelebrityId/PurchaseSection/components/CancelConfirmation';
import { locStorage } from 'src/utils/localStorageUtils';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generateProductId, isVodacom } from 'customHooks/domUtils';
function AnnouncementProduct(props) {
	const router = useRouter();
	const [state, dispatch] = useGeneral();
	const { bookingData } = state.purchaseFlow;
	const [confirmCancel, setConfirmCancel] = useState(false);
	const [bookingId, updateBookingId] = useState('');

	const [step, setStep] = useState(1);
	const backHandler = () => {
		if (step === 2) {
			setStep(1);
		} else {
			setConfirmCancel(true);
			// router.back();
		}
	};
	const confirmBackHandler = () => {
		setConfirmCancel(false);
		locStorage.removeItem('req_data');
		router.back();
	};
	const audio = state.audioRecorder.recorded;
	const { entityId, entityToken } = props.partnerData;

	const { celebrityId } = router.query;
	const { data: occList } = useQuery(['shoutout-occasions', 1, entityId], () => fetchOccasionlist(1, entityId));
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	// if (!celebrityData) {
	//   return <h1>test</h1>
	// }
	const starNM = getStarName(
		celebrityData?.user.nick_name,
		celebrityData?.user.first_name,
		celebrityData?.user.last_name,
	);

	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'product-page-view',
				product_type: 'event',
				product_id:  generateProductId('announcement', {
					star: celebrityData?.user,
				})
			});
		}
	}, []);
	const saveSuccess = ({ lang }) => bookingID => {
		generalLoader(dispatch, false);
		updateBookingId(bookingID);
		setStep(2);
		// updateLocalStore({
		//   ...props.bookingData,
		//   resp: { booking: bookingID },
		//   requestId: bookingID,
		//   language: lang,
		// });
	};

	const getAudioFile = key => {
		if (audio[key] !== null) {
			if (typeof audio[key].recordedBlob === 'string') return null;
			return new File([audio[key].recordedBlob], 'recorded-name.webm');
		}
		return null;
	};

	const onSubmit = ({ lang, promoCode, discount }) => {
		const payload = {
			starDetail: {
				id: celebrityData?.user.id,
			},
			selectedValue: bookingData.occasion.key,
			language: lang.id,
			public_request: !bookingData.privateVideo,
			from_audio_file: getAudioFile('from'),
			to_audio_file: getAudioFile('for'),
			host_audio_file: getAudioFile('host'),
			honor_audio_file: getAudioFile('honor'),
			type: requestTypesKeys.shoutout,
			requestRelationshipData: bookingData.relationshipValue,
			stargramto: bookingData.hostName,
			stargramfrom:
        bookingData.user !== 'Myself' ? bookingData.userName : '',
			date: bookingData.date,
			importantinfo: bookingData.templateType
				? bookingData.importantInfo
				: bookingData.scriptText,
			booking_statement: bookingData.otherSelected
				? bookingData.scriptText
				: '',
			event_guest_honor:
        bookingData.templateType === 7 ||
        bookingData.templateType === 2
        	? bookingData.specification
        	: '',
			from_where:
        bookingData.templateType === 5
        	? bookingData.specification
        	: '',

			for_what:
        bookingData.templateType === 4 ||
        bookingData.templateType === 3
        	? bookingData.specification
        	: '',
			event_title:
        bookingData.templateType === 6
        	? bookingData.specification
        	: '',
			is_myself: bookingData.user === 'Myself',
			requestId: bookingData.requestId || null,
			templateType: bookingData.otherSelected
				? 'other'
				: bookingData.templateType,
		};
		starsonaRequest(
			payload,
			bookingData.privateVideo,
			saveSuccess({ promoCode, discount, lang }),
			payload => generalLoader(dispatch, payload),
			payload => updateToast(dispatch, payload),
			payload => paymentFetchSuccess(dispatch, payload)
		);
	};

	return (
		<>
			<Wrapper isVodacom={isVodacom()}>
				<FontAwesomeIcon
					icon={faChevronLeft}
					onClick={backHandler}
					className="web-back top-back"
				/>
				<Form
					{...props}
					audio={audio}
					title="announcement"
					starNM={starNM}
					setStep={setStep}
					starData={{celbData: celebrityData?.celebrity_details,
						userData: celebrityData?.user,
						avatar: getAvtar(celebrityData?.user.avatar_photo)
					}}
					audioRecorder={state.audioRecorder}
					audioRecordHandler={() => {}}
					paymentSuccess={() => {}}
					step={step}
					onSubmit={onSubmit}
					bookingId={bookingId}
					zeroPayment={() => {}}
					setStep={() => setStep(1)}

				/>
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

AnnouncementProduct.getLayout = page => (
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


		await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale));

		await queryClient.prefetchQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }));

		await queryClient.prefetchQuery(['featuredVideos', celebrityId], () => getFeaturedVideos({ celebrityId, limit: 20, offset: 0 }));

		await queryClient.prefetchQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));

		await queryClient.prefetchQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));

		await queryClient.prefetchQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0));

		await queryClient.prefetchQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }));
		await queryClient.prefetchQuery(['celebrityTopProducts', celebrityId], () => getCelebrityTopProducts({ celebrityId }));

		await queryClient.prefetchQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0));
		await queryClient.prefetchQuery(['celebrityFanRating', celebrityId], () => getRating(celebrityId,
			[
				requestTypesKeys.shoutout,
				requestTypesKeys.event,
				requestTypesKeys.qa,
			].join(','),
		));

		await queryClient.prefetchQuery(['shoutout-occasions', entityId], () => fetchOccasionlist(2, entityId));
		const professions = await getProfessions();

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				partnerData: { entityId, entityToken },
				professions,
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

export default AnnouncementProduct;
