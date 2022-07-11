import React from 'react';
import { ReactSVG } from 'react-svg';

import {
  faComments,
  faStar,
  faBuilding,
} from '@fortawesome/free-regular-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faShoppingCart,
  faVideo,
  faHome,
  faLightbulb,
} from '@fortawesome/pro-regular-svg-icons';
import { requestTypesKeys } from '../../src/constants/requestTypes';
// import { i18n } from 'next-i18next';
// import { i18n } from 'next-i18next';

const getIcon = () => (
  <ReactSVG src="/images/marketing.svg" class="cus-icon shout-icon" />
);


export const optionList = {
  home: { key: 'home', label: t => t('common.homeCap'), icon: faHome },
  shoutout: {
    key: 'shoutout',
    label: t => t('common.shoutoutfullCap'),
    cusIcon: getIcon(),
    icon: faComments,

    type: requestTypesKeys.shoutout,
  },
  chat: {
    key: 'chat',
    type: requestTypesKeys.message,
    label: t => t('common.chatCap'),
    icon: faComments,
  },
  social: {
    key: 'social',
    label: t => t('common.socialCap'),
    icon: faInstagram,
    type: requestTypesKeys.socialShoutout,
  },
  live: {
    key: 'live',
    type: requestTypesKeys.digitalGoods,
    label: t => t('common.livecallCap'),
    icon: faVideo,
  },
  fun: {
    key: 'fun',
    type: requestTypesKeys.digitalGoods,
    label: t => t('common.funstuffCap'),
    icon: faStar,
  },
  merch: {
    key: 'merch',
    label: t => t('common.merchCap'),
    icon: faShoppingCart,
    type: requestTypesKeys.products,
  },
  commercial: {
    key: 'commercial',
    type: requestTypesKeys.commercial,
    label: t => t('common.commercialfullCap'),
    icon: faBuilding,
  },
  suggest: {
    key: 'suggest',
    label: t => t('common.suggestCap'),
    icon: faLightbulb,
    type: requestTypesKeys.promotion,
  },
  tip: { key: 'tip', label: t => t('common.tip'), icon: faLightbulb },
};
