import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getConfig, getEntity, getFeaturedVideos, getProfessions } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration';
import { getRating } from 'src/services/myfanpark/celebActions';
import axios from 'axios';
import PurchaseStarLayout from 'components/PageStyles/CelebrityId/Layout/Purchase';
import { localeEntity } from 'src/services/entities/localeEntity';
import { useMediaQuery } from '@material-ui/core';
import { getCountryList, getStarCountries } from 'src/services/userManagement/starDetails';
import { useTranslation } from 'next-i18next';
import { locStorage } from 'src/utils/localStorageUtils';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { isEmpty } from 'src/utils/dataStructures';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { CardWrapper, FooterCard, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/components/LiveCall/styled';
import { ButtonWrap, HeadingH1, Hr, Ul } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import RequestCard from 'components/RequestCard';
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage';
import Follow from 'components/PageStyles/CelebrityId/PurchaseSection/components/Follow';
import LiveCallForm from 'components/PageStyles/CelebrityId/PurchaseSection/components/LiveCall/Details';
import ProductForm from 'components/PageStyles/CelebrityId/PurchaseSection/components/Merch/components/Details';
import Review from 'components/PageStyles/CelebrityId/PurchaseSection/components/Review';
import SeoHeader from 'components/SeoHeader';
import CancelConfirmation from 'components/PageStyles/CelebrityId/PurchaseSection/components/CancelConfirmation';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import AlertSection from 'components/AlertSection';
import { correctQueryTitle } from 'src/utils/dataformatter';
import { generateProductId, isVodacom } from 'customHooks/domUtils';
function PurchaseMerch(props) {
	const { t } = useTranslation();
	const [state, dispatch] = useGeneral();
	const router = useRouter();
	const { celebrityId } = router.query;
	const { entityId, entityToken } = props.partnerData;
	const { data: fanData, isStar } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const { data } = useGetPartner();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const userId = celebrityId.toLowerCase();
	const getTitle = () => router.query?.merchId && correctQueryTitle(router.query.merchId) !== 'index' ? correctQueryTitle(router.query.merchId) : null;

	const title = getTitle();
	const { data: socialListData, isLoading: celebritySocialLoading, error: celebritySocialError } = useQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
	const { data: celebrityProducts } = useQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }));
	const productsList = celebrityProducts?.products;

	const { data: commentInfo } = useQuery(['celebrityFanRating', userId], () => getRating(celebrityId,
		[
			requestTypesKeys.shoutout,
			requestTypesKeys.event,
			requestTypesKeys.qa,
		].join(','),
	));

	const isMobile = useMediaQuery('(max-width: 831px)');
	const [selected, setSelected] = useState(() => {
		if (title) {
			const tempSel = productsList?.find(prod => prod.slug === title);
			return tempSel;
		}
		return {};
	});

	useEffect(() => {
		if (title && title !== selected.slug) {
			const tempSel = productsList?.find(prod => prod.slug === title);
			setSelected(tempSel);
		} else if (!title && !isEmpty(selected)) {
			setSelected({});
		}
	}, [title]);
	const [success, setSuccess] = useState(false);
	const [confirmCancel, setConfirmCancel] = useState(false);
	const productClick = product => () => {
		locStorage.removeItem('req_data');
		router.push(`/${userId}/merch/${product.slug}`, undefined, { shallow: true });
		setSelected(product);
	};

	const backHandler = () => {
		locStorage.removeItem('req_data');
		setSelected({});
		router.back();
		setConfirmCancel(false);
	};

	const webBackHandler = () => {
		setConfirmCancel(true);
	};

	const starNM = useMemo(() => {
		return getShortName(
			celebrityData?.user.nick_name,
			celebrityData?.user.first_name,
		);
	}, []);
	const getProductsMeta = () => {
		return productsList?.map(fun => `${starNM} ${fun.title}`).join(', ');
	};
	useEffect(() => {
		if (title) {
			setConfirmCancel(false);
		}
	}, [title]);
	useEffect(() => {
		if (!isEmpty(selected)) {
			if (window.dataLayer) {
				window.dataLayer.push({
					event: 'product-page-view',
					product_type: 'merch',
					product_id: generateProductId('merch', {
						star: celebrityData?.user,
						title: selected.title,
						id: selected.numeric_id,
					}),
				});
			}
		}
	}, [selected]);

	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'product-page-view',
				product_type: 'merch',
			});
		}
	}, []);
	if (!isEmpty(selected) && title) {
		return (
			<>
				<Wrapper className="pay-wrp" isVodacom={isVodacom()}>
					<ProductForm
						product={selected}
						usStates={props.configData.us_states || []}
						entityData={partnerData}
						countryList={props.countries}
						fanData={{...fanData, avatar: getAvtar(fanData?.user.avatar_photo)}}
						starNM={starNM}
						starData={{celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						loaderAction={payload => generalLoader(dispatch, payload)}
						updateToast={payload => updateToast(dispatch, payload)}
						createCharge={props.createCharge}
						history={props.history}
						onSuccess={() => {}}
						backHandler={webBackHandler}
						isLoggedIn={isLoggedIn}
						title={title}
						currencyData={currencyData}
					/>
				</Wrapper>
				<SeoHeader
					title={t('purchase_flow.merch.meta_title', {
						starNM,
						title: selected.title,
					})}
					shareImage={
						selected.product_image ? selected.product_image
							: getAvtar(celebrityData?.user.avatar_photo)
					}
					description={t('purchase_flow.merch.meta_desc', {
						starNM
					})}
					keywords={t('purchase_flow.merch.meta_keywords', {
						starNM,
						siteName: partnerData.parter_name,
						seoProducts: getProductsMeta()
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

	return (
		<>
			<Wrapper reqDisplay>
				<HeadingH1>PERSONALIZED MERCH</HeadingH1>
				{celebrityData?.user.talent_status === accountStatus.paused && (
					<AlertSection
						celebId={celebrityData?.user.id}
						alertText={t('common.temp_unavailable')}
						alertButton={t('common.alert_available')}
					/>
				)}
				<Ul>
					<SeoHeader
						title={t('purchase_flow.merch.meta_title2', {
							talent: partnerData.purchaser_plural_name,
						})}
						shareImage={getAvtar(celebrityData?.user.avatar_photo)}
						description={t('purchase_flow.merch.meta_desc1', {
							starNM
						})}
						keywords={t('purchase_flow.merch.meta_keywords', {
							starNM,
							siteName: partnerData.parter_name,
							seoProducts: getProductsMeta()
						})}

					/>
					{productsList?.map(product => {
						return (
							<RequestCard
								key={product.product_id}
								soldOut={product.quantity <= product.sold + product.in_progress}
								data={{
									celbId: celebrityData?.user.id,
									isStar,
									type: requestTypesKeys.digitalGoods,
									rType: 'Personalized Merch',
									promoDetails: celebrityData?.celebrity_details.promocode,
									discountObj: celebrityData?.celebrity_details.discount,
									title: product.title,
									desc: product.description,
									amount: product.price,
									localDetails: {
										amount: product.local_currency_amount,
										name: product.local_currency,
										symbol: product.local_currency_symbol,
									},
									btnLabel:
                    product.quantity - (product.sold + product.in_progress) >
                      0 &&
                    product.quantity - (product.sold + product.in_progress) < 10
                    	? t('common.buy_now_left', {
                    		count:
                            product.quantity -
                            (product.sold + product.in_progress),
                    	})
                    	: t('common.buy_now'),

									productId: product.product_id,
									image:
                    product.product_image &&
                    product.product_image.length > 0 &&
                    product.product_image[0],
									fanEmail: null,
									availability:
                    celebrityData?.user.talent_status ===
                    accountStatus.live || celebrityData?.user.talent_status === accountStatus.hidden,
								}}
								onClick={productClick(product)}
								updateToast={props.updateToast}
							/>
						);
					})}
				</Ul>
			</Wrapper>
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
						isStar={false}
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
							isStar={false}
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
							isStar={false}
						/>
					</ButtonWrap>
				)}
			</FooterCard>
		</>
	);
}

PurchaseMerch.getLayout = page => (
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
		await queryClient.prefetchQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }));

		try {
			await queryClient.fetchQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }));
		} catch(e) {
			return {
				notFound: true
			};
		}

		const countries = await getCountryList();
		const config = await getConfig(entityId, entityToken);

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				partnerData: { entityId, entityToken },
				countries: countries,
				configData: config,
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

export default PurchaseMerch;
