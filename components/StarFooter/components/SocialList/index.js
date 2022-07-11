import React from 'react';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
  faWikipediaW,
  faImdb,
} from '@fortawesome/free-brands-svg-icons';
// import { customFontIcon } from 'constants/';
import {
  IconWrapper,
} from './styled';
import { isEmpty } from '../../../../src/utils/dataStructures';
import { customFontIcon } from '../../../../src/constants';

const SocialList = ({ socialLinks, classes, config }) => {
  const getSocialLinkIcon = SocialLinkKey => {
    switch (SocialLinkKey) {
      case 'instagram_url':
        return faInstagram;
      case 'twitter_url':
        return faTwitter;
      case 'facebook_url':
        return faFacebookF;
      case 'youtube_url':
        return faYoutube;
      case 'tiktok_url':
        return customFontIcon.tikTok;
      case 'wiki_url':
        return faWikipediaW;
      case 'imdb_url':
        return faImdb;
      default:
        break;
    }
  };

  
  const getSocialLinks = () => {
    const iconsOrder = [
      'facebook_url',
      'twitter_url',
      'instagram_url',
      'youtube_url',
      'tiktok_url',
      'wikipedia_url',
      'imdb_url',
    ];
    function iconsSort(a, b) {
      if (iconsOrder.indexOf(a.social_link_key) < iconsOrder.indexOf(b.social_link_key)) {
        return -1
      }
      if (iconsOrder.indexOf(a.social_link_key) > iconsOrder.indexOf(b.social_link_key)) {
        return 1
      }
      return 0
    }
    const sortedSocialLinks = socialLinks.sort(iconsSort)
    // sortBy(socialLinks, item =>
    //   iconsOrder.indexOf(item.social_link_key),
    // );
    return sortedSocialLinks.map(socialLink => {
      if (socialLink.social_link_value) {
        if (socialLink.social_link_key === 'gigsalad_url') {
          return (
            <li className="icon-wrap" key={socialLink.social_link_key}>
              <a
                href={socialLink.social_link_value}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ReactSVG
                  className="icon gigsalad"
                  src="./images/gigsalad-vector-logo-blue.svg"
                />
              </a>
            </li>
          );
        }
        return (
          <li className="icon-wrap" key={socialLink.social_link_key}>
            <a
              href={socialLink.social_link_value}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                className="icon"
                icon={getSocialLinkIcon(socialLink.social_link_key)}
              />
            </a>
          </li>
        );
      }
      return null;
    });
  };
  if (socialLinks) {
    const exist = socialLinks.find(item => !isEmpty(item.social_link_value));
    if (isEmpty(exist)) {
      return null;
    }
  }

  return (
      <IconWrapper config={config || {}}>{getSocialLinks()}</IconWrapper>
  );
};

SocialList.defaultProps = {
  socialLinks: [],
  classes: {},
};

SocialList.propTypes = {
  socialLinks: PropTypes.array,
  classes: PropTypes.object,
};

export default SocialList;
