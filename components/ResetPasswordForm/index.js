import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { withTranslation, Trans } from 'react-i18next';
// import { Redirect } from 'react-router-dom';
import { Description } from 'styles/TextStyled';
// import { passwordRegex } from 'constants/regex/formRegex';
// import { parseQueryString } from 'utils/dataformatter';
// import Api from '../../lib/api';
// import resetPassword from '../../utils/resetPassword';
import PrimaryButton from '../PrimaryButton';
import { TextInput } from '../TextField';
import { LoginContainer } from './styled';
import { ForgotPasswordWrap } from '../../components/ForgotPasswordForm/styled';
import RequestFlowPopup from '../RequestFlowPopup';
import { passwordRegex } from 'src/constants/regex/formRegex';
import { withRouter } from 'next/router';
import Api from 'src/lib/api';
import resetPassword from 'src/utils/resetPassword';
import { withPartnerData, withQueryClient } from 'customHooks/reactQueryHooks';
import { updateLoginStatus, withSession } from 'src/context/session';
import { fetchUserDetails, withLoggedUser } from 'customHooks/sessionUtils/useFetchLoggedUser';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    const { popup } = props.router.query;
    this.state = {
      showNames: popup,
      newPassword: { value: '', isValid: false, message: '' },
      retypePassword: { value: '', isValid: false, message: '' },
      firstName: { value: '', isValid: true, message: '' },
      lastName: { value: '', isValid: true, message: '' },
      showPassword: false,
      errorMsg: '',
      redirect: false,
    };
  }
  onResetPassword = e => {
    if (this.checkPassword()) {
      if (this.props.router.query.reset_id) {
        const resetId = this.props.router.query.reset_id
        resetPassword(Api.resetPassword, {
          password: this.state.newPassword.value,
          reset_id: resetId,
          first_name: this.state.firstName.value,
          last_name: this.state.lastName.value,
          login: 'true',
        })
          .then(response => {
            if (response.status === 200) {
              const userData = response.data.data.user;
              updateLoginStatus(this.props.sessionDispatch, userData);
              this.props.refetchLoggedUser()
              this.setState({redirect: true})
            }
          })
          .catch(exception => {
            this.setState({ errorMsg: exception.response.data.error.message });
          });
      } else {
        this.checkPassword();
      }
    }
  };
  checkPassword = () => {
    const pattern = passwordRegex; // Accepts values with min 8 characters, at least one number and at least one letter
    if (isEmpty(this.state.newPassword.value)) {
      this.setState({
        newPassword: {
          ...this.state.newPassword,
          message: this.props.t('common.passwordValid.empty'),
        },
      });
      return false;
    }
    if (!pattern.test(this.state.newPassword.value)) {
      this.setState({
        newPassword: {
          ...this.state.newPassword,
          message:
          this.props.t('common.passwordValid.invalid')
        },
      });
      return false;
    }
    this.setState({
      newPassword: { ...this.state.newPassword, message: '', isValid: true },
    });
    return this.checkConfirmPassword();
  };
  saveFormEntries = (event, type) => {
    this.setState({
      [type]: { ...this.state[type], value: event.target.value },
    });
  };
  checkConfirmPassword = () => {
    if (
      this.state.newPassword.value !== '' &&
      this.state.newPassword.value === this.state.retypePassword.value
    ) {
      this.setState({
        retypePassword: {
          ...this.state.retypePassword,
          message: '',
          isValid: true,
        },
      });
      return true;
    }
    this.setState({
      retypePassword: {
        ...this.state.retypePassword,
        message: this.props.t('common.passwordValid.notMatch'),
        isValid: false,
      },
    });
    return false;
  };
  showPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    if (this.state.redirect) {
      const { isStar, isLoggedIn } = this.props
      if (isLoggedIn) {
        this.props.router.push(isStar ? '/manage' : '/browse-stars')
        // return (
        //   <Redirect to={this.props.starRole ? '/manage' : '/browse-stars'} />
        // );
        return null
      }
    }
    return (
      <RequestFlowPopup dotsCount={0} disableClose>
        <LoginContainer.SocialMediaSignup>
          <LoginContainer.Container>
            <LoginContainer.Heading>{this.props.t('common.passwordValid.resetPass')}</LoginContainer.Heading>

            <LoginContainer.InputFieldsWrapper>
              <Description className="note">
                {this.props.t('common.passwordValid.description')}
              </Description>
              <LoginContainer.InputContainer>
                {
                  this.state.showNames ?
                    <LoginContainer.InputWrapper>
                      <LoginContainer.WrapsInput className='col'>
                        <LoginContainer.PasswordWrapper>
                          <TextInput
                            error={!!this.state.retypePassword.message}
                            label={this.props.t('common.fields.firstName')}
                            type="text"
                            fullWidth
                            name="firstName"
                            value={this.state.firstName.value}
                            InputLabelProps={{
                              classes: {
                                shrink: 'input-label-shrink',
                                root: 'input-label',
                                error: 'input-error',
                              },
                            }}
                            onChange={event =>
                              this.saveFormEntries(event, 'firstName')
                            }
                          />
                        </LoginContainer.PasswordWrapper>
                      </LoginContainer.WrapsInput>
                      <LoginContainer.WrapsInput className='col'>
                        <LoginContainer.PasswordWrapper>
                          <TextInput
                            error={!!this.state.retypePassword.message}
                            label={this.props.t('common.fields.lastName')}
                            type="text"
                            fullWidth
                            name="lastName"
                            value={this.state.lastName.value}
                            InputLabelProps={{
                              classes: {
                                shrink: 'input-label-shrink',
                                root: 'input-label',
                                error: 'input-error',
                              },
                            }}
                            onChange={event =>
                              this.saveFormEntries(event, 'lastName')
                            }
                          />
                        </LoginContainer.PasswordWrapper>
                      </LoginContainer.WrapsInput>
                    </LoginContainer.InputWrapper>
                  : null
                }
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <LoginContainer.PasswordWrapper>
                      <TextInput
                        error={!!this.state.newPassword.message}
                        label={this.props.t('common.fields.chooseNewPassword')}
                        type={this.state.showPassword ? 'text' : 'password'}
                        fullWidth
                        name="newPassword"
                        value={this.state.newPassword.value}
                        InputLabelProps={{
                          classes: {
                            shrink: 'input-label-shrink',
                            root: 'input-label',
                            error: 'input-error',
                          },
                        }}
                        onChange={event =>
                          this.saveFormEntries(event, 'newPassword')
                        }
                      />
                      {this.state.newPassword.value && (
                        <span
                          className="show-password"
                          onClick={this.showPasswordClick}
                          role="presentation"
                        >
                          {this.state.showPassword
                            ? 'Hide Password'
                            : 'Show Password'}
                        </span>
                      )}
                    </LoginContainer.PasswordWrapper>
                    <LoginContainer.ErrorMsg>
                      {this.state.newPassword.message}
                    </LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                <LoginContainer.InputWrapper>
                  <LoginContainer.WrapsInput>
                    <LoginContainer.PasswordWrapper>
                      <TextInput
                        error={!!this.state.retypePassword.message}
                        label={this.props.t('common.fields.retypePassword')}
                        type="password"
                        fullWidth
                        name="retypePassword"
                        value={this.state.retypePassword.value}
                        InputLabelProps={{
                          classes: {
                            shrink: 'input-label-shrink',
                            root: 'input-label',
                            error: 'input-error',
                          },
                        }}
                        onChange={event =>
                          this.saveFormEntries(event, 'retypePassword')
                        }
                      />
                    </LoginContainer.PasswordWrapper>
                    <LoginContainer.ErrorMsg>
                      {this.state.retypePassword.message}
                    </LoginContainer.ErrorMsg>
                  </LoginContainer.WrapsInput>
                </LoginContainer.InputWrapper>
                <LoginContainer.Terms>
                  <Trans
                    i18nKey="common.passwordValid.terms"
                    values={{
                      siteName: this.props.partnerData?.siteName,
                      terms: this.props.t('common.about.termsHeading'),
                      privacy: this.props.t('common.about.privacyHeading'),
                    }}
                  >
                    By creating your password, you agree to {this.props.partnerData?.siteName}’s <a className='link' href='/terms-service' target="_blank">{this.props.t('common.about.termsHeading')}</a> and <a className='link' href="/privacy-policy" target="_blank">{this.props.t('common.about.privacyHeading')}</a>.
                  </Trans>
                </LoginContainer.Terms>
                <ForgotPasswordWrap>
                  <LoginContainer.ButtonWrapper className="align-center">
                    <PrimaryButton
                      onClick={this.onResetPassword}
                      disabled={this.props.loading}
                      value="Reset Password"
                      type="submit"
                    >
                      {this.props.t('common.resetPassword')}
                    </PrimaryButton>
                  </LoginContainer.ButtonWrapper>
                  <LoginContainer.ErrorMsg>
                    {this.state.errorMsg}
                  </LoginContainer.ErrorMsg>
                </ForgotPasswordWrap>
              </LoginContainer.InputContainer>
            </LoginContainer.InputFieldsWrapper>
            <LoginContainer.WrapsInput />
          </LoginContainer.Container>
        </LoginContainer.SocialMediaSignup>
      </RequestFlowPopup>)  }
}

export default withTranslation()(withRouter(withPartnerData(withQueryClient(withSession(withLoggedUser(ResetPassword))))));
