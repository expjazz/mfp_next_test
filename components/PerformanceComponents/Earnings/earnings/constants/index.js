// import i18n from 'i18next';
// const i18n = {
//   t: value => value

const i18n = { t: value => value }

// }
export const options = t => [
  {
    title: t('common.all'),
    id: 'all',
  },
  {
    title: t('earnings.pending_payments'),
    id: 'pending',
  },
  {
    title: t('common.orderStatus.paid'),
    id: 'paid',
  },
];

export const filterOptions = t => [
  {
    title: t('common.all_time'),
    id: 'entireHistory',
  },
  {
    title: t('common.current_week'),
    id: 'week',
  },
  {
    title: t('common.current_month'),
    id: 'month',
  },
  {
    title: t('common.current_year'),
    id: 'year',
  },
  {
    title: t('common.last_month'),
    id: 'last_month',
  },
  {
    title: t('common.last_year'),
    id: 'last_year',
  },
];

export const earningList = {
  pendingPayments: i18n.t('common.ensure_earnings'),
};
