// import i18n from 'i18next';
import { requestTypesKeys } from '../../../../../src/constants/requestTypes';
// import { requestTypesKeys } from 'src/constants/requestTypes';

const i18n = {
  t: value => value
}

export const getSocialList = (socialData, key, userId) => {
  let finalSocialList = [];
  socialData.forEach(det => {
    if (det.details) {
      finalSocialList = [
        ...finalSocialList,
        ...det.details.map(detail => ({
          "name": `${detail.social_media.charAt(0).toUpperCase() + detail.social_media.slice(1)} - ${detail.description}`,
          key,
          "url": `${process.env.BASE_URL}/${userId}`
        }))
      ]
    }
  });
  return finalSocialList;
}

export const getDigitalGoods = (digGoods=[], key, userId) => {
  return digGoods
  .filter(good => good.quantity - (good.sold + good.in_progress) > 0)
  .map(good => ({
    "name": good.title,
    key,
    "url": `${process.env.BASE_URL}/${userId}`,
  }))
}

export const offerCatalogs = (socialList, digGoods, userId) => ([{
  name: i18n.t('common.celeb_shoutout'),
  itemList: [{
    key: requestTypesKeys.shoutout,
    name: i18n.t('common.fanViewWrap.video_shout_out'),
    url: `${process.env.BASE_URL}/${userId}`,
  }, {
    name: i18n.t('common.announcementCap'),
    key: requestTypesKeys.event,
    url: `${process.env.BASE_URL}/${userId}`,
  }, {
    name: i18n.t('common.a&a'),
    key: requestTypesKeys.qa,
    url: `${process.env.BASE_URL}/${userId}`,
  }, {
    name: i18n.t('common.commercial_requests'),
    key: requestTypesKeys.commercial,
    url: `${process.env.BASE_URL}/${userId}`,
  }]
}, {
  name: i18n.t('common.direct_mesgs'),
  itemList: [{
    key: requestTypesKeys.message,
    name: i18n.t('common.celeb_personal_msg'),
    url: `${process.env.BASE_URL}/${userId}`,
  }]
}, {
  name: i18n.t('common.social_media_interactions'),
  itemList: getSocialList(socialList, requestTypesKeys.socialShoutout, userId)
}, {
  name: i18n.t('common.fun_stuff'),
  itemList: getDigitalGoods(digGoods, requestTypesKeys.digitalGoods, userId)
}])
