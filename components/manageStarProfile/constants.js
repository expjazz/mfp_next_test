import React from 'react';
import {
  faUser,
  faIdCard,
  faFileAlt,
  faVideo,
  faTags,
} from '@fortawesome/pro-light-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
const entity = value => value
export const STAR_PROFILE = (t, entityData) => ({
  DESCRIPTION: t('star_profile.description',{siteName:entityData?.siteName}),
  INNER_LINKS: [
    {
      linkName: t('star_profile.basic_info'),
      selectedName: 'name&photo',
      url: '/manage/storefront/profile/name-photo',
      moboLinkName: t('star_profile.basic_info'),
      info: t('star_profile.basic_info_info'),
      moboIcon: faUser,
    },
    {
      linkName: t('star_profile.personalize',{storeNameSmall:entityData?.storeNameSmall}),
      selectedName: 'pagedeign',
      url: '/manage/storefront/profile/page-design',
      moboLinkName: t('star_profile.personalize_store'),
      info: t('star_profile.update_look',{storeNameSmall:entityData?.storeNameSmall}),
      moboIcon: faIdCard,
    },
    {
      linkName: t('star_profile.describe_yourself'),
      selectedName: 'bio',
      url: '/manage/storefront/profile/bio',
      moboLinkName: t('star_profile.describe_yourself'),
      info: t('star_profile.intro',{purchaserPlural:entityData?.purchaserPlural}),
      moboIcon: faFileAlt,
    },
    {
      linkName: t('star_profile.welcome',{purchaserPlural:entityData?.purchaserPlural}),
      selectedName: 'Welcome-fans',
      url: '/manage/storefront/profile/welcome-video',
      moboLinkName: t('star_profile.welcome_fans'),
      info: t('star_profile.intro_video',{purchaserPlural:entityData?.purchaserPlural}),
      moboIcon: faVideo,
    },
    {
      linkName: t('star_profile.best_known'),
      selectedName: 'industry',
      url: '/manage/storefront/profile/industry',
      moboLinkName: t('star_profile.best_known'),
      info: t('star_profile.discover_txt',{purchaserPlural:entityData?.purchaserPlural}),
      moboIcon: faTags,
    },
    {
      linkName: t('star_profile.link_social'),
      selectedName: 'social',
      url: '/manage/storefront/profile/social-handles',
      moboLinkName: t('star_profile.link_social'),
      info: t('star_profile.connect_channels'),
      moboIcon: faInstagram,
    },
  ],

  SOCIAL_HANDLE: {
    subtitle: t('star_profile.add_social'),
    heading: t('star_profile.link_social'),
  },
  PRICE_AND_LIMITS: {
    confirmDescription: t('star_profile.price_limits.confirmDescription',{purchaserPlural:entityData?.purchaserPlural}),
    description: t('star_profile.price_limits.description',{purchaserPlural:entityData?.purchaserPlural}),
    title: t('star_profile.price_limits.title'),
    confirmationTitle: t('star_profile.price_limits.confirmationTitle'),
    titleMobile: t('star_profile.price_limits.titleMobile')
  },
  CHARITY: {
    titleCharity: t('star_profile.charity.titleCharity'),
    subtitleCharity: t('star_profile.charity.subtitleCharity',{purchaserPlural:entityData?.purchaserPlural}),
    titleFund: t('star_profile.charity.titleFund'),
    subtitleFund: t('star_profile.charity.subtitleFund',{purchaserPlural:entityData?.purchaserPlural}),
  },
  TAGS: {
    subtitle: t('star_profile.tags.subtitle',{purchaserPlural:entityData?.purchaserPlural}),
  },
});
