import React from 'react';
// import isEmpty from "lodash/isEmpty";
import { withTranslation, Trans } from 'next-i18next';
import Input from 'components/TextInput';
import { LinkText } from 'styles/TextStyled';
// import Api from '../../lib/api';
// import forgotPassword from '../../utils/forgotPassword';
import Loader from '../Loader';
import Button from '../SecondaryButton';
import { LoginContainer } from '../../components/LoginForm/styled';
import { ForgotPasswordWrap } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import forgotPassword from 'src/utils/forgotPassword';
import Api from 'src/lib/api';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', isValid: true, message: '' },
      message: '',
      loader: false,
      errorCondition: false,
      successCondition: false,
    };
  }

  componentWillUnmount() {
    this.props.updateToast({
        value: false,
    })
  }

  onForgotPassword = e => {
    e.preventDefault();
    if (this.checkEmail() && !this.state.successCondition) {
      this.setState({ loader: true });
      forgotPassword(Api.forgotPassword, { email: this.state.email.value })
        .then(response => {
          this.setState({
            message: response.data.data,
            successCondition: true,
            errorCondition: false,
            loader: false,
          });
          this.props.updateToast({
              value: false,
          })
        })
        .catch(exception => {
          if (exception.response && exception.response.data && exception.response.data.error) {
            this.props.updateToast({
              message: exception.response.data.error.code === 1003 ?
          this.renderCustomError : exception.response.data.error.message,
                value: true,
                variant: 'error',
                global: true
            })
            this.setState({
              successCondition: false,
              errorCondition: true,
              loader: false,
            });
          }
        });
    }
    if (this.state.successCondition) {
      this.props.changeView('login');
    }
  };
  acceptEmailHandler = e => {
    this.setState({ email: { ...this.state.email, isValid: true, value: e.target.value } });
  };
  checkEmail = () => {
    const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; // To check email validity

    if (isEmpty(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, isValid: false, message: this.props.t('common.emailError') },
      });
      return false;
    }
    if (!emailRegex.test(this.state.email.value)) {
      this.setState({
        email: { ...this.state.email, isValid: false, message: this.props.t('common.emailError') },
      });
      return false;
    }
    this.setState({
      email: { ...this.state.email, message: '', isValid: true },
    });
    return true;
  };

  renderCustomError = () => {
    return (
      <React.Fragment>
        <Trans i18nKey="common.forgotPassword.emailError">
          This email is not currently registered in our system.<LinkText className='link' onClick={() => {
            this.props.toggleSignup(true);
            this.props.updateToast({
                value: false,
            })
          }}>Create account</LinkText>
        </Trans>
      </React.Fragment>
    )
  }

  render() {
    const { email } = this.state;
    return (
      <LoginContainer.SocialMediaSignup>
        <LoginContainer.Container>
          {this.state.loader ? (
            <ForgotPasswordWrap.loaderWrapper>
              <Loader />
            </ForgotPasswordWrap.loaderWrapper>
          ) : null}
          <React.Fragment>
            {this.state.successCondition ? (
              <ForgotPasswordWrap>
                <ForgotPasswordWrap.Message>
                  <ForgotPasswordWrap.Logo
                    imageUrl="/images/emailsent.svg"
                    alt=""
                  />
                  <ForgotPasswordWrap.Heading>
                    {this.props.t('common.forgotPassword.passwordResetHead')}
                  </ForgotPasswordWrap.Heading>
                  <ForgotPasswordWrap.MailContent>
                    {this.props.t('common.forgotPassword.passwordResetContent')}
                  </ForgotPasswordWrap.MailContent>
                </ForgotPasswordWrap.Message>
              </ForgotPasswordWrap>
            ) : (
              <React.Fragment>
                <LoginContainer.Heading className="forgot-heading">
                  { this.props.t('common.forgotPassword.heading') }
                </LoginContainer.Heading>
                <LoginContainer.InputFieldsWrapper>
                  <LoginContainer.InputContainer>
                    <LoginContainer.InputWrapper>
                      <ForgotPasswordWrap.InputContainer className="forgot-input">
                        <Input
                          type='email'
                          name='email'
                          fullWidth
                          inputProps={{
                            defaultProps: {
                              error: !this.state.email.isValid,
                              value: email.value,
                              classes: {
                                shrink: 'input-label-shrink',
                                root: 'input-label',
                                error: 'input-error',
                              },
                              onBlur: this.checkEmail,
                              onChange: this.acceptEmailHandler
                            },
                            labelObj: {
                              label: this.state.email.isValid ? this.props.t('common.forgotPassword.emailLabel') : '',
                              errorMsg: !this.state.email.isValid
                              ? this.state.email.message
                              : null,
                            },
                          }}
                        />
                        <LoginContainer.ErrorMsg>
                          {this.state.errorCondition
                            ? this.state.message
                            : null}
                        </LoginContainer.ErrorMsg>
                      </ForgotPasswordWrap.InputContainer>
                    </LoginContainer.InputWrapper>
                  </LoginContainer.InputContainer>
                </LoginContainer.InputFieldsWrapper>
              </React.Fragment>
            )}
            <ForgotPasswordWrap>
              <LoginContainer.ButtonWrapper className="align-center">
                <Button
                  secondary={this.state.successCondition ? '' : 'secondary'}
                  onClick={this.onForgotPassword}
                  disabled={this.props.loading}
                  value="Continue"
                  type="submit"
                >
                  {this.state.successCondition ? this.props.t('common.login') : this.props.t('common.continue')}
                </Button>
              </LoginContainer.ButtonWrapper>
            </ForgotPasswordWrap>
          </React.Fragment>
        </LoginContainer.Container>
      </LoginContainer.SocialMediaSignup>
    );
  }
}

export default withTranslation()(ForgotPassword);
