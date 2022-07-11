const i18n = { t: value => value }
import { requestTypesKeys } from "../../src/constants/requestTypes";

export const Products = [{
  label: i18n.t('common.video_shoutouts'),
  value: 'shoutout',
  type: [requestTypesKeys.shoutout, requestTypesKeys.event, requestTypesKeys.qa],
}, {
  label: i18n.t('common.direct_messages'),
  value: 'chat',
  type: [requestTypesKeys.message],
}, {
  label: i18n.t('common.social_media_interactions'),
  value: 'social',
  type: [requestTypesKeys.socialShoutout],
} , {
  label: i18n.t('common.live_calls'),
  value: 'live',
  type: [requestTypesKeys.digitalGoods],
}, {
  label: i18n.t('common.fun_experiences'),
  value: 'fun',
  type: [requestTypesKeys.digitalGoods],
}, {
  label: i18n.t('common.personalized_merch'),
  value: 'merch',
  type: [requestTypesKeys.products],
}, {
  label: i18n.t('common.commercial_requests'),
  value: 'commercial',
  type: [requestTypesKeys.commercial, requestTypesKeys.promotion],
}];

export const services = {
  'products': requestTypesKeys.products,
  'fun_stuff': requestTypesKeys.digitalGoods,
  'social_promotions': requestTypesKeys.promotion,
  'social_shout_out': requestTypesKeys.socialShoutout,
  'live_call': 'live',
  'direct_message': requestTypesKeys.message,
  'commercial': requestTypesKeys.commercial,
  'question_answer': requestTypesKeys.qa,
  'announcement': requestTypesKeys.event,
  'personalised_video': requestTypesKeys.shoutout,
}
