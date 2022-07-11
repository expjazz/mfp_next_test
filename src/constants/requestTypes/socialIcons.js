import i18n from 'i18next';

import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faWikipediaW,
  faImdb,
} from '@fortawesome/free-brands-svg-icons';
import { customFontIcon } from '..';
// import { customFontIcon } from 'constants/';


export const socialIcons = [
  {
    key: 'facebook',
    title: i18n.t('common.facebook'),
    icon: faFacebookF,
    url: 'facebook.com/',
  }, {
    key: 'twitter',
    title: i18n.t('common.twitter'),
    icon: faTwitter,
    url: 'twitter.com/'
  }, {
    key: 'instagram',
    title: i18n.t('common.instagram'),
    icon: faInstagram,
    url: 'instagram.com/'
  }, {
    key: 'linkedin',
    title: i18n.t('common.linkedin'),
    icon: faLinkedinIn,
    url: 'linkedin.com/'
  }, {
    key: 'tiktok',
    title: i18n.t('common.tiktok'),
    icon: customFontIcon.tikTok,
    url: 'tiktok.com/'
  }, {
    key: 'wikipedia',
    title: i18n.t('common.wikipedia'),
    icon: faWikipediaW,
    url: 'wikipedia.com/'
  }, {
    key: 'imdb',
    title: i18n.t('common.Imdb'),
    icon: faImdb,
    url: 'imdb.com/'
  },
]
