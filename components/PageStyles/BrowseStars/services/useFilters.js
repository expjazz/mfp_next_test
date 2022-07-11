import { useEffect, useState } from 'react';
// import { isEmpty } from 'src/utils/dataStructures';
// import { useTranslation } from 'next-i18next';
// import { parseQueryString } from 'src/utils/dataformatter';
// import { getStarName } from 'src/utils/dataToStringFormatter';
// import { queryParamUpdater } from 'utils/urlsUtils';
// import { getStarCountries } from 'services/userManagement/starDetails';
// import { getTagDetails } from 'services';
import { requests, sortList, prioSort, usePriceList } from '../constants';

import {
	findCategory,
	getProductKeys,
	getSubCat,
	getCountryKeys,
} from '../utils';
import { isEmpty } from '../../../../src/utils/dataStructures';
import { useTranslation } from 'next-i18next';
import { parseQueryString } from '../../../../src/utils/dataformatter';
import { getStarName } from '../../../../src/utils/dataToStringFormatter';
import { queryParamUpdater } from '../../../../src/utils/urlUtils';
import { getTagDetails } from '../../../../src/services';
import { getStarCountries } from '../../../../src/services/userManagement/starDetails';

export const useFilters = props => {
	const [pageType, setPageType] = useState('');
	const [topStars, setTopStars] = useState('');
	const [categoryNM, setCategory] = useState('');
	const [redirect404, toggleRedirect] = useState(false);
	const priceList = usePriceList();
	const setFilters = async () => {
		const {
			products = '',
			sub_cat: subCat,
			sort,
			filter,
			region_check: regionChk,
			price,
			countries,
		} = props.query;
		let shouldUpdate = !props.celebList.data.length;
		const newFilter = {...props.filters};
		if (getProductKeys(products, requests(props.partnerData)) !== props.products) {
			newFilter.products = getProductKeys(products, requests(props.partnerData)) || '';
			props.updateProducts(getProductKeys(products, requests(props.partnerData)) || '');
			shouldUpdate = true;
		}
		const sortItem = sortList.find(sortIt => sortIt.slug === sort);
		if (sortItem && sortItem.value !== props.sortValue) {
			props.updateSort(sortItem ? sortItem.value : sortList[0].value);
			newFilter.sortValue = sortItem ? sortItem.value : sortList[0].value;
			shouldUpdate = true;
		} else if (props.sortValue !== sortList[0].value && !sortItem) {
			props.updateSort(sortList[0].value);
			newFilter.sortValue = sortItem ? sortItem.value : sortList[0].value;
			shouldUpdate = true;
		}
		const priceItem = priceList(
			parseInt(props.config.min_rate, 0),
			parseInt(props.config.max_rate, 0),
		).find(priceDet => priceDet.slug === price) || {
			low: parseInt(props.config.min_rate, 0),
			high: parseInt(props.config.max_rate, 0),
		};
		if (
			priceItem &&
        (priceItem.low !== props.lowPrice || priceItem.high !== props.highPrice)
		) {
			newFilter.lowPrice = priceItem.low || 1;
			newFilter.highPrice = priceItem.high;
			props.updatePriceRange(priceItem.low || 1, priceItem.high);
			shouldUpdate = true;
		}
		if (subCat) {
			const subArr = getSubCat(subCat, props.subCategoryList);
			newFilter.category.selected = subArr;
			newFilter.category.selectString = subCat;
			props.updateSelectedSubCategory(subArr, subCat);
			shouldUpdate = true;
		}
		newFilter.needUpdate = shouldUpdate;
		// props.updateFilters(newFilter)
		props.setUpdateFlag(shouldUpdate);

	};

	useEffect(() => {
		setFilters();
	}, [
		props.pathname,
		props.query,
		props.configLoaded,
		props.lowPrice,
		props.starCountries.length,
	]);

	return true;
};

export const useData = props => {
	const { t } = useTranslation();
	const [starCountries, setStarCountries] = useState([
		{
			id: 'all',
			name: t('common.all_countries'),
		},
	]);

	useEffect(() => {
		getStarCountries().then(resp => {
			setStarCountries([...starCountries, ...resp.countries]);
		});
	}, []);
	return {
		starCountries,
	};
};
