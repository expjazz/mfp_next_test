import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React, { useState } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderV3 from 'components/HeaderV3';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner, useV3ExpUsers } from 'customHooks/reactQueryHooks';
import HeaderSection from 'components/PageStyles/V3Home/components/HeaderSection';
import Experiences from 'components/PageStyles/V3Home/components/experiences';
import Bookings from 'components/PageStyles/V3Home/components/bookings';
import HorizontalListing from 'components/HorizontalListing';
import { animated, useTransition } from 'react-spring';
import dynamic from 'next/dynamic';
import { getCurrentUrl, useMedia } from 'customHooks/domUtils';
import { useQuery } from 'react-query';
import { algoliaQueryPerIndex } from 'src/services/algolia';
import { useGeneral } from 'src/context/general';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import HomeStyled, { BodyContainer, OutterPage, SectionTitle, TopStarsCarousel } from './styled';
import { firstCarouselData, superSportProfessions, superSportSecondList } from './constants';
const Footer = dynamic(() => import('components/Footer'));
const CommFooter = dynamic(() => import('components/PageStyles/V3Home/components/Footer'));
const CategoryList = dynamic(() => import('components/PageStyles/V3Home/components/Categories'));
function SuperSport({searchRef, ...props}) {
	const { data: entityData } = useGetPartner();
	const [state, dispatch] = useGeneral();
	const partnerData = entityData?.partnerData;
	const { algolia_index: algoliaIndex } = partnerData;
	const currencyData = useCurrencyData();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: v3Users } = useV3ExpUsers(props.v3UsersIds);
	const { data: secondListUsers } = useV3ExpUsers(superSportSecondList);
	const isMobile = useMedia('(max-width: 831px)');
	const { data: topStars, error, isLoading } = useQuery(['algolia', algoliaIndex], () => algoliaQueryPerIndex(algoliaIndex));
	const isTablet = useMedia('(max-width: 1281px)');
	const { t } = useTranslation();
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
						<p className="top-stars-price">Starting at {getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(row.lowest_rate), false, false)}</p>
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
						<p className="top-stars-price">Starting at {getLocalSymbol()}{numberToDecimalWithFractionTwo(getLocalAmount(row.lowest_rate, currencyData.rate), false, false)}</p>
					</div>
				</a>
			</Link>
		);
	};
	const getStarName = star => {
		return star.nick_name || `${star.first_name  } ${  star.last_name}`;
	};

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
			<HomeStyled>
				<HeaderV3
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
				/>

				<BodyContainer>
					<HeaderSection settings={partnerData.homepage_settings}/>
					<Experiences data={firstCarouselData}/>
					<SectionTitle>
						<h3>
							{partnerData.v3_experiences?.label_one || 'Shop by interest'}

						</h3>
					</SectionTitle>
					<Bookings />

					<TopStarsCarousel
						onMouseEnter={() => setFirstCar(true)}
						onMouseLeave={() => setFirstCar(false)}
					>
						{
							(v3Users && v3Users.length) && (

								<>

									<SectionTitle>
										<h3>
											{partnerData.v3_experiences?.label_two || 'Rugby Stars'}


										</h3>
										<Link href={'/category/rugby'} prefetch={true}>
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
								</>
							)
						}
					</TopStarsCarousel>
					{/* {
            !isMobile && (
              <Divider />
            )
          } */}

					<TopStarsCarousel
						onMouseEnter={() => setFirstCar(true)}
						onMouseLeave={() => setFirstCar(false)}
					>
						{
							secondListUsers && (

								<React.Fragment>

									<SectionTitle>
										<h3>

              Featured Stars
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
										showArrows={!isMobile}
										onScroll={false}
										icons={{right: firstRight(), left: firstLeft()}}
										dataList={secondListUsers}
										fixedContent
										renderContent={freshSalesSlide}
										totalCount={secondListUsers.length}
										scrollProps={{
											autoHeight: true,
											autoHeightMax: 1000,
										}}
									/>

								</React.Fragment>
							)
						}
					</TopStarsCarousel>
					{/* <SectionTitle>
            <h3>

              Browse Talent
            </h3>
          </SectionTitle>
          <CategoryList profImage={profImage} categories={props.allProfessions.filter((_, index) => !!profImage[index])} /> */}

				</BodyContainer>
			</HomeStyled>
			<CommFooter />
			<Footer filters={state.filters} reverseLogo className="partner-footer" showSearch showCat darkMode isV3 isStar={false} professionsProp={superSportProfessions} professions={superSportProfessions} professionCompleteLink entityData={partnerData} />
		</OutterPage>
	);
}

export default SuperSport;
