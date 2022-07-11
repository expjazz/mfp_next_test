export const checkRequestSelected = selected => current => {
	const currentKey = current.key;
	if (!selected) {
		return false;
	}
	const selectedArray = selected.split(',');
	return selectedArray.indexOf(currentKey) > -1;
};

export const getUpdatedRequest = (newValue='', currentValue='') => {
	const newValueArray = newValue ? newValue.split(',') : [];
	const currentValueArray = currentValue ? currentValue.split(',') : [];
	let newArray = currentValueArray;
	newValueArray.forEach(val => {
		if (currentValueArray.indexOf(val) > -1) {
			newArray = newArray.filter(newVal => newVal !== val);
		} else {
			newArray = [...newArray, val];
		}
	});
	return newArray.join(',');
};

export const sortFilterQuery = (query) => {
	const querySplit = query ? query.split(',') : [];
	querySplit.sort();
	return querySplit.join(',');
};
