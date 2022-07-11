import { i18n } from "next-i18next";


export const typeList = [
  {
    label: i18n.t('common.purchased_followers'),
    value: 'both',
  },
  {
    label: i18n.t('common.purchased'),
    value: 'purchaser',
  },
  {
    label: i18n.t('common.followers'),
    value: 'followers',
  },
];
