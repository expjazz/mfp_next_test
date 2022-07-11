/************************************ React Files ************************************/
import React from 'react';
import { withTranslation, Trans } from 'next-i18next';
import PropTypes from 'prop-types';
/************************************ Components *************************************/
// import { isEmpty } from 'src/utils/dataStructures';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
// import { emailRegister } from 'services/userRegistration';
import BackHeader from 'components/BackHeader';
import InputAdornment from '@material-ui/core/InputAdornment';
import { passwordRegex } from 'src/constants/regex/formRegex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import PhoneNumber from 'components/PhoneNumber';
import Input from 'components/TextInput';
// import { toggleLogin } from 'store/shared/actions/toggleModals';
import { LinkText } from 'styles/TextStyled';
// import ActionLoader from '../ActionLoader';
import Checkbox from '../../components/Checkbox';
import ReferralCode from './components/ReferralCode';
import SecondaryButton from '../SecondaryButton';
import ToolTip from '../ToolTip';
/************************************   Actions  *************************************/
// import { updateLoginStatus } from '../../store/shared/actions/login';
// import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
/********************************  Helper functions  *********************************/
import { formatSignUpByUserType } from './helper';
/***********************************  Constants  *************************************/
// import { ROLES } from '../../constants/usertype';
import { ROLE_FAN, ROLE_STAR } from './constants';
/************************************  Styles  ***************************************/
import { LoginContainer, Phonenumber, SmallDescription } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { ROLES } from 'src/constants/userType';
import { loginOptions } from 'src/context/general';

const entity = value => value

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        value: props.signupDetails.firstName
          ? props.signupDetails.firstName
          : '',
        isValid: false,
        message: '',
      },
      lastName: {
        value: props.signupDetails.lastName ? props.signupDetails.lastName : '',
        isValid: true,
        message: '',
      },
      password: {
        value: props.signupDetails.password,
        isValid: false,
        message: '',
      },
      phoneNumber: {
        value: props.signupDetails.phNo ? props.signupDetails.phNo : '',
        message: '',
      },
      phoneCode: props.signupDetails.phCode ? props.signupDetails.phCode : '1', // US country code
      confirmPassword: { value: '', isValid: false, message: '' },
      email: {
        value: props.signupDetails.email ? props.signupDetails.email : '',
        isValid: false,
        message: '',
      },
      termsAndConditions: {
        value: props.signupDetails.acceptTerms || true,
        isValid: false,
        message: '',
      },
      role: ROLES[props.signupRole],
      loading: false,
      referralCode: '',
      showPassword: false,
      showReferral: false,
      AgreedConditionOrPolicy: false,
      terms: true,
      termsError: '',
    };
    this.phoneRef = React.createRef();
  }
  componentWillMount() {
    const params =
      window.location.search && window.location.search.split('?')[1];
    const finalParams = params && params.split('&');
    if (finalParams) {
      finalParams.forEach(data => {
        if (data.split('=')[0] === 'referral') {
          this.setState({
            referralCode: data.split('=')[1],
          });
        }
      });
    }
  }
  componentDidMount() {
    if (
      this.phoneRef.current &&
      document.getElementsByClassName(
        'react-phone-number-input__country-select',
      ) &&
      document.getElementsByClassName(
        'react-phone-number-input__country-select',
      )[0]
    ) {
      document
        .getElementsByClassName('react-phone-number-input__country-select')[0]
        .setAttribute('tabindex', '-1');
    }
    if (this.phoneRef.current) {
      this.setState({
        phoneCode:
        (this.phoneRef.current.props.metadata.countries[
          this.props.entityData.country_code
        ] && this.phoneRef.current.props.metadata.countries[
            this.props.entityData.country_code
          ][0]) || this.state.phoneCode,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      // const followData = this.props.followCelebData;
      // if (followData.celebId) {
      //   this.props.followCelebrity(
      //     this.props.followCelebData.celebId,
      //     this.props.followCelebData.celebProfessions,
      //     this.props.followCelebData.follow,
      //     true,
      //   );
      // }
    }
    if (
      this.props.errorType !== nextProps.errorType &&
      nextProps.errorType === 'email' &&
      nextProps.error
    ) {
      this.setState({
        email: {
          ...this.state.email,
          isValid: false,
          message: nextProps.error,
        },
      });
    }
    if (this.props.signupRole !== nextProps.signupRole) {
      this.setState({ role: ROLES[nextProps.signupRole] });
    }
    if (this.props.loading !== nextProps.loading) {
      this.setState({
        loading: nextProps.loading,
      });
    }
    if (this.props.switched !== nextProps.switched) {
      this.setState({
        acceptTerms: nextProps.switched,
      });
    }
  }

  onSocialMediaLogin = originalNumber => {
    const { source, fbId, gpId, instId, twId, role } = this.props.signupDetails;
    const socialObject = {
      userName: this.state.email.value,
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      nickName: '',
      source,
      profilePhoto: '',
      role: ROLES[role],
      phNo: originalNumber,
      phCode: this.state.phoneCode,
      fbId,
      gpId,
      instId,
      twId,
    };
    this.props.socialMediaLogin(socialObject).then(response => {
      if (response !== undefined) {
        this.props.setSignupFlow({
          firstName: socialObject.firstName,
          lastName: socialObject.lastName,
          nickName: socialObject.nickName,
          email: socialObject.userName.trim(),
          phNo: this.state.phoneNumber.value,
          phCode: this.state.phoneCode,
          fbId: socialObject.fb_id,
          gpId: socialObject.gp_id,
          instId: socialObject.in_id,
          twId: socialObject.tw_id,
        });
        this.props.changeStep(this.props.currentStep + 1);
      }
    });
  };

  onRegister = e => {
    e.preventDefault();
    if (this.state.terms) {
      if (
        this.checkFirstRequired() &
        this.checkLastRequired() &
        this.checkEmail(false) &
        this.checkPhone()
      ) {
        const originalNumber = this.state.phoneNumber.value.substring(
          this.state.phoneCode.length + 1,
          this.state.phoneNumber.value.length,
        );
        if (
          this.props.signupDetails.role === ROLE_FAN &&
          this.props.signupDetails.isSocial
        ) {
          this.onSocialMediaLogin(originalNumber);
        } else if (
          this.checkPassword(true) &&
          this.checkTermsAndConditionsRequired()
        ) {
          loginOptions(this.props.dispatch, { noRedirect: true })
          this.props.setSignupFlow({
            ...this.props.signupDetails,
            registered: true,
          });
          this.props
            .registerUser([
              {
                firstName: this.state.firstName.value,
                lastName: this.state.lastName.value,
                email: this.state.email.value.trim(),
                password: this.state.password.value,
                phNo: originalNumber,
                referral: this.state.referralCode,
                phCode: this.state.phoneCode,
                source: this.props.signupDetails.source,
                fbId: this.props.signupDetails.fbId,
                gpId: this.props.signupDetails.gpId,
                instId: this.props.signupDetails.instId,
                twId: this.props.signupDetails.twId,
                role: this.state.role,
              }]
            )
            .then(response => {
              if (response !== undefined) {
                this.props.setSignupFlow({
                  firstName: this.state.firstName.value,
                  lastName: this.state.lastName.value,
                  phNo: this.state.phoneNumber.value,
                  phCode: this.state.phoneCode,
                  referral: this.state.referralCode,
                  email: this.state.email.value.trim(),
                  acceptTerms: true,
                  isSocial: false,
                });
                this.props.changeStep(this.props.currentStep + 1);
              }
            });
        }
      }
    } else {
      this.setState({ termsError: this.props.t('required') });
    }
  };

  saveFormEntries = (event, type) => {
    if (type === 'password' || type === 'confirmPassword') {
      this.props.updateToast({
        value: false,
      });
    }
    this.setState({
      [type]: {
        ...this.state[type],
        value: ['firstName', 'lastName'].includes(type)
          ? event.target.value.replace(/[@$/()&"?#]/g, '')
          : event.target.value,
      },
    });
  };

  checkPhone = () => {
    if (!this.state.phoneNumber.value) {
      this.setState({
        phoneNumber: {
          ...this.state.phoneNumber,
          message: this.props.t('common.fields.addPhone'),
        },
      });
      return false;
    } else if (!isValidPhoneNumber(this.state.phoneNumber.value)) {
      this.setState({
        phoneNumber: {
          ...this.state.phoneNumber,
          message: this.props.t('common.fields.invalidPhone'),
        },
      });
      return false;
    }
    this.setState({
      phoneNumber: {
        ...this.state.phoneNumber,
        message: '',
      },
    });
    return true;
  };

  toggleTermsAndConditions = checkValue => {
    this.setState({
      termsAndConditions: {
        ...this.state.termsAndConditions,
        value: checkValue,
      },
    });
  };
  agreeTermsConditions = conditionOrPolicy => {
    if (conditionOrPolicy === 'condition') {
      this.setState(
        {
          AgreedConditionOrPolicy: true,
          termsAndConditions: {
            ...this.state.termsAndConditions,
            value: this.state.acceptTerms && this.state.AgreedConditionOrPolicy,
          },
        },
        () => this.checkTermsAndConditionsRequired(),
      );
    } else {
      this.setState(
        {
          AgreedConditionOrPolicy: true,
          termsAndConditions: {
            ...this.state.termsAndConditions,
            value:
              this.state.AgreedConditionOrPolicy && this.state.acceptPolicy,
          },
        },
        () => this.checkTermsAndConditionsRequired(),
      );
    }

    this.props.disableClose(false);
  };
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // Regex to check if email is valid
    if (isEmpty(this.state.email.value)) {
      this.setState({
        email: {
          ...this.state.email,
          message: this.props.t('common.fields.addEmail'),
        },
      });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({
        email: {
          ...this.state.email,
          message: this.props.t('common.emailError'),
        },
      });
      return false;
    }
    this.setState({
      email: { ...this.state.email, message: '', isValid: true },
    });
    return true;
  };

  checkFirstRequired = () => {
    const firstNameEmpty = !this.state.firstName.value.trim();
    if (firstNameEmpty) {
      const firstNameMsg = this.props.t('common.fields.enterFirstName');
      this.setState({
        firstName: {
          ...{
            ...this.state.firstName,
            value: this.state.firstName.value.trim(),
          },
          message: firstNameMsg,
        },
      });
      return false;
    }
    this.setState({
      firstName: {
        ...{
          ...this.state.firstName,
          value: this.state.firstName.value.trim(),
        },
        message: '',
        isValid: true,
      },
    });
    return true;
  };

  checkLastRequired = () => {
    const lastNameEmpty = isEmpty(this.state.lastName.value.trim());
    if (lastNameEmpty) {
      const lastNameMsg = this.props.t('common.fields.enterLastName');
      this.setState({
        lastName: {
          ...{
            ...this.state.lastName,
            value: this.state.lastName.value.trim(),
          },
          message: lastNameMsg,
        },
      });
      return false;
    }
    this.setState({
      lastName: {
        ...{
          ...this.state.lastName,
          value: this.state.lastName.value.trim(),
        },
        message: '',
        isValid: true,
      },
    });
    return true;
  };

  checkPassword = (submitCheck = false) => {
    const pattern = passwordRegex; // Accepts values with min 8 characters, at least one number
    if (isEmpty(this.state.password.value)) {
      this.setState({
        password: {
          ...this.state.password,
          message: this.props.t('common.fields.enterPass'),
        },
      });
      return false;
    }
    if (!pattern.test(this.state.password.value)) {
      this.setState({
        password: {
          ...this.state.password,
          message: this.props.t('common.passwordValid.invalidPass'),
        },
      });
      return false;
    }
    if (this.state.confirmPassword.value !== this.state.password.value) {
      if (this.state.confirmPassword.value || submitCheck) {
        this.props.updateToast({
          message: this.props.t('common.passwordValid.dontMatch'),
          value: true,
          variant: 'error',
          global: true,
        });
      }
      return false;
    }
    this.setState({
      password: { ...this.state.password, message: '', isValid: true },
    });
    return true;
  };

  onPhneChange = key => value => {
    let newValue = value;
    if (key === 'countryCode' && newValue) {
      newValue = this.phoneRef.current
        ? this.phoneRef.current.props.metadata.countries[value][0]
        : this.state.phoneCode;
      this.setState({ phoneCode: newValue });
    } else if (key === 'value') {
      this.setState({
        phoneNumber: {
          ...this.state.phoneNumber,
          [key]: newValue || '',
        },
      });
    }
  };

  checkTermsAndConditionsRequired = () => {
    const termsAndConditionsEmpty = !this.state.termsAndConditions.value;
    if (termsAndConditionsEmpty) {
      const termsAndConditionsMsg = this.props.t(
        'common.signupFlow.acceptTermsPrivacy',
      );
      this.setState({
        termsAndConditions: {
          ...this.state.termsAndConditions,
          message: termsAndConditionsMsg,
        },
      });
      return false;
    }
    this.setState({
      termsAndConditions: {
        ...this.state.termsAndConditions,
        message: '',
        isValid: true,
      },
    });
    return true;
  };

  backArrowClick = () => {
    if (this.state.acceptTerms || this.state.acceptPolicy) {
      this.setState({
        acceptTerms: false,
        acceptPolicy: false,
      });
    } else if (this.state.showReferral) {
      this.setState({
        showReferral: false,
      });
    } else {
      this.props.onBack(false);
    }
  };
  closeSignUpForm = () => {
    if (this.state.showReferral) {
      this.setState({
        showReferral: false,
      });
    }
    this.props.closeSignupFlow(
      this.state.acceptTerms || this.state.acceptPolicy,
    );
    this.setState({
      acceptTerms: false,
      acceptPolicy: false,
    });
  };

  handleTerm = () => value => {
    this.setState({
      terms: value,
      termsError: value ? '' : this.state.termsError,
    });
  };

  toggleReferral = value => () => {
    this.setState({ showReferral: value });
  };

  submitReferral = value => {
    this.setState({ referralCode: value });
    this.toggleReferral(false)();
  };

  renderContent = () => {
    const signUp = formatSignUpByUserType(this.props.signupRole, this.props.t, this.props.entityData);
    if (this.state.showReferral) {
      return (
        <ReferralCode
          {...this.props}
          description={this.props.referralDescription}
          submitReferral={this.submitReferral}
          referralValue={this.state.referralCode}
          placeholder={this.props.t('common.referralCode')}
          primary_button={this.props.t('common.continue')}
          title={this.props.t('common.referralCode')}
        />
      );
    }
    return (
      <LoginContainer.SocialMediaSignup>
        {/* {this.state.loading && <ActionLoader />} */}
        <LoginContainer.Container className="popup-container">
          <LoginContainer.SubHead>
            {this.props.signupRole !== ROLE_FAN ? signUp.subHead : null}
          </LoginContainer.SubHead>
          <LoginContainer.Heading
            hasPadding={this.props.signupRole === ROLE_FAN}
          >
            {signUp.title}
          </LoginContainer.Heading>
          <LoginContainer.InputFieldsWrapper
            className={this.props.signupDetails.role === ROLE_FAN && 'fan-form'}
          >
            <LoginContainer.InputContainer>
              {this.props.statusCode === '410' ? (
                <LoginContainer.EmptyDiv />
              ) : (
                <div>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.WrapsInput hasMargin>
                      <Input
                        error={!!this.state.firstName.message}
                        type="text"
                        name="firstName"
                        inputProps={{
                          defaultProps: {
                            error: !!this.state.firstName.message,
                            value: this.state.firstName.value,
                            classes: {
                              root: 'input-root first-name',
                            },
                            onBlur: this.checkFirstRequired,
                            onChange: event =>
                              this.saveFormEntries(event, 'firstName'),
                          },
                          labelObj: {
                            label:
                              !this.state.firstName.message &&
                              signUp.item_1_placeholder_1,
                            errorMsg: this.state.firstName.message,
                          },
                        }}
                      />
                    </LoginContainer.WrapsInput>
                    <LoginContainer.WrapsInput hasMargin>
                      <Input
                        type="text"
                        name="lastName"
                        inputProps={{
                          defaultProps: {
                            error: !!this.state.lastName.message,
                            value: this.state.lastName.value,
                            classes: {
                              root: 'input-root last-name',
                            },
                            onBlur: this.checkLastRequired,
                            onChange: event =>
                              this.saveFormEntries(event, 'lastName'),
                          },
                          labelObj: {
                            label:
                              !this.state.lastName.message &&
                              signUp.item_1_placeholder_2,
                            errorMsg: this.state.lastName.message,
                          },
                        }}
                      />
                    </LoginContainer.WrapsInput>
                  </LoginContainer.InputWrapper>
                </div>
              )}
              {this.props.signupRole !== ROLE_STAR && (
                <React.Fragment>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.WrapsInput>
                      <Input
                        type="email"
                        name={signUp.key_2}
                        fullWidth
                        inputProps={{
                          defaultProps: {
                            error: !!this.state[signUp.key_2].message,
                            value: this.state[signUp.key_2].value,
                            classes: {
                              root: 'input-root',
                              input: 'input-label-stage-name',
                            },
                            onBlur: this[signUp.func_name_2],
                            onChange: event =>
                              this.saveFormEntries(event, signUp.key_2),
                          },
                          labelObj: {
                            label:
                              !this.state[signUp.key_2].message &&
                              signUp.item_2_placeholder,
                            errorMsg: this.state[signUp.key_2].message,
                          },
                        }}
                      />
                    </LoginContainer.WrapsInput>
                  </LoginContainer.InputWrapper>
                </React.Fragment>
              )}
              {this.props.signupRole === ROLE_STAR && (
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <Input
                      type="email"
                      name={signUp.key_4_1}
                      fullWidth
                      inputProps={{
                        defaultProps: {
                          error: !!this.state[signUp.key_4_1].message,
                          value: this.state[signUp.key_4_1].value,
                          classes: {
                            root: 'input-root',
                            input: 'input-label-email',
                          },
                          onBlur: () =>
                            this.checkEmail(this.state[signUp.key_4_1].value),
                          onChange: event =>
                            this.saveFormEntries(event, signUp.key_4_1),
                        },
                        labelObj: {
                          label:
                            !this.state[signUp.key_4_1].message &&
                            signUp.item_4_placeholder_1,
                          errorMsg: this.state[signUp.key_4_1].message,
                        },
                      }}
                    />
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
              )}

              <Phonenumber>
                <PhoneNumber
                  numProps={{
                    phoneRef: this.phoneRef,
                    label: this.state.phoneNumber.message
                      ? this.state.phoneNumber.message
                      : this.props.t('common.phoneLabel'),
                    value: this.state.phoneNumber.value,
                    countryChange: this.onPhneChange('countryCode'),
                    onChange: this.onPhneChange('value'),
                    notValid: this.state.phoneNumber.message,
                    country: this.props.entityData.country_code,
                  }}
                />
                <SmallDescription>
                  {this.props.t('common.signupFlow.phoneNote')}
                </SmallDescription>
              </Phonenumber>

              {(this.props.signupRole === ROLE_STAR ||
                !this.props.signupDetails.isSocial) && (
                <React.Fragment>
                  <LoginContainer.InputWrapper>
                    <LoginContainer.WrapsInput hasMargin>
                      <Input
                        type={this.state.showPassword ? 'text' : 'password'}
                        name={signUp.key_3_1}
                        inputProps={{
                          defaultProps: {
                            error: !!this.state[signUp.key_3_1].message,
                            value: this.state[signUp.key_3_1].value,
                            classes: {
                              root: 'input-root',
                              input: 'input-label-email',
                            },
                            onBlur: () => this[signUp.func_name_3](),
                            onChange: event =>
                              this.saveFormEntries(event, signUp.key_3_1),
                          },
                          labelObj: {
                            label:
                              !this.state[signUp.key_3_1].message &&
                              signUp.item_3_placeholder_1,
                            errorMsg: this.state[signUp.key_3_1].message,
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
                                        showPassword: !this.state.showPassword,
                                      });
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            },
                          },
                        }}
                      />
                    </LoginContainer.WrapsInput>
                    <LoginContainer.WrapsInput
                      hasMargin={this.props.signupRole === ROLE_FAN}
                    >
                      <Input
                        type="password"
                        name={signUp.key_3_2}
                        inputProps={{
                          defaultProps: {
                            // error: !!this.state[signUp.key_3_1].message,
                            value: this.state[signUp.key_3_2].value,
                            classes: {
                              root: 'input-root',
                              input: 'input-label-password',
                            },
                            onBlur: this[signUp.func_name_2],
                            onChange: event =>
                              this.saveFormEntries(event, signUp.key_3_2),
                          },
                          labelObj: {
                            label: signUp.item_3_placeholder_2,
                            errorMsg: this.state[signUp.key_3_1].message,
                          },
                        }}
                      />
                    </LoginContainer.WrapsInput>
                  </LoginContainer.InputWrapper>
                </React.Fragment>
              )}
              {!this.props.signupDetails.isSocial && (
                <SmallDescription className="note">
                  {this.props.t('common.passwordValid.description')}
                </SmallDescription>
              )}
              {(this.props.signupRole === ROLE_STAR ||
                !this.props.signupDetails.isSocial) && (
                <LoginContainer.WrapsInput classname="no-space">
                  {this.props.statusCode === undefined &&
                  this.props.errorType !== 'email' ? (
                    <LoginContainer.ErrorMsg>
                      {this.props.error}
                    </LoginContainer.ErrorMsg>
                  ) : (
                    <LoginContainer.EmptyDiv />
                  )}
                </LoginContainer.WrapsInput>
              )}
              {this.props.signupRole === ROLE_FAN && (
                <div className="trems-wrp">
                  <Checkbox
                    onChange={this.handleTerm()}
                    checked={this.state.terms}
                  />
                  <span className="terms">
                    <Trans
                      i18nKey="common.signupFlow.agreeTerms"
                      values={{
                        siteName: this.props.entityData.partner_name,
                      }}
                    >
                      I have read and agree to
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terms-link"
                        href="/terms-service"
                      >
                        {this.props.entityData.partner_name}'s Terms of Service
                      </a>
                      and
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="terms-link"
                        href="/privacy-policy"
                      >
                        Privacy Policy
                      </a>
                    </Trans>
                    <span className="terms-error">
                      &nbsp;{this.state.termsError}
                    </span>
                  </span>
                </div>
              )}
              {this.props.signupRole === ROLE_FAN ? null : (
                <div>
                  <LoginContainer.PrivacyContent className="privacy-check">
                    <Checkbox
                      onChange={this.toggleTermsAndConditions}
                      checked={this.state.termsAndConditions.value}
                    />
                    <span>
                      <Trans
                        i18nKey="common.signupFlow.agreeTerms"
                        values={{
                          siteName: this.props.entityData.partner_name,
                        }}
                      >
                        I have read and agree to
                        <LoginContainer.Anchor
                          target="_blank"
                          rel="noopener noreferrer"
                          href="/terms-service"
                        >
                          {this.props.entityData.partner_name}’s Terms of Service
                        </LoginContainer.Anchor>
                        and
                        <LoginContainer.Anchor
                          target="_blank"
                          rel="noopener noreferrer"
                          href="/privacy-policy"
                        >
                          Privacy Policy
                        </LoginContainer.Anchor>
                      </Trans>
                    </span>
                  </LoginContainer.PrivacyContent>

                  <LoginContainer.ErrorMsg>
                    {this.state.termsAndConditions.message}
                  </LoginContainer.ErrorMsg>
                </div>
              )}
              <ToolTip
                title={
                  !this.state.termsAndConditions.value &&
                  this.props.signupRole === ROLE_STAR
                    ? this.props.t('common.signupFlow.readTerms')
                    : ''
                }
              >
                <div>
                  <LoginContainer.ButtonWrapper className="align-center">
                    <SecondaryButton
                      type="submit"
                      id="registration"
                      onClick={this.onRegister}
                      isDisabled={
                        !this.state.termsAndConditions.value &&
                        this.props.signupRole === ROLE_STAR
                      }
                    >
                      {signUp.button_label}
                    </SecondaryButton>
                  </LoginContainer.ButtonWrapper>
                  {this.props.signupRole === ROLE_FAN && (
                    <LinkText
                      className="login-link"
                      onClick={() => {
                        this.props.toggleLogin(true);
                      }}
                    >
                      {this.props.t('common.login')}
                    </LinkText>
                  )}
                </div>
              </ToolTip>
              {this.props.signupRole === ROLE_STAR && (
                <span className="ref-login">
                  <LoginContainer.Link
                    onClick={this.toggleReferral(true)}
                    className="ref-link"
                  >
                    {this.state.referralCode
                      ? `${this.props.t('common.referralCode')}: ${
                          this.state.referralCode
                        }`
                      : this.props.t('common.haveReferral')}
                  </LoginContainer.Link>
                  |
                  <LinkText
                    className="login-link"
                    onClick={() => {
                      this.props.toggleLogin(true);
                    }}
                  >
                    {this.props.t('common.login')}
                  </LinkText>
                </span>
              )}
            </LoginContainer.InputContainer>
          </LoginContainer.InputFieldsWrapper>
        </LoginContainer.Container>
        {this.props.showFooter && (
          <LoginContainer.Link
            onClick={() => {
              this.props.changeSignUpRole(
                this.props.signupRole === ROLE_STAR ? ROLE_FAN : ROLE_STAR,
              );
            }}
          >
            {signUp.footer}
          </LoginContainer.Link>
        )}
      </LoginContainer.SocialMediaSignup>
    );
  };
  render() {
    return (
      <React.Fragment>
        {!this.props.disableNavigation && (
          <React.Fragment>
            <BackHeader
              rootClass="form-header"
              backHandler={this.backArrowClick}
              closeHandler={this.closeSignUpForm}
              noHelp
            />
          </React.Fragment>
        )}
        {this.renderContent()}
      </React.Fragment>
    );
  }
}

SignUpForm.defaultProps = {
  changeStep: () => {},
  disableNavigation: false,
};

SignUpForm.propTypes = {
  changeStep: PropTypes.func,
  disableNavigation: PropTypes.bool,
};

// const mapStateToProps = state => ({
//   loading: state.session.loading,
//   signupDetails: state.signupDetails,
//   entityData: state.entity.data,
//   errorType: state.session.errorType,
// });

// const mapProps = dispatch => ({
//   updateLoginStatus: sessionDetails =>
//     dispatch(updateLoginStatus(sessionDetails)),
//   fetchUserDetails: id => dispatch(fetchUserDetails(id)),
//   toggleLogin: state => dispatch(toggleLogin(state)),
// });

export default withTranslation()(SignUpForm)

