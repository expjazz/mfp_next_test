import { requestTypesKeys } from "../../../src/constants/requestTypes";

export const starAllowedServices = {
  'products': requestTypesKeys.products,
  'fun_stuff': requestTypesKeys.digitalGoods,
  'social_promotions': requestTypesKeys.promotion,
  'social_shout_out': requestTypesKeys.socialShoutout,
  'direct_message': requestTypesKeys.message,
  'commercial': requestTypesKeys.commercial,
  'live_call': 'live',
  'question_answer': requestTypesKeys.qa,
  'announcement': requestTypesKeys.event,
  'personalised_video': requestTypesKeys.shoutout,
}

export const serviceKeys = {
  [requestTypesKeys.products]: 'products',
  [requestTypesKeys.digitalGoods]: 'fun_stuff',
  [requestTypesKeys.promotion]: 'social_promotions',
  [requestTypesKeys.socialShoutout]: 'social_shout_out',
  [requestTypesKeys.message]: 'direct_message',
  [requestTypesKeys.commercial]: 'commercial',
  [requestTypesKeys.qa]: 'question_answer',
  [requestTypesKeys.event]: 'announcement',
  [requestTypesKeys.shoutout]: 'personalised_video',
}