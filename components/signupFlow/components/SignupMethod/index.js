import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation } from 'next-i18next';
import Link from 'next/link';
import axios from 'axios';
import Input from 'components/TextInput';
import { LinkText } from 'styles/TextStyled';
import {
  faFacebookF,
  faInstagram,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import BackHeader from 'components/BackHeader';
// import ActionLoader from 'components/ActionLoader';
import Button from 'components/SecondaryButton';
// import { updateLoginStatus } from 'store/shared/actions/login';
// import { toggleSignup, toggleLogin } from 'store/shared/actions/toggleModals';
// import { fetchUserDetails } from 'store/shared/actions/getUserDetails';
// import { ROLES } from 'constants/usertype';
// import { twitterLogin } from 'services/';
import constants from './constants';
import { SignUpMethod, SocialButton } from './styled';
import { ROLES } from 'src/constants/userType';
import { locStorage } from 'src/utils/localStorageUtils';
import { isCelebProfileComplete } from 'src/services/myfanpark/loginActions';
import { withGeneral } from 'src/context/general';
import { withSession } from 'src/context/session';

class SignupMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referral: '',
      referralError: '',
      role: ROLES[props.signupRole],
      loading: false,
      socialMedia: {
        username: '',
        first_name: '',
        last_name: '',
        sign_up_source: '',
        profile_photo: '',
        nick_name: '',
        fb_id: '',
        gp_id: '',
        in_id: '',
        tw_id: '',
        role: ROLES[props.signupRole],
      },
      gmailClick: false,
      email: props.signupDetails.email,
      password: props.signupDetails.password,
      emailError: false,
      passwordError: false,
      passwordErrorMsg: '',
    };
  }
  componentWillMount() {
    const params =
      window.location.search && window.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (finalParams) {
      finalParams.forEach(data => {
        if (data.split('=')[0] === 'referral') {
          this.setState({ referral: data.split('=')[1] });
        }
      });
    }
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_fbId,
        cookie: true,
        xfbml: true,
        version: process.env.NEXT_PUBLIC_FB_AUTH_VERSION,
      });
      window.FB.getLoginStatus = response => {
        if (response.status === 'connected') {
          // for already connected
        } else {
          // user is not authorized
        }
      };
    };
    (function(d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    window.addEventListener('storage', this.listenToStorage);
    if (!this.props.isLoggedIn && window.gapi) {
      gapi.signin2.render('g-sign-in', {
        scope: 'profile email',
        width: 200,
        height: 50,
        theme: 'dark',
        onsuccess: this.onSignIn,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      if (this.props.signupRole === 'fan') {
        const followData = this.props.followCelebData;
        if (followData.celebId) {
          this.props.followCelebrity(
            this.props.followCelebData.celebId,
            this.props.followCelebData.celebProfessions,
            this.props.followCelebData.follow,
            true,
          );
        }
      }
    }
    if (this.props.loading !== nextProps.loading) {
      this.setState({ loading: nextProps.loading });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.listenToStorage);
  }

  onSignIn = googleUser => {
    if (this.state.gmailClick) {
      const profile = googleUser.getBasicProfile();
      this.onSocialMediaLogin(profile, 3);
    }
  };

  onSocialMediaLogin = async (r, source) => {
    let skipSocialLogin = false;
    if (source === 2) {
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: r.email === '' ? 'facebook' : r.email,
          first_name: r.first_name,
          last_name: r.last_name,
          sign_up_source: source,
          nick_name: r.name,
          profile_photo: r.picture.data.url,
          fb_id: r.id,
        },
      });
    } else if (source === 3) {
      const name = r
        .getName()
        .trim()
        .split(' ');
      const firstName = name[0];
      const lastName = name[1];
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: r.getEmail(),
          first_name: firstName,
          last_name: lastName,
          sign_up_source: source,
          nick_name: r.getName(),
          profile_photo: r.getImageUrl(),
          gp_id: r.getId(),
        },
      });
    } else if (source === 4) {
      const val = r;
      const name = val.full_name.trim().split(' ');
      const firstName = name[0];
      const lastName = name[1];
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: val.username,
          first_name: firstName,
          last_name: lastName,
          sign_up_source: source,
          nick_name: val.full_name,
          profile_photo: val.profile_picture,
          in_id: val.id,
        },
      });
    } else {
      const val = r;

      let firstName = val.first_name;
      let lastName = val.last_name;
      let nickName = val.nick_name || val.name;
      if ((!firstName || !lastName) && val.name) {
        firstName = val.name.trim().split(' ')[0];
        lastName = val.name.trim().split(' ')[1];
      }
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: val.email,
          first_name: firstName,
          last_name: lastName,
          sign_up_source: source,
          nick_name: nickName,
          profile_photo: val.profile_photo,
          tw_id: val.id,
        },
      });
      if (val.authentication_token) {
        skipSocialLogin = true;
        this.props.setSocialMediaData(this.state.socialMedia);
        this.props.changeStep(this.props.currentStep + 1);
      }
    }
    if (!skipSocialLogin) {
      const socialObject = {
        userName: this.state.socialMedia.username,
        firstName: this.state.socialMedia.first_name,
        lastName: this.state.socialMedia.last_name,
        nickName: this.state.socialMedia.nick_name,
        source: this.state.socialMedia.sign_up_source,
        profilePhoto: this.state.socialMedia.profile_photo,
        role: this.state.socialMedia.role,
        fbId: this.state.socialMedia.fb_id,
        gpId: this.state.socialMedia.gp_id,
        instId: this.state.socialMedia.in_id,
        twId: this.state.socialMedia.tw_id,
        referral: this.state.referral,
      };
      // this.props.setSocialMediaData(this.state.socialMedia);
      this.props.setSignupFlow({
        firstName: socialObject.firstName,
        isSocial: true,
        lastName: socialObject.lastName,
        nickName: socialObject.nickName,
        source: socialObject.source,
        profilePhoto: socialObject.profilePhoto,
        email: socialObject.userName,
        fbId: socialObject.fbId,
        gpId: socialObject.gpId,
        instId: socialObject.instId,
        twId: socialObject.twId,
      });
      this.props.changeStep(this.props.currentStep + 1);
    }
  };

  onGmail = () => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'Google Signup' });
    }
    this.setState({ gmailClick: true });
    const check = document.getElementsByClassName('abcRioButtonIcon');
    check[0].click();
  };
  onInstagramLogin = () => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'Instagram Signup' });
    }
    const clientId = env('instaId');
    const redirectUri = env('loginInstaRedirectUri');
    const url = `${env(
      'instaAuthUrl',
    )}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;
    window.open(url, '_blank');
  };

  onEmailLogin = async () => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'Email Signup' });
    }
    const isPrevUser = await isCelebProfileComplete({
      username: this.state.email,
      password: this.state.password
    }, this.props.dispatch, this.props.sessionDispatch)
    if (isPrevUser.celebrity_profile_not_complete) {
      this.props.changeStep(2)
    } else {

      this.props.setSignupFlow({
        isSocial: false,
        firstName: '',
        lastName: '',
        nickName: '',
        phNo: '',
        phCode: '',
        email: this.state.email,
        password: this.state.password,
        fbId: '',
        gpId: '',
        instId: '',
        twId: '',
      });
      this.props.changeStep(this.props.currentStep + 1);
    }
  };

  onTwitterLogin = () => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'Twitter Signup' });
    }
    this.setState({ loading: true });
    twitterLogin()
      .then(resp => {
        this.setState({ loading: false });
        if (resp.success && resp.data) {
          const url = resp.data.twitter_link;
          window.open(url, '_blank');
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  listenToStorage = () => {
    // if (locStorage.getItem('InstaAccessToken')) {
    //   const instaUrl =
    //     env('instaUrl') + locStorage.getItem('InstaAccessToken');
    //   const that = this;
    //   axios
    //     .get(instaUrl)
    //     .then(response => {
    //       that.onSocialMediaLogin(response.data.data, 4);
    //       locStorage.removeItem('InstaAccessToken');
    //     })
    //     .catch(error => {});
    // } else if (locStorage.getItem('twitterData')) {
    //   this.onSocialMediaLogin(
    //     locStorage.getItem('twitterData'),
    //     5,
    //   );
    //   locStorage.removeItem('twitterData');
    // }
  };

  OnFBlogin = () => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'Facebook Signup' });
    }
    const that = this;
    window.FB.login(
      response => {
        if (response.authResponse) {
          window.FB.api(
            '/me',
            {
              locale: 'en_US',
              fields: 'name, email,first_name,last_name,picture',
            },
            response => {
              that.onSocialMediaLogin(response, 2);
            },
          );
        }
      },
      { scope: 'email', return_scopes: true },
    );
  };

  fanSignUp = fn => () => {
    fn();
  };

  emailError = event => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (event.target.value !== '') {
      if (emailRegex.test(event.target.value)) {
        return false;
      }
      return true;
    }
    return false;
  };

  validateEmail = event => {
    this.setState({ emailError: this.emailError(event) });
  };

  passwordError = event => {
    const pattern = /^(?=.*?[0-9])(?=.*?[a-zA-Z]).{8,}$/;
    if (event.target.value !== '') {
      if (pattern.test(event.target.value)) {
        this.setState({ passwordErrorMsg: '' })
        return false;
      }
      this.setState({ passwordErrorMsg: this.props.t('common.passwordValid.description') })
      return true;
    }
    this.setState({ passwordErrorMsg: this.props.t('common.passwordValid.invalidPass') })
    return false;
  };

  validatePassword = event => {
    this.setState({ passwordError: this.passwordError(event) });
  };

  valueChange = state => event => {
    this.setState({ [state]: event.target.value });
    if (state === 'email') {
      if (!this.emailError(event)) {
        this.setState({ emailError: false });
      }
    } else if (state === 'password') {
      if (!this.passwordError(event)) {
        this.setState({ passwordError: false });
      }
    }
  };

  render() {
    return (
      <SignUpMethod.SocialMediaSignup>
        {/* {this.state.loading && <ActionLoader />} */}
        <React.Fragment>
          <BackHeader
            rootClass="method-header"
            backHandler={
              !this.props.signupDetails.disableRoleChange
                ? this.props.onBack
                : null
            }
            closeHandler={this.props.closeSignupFlow}
            noHelp
          />
          <SignUpMethod.Container>
            <SignUpMethod.Wrapper
              alternateSignup={
                this.props.signupOptions.alternateSignup &&
                this.props.signupRole === 'fan'
              }
            >
              <SignUpMethod.SubHead>
                {this.props.signupRole === 'fan'
                  ? constants(this.props.t, this.props.entityData).fan.subHead
                  : constants(this.props.t, this.props.entityData).star.subHead}
              </SignUpMethod.SubHead>
              <SignUpMethod.Heading>
                {this.props.signupRole === 'fan'
                  ? constants(this.props.t, this.props.entityData).fan[
                      this.props.signupOptions.alternateSignup
                        ? this.props.t('common.alternate')
                        : this.props.t('common.heading')
                    ]
                  : constants(this.props.t, this.props.entityData).star.heading}
                {this.props.signupOptions.alternateSignup &&
                  this.props.signupRole === 'fan' && (
                    <SignUpMethod.Description>
                      {constants(this.props.t, this.props.entityData).fan.altDesc}
                    </SignUpMethod.Description>
                  )}
              </SignUpMethod.Heading>

              <SignUpMethod.ButtonDiv>
                <SignUpMethod.Button
                  onClick={
                    this.props.signupRole === 'fan'
                      ? this.fanSignUp(this.OnFBlogin)
                      : this.OnFBlogin
                  }
                >
                  <SignUpMethod.SocialMediaIcon>
                    <SocialButton bgColor="#3a5999">
                      <SocialButton.IconWrap bgColor="#283d68">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </SocialButton.IconWrap>
                      {this.props.t('common.loginWithFacebook')}
                    </SocialButton>
                  </SignUpMethod.SocialMediaIcon>
                </SignUpMethod.Button>
                {/*
                <SignUpMethod.Button
                  onClick={
                    this.props.signupRole === 'fan'
                      ? this.fanSignUp(this.onTwitterLogin)
                      : this.onTwitterLogin
                  }
                >
                  <SignUpMethod.SocialMediaIcon>
                    <SignUpMethod.Icon>
                      <FontAwesomeIcon icon={faTwitter} />
                    </SignUpMethod.Icon>
                  </SignUpMethod.SocialMediaIcon>
                </SignUpMethod.Button>
                */}
                {/*
                <SignUpMethod.Button
                  onClick={
                    this.props.signupRole === 'fan'
                      ? this.fanSignUp(this.onInstagramLogin)
                      : this.onInstagramLogin
                  }
                >
                  <SignUpMethod.SocialMediaIcon>
                    <SignUpMethod.Icon className="insta">
                      <FontAwesomeIcon icon={faInstagram} />
                    </SignUpMethod.Icon>
                  </SignUpMethod.SocialMediaIcon>
                </SignUpMethod.Button>
                */}
                <SignUpMethod.Button
                  onClick={
                    this.props.signupRole === 'fan'
                      ? this.fanSignUp(this.onGmail)
                      : this.onGmail
                  }
                >
                  <SignUpMethod.SocialMediaIcon>
                    <SignUpMethod.GoogleWrapper id="g-sign-in" />
                    <SocialButton bgColor="#f14234">
                      <SocialButton.IconWrap bgColor="#bc2a1e">
                        <FontAwesomeIcon icon={faGoogle} />
                      </SocialButton.IconWrap>
                      {this.props.t('common.loginWithGoogle')}
                    </SocialButton>
                  </SignUpMethod.SocialMediaIcon>
                </SignUpMethod.Button>
              </SignUpMethod.ButtonDiv>
              <SignUpMethod.Heading className="or-section">
                {this.props.t('common.or')}
              </SignUpMethod.Heading>

              <Input
                type="email"
                fullWidth
                inputProps={{
                  defaultProps: {
                    error: this.state.email !== '' && this.state.emailError,
                    value: this.state.email,
                    classes: {
                      root: 'input-root',
                      input: 'input-label-email',
                    },
                    onBlur: this.validateEmail,
                    onChange: this.valueChange('email'),
                  },
                  labelObj: {
                    label: this.props.t('common.emailHead'),
                    errorMsg:
                      this.state.email !== '' && this.state.emailError
                        ? this.props.t('common.emailError')
                        : '',
                  },
                }}
              />

              <Input
                type="password"
                inputProps={{
                  defaultProps: {
                    error: this.state.password && this.state.passwordError,
                    value: this.state.password,
                    classes: {
                      root: 'input-root',
                      input: 'input-label-password',
                    },
                    onBlur: this.validatePassword,
                    onChange: this.valueChange('password'),
                  },
                  labelObj: {
                    label: this.props.t('common.password'),
                    errorMsg:
                      this.state.password && this.state.passwordError
                        ? this.state.passwordErrorMsg
                        : '',
                  },
                }}
              />
              <Button
                className="sign-up-btn"
                disabled={
                  !this.state.password ||
                  !this.state.email ||
                  this.state.emailError ||
                  this.state.passwordError
                }
                isDisabled={
                  !this.state.password ||
                  !this.state.email ||
                  this.state.emailError ||
                  this.state.passwordError
                }
                onClick={
                  this.props.signupRole === 'fan'
                    ? this.fanSignUp(this.onEmailLogin)
                    : this.onEmailLogin
                }
              >
                {this.props.t('common.signup')}
              </Button>

              <LinkText
                className="login-link"
                onClick={() => {
                  this.props.toggleLogin(true);
                }}
              >
                {this.props.t('common.login')}
              </LinkText>
            </SignUpMethod.Wrapper>
            {this.props.signupOptions.alternateSignup &&
              this.props.signupRole === 'fan' && (
                <SignUpMethod.SubTitle>
                  {this.props.t('common.signupFlow.celebInfl')}
                </SignUpMethod.SubTitle>
              )}
            <SignUpMethod.Link
              onClick={() =>
                (!this.props.signupOptions.alternateSignup ||
                  this.props.signupRole !== 'fan') &&
                this.props.changeSignUpRole(
                  this.props.signupRole === 'fan' ? 'star' : 'fan',
                )
              }
            >
              {this.props.signupOptions.alternateSignup &&
              this.props.signupRole === 'fan' ? (
                <React.Fragment>
                  <span
                    onClick={() =>
                      this.props.changeSignUpRole(
                        this.props.signupRole === 'fan' ? 'star' : 'fan',
                      )
                    }
                  >
                    {constants(this.props.t, this.props.entityData).fan.alternateFooter}
                  </span>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Link
                    href="/"
                    onClick={() => {
                      this.props.toggleSignup(false);
                    }}
                  >
                    <a>

                    {this.props.t('common.moreInfo')}
                    </a>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.props.signupRole === 'fan'
                    ? constants(this.props.t, this.props.entityData).fan.footerLink
                    : constants(this.props.t, this.props.entityData).star.footerLink}
                </React.Fragment>
              )}
            </SignUpMethod.Link>
          </SignUpMethod.Container>
        </React.Fragment>
      </SignUpMethod.SocialMediaSignup>
    );
  }
}

SignupMethod.propTypes = {
  changeStep: PropTypes.func,
  changeSignUpRole: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  signupRole: PropTypes.string,
  data: PropTypes.object,
  closeSignupFlow: PropTypes.func,
  setSignupFlow: PropTypes.func,
};

SignupMethod.defaultProps = {
  changeStep: () => {},
  currentStep: '',
  signupRole: '',
  data: {},
  setSignupFlow: () => {},
  closeSignupFlow: () => {},
};

// const mapStateToProps = state => ({
//   loading: state.session.loading,
//   signupOptions: state.modals.signupOptions,
// });

// const mapProps = dispatch => ({
//   updateLoginStatus: sessionDetails =>
//     dispatch(updateLoginStatus(sessionDetails)),
//   fetchUserDetails: id => dispatch(fetchUserDetails(id)),
//   toggleSignup: state => dispatch(toggleSignup(state)),
//   toggleLogin: state => dispatch(toggleLogin(state)),
// });

export default withTranslation()(withGeneral(withSession(SignupMethod)))
