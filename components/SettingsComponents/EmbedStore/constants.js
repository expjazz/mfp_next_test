// import { i18n } from 'next-i18next';
import { i18n } from 'next-i18next';
import { requestTypesKeys } from 'src/constants/requestTypes';

export const description = i18n.t('common.embed_store_desc');
export const checkValues = [{
  label: i18n.t('common.video_shout'),
  value: `${requestTypesKeys.shoutout},${requestTypesKeys.event},${requestTypesKeys.qa}`
}, {
  label: i18n.t('common.direct_mesgs'),
  value: `${requestTypesKeys.message}`
}, {
  label: i18n.t('common.social_interactions'),
  value: `${requestTypesKeys.socialShoutout}`
}, {
  label:  i18n.t('common.fun_video'),
  value: `${requestTypesKeys.digitalGoods}`
}, {
  label: i18n.t('common.personalized_merch'),
  value: `${requestTypesKeys.products}`
}, {
  label: i18n.t('common.commercial_request_only_link'),
  value: `${requestTypesKeys.commercial},${requestTypesKeys.promotion}`
}]

export const fontList = [{
  label: 'Default',
  value: null
}
,{
  label: 'Arial',
  value: 'Arial',
}, {
  label: 'Roboto',
  value: 'Roboto',
}, {
  label: 'Times New Roman',
  value: 'Times New Roman',
}, {
  label: 'Times',
  value: 'Times',
}, {
  label: 'Verdana',
  value: 'Verdana',
}, {
  label: 'Georgia',
  value: 'Georgia',
}, {
  label: 'Palatino',
  value: 'Palatino',
}, {
  label: 'Garamond',
  value: 'Garamond',
}, {
  label: 'Bookman',
  value: 'Bookman',
}]

export const previewUrl = 'https://yourwebsite.myfanpark.com';
