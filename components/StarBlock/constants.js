import React from 'react';
import {ReactSVG} from 'react-svg';
import {
  faStar,
  faMobileAndroidAlt,
  faVideo,
  faShoppingBag,
} from '@fortawesome/pro-light-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const getIcon = () => (
  <ReactSVG src="/images/shoutout-icon.svg" class="cus-icon" />
);

const getServicesIcons =  ({
  allow_video_shoutout,
  allow_direct_message,
  allow_funstuff,
  allow_social_shoutout,
  allow_live_call,
  allow_product,
}) => [
  ...allow_video_shoutout ? [{
    keys: ['personalised_video', 'announcement', 'question_answer'],
    cusIcon: getIcon(),
  }]: [],
  ...allow_direct_message ? [{
    keys: ['direct_message'],
    icon: faMobileAndroidAlt,
  }] : [],
  ...allow_social_shoutout ? [{
    keys: ['social_shout_out'],
    icon: faInstagram,
  }] : [],
  ...allow_funstuff ? [{
    keys: ['fun_stuff'],
    icon: faStar,
  }] : [],
  ...allow_live_call ? [{
    keys: ['live_call'],
    icon: faVideo,
  }] : [],
  ...allow_product ? [{
    keys: ['products'],
    icon: faShoppingBag,
  }] : [],
];

export { getServicesIcons };
