// import i18n from 'i18next';

const i18n = { t: value => value }

export const filterOptions = t => [
  {
    title: t('common.all_time'),
    id: '',
  },
  {
    title: t('common.this_month'),
    id: '0',
  },
  {
    title: t('common.last_month'),
    id: '1',
  },
  {
    title: t('common.last_year'),
    id: '3',
  },
  {
    title: t('common.last_3_months'),
    id: '6',
  },
  {
    title: t('common.last_6_months'),
    id: '12',
  },
];

export const detailsOptions = t => [
  { label: t('common.video_shout'), key: 'video_shoutouts' },
  { label: t('common.direct_mesgs'), key: 'direct_message' },
  { label: t('common.social_interactions'), key: 'social' },
  { label: t('common.fun_items'), key: 'fun_stuff' },
  { label: t('common.merch_purchase'), key: 'merch' },
  { label: t('common.comm_req'), key: 'commercial' },
];
