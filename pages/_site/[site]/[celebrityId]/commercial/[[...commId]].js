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
import { handleCommercialOfferings } from 'src/services/myfanpark/productActions';
import { CardWrapper, CommercialWrp, FooterCard, Layout } from 'components/PageStyles/CelebrityId/PurchaseSection/components/Commercial/styled';
import { HeadingH1, Hr } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/components/Merch/styled';
// import CommercialShoutout from 'components/PageStyles/CelebrityId/PurchaseSection/components/Commercial/CommercialShoutout/components/CommercialShoutout'
import Promotion from 'components/PageStyles/CelebrityId/PurchaseSection/components/Commercial/Social/Promotion';
import SocialDetails from 'components/PageStyles/CelebrityId/PurchaseSection/components/Commercial/Social/components/Details';
import CommercialShoutout from 'components/PageStyles/CelebrityId/PurchaseSection/components/Commercial/CommercialShoutout/components/CommercialShoutout';
import CommercialDetails from 'components/PageStyles/CelebrityId/PurchaseSection/components/Commercial/CommercialShoutout/components/Details';
import Review from 'components/PageStyles/CelebrityId/PurchaseSection/components/Review';
import SeoHeader from 'components/SeoHeader';
import CancelConfirmation from 'components/PageStyles/CelebrityId/PurchaseSection/components/CancelConfirmation';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import AlertSection from 'components/AlertSection';
import { correctQueryTitle } from 'src/utils/dataformatter';
import { isVodacom } from 'customHooks/domUtils';

function PurchaseCommercial(props) {
	const { t } = useTranslation();
	const { entityId, entityToken } = props.partnerData;
	const [state, dispatch] = useGeneral();
	const  { data: fanData } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const router = useRouter();
	const { celebrityId } = router.query;
	const { data } = useGetPartner();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const userId = celebrityId.toLowerCase();
	const getTitle = () => router.query?.commId && correctQueryTitle(router.query.commId) !== 'index' ? correctQueryTitle(router.query.commId) : null;
	const title = getTitle();
	const {data: commercialListData} = useQuery(['celebrityCommercial', celebrityId], () => handleCommercialOfferings('', { id: celebrityId }));
	const commercialList = commercialListData.commercial_offering;
	const { data: socialListData, isLoading: celebritySocialLoading, error: celebritySocialError } = useQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: commentInfo } = useQuery(['celebrityFanRating', userId], () => getRating(celebrityId,
		[
			requestTypesKeys.shoutout,
			requestTypesKeys.event,
			requestTypesKeys.qa,
		].join(','),
	));
	const [isCommercial, setIsCommercial] = useState(false);
	const [isSocial, setIsSocial] = useState(false);
	const [selected, setSelected] = useState(() => {
		let result = {};
		if (!isEmpty(commercialList)) {
			const commercial = commercialList.find(
				prod => prod.slug === title
			);
			result = commercial;
			if (!isEmpty(commercial)) {

				setIsCommercial(true);
				return commercial;
			}
		}
		if (!isEmpty(socialListData.social_media_promotions_title)) {
			let social = {};
			socialListData.social_media_promotions_title.forEach(
				socialItem => {
					social = socialItem.details.find(
						prod => prod.slug === title
					);
					if (!isEmpty(social)) {
						setIsSocial(true);
						result = social;
						return social;
					}
				}
			);
		}
		return result;
	});

	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'product-page-view',
				product_type: 'commercial',
			});
		}
	}, []);

	useEffect(() => {
		if (title && title !== selected?.slug) {
			if (!isEmpty(commercialList)) {
				const commercial = commercialList.find(
					prod => prod.slug === title
				);
				if (!isEmpty(commercial)) {
					setSelected(commercial);
					setIsCommercial(true);
				}
			}
			if (!isEmpty(socialListData.social_media_promotions_title)) {
				let social = {};
				socialListData.social_media_promotions_title.forEach(
					socialItem => {
						social = socialItem.details.find(
							prod => prod.slug === title
						);
						if (!isEmpty(social)) {
							setSelected(social);
							setIsCommercial(false);
							setIsSocial(true);
						}
					}
				);
			}
		} else if (!title && !isEmpty(selected)) {
			setSelected({});
		}
	}, [title]);
	const [success, setSuccess] = useState(false);
	const [confirmCancel, setConfirmCancel] = useState(false);
	const [returnUrl, setReturnUrl] = useState('');
	const socialClick = social => () => {
		locStorage.removeItem('req_data');
		setSelected(social);
		setIsCommercial(false);
		setIsSocial(true);
		router.push(`/${userId}/commercial/${social.slug}`, undefined, { shallow: true, scroll: true });
	};

	const commercialClick = commercial => {
		locStorage.removeItem('req_data');
		setSelected(commercial);
		setIsCommercial(true);
		router.push(`/${userId}/commercial/${commercial.slug}`, undefined, { shallow: true, scroll: true });
	};

	const backHandler = () => {
		setSelected({});
		// // setConfirmCancel(false);
		router.back();
	};

	const webBackHandler = () => {
		setConfirmCancel(true);
	};

	useEffect(() => {
		if (title) {
			setConfirmCancel(false);
		}
	}, [title]);

	const sharePage = () => {};

	const starNM = useMemo(() => {
		return getShortName(
			celebrityData?.user.nick_name,
			celebrityData?.user.first_name,
		);
	}, []);
	if (!isEmpty(selected) && isCommercial && title) {
		return (
			<>
				<Wrapper className="pay-wrp" isVodacom={isVodacom()}>
					<CommercialDetails
						selected={selected}
						fanData={{...fanData, avatar: getAvtar(fanData?.user.avatar_photo)}}
						starData={{
							celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						loaderAction={payload => generalLoader(dispatch, payload)}
						updateToast={payload => updateToast(dispatch, payload)}
						history={props.history}
						starNM={starNM}
						isLoggedIn={isLoggedIn}
						onSuccess={() => {router.push(`/${celebrityId}/thankyou?commercial=true`);}}
						backHandler={webBackHandler}
						title={title}
						currencyData={currencyData}
						createCharge={props.createCharge}
					/>
				</Wrapper>
				<SeoHeader
					title={t('purchase_flow.commercial.meta_title', {
						starNM,
						title: selected.title,
						socialMedia: selected.social_media,
					})}
					shareImage={
						selected.sample_image ? selected.sample_image
							: getAvtar(celebrityData?.user.avatar_photo)
					}
					description={t('purchase_flow.commercial.meta_desc', {
						starNM,
						socialMedia: selected.social_media,
					})}
					keywords={t('purchase_flow.commercial.meta_keywords', {
						starNM,
						siteName: partnerData.parter_name
					})}
				/>
				<Hr />
				{confirmCancel && (
					<CancelConfirmation
						open={confirmCancel}
						onClose={setConfirmCancel}
						goBack={backHandler}
						starNM={starNM}
					/>
				)}
			</>
		);
	}

	if (!isEmpty(selected) && isSocial && title) {
		return (
			<React.Fragment>
				<Wrapper className="pay-wrp">
					<SocialDetails
						selected={selected}
						fanData={{...fanData, avatar: getAvtar(fanData?.user.avatar_photo)}}
						starData={{
							celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						loaderAction={payload => generalLoader(dispatch, payload)}
						updateToast={payload => updateToast(dispatch, payload)}
						createCharge={props.createCharge}
						history={props.history}
						starNM={starNM}
						onSuccess={() => {}}
						backHandler={webBackHandler}
						isLoggedIn={isLoggedIn}
						title={title}
						currencyData={currencyData}
					/>
				</Wrapper>
				<SeoHeader
					title={t('purchase_flow.commercial.meta_title', {
						starNM,
						title: selected.title,
						socialMedia: selected.social_media,
					})}
					shareImage={
						selected.sample_image ? selected.sample_image
							: getAvtar(celebrityData?.user.avatar_photo)
					}
					description={t('purchase_flow.commercial.meta_desc', {
						starNM,
						socialMedia: selected.social_media,
					})}
					keywords={t('purchase_flow.commercial.meta_keywords', {
						starNM,
						siteName: partnerData.parter_name
					})}
				/>
				<Hr />
				{/* {confirmCancel && (
          <CancelConfirmation
            open={confirmCancel}
            onClose={setConfirmCancel}
            goBack={backHandler}
            starNM={starNM}
          />
        )} */}
			</React.Fragment>
		);
	}


	return (
		<>
			<Layout reqDisplay>
				<HeadingH1>{t('purchase_flow.commercial.heading')}</HeadingH1>
				{celebrityData?.user.talent_status === accountStatus.paused && (
					<AlertSection
						celebId={celebrityData?.user.id}
						alertText={t('common.temp_unavailable')}
						alertButton={t('common.alert_available')}
					/>
				)}
				<FooterCard>
					<CardWrapper>
						<CardSlide
							starName={starNM}
							updateUserDetails={props.updateUserDetails}
							starData={{celbData: celebrityData?.celebrity_details,
								userData: celebrityData?.user,
								avatar: getAvtar(celebrityData?.user.avatar_photo)
							}}
							updateToast={props.updateToast}
							loaderAction={props.loaderAction}
							isStar={false}
							requestType={requestTypesKeys.commercial}
						/>
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
								isStar={false}
							/>
						)}
					</CardWrapper>

				</FooterCard>
				<Wrapper>
					{celebrityData?.celebrity_details &&
            celebrityData?.celebrity_details.services &&
            celebrityData?.celebrity_details.services.commercial && (
						<CommercialWrp>
							{!isEmpty(commercialList) && (
								<CommercialShoutout
									commercialList={commercialList}
									commercialClick={commercialClick}
									starData={{
										celbData: celebrityData?.celebrity_details,
										userData: celebrityData?.user,
										avatar: getAvtar(celebrityData?.user.avatar_photo)
									}}
									fanData={{avatar: ''}}
									updateToast={props.updateToast}
								/>
							)}
						</CommercialWrp>
					)}

					{!isEmpty(socialListData.social_media_promotions_title) && (
						<Promotion
							promotion={socialListData.social_media_promotions_title}
							socialClick={socialClick}
							starData={{celbData: celebrityData?.celebrity_details,
								userData: celebrityData?.user,
								avatar: getAvtar(celebrityData?.user.avatar_photo)
							}}
							fanData={{avatar: ''}}
							updateToast={props.updateToast}
						/>
					)}
				</Wrapper>
			</Layout>

		</>
	);
}

PurchaseCommercial.getLayout = page => (
	<PurchaseStarLayout pageProps={page.props} >
		{page}
	</PurchaseStarLayout>
);

export async function getStaticPaths() {
	return {
		paths: [],
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

		// await queryClient.prefetchQuery(['featuredVideos', celebrityId], () => getFeaturedVideos({ celebrityId, limit: 20, offset: 0 }))

		// await queryClient.prefetchQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }))

		await queryClient.prefetchQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));

		// await queryClient.prefetchQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0))

		// await queryClient.prefetchQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }))
		// await queryClient.prefetchQuery(['celebrityTopProducts', celebrityId], () => getCelebrityTopProducts({ celebrityId }))

		// await queryClient.prefetchQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0))
		await queryClient.prefetchQuery(['celebrityCommercial', celebrityId], () => handleCommercialOfferings('', { id: celebrityId }));
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

export default PurchaseCommercial;
