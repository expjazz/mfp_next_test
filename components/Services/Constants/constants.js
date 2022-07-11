import React from 'react';
import {ReactSVG} from 'react-svg';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faComments,
  faVideo,
  faStar,
  faShoppingCart,
  faMicrophone,
  faBuilding,
  faCog,
} from '@fortawesome/pro-light-svg-icons';
import { capitalize } from '@material-ui/core';

const getIcon = () => (
  <ReactSVG src="/images/shoutout-icon.svg" class="cus-icon" />
);

export const getLinks = (t,services, entityData={}, userDetails={}) => {
  const links = [
    ...entityData.allow_video_shoutout ? [{
      linkName: t("common.services.links.video_shoutouts"),
      key: 'PersonalizedVideos',
      url: '/manage/storefront/services/personalized-videos',
      moboLinkName: t("common.services.links.video_shoutouts"),
      info: t("common.services.links.video_shoutouts_info"),
      cusIcon: getIcon(),
      completed:
        services.personalised_video ||
        services.announcement ||
        services.question_answer,
    }]: [],
    ...entityData.allow_direct_message ? [{
      linkName: t("common.services.links.direct_messages"),
      key: 'DirectMessages',
      url: '/manage/storefront/services/direct-messages',
      moboLinkName: t("common.services.links.direct_messages"),
      info: t("common.services.links.direct_messages",{purchaserSingle:entityData?.purchaser_plural_name}),
      moboIcon: faComments,
      completed: services.direct_message
    }]: [],
    ...entityData.allow_social_shoutout ? [{
      linkName: t("common.services.links.social_media"),
      key: 'SocialMedia',
      url: '/manage/storefront/services/social-media',
      moboLinkName: t("common.services.links.social_media"),
      info: t("common.services.links.social_media_info",{purchaserPlural:entityData?.purchaser_plural_name}),
      moboIcon: faInstagram,
      completed: services.social_shout_out
    }]: [],
    ...entityData.allow_live_call ? [{
      linkName: t("common.services.links.live_calls"),
      key: 'LiveCalls',
      url: '/manage/storefront/services/live-call',
      moboLinkName: t("common.services.links.live_calls"),
      info: t("common.services.links.live_calls_info"),
      moboIcon: faVideo,
      completed: services.live_call
    }]: [],
    ...entityData.allow_funstuff ? [{
      linkName: t("common.services.links.fun_stuff"),
      key: 'FunStuff',
      url: '/manage/storefront/services/fun-stuff',
      moboLinkName: t("common.services.links.fun_stuff"),
      info: t("common.services.links.fun_stuff_info",{purchaserPlural:entityData?.purchaser_plural_name}),
      moboIcon: faStar,
      completed: services.fun_stuff
    }]: [],
    ...entityData.allow_product ? [{
      linkName: t("common.services.links.personalized_merch"),
      key: 'Autographed',
      url: '/manage/storefront/services/products',
      moboLinkName: t("common.services.links.personalized_merch"),
      info: t("common.services.links.personalized_merch_info"),
      moboIcon: faShoppingCart,
      completed: services.products
    }]: [],
    ...entityData.allow_commercial ? [{
      linkName: t("common.services.links.commercial"),
      key: 'Commercial',
      url: '/manage/storefront/services/commercial/video-shoutout',
      moboLinkName: t("common.services.links.commercial"),
      info: t("common.services.links.commercial_info"),
      moboIcon: faMicrophone,
      completed: services.commercial
    }]: [],
    ...entityData.allow_social_commercial ? [{
      linkName: t("common.services.links.commercial_social"),
      key: 'Commercialsocial',
      url: '/manage/storefront/services/commercial/social-media',
      moboLinkName: t("common.services.links.commercial_social"),
      info: t("common.services.links.commercial_social_info"),
      moboIcon: faBuilding,
      completed: services.social_promotions
    }]: [],
    {
      linkName: t("common.services.links.preferences"),
      key: 'SocialMediaCommercial',
      completed: true,
      maxHeight: 200,
      sel_url: '/manage/storefront/services/preferences',
      moboLinkName: t("common.services.links.preferences"),
      info: t("common.services.links.preferences_info"),
      moboIcon: faCog,
      subMenu: [
        {
          linkName: t("common.services.links.preferences_menu_1",{purchaserSingleCap:capitalize(entityData?.purchaser_singular_name)}),
          key: 'fan-engagement',
          url: '/manage/storefront/services/preferences/engagement',
        },
        {
          linkName: t("common.services.links.preferences_menu_2"),
          key: 'off-limit-topics',
          url: '/manage/storefront/services/preferences/off-limit',
        },
        {
          linkName: t("common.services.links.preferences_menu_3"),
          key: 'Languages',
          url: '/manage/storefront/services/preferences/languages',
        },
        // ...(userDetails.allow_posts ? [{
        //   linkName: t("common.services.links.preferences_menu_4"),
        //   key: 'social-connect',
        //   url: '/manage/storefront/services/preferences/connect-social',
        // }] : []),
      ],
    },
    {
      linkName: t("common.services.links.select_feature"),
      key: 'social-exp',
      url: '/manage/storefront/services/social-exp',
      moboLinkName: t("common.services.links.select_feature"),
      completed: services.featured
    },
  ];

  return links;
};
