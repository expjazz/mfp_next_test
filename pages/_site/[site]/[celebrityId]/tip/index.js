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
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { locStorage } from 'src/utils/localStorageUtils';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { isEmpty } from 'src/utils/dataStructures';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
// import { CardWrapper, FooterCard, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/components/FunStuff/styled'
import { HeadingH1, Hr, Ul } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import RequestCard from 'components/RequestCard';
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { ButtonWrap } from 'components/PageStyles/CelebrityId/PurchaseSection/components/Review/styled';
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage';
import Follow from 'components/PageStyles/CelebrityId/PurchaseSection/components/Follow';
import FunStuffForm from 'components/PageStyles/CelebrityId/PurchaseSection/components/FunStuff/components/Details';
import Review from 'components/PageStyles/CelebrityId/PurchaseSection/components/Review';
import SeoHeader from 'components/SeoHeader';
import CancelConfirmation from 'components/PageStyles/CelebrityId/PurchaseSection/components/CancelConfirmation';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import StarShowLayoutContainer from 'components/PageStyles/CelebrityId/Layout/StarShowLayoutContainer';
import { isBrowser } from 'customHooks/domUtils';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { Wrapper, Content } from 'components/PageStyles/CelebrityId/PurchaseSection/components/Tip/styled';
// import Checkout from 'components/Checkout';
import { DetailWrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { HeadingH2, LinkText } from 'styles/TextStyled';
import Link from 'next/link';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import Login from 'components/Login&Signup';
import dynamic from 'next/dynamic';

const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
function StarTip() {
	const { t } = useTranslation();
	const reqDataString = isBrowser() ? locStorage.getItem('req_data') : null;
	const reqData = reqDataString ? reqDataString : {};
	const { data: fanData } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const { data: celebrityData } = useGetCelebrityData();
	// const [returnUrl, setReturnUrl] = useState(null);
	const [noBackLbl, setNoBack] = useState(false);
	const reqInfo = reqData;
	const { showContent, toggContent } = useContext(StarContext);
	const authSuccess = () => {};
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const returnUrl = null;
	// const changePaymentSuccess = () => {
	//   toggContent(true);
	//   setReturnUrl(reqData.returnUrl);
	//   setNoBack(reqData.noback);
	//   locStore.removeItem('req_data');
	// };

	// const paymentSuccess = optileData => {
	//   props.tipPayment(
	//     {
	//       starsona: reqInfo.bookingId || reqData.bookingId,
	//       amount: optileData.amount,
	//       promocode: '',
	//       type: 'tip',
	//       currency: props.currencyData.abbr,
	//       optile_data: { paymentGateway: 'Optile', ...optileData },
	//     },
	//     changePaymentSuccess,
	//     () => toggContent(true),
	//   );
	// };

	// const paymentFailed = optileData => {
	//   toggContent(true);
	//   props.updateToast({
	//     value: true,
	//     message:
	//       optileData && optileData.interactionReason === 'NETWORK_FAILURE'
	//         ? t('common.optile_network_failure')
	//         : t('common.optile_default_error'),
	//     variant: 'error',
	//   });
	// };

	// useOptileParser(paymentSuccess, paymentFailed, props.history.location.search);

	// if (!showContent) {
	//   return null;
	// }

	return (
		<>
			<Wrapper className="pay-wrp" reqDisplay>
				<Content>
					{returnUrl && (
						<React.Fragment>
							<div className="success-wrap">
								<span className="success-title">{t('my_videos.tip_sent')}</span>
							</div>
							{!noBackLbl && (
								<LinkText className="back-link">
									<Link href={returnUrl}>
										<a>
                      Back to request
										</a>
									</Link>
								</LinkText>
							)}
						</React.Fragment>
					)}
					{!returnUrl && isLoggedIn && !isEmpty(fanData) && (
						<React.Fragment>
							<HeadingH2 className="payment-heading">
								{t('common.payment_details_Cap')}
							</HeadingH2>
							<DetailWrapper>
								<li className="detail bold">
									<span className="detail-head">{t('common.total')}</span>
									<span className="detail-value">
										{getLocalSymbol()}
										{getLocalAmount(reqInfo.amount || reqData.amount).toFixed(
											2,
										)}
									</span>
								</li>
							</DetailWrapper>
							<Checkout
								fanData={fanData}
								noPromoCode
								starData={{
									userData: celebrityData?.user,
									celbData: {
										...celebrityData?.celebrity_details,
										rate: getLocalAmount(reqInfo.amount),
										bookingPrice: getLocalAmount(
											reqInfo.amount,
										),
									},
								}}
								paymentInfo={t('purchase_flow.card_note')}
								// returnUrl={`${window.location.origin}${window.location.pathname}`}
								bookingId={reqInfo.bookingId || reqData.bookingId}
								zeroPayment={() => {}}
								type="tip"
							/>
						</React.Fragment>
					)}
					{!isLoggedIn && (
						<Login
							noSocial
							noPassword
							default="signup"
							authSuccess={authSuccess}
						/>
					)}
				</Content>
			</Wrapper>

			<Hr mob />
		</>
	);
}

StarTip.getLayout = page => (
	<StarShowLayoutContainer pageProps={page.props} >
		{page}
	</StarShowLayoutContainer>
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
		// // await queryClient.prefetchQuery('config', () => getConfig(entityId, entityToken))

		// await queryClient.prefetchQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0))
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

export default StarTip;
