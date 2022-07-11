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
import { CardWrapper, FooterCard, InteractionsWrapper, SocialListWrap, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/components/Social/styled';
import { ButtonWrap, HeadingH1, Hr } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import Interaction from 'components/PageStyles/CelebrityId/PurchaseSection/components/Social/Interaction';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import Link from 'next/link';
import { LinkText } from 'styles/TextStyled';
import InteractionList from 'components/PageStyles/CelebrityId/PurchaseSection/components/Social/components/InteractionList';
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide';
import Review from 'components/PageStyles/CelebrityId/PurchaseSection/components/Review';
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage';
import Follow from 'components/PageStyles/CelebrityId/PurchaseSection/components/Follow';
import SocialDetails from 'components/PageStyles/CelebrityId/PurchaseSection/components/Social/components/Details';
import SeoHeader from 'components/SeoHeader';
import CancelConfirmation from 'components/PageStyles/CelebrityId/PurchaseSection/components/CancelConfirmation';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import AlertSection from 'components/AlertSection';
import { correctQueryTitle } from 'src/utils/dataformatter';
import { generateProductId, isVodacom } from 'customHooks/domUtils';

function PurchaseSocial(props) {
	const { t } = useTranslation();
	const { entityId, entityToken } = props.partnerData;
	const [state, dispatch] = useGeneral();
	const { data } = useGetPartner();
	const { data: fanData, isStar } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const router = useRouter();
	const { celebrityId } = router.query;
	const userId = celebrityId.toLowerCase();
	const getTitle = () => router.query?.socialId && correctQueryTitle(router.query.socialId) !== 'index' ? correctQueryTitle(router.query.socialId) : null;

	const title = getTitle();
	const { data: socialListData, isLoading: celebritySocialLoading, error: celebritySocialError } = useQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: commentInfo } = useQuery(['celebrityFanRating', userId], () => getRating(celebrityId,
		[
			requestTypesKeys.shoutout,
			requestTypesKeys.event,
			requestTypesKeys.qa,
		].join(','),
	));

	const isMobile = useMediaQuery('(max-width: 831px)');
	const [selected, setSelected] = useState(() => {
		if (router.query?.socialId) {
			let temp = {};
			socialListData?.social_media_shout_out_title.forEach(socialItem => {
				const filtered = socialItem.details.find(prod => prod.slug === correctQueryTitle(router.query.socialId));
				if (filtered) {
					temp = filtered;
					return filtered;
				}
			});
			return temp;
		}
		return {};
	});
	const [success, setSuccess] = useState(false);
	const [confirmCancel, setConfirmCancel] = useState(false);
	const socialClick = social => () => {
		locStorage.removeItem('req_data');
		setSelected(social);
		router.push(`/${userId}/social/${social.slug}`, undefined, { shalow: true });
	};
	const socialListClick = item => {
		const filtered = socialListData.social_media_shout_out_title.find(
			social => social.social_media === item.social_media_title.social_media,
		);
		if (filtered) {
			const sel = filtered.details.find(
				value => value.slug === item.social_media_title.slug,
			);
			if (sel) {
				socialClick(sel)();
			}
		}
	};

	const backHandler = () => {
		router.back();
		// setSelected({});
		// setConfirmCancel(false);
		locStorage.removeItem('req_data');
	};

	const webBackHandler = () => {
		setConfirmCancel(true);
	};

	const onSuccess = (request, amount, promoCode) => {
		alert('to');
	};

	const sharePage = () => {};

	const updateSelected = () => {
		if (!isEmpty(props.socialListData.social_media_shout_out_title)) {
			props.socialListData.social_media_shout_out_title.forEach(
				socialItem => {
					if (isEmpty(selected)) {
						const promo = socialItem.details.find(
							prod => prod.slug === props.title,
						);
						if (!isEmpty(promo)) {
							setSelected(promo);
						}
					}
				},
			);
		}

	};
	useEffect(() => {
		if (title && title !== selected.slug) {
			socialListData?.social_media_shout_out_title.forEach(socialItem => {
				const filtered = socialItem.details.find(prod => prod.slug === correctQueryTitle(router.query.socialId));
				if (filtered) {
					temp = filtered;
					return filtered;
				}
			});
		} else if (!title && !isEmpty(selected)) {
			setSelected({});
		}
	}, [title]);

	useEffect(() => {
		if (!isEmpty(selected)) {
			if (window.dataLayer) {
				window.dataLayer.push({
					event: 'product-page-view',
					product_type: 'social',
					product_id: generateProductId('social', {
						star: celebrityData?.user,
						social_media: selected.social_media,
						title: selected.title,
					}),
				});
			}
		}
	}, [selected]);

	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'product-page-view',
				product_type: 'social',
			});
		}
	}, []);

	// useEffect(() => {
	//   updateSelected();
	// }, [isEmpty(props.socialListData.social_media_shout_out_title)]);

	// useEffect(() => {
	//   updateSelected();
	//   setSuccess(false);
	// }, [props.title]);

	const starNM = useMemo(() => {
		return getShortName(
			celebrityData?.user.nick_name,
			celebrityData?.user.first_name,
		);
	}, []);

	useEffect(() => {
		if (title) {
			setConfirmCancel(false);
		}
	}, [title]);

	if (!isEmpty(selected) && title) {
		return (
			<>
				<Wrapper className="pay-wrp" isVodacom={isVodacom()}>
					<SocialDetails
						selected={selected}
						fanData={{...fanData, avatar: getAvtar(fanData?.user.avatar_photo)}}
						starData={{celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						loaderAction={payload => generalLoader(dispatch, payload)}
						createCharge={props.createCharge}
						updateToast={payload => updateToast(dispatch, payload)}
						history={props.history}
						starNM={starNM}
						onSuccess={onSuccess}
						backHandler={webBackHandler}
						isLoggedIn={isLoggedIn}
						title={title}
						currencyData={currencyData}
					/>
				</Wrapper>
				<SeoHeader
					title={t('purchase_flow.meta_title', {
						starNM,
						title: selected.title,
						socialMedia: selected.social_media,
					})}
					shareImage={
						selected.image
							? selected.image
							: getAvtar(celebrityData?.user.avatar_photo)
					}
					description={t('purchase_flow.meta_desc', {
						starNM,
						socialMedia: selected.social_media,
					})}
					keywords={t('purchase_flow.meta_keywords', {
						starNM,
						siteName: partnerData.parter_name,
					})}

				/>
				<Hr />
				{confirmCancel && title && (
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
	return (
		<>
			<Wrapper reqDisplay>
				<HeadingH1 className="main-head">
					{t('purchase_flow.social_media_interactions')}
				</HeadingH1>
				{celebrityData?.user.talent_status === accountStatus.paused && (
					<AlertSection
						celebId={celebrityData?.user.id}
						alertText={t('common.temp_unavailable')}
						alertButton={t('common.alert_available')}
					/>
				)}
				{!isEmpty(socialListData.social_media_shout_out_title) && (
					<Interaction
						interaction={socialListData.social_media_shout_out_title}
						socialClick={socialClick}
						starData={{celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						fanData={{avatar: ''}}
						updateToast={() => {}}
					/>
				)}
				{!isEmpty(socialListData.social_media_promotions_title) && (
					<Link href={`/${userId}/commercial`} passHref>
						<a>
							<LinkText className="promo-switch">
								{t('purchase_flow.business')}
							</LinkText>
						</a>
					</Link>
				)}
			</Wrapper>
			<SeoHeader
				title={t('purchase_flow.meta_title', {
					starNM,
					title: selected.title,
					socialMedia: selected.social_media,
				})}
				shareImage={
					selected.image
						? selected.image
						: getAvtar(celebrityData?.user.avatar_photo)
				}
				description={t('purchase_flow.meta_desc', {
					starNM,
					socialMedia: selected.social_media,
				})}
				keywords={t('purchase_flow.meta_keywords', {
					starNM,
					siteName: partnerData.parter_name,
				})}

			/>
			<InteractionsWrapper>
				<InteractionList
					starData={{celbData: celebrityData?.celebrity_details,
						userData: celebrityData?.user,
						avatar: getAvtar(celebrityData?.user.avatar_photo)
					}}
					socialClick={socialListClick}
					isStar={isStar}
					updateToast={() => {}}
				/>
			</InteractionsWrapper>
			<FooterCard>
				<CardWrapper>
					<CardSlide
						starName={starNM}
						updateUserDetails={() => {}}
						starData={{celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						updateToast={props.updateToast}
						loaderAction={props.loaderAction}
						isStar={isStar}
						requestType={requestTypesKeys.socialShoutout}
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
							isStar={isStar}
						/>
					)}
				</CardWrapper>
				{((commentInfo?.comments &&
          commentInfo?.comments.length === 0 &&
          isMobile) ||
          !isMobile) && (
					<ButtonWrap>
						<SharePage
							star={celebrityData?.user}
							starData={{celbData: celebrityData?.celebrity_details,
								userData: celebrityData?.user,
								avatar: getAvtar(celebrityData?.user.avatar_photo)}}
						/>
						<Follow
							starData={celebrityData}
							loaderAction={props.loaderAction}
							updateToast={props.updateToast}
							updateUserDetails={props.updateUserDetails}
							isStar={isStar}
						/>
					</ButtonWrap>
				)}
			</FooterCard>
		</>
	);
}

PurchaseSocial.getLayout = page => (
	<PurchaseStarLayout pageProps={page.props} >
		{page}
	</PurchaseStarLayout>
);

export async function getStaticPaths() {
	return {
		paths: [
			// { params:  { celebrityId: 'primrose', socialId: [] }, locale: 'en-US' },
			// { params:  { celebrityId: 'primrose', socialId: []  }, locale: 'en-ZA' },

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
		await queryClient.prefetchQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));

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

export default PurchaseSocial;
