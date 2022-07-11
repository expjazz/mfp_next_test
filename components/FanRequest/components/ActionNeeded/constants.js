import { requestTypesKeys } from 'src/constants/requestTypes';

export const getReactionText = (t) => ({
  [requestTypesKeys.shoutout]: t('actionneeded.shoutoutRequest'),
  [requestTypesKeys.event]: t('actionneeded.shoutoutRequest'),
  [requestTypesKeys.qa]: t('actionneeded.shoutoutRequest'),
  [requestTypesKeys.commercial]: t('actionneeded.commercial'),
  [requestTypesKeys.socialShoutout]: t('actionneeded.socialInteraction'),
  [requestTypesKeys.digitalGoods]: t('actionneeded.funStuff'),
  [requestTypesKeys.products]: t('actionneeded.merch'),
  [requestTypesKeys.promotion]: t('actionneeded.commercial'),
});
