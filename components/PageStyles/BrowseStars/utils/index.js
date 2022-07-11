export const findCategory = (categoryName, professions = [], subCategories = []) => {
	let finalCategory = professions.find(category => category.slug === categoryName);
	if (finalCategory) {
		finalCategory = {
			...finalCategory,
			parentId: finalCategory.id,
			parentTitle: finalCategory.title,
			parentSlug: finalCategory.slug,
		};
	}
	if (!finalCategory) {
		finalCategory = subCategories.find(category => category.slug === categoryName);
		if (finalCategory) {
			const parentCategory = professions.find(category => category.id === finalCategory.parent);
			finalCategory = {
				...finalCategory,
				child: parentCategory.child,
				parentId: parentCategory.id,
				parentTitle: parentCategory.title,
				parentSlug: parentCategory.slug,
			};
		}
	}
	return finalCategory || {};
};

export const getSubCat = (current, subCatList=[]) => {
	const catArr = current ? [...new Set(current.split(','))] : [];
	let catList = [];
	catArr.forEach(prod => {
		const selProd = subCatList.find(pro => pro.slug === prod);
		if (selProd) {
			catList = [...catList, selProd];
		}
	});
	return catList;
};

export const getProductKeys = (current, productList=[]) => {
	const productArr = current ? [...new Set(current.split(','))] : [];
	let productKeys = [];
	productArr.forEach(prod => {
		const selProd = productList.find(pro => pro.key === prod);
		if (selProd) {
			productKeys = [...productKeys, selProd.key];
		}
	});
	return productKeys.join(',');
};

export const getCountryKeys = (current='', countryList=[]) => {
	return (
		countryList.filter(country => current.indexOf(country.id)>=0)
			.map(country => country.id === 'all' ? '' : country.id).join(',')
	);
};

/**
 * @param router nextJS router
 * @returns  final string
   * This function creates a user friendly routeon the redirects
   * by using the nextJS router query object
 */
export const getAsStringForRouterFilter = router => {
	let finalString = '?';
	let isFirst = true;
	const arr = ['sub_cat', 'sort', 'price', 'products'];
	arr.forEach(key => {
		if (router.query[key]) {
			if (!isFirst) {
				finalString += '&';
			} else {
				isFirst = false;
			}
			finalString += `${key}=${router.query[key]}`;
		}
	});
	if (router.query.catSlug) {
		return `/category/${router.query.catSlug}${finalString}`;
	} else if (router.query.tagSlug) {
		return `/tag/${router.query.tagSlug}${finalString}`;
	} else {
		return `/browse-stars/${finalString}`;
	}
};