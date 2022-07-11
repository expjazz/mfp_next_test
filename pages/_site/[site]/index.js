import React, { useState, useRef, useEffect } from 'react';
import HeaderV3 from '../../../components/HeaderV3';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllProfessions, getConfig, getEntity, getProfessions, getV3Users } from '../../../src/services/myfanpark';
import { algoliaQueryPerIndex } from '../../../src/services/algolia';
import HomeStyled, { OutterPage, BodyContainer, SectionTitle, TopStarsCarousel, DiscountContainer } from '../../../components/PageStyles/V3Home/styled';
import HeaderSection from '../../../components/PageStyles/V3Home/components/HeaderSection';
import Experiences from '../../../components/PageStyles/V3Home/components/experiences';
import Bookings from '../../../components/PageStyles/V3Home/components/bookings';
import HorizontalListing from '../../../components/HorizontalListing';
import { getCurrentUrl, useMedia } from '../../../customHooks/domUtils';
import { useTransition, animated } from 'react-spring';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import Image from 'next/image';
// import CategoryList from '../components/PageStyles/V3Home/components/Categories'
// import CommFooter from '../components/PageStyles/V3Home/components/Footer'
// import Footer from '../components/Footer'
import { editGeneralState, toggleLogin, useGeneral } from '../../../src/context/general';
import { locStorage } from '../../../src/utils/localStorageUtils';
import { numberToDecimalWithFractionTwo } from '../../../src/utils/dataformatter';
import { useTranslation } from 'next-i18next';
import { useGetLocalAmount } from '../../../customHooks/currencyUtils';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useGeneralPromocode, useGetPartner, useV3ExpUsers } from 'customHooks/reactQueryHooks';
// import SuperSport from 'components/Homepages/SuperSport';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
import { superSportSecondList } from 'components/Homepages/SuperSport/constants';
import { useRouter } from 'next/router';
import DiscountBanner from 'components/DiscountBanner';
import { useLayoutEffect } from 'react';
import RateDisplay from 'components/RateDisplay';
// import DiscountBanner from 'components/DiscountBanner';

const SuperSport = dynamic(() => import('components/Homepages/SuperSport'), { ssr: false });
const Footer = dynamic(() => import('../../../components/Footer'));
const CommFooter = dynamic(() => import('../../../components/PageStyles/V3Home/components/Footer'));
const CategoryList = dynamic(() => import('../../../components/PageStyles/V3Home/components/Categories'));
export default function V3_Home(props) {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: v3Users } = useV3ExpUsers(props.v3UsersIds);
	const router = useRouter();
	// const v3Users = null
	const [state, dispatch] = useGeneral();
	const {currencyData: contextCurrency} = state;
	const { data: { partnerData, currencyData: apiCurrency, languageData  } } = useGetPartner();
	const { algolia_index: algoliaIndex } = partnerData;
	const { data: topStars, error, isLoading } = useQuery(['algolia', algoliaIndex], () => algoliaQueryPerIndex(algoliaIndex));
	const searchRef = useRef(null);
	const currencyData = contextCurrency || apiCurrency;
	const [language, setLanguage] = useState(languageData);
	useEffect(() => {
		const storageCurrencyData = locStorage.getItem('currencyData');
		if (storageCurrencyData) {
			editGeneralState(dispatch, { payload: storageCurrencyData, key: 'currencyData' });
		} else {
			editGeneralState(dispatch, { payload: currencyData, key: 'currencyData' });
		}
	}, []);
	const isMobile = useMedia('(max-width: 831px)');
	const isTablet = useMedia('(max-width: 1281px)');
  	// TO DO remove testing line
	// const generalPromocode = [{'id':'vbmZ20dY','code':'VODAPAY15','type':'percentage','discount':'15.00','auto_load':true,'valide_to':'2022-07-31','local_discount':null,'name':'KICKOFF'}];
	const { data: generalPromocode } = useGeneralPromocode();
	const promocode = generalPromocode?.[generalPromocode?.length - 1] || {};
	useEffect(() => {
		if (router.query.login) {
			toggleLogin(dispatch, { active: true, options: { noRedirect: false } });
		}
	}, [router.query]);
	const getStarName = star => {
		return star.nick_name || `${star.first_name  } ${  star.last_name}`;
	};

	const freshSalesSlide = row => {
		return (
			<Link href={`/${row.user_id}`} className="top-stars-slide" passHref key={row.image} prefetch={true}>
				<a className="top-stars-slide" >
					<div className="top-stars-img">
						<div className="small-img">

							<Image
								src={row.image || '/starpic'}
								alt={getStarName(row)}
								width={120}
								priority={isMobile}
								height={120}
								layout="fixed"
								className="rounded-3xl rounded-corners"
							/>
						</div>
						<div className="medium-img">

							<Image
								src={row.image || '/starpic'}
								alt={getStarName(row)}
								width={150}
								height={150}
								layout="fixed"
								className="rounded-3xl rounded-corners"
							/>
						</div>
						<div className="big-img">

							<Image
								src={row.image || '/starpic'}
								alt={getStarName(row)}
								width={180}
								height={180}
								layout="fixed"
								className="rounded-3xl rounded-corners"
							/>
						</div>
					</div>
					{/* <img src={row.image} alt={getStarName(row)} /> */}


					<div className="top-stars-bottom">
						<h3 className="top-stars-title"> {getStarName(row)} </h3>
						<p className="top-stars-subtitle">{row.category}</p>
						<p className="top-stars-price">Starting at{!hasPromocode ? (
							<>
								{getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(row.lowest_rate, currencyData.rate), false, false)}
							</>
						) : (
							<RateDisplay
								rate={row.lowest_rate}
								type={1}
								promoDetails={promocode}
								discountObj={{}}
							/>
						) }</p>
					</div>
				</a>
			</Link>
		);
	};

	const topStarsSlide = row => {
		return (
			<Link href={`/${row.vanity_url}`} passHref className="top-stars-slide" key={row.id} prefetch={true}>
				<a className="top-stars-slide" >
					<div className="top-stars-img">
						<div className="small-img">

							<Image
								src={row.avatar_photo ? row.avatar_photo.image_url : ''}
								alt={getStarName(row)}
								width={120}
								height={120}
								layout="fixed"
								className="rounded-3xl rounded-corners"
								objectFit="cover"
							/>
						</div>
						<div className="medium-img">

							<Image
								src={row.avatar_photo ? row.avatar_photo.image_url : ''}
								alt={getStarName(row)}
								width={150}
								height={150}
								layout="fixed"
								className="rounded-3xl rounded-corners"
								objectFit="cover"
							/>
						</div>
						<div className="big-img">

							<Image
								src={row.avatar_photo ? row.avatar_photo.image_url : ''}
								alt={getStarName(row)}
								width={180}
								height={180}
								layout="fixed"
								className="rounded-3xl rounded-corners"
								objectFit="cover"
							/>
						</div>
						{/* <Image className="img" height={100} width={100} src={`https://starsona-stb-usea1.s3.amazonaws.com/images${row.avatar_photo.image_url.split('images')[1]}`} alt={getStarName(row)} /> */}

					</div>

					<div className="top-stars-bottom">
						<h3 className="top-stars-title overflow"> {getStarName(row)} </h3>
						<p className="top-stars-subtitle">{row.celebrity_profession && row.celebrity_profession.length ? row.celebrity_profession[0].title : 'N/A'}</p>
						<p className="top-stars-price">Starting at {!hasPromocode ? (
							<>
								{getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(row.lowest_rate, currencyData.rate), false, false)}
							</>
						) : (
							<RateDisplay
								rate={row.lowest_rate}
								type={1}
								promoDetails={promocode}
								discountObj={{}}
							/>
						) }</p>
					</div>
				</a>
			</Link>
		);
	};
	const profImage = ['View_All.jpg', 'image-cat-sports.png', 'image-cat-tv.png',
		'Music_3.jpg', 'Comedy_5.jpg', 'image-cat-social.png',
		'image-cat-comedy.png'
	];
	const [firstCar, setFirstCar] = useState(true);
	const [secondCar, setSecondCar] = useState(true);
	const animationStyle = { from: { opacity: 0, display: 'block' },
		enter: { opacity: 1 },
		leave: { opacity: 0, display: 'none'  },
		config: { tension: 550, friction: 120 },
	};
	const firstArrowAnimation = useTransition(firstCar, animationStyle);
	const secondArrowAnimation = useTransition(secondCar, animationStyle);

	const firstLeft = () => firstArrowAnimation((style, item) => item &&
    (
    	<animated.div style={style} className="left">
    		<FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />
    	</animated.div>
    )
	);
	const secondLeft = () => secondArrowAnimation((style, item) => item &&
    (
    	<animated.div style={style} className="left">

    		<FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />
    	</animated.div>
    )
	);

	const firstRight = () => firstArrowAnimation((style, item) => item &&
    (
    	<animated.div style={style} className="right">
    		<FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
    	</animated.div>
    )
	);
	const secondRight = () => secondArrowAnimation((style, item) => item &&
    (
    	<animated.div style={style} className="right">

    		<FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
    	</animated.div>
    )
	);
	const { t } = useTranslation();
	const headerRef = useRef(null);
	const [headerHeight, setHeaderHeight] = useState(0);
	useLayoutEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}
	}, [headerRef]);
	const homepageTemplate = partnerData?.homepage_template;
	const hasPromocode = generalPromocode?.length > 0;
	switch(homepageTemplate) {
	case 5:
		return (
			<SuperSport
				{...props}
				searchRef={searchRef}
			/>
		);
	default:
		return (
			<OutterPage>
				<Head>
					<title>{partnerData.seo_title}</title>
					<meta property="description" content={partnerData.seo_description} data-react-helmet="true"/>
					<meta property="og:title" content={partnerData.seo_title} data-react-helmet="true"/>
					<meta property="og:image" content={partnerData.seo_image} data-react-helmet="true"/>
					<meta property="og:secure_url" content={partnerData.seo_site_name} data-react-helmet="true"/>
					<meta property="og:site_name" content={partnerData.seo_site_name} data-react-helmet="true"/>
					<meta property="og:url" content={getCurrentUrl()} data-react-helmet="true"/>
					<meta property="og:type" content="website" data-react-helmet="true"/>
					<meta property="twitter:title" content={partnerData.seo_title} data-react-helmet="true"/>
					<meta property="twitter:image" content={partnerData.seo_image} data-react-helmet="true"/>
					<meta property="twitter:site" content={partnerData.seo_site_name} data-react-helmet="true"/>
					<meta property="twitter:creator" content={partnerData.seo_site_name} data-react-helmet="true"/>
					<meta property="keywords" content={partnerData.seo_keywords} data-react-helmet="true"/>
					<meta property="fb:app_id" content={process.env.NEXT_PUBLIC_fbId} data-react-helmet="true"/>
					<meta property="google-play-app" content={`app-id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`} data-react-helmet="true"/>
				</Head>
				<HeaderV3
					forwardRef={headerRef}
					entityData={partnerData}
					currencyData={currencyData}
					hideHamburguer
					languageData={partnerData.language}
					t={t}
					noCategory
					config={props.configData}
					suggestionsList={[]}
					isLoggedIn={false}
					disableHelp
					searchRef={searchRef}
					smallEntitySelect
					userValue={{
						error: '',
						fromSocialMedia: false,
						isStar: false,
						loading: false,
						role: '',
						settings_celebrityDetails: {},
						settings_userDetails: {},
						userDataLoaded: false
					}}
					searchProps={{
						placeholder: 'Search for your favorite Talent' }}
					discountBanner
				/>
				<DiscountContainer height={headerHeight}>
			    <DiscountBanner />
				</DiscountContainer>
				<HomeStyled>
					<BodyContainer>
						<HeaderSection settings={partnerData.homepage_settings}/>
						<Experiences data={partnerData.v3_carrousel}/>
						<SectionTitle>
							<h3>
								{partnerData.v3_experiences?.label_one || 'Shop by experience'}

							</h3>
						</SectionTitle>
						<Bookings />

						<TopStarsCarousel
							onMouseEnter={() => setFirstCar(true)}
							onMouseLeave={() => setFirstCar(false)}
						>
							{
								(v3Users && v3Users.length) && (

									<React.Fragment>

										<SectionTitle>
											<h3>
												{partnerData?.v3_experiences?.label_two || 'Featured'}
											</h3>
											<Link href={'/browse-stars'} prefetch={true}>
												<a className="link">
                      View all
												</a>
											</Link>
										</SectionTitle>
										<HorizontalListing
											customVisibility
											classes={{root: 'list-root', arrowWrapper: 'custom-arrow'}}
											scrollId='star-list-scroll'
											showArrows={!isMobile}
											onScroll={false}
											icons={{right: firstRight(), left: firstLeft()}}
											dataList={v3Users}
											fixedContent
											renderContent={freshSalesSlide}
											totalCount={v3Users.length}
											scrollProps={{
												autoHeight: true,
												autoHeightMax: 1000,
											}}
										/>
									</React.Fragment>
								)
							}
						</TopStarsCarousel>
						{/* {
                !isMobile && (
                  <Divider />
                )
              } */}

						<TopStarsCarousel
							onMouseEnter={() => setSecondCar(true)}
							onMouseLeave={() => setSecondCar(false)}
						>
							{
								topStars && (

									<React.Fragment>

										<SectionTitle>
											<h3>

                  Popular
											</h3>
											<Link href={'/browse-stars'} prefetch={true} >
												<a className="link">
                      View all
												</a>
											</Link>
										</SectionTitle>
										<HorizontalListing
											customVisibility
											classes={{root: 'list-root', arrowWrapper: 'custom-arrow'}}
											scrollId='star-list-scroll'
											showArrows={!isMobile && secondCar}
											onScroll={false}
											dataList={topStars}
											fixedContent
											renderContent={topStarsSlide}
											icons={{right: secondRight(), left: secondLeft()}}
											totalCount={topStars.length}
											scrollProps={{
												autoHeight: true,
												autoHeightMax: 1000,
											}}
										/>

									</React.Fragment>
								)
							}
						</TopStarsCarousel>
						<SectionTitle>
							<h3>

                  Browse Talent
							</h3>
						</SectionTitle>
						<CategoryList profImage={profImage} categories={props.allProfessions.filter((_, index) => !!profImage[index])} />

					</BodyContainer>
				</HomeStyled>
				<CommFooter />
				<Footer filters={state.filters} reverseLogo className="partner-footer" showSearch showCat darkMode isV3 isStar={false} professions={props.allProfessions} entityData={partnerData} />
			</OutterPage>
		);
	}

}

export async function getStaticPaths() {
	const paths = getDeliveryPaths();
	return {
		paths,
		fallback: 'blocking'
	};
}


export async function getStaticProps({ locale, params: { site } }) {


	// const { entityId, entityToken } = localeEntity(locale, site);

	const queryClient = new QueryClient();

	const { partnerData, currencyData, languageData } = await getEntity(site, locale);
	const entityId = partnerData.entity_id;
	const { algolia_index: algoliaIndex } = partnerData;
	if (partnerData?.entity_id === 'SUPERSPORT-ZA-1') {
		await queryClient.prefetchQuery(['v3Users', superSportSecondList], () => getV3Users({users: superSportSecondList}));
	}
	const entityToken = partnerData.public_token;
	await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData });
	const users = partnerData.v3_experiences?.data?.map(row => row.id) || partnerData?.v3_experiences.map(row => row.id) || [];
	await queryClient.prefetchQuery(['v3Users', users], () => getV3Users({users}));
	await queryClient.prefetchQuery(['algolia', algoliaIndex], () => algoliaQueryPerIndex(algoliaIndex));
	const professions = await getProfessions();
	const config = await getConfig(partnerData.entity_id, partnerData.public_token);
	await queryClient.prefetchQuery('professions', () => getAllProfessions(), {
		initialData: {
			professions: [],
			subcategories: [],
			allProfessions: []
		}
	});
	return {
		props: {
			locale,
			partnerData: { entityId: partnerData.entity_id, entityToken: partnerData.public_token },
			configData: config,
			v3UsersIds: users,
			allProfessions: professions,
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),
			revalidate: 60
		},
	};
}

