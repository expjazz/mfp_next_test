import {
  faListAlt,
  faBullhorn,
  faChartLine,
  faStreetView,
  faCog,
  faHeadset,
  faStarExclamation,
  faPaintBrush,
  faLightbulb,
} from '@fortawesome/pro-light-svg-icons';
import { isPipt } from 'customHooks/domUtils';
// import { isPipt } from 'customHooks/domUtils';
const entity = value => value
const getUrl = (isMobile, url) => {
  if (isMobile) return { url };
  return { sel_url: url };
};

export const getStoreSubMenu = (t, isMobile, sugCount, entityData) => {
  return [
    {
      linkName: `${t('starmange_mainlinks.managePurchaseExp', {
        purchase: entityData?.purchaserSingle,
      })}`,
      key: 'DirectMessages',
      url: '/manage/storefront/services',
      arrow: false,
      icon: isMobile ? faStarExclamation : null,
    },
    {
      linkName: `${t('starmange_mainlinks.designYourPage', {
        page: entityData?.storeNameSmall,
      })}`,
      key: 'SocialMedia',
      url: '/manage/storefront/profile',
      arrow: false,
      icon: isMobile ? faPaintBrush : null,
    },
    ...(entityData.allow_fan_suggestion
      ? [
          {
            linkName: `${t('starmange_mainlinks.checkoutPurchaserSugg', {
              purchase: entityData?.purchaserSingle,
            })}`,
            key: 'suggestions',
            url: '/manage/storefront/fan-suggestions',
            arrow: false,
            icon: isMobile ? faLightbulb : null,
            reqCount: sugCount,
          },
        ]
      : []),
  ];
};

export const getLinks = ({
  t,
  reqCount,
  isMobile,
  sugCount,
  entityData = {},
  userDetails = {}
}) => {
  let links = [];
  if (isPipt(userDetails)) {
    links = [

      {
        linkName: t('starmange_mainlinks.accountSettings'),
        key: 'account-settings',
        url: '/manage/settings',
        icon: faCog,
        arrow: false,
      }
    ];
  } else {

    links = [
      {
        linkName: t('starmange_mainlinks.requests'),
        key: 'bookings',
        url: '/manage/bookings',
        icon: faListAlt,
        reqCount,
        arrow: false,
      },
      {
        linkName: `${t('starmange_mainlinks.promoteYourPage', {
          page: entityData?.storeNameSmall,
        })}`,
        key: 'storefront-promote',
        url: '/manage/promote',
        icon: faBullhorn,
        arrow: false,
      },
    ...(entityData.allow_star_earnings ||
      entityData.allow_star_performance ||
      entityData.allow_star_fan_data
      ? [
        {
          linkName: t('starmange_mainlinks.reviewyourEarnings'),
          key: 'earnings',
          url: '/manage/performance',
          icon: faChartLine,
          arrow: false,
        },
      ]
      : []),
      {
        linkName: `${t('starmange_mainlinks.manageYourPage', {
          page: entityData?.storeNameSmall,
        })}`,
        key: 'storefront-manage',
        ...getUrl(isMobile, '/manage/storefront'),
        icon: faStreetView,
        arrow: false,
        subMenu: getStoreSubMenu(t, isMobile, sugCount, entityData),
        reqCount: sugCount,
      },
      {
        linkName: t('starmange_mainlinks.accountSettings'),
        key: 'account-settings',
        url: '/manage/settings',
        icon: faCog,
        arrow: false,
      },
      {
        linkName: t('starmange_mainlinks.contactConcierge'),
        key: 'star-concierge',
        url: '/manage/tools/star-concierge',
        icon: faHeadset,
        arrow: false,
      },
    ];
  }

  return links;
};
