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
import { CardWrapper, FooterCard, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/components/FunStuff/styled';
import { ButtonWrap, HeadingH1, Hr, Ul } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { accountStatus } from 'src/constants/stars/accountStatus';
import RequestCard from 'components/RequestCard';
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage';
import Follow from 'components/PageStyles/CelebrityId/PurchaseSection/components/Follow';
import FunStuffForm from 'components/PageStyles/CelebrityId/PurchaseSection/components/FunStuff/components/Details';
import Review from 'components/PageStyles/CelebrityId/PurchaseSection/components/Review';
import SeoHeader from 'components/SeoHeader';
import CancelConfirmation from 'components/PageStyles/CelebrityId/PurchaseSection/components/CancelConfirmation';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import AlertSection from 'components/AlertSection';
import { correctQueryTitle } from 'src/utils/dataformatter';
import { generateProductId, isVodacom } from 'customHooks/domUtils';

function PurchaseFunStuff(props) {
	const { t } = useTranslation();
	const [state, dispatch] = useGeneral();
	const router = useRouter();
	const { celebrityId } = router.query;
	const { data: fanData, isStar } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const { entityId, entityToken } = props.partnerData;

	const { data } = useGetPartner();
	const { partnerData, currencyData: apiCurrency, languageData  } = data;
	const currencyData = state?.currencyData || apiCurrency;
	const userId = celebrityId.toLowerCase();
	const getTitle = () => router.query?.funId && correctQueryTitle(router.query.funId) !== 'index' ? correctQueryTitle(router.query.funId) : null;
	const [title, setTitle] = useState(getTitle());
	useEffect(() => {
		const tempTitle = getTitle();
		if (tempTitle !== title) {
			setTitle(tempTitle);
		}
	}, [router.query]);
	const { data: socialListData, isLoading: celebritySocialLoading, error: celebritySocialError } = useQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }));
	const { data: celebrityData, isLoading: celebrityDataLoading, error: celebrityError } = useGetCelebrityData();
	const { data: celebrityFunStuffData, isLoading: celebrityFunStuffLoading, error: celebrityFunStuffError } = useQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));
	const funList = useMemo(() => {
		return celebrityFunStuffData.fun_stuff.filter(
			fun => fun.delivery_method !== deliveryMethods.videoCalls,
		);
	}, [celebrityFunStuffData.length]);

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
			const tempSel = funList?.find(funStuff => funStuff.slug === title);
			return tempSel;
		}
		return {};
	});
	const [success, setSuccess] = useState(false);
	const [confirmCancel, setConfirmCancel] = useState(false);
	const productClick = funStuff => () => {
		locStorage.removeItem('req_data');
		setSelected(funStuff);
		router.push(`/${userId}/fun/${funStuff.slug}`, undefined, { shallow: true });
	};

	useEffect(() => {
		if (title && title !== selected?.slug) {
			const tempSel = funList?.find(funStuff => funStuff.slug === title);
			setSelected(tempSel);
		} else if (!title && !isEmpty(selected)) {
			setSelected({});
		}
	}, [title, router.query]);

	const backHandler = () => {
		setSelected({});
		setConfirmCancel(false);
		locStorage.removeItem('req_data');
		router.back();
	};
	const webBackHandler = () => {
		setConfirmCancel(true);
	};

	const onSuccess = (request, amount, promoCode) => {
		alert('to do');
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
	const getProductsMeta = () => {
		return funList.map(fun => `${starNM} ${fun.title}`).join(', ');
	};
	useEffect(() => {
		if (!isEmpty(selected)) {
			if (window.dataLayer) {
				window.dataLayer.push({
					event: 'product-page-view',
					product_type: 'funstuff',
					product_id:  generateProductId('funstuff', {
						star: celebrityData?.user,
						title: selected.title,
						id: selected.numeric_id,

					})
				});
			}
		}
	}, [selected]);

	useEffect(() => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'product-page-view',
				product_type: 'funstuff',
			});
		}
	}, []);
	if (!isEmpty(selected) && title) {
		return (
			<React.Fragment>
				<Wrapper isVodacom={isVodacom()} className="pay-wrp">
					<FunStuffForm
						funStuff={selected}
						fanData={{...fanData, avatar: getAvtar(fanData?.user.avatar_photo)}}
						starData={{celbData: celebrityData?.celebrity_details,
							userData: celebrityData?.user,
							avatar: getAvtar(celebrityData?.user.avatar_photo)
						}}
						loaderAction={payload => generalLoader(dispatch, payload)}
						updateToast={payload => updateToast(dispatch, payload)}
						createCharge={props.createCharge}
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
					title={t('purchase_flow.fun_stuff.meta_title', {
						starNM,
						title: selected.title,
					})}
					shareImage={
						selected.sample_image ? selected.sample_image
							: getAvtar(celebrityData?.user.avatar_photo)
					}
					description={t('purchase_flow.fun_stuff.meta_desc', {
						starNM
					})}
					keywords={t('purchase_flow.fun_stuff.meta_keywords', {
						starNM,
						siteName: partnerData.parter_name,
						seoProducts: getProductsMeta()
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
			</React.Fragment>
		);
	}


	return (
		<>
			<Wrapper reqDisplay>
				<HeadingH1>{t('common.fun_experiences')}</HeadingH1>
				<SeoHeader
					title={t('purchase_flow.fun_stuff.meta_title1', {
						talent: partnerData.talent_plural_name,
					})}
					shareImage={
						selected?.sample_image ? selected.sample_image
							: getAvtar(celebrityData?.user.avatar_photo)
					}
					description={t('purchase_flow.fun_stuff.meta_title2', {
						starNM
					})}
					keywords={t('purchase_flow.fun_stuff.meta_keywords', {
						starNM,
						siteName: partnerData.parter_name,
						seoProducts: getProductsMeta()
					})}

				/>
				{celebrityData?.user.talent_status === accountStatus.paused && (
					<AlertSection
						celebId={celebrityData?.user.id}
						alertText={t('common.temp_unavailable')}
						alertButton={t('common.alert_available')}
					/>
				)}
				<Ul>
					{funList.map(fun => {
						return (
							<RequestCard
								key={fun.fun_stuff_id}
								soldOut={fun.quantity <= fun.sold + fun.in_progress}
								data={{
									celbId: celebrityData?.user.id,
									isStar,
									type: requestTypesKeys.digitalGoods,
									rType: 'Fun stuff service',
									promoDetails: celebrityData?.celebrity_details.promocode,
									discountObj: celebrityData?.celebrity_details.discount,
									title: fun.title,
									desc: fun.description,
									amount: fun.price,
									localDetails: {
										amount: fun.local_currency_amount,
										name: fun.local_currency,
										symbol: fun.local_currency_symbol,
									},
									btnLabel:
                    fun.quantity - (fun.sold + fun.in_progress) > 0 &&
                    fun.quantity - (fun.sold + fun.in_progress) < 10
                    	? t('common.buy_now_left', {
                    		count: fun.quantity - (fun.sold + fun.in_progress),
                    	})
                    	: t('purchase_flow.get_started'),
									productId: fun.fun_stuff_id,
									image: fun.sample_image || fun.sample_image_original,
									fanEmail: null,
									availability:
                    celebrityData?.user.talent_status ===
                    accountStatus.live || celebrityData?.user.talent_status === accountStatus.hidden,
								}}
								onClick={productClick(fun)}
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

PurchaseFunStuff.getLayout = page => (
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
	const { params, locale } = props;
	// const celebrityId = params && !isEmpty(params) ? params.celebrityId : 'primrose'
	const { celebrityId, site } = params;

	try {

		const { partnerData, currencyData, languageData } = await getEntity(site, locale);
		const entityId = partnerData.entity_id;
		const entityToken = partnerData.public_token;

		const queryClient = new QueryClient();
		await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData });
		await queryClient.prefetchQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }));

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

export default PurchaseFunStuff;
