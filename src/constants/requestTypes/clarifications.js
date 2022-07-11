import { requestTypesKeys } from './index';

export const clarificationTypes = [
  requestTypesKeys.products,
  requestTypesKeys.digitalGoods,
  requestTypesKeys.promotion,
  requestTypesKeys.socialShoutout,
  requestTypesKeys.message,
  requestTypesKeys.commercial,
  requestTypesKeys.qa,
  requestTypesKeys.event,
  requestTypesKeys.shoutout,
]

export const clarifyStatus = {
  1: 'no_message',
  2: 'waiting_clarify',
  3: 'clarify_receive',
}
