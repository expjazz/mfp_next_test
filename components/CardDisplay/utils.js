// import i18n from 'i18next';

import {
  faMobileAlt,
  faDownload,
  faCog,
} from '@fortawesome/pro-light-svg-icons';
import { i18n } from 'next-i18next';

export const generateCards = (starName, respTime) => {
  return [
    {
      description: i18n.t('common.generate_card.description1'),
      icon: faMobileAlt,
    },
    {
      description: i18n.t('common.generate_card.description2',{star:starName, day:i18n.t('common.daywithcount', {count: respTime ? parseInt(respTime, 0) : 7})}),
      icon: faCog,
    },
    {
      description: i18n.t('common.generate_card.description3'),
      icon: faDownload,
    },
  ];
};
