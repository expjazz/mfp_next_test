import {
  faHandshakeAlt,
  faListAlt,
  faGlobe,
  faPlug
} from '@fortawesome/pro-light-svg-icons';
export const links = (t, entityData) => ([
  {
    linkName: `  ${t('services.preferenceLink1', { purchaser: entityData?.purchSingleCap })}`,
    key: 'fan-engagement',
    url: '/manage/storefront/services/preferences/engagement',
    icon: faHandshakeAlt,
  },
  {
    linkName: `  ${t('services.preferenceLink2')}`,
    key: 'off-limit-topics',
    url: '/manage/storefront/services/preferences/off-limit',
    icon: faListAlt,
  },
  {
    linkName: `  ${t('services.preferenceLink3')}`,
    key: 'Languages',
    url: '/manage/storefront/services/preferences/languages',
    icon: faGlobe,
  },
  // {
  //   linkName: `  ${t('services.preferenceLink4')}`,
  //   key: 'connect-social',
  //   url: '/manage/storefront/services/preferences/connect-social',
  //   icon: faPlug,
  // },
]);
