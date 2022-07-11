import { isEmpty } from './dataStructures';

const updateQueryStringParameter = (uri, key, value) => {
	const re = new RegExp(`([?&])${key}=.*?(&|#|$)`, 'i');
	let newUri = uri;
	if (value === undefined) {
		if (newUri.match(re)) {
			return newUri
				.replace(new RegExp(`[?&]${key}=[^&#]*(#.*)?$`), '$1')
				.replace(new RegExp(`([?&])${key}=[^&]*&`), '$1');
			// return newUri.replace(re, '$1$2');
		}
		return newUri;
	}
	if (newUri.match(re)) {
		return newUri.replace(re, `$1${key}=${value}$2`);
	}
	let hash = '';
	if (newUri.indexOf('#') !== -1) {
		hash = newUri.replace(/.*#/, '#');
		newUri = newUri.replace(/#.*/, '');
	}
	const separator = newUri.indexOf('?') !== -1 ? '&' : '?';
	return `${newUri}${separator}${key}=${value}${hash}`;
};

export const queryParamUpdater = (queryList, baseURL) => {
	let url = baseURL;
	if (queryList) {
		queryList.forEach(query => {
			const value = query.value ? query.value : undefined;
			url = updateQueryStringParameter(url, query.queryParam, value);
		});
		return url.replace(/\&+/g, '&');
	}
};

export const filterToQuery = (filter, first = true, toSkip = []) => {
	if (isEmpty(filter)) return '';
	let firstChar = first ? '?' : '&';
	Object.keys(filter).filter(word => !toSkip.includes(word)).forEach((word, index) => {
		if (index === 0) {
			firstChar += `${word}=${filter[word]}`;
		} else {
			firstChar += `&${word}=${filter[word]}`;
		}
	});
	return firstChar;
};

export const getServerDomain = () => process.env.NEXT_PUBLIC_NGROK_URL === 'ngrok' ? process.env.NEXT_PUBLIC_NGROK_URL : 'localhost:8123';

export const IS_DEVELOPMENT = process.env.ENV === 'dev';

export const DJANGO_BASE_API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export const getLocalApiUrl = () => window.location.hostname.includes('localhost') ? `http://${getServerDomain()}` : `https://${window.location.hostname}`;

export const localHost = () => window.location.hostname.includes('localhost') ? 'localhost:8123' : window.location.hostname;