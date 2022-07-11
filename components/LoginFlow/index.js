import React from 'react';
import RequestFlowPopup from '../RequestFlowPopup';
import { LoginContainer } from './styled';
import Loader from '../../components/Loader';
import { withSession } from 'src/context/session';
import { withGeneral } from 'src/context/general';
import LoginForm from 'components/LoginForm';
import Script from 'next/script';
import { withRouter } from 'next/router';
import ForgotPasswordForm from 'components/ForgotPasswordForm';
import { withMedia } from 'customHooks/domUtils';

class LoginFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socialData: {},
      selectedView: 'login',
    };
    if (!this.props.isLoggedIn) {
      // this.props.resetSessionError();
    }
  }

  changeView = view => {
    this.setState({ selectedView: view });
  };

  saveData = data =>
    this.setState({ socialData: { ...this.state.socialData, ...data } });

  onLoginComplete = () => {
    if (!this.props.loginModalOptions?.options?.noRedirect && this.props.starRole) {
      this.props.router.push('/manage')
    }
    if (this.props.loginModalOptions.options.onSuccess) {
      this.props.loginModalOptions.options.onSuccess(this.props.starRole);
    }
    this.props.toggleLogin(false);
  };

  loadSignup = () => {
    if (this.props.loginOptions && this.props.loginOptions.preventStarLogin) {
      this.props.setSignupFlow({
        role: 'fan',
        disableRoleChange:
          this.props.loginOptions && this.props.loginOptions.preventStarLogin
            ? true
            : false,
      });
    }
    this.props.toggleSignup(
      true,
      this.props.loginOptions ? { ...this.props.loginOptions } : {},
    );
  };

  setLoginEmail = email => {
    this.props.setLoginEmail(email);
  };
  render() {
    return (
      <>

        <RequestFlowPopup
          dotsCount={0}
          selectedDot={1}
          closePopUp={() => this.props.toggleLogin(false)}
          closeClass={this.props.isMobile ? 'absolute' : ''}
          smallPopup
        >
          {this.props.loading && (
            <LoginContainer.LoaderWrapper>
              <Loader />
            </LoginContainer.LoaderWrapper>
          )}

          <LoginContainer.wrapper>
            <LoginContainer>
              <LoginContainer.LeftSection>
                {this.state.selectedView === 'forgotpassword' ? (
                  <ForgotPasswordForm
                    changeView={this.changeView}
                    {...this.props}
                  />
                ) : null}
                {this.state.selectedView === 'login' ? (
                  <LoginForm
                    {...this.props}
                    onLoginComplete={this.onLoginComplete}
                    changeView={this.changeView}
                    data={this.state.socialData}
                    saveData={this.saveData}
                    loadSignup={this.loadSignup}
                    setLoginEmail={email => this.setLoginEmail(email)}
                    closeLogin={() => this.props.toggleLogin(false)}
                  />
                  ) : null}
              </LoginContainer.LeftSection>
            </LoginContainer>
          </LoginContainer.wrapper>
        </RequestFlowPopup>
      </>
    );
  }
}

export default withRouter(withGeneral(withSession(withMedia(LoginFlow))))
