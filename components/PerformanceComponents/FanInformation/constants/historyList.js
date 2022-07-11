import { i18n } from "next-i18next";

export const historyList = [
  {
    label: i18n.t('common.all_time'),
    value: '',
  },
  {
    label: i18n.t('common.last_30_days'),
    value: '1',
  },
  {
    label: i18n.t('common.last_60_days'),
    value: '2',
  },
  {
    label: i18n.t('common.last_6_months'),
    value: '6',
  },
  {
    label: i18n.t('common.last_year'),
    value: '12',
  },
];
