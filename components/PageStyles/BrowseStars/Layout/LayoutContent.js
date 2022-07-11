import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { isBrowser, useMedia } from '../../../../customHooks/domUtils';
import { editGeneralState, setNeedUpdate, updateAllFilters, updatePriceRange, updateProducts, updateSelectedSubCategory, useGeneral } from '../../../../src/context/general';
import { fetchCelebrityList, getEntity, getSalesMessages } from '../../../../src/services/myfanpark';
import { queryParamUpdater } from '../../../../src/utils/urlUtils';
import HeaderV3 from '../../../HeaderV3';
import FilterSection from '../components/FilterSection';
import MetaGenerator from '../components/MetaGenerator';
import RowMessage from '../components/RowMessage';
import TagGenerator from '../components/TagGenerator';
import { useData, useFilters } from '../services/useFilters';
import CategoryPageStyled from '../styled';
import { prioSort } from '../constants';
import { pipeSeparator } from '../../../../src/utils/dataToStringFormatter';
import Truncate from 'react-truncate';
import { locStorage } from '../../../../src/utils/localStorageUtils';
import { initialState } from '../../../../src/context/initialState';
import FooterComp from '../../../Footer';
import LegacyHeader from '../../../LegacyHeader';
import { isEmpty } from '../../../../src/utils/dataStructures';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useFanFavorites, useGetPartner } from 'customHooks/reactQueryHooks';
import { superSportProfessions } from 'components/Homepages/SuperSport/constants';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
// import DiscountBanner from 'components/DiscountBanner';


const StarListing = dynamic(() => import('../../../StarListing'), {
	ssr: false
});
const DiscountBanner = dynamic(() => import('components/DiscountBanner'), { ssr: false });

function BrowseStarsLayoutContent(props) {
	const { isStar, isLoggedIn, data: userData } = useFetchLoggedUser();
	const [state, dispatch] = useGeneral();
	const router = useRouter();
	useFanFavorites();
	const { filters, celebList, salesMessage } = state;
	const {
		category,
		lowPrice,
		products,
		countries,
		highPrice,
		sortValue,
		needUpdate,
		dynamicFilter,
		tag,
		searchParam
	} = filters;

	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const mobile = useMedia('(max-width: 831px)');
	// eslint-disable-next-line react/prop-types
	const [showFilter, toggleFilter] = useState(
		// props.location.query && props.location.query.filterView,
		true
	);
	const firstRender = useRef(true);
	useEffect(() => {
		if (isMobile && firstRender.current) {
			toggleFilter(false);
			firstRender.current = false;
		}
	}, [isMobile]);
	const [hideFeatured, toggleFeatured] = useState(false);
	const [timerUpdate, setTimerUpdate] = useState(false);
	const [showSearchbar, setShowSearchbar] = useState(true);
	const [showSearchClick, setSearchClick] = useState(false);
	const [searchChange, searchChangeRef] = useState(false);
	const [expanded, expandDesc] = useState(false);
	const contentRef = useRef(null);
	const mainRef = useRef(null);
	const filterRef = useRef(null);
	const headerRef = useRef(null);
	const searchRef = useRef(null);
	const scroll = useRef(0);
	const { entityId, entityToken } = props.partnerData;
	const {currencyData: contextCurrency} = state;
	const { data: { partnerData, currencyData: apiCurrency, languageData  } } = useGetPartner();
	const currencyData = state?.currencyData || apiCurrency;
	useEffect(() => {
		const storageCurrencyData = locStorage.getItem('currencyData');
		if (storageCurrencyData) {
			editGeneralState(dispatch, { payload: storageCurrencyData, key: 'currencyData' });
		} else {
			editGeneralState(dispatch, { payload: currencyData, key: 'currencyData' });
		}
	}, []);

	const onWindowResize = () => {
		if (
			document.body.getBoundingClientRect().width >= 832 ||
      window.innerWidth >= 832
		) {
			toggleFilter(true);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', onWindowResize);

		return () => {
			window.removeEventListener('resize', onWindowResize);
		};
	}, [router.asPath, router.pathname]);

	useEffect(() => {
		if (isMobile && window.FreshworksWidget) {
			window.FreshworksWidget('hide', 'launcher');
		} else if (window.FreshworksWidget) {
			window.FreshworksWidget('show', 'launcher');
		}
	}, [isMobile]);


	const renderSeoLinks = () => {
		const page = celebList.offset / celebList.limit + 2;
		const totalPages = celebList.count / celebList.limit;
		return (
			<>
				{page < totalPages && (
					<Head>
						<link
							rel="next"
							href={queryParamUpdater(
								[{ queryParam: 'page', value: page }],
								process.env.NEXT_PUBLIC_BASE_URL,
							)}
						/>
					</Head>
				)}
				{page - 2 > 0 && (
					<Head>
						<link
							rel="prev"
							href={queryParamUpdater(
								[{ queryParam: 'page', value: page - 2 }],
								process.env.NEXT_PUBLIC_BASE_URL,
							)}
						/>
					</Head>
				)}
			</>
		);
	};


	const starCountries = useData();
	useFilters({
		...props,
		pathname: router.pathname,
		query: router.query,
		celebList,
		configLoaded: true,
		professions: props.allProfessions,
		lowPrice,
		subCategoryList: props.subProfessions,
		config: props.configData,
		partnerData,
		...filters,
		filters,
		// updateFilters: localFilters => { editGeneralState(dispatch, { payload: { ...localFilters }, key: 'filters' }) },
		updatePriceRange: (lowPrice, highPrice) => updateAllFilters(dispatch, {lowPrice, highPrice}),
		updateSort: sortValue => updateAllFilters(dispatch, {sortValue}),
		updateProducts: products => updateAllFilters(dispatch, {products}),
		setUpdateFlag: needUpdate => updateAllFilters(dispatch, {needUpdate}),
		updateSelectedSubCategory: (selectedList, subCatString = '') => updateSelectedSubCategory(dispatch, selectedList, subCatString),
		starCountries,
	});


	useEffect(() => {
		if (props.selectedCategory && router.pathname.includes('category')) {
			updateAllFilters(dispatch, {
				needUpdate: true, category: {
					label: props.selectedCategory.parentTitle || props.selectedCategory.title,
					value: props.selectedCategory.parentId || props.selectedCategory.id,
					subCategories: props.selectedCategory.child || [],
					selected: props.selectedCategory.parent ? [props.selectedCategory] : [],
					selectString: '',
				},
				tag: {}
			});
		} else if (router.pathname.includes('browse-stars') && (!router.pathname.includes('category') && !isEmpty(filters.tag) || filters.category.label !== 'Featured')) {
			updateAllFilters(dispatch, {
				needUpdate: true,category: initialState.filters.category, tag: {}
			});
		}
	}, [router.query.catSlug, router.pathname]);

	useEffect(() => {
		if (props.selectedTag && router.asPath.includes('tag')) {
			updateAllFilters(dispatch, {
				needUpdate: true, tag: props.selectedTag, category: initialState.filters.category
			});
		} else if (router.pathname.includes('browse-stars') && (!router.pathname.includes('category') && !isEmpty(filters.tag) || filters.category.label !== 'Featured')) {
			updateAllFilters(dispatch, {
				needUpdate: true,category: initialState.filters.category, tag: {}
			});

		}
	}, [router.pathname, router.asPath]);
	const pageType = '';
	const CategoryNM = 'Featured';
	const topStars = '';
	const redirect404 = false;
	const getFeaturedStars = () => {
		// to do later
	};
	const toggleFilterCall = () => {
		if (!isBrowser) return false;
		if (isMobile) {
			if (!showFilter) {
				scroll.current = window.pageYOffset;
				document.body.style.position = 'fixed';
				document.body.style.transform = 'translate3d(0, 0, 0)';
			} else if (showFilter) {
				document.body.style.position = 'initial';
				document.body.style.transform = 'inherit';
				if (scroll.current) {
					window.scrollTo(0, scroll.current);
				}
			}
		}
		toggleFilter(!showFilter);
	};
	const renderPaginationLinks = () => {
		if (celebList.count) {
			const totalPages = Math.floor(
				celebList.count / celebList.limit,
			);
			return Array.from(Array(totalPages).keys()).map(page => (
				<a
					hidden
					href={queryParamUpdater(
						[{ queryParam: 'page', value: page + 1 }],
						process.env.NEXT_PUBLIC_BASE_URL,
					)}
				>
					{page + 1}
				</a>
			));
		}
	};
	const getUSDAmount = useGetLocalAmount()[2];
	const shouldGetUSD = router.asPath.includes('price=') || router.query.price;
	const fetchMoreData = async (offset, refresh) => {
		editGeneralState(dispatch, { payload: {...celebList, loading: true}, key: 'celebList' });
		const payload = await fetchCelebrityList(offset, refresh, filters, celebList, partnerData, shouldGetUSD ? getUSDAmount : value => value );
		editGeneralState(dispatch, { payload, key: 'celebList' });
		editGeneralState(dispatch, { payload: { ...filters, needUpdate: false }, key: 'filters' });
	};

	const renderRowMessage = (row, RenderComponent) => {
		return <RowMessage row={row} RenderComponent={RenderComponent} />;
	};

	// export const fetchCelebrityList = (offset, refresh, filters, celebList, entityData) => {
	const handleFetchStars = async () => {
		editGeneralState(dispatch, { payload: {...celebList, loading: true}, key: 'celebList' });

		const payload = await fetchCelebrityList(0, true, filters, celebList, partnerData, shouldGetUSD ? getUSDAmount : value => value);
		editGeneralState(dispatch, { payload, key: 'celebList' });
	};

	useEffect(() => {
		if (needUpdate) {
			handleFetchStars();
			// editGeneralState(dispatch, { payload: { ...filters, needUpdate: false }, key: 'filters' })
			setNeedUpdate(dispatch, { payload: false });
		}

	}, [needUpdate]);

	const handleFetchSalesMessages = async () => {
		const payload = await getSalesMessages({category});
		editGeneralState(dispatch, { payload: {...salesMessage, ...payload}, key: 'salesMessage' });
	};

	useEffect(() => {
		handleFetchSalesMessages();
	}, []);


	return (
		<CategoryPageStyled headerRef={headerRef.current}>
			{
				isMobile ? (
					<LegacyHeader
						forwardRef={headerRef}
						// navRef={headNavRef}
						classes={{
							innerContent: 'inner-head',
						}}
						professionsList={props.allProfessions}
						showBack
						showBanner
						entityData={partnerData}
						currencyData={currencyData}
						languageData={props.partnerData.language}
						smallEntitySelect
						dynamicFilters={dynamicFilter}
						t={t}
						disabledNotification={
							!isLoggedIn ||
            userData?.celebrity_details?.pending_requests_count ||
            !userData?.celebrity_details?.pending_requests_count
						}
						config={props.configData}
						suggestionsList={[]}
						celebDetails={{}}
						searchRef={searchRef}
						smallEntitySelect
						onBackClick={() => router.back()}
						showCategories
						userValue={{
							error: '',
							fromSocialMedia: false,
							isStar,
							loading: false,
							role: '',
							settings_celebrityDetails: {},
							settings_userDetails: {},
							userDataLoaded: false
						}}
						searchProps={{
							placeholder: 'Search for your favorite Talent' }}
					/>
				) : (

					<HeaderV3
						forwardRef={headerRef}
						// navRef={headNavRef}
						classes={{
							innerContent: 'inner-head',
						}}
						professionsList={props.allProfessions}
						showBack
						showBanner
						entityData={partnerData}
						currencyData={currencyData}
						languageData={props.partnerData.language}
						smallEntitySelect
						dynamicFilters={dynamicFilter}
						t={t}
						config={props.configData}
						suggestionsList={[]}
						searchRef={searchRef}
						smallEntitySelect
						showCategories
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
				)
			}
			<DiscountBanner />
			{renderSeoLinks()}
			<MetaGenerator
				pageType={pageType}
				category={category}
				selected={category.selected}
				tag={tag}
				featuredStars={getFeaturedStars()}
				topStars={topStars}
				entity={partnerData}
			/>
			{tag.image && (
				<CategoryPageStyled.TagImage
					src={tag.image}
					alt={`${tag.label} image`}
				/>
			)}
			<CategoryPageStyled.Toolbar
				isLoggedIn={isLoggedIn}
				headerRef={headerRef.current}
			>
				<CategoryPageStyled.CategoryName>
					{category.selected.length > 0
						? pipeSeparator(category.selected, 'title')
						: tag.label || category.label}
				</CategoryPageStyled.CategoryName>
				{isMobile && tag.desc && !forbiddenTag() && (
					<CategoryPageStyled.TagDetWrap isExpanded={expanded}>
						<Truncate
							lines={!expanded && 4}
							ellipsis={
								<CategoryPageStyled.More onClick={() => expandDesc(true)}>
									{t('common.more')}
								</CategoryPageStyled.More>
							}
							className="description"
						>
							{tag.desc}
						</Truncate>
					</CategoryPageStyled.TagDetWrap>
				)}

			</CategoryPageStyled.Toolbar>
			{isMobile && (
				<TagGenerator
					partnerData={partnerData}
					updateSelectedSubCategory={() => {updateAllFilters(dispatch, { needUpdate: true }); updateSelectedSubCategory(dispatch, [], '');}}
					selectedCategory={props.selectedCategory}
					starCountries={starCountries.starCountries}
					category={category}
					countries={countries}
					{...filters}
					toggleFilterCall={toggleFilterCall}
				/>
			)}
			<CategoryPageStyled.Content
				isFeatured={isMobile && category.label === 'Featured'}
				ref={contentRef}
			>
				<CategoryPageStyled.MainContent ref={mainRef}>
					{showFilter && (
						<CategoryPageStyled.FilterSection
							headerRef={headerRef}
							ref={filterRef}
						>
							{!isMobile &&  !tag.label && (
								<CategoryPageStyled.CategoryName noCapitalise={tag.label}>
									{category.label}
								</CategoryPageStyled.CategoryName>
							)}
							<FilterSection
								prioSort={prioSort(partnerData, t)}
								query={router.query}
								lowPrice={lowPrice}
								highPrice={highPrice}
								starCountries={starCountries}
								partnerData={partnerData}
								disableSubList={category.label === 'Featured'}
								onClose={toggleFilterCall}
								dynamicFilters={[]}
								category={category}
								starCountries={starCountries.starCountries}
								updateSelectedSubCategory={arr => updateSelectedSubCategory(dispatch, arr)}
								sortValue={sortValue}
								countries={countries}
								updatePriceRange={(low, high) => updatePriceRange(dispatch, low, high)}
							/>
						</CategoryPageStyled.FilterSection>
					)}
					{renderPaginationLinks()}

					<CategoryPageStyled.ListingWrapper
						isFeatured={category.label === 'Featured'}
						// cusBorderRad={props.cusBorderRad}
					>

						{!isMobile && tag.label ? (
							<CategoryPageStyled.TagDetWrap isExpanded={expanded}>
								<CategoryPageStyled.Heading isTag={tag.label}>
									{tag.label}
								</CategoryPageStyled.Heading>

								<Truncate
									lines={!expanded && 3}
									ellipsis={
										<CategoryPageStyled.More onClick={() => expandDesc(true)}>
											{t('common.more')}
										</CategoryPageStyled.More>
									}
									className="description"
								>
									{tag.desc}
								</Truncate>
							</CategoryPageStyled.TagDetWrap>
						) : null}

						{!isMobile && (
							<TagGenerator
								selectedCategory={props.selectedCategory}
								updateSelectedSubCategory={() => {updateAllFilters(dispatch, { needUpdate: true }); updateSelectedSubCategory(dispatch, [], '');}}
								starCountries={starCountries}
								partnerData={partnerData}
								starCountries={starCountries.starCountries}
								category={category}
								countries={countries}
								{...filters}
								toggleFilterCall={toggleFilterCall}
							/>)}

						{
							isBrowser() && (

								<StarListing
									customLoader
									dataList={celebList.data}
									noDataText={t('browse_stars.no_data', {
										talent: partnerData?.talentPlural || 'ent plural',
									})}
									loading={celebList.loading}
									offset={celebList.offset}
									fetchData={fetchMoreData}
									renderRowMessage={renderRowMessage}
									totalCount={celebList.count}
									limit={celebList.limit}
									entityData={partnerData}
									renderRowMessage={renderRowMessage}
									professions={props.allProfessions}
									currencyData={currencyData}
								/>
							)
						}
					</CategoryPageStyled.ListingWrapper>
				</CategoryPageStyled.MainContent>
			</CategoryPageStyled.Content>
			<CategoryPageStyled.Footer
				shouldHide={partnerData?.entity_id !== 'SUPERSPORT-ZA-1'}
			>
				<FooterComp
					filters={state.filters}
					className="partner-footer"
					isStar={isStar}
					professionsProp={partnerData?.entity_id !== 'SUPERSPORT-ZA-1' ? null : superSportProfessions}
					professions={props.allProfessions}
					entityData={partnerData}
					showCat
					darkMode
					reverseLogo
					isV3
					professionCompleteLink
				/>
			</CategoryPageStyled.Footer>
		</CategoryPageStyled>
	);
}

export default BrowseStarsLayoutContent;
