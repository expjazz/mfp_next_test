import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos, getProfessions } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';
import { getRating } from 'src/services/myfanpark/celebActions';
import axios from 'axios';
import PurchaseStarLayout from 'components/PageStyles/CelebrityId/Layout/Purchase';
import { localeEntity } from 'src/services/entities/localeEntity';
import Button from 'components/SecondaryButton';

import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { CardAndButtonWrapper, CardWrapper, FooterCard, ShoutOutVideoWrapper, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/styled';
import { Trans, useTranslation } from 'next-i18next';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { bookingInitiate, getLast2Msg } from 'src/services/myfanpark/productActions';
import { getDiscount, getDiscountedPriceTempFix } from 'src/utils/paymentUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { RateBold } from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import AlertSoldOut from 'components/AlertSoldOut';
import { HeadingH2 } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { NoMessage } from 'components/PageStyles/CelebrityId/PurchaseSection/components/DirectMessage/styled';
import { DescriptionP } from 'styles/TextStyled';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { FlexCenter } from 'styles/CommonStyled';
import Message from 'components/PageStyles/CelebrityId/PurchaseSection/components/DirectMessage/components/Details';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import AlertSection from 'components/AlertSection';
import { generateProductId, isVodacom } from 'customHooks/domUtils';

// const entity = value => value
function PurchaseDM(props) {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { entityId, entityToken } = props.partnerData;
	const [state, dispatch] = useGeneral();
	const { data } = useGetPartner();
	const { data: fanData, isLoggedIn } = useFetchLoggedUser();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const router = useRouter();
	const { celebrityId } = router.query;
	const { t } = useTranslation();
	const [success, setSuccess] = useState(false);
	const [conversation, setConversation] = useState(null);
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { rate, remaining_limit: remLimit } =
    celebrityData &&
    celebrityData?.celebrity_details &&
    celebrityData?.celebrity_details.rate_limit &&
    celebrityData?.celebrity_details.rate_limit.length > 0 &&
    celebrityData?.celebrity_details.rate_limit.find(
    	limit => limit.type === requestTypesKeys.message,
    );
	const [rateObj] = useState(rate || { rate: '' });
	const { promoCode } = useContext(StarContext);
	const [returnUrl, setReturnUrl] = useState('');
	const onSuccess = () => {
		alert('do later');
	};
	const getLastMsg = () => {
		generalLoader(dispatch, true);
		getLast2Msg(celebrityData?.user.user_id)
			.then(res => {
				generalLoader(dispatch, false);
				if (res && res.data && res.data.data) {
					setConversation(res.data.data.conversation);
				}
			})
			.catch(() => {
				generalLoader(dispatch, false);
			});
	};

	useEffect(() => {
		if (isLoggedIn) getLastMsg();
	}, [isLoggedIn]);

	const sharePage = () => {};

	const backHandler = () => {
		router.back();
	};

	const discount = useMemo(() => {
		let amount = getDiscountedPriceTempFix(
			'Direct Messages',
			celebrityData?.celebrity_details.discount,
			typeof rateObj === 'object' ? rateObj.rate : rateObj,
		);
		if (!amount) {
			amount = getDiscount(requestTypesKeys.message, promoCode, rateObj.rate);
		}
		return numberToDecimalWithFractionTwo(
			amount || amount === 0
				? getLocalAmount(amount)
				: getLocalAmount(rateObj.rate),
			false,
			false,
		);
	}, [rateObj, rateObj.rate, promoCode]);

	useEffect(() => {
		if (isLoggedIn)
			bookingInitiate({
				celebrity: celebrityData?.user.id,
				request_type: requestTypesKeys.message,
				id: null,
			});
	}, [isLoggedIn]);

	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'product-page-view',
				product_type: 'dm',
				product_id: generateProductId('dm', {
					star: celebrityData?.user,
				}),
			});
		}
	}, []);
	return (
		<>
			<Wrapper isVodacom={isVodacom()} className="pay-wrp" reqDisplay>
				<FontAwesomeIcon
					icon={faChevronLeft}
					onClick={backHandler}
					className="web-back back-top"
				/>
				{!celebrityData?.user.talent_status ===
          accountStatus.live && !celebrityData?.user.talent_status === accountStatus.hidden && (
					<AlertSection
						celebId={celebrityData?.user.id}
						alertText={t('common.temp_unavailable')}
						alertButton={t('common.alert_available')}
					/>
				)}

				{!remLimit && (
					<>
						<NoMessage>
							<HeadingH2>{t('purchase_flow.direct_message.lets_chat')}</HeadingH2>
							<RateBold>
								{getLocalSymbol()}
								{discount}
							</RateBold>
							<AlertSoldOut
								celbId={celebrityData?.user.id}
								type={requestTypesKeys.message}
								updateToast={payload => updateToast(dispatch, payload)}
								rootClass="alertRoot"
								fanEmail={props.fanData?.email}
							/>
						</NoMessage>
					</>
				)}
				{remLimit > 0 && celebrityData?.celebrity_details.pending_direct_message && (
					<NoMessage>
						<HeadingH2>{t('purchase_flow.direct_message.lets_chat')}</HeadingH2>
						<RateBold>
							{getLocalSymbol()}
							{discount}
						</RateBold>
						<DescriptionP>
							<Trans
								i18nKey="purchase_flow.direct_message.note"
								values={{ purchaser: partnerData.talent_plural_name }}
							>
                You can only send one message at a a time, as soon as
								{getShortName(
									celebrityData?.user.nick_name,
									celebrityData?.user.first_name,
								)}
                sends you a reply, you continue the conversation.
							</Trans>
						</DescriptionP>
						<FlexCenter className="btn-center">
							{conversation && (
								<a
									href={`https://${router.query.site}/fan-manage/my-videos?type=conversation&request_id=${conversation.booking_id}&from=request&oken=${fanData?.user.autologin_id}`}
								>
									<Button secondary className="conv-btn">
										{t('purchase_flow.view_coversation')}
									</Button>
								</a>
							)}
						</FlexCenter>
					</NoMessage>
				)}
				{remLimit > 0 && !celebrityData?.celebrity_details.pending_direct_message && (

					<Message
						fanData={{avatar: ''}}
						starData={{
							celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						conversation={conversation}
						loaderAction={payload => generalLoader(dispatch, payload)}
						updateToast={payload => updateToast(dispatch, payload)}
						createCharge={() => {}}
						onSuccess={() => {}}
						isLoggedIn={isLoggedIn}
						title={'dm'}
						currencyData={currencyData}
						discount={discount}
					/>
				)}

			</Wrapper>

		</>
	);
}

PurchaseDM.getLayout = page => (
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
	if (celebrityId.includes('.')) {
		return {
			notFound: true
		};
	}
	try {

		const { partnerData, currencyData, languageData } = await getEntity(site, locale);
		const entityId = partnerData.entity_id;
		const entityToken = partnerData.public_token;

		axios.interceptors.request.use(config => {
			config.headers['entity-id'] = entityId;
			config.headers['entity-token'] = entityToken;
		});
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
			props: {
				error: e.message
			}
		};
	}
}

export default PurchaseDM;
