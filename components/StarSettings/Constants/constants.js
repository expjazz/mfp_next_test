import {
  faUser,
  faKey,
  faLink,
  faSitemap,
  faUsers,
  faUniversity,
  faBell,
} from '@fortawesome/pro-light-svg-icons';
import { isPipt } from 'customHooks/domUtils';
const entity = value => value
export const getLinks = ({ t, entityData={}, userDetails={} }) => {
  let links = [];
  const truzoBool = value =>{
    if (userDetails.truzo_auth_status === 'live' ) {
      return true
    }
    return value
  }
  if (isPipt(userDetails)) {
    links = [
      {
        linkName: t('common.account_settings.personal_info'),
        selectedName: 'Account',
        url: '/manage/settings/account-info',
        completed: true,
        moboLinkName: t('common.account_settings.personal_info'),
        info: t('common.account_settings.personal_info_info'),
        moboIcon: faUser,
      },
      {
        linkName: t('common.account_settings.password'),
        selectedName: 'Password',
        url: '/manage/settings/password',
        completed: false,
        moboLinkName: t('common.account_settings.password'),
        info: t('common.account_settings.password_info'),
        moboIcon: faKey,
      },

      {
        linkName: t('common.site-settings'),
        selectedName: 'lang',
        url: '/manage/settings/site-settings',
        completed: true,
        moboLinkName: t('common.site-settings'),
        info:t('common.setSitePreference'),
        moboIcon: faSitemap,
      },
      // {
      //     linkName: 'Add to your site',
      //     selectedName: 'site',
      //     url: '/manage/settings/embed-store',
      //     completed: false,
      //     moboLinkName: 'Add to your site',
      //     info: 'Sell experiences on your personal website',
      //     moboIcon: faSitemap,
      //   },
        ...entityData.allow_star_referral ? [{
          linkName: t('common.account_settings.get_more'),
          selectedName: 'Increase-earnings',
          url: '/manage/settings/referral',
          completed: false,
          moboLinkName:  t('common.account_settings.increase_earnings'),
          info: t('common.account_settings.increase_earnings_info'),
          moboIcon: faUsers,
        }] : [],
        ...userDetails.stripe_payouts ? [{
          linkName: t('common.account_settings.banking'),
          selectedName: 'Banking',
          url: '/manage/settings/payment',
          completed: truzoBool(false),
          moboLinkName: t('common.account_settings.banking'),
          info: t('common.account_settings.banking_info'),
          moboIcon: faUniversity,
        }] : [],
      ];
  } else {

    links = [
      {
        linkName: t('common.account_settings.personal_info'),
        selectedName: 'Account',
        url: '/manage/settings/account-info',
        completed: true,
        moboLinkName: t('common.account_settings.personal_info'),
        info: t('common.account_settings.personal_info_info'),
        moboIcon: faUser,
      },
      {
        linkName: t('common.account_settings.password'),
        selectedName: 'Password',
        url: '/manage/settings/password',
        completed: false,
        moboLinkName: t('common.account_settings.password'),
        info: t('common.account_settings.password_info'),
        moboIcon: faKey,
      },
      {
        linkName: t('common.account_settings.url',{storeNameCaps:entityData?.storeNameCaps}),
        selectedName: 'starURL',
        url: '/manage/settings/starsona-url',
        completed: true,
        moboLinkName: t('common.account_settings.url',{storeNameCaps:entityData?.storeNameCaps}),
        info: t('common.account_settings.url_info',{storeNameSmall:entityData?.storeNameSmall}),
        moboIcon: faLink,
      },
      {
        linkName: t('common.site-settings'),
        selectedName: 'lang',
        url: '/manage/settings/site-settings',
        completed: true,
        moboLinkName: t('common.site-settings'),
        info:t('common.setSitePreference'),
        moboIcon: faSitemap,
      },
      //{
      //    linkName: 'Add to your site',
      //    selectedName: 'site',
      //    url: '/manage/settings/embed-store',
      //    completed: false,
      //    moboLinkName: 'Add to your site',
      //    info: 'Sell experiences on your personal website',
      //    moboIcon: faSitemap,
      //  },
        ...entityData.allow_star_referral ? [{
          linkName: t('common.account_settings.get_more'),
          selectedName: 'Increase-earnings',
          url: '/manage/settings/referral',
          completed: false,
          moboLinkName:  t('common.account_settings.increase_earnings'),
          info: t('common.account_settings.increase_earnings_info'),
          moboIcon: faUsers,
        }] : [],
        ...userDetails.stripe_payouts ? [{
          linkName: t('common.account_settings.banking'),
          selectedName: 'Banking',
          url: '/manage/settings/payment',
          completed: truzoBool(false),
          moboLinkName: t('common.account_settings.banking'),
          info: t('common.account_settings.banking_info'),
          moboIcon: faUniversity,
        }] : [],
        {
          linkName: t('common.account_settings.notification'),
          selectedName: 'Notification',
          url: '/manage/settings/notification',
          completed: false,
          moboLinkName: t('common.account_settings.notification'),
          info: t('common.account_settings.notification_info',{purchaserSingle:entityData?.purchaserSingle}),
          moboIcon: faBell,
        },
      ];

    }
  return links;
};
