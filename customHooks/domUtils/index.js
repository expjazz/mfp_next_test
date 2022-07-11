import { capitalize } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'src/utils/dataStructures';

export const useMedia = mediaQuery => {


	const [match, setMatch] = useState(true);
	const setMatchValue = matchEvent => {
		setMatch(matchEvent.matches);
	};

	useEffect(() => {
		const mediaList = window.matchMedia(mediaQuery);
		setMatchValue(mediaList);
		const handler = matchEvent => setMatchValue(matchEvent);
		mediaList.addListener(handler);
		return () => mediaList.removeListener(handler);
	}, []);
	return match;
};

export const withMedia = Component => props => {
	const isMobile = useMedia('(max-width: 831px)');
	return <Component {...props} isMobile={isMobile} />;
};
export const useResizeObserver = (ref, callBack) => {

	const refChange = () => {
		callBack({
			width: ref.current.clientWidth,
			height: ref.current.clientHeight,
		});
	};

	let resizeOb = null;
	try {
		if (window.ResizeObserver && ref && ref.current) {
			resizeOb = new ResizeObserver(entries => {
				const rect = entries[0].contentRect;
				if (rect && callBack) {
					callBack({
						width: rect.width,
						height: rect.height,
					});
				}
			});
			resizeOb.observe(ref.current);
		}
	} catch (e) {
		if (ref && ref.current && callBack) refChange();
	}

	useEffect(() => {
		if (!window.ResizeObserver && ref && ref.current && callBack) refChange();
	}, [ref.current]);

	useEffect(() => {
		return () => {
			if (resizeOb && ref && ref.current) resizeOb.unobserve(ref.current);
		};
	}, []);
};

export const getRedirectURL = url => {
	let newWebUrl = url;
	const urlTest = /^((https|http):\/\/)(www.)?/;
	if (!urlTest.test(url)) {
		newWebUrl = `http://${url}`;
	}
	return newWebUrl;
};

export const useVisibility = (node, threshold = 0.01, rootMargin = '0px') => {
	const [visibile, setVisible] = useState(false);
	useEffect(() => {
		let observer;
		if (node) {
			if (window.IntersectionObserver) {
				observer = new window.IntersectionObserver(
					([entry]) => {
						// Observer callback fires
						if (entry.intersectionRatio > 0 || entry.isIntersecting) {
							setVisible(true);
							observer.unobserve(node);
						}
					},
					{
						threshold,
						rootMargin,
					},
				);
				observer.observe(node);
			} else {
				// Old browsers
				setVisible(true);
			}
		}
		return () => {
			// remove listener
			if (observer && observer.unobserve) {
				observer.unobserve(node);
			}
		};
	}, [node]);
	if (
		typeof document !== 'undefined' && typeof navigator !== 'undefined' &&
    (navigator.userAgent.includes('Prerender') ||
      navigator.userAgent.includes('prerender'))
	) {
		return true;
	}
	return visibile;
};

export const openHelp = () => {
	if (window.FreshworksWidget) {
		window.FreshworksWidget('open');
	}
};

export const CheckInViewport = node => {
	if (typeof document === 'undefined' || typeof navigator === 'undefined' || !node) return true;
	const bounding = node.getBoundingClientRect();
	if (
		bounding.top <= window.innerHeight / 2 &&
    bounding.bottom >= window.innerHeight / 2
	) {
		return true;
	}
	return false;
};

export const notPipt = userValue =>
	!!(
		userValue &&
    userValue.partner_data &&
    !isEmpty(userValue.partner_data) &&
    userValue.partner_data.entity_id.toUpperCase() !== 'PIPT-UK-1'
	);

export const isPipt = userValue =>
	!!(
		userValue &&
  userValue.partner_data &&
  !isEmpty(userValue.partner_data) &&
  userValue.partner_data.entity_id.toUpperCase() === 'PIPT-UK-1'
	);


export const downloadItem = (url, name = '', nextPage = false) => {
	if (url) {
		const debug = false;
		if (debug && isVodacom()) {
			window.postVodapayMessage({name: 'download', url});
		} else {

			const link = document.createElement('a');
			link.target = '_blank';
			link.download = name;
			link.href = url;
			link.style.display = 'none';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
		// if (nextPage) {
		//   window.open(url, '_blank');
		// } else {
		//   window.open(url, '_self');
		// }
	}
};

export const isBrowser = () => {
	return typeof window !== 'undefined' && typeof navigator !== 'undefined';
};

export const isVodacom = () => !!(isBrowser() && window.my);

export const isVodacomIOS = () => !!(isBrowser() && isVodacom() && window.isVodacomIos);

export const vodacomWebRedirect = url => {
	window.postVodapayMessage({name: 'webRedirect', url });
};

export const loadCss = (fontNM, url) => {
	const newStyle = document.createElement('style');
	newStyle.appendChild(
		document.createTextNode(
			`@font-face {
      font-family: ${fontNM};
      font-display: swap;
      src: url(${url})
        format('opentype');
    }`,
		),
	);
	document.head.appendChild(newStyle);
};

export const getCurrentUrl = () => {
	if (typeof window === 'undefined' || typeof navigator === 'undefined') {
		return '';
	}
	return window.location.href;
};

export const readDataUrl = file => {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(file);
	});
};

export const generateProductId = (type, extraData) => {
	const starName = extraData.star.nick_name
		? extraData.star.nick_name
		: `${extraData.star.first_name} ${extraData.star.last_name}`;
	switch (type) {
	// Handle cases where we need so specify for product type or id
	case 'social':
		return `${starName}_${capitalize(
			extraData.social_media,
		)}_${extraData.title.split('`').join('\'')}`;
	case 'commercial_social':
		return `${starName}_${capitalize(
			extraData.social_media,
		)}_Commercial_${extraData.title.split('`').join('\'')}`;
	case 'funstuff':
		return `${starName}_${type}_${extraData.title}_${extraData.id}`;
		// for dm and shoutout videos
	case 'merch':
		return `${starName}_${type}_${extraData.title}_${extraData.id}`;
	case 'event':
		return `${starName}_shoutout_announcement`;
	case 'announcement':
		return `${starName}_shoutout_announcement`;
	case 'shoutout':
		return `${starName}_shoutout_shoutout`;
	case 'qa':
		return `${starName}_shoutout_qa`;
	case 'live-call':
		return `${starName}_funstuff_${extraData.title}_${extraData.id}`;
	default:
		return `${starName}_${type}`;
	}
};

export const bytesToSize = bytes => {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 bytes';
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
	if (i === 0) return `${bytes} ${sizes[i]})`;
	return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const getVideoLength = src => {
	try {
		if (src) {
			return new Promise(resolve => {
				const video = document.createElement('video');
				video.src = src;
				video.preload = 'metadata';
				video.style.display = 'none';
				video.onloadedmetadata = () => {
					const { duration } = video;
					const time = new Date(null);
					time.setSeconds(duration);
					const HMS = time.toISOString().substr(11, 8);
					resolve(HMS);
				};
			});
		}
	} catch (e) {
		return '00:00:00';
	}
	return '00:00:00';
};

export const isWebView = () => {
	if (!isBrowser()) return false;
	return window.RN;
};

export const useAddToLiveCart = (
	celebrityData,
	category,
	price = null,
	extraData = {},
) => {
	const ref = useRef(true);
	if (!celebrityData?.user) return () => {};
	return () => {
		if (ref.current && window.dataLayer) {
			ref.current = false;
			const {
				user: {
					first_name: firstName,
					last_name: lastName,
					nick_name: nickName,
				},
				celebrity_details: { rate: secondPrice },
			} = celebrityData;
			const fullName = `${firstName} ${lastName}`;
			window.dataLayer.push({
				event: 'add-to-cart',
				ecommerce: {
					add: {
						products: [
							{
								name: nickName || fullName,
								id: generateProductId(category, {
									star: celebrityData.user,
									...extraData,
								}),
								price: price || secondPrice,
								category,
								quantity: 1,
							},
						],
					},
				},
			});
		}
	};
};

export const haveLogDNA = () => isBrowser() && window.__LogDNA__;

export const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], {type: file.type });

export const fileToBase64 = file => new Promise((resolve, reject) => {
	fileToBlob(file).then(blob => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
});

export const getFileExtension = file => {
	const re = /(?:\.([^.]+))?$/;
	return re.exec(file.file_name) ? re.exec(file.file_name)[1] : '';
};

export function makeId(length = 10) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() *
charactersLength));
	}
	return result;
}