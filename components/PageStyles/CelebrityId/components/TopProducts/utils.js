// const i18n = { t: value => value }
// import { requestTypesKeys } from "../../../../../src/constants/requestTypes";

import { requestTypesKeys } from "../../../../../src/constants/requestTypes";
import { i18n } from 'next-i18next';

export const formatTopProds = (prods) => {
  return prods.map(prod => {
    if (prod.request_type === requestTypesKeys.shoutout) {
      return ({
      ...prod,
      title: i18n.t('common.personalized_video_shoutout'),
      image: '/images/shoutout.jpg',
      webpImage: '/images/shoutout.webp',
      description: i18n.t('common.personalized_video_desc'),
      })
    } else if (prod.request_type === requestTypesKeys.event) {
      return ({
      ...prod,
      title: i18n.t('common.announcementCaps'),
      image: '/images/announcement.jpg',
      webpImage: '/images/announcement.webp',
      description: i18n.t('common.announcementCapsDesc'),
      })
    } else if (prod.request_type === requestTypesKeys.qa) {
      return ({
      ...prod,
      title:  i18n.t('common.ask_question'),
      image: '/images/question.jpg',
      webpImage: '/images/question.webp',
      description: i18n.t('common.ask_question_desc'),
      })
    } else if (prod.request_type === requestTypesKeys.message) {
      return ({
        ...prod,
      image: '/images/chat-image.jpg',
      webpImage: '/images/chat-image.webp',
      description: i18n.t('common.ask_question_desc2'),
      })
    }
    return prod
  })
};

export const reqTypes = {
  [requestTypesKeys.shoutout]: 'Video shoutouts',
  [requestTypesKeys.event]: 'Video shoutouts',
  [requestTypesKeys.qa]: 'Video shoutouts',
  [requestTypesKeys.message]: 'Direct Messages',
  [requestTypesKeys.socialShoutout]: 'Social Media Interactions',
  [requestTypesKeys.digitalGoods]: 'Fun stuff service',
  [requestTypesKeys.products]: 'Personalized Merch',
  [requestTypesKeys.commercial]: 'Commercial',
  [requestTypesKeys.promotion]: 'Commercial',
};
