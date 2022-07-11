import {
  faMobileAlt,
  faDownload,
  faCog,
} from '@fortawesome/pro-light-svg-icons';

export const getList = (respTime, t) => {
  return [
    {
      description: t('common.generate_card.description1'),
      icon: faMobileAlt,
    },
    {
      description: t('common.generate_card.description2',{day:t('common.daywithcount', {count: respTime ? parseInt(respTime, 0) : 7})}),
      icon: faCog,
    },
    {
      description: t('common.generate_card.description3'),
      icon: faDownload,
    },
  ];
};
