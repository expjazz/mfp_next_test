import { i18n } from 'next-i18next';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import i18n from 'i18next';

export const getOccasion = occasion => ({
  [requestTypesKeys.shoutout]: i18n.t('common.occasionType.shoutOccasion', {occasion}),
  [requestTypesKeys.event]: i18n.t('common.occasionType.announceOccasion', {occasion}),
  [requestTypesKeys.qa]: i18n.t('common.a&a'),
  [requestTypesKeys.commercial]: i18n.t('common.occasionType.commercial'),
});

export const getreqOptions = requests => {
  return [
    {
      id: 'all',
      title: i18n.t('common.all_request_type'),
      count: requests?.all_request_count || 0,
    },
    {
      id: requestTypesKeys.shoutout,
      title: i18n.t('common.video_shoutouts'),
      count: requests.video_shout_out,
    },
    {
      id: requestTypesKeys.message,
      title: i18n.t('common.direct_messages'),
      count: requests.dm,
    },
    {
      id: requestTypesKeys.socialShoutout,
      title: i18n.t('common.social_media'),
      count: requests.social,
    },
    {
      id: 'live',
      title: i18n.t('common.live_calls'),
      count: requests.live_call,
    },
    {
      id: requestTypesKeys.digitalGoods,
      title: i18n.t('common.fun_stuff'),
      count: requests.fun_stuff,
    },
    {
      id: requestTypesKeys.products,
      title: i18n.t('common.personalized_merch_small'),
      count: requests.merch,
    },
    {
      id: requestTypesKeys.commercial,
      title: i18n.t('common.commercial_requests'),
      count: requests.commercial,
    },
    {
      id: requestTypesKeys.promotion,
      title: i18n.t('common.commercial_social'),
      count: requests.commercial_social,
    },
    {
      id: 'sample',
      title: i18n.t('common.sample_requests'),
      count: requests.sample,
    },
  ].filter(option => option.count > 0);
};
