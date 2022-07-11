import React from 'react';
import axios from 'axios';
import { withTranslation, Trans } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { isEmpty } from 'src/utils/dataStructures';
import {
  faFacebookF,
  faInstagram,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { LinkText, LinkEle } from 'styles/TextStyled';
import Input from 'components/TextInput';
// import ActionLoader from '../ActionLoader';
import LoginFailed from './components';
import SecondaryButton from '../SecondaryButton';
// import { twitterLogin } from '../../services';
// import { ROLES } from '../../constants/usertype';
import { LoginContainer, SocialButton } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { ROLES } from 'src/constants/userType';
import { setLoginEmail, withSession } from 'src/context/session';
import { loginUser } from 'src/services/myfanpark/loginActions';
import { locStorage } from 'src/utils/localStorageUtils';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: this.props.loginEmail ? this.props.loginEmail : '',
        isValid: false,
        apiError: false,
        message: '',
      },
      loading: false,
      password: { value: '', apiError: false, isValid: false, message: '' },
      showPassword: false,
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
        role: ROLES.fan,
        ...this.props.data,
      },
      gmailClick: false,
      errorCount: 0,
    };
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.onLoginComplete();
    }
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_fbId,
        cookie: true,
        xfbml: true,
        version: process.env.NEXT_PUBLIC_FB_AUTH_VERSION
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
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    if (window.gapi) {
      window.gapi.signin2.render('g-sign-in', {
        scope: 'profile email',
        class: 'abcRioBu',
        width: 200,
        height: 50,
        theme: 'dark',
        onsuccess: this.onSignIn,
      });

    }

    if (this.props.sessionData.generalData.statusCode == 400 && this.props.errorCode === 1005) {
      this.props.updateToast({
        message: this.renderCustomError(this.props),
        value: true,
        variant: 'error',
        global: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      const followData = this.props.generalContext[0]?.celebrityToFollow;
      if (followData.celebId) {
        this.props.followCelebrity(
          followData.celebId,
          followData.follow,
        );
      }
      this.props.onLoginComplete();
    }
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          ...this.props.data,
        },
      });
    }

    if (
      (this.props.sessionData.generalData.statusCode !== nextProps.sessionData.generalData.statusCode && nextProps.sessionData.generalData.statusCode) &&
      nextProps.sessionData.generalData.statusCode !== '410' &&
      nextProps.sessionData.generalData.statusCode !== '310' &&
      (nextProps.sessionData.generalData.error || nextProps.sessionData.generalData.commonError)
    ) {
      nextProps.updateToast({
        message: this.renderCustomError(nextProps),
        value: true,
        variant: 'error',
        global: true
      });
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

  onLogin = e => {
    /* Status code 410 means Socialmedia account doesn't have email id */
    e.preventDefault();
    if (this.props.statusCode === '410') {
      if (this.checkEmail()) {
        this.setState(
          {
            socialMedia: {
              ...this.props.socialMediaStore,
              username:
                this.props.data.username.trim() ||
                this.state.email.value.trim(),
            },
          },
          () => {
            const socialObject = {
              userName:
                this.props.data.username.trim() ||
                this.state.socialMedia.username.trim(),
              firstName: this.state.socialMedia.first_name,
              lastName: this.state.socialMedia.last_name,
              nickName: this.state.socialMedia.nick_name,
              source: this.state.socialMedia.sign_up_source,
              profilePhoto: this.state.socialMedia.profile_photo,
              role: this.props.data.role || this.state.socialMedia.role,
              fbId: this.state.socialMedia.fb_id,
              gpId: this.state.socialMedia.gp_id,
              instId: this.state.socialMedia.in_id,
              twId: this.state.socialMedia.tw_id,
            };
            this.props.socialMediaLogin(socialObject);
          },
        );
      }
    } else if (this.checkEmail()) {
      if (this.isFormValid()) {
        this.props.updateToast({
          value: false,
        });
        // this.props.setLoginEmail(this.state.email.value.trim());
        setLoginEmail(this.props.sessionContext[1], this.state.email.value.trim())
        this.props.loginUser(
          this.state.email.value.trim(),
          this.state.password.value,
          this.props.loginOptions,
        );
      } else {
        this.checkEmail();
        this.checkPassword();
      }
    } else {
      this.checkEmail();
      this.checkPassword();
    }
  };

  onSocialMediaLogin = (r, source) => {
    let skipSocialLogin = false;
    if (source === 2) {
      this.setState({
        socialMedia: {
          ...this.state.socialMedia,
          username: !r.email ? 'facebook' : r.email,
          first_name: r.first_name,
          last_name: r.last_name,
          sign_up_source: source,
          nick_name: r.name,
          profile_photo: r.picture.data.url,
          fb_id: r.id,
        },
      });
    } else if (source === 3) {
      const name = r.getName();
      const firstName = name.split(' ')[0];
      const lastName = name.split(' ')[1];
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
      if (!val.authentication_token) {
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
      } else {
        skipSocialLogin = true;
        if (
          this.props.loginOptions &&
          this.props.loginOptions.preventStarLogin &&
          val.role_details.role_code === ROLES.star
        ) {
          this.props.loginFetchIncorrect(
            this.props.t('common.bookVideoOnlyfans', {
              siteName:
                props.partnerData.partner_name,
              purchaser: props.partnerData.purchaser_singular_name
            }),
            '400',
          );
        } else {
          this.props.updateLoginStatus(val);
          this.props.fetchUserDetails(val.id);
        }
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
      };
      // this.props.setSocialMediaData(this.state.socialMedia);
      this.props.socialMediaLogin(socialObject, this.props.loginOptions);
    }
  };

  onInstagramLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_instaId
    const redirectUri = process.env.NEXT_PUBLIC_loginInstaRedirectUri
    const url =
    process.env.NEXT_PUBLIC_instaAuthUrl +
      '?client_id=' +
      clientId +
      '&redirect_uri=' +
      redirectUri +
      '&response_type=token';
    window.open(url, '_blank');
  };
  onGmail = () => {
    const check = document.getElementsByClassName('abcRioButtonIcon');
    check[0].click();
    this.setState({ gmailClick: true });
  };

  onFBlogin = () => {
    const that = this;
    window.FB.login(
      function(response) {
        if (response.authResponse) {
          window.FB.api(
            '/me',
            {
              locale: 'en_US',
              fields: 'name, email,first_name,last_name,picture',
            },
            function(response) {
              that.onSocialMediaLogin(response, 2);
            },
          );
        }
      },
      { scope: 'email', return_scopes: true },
    );
  };

  onTwitterLogin = () => {
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

  setRoleDetails = role => {
    const roleType = role === 'FAN' ? ROLES.fan : ROLES.star;
    this.setState({
      socialMedia: { ...this.props.socialMediaStore, role: roleType },
    });
    this.props.socialMediaLogin(
      this.props.socialMediaStore.username,
      this.props.socialMediaStore.first_name,
      this.props.socialMediaStore.last_name,
      this.props.socialMediaStore.sign_up_source,
      this.props.socialMediaStore.profile_photo,
      roleType,
      this.props.socialMediaStore.fb_id,
      this.props.socialMediaStore.gp_id,
      this.props.socialMediaStore.in_id,
    );
    this.props.saveData({ role: roleType });
  };
  acceptPasswordHandler = e => {
    this.setState({
      password: { ...this.state.password, value: e.target.value },
    });
  };
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // To check email validity

    if (isEmpty(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, message: this.props.t('common.includeValidEmail') },
      });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({
        email: {
          ...this.state.email,
          message: this.props.t('common.includeValidEmail'),
        },
      });
      return false;
    }
    this.setState({
      email: {
        ...this.state.email,
        message: '',
        isValid: true,
        apiError: false,
      },
    });
    return true;
  };
  checkPassword = () => {
    if (isEmpty(this.state.password.value)) {
      this.setState({
        password: {
          ...this.state.password,
          message: this.props.t('common.useValidPassword'),
        },
      });
      return false;
    }
    this.setState({
      password: {
        ...this.state.password,
        message: '',
        isValid: true,
        apiError: false,
      },
    });
    return true;
  };
  isFormValid = () => {
    if (this.checkEmail() && this.checkPassword()) {
      return true;
    }
    return false;
  };
  acceptEmailHandler = e => {
    this.setState({
      email: { ...this.state.email, value: e.target.value, apiError: false },
    });
    this.props.saveData({ username: e.target.value });
  };
  listenToStorage = () => {
    if (locStorage.getItem('InstaAccessToken')) {
      const instaUrl =
      process.env.NEXT_PUBLIC_instaUrl + locStorage.getItem('InstaAccessToken');
      const that = this;
      axios
        .get(instaUrl)
        .then(function(response) {
          that.onSocialMediaLogin(response.data.data, 4);
          locStorage.removeItem('InstaAccessToken');
        })
        .catch(function(error) {});
    } else if (locStorage.getItem('twitterData')) {
      this.onSocialMediaLogin(
        JSON.parse(locStorage.getItem('twitterData')),
        5,
      );
      locStorage.removeItem('twitterData');
    }
  };
  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  loadSignup = () => {
    this.props.loadSignup();
  };

  goBack = () => {
    this.setState({ errorCount: 3 });
  };
  renderCustomError = props => {
    this.setState({ errorCount: this.state.errorCount + 1 });
    if (props.sessionData.generalData.errorCode === 1004) {
      // email/password error
      this.setState({
        password: {
          ...this.state.password,
          apiError: true,
        },
      });
      return this.props.t('common.passEmailNoMatch');
    } else if (props.errorCode === 1005) {
      this.setState({
        email: {
          ...this.state.email,
          apiError: true,
        },
      });
      return (
        <React.Fragment>
          <Trans i18nKey="forgotPassword.emailError">
            This email is not currently registered in our system.
            <LinkText
              className="link"
              onClick={() => {
                this.props.toggleSignup(true);
                this.props.updateToast({
                  value: false,
                });
              }}
            >
              Create account
            </LinkText>
          </Trans>
        </React.Fragment>
      );
    } else if (props.errorCode === 1010) { // Declined account
      return (
        <React.Fragment>
          <Trans i18nKey="common.hiddenAccError">
            Your account was declined. Please contact
            <LinkEle
              className="link"
              href={`mailto: ${props.partnerData.admin_email}`}
            >
              customer service
            </LinkEle>
            for details.
          </Trans>
        </React.Fragment>
      );
    } else if (props.errorCode === 1011) { // archived account
      return (
        <React.Fragment>
          <Trans i18nKey="common.archivedAccError">
            Your account has been removed. Please contact
            <LinkEle
              className="link"
              href={`mailto: ${props.partnerData.admin_email}`}
            >
              customer service
            </LinkEle>
            for details on reactivating.
          </Trans>
        </React.Fragment>
      );
    }

    return props.error || props.commonError;
  };

  render() {
    const { email, password } = this.state;
    if (this.state.errorCount >= 4) {
      return (
        <LoginFailed t={this.props.t} changeView={this.props.changeView} goBack={this.goBack} partnerData={this.props.partnerData} />
      );
    }
    return (
      <React.Fragment>
        {/* {this.state.loading && <ActionLoader />} */}
        <LoginContainer.SocialMediaSignup>
          <LoginContainer.Container>
            <LoginContainer.Heading className="align-heading">
              {this.props.t('common.howLogin')}
            </LoginContainer.Heading>
            <LoginContainer.ButtonDiv>
              <LoginContainer.Button onClick={this.onFBlogin}>
                <LoginContainer.SocialMediaIcon>
                  <SocialButton bgColor="#3a5999">
                    <SocialButton.IconWrap bgColor="#283d68">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </SocialButton.IconWrap>
                    { this.props.t('common.loginWithFacebook') }
                  </SocialButton>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
              {/*
              <LoginContainer.Button onClick={this.onTwitterLogin}>
                <LoginContainer.SocialMediaIcon>
                  <LoginContainer.Icon>
                    <FontAwesomeIcon icon={faTwitter} />
                  </LoginContainer.Icon>
                  <LoginContainer.SocialMediaLabel>
                    Twitter
                  </LoginContainer.SocialMediaLabel>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
              */}
              {/*
              <LoginContainer.Button onClick={this.onInstagramLogin}>
                <LoginContainer.SocialMediaIcon>
                  <LoginContainer.Icon>
                    <FontAwesomeIcon icon={faInstagram} />
                  </LoginContainer.Icon>
                  <LoginContainer.SocialMediaLabel>
                    Instagram
                  </LoginContainer.SocialMediaLabel>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
              */}
              <LoginContainer.Button onClick={this.onGmail}>
                <LoginContainer.SocialMediaIcon>
                  <LoginContainer.GoogleWrapper id="g-sign-in" />
                  <SocialButton bgColor="#f14234">
                    <SocialButton.IconWrap bgColor="#bc2a1e">
                      <FontAwesomeIcon icon={faGoogle} />
                    </SocialButton.IconWrap>
                    { this.props.t('common.loginWithGoogle') }
                  </SocialButton>
                </LoginContainer.SocialMediaIcon>
              </LoginContainer.Button>
            </LoginContainer.ButtonDiv>
            <LoginContainer.Heading className="email-heading">
              {this.props.t('common.or')} {this.props.t('common.byEmail')}
            </LoginContainer.Heading>

            <LoginContainer.InputFieldsWrapper>
              <LoginContainer.InputContainer>
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <Input
                      type="email"
                      name="email"
                      fullWidth
                      inputProps={{
                        defaultProps: {
                          error: !!email.message || email.apiError,
                          value: email.value,
                          classes: {
                            root: 'input-label',
                            error: 'input-error',
                          },
                          onBlur: this.checkEmail,
                          onChange: this.acceptEmailHandler,
                        },
                        labelObj: {
                          label: this.props.t('common.fields.whatEmail'),
                          errorMsg: email.message,
                        },
                      }}
                    />
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                {this.props.sessionData.generalData.statusCode === '410' ? (
                  <LoginContainer.EmptyDiv />
                ) : (
                  <LoginContainer.InputWrapper className="password-wrap">
                    <LoginContainer.WrapsInput>
                      <LoginContainer.PasswordWrapper>
                        <Input
                          type={this.state.showPassword ? 'text' : 'password'}
                          name="password"
                          fullWidth
                          inputProps={{
                            defaultProps: {
                              error: !!password.message || password.apiError,
                              value: password.value,
                              classes: {
                                root: 'input-label',
                                error: 'input-error',
                              },
                              onBlur: this.checkPassword,
                              onChange: this.acceptPasswordHandler,
                            },
                            labelObj: {
                              label: this.props.t('common.fields.whatPassword'),
                              errorMsg: password.message,
                            },
                            mInputProps: {
                              classes: { rest: { root: 'adornment-start' } },
                              InputProps: {
                                endAdornment: (
                                  <InputAdornment
                                    position="end"
                                    disableTypography
                                    classes={{
                                      root: 'adornment-root',
                                      positionEnd: 'adornment-end',
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      className="password-visibility"
                                      icon={
                                        this.state.showPassword
                                          ? faEye
                                          : faEyeSlash
                                      }
                                      onClick={() => {
                                        this.setState({
                                          showPassword: !this.state
                                            .showPassword,
                                        });
                                      }}
                                    />
                                  </InputAdornment>
                                ),
                              },
                            },
                          }}
                        />
                      </LoginContainer.PasswordWrapper>
                    </LoginContainer.WrapsInput>
                  </LoginContainer.InputWrapper>
                )}

                <LoginContainer.ButtonWrapper
                  margin={this.props.sessionData.generalData.statusCode === '410'}
                  className="align-center"
                >
                  <SecondaryButton
                    type="submit"
                    value="Log in"
                    secondary
                    onClick={this.onLogin}
                    disabled={this.props.loading}
                  >
                    {this.props.t('common.login')}
                  </SecondaryButton>
                </LoginContainer.ButtonWrapper>
                {this.props.sessionData.generalData.statusCode === '410' ? (
                  <React.Fragment />
                ) : (
                  <LoginContainer.ForgotButtonWrapper>
                    <LoginContainer.actionText
                      onClick={() => this.props.changeView('forgotpassword')}
                    >
                      <LoginContainer.ForgotButtonSpan>
                        {' '}
                        {this.props.t('common.passwordValid.forgot')}
                      </LoginContainer.ForgotButtonSpan>
                    </LoginContainer.actionText>
                    &nbsp; | &nbsp;
                    <LoginContainer.actionText onClick={this.loadSignup}>
                      <LoginContainer.ForgotButtonSpan>
                        {' '}
                        {this.props.t('common.register')}
                      </LoginContainer.ForgotButtonSpan>
                    </LoginContainer.actionText>
                  </LoginContainer.ForgotButtonWrapper>
                )}
              </LoginContainer.InputContainer>
            </LoginContainer.InputFieldsWrapper>
          </LoginContainer.Container>
        </LoginContainer.SocialMediaSignup>
      </React.Fragment>
    );
  }
}

export default withTranslation()(withSession(LoginForm))
