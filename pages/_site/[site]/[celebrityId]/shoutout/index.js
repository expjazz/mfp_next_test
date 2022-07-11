import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos, getProfessions } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
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
import { updateToast, useGeneral } from 'src/context/general';
import { ButtonWrap, HeadingH1, Ul } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { reqList } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/utils';
import RequestCard from 'components/RequestCard';
import Link from 'next/link';
import { isEmpty } from 'src/utils/dataStructures';
import { LinkText } from 'styles/TextStyled';
import VideoList from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/components/VideoList';
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { getRating } from 'src/services/myfanpark/celebActions';
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage';
import { useMediaQuery } from '@material-ui/core';
import Follow from 'components/PageStyles/CelebrityId/PurchaseSection/components/Follow';
import { locStorage } from 'src/utils/localStorageUtils';
import { useComments, useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import AlertSection from 'components/AlertSection';
import AlertSoldOut from 'components/AlertSoldOut';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import Review from 'components/PageStyles/CelebrityId/PurchaseSection/components/Review';

function ShoutoutPurchase(props) {
	const { entityId, entityToken } = props.partnerData;
	const [state, dispatch] = useGeneral();
	const { isStar } = useFetchLoggedUser();
	const router = useRouter();
	const { celebrityId } = router.query;
	const userId = celebrityId.toLowerCase();
	const { data: socialListData, isLoading: celebritySocialLoading, error: celebritySocialError } = useQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
	const { data: commentInfo } = useComments(userId, [
		requestTypesKeys.shoutout,
		requestTypesKeys.event,
		requestTypesKeys.qa,
	].join(','));
	const starData = {...celebrityData?.celebrity_details, avatar: getAvtar(celebrityData?.user.avatar_photo)};
	const fanData = {
		avatar: ''
	};
	const title = 'Shoutout';
	const digitalGoodsList = celebrityFunStuffData?.fun_stuff;
	const activeServices = {};
	Object.keys(celebrityData?.celebrity_details.services).forEach(row => {
		const temp = {};
		activeServices[starAllowedServices[row]] = celebrityData?.celebrity_details.services[row];
		// activeServices.push(temp)
	});
	const services = useMemo(() => {
		let liveItem = null;
		let funItem = null;

		if (digitalGoodsList?.length) {
			liveItem = digitalGoodsList.find(
				fun => fun.delivery_method === deliveryMethods.videoCalls,
			);
			funItem = digitalGoodsList.find(
				fun => fun.delivery_method !== deliveryMethods.videoCalls,
			);
		}
		const serviceList = getActiveOptions(activeServices, liveItem, funItem);
		return serviceList.map(prod => prod.label);
	}, [digitalGoodsList?.length, userId, activeServices]);

	const { t } = useTranslation();
	const { data } = useGetPartner();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const reqtype = 'shoutout';
	const starNM = useMemo(() => {
		return getShortName(
			celebrityData?.user.nick_name,
			celebrityData?.user.first_name,
		);
	}, []);

	// useEffect(() => {
	//   getRating(
	//     userId,
	//     [
	//       requestTypesKeys.shoutout,
	//       requestTypesKeys.event,
	//       requestTypesKeys.qa,
	//     ].join(','),
	//   ).then(res => {
	//     if (res.data) {
	//       setCommentInfo(res.data);
	//     }
	//   });
	// }, []);
	const isMobile = useMediaQuery('(max-width: 831px)');
	const productClick = product => {
		locStorage.removeItem('req_data');
		router.push(`/${userId}/shoutout/${product.slug}`);
	};
	return (
		<>
			<Wrapper reqDisplay>
				<HeadingH1>{t('purchase_flow.shoutout.title_plural')}</HeadingH1>
				{celebrityData?.user.talent_status === accountStatus.paused && (
					<AlertSection
						celebId={celebrityData?.user.id}
						alertText={t('common.temp_unavailable')}
						alertButton={t('common.alert_available')}
					/>
				)}

				{!celebrityData?.celebrity_details.remaining_limit && (
					<AlertSoldOut
						celbId={celebrityData?.user.id}
						type={requestTypesKeys.shoutout}
						updateToast={payload => updateToast(dispatch, {...payload, global: true})}
						rootClass="alertRoot"
						fanEmail={fanData?.user?.email}
					/>
				)}
				<Ul>
					{reqList(celebrityData?.celebrity_details.services, t).map(product => {
						return (
							<RequestCard
								key={product.type}
								data={{
									celbId: celebrityData?.user.id,
									isStar: isStar,
									type: 1,
									rType: 'Video shoutouts',
									promoDetails: celebrityData?.celebrity_details.promocode,
									discountObj: celebrityData?.celebrity_details.discount,
									title: product.title,
									desc: product.description,
									amount: celebrityData?.celebrity_details.rate,
									localDetails: {
										amount: celebrityData?.celebrity_details.local_currency_amount,
										name: celebrityData?.celebrity_details.local_currency,
										symbol: celebrityData?.celebrity_details.local_currency_symbol,
									},
									btnLabel:
                  celebrityData?.celebrity_details.remaining_limit > 0 &&
                  celebrityData?.celebrity_details.remaining_limit < 10
                  	? t('common.buy_now_left', {
                  		count: celebrityData?.celebrity_details.remaining_limit,
                  	})
                  	: t('purchase_flow.get_started'),

									productId: product.product_id,
									image: product.image,
									availability:
                  celebrityData?.user.talent_status ===
                    accountStatus.live || celebrityData?.user.talent_status === accountStatus.hidden,
								}}
								disableButton={celebrityData?.celebrity_details.remaining_limit === 0}
								onClick={() => productClick(product)}
								// onClick={() => {}}
							/>
						);
					})}
				</Ul>
				{!isEmpty(socialListData?.social_media_promotions_title) && (
					<Link href={`/${userId}/commercial`} passHref>
						<LinkText className="promo-switch">
							{t('purchase_flow.business')}
						</LinkText>
					</Link>
				)}
			</Wrapper>
			<ShoutOutVideoWrapper>
				<VideoList starData={celebrityData?.celebrity_details} isStar={false} userData={celebrityData?.user} entityData={partnerData}/>
			</ShoutOutVideoWrapper>
			<FooterCard>
				<CardWrapper>
					<CardAndButtonWrapper>
						<CardSlide
							starName={starNM}
							updateUserDetails={() => {}}
							starData={celebrityData?.celebrity_details}
							updateToast={() => {}}
							loaderAction={props.loaderAction}
							isStar={false}
							requestType={requestTypesKeys.shoutout}
						/>
						{((commentInfo?.comments &&
                commentInfo?.comments.length === 0 &&
                !isMobile) ||
                !isMobile) && (
							<ButtonWrap>
								<SharePage
									star={celebrityData?.user}
									starData={props.starData}
									buttonClass=""
								/>
								<Follow
									starData={celebrityData}
									loaderAction={() => {}}
									updateToast={() => {}}
									updateUserDetails={() => {}}
									isStar={false}
								/>
							</ButtonWrap>
						)}
					</CardAndButtonWrapper>
					{commentInfo?.comments && commentInfo?.comments.length > 0 && (
						<Review
							data={commentInfo}
							updateUserDetails={props.updateUserDetails}
							starData={{celbData: celebrityData?.celebrity_details,
								userData: celebrityData?.user,
								avatar: getAvtar(celebrityData?.user.avatar_photo)}}
							celebrityData={celebrityData}
							updateToast={props.updateToast}
							loaderAction={props.loaderAction}
							isStar={isStar}
						/>
					)}
				</CardWrapper>
			</FooterCard>
		</>
	);
}

ShoutoutPurchase.getLayout = page => (
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
export default ShoutoutPurchase;
