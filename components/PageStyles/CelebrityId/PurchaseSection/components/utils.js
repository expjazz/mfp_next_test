
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { customFontIcon } from 'src/constants/';

export const socialIcons = t => ({
  facebook: {
    key: 'facebook',
    title: t('common.facebook'),
    icon: faFacebookF,
    url: 'facebook.com/',
  },
  twitter: {
    key: 'twitter',
    title: t('common.twitter'),
    icon: faTwitter,
    url: 'twitter.com/',
  },
  instagram: {
    key: 'instagram',
    title: t('common.instagram'),
    icon: faInstagram,
    url: 'instagram.com/',
  },
  linkedin: {
    key: 'linkedin',
    title: t('common.linkedin'),
    icon: faLinkedinIn,
    url: 'linkedin.com/',
  },
  tiktok: {
    key: 'tiktok',
    title: t('common.tiktok'),
    icon: customFontIcon.tikTok,
    url: 'tiktok.com/',
  },
});
