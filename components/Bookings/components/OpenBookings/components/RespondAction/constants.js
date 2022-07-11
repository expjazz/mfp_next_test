import { requestTypesKeys } from 'src/constants/requestTypes';

export const uploadTitles = (name, t) => ({
  [requestTypesKeys.shoutout]: t('common.shoutoutFor', {name}),
  [requestTypesKeys.event]: t('common.announcementFor', {name}),
  [requestTypesKeys.qa]: t('common.qaFor', {name}),
});
