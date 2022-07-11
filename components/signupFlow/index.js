import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { withTranslation } from 'react-i18next';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import RequestFlowPopup from '../RequestFlowPopup';
import SignUpForm from '../SignupForm';
import SignupMethod from './components/SignupMethod';
import SignUpImageUpload from './components/SignUpImageUpload';
import RegistrationSuccess from './components/RegistrationSuccess';
import { LoginContainer } from './styled';
import { LoginTypeSelector } from './components/LoginTypeSelector';

import {
  FAN_REG_SUCCESS,
  STAR_REG_SUCCESS,
  COMPLETE_SIGNUP,
  CONFIRM_PASSWORD,
  REFERRAL,
} from './constants';
// import { celebritySignupProfile } from '../../services/userRegistration';
// import resetPassword from 'src/utils/resetPassword';
import { parseQueryString, iosPriceFinder } from 'src/utils/dataformatter';
// import Api from '../../lib/api';
import CompleteSignup from '../../components/CompleteSignup';
// import ConfirmPassword from '../../components/ConfirmPassword';

import { withTranslation } from 'next-i18next';
import { withRouter } from 'next/router';
import resetPassword from 'src/utils/resetPassword';
import Api from 'src/lib/api';
import ConfirmPassword from 'components/ConfirmPassword';
import { withSession } from 'src/context/session';
import { loginOptions, withGeneral } from 'src/context/general';
import { celebritySignupProfile } from 'src/services/myfanpark/loginActions';


class SignupFlow extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      selectedType:
        props.signupDetails.role
          ? props.signupDetails.role
          : null,
      socialData: {},
      currentStep: props.signupDetails.currentStep
        ? props.signupDetails.currentStep
        : 0,
      profession: props.signupDetails.categoryList
        ? props.signupDetails.categoryList
        : [],
      scrollRef: null,
      disableClose: false,
      skipVideo: false,
      audioVideoSupport: true,
      name: cookies.get('name') || 'signupDetails',
      completedSignup:
        this.props.signupDetails.completedSignup !== undefined
          ? this.props.signupDetails.completedSignup
          : true,
      isDemoUser:
        this.props.signupDetails.isDemoUser !== undefined
          ? this.props.signupDetails.isDemoUser
          : false,
    };
  }

  componentWillUnmount() {
    this.props.clearRegisterErrors(this.props.sessionContext[1]);
    const signupDetails = { ...this.props.signupDetails };
    signupDetails.disableRoleChange = false;
    this.props.setSignupFlow(signupDetails);
    this.props.setVideoUploadedFlag(false);
  }

  onBack = flag => {
    this.changeStep(this.state.currentStep - 1);
  };

  getBioDetails = bioDetails => {
    this.setState({ bioDetails });
  };

  saveData = data =>
    this.setState({ socialData: { ...this.state.socialData, ...data } });

  changeStep = step => {
    this.state.scrollRef.scrollTop = 0;
    this.props.setSignupFlow({ currentStep: step });
    this.setState({ currentStep: step });
  };
  closeSignUp = () => {
    this.props.toggleSignup(false);
    this.props.completedSignup(false);

    this.state.selectedType === 'star' && this.state.currentStep === 8
      ? this.props.completedSignup(true)
      : this.props.completedSignup(false);
  };
  closeSignUpForm = isTermsAndCondition => {
    if (isTermsAndCondition) {
      this.setState({
        switched: false,
        disableClose: false,
      });
    } else {
      this.closeSignUp();
    }
  };

  continueSignUp = () => {
    if (this.props.router.query.migrated) {
      this.setState({
        currentStep: this.props.router.query.migrated ? 1 : this.state.currentstep,
        completedSignup: true,
        selectedType: 'star',
      });
    } else {
      if (this.props.sessionData?.signupDetails?.incompleteCeleb) {
        this.changeSignUpRole('star')
      }
      this.setState({
        completedSignup: true,
      });
    }

    this.props.completedSignup(true);
  };

  changeSignUpRole = role => {
    this.setState({ selectedType: role });
    this.props.setSignupFlow({ role });
    this.props.clearRegisterErrors(this.props.sessionContext[1]);
    this.state.scrollRef.scrollTop = 0;
    switch (role) {
      case 'star' :
        if (window.dataLayer) {
          window.dataLayer.push({'event': `Select ${this.props.entityData?.talentSingle} Role`});
        }
        break;
      case 'fan' :
        if (window.dataLayer) {
          window.dataLayer.push({'event': `Select ${this.props.entityData?.purchaserSingle} Role`});
        }
        break;
      default: break;
    }
  };

  disableClose = flag => {
    this.setState({ disableClose: flag });
  };

  signupMethodBack = () => {
    this.setState({ selectedType: null });
  };
  submitCelebrityDetails() {
    const { cookies } = this.props;
    const celebrityProfileData = {
      weekly_limits: 100,
      availability: true,
      profile_video: '',
      description: '',
    };
    // this.props.loaderAction(true);
    celebritySignupProfile(celebrityProfileData)
      .then(success => {
        this.props.setJustSignup(true);
        // this.props.loaderAction(false);
        if (success) {
          this.props.setSignupFlow({
            currentStep: this.state.currentStep + 1,
          });
          this.setState({
            currentStep: this.state.currentStep + 1,
          }, () => {
            const signupData = cookies.get('signupDetails') || {};
            signupData.currentStep = this.state.currentStep + 1;
            signupData.profileImage = this.props.signupDetails.profileImage;
            cookies.set(this.state.name, signupData, {
              path: '/',
              expires: new Date(signupData.expiryDate),
              sameSite: 'Strict',
            });
          })
        }
      })
      .catch(error => {
        // this.props.loaderAction(false);
        this.props.updateToast({
          value: true,
          message: this.props.t('common.refresh_error'),
          variant: 'error',
        });
      });
  }

  goToBrowseStars = () => {
    this.props.router.push('/browse-stars');
    this.closeSignUp();
  };

  goToSettings = () => {
    this.props.router.push('/manage/storefront/profile/name-photo', undefined, { shallow: true })
    this.closeSignUp();
  }

  continueClickHandler = (fileImage, cropImage) => {
    if (fileImage || cropImage) {
      this.submitCelebrityDetails()
    }
  };

  handleSignupFlow = signupDetails => {
    const { cookies } = this.props;
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const signupData = signupDetails;
    const queryString = this.props.location
      ? parseQueryString(this.props.location.search)
      : '';
    signupData.expiryDate = expiryDate;
    signupData.role = this.props.signupDetails.role;
    signupData.currentStep = this.state.currentStep + 1;
    if (queryString.referral) {
      signupData.referral = queryString.referral;
      const details = {
        ...signupDetails,
        referral: queryString.referral,
      };
      this.props.setSignupFlow(details);
    } else {
      this.props.setSignupFlow(signupDetails);
    }
    cookies.set(this.state.name, signupData, {
      path: '/',
      expires: expiryDate,
      sameSite: 'Strict',
    });
    cookies.set('loginDetails', this.props.tempLoginDetails, {
      path: '/',
      expires: expiryDate,
      sameSite: 'Strict',
    });
  };

  gotToHome = () => {
    if (this.state.selectedType === 'fan') {
      this.props.router.push('/browse-stars');
    } else {
      this.props.router.push('/manage/storefront/services/personalized-videos', undefined, { shallow: true })
    }
    this.closeSignUp();
  };
  onResetPassword = password => {
    if (window.location) {
      const queryString = window.location.search
        ? parseQueryString(window.location.search)
        : '';
      resetPassword(Api.resetPassword, {
        password,
        reset_id: queryString.reset_id,
      })
        .then(async response => {
          if (response.status === 200) {
            if (locStore) {
              locStore.setItem(
                'tempAuthToken',
                JSON.stringify(response.data.data.details.authentication_token),
              );
            }
            const userDetailsResponse = await this.props.fetchUserDetails(
              queryString.user_id,
              response.data.data.details.authentication_token,
            );
            if (userDetailsResponse) {
              const userData = this.props.userDetails.settings_userDetails;
              const celebrityData = this.props.userDetails
                .settings_celebrityDetails;
              let professions = celebrityData?.profession_details;
              professions = professions.map((profession, index) => {
                const item = profession;
                item.label = celebrityData?.profession_details[index].title;
                item.value = celebrityData?.profession_details[index].id;
                return item;
              });
              const signupData = {
                role: this.props.userDetails.role === 'R1002' ? 'star' : '',
                currentStep: 1,
                acceptTerms: false,
                isSocial: false,
                source: '',
                firstName: userData.first_name,
                lastName: userData.last_name,
                nickName: userData.nick_name,
                email: userData.email.trim(),
                profileImage: userData.avatar_photo
                  ? userData.avatar_photo.thumbnail_url
                  : null,
                categoryList: professions,
                price: celebrityData?.rate,
                referral: '',
              };
              this.props.setSignupFlow(signupData);
              this.props.setDemoUser(false);
              this.props.completedSignup(false);
              this.setState({
                isDemoUser: false,
                completedSignup: false,
              });
            }
          }
        })
        .catch(async exception => {
          this.props.updateToast({
            value: true,
            message: exception.response.data.error.message,
            variant: 'error',
          });
        });
    }
  };

  setScrollRef = scrollNode => {
    this.setState({ scrollRef: scrollNode });
  };

  renderSteps = () => {
    if (this.state.selectedType === 'fan') {
      switch (this.state.currentStep) {
        case 1:
          return (
            <LoginContainer.SignupContainer>
              <SignUpForm
                {...this.props}
                registerUser={this.props.registerUser}
                changeStep={this.changeStep}
                showFooter
                changeSignUpRole={this.changeSignUpRole}
                currentStep={this.state.currentStep}
                signupRole={this.state.selectedType}
                data={this.state.socialData}
                onBack={this.onBack}
                switched={this.state.switched}
                disableClose={this.disableClose}
                socialMediaStore={this.props.socialMediaStore}
                closeSignupFlow={this.closeSignUp}
              />
            </LoginContainer.SignupContainer>
          );
        case 2:
          return (
            <RegistrationSuccess
              {...this.props}
              closeSignupFlow={this.closeSignUp}
              audioVideoSupport={this.state.audioVideoSupport}
              signupRole={this.state.selectedType}
              skipVideo={this.state.skipVideo}
              description={FAN_REG_SUCCESS(this.props.t, this.props.entityData).DESCRIPTION}
              history={this.props.history}
              icon={FAN_REG_SUCCESS(this.props.t, this.props.entityData).ICON}
              image_url={FAN_REG_SUCCESS(this.props.t, this.props.entityData).IMAGE_URL}
              message={FAN_REG_SUCCESS(this.props.t, this.props.entityData).MESSAGE}
              primary_button={FAN_REG_SUCCESS(this.props.t, this.props.entityData).PRIMARY_BUTTON}
              booking_primary_button={FAN_REG_SUCCESS(this.props.t, this.props.entityData).BOOKING_PRIMARY_BUTTON}
              primaryButtonClick={this.goToBrowseStars}
              secondary_button={FAN_REG_SUCCESS(this.props.t, this.props.entityData).SECONDARY_BUTTON}
              secondaryButtonClick={this.gotToHome}
              title={FAN_REG_SUCCESS(this.props.t, this.props.entityData).TITLE}
            />
          );
        default:
          return null;
      }
    } else if (this.state.selectedType === 'star') {
      switch (this.state.currentStep) {
        case 1:
          return (
            <LoginContainer.SignupContainer>
              <SignUpForm
                {...this.props}
                registerUser={this.props.registerUser}
                showFooter
                changeStep={this.changeStep}
                referralDescription={REFERRAL(this.props.t, this.props.entityData).DESCRIPTION}
                changeSignUpRole={this.changeSignUpRole}
                setSignupFlow={this.handleSignupFlow}
                scrollRef={this.state.scrollRef}
                currentStep={this.state.currentStep}
                signupRole={this.state.selectedType}
                data={this.state.socialData}
                closeSignupFlow={this.closeSignUpForm}
                onBack={this.onBack}
                switched={this.state.switched}
                disableClose={this.disableClose}
              />
            </LoginContainer.SignupContainer>
          );
        case 2:
          return (
            <SignUpImageUpload
              {...this.props}
              scrollRef={this.state.scrollRef}
              currentStep={this.state.currentStep}
              setSignupFlow={payload => this.props.setSignupFlow(payload)}
              signupRole={this.state.selectedType}
              closeSignupFlow={this.closeSignUp}
              onBack={this.onBack}
              continueClickCallback={this.continueClickHandler}
              updateProfilePhoto={this.props.updateProfilePhoto}
              setProfilePicToState={this.props.setProfilePicToState}
              profilePic={this.props.profilePic}
            />
          );

        case 3:
          return (
            <RegistrationSuccess
              {...this.props}
              closeSignupFlow={this.closeSignUp}
              cookies={this.props.cookies}
              signupRole={this.state.selectedType}
              audioVideoSupport={this.state.audioVideoSupport}
              skipVideo={this.state.skipVideo}
              description={STAR_REG_SUCCESS(this.props.t, this.props.entityData).DESCRIPTION}
              icon={FAN_REG_SUCCESS(this.props.t, this.props.entityData).ICON}
              history={this.props.history}
              image_url={FAN_REG_SUCCESS(this.props.t, this.props.entityData).IMAGE_URL}
              message={FAN_REG_SUCCESS(this.props.t, this.props.entityData).MESSAGE}
              primary_button={STAR_REG_SUCCESS(this.props.t, this.props.entityData).PRIMARY_BUTTON}
              primaryButtonClick={this.goToSettings}
              secondary_button={STAR_REG_SUCCESS(this.props.t, this.props.entityData).SECONDARY_BUTTON}
              secondaryButtonClick={this.gotToHome}
              title={FAN_REG_SUCCESS(this.props.t, this.props.entityData).TITLE}
            />
          );

        default:
          return null;
      }
    }
    return null;
  };
  render() {
    return (
      <div>
        <RequestFlowPopup
          closePopUp={this.closeSignUp}
          noPadding
          setScrollRef={this.setScrollRef}
          disableClose
        >
          {this.state.isDemoUser ? (
            <ConfirmPassword
              onResetPassword={this.onResetPassword}
              loaderAction={this.props.loaderAction}
              title1={CONFIRM_PASSWORD(this.props.t, this.props.entityData).TITLE1}
              input_txt_1={CONFIRM_PASSWORD(this.props.t, this.props.entityData).FIRST_INPUT_TEXT}
              input_txt_2={CONFIRM_PASSWORD(this.props.t, this.props.entityData).SECOND_INPUT_TEXT}
              sub_title={CONFIRM_PASSWORD(this.props.t, this.props.entityData).SUB_TITLE}
              button_txt={CONFIRM_PASSWORD(this.props.t, this.props.entityData).BUTTON_TEXT}
            />
          ) : (
            <React.Fragment>
              {!this.state.completedSignup ? (
                <CompleteSignup
                  title={COMPLETE_SIGNUP(this.props.t, this.props.entityData).TITLE}
                  image_url={COMPLETE_SIGNUP(this.props.t, this.props.entityData).IMAGE_URL}
                  main_title={COMPLETE_SIGNUP(this.props.t, this.props.entityData).MAIN_TITLE}
                  description={COMPLETE_SIGNUP(this.props.t, this.props.entityData).DESCRIPTION}
                  primary_button={COMPLETE_SIGNUP(this.props.t, this.props.entityData).PRIMARY_BUTTON}
                  secondary_button={COMPLETE_SIGNUP(this.props.t, this.props.entityData).SECONDARY_BUTTON}
                  primaryButtonClick={this.continueSignUp}
                  secondaryButtonClick={this.closeSignUp}
                  onClose={this.closeSignUp}
                />
              ) : (
                <LoginContainer>
                  {!this.state.selectedType ? (
                    <LoginTypeSelector
                      isSignUp
                      onClose={this.closeSignUp}
                      changeSignUpRole={this.changeSignUpRole}
                      changeStep={this.changeStep}
                      currentStep={this.state.currentStep}
                    />
                  ) : (
                    <LoginContainer.SignupFlow
                      currentStep={this.state.currentStep}
                    >
                      {this.state.currentStep === 0 ? (
                        <SignupMethod
                          {...this.props}
                          changeStep={this.changeStep}
                          onBack={this.signupMethodBack}
                          currentStep={this.state.currentStep}
                          changeSignUpRole={this.changeSignUpRole}
                          setSignupFlow={payload => this.props.setSignupFlow(payload)}
                          signupRole={this.state.selectedType}
                          data={this.state.socialData}
                          signupOptions={this.props.generalContext[0].modals.signupOptions}
                          closeSignupFlow={this.closeSignUp}
                        />
                      ) : (
                        this.renderSteps()
                      )}
                    </LoginContainer.SignupFlow>
                  )}
                </LoginContainer>
              )}
            </React.Fragment>
          )}
        </RequestFlowPopup>
      </div>
    );
  }
}
// const mapStateToProps = (state, ownProps) => ({
//   isLoggedIn: state.session.isLoggedIn,
//   tempLoginDetails: state.session.tempDetails,
//   userDetails: state.userDetails,
//   loading: state.session.loading,
//   error: state.session.incorrectError,
//   statusCode: state.session.statusCode,
//   sessionUserId: state.session.auth_token.user_id,
//   signupDetails: state.signupDetails,
//   redirectUrls: state.redirectReferrer,
//   followCelebData: state.followCelebrityStatus,
//   socialMediaStore: state.socialMediaData,
//   commonReducer: state.commonReducer,
//   inAppPriceList: state.config.data.in_app_pricing || [],
//   profilePic: state.photoUpload.profilePic,
//   cookies: ownProps.cookies,
//   isBookingFlow: state.modals.requestFlow,
//   user_id: state.userDetails.settings_userDetails.user_id,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchUserDetails: (id, authToken) =>
//     dispatch(fetchUserDetails(id, authToken)),
//   registerUser: (registerData, loader) =>
//     dispatch(
//       registerUser(registerData, loader),
//     ),
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: obj => dispatch(updateToast(obj)),
//   socialMediaLogin: socialObject => dispatch(socialMediaLogin(socialObject)),
//   clearRegisterErrors: () => dispatch(clearRegisterErrors()),
//   setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
//   followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) =>
//     dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
//   toggleLogin: state => dispatch(toggleLogin(state)),
//   toggleSignup: state => dispatch(toggleSignup(state)),
//   setSocialMediaData: data => dispatch(setSocialMediaData(data)),
//   resetSocialMediaData: () => dispatch(resetSocialMediaData()),
//   updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
//   setProfilePhoto: () => dispatch(resetProfilePhoto()),
//   setProfilePicToState: obj => dispatch(setProfilePicToState(obj)),
//   completedSignup: value => dispatch(completedSignup(value)),
//   setDemoUser: value => dispatch(setDemoUser(value)),
//   setJustSignup: value => {
//     dispatch(setJustSignup(value));
//   },
//   setVideoUploadedFlag: value => {
//     dispatch(setVideoUploadedFlag(value));
//   },
// });

SignupFlow.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withTranslation()(withCookies(withRouter(withGeneral(withSession(SignupFlow)))));
