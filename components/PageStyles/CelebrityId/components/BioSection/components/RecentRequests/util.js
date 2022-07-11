import React from 'react';
// import i18n from 'i18next';
// import { requestTypes } from 'src/constants/requestTypes';
// import { socialIcons } from 'constants/requestTypes/socialIcons';
// import { purchaseUrl } from 'constants/url';
import { purchaseUrl } from '../../../../../../../src/constants/url';
import {
  faComments,
  faMicrophone,
  faStar,
  faShoppingBag,
} from '@fortawesome/pro-light-svg-icons';
import { requestTypes } from '../../../../../../../src/constants/requestTypes';
import { socialIcons } from '../../../../../../../src/constants/requestTypes/socialIcons';
// import { i18n } from 'next-i18next';

const i18n = {
  t: value => value
}
const getIcon = item => {
  const socialObject =
    socialIcons.find(
      icon =>
        icon.key ===
        item.social_request_details.social_media_title.social_media,
    ) || {};
  return socialObject.icon;
};

const shoutIcon = (
  <img
    className="shout-icon"
    alt="shout-icon"
    src="/images/shoutout-icon.svg"
  ></img>
);

const getBookingData = (data, item, key) => {
  return {
    ...data,
    socialAction: data.title,
    socialMedia: data.social_media
      ? data.social_media.charAt(0).toUpperCase() + data.social_media.slice(1)
      : '',
    description: data.description,
    type: item.request_type,
    bookTitle: i18n.t('common.request_for'),
    title: `${data.title}`,
    rate: data.amount || data.price,
    id: data[key],
  };
};

export const getDetails = (item, starNM, celebDetails, userId, t) => {
  switch (requestTypes[item.request_type]) {
    case 'Products':
      if (item.product_request_details.product) {
        return {
          desc: `${item.fan_first_name} just bought: ${item.product_request_details.product.title}`,
          image:
            item.product_request_details.product.product_image &&
            item.product_request_details.product.product_image[0],
          btnTitle: t('common.merchBtn'),
          icon:
            item.product_request_details.product.product_image &&
            item.product_request_details.product.product_image[0]
              ? null
              : faShoppingBag,
          lineClamb: 4,
          url: `/${userId}${purchaseUrl[item.request_type]}/${
            item.product_request_details.product.slug
          }`,
          bookingData: getBookingData(
            item.product_request_details.product,
            item,
            'product_id',
          ),
        };
      }
      return {};
    case 'digitalGoods':
      if (item.fun_stuff_request_details.fun_stuff) {
        return {
          desc: `${item.fan_first_name} just purchased: ${item.fun_stuff_request_details.fun_stuff.title}`,
          image: item.fun_stuff_request_details.fun_stuff.sample_image,
          btnTitle: t('common.fun_Stuff'),
          icon: item.fun_stuff_request_details.fun_stuff.sample_image
            ? null
            : faStar,
          lineClamb: 4,
          url: `/${userId}${purchaseUrl[item.request_type]}/${
            item.fun_stuff_request_details.fun_stuff.slug
          }`,
          bookingData: getBookingData(
            item.fun_stuff_request_details.fun_stuff,
            item,
            'fun_stuff_id',
          ),
        };
      }
      return {};
    case 'Social Promotion':
      if (item.social_request_details.social_media_title) {
        return {
          desc: t('common.promotion_desc',{fan_first_name:item.fan_first_name}),
          image: '',
          btnTitle: t('common.promotion'),
          icon: getIcon(item),
          url: `/${userId}${purchaseUrl[item.request_type]}/${
            item.social_request_details.social_media_title.slug
          }`,
          bookingData: getBookingData(
            item.social_request_details.social_media_title,
            item,
            'id',
          ),
        };
      }
      return {};
    case 'Social Shout-out':
      if (item.social_request_details.social_media_title) {
        return {
          desc: t('common.social_desc',{fan_first_name:item.fan_first_name}),
          image: '',
          btnTitle: t('common.socialBtn'),
          url: `/${userId}${purchaseUrl[item.request_type]}/${
            item.social_request_details.social_media_title.slug
          }`,
          icon: getIcon(item),
          bookingData: getBookingData(
            item.social_request_details.social_media_title,
            item,
            'id',
          ),
        };
      }
      return {};
    case 'Message':
      if (item.direct_message_details) {
        return {
          desc: t('common.message_desc',{fan_first_name:item.fan_first_name, star:starNM}),
          image: '',
          url: `/${userId}${purchaseUrl[item.request_type]}`,
          btnTitle: t('common.chat_with_me'),
          icon: faComments,
        };
      }
      return {};
    case 'Commercial':
      return {
        desc: t('common.commercial_desc',{fan_first_name:item.fan_first_name}),
        image: '',
        url: `/${userId}${purchaseUrl[item.request_type]}`,
        btnTitle: t('common.commercialCap'),
        icon: faMicrophone,
      };
    case 'Q&A':
      return {
        desc: t('common.qa_desc',{fan_first_name:item.fan_first_name}),
        image: '',
        btnTitle: t('common.qaBtn'),
        url: `/${userId}${purchaseUrl[item.request_type]}`,
        icon: faMicrophone,
      };
    case 'Event':
      return {
        desc: t('common.event_desc',{fan_first_name:item.fan_first_name}),
        image: '',
        url: `/${userId}${purchaseUrl[item.request_type]}`,
        btnTitle: t('common.announcementCap'),
        icon: faMicrophone,
      };
    default:
      return {
        desc: t('common.shoutout_desc',{fan_first_name:item.fan_first_name}),
        image: '',
        url: `/${userId}${purchaseUrl[item.request_type]}`,
        btnTitle: t('common.shoutoutCap'),
        icon: null,
        cusIcon: shoutIcon,
      };
  }
};
