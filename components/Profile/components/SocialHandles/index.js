import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import ReactSVG from 'react-svg';
import {
  faFacebookF,
  faInstagram,
  faYoutube,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import Input from 'components/TextInput';
import { customFontIcon } from 'src/constants/';
import ConfirmRoute from 'components/ConfirmRoute';
import ConfirmSave from 'components/ConfirmSave';
import Button from 'components/SecondaryButton';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
import { FlexCenter } from 'styles/CommonStyled';
import { Layout, Content } from './styled';
import { socialData } from './constants';
import { useMediaQuery } from '@material-ui/core';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';

const SocialHandles = props => {
  const router = useRouter()
  const { t } = useTranslation();
  const { data: userData } = useFetchLoggedUser()

  const [socialLinks, setsocialLinks] = useState({});
  const [notSaved, setNotSaved] = useState(false);
  const isMobile = useMediaQuery('(max-width: 831px)');
  useEffect(() => {
    let newSocialLinks = { ...socialLinks };
    if (!userData?.user?.social_links.length) {
      newSocialLinks = {
        facebook_url: '',
        twitter_url: '',
        youtube_url: '',
        instagram_url: '',
        tiktok_url: '',
      };
    } else {
      userData?.user?.social_links.forEach(link => {
        if (socialData[link.social_link_key]) {
          newSocialLinks[link.social_link_key] =
            link.social_link_value === ''
              ? ''
              : link.social_link_value.split(
                  socialData[link.social_link_key].url,
                )[1];
        }
      });
    }
    setsocialLinks(newSocialLinks);
  }, [userData?.user?.social_links]);

  const removeBaseUrl = url => {
    const baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/;
    let result = '';
    let finalUrl = url;
    const match = baseUrlPattern.exec(finalUrl);
    if (match != null) {
      [result] = match;
    }
    if (result.length > 0) {
      finalUrl = finalUrl.replace(result, '');
    } else {
      [, finalUrl] = url
        .replace('http://', '')
        .replace('https://', '')
        .split(/[/?#]/);
    }
    if (finalUrl) return finalUrl.replace(/^\//, '');
    return url;
  };

  const onLinkChange = (event, socialKey) => {
    let urlKey = removeBaseUrl(event.target.value.trim(''));
    if (socialKey === 'tiktok_url') {
      if (!urlKey.startsWith('@')) {
        urlKey = `@${urlKey}`;
      }
    }
    const updatedSocialLinks = {
      ...socialLinks,
      [socialKey]: urlKey,
    };
    setsocialLinks(updatedSocialLinks);
    props.confirmSave({ saved: false, route: 'social-handles' });
  };

  const onSuccess = () => {
    props.confirmSave({ saved: true, route: '' });
  };

  const backHandler = () => {
    if (!props.saved?.saved) {
      setNotSaved(true);
    } else {
      props.goBack();
    }
  };

  const handleConfirm = () => {
    setNotSaved(false);
    props.confirmSave({ saved: true, route: '' });
    props.goBack();
  };

  const closeConfirmSave = () => {
    setNotSaved(false);
  };

  const saveSocialHandles = () => {
    const newSocialLinks = [];
    Object.keys(socialLinks).forEach(socialKey => {
      const newSocialItem = {
        social_link_key: socialKey,
        social_link_value:
          socialLinks[socialKey] === ''
            ? ''
            : `${socialData[socialKey].url}${socialLinks[socialKey]}`,
      };
      newSocialLinks.push(newSocialItem);
    });
    const finalUserDetails = {
      celebrity_details: {},
      user_details: {
        social_links: newSocialLinks,
      },
    };
    props.updateUserDetails(
      userData?.user?.id,
      finalUserDetails,
      onSuccess,
    );
  };
  const getInputLabel = (label, value) => {
    let fullLabel = true;
    if (value) {
      fullLabel = isMobile && value ? value.length <= 10 : value.length <= 20;
    }

    return <Content.InputLabel>{fullLabel ? label : '/'}</Content.InputLabel>;
  };
  return (
    <React.Fragment>
      <ConfirmRoute
        when={!props.saved?.saved}
        history={router}
        validateUrl="/manage/storefront/profile/social-handles"
        confirmSave={props.confirmSave}
      />
      {notSaved && (
        <ConfirmSave
          open={notSaved}
          closeModal={closeConfirmSave}
          handleConfirm={handleConfirm}
        />
      )}

      <Layout>
        <BackHeader
          backHandler={backHandler}
          label={t('common.design')}
          closeHandler={backHandler}
          noHelp
        />
        <Heading className="title">{props.heading}</Heading>
        <Content>
          <Description className="description">{props.subTitle}</Description>
          <Content.MiddleSection>
            <Content.InputWraper>
              <Input
                inputProps={{
                  defaultProps: {
                    value: socialLinks.facebook_url,
                    onChange: event => onLinkChange(event, 'facebook_url'),
                  },
                  labelObj: {
                    label: t('common.facebook'),
                  },
                  mInputProps: {
                    classes: { rest: {} },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          disableTypography
                          classes={{ root: 'adornment-root' }}
                        >
                          <FontAwesomeIcon
                            className="socialmedia-icon"
                            icon={faFacebookF}
                          />
                          {getInputLabel('/', socialLinks.facebook_url)}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Content.InputWraper>
            <Content.InputWraper>
              <Input
                inputProps={{
                  defaultProps: {
                    value: socialLinks.twitter_url,
                    onChange: event => onLinkChange(event, 'twitter_url'),
                  },
                  labelObj: {
                    label: t('common.twitter'),
                  },
                  mInputProps: {
                    classes: { rest: {} },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          disableTypography
                          classes={{ root: 'adornment-root' }}
                        >
                          <FontAwesomeIcon
                            className="socialmedia-icon"
                            icon={faTwitter}
                          />
                          {getInputLabel('/', socialLinks.twitter_url)}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Content.InputWraper>
            <Content.InputWraper>
              <Input
                inputProps={{
                  defaultProps: {
                    value: socialLinks.instagram_url,
                    onChange: event => onLinkChange(event, 'instagram_url'),
                  },
                  labelObj: {
                    label: t('common.instagram'),
                  },
                  mInputProps: {
                    classes: { rest: {} },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          disableTypography
                          classes={{ root: 'adornment-root' }}
                        >
                          <FontAwesomeIcon
                            className="socialmedia-icon"
                            icon={faInstagram}
                          />
                          {getInputLabel('/', socialLinks.instagram_url)}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Content.InputWraper>
            <Content.InputWraper>
              <Input
                inputProps={{
                  defaultProps: {
                    value: socialLinks.youtube_url,
                    onChange: event => onLinkChange(event, 'youtube_url'),
                  },
                  labelObj: {
                    label: t('common.youtube'),
                  },
                  mInputProps: {
                    classes: { rest: {} },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          disableTypography
                          classes={{ root: 'adornment-root' }}
                        >
                          <FontAwesomeIcon
                            className="socialmedia-icon"
                            icon={faYoutube}
                          />
                          {getInputLabel('/', socialLinks.youtube_url)}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Content.InputWraper>
            {/* <Content.InputWraper className="gig-sald">
              <Input
                inputProps={{
                  defaultProps: {
                    value: socialLinks.gigsalad_url,
                    onChange: event => onLinkChange(event, 'gigsalad_url'),
                  },
                  labelObj: {
                    label: 'Gig Salad',
                  },
                  mInputProps: {
                    classes: { rest: {} },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          disableTypography
                          classes={{
                            root: 'adornment-root',
                            positionStart: 'start-adornment',
                          }}
                        >
                          <ReactSVG
                            className="socialmedia-icon gigsalad-icon"
                            src=".//images/gigsalad-vector-logo-grey.svg"
                          />
                          {getInputLabel('/', socialLinks.gigsalad_url)}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Content.InputWraper> */}
            <Content.InputWraper>
              <Input
                inputProps={{
                  defaultProps: {
                    value: socialLinks.tiktok_url,
                    onChange: event => onLinkChange(event, 'tiktok_url'),
                  },
                  labelObj: {
                    label: t('common.tiktok'),
                  },
                  mInputProps: {
                    classes: { rest: {} },
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          disableTypography
                          classes={{ root: 'adornment-root' }}
                        >
                          <FontAwesomeIcon
                            className="socialmedia-icon"
                            icon={customFontIcon.tikTok}
                          />
                          {getInputLabel('/', socialLinks.tiktok_url)}
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Content.InputWraper>
          </Content.MiddleSection>
        </Content>
        <FlexCenter>
          <Button onClick={saveSocialHandles}>{t('common.save')}</Button>
        </FlexCenter>
      </Layout>
    </React.Fragment>
  );
};

SocialHandles.propTypes = {
  userDetails: PropTypes.object,
  updateUserDetails: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  heading: PropTypes.string,
  subTitle: PropTypes.string,
  history: PropTypes.object.isRequired,
  saved: PropTypes.object.isRequired,
  confirmSave: PropTypes.func.isRequired,
};
SocialHandles.defaultProps = {
  userDetails: {},
  heading: '',
  subTitle: '',
};

// const mapStateToProps = state => ({
//   userDetails: state.userDetails,
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     updateUserDetails: (id, obj, onSuccess) =>
//       dispatch(updateUserDetails(id, obj, onSuccess, false)),
//   };
// }

export default SocialHandles
