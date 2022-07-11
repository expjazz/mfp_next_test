import {
  faMobileAlt,
  faDownload,
  faCog,
  faComment,
  faVideo,
} from '@fortawesome/pro-light-svg-icons';
import { requestTypesKeys } from 'src/constants/requestTypes';


export const generateCards = (starName, respTime, key, t) => {
  const cardList = {
    [requestTypesKeys.shoutout]: [
      {
        description: t('purchase_flow.card-slide.shoutout.description1'),
        icon: faMobileAlt,
      },
      {
        description: t('purchase_flow.card-slide.shoutout.description2', {
          starName,
        }),
        icon: faVideo,
      },
      {
        description: t('purchase_flow.card-slide.shoutout.description3'),
        icon: faDownload,
      },
    ],
    [requestTypesKeys.commercial]: [
      {
        description: t(
          'purchase_flow.card-slide.commercial.description1',
          { starName },
        ),
        icon: faMobileAlt,
      },
      {
        description: t(
          'purchase_flow.card-slide.commercial.description2',
          {
            starName,
            day: t('common.daywithcount', {
              count: respTime ? parseInt(respTime, 0) : 7,
            }),
          },
        ),
        icon: faVideo,
      },
      {
        description: t('purchase_flow.card-slide.commercial.description3'),
        icon: faDownload,
      },
    ],
    [requestTypesKeys.socialShoutout]: [
      {
        description: t(
          'purchase_flow.card-slide.socialShoutout.description1',
        ),
        icon: faMobileAlt,
      },
      {
        description: t(
          'purchase_flow.card-slide.socialShoutout.description2',
        ),
        icon: faComment,
      },
      {
        description: t(
          'purchase_flow.card-slide.socialShoutout.description3',
        ),
        icon: faDownload,
      },
    ],
    [requestTypesKeys.digitalGoods]: [
      {
        description: t(
          'purchase_flow.card-slide.digitalGoods.description1',
        ),
        icon: faMobileAlt,
      },
      {
        description: t(
          'purchase_flow.card-slide.digitalGoods.description2',
          { starName },
        ),
        icon: faVideo,
      },
      {
        description: t(
          'purchase_flow.card-slide.digitalGoods.description3',
        ),
        icon: faDownload,
      },
    ],
    [requestTypesKeys.products]: [
      {
        description: t('purchase_flow.card-slide.products.description1'),
        icon: faMobileAlt,
      },
      {
        description: t('purchase_flow.card-slide.products.description2'),
        icon: faCog,
      },
      {
        description: t('purchase_flow.card-slide.products.description3'),
        icon: faDownload,
      },
    ],
    live: [
      {
        description: t('purchase_flow.card-slide.live.description1', {
          starName,
        }),
        icon: faMobileAlt,
      },
      {
        description: t('purchase_flow.card-slide.live.description2'),
        icon: faVideo,
      },
      {
        description: t('purchase_flow.card-slide.live.description3', {
          starName,
        }),
        icon: faDownload,
      },
    ],
  };
  return cardList[key];
};
