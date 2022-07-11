import styled from '@emotion/styled';

const LoginContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media (min-width: 832px) {
    flex-direction: row;
    padding-bottom: 0;
  }
`;
LoginContainer.wrapper = styled.div`
  height: 100%;
  @media (min-width: 832px) {
    height: 100vh;
    overflow: auto;
    background-color: white;
  }
`;
LoginContainer.CloseButton = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  display: inline-block;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #707070;
  font-size: 30px;
`;

LoginContainer.actionText = styled.span`
  cursor: pointer;
`;

LoginContainer.LeftSection = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 832px) {
    width: 45%;
    padding: 0px 0px;
    position: relative;
    padding-bottom: 83px;
  }
`;
LoginContainer.RightSection = styled.div`
  width: 100%;
  display: none;
  background: url('/images/1297371108618082396.jpg') no-repeat;
  background-position: center;
  background-size: cover;
  @media (min-width: 832px) {
    width: 55%;
    display: block;
    padding: 0px 0px;
    position: relative;
  }
`;
LoginContainer.LoginDiv = styled.button`
  background-color: #fff;
  margin-right: 5px;
  color: ${props => props.theme.orangePink};
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Avenir-Light';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  border: none;
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;

LoginContainer.SocialMediaSignup = styled.div`
  text-align: center;
  padding: 30px 0;
  @media (min-width: 832px) {
    padding: 30px 37px;
  }
`;
LoginContainer.Container = styled.div`
  @media (min-width: 832px) {
    padding: 14px 20px 0;
  }
  @media (max-width: 831px) {
    max-width: 320px;
    margin: 0 auto;
  }
`;
LoginContainer.Heading = styled.div`
  font-family: 'Gilroy';
  font-size: 24px;
  text-align: center;
  color: ${props => props.theme.orangePink};
  padding-top: 47px;
  padding-bottom: 20px;

  @media screen and (max-height: 720px) and (min-width: 832px) {
    padding-top: 15px;
  }

  &.forgot-heading {
    padding-bottom: 0;
    @media (max-width: 831px) {
      padding-bottom: 20px;
    }
  }
  &.align-heading {
    @media (max-width: 831px) {
      padding-top: 0px;
    }
  }
  &.email-heading {
    padding-top: 10px;
    padding-bottom: 0px;
  }
  @media (max-width: 831px) {
    padding-top: 30px;
    padding-bottom: 35px;
    max-width: 178px;
    margin: 0 auto;
    &.email-heading {
      max-width: 185px;
      padding-top: 10px;
      padding-bottom: 15px;
    }
  }
`;
LoginContainer.Icon = styled.div`
  color: ${props => props.theme.flatBlue};
  font-size: 59px;
  &.insta {
    font-size: 58px;
  }
  &.google {
    font-size: 57px;
  }
`;

LoginContainer.SocialMediaIcon = styled.div`
  display: block;
`;

LoginContainer.SocialMediaLabel = styled.div`
  font-family: Gilroy-Light;
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  color: ${props => props.theme.flatBlue};
`;
LoginContainer.SocialMediaMessage = styled.div`
  font-family: 'Avenir-Medium';
  font-size: 14px;
  text-align: center;
  color: #333333;
  margin-top: 0;
`;
LoginContainer.ButtonIcon = styled.img`
  width: 23px;
  height: 23px;
`;
LoginContainer.ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 831px) {
    max-width: 300px;
    margin: 0 auto;
  }
`;
LoginContainer.Button = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  padding-bottom: 10px;
  outline: none;
  background-color: white;
  cursor: pointer;
  border: 1px solid transparent;
  @media (max-width: 831px) {
    padding-bottom: 10px;
  }
`;

LoginContainer.SocialIcon = styled.span`
  position: relative;
  padding-left: 32px;
  width: 100%;
  height: 10px;
  display: block;
  &:before {
    content: '';
    position: absolute;
    left: 0px;
    right: 0;
    top: -6px;
    bottom: 0;
    padding: 10px;
    height: 10px;
  }
`;

LoginContainer.FacebookContent = styled(LoginContainer.SocialIcon)`
  &:before {
    background: url( '/images/facebook.svg' ) no-repeat left;
  }

`;
LoginContainer.GoogleContent = styled(LoginContainer.SocialIcon)`
  &:before {
    background: url( '/images/search.svg' ) no-repeat left;
  }

`;
LoginContainer.InstagramContent = styled(LoginContainer.SocialIcon)`
  &:before {
    background: url( '/images/instagram.svg' ) no-repeat left;
  }
`;

LoginContainer.TwitterContent = styled(LoginContainer.SocialIcon)`
  &:before {
    background: url( '/images/twitter.png' ) no-repeat left;
    background-size: contain;
  }
`;

LoginContainer.InputFieldsWrapper = styled.form``;
LoginContainer.Label = styled.div`
  display: none;
  color: #333333;
  font-family: 'Avenir-Bold';
  font-size: 16px;
  text-align: left;
  padding-bottom: 10px;
  @media (min-width: 832px) {
    font-size: 13px;
    width: 69%;
  }
`;
LoginContainer.SectionHeading = styled.div`
  font-family: 'Avenir-Medium';
  font-size: 14px;
  text-align: center;
  color: #737373;
  margin-top: 2%;
  @media (min-width: 832px) {
    font-size: 14px;
  }
`;
LoginContainer.Input = styled.input`
  font-family: 'Avenir-Regular';
  color: #333333;
  font-size: 16px;
  text-align: left;
  outline: none;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  text-indent: 10px;
  margin-top: 3%;
  background-color: #fff;
  &:focus {
    border-color: ${props => props.theme.orangePink};
  }
  @media (min-width: 832px) {
    margin-top: 0;
    height: 33px;
    font-size: 13px;
  }
`;
LoginContainer.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  &.password-wrap {
    margin-bottom: 15px;
    margin-top: 15px;
  }
  @media (min-width: 832px) {
    margin-top: 15px;
    &.password-wrap {
      margin-top: 20px;
    }
  }
  .login-text {
    padding: 6px 0 11px;
  }
`;
LoginContainer.PrivacyContent = styled.div`
  text-align: left;
  font-family: 'Avenir-Regular';
  font-size: 12px;
  padding: 17px 35px;
  color: #707070;
`;

LoginContainer.Footer = styled.div`
  position: fixed;
  bottom: 0;
  height: 56px;
  background-color: #ffffff;
  z-index: 1;
  display: flex;
  width: 100%;
  padding: 15px 6px;
  box-shadow: 0px 0px 12px 0px rgba(34, 34, 34, 0.4);
  @media (min-width: 832px) {
    position: relative;
    box-shadow: none;
    border-top: 1px solid #222;
    padding: 26px 0px;
  }
`;
LoginContainer.Footerleft = styled.div`
  width: 60%;
  text-align: left;
`;
LoginContainer.ForgotButton = styled.button`
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-family: 'Avenir-Medium';
  outline: none;
  border: none;
  background-color: white;
`;
LoginContainer.FooterRight = styled.div`
  width: 40%;
  text-align: right;
`;
LoginContainer.SignIn = styled.input`
  background-color: #fff;
  color: ${props => props.theme.flatBlue};
  padding: 12px 30px;
  margin-top: 42.5px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  font-family: 'Gilroy-Bold';
  outline: none;
  cursor: pointer;
  border-radius: 30px;
  border: 2px solid ${props => props.theme.flatBlue};
  -webkit-appearance: none;

  &:hover {
    background-color: ${props => props.theme.flatBlue};
    border: 2px solid #fff;
    color: #fff;
  }
  @media (min-width: 1920px) {
    font-size: 20px;
  }
`;
LoginContainer.ForgotButtonWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
`;
LoginContainer.ForgotButtonSpan = styled.span`
  color: ${props => props.theme.flatBlue};
  font-family: 'Gilroy';
  font-size: 14px;
`;
LoginContainer.ButtonWrapper = styled.div`
  margin-top: 35px;
  position: relative;
  @media screen and (max-height: 720px) and (min-width: 832px) {
    margin-top: 20px;
  }
  @media (max-width: 831px) {
    margin-top: 0;
  }
  .error-msg {
    position: absolute;
    width: 100%;
    text-align: left;
    bottom: 100%;
    padding-bottom: 10px;
  }
  &.align-center {
    margin-top: 0;
    ${props => props.margin && `margin-top: 10px`};
  }
`;
LoginContainer.CoverImage = styled.div``;
LoginContainer.FooterSection = styled.div`
  padding: 0px 0px;
  @media (min-width: 832px) {
    padding: 0px 56px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
  }
`;
LoginContainer.ImageStackLayout = styled.div`
  padding: 32px 0;
  width: 100%;
  height: 100%;
`;
LoginContainer.ErrorDiv = styled.div`
  width: 100%;
`;
LoginContainer.ErrorMsg = styled.div`
  color: #990000;
  font-size: 12px;
  margin-top: 5px;
  font-family: Gilroy-Medium;
  text-align: left;
`;
const HeaderSection = styled.div`
  padding: 3px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
HeaderSection.LogoImage = styled.img`
  width: 100px;
  height: 45px;
  @media (min-width: 832px) {
    width: 160px;
    height: 60px;
  }
`;
HeaderSection.HeaderNavigation = styled.button`
  background-image: url('/images/icon_back_40a.svg');
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  padding: 20px;
  background-size: 26px;
  background-color: white;
  cursor: pointer;
  outline: none;
`;
HeaderSection.MiddleDiv = styled.div`
  font-family: 'Avenir-Bold';
  font-size: 13px;
  @media (min-width: 1920px) {
    font-size: 16px;
  }
`;
HeaderSection.RightDiv = styled.button`
  background-color: #fff;
  margin-right: 5px;
  color: #333333;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-family: 'Avenir-Medium';
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  border: none;
  @media (min-width: 832px) {
    font-size: 20px;
  }
  @media (min-width: 1920px) {
    font-size: 22px;
  }
`;
LoginContainer.WrapsInput = styled.div`
  width: 100%;
  .password-visibility {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
  &.forgot-input {
    & > div > div {
      @media (max-width: 831px) {
        margin-top: 50px;
      }
    }
    .input-label-shrink + .input-underline {
      @media (max-width: 831px) {
        margin-top: 38px;
      }
    }
  }
  input {
    font-size: 20px;
    line-height: 25px;
    font-family: Gilroy-Medium;
    padding: 6px 0px 5px;
    color: rgb(97, 81, 149) !important;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: rgb(97, 81, 149) !important;
  }
  .input-label {
    right: 0;
    font-family: Gilroy;
    font-size: 18px;
    line-height: 25px;
    color: #aaa !important;
    &.input-error + div:after {
      border-bottom-color: #990000;
    }
  }
`;
LoginContainer.GoogleWrapper = styled.div`
  display: none;
`;
LoginContainer.EmptyDiv = styled.div`
  display: none;
`;
LoginContainer.ShowPassword = styled.span`
  position: absolute;
  background-image: url('/images/icon_1pass_24a.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 19px;
  padding: 14px;
  right: 7px;
  bottom: 6px;
  cursor: pointer;
  @media (min-width: 832px) {
    top: 5px;
    padding: 12px;
  }
`;
LoginContainer.PasswordWrapper = styled.div`
  position: relative;
  .show-password {
    position: absolute;
    right: 0;
    width: 70px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy;
    top: 0;
  }
`;
LoginContainer.InputContainer = styled.div`
  vertical-align: middle;
  height: 100%;

  @media (min-width: 832px) {
    display: inline-block;
    width: 75%;
    margin: 20px 20px;
    margin-top: 0;
  }
  @media (max-width: 831px) {
    margin-bottom: 20px;
  }

  .username-error-msg {
    height: auto;
    @media (max-width: 832px) {
      margin-bottom: 15px;
      margin-top: -10px;
    }
  }
`;
LoginContainer.SignupLine = styled.div`
  display: block;
  font-family: 'Avenir-Light';
  color: #b3acac;
  font-size: 12px;
  margin: 0;
  margin: 20px 20px;
  order: 1;
  span {
    display: inline-block;
  }
  &::before,
  &::after {
    content: '';
    display: inline-block;
    height: 1px;
    background-color: #e8e7e7;
    vertical-align: middle;
    width: 50px;
    width: calc(50% - 69px);
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
`;

const SocialButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background: ${props => props.bgColor};
  color: ${props => props.theme.pureWhite};
  font-family: Gilroy;
  padding-right: 10px;
  font-size: 14px;
  width: 220px;
  :hover {
  }
`;

SocialButton.IconWrap = styled.span`
  margin-right: 10px;
  background: ${props => props.bgColor};
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export { LoginContainer, HeaderSection, SocialButton };
