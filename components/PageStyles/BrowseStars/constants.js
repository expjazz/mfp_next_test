import React from 'react';
import {ReactSVG} from 'react-svg';
// import i18n from 'i18next';
import {
	faStar,
	faMobileAndroidAlt,
	faVideo,
	faShoppingBag,
	faBuilding,
} from '@fortawesome/pro-light-svg-icons';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
// import { getLocalAmount, getUSDAmount } from 'utils/currencyUtils';
import { requestTypesKeys } from '../../../src/constants/requestTypes';
import { useTranslation } from 'next-i18next';
import { useGeneral } from '../../../src/context/general';
import { useGetLocalAmount } from '../../../customHooks/currencyUtils';
import { isVodacom } from 'customHooks/domUtils';
// import { requestTypesKeys } from 'src/constants/requestTypes';
// import i18n from 'i18next';

const i18n = {
	t: value => value
};
const getLocalAmount = value => value;
const getUSDAmount = value => value;
const entity = value => value;

const getIcon = () => (
	<ReactSVG src="/images/shoutout-icon.svg" class="cus-icon" />
);

export const prioSort = (partnerData, t) => [
	{
		label: t('browse_stars.under_20', {
			talent: partnerData?.talent_plural_name,
		}),
		value: 'under_20',
		slug: 'under_20',
		isSort: true,
	},
	{
		label: t('browse_stars.quick_response'),
		value: 'quick_response',
		slug: 'quick_response',
		isSort: true,
	},
	{
		label: t('browse_stars.last_30'),
		value: 'last_30',
		slug: 'last_30',
		isSort: true,
	},
];

export const requests = entityData => [
	...(entityData.allow_video_shoutout
		? [
			{
				label: i18n.t('common.video_shoutouts'),
				key: 'shoutouts',
				updateKeys: ['announcement', 'personalised_video', 'question_answer'],
				value: `${requestTypesKeys.shoutout},${requestTypesKeys.event},${requestTypesKeys.qa}`,
				cusIcon: getIcon(),
			},
		]
		: []),
	...(entityData.allow_direct_message
		? [
			{
				label: i18n.t('browse_stars.direct_messaging'),
				key: 'messages',
				updateKeys: ['direct_message'],
				value: `${requestTypesKeys.message}`,
				icon: faMobileAndroidAlt,
			},
		]
		: []),
	...(entityData.allow_social_shoutout
		? [
			{
				label: i18n.t('common.social_media_interactions'),
				key: 'social_interactions',
				updateKeys: ['social_shout_out'],
				value: `${requestTypesKeys.socialShoutout}`,
				icon: faInstagram,
			},
		]
		: []),
	...(entityData.allow_social_shoutout
		? [
			{
				label: 'Tik Tok duets',
				key: 'duet',
				updateKeys: ['duet'],
				value: `${requestTypesKeys.socialShoutout}`,
				icon: faTiktok,
			},
		]
		: []),
	// ...(entityData.allow_social_shoutout
	//   ? [
	//       {
	//         label: 'Lets Stitch',
	//         key: 'lets_stitch',
	//         updateKeys: ['lets_stitch'],
	//         value: `${requestTypesKeys.socialShoutout}`,
	//         icon: faTiktok,
	//       },
	//     ]
	//   : []),
	// ...(entityData.allow_social_shoutout
	//   ? [
	//       {
	//         label: 'Choose the Sound',
	//         key: 'choose_sound',
	//         updateKeys: ['choose_sound'],
	//         value: `${requestTypesKeys.socialShoutout}`,
	//         icon: faTiktok,
	//       },
	//     ]
	//   : []),
	// ...(entityData.allow_social_shoutout
	//   ? [
	//       {
	//         label: 'Tik Tok like',
	//         key: 'tiktok_like',
	//         updateKeys: ['tiktok_like'],
	//         value: `${requestTypesKeys.socialShoutout}`,
	//         icon: faTiktok,
	//       },
	//     ]
	//   : []),
	// ...(entityData.allow_social_shoutout
	//   ? [
	//       {
	//         label: 'Tik Tok follow',
	//         key: 'tiktok_follow',
	//         updateKeys: ['tiktok_follow'],
	//         value: `${requestTypesKeys.socialShoutout}`,
	//         icon: faTiktok,
	//       },
	//     ]
	//   : []),
	...(entityData.allow_funstuff
		? [
			{
				label: i18n.t('browse_stars.fun_stuff_item'),
				key: 'fun_items',
				updateKeys: ['fun_stuff'],
				value: `${requestTypesKeys.digitalGoods}`,
				icon: faStar,
			},
		]
		: []),
	...(entityData.allow_live_call
		? [
			{
				label: i18n.t('common.live_calls'),
				key: 'live_items',
				updateKeys: ['live_call'],
				value: 'live',
				icon: faVideo,
			},
		]
		: []),
	...(entityData.allow_product
		? [
			{
				label: i18n.t('browse_stars.merchandise'),
				key: 'merchandise',
				updateKeys: ['products'],
				value: `${requestTypesKeys.products}`,
				icon: faShoppingBag,
			},
		]
		: []),
	...(entityData.allow_social_commercial ||
    entityData.allow_commercial
		? [
			{
				label: i18n.t('browse_stars.commercial_requests'),
				key: 'commercial_requests',
				updateKeys: ['commercial', 'social_promotions'],
				value: `${requestTypesKeys.promotion},${requestTypesKeys.commercial}`,
				icon: faBuilding,
			},
		]
		: []),
];

export const sortList = [
	{
		label: i18n.t('browse_stars.popularity'),
		value: 'popularity',
		slug: 'popularity',
	},
	{
		label: i18n.t('browse_stars.a_z'),
		value: 'az',
		slug: 'a-z',
	},
	{
		label: i18n.t('browse_stars.lowest_first'),
		value: 'lpf',
		slug: 'lowest_first',
	},
	{
		label: i18n.t('browse_stars.highest_first'),
		value: 'hpf',
		slug: 'highest_first',
	},
];

export const transSortList = t => [
	{
		label: t('browse_stars.popularity'),
		value: 'popularity',
		slug: 'popularity',
	},
	{
		label: t('browse_stars.a_z'),
		value: 'az',
		slug: 'a-z',
	},
	{
		label: t('browse_stars.lowest_first'),
		value: 'lpf',
		slug: 'lowest_first',
	},
	{
		label: t('browse_stars.highest_first'),
		value: 'hpf',
		slug: 'highest_first',
	},
];

export const usePriceList = (minPrice, maxPrice) => {
	const [state] = useGeneral();
	const { t } = useTranslation();

	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();

	return () => {
		const {currencyData: contextCurrency} = state;
		// const getLocalSymbol = () => '$'
		// const getLocalAmount = value => value
		return [
			{
				label: `${t('browse_stars.under')} ${
					getLocalSymbol()
				}${Math.round(getLocalAmount(20) / 5) * 5}`,
				low: minPrice || 1,
				high: getUSDAmount(Math.round(getLocalAmount(20) / 5) * 5),
				slug: `under_${Math.round(getLocalAmount(20) / 5) * 5}`,
			},
			{
				label: `${getLocalSymbol()}${Math.round(
					getLocalAmount(20) / 5,
				) * 5} to ${getLocalSymbol()}${Math.round(
					getLocalAmount(50) / 5,
				) * 5}`,
				low: getUSDAmount(Math.round(getLocalAmount(20) / 5) * 5),
				high: getUSDAmount(Math.round(getLocalAmount(50) / 5) * 5),
				slug: `${Math.round(getLocalAmount(20) / 5) * 5}_to_${Math.round(
					getLocalAmount(50) / 5,
				) * 5}`,
			},
			{
				label: `${getLocalSymbol()}${Math.round(
					getLocalAmount(50) / 5,
				) * 5} to ${getLocalSymbol()}${Math.round(
					getLocalAmount(100) / 5,
				) * 5}`,
				low: getUSDAmount(Math.round(getLocalAmount(50) / 5) * 5),
				high: getUSDAmount(Math.round(getLocalAmount(100) / 5) * 5),
				slug: `${Math.round(getLocalAmount(50) / 5) * 5}_to_${Math.round(
					getLocalAmount(100) / 5,
				) * 5}`,
			},
			{
				label: `${t('browse_stars.over')} ${
					getLocalSymbol()
				}${Math.round(getLocalAmount(100) / 5) * 5}`,
				low: getUSDAmount(Math.round(getLocalAmount(100) / 5) * 5),
				high: maxPrice,
				slug: `over_${Math.round(getLocalAmount(100) / 5) * 5}`,
				getUSDAmount,
			},
		];
	};
};

export const priceList = (minPrice, maxPrice) => [
	{
		label: `${i18n.t('browse_stars.under')} ${
			entity('currencyData')
		}${Math.round(getLocalAmount(20) / 5) * 5}`,
		low: minPrice,
		high: getUSDAmount(Math.round(getLocalAmount(20) / 5) * 5),
		slug: `under_${Math.round(getLocalAmount(20) / 5) * 5}`,
	},
	{
		label: `${entity('currencyData')}${Math.round(
			getLocalAmount(20) / 5,
		) * 5} to ${entity('currencyData')}${Math.round(
			getLocalAmount(50) / 5,
		) * 5}`,
		low: getUSDAmount(Math.round(getLocalAmount(20) / 5) * 5),
		high: getUSDAmount(Math.round(getLocalAmount(50) / 5) * 5),
		slug: `${Math.round(getLocalAmount(20) / 5) * 5}_to_${Math.round(
			getLocalAmount(50) / 5,
		) * 5}`,
	},
	{
		label: `${entity('currencyData')}${Math.round(
			getLocalAmount(50) / 5,
		) * 5} to ${entity('currencyData')}${Math.round(
			getLocalAmount(100) / 5,
		) * 5}`,
		low: getUSDAmount(Math.round(getLocalAmount(50) / 5) * 5),
		high: getUSDAmount(Math.round(getLocalAmount(100) / 5) * 5),
		slug: `${Math.round(getLocalAmount(50) / 5) * 5}_to_${Math.round(
			getLocalAmount(100) / 5,
		) * 5}`,
	},
	{
		label: `${i18n.t('browse_stars.over')} ${
			entity('currencyData')
		}${Math.round(getLocalAmount(100) / 5) * 5}`,
		low: getUSDAmount(Math.round(getLocalAmount(100) / 5) * 5),
		high: maxPrice,
		slug: `over_${Math.round(getLocalAmount(100) / 5) * 5}`,
		getUSDAmount,
	},
];
