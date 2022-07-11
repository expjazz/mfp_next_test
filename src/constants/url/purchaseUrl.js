import { requestTypesKeys } from "../requestTypes";

export const URL = {
  facebookSDK: 'https://connect.facebook.net/en_US/sdk.js',
  unboundUrl: 'https://get.starsona.com',
};

export const purchaseUrl = {
  [requestTypesKeys.shoutout]: '/shoutout/shoutout',
  [requestTypesKeys.event]: '/shoutout/event',
  [requestTypesKeys.qa]: '/shoutout/qa',
  [requestTypesKeys.message]: '/chat',
  [requestTypesKeys.socialShoutout]: '/social',
  [requestTypesKeys.digitalGoods]: '/fun',
  [requestTypesKeys.products]: '/merch',
  [requestTypesKeys.promotion]: '/commercial',
  [requestTypesKeys.commercial]: '/commercial',
  live: '/live',
};
