import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faPhoneVolume } from '@fortawesome/pro-light-svg-icons';
import {
	getUpdatedRequest,
	sortFilterQuery,
	checkRequestSelected,
} from '../../utils/queryUtils';
import { prioSort, requests, sortList, transSortList, usePriceList } from '../../constants';
import FilterStyled from './styled';
import { isEmpty } from '../../../../../src/utils/dataStructures';
import { useTranslation } from 'next-i18next';
import Checkbox from '../../../../Checkbox';
import { useMediaQuery } from '@material-ui/core';
import HeaderSection from '../../../../HeaderV3/styled';
import PrimaryButton from '../../../../PrimaryButton';
import Picker from '../../../../Picker';
import { queryParamUpdater, filterToQuery } from '../../../../../src/utils/urlUtils';
import { isBrowser } from '../../../../../customHooks/domUtils';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { getAsStringForRouterFilter } from '../../utils';

const FilterSection = props => {
	const { t } = useTranslation();
	const priceList = usePriceList();
	const isWeb = useMediaQuery('(min-width: 832px)');
	const router = useRouter();
	const { data: entityData } = useGetPartner();
	const { products, countries } = props.query;
	const translatedPrioSort = isBrowser() ? prioSort(entityData?.partnerData, t) : [];
	const dynamicFilters = useMemo(() => {
		return [{ label: 'All', value: '' }, ...props.dynamicFilters, ...translatedPrioSort];
	}, [JSON.stringify(props.dynamicFilters)]);

	const getSortState = () => {
		const selectedSort = sortList.find(
			sortItem => sortItem.value === props.sortValue,
		);
		return selectedSort;
	};

	const getDynamicState = () => {
		const selectedDynamic = [
			{ label: 'None', value: '' },
			...props.dynamicFilters,
			...translatedPrioSort,
		].find(sortItem => sortItem.value === props.dynamicFilter);
		return selectedDynamic;
	};

	const getPriceList = () => {
		const foundPrice = priceList(
			parseInt(props.minRate, 0),
			parseInt(props.maxRate, 0),
		).find(
			priceItem =>
				priceItem.low === props.lowPrice && priceItem.high === props.highPrice,
		);
		return foundPrice || { low: props.lowPrice, high: props.highPrice };
	};

	const [selectedSubCat, updateSelectedSub] = useState(props.category.selected);
	const [selectedSort, updateSortState] = useState(getSortState());
	const [selectRegCheck, setSelRegCheck] = useState(props.regionCheck);
	const [selectedDynamicFilt, updateDynamicState] = useState(getDynamicState());
	const [selectedRequest, updateRequestState] = useState(
		getUpdatedRequest(products),
	);
	const [priceRange, updateSelectedPriceRange] = useState(getPriceList());
	const [countryList, setCountries] = useState([props.starCountries[0]]);

	const finalSortList = useMemo(() => {
		return [...transSortList(t)];
	}, []);

	useEffect(() => {
		updateSortState(getSortState());
	}, [props.sortValue]);

	useEffect(() => {
		const selCountries = props.starCountries.filter(
			country => props.countries.indexOf(country.id) >= 0,
		);
		setCountries(selCountries.length ? selCountries : [props.starCountries[0]]);
	}, [props.starCountries.length, props.countries]);

	useEffect(() => {
		setSelRegCheck(props.regionCheck);
	}, [props.regionCheck]);

	useEffect(() => {
		updateRequestState(products);
	}, [props.query]);

	useEffect(() => {
		updateSelectedPriceRange(getPriceList());
	}, [props.lowPrice, props.highPrice]);

	useEffect(() => {
		updateDynamicState(getDynamicState());
	}, [props.dynamicFilter]);

	useEffect(() => {
		updateSelectedSub(props.category.selected);
	}, [props.category.selected]);

	const updateQueryFilter = filterArr => {
		// const newURL = queryParamUpdater(filterArr, `${filterToQuery(router.query, true, ['catSlug', 'tagSlug'])}`);
		filterArr.forEach(row => {
			if (row.value) {
				router.query[row.queryParam] = row.value;
			} else {
				delete router.query[row.queryParam];
			}
		});
		router.push(router, getAsStringForRouterFilter(router), { shallow: true });

	};

	const updateSubCategory = subCategory => () => {
		let selectedList = [...selectedSubCat];
		if (selectedList.find(cat => cat.id === subCategory.id)) {
			selectedList = selectedList.filter(cat => cat.id !== subCategory.id);
			updateSelectedSub(selectedList);
		} else {
			selectedList = [...selectedList, subCategory];
			updateSelectedSub(selectedList);
		}
		if (isWeb) {
			const subKeys = selectedList.map(subCat => subCat.slug).join(',');
			updateQueryFilter([
				{ queryParam: 'sub_cat', value: sortFilterQuery(subKeys) },
			]);
		}
	};

	const updateSelRegCheck = () => {
		setSelRegCheck(!selectRegCheck);
		if (isWeb) {
			updateQueryFilter([
				{ queryParam: 'region_check', value: Boolean(!selectRegCheck) },
			]);
		}
	};

	const updateSelectedRequest = request => {
		const newRequestState = sortFilterQuery(
			getUpdatedRequest(request.key, selectedRequest),
		);
		updateRequestState(newRequestState);
		if (isWeb) {
			updateQueryFilter([{ queryParam: 'products', value: newRequestState }]);
		}
	};

	const updateSelectedSort = sortValue => {
		updateSortState(sortValue);
		if (isWeb) {
			updateQueryFilter([{ queryParam: 'sort', value: sortValue.slug }]);
		}
	};

	const updateSelectedDynamic = dynamic => {
		updateDynamicState(dynamic);
		if (isWeb) {
			updateQueryFilter([{ queryParam: 'filter', value: dynamic.slug }]);
		}
	};

	const isPriceSelected = current => {
		return current.high === priceRange.high && current.low === priceRange.low;
	};

	const updatePriceRange = price => {
		let newPrice = price;
		if (isPriceSelected(price)) {
			newPrice = {
				low: parseInt(props.minRate, 0),
				high: parseInt(props.maxRate, 0),
			};
		}
		updateSelectedPriceRange({
			low: newPrice.low,
			high: newPrice.high,
			slug: newPrice.slug,
		});
		if (isWeb) {
			updateQueryFilter([{ queryParam: 'price', value: newPrice.slug }]);
		}
	};

	const getValues = value => {
		let newCountries = [...countryList];
		if (
			value &&
      value.length > 1 &&
      value.find(val => val.id === 'all') &&
      countryList.find(val => val.id === 'all')
		) {
			newCountries = value.filter(val => val.id !== 'all');
		} else if (
			!countryList.find(val => val.id === 'all') &&
      value.find(val => val.id === 'all')
		) {
			newCountries = value.filter(val => val.id === 'all');
		} else if (value.length > 0) {
			newCountries = [...value];
		}
		setCountries(newCountries);
		if (isWeb) {
			updateQueryFilter([
				{
					queryParam: 'countries',
					value: newCountries.map(val => val.id).join(','),
				},
			]);
		}
	};
	const applyFilters = () => {
		// props.updateSelectedSubCategory([]);
		updateQueryFilter([
			{
				queryParam: 'products',
				value: sortFilterQuery(selectedRequest),
			},
			{ queryParam: 'region_check', value: selectRegCheck },
			{ queryParam: 'sort', value: selectedSort.slug },
			{ queryParam: 'filter', value: selectedDynamicFilt?.slug },
			{ queryParam: 'price', value: priceRange.slug },
			{
				queryParam: 'countries',
				value:
          countryList[0].id !== 'all'
          	? countryList.map(val => val.id).join(',')
          	: '',
			},
		]);
		// props.updatePriceRange(priceRange.low, priceRange.high);
		props.onClose();
	};

	const toggleSelectAll = () => {
		updateQueryFilter([{ queryParam: 'sub_cat', value: '' }]);
		updateSelectedSub([]);
	};

	const renderFilter = (
		list,
		selected,
		onSelect,
		checkbox = false,
		selectionFunction,
		className='by-experience',
	) => {
		const selectFunction = value => () => {
			onSelect(value);
		};
		return (
			<FilterStyled.SubCategoryList listFilter>
				{list.map(child => (
					<FilterStyled.SubCategoryItem
						key={child.value}
						className={`${className} ${(selectionFunction ? selectionFunction(child) : child.value === selected) ? 'is-checked' : 'not-checked'}`}
						checkedItem={checkbox}
						selected={
							selectionFunction
								? selectionFunction(child)
								: child.value === selected
						}
						onClick={selectFunction(child)}
					>
						{checkbox && (
							<Checkbox
								checked={
									selectionFunction
										? selectionFunction(child)
										: child.value === selected
								}
							/>
						)}
						{child.icon && (
							<FontAwesomeIcon icon={child.icon} className="fill-icon" />
						)}
						{child.cusIcon && child.cusIcon}
						<span
							className={`icon-label ${(selectionFunction ? selectionFunction(child) : child.value === selected) ? 'is-checked' : 'not-checked'}`}
						>
							{t(child.label)}
						</span>
					</FilterStyled.SubCategoryItem>
				))}
			</FilterStyled.SubCategoryList>
		);
	};
	return (
		<FilterStyled>
			<FilterStyled.Header>
				<HeaderSection.HeaderDiv className="filter-header">
					<FontAwesomeIcon
						icon={faChevronLeft}
						onClick={props.onClose}
						className="filter-back"
					/>
					<HeaderSection.HeaderRight visible>
						<FontAwesomeIcon
							icon={faTimes}
							onClick={props.onClose}
							className="filter-close"
						/>
					</HeaderSection.HeaderRight>
				</HeaderSection.HeaderDiv>
			</FilterStyled.Header>
			<FilterStyled.Heading mobileOnly className="filter-heading">
				{t('browse_stars.filter')}
			</FilterStyled.Heading>
			<aside
				id="secondary"
				itemScope=""
				role="complementary"
				itemType="http://schema.org/WPSideBar"
			>
				<FilterStyled.Content height={isBrowser() ? window.innerHeight - 140 : 800}>
					{isEmpty(props.tag) &&
            !props.disableSubList &&
            isWeb &&
            props.category.subCategories.length > 0 && (
						<FilterStyled.FilterHeading>
							{t('browse_stars.categories')}
						</FilterStyled.FilterHeading>
					)}

					{isEmpty(props.tag) &&
            !props.disableSubList &&
            props.category.subCategories.length > 0 &&
            isWeb && (
						<FilterStyled.SubCategoryList className="subcategory-list">
							<FilterStyled.SubCategoryItem
								className="subcategory-list-item"
								selected={selectedSubCat.length === 0}
								onClick={toggleSelectAll}
							>
								{t('browse_stars.all')}
							</FilterStyled.SubCategoryItem>
							{props.category.subCategories.map(subCategory => (
								<FilterStyled.SubCategoryItem
									key={subCategory.id}
									selected={selectedSubCat.find(
										cat => cat.id === subCategory.id,
									)}
									onClick={updateSubCategory(subCategory)}
								>
									{subCategory.title}
								</FilterStyled.SubCategoryItem>
							))}
						</FilterStyled.SubCategoryList>
					)}
					<FilterStyled.SecondaryFilterWrapper
						disableSubList={props.disableSubList}
					>
						<FilterStyled.SecondaryFilter>
							<FilterStyled.SortHeading>
								{t('browse_stars.by_experience')}
							</FilterStyled.SortHeading>
							{renderFilter(
								requests(props.partnerData),
								selectedRequest,
								updateSelectedRequest,
								true,
								checkRequestSelected(selectedRequest),
							)}
						</FilterStyled.SecondaryFilter>
						<FilterStyled.SecondaryFilter>
							<FilterStyled.FilterHeading>
								{t('browse_stars.starting_prices')}
							</FilterStyled.FilterHeading>
							{renderFilter(
								isBrowser() ? priceList(
									parseInt(props.minRate, 0),
									parseInt(props.maxRate, 0),
								) : [],
								priceRange,
								updatePriceRange,
								true,
								isPriceSelected,
								'cta-starting-prices',
							)}
						</FilterStyled.SecondaryFilter>
						{/* <FilterStyled.SecondaryFilter>
              <FilterStyled.FilterHeading>
                {t('browse_stars.by_location')}
              </FilterStyled.FilterHeading>
              <MultipleSelect
                getValues={getValues}
                data={props.starCountries}
                disableScrollLock
                labelKey="name"
                values={countryList}
                extraClasses='by-location'
                labelClass
              />
              {
                props.showRegionCheck ?
                  <Checkbox
                    label={t('common.only_this_region')}
                    className={`region-checkbox only-show-region ${selectRegCheck ? 'is-checked' : 'not-checked'}`}
                    checked={selectRegCheck}
                    onChange={updateSelRegCheck}
                  />
                : null
              }
            </FilterStyled.SecondaryFilter> */}
						<FilterStyled.SecondaryFilter>
							<FilterStyled.SortHeading>
								{t('browse_stars.sort_by')}
							</FilterStyled.SortHeading>
							{isWeb ? (
								renderFilter(
									finalSortList,
									selectedSort.value,
									updateSelectedSort,
								)
							) : (
								<Picker
									list={finalSortList}
									onSelect={updateSelectedSort}
									selected={{...selectedSort, label: t(selectedSort?.label)}}
								/>
							)}
						</FilterStyled.SecondaryFilter>
						{/* <FilterStyled.SecondaryFilter>
              <FilterStyled.SortHeading>
                {t('browse_stars.filter')}
              </FilterStyled.SortHeading>
              {isWeb ? (
                renderFilter(
                  dynamicFilters,
                  selectedDynamicFilt.value,
                  updateSelectedDynamic,
                  false,
                  null,
                  'special-filter-option'
                )
              ) : (
                <Picker
                  list={dynamicFilters}
                  onSelect={updateSelectedDynamic}
                  selected={selectedDynamicFilt}
                />
              )}
            </FilterStyled.SecondaryFilter> */}
						{/* {
              (props.entityData.contact_phone || props.entityData.contact_whatsapp) ?
                <FilterStyled.SecondaryFilter>
                  <FilterStyled.SortHeading className='questions-head'>
                    {t('browse_stars.questionsClick')}
                  </FilterStyled.SortHeading>
                  {
                    props.entityData.contact_whatsapp ?
                      <WhatsappService
                        number={props.entityData.contact_whatsapp}
                      >
                        {
                          (onClick) => (
                            <img className='what-icon' onClick={onClick} alt='whatsapp' src="/images/whatsapp.svg" />
                          )
                        }
                      </WhatsappService>
                    : null
                  }
                  {
                    props.entityData.contact_phone ?
                      <a href={`tel:${props.entityData.contact_phone}`} className='phone-number'>
                        <FontAwesomeIcon className='phone-icon' icon={faPhoneVolume} />
                      </a>
                    : null
                  }
                </FilterStyled.SecondaryFilter>
              : null
            } */}
						<FilterStyled.ApplyButton>
							<PrimaryButton className="controlButton" onClick={applyFilters}>
								{t('browse_stars.apply')}
							</PrimaryButton>
						</FilterStyled.ApplyButton>
					</FilterStyled.SecondaryFilterWrapper>
				</FilterStyled.Content>
			</aside>
		</FilterStyled>
	);
};

FilterSection.defaultProps = {
	minRate: '',
	maxRate: '',
	query: {},
	partnerData: {}
};

FilterSection.propTypes = {
	query: PropTypes.object,
	partnerData: PropTypes.object,
	onClose: PropTypes.func.isRequired,
	category: PropTypes.object.isRequired,
	updateSelectedSubCategory: PropTypes.func.isRequired,
	updateSort: PropTypes.func.isRequired,
	lowPrice: PropTypes.number.isRequired,
	highPrice: PropTypes.number.isRequired,
	dynamicFilters: PropTypes.array.isRequired,
	updatePriceRange: PropTypes.func.isRequired,
	disableSubList: PropTypes.bool.isRequired,
	updateDynamicFilter: PropTypes.func.isRequired,
	sortValue: PropTypes.string.isRequired,
	products: PropTypes.string.isRequired,
	dynamicFilter: PropTypes.string.isRequired,
	tag: PropTypes.object.isRequired,
	minRate: PropTypes.string,
	maxRate: PropTypes.string,
};

// const mapStateToProps = state => ({
//   category: state.filters.category,
//   lowPrice: state.filters.lowPrice,
//   highPrice: state.filters.highPrice,
//   countries: state.filters.countries,
//   regionCheck: state.filters.regionCheck,
//   dynamicFilters: state.dynamicFilters.data,
//   entityData: state.entity.data,
//   dynamicFilter: state.filters.dynamicFilter,
//   sortValue: state.filters.sortValue,
//   products: state.filters.products,
//   tag: state.filters.tag,
//   minRate: state.config.data.min_rate,
//   showRegionCheck: state.entity.data.has_stars,
//   maxRate: state.config.data.max_rate,
// });

// const mapDispatchToProps = dispatch => ({
//   updateSelectedSubCategory: selectedList =>
//     dispatch(updateSelectedSubCategory(selectedList)),
//   updatePriceRange: (low, high) => dispatch(updatePriceRange(low, high)),
//   updateSort: value => dispatch(updateSort(value)),
//   updateProducts: value => dispatch(updateProducts(value)),
//   updateDynamicFilter: value => dispatch(updateDynamicFilter(value)),
// });

export default FilterSection;
