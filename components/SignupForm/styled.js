import styled from '@emotion/styled';
import { largeHeading, descStyles, LinkStyles } from 'styles/TextStyled';

const LoginContainer = styled.div``;

LoginContainer.SubHead = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  color: ${props => props.theme.greyishBrown};
  line-height: 30px;
  padding-top: 20px;
  display: block;
  text-transform: uppercase;
`;

LoginContainer.Link = styled.span`
  ${LinkStyles};
  cursor: pointer;
`;

LoginContainer.Anchor = styled.a`
  &:visited {
    color: #333333;
  }
  color: #333333;
`;

LoginContainer.SocialMediaSignup = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    padding: 5px 0;
    padding-bottom: 0;
  }
`;
LoginContainer.Container = styled.div`
  display: block;
  .trems-wrp {
    display: flex;
    font-size: 12px;
    font-family: Gilroy;
    padding-top: 10px;
    .terms-error {
      color: ${props => props.theme.errorRed};
    }
    @media (max-width: 831px) {
      padding-bottom: 20px;
    }
    .checkmark {
      top: 2px;
    }
    .terms {
      ${descStyles};
      text-align: left;
      line-height: 20px;
    }
    .terms-link {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
      cursor: pointer;
    }
  }
`;
LoginContainer.Heading = styled.div`
  ${largeHeading};
  @media (min-width: 832px) {
    ${props =>
      props.hasPadding &&
      `
      padding-top: 19px;
    `}
  }
`;

LoginContainer.InputFieldsWrapper = styled.form`
  @media (min-width: 832px) {
    padding: 0px 0px;
  }
`;

LoginContainer.ErrorMsg = styled.div`
  color: red;
  font-size: 11px;
  margin-top: 4px;
  font-family: 'Avenir-light';
  text-align: left;
`;
LoginContainer.Label = styled.div`
  font-family: Gilroy-Medium;
  font-size: 14px;
  line-height: 2.08;
  text-align: center;
  color: ${props => (props.error ? '#990000' : props.theme.greyishBrown)};
  padding-top: 25px;
  width: 100%;
  @media (min-width: 832px) {
    font-size: 12px;
    padding-top: 47px;
    line-height: 30px;
    align-items: center;
    padding-bottom: 0px;
    padding-top: 44px;
    &.optional-text {
      padding-top: 43px;
    }
  }
  @media (max-width: 831px) {
    margin-bottom: 0;
    padding-top: 5px;
    margin-top: 10px;
    line-height: 24px;
    padding-bottom: 10px;
    &.optional-text {
      margin-top: 18px;
      margin-bottom: -2px;
    }
  }
`;

LoginContainer.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 832px) {
    flex-direction: row;
  }
`;
LoginContainer.PrivacyContent = styled.div`
  ${descStyles};
  text-align: left;
  display: flex;
  text-align: left;
  max-width: 300px;
  position: relative;
  margin: 10px auto;
  @media (min-width: 832px) {
    margin: 33px auto 0;
    max-width: 341px;
  }

  ${LoginContainer.Anchor} {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
    text-decoration: none;
    padding-left: 5px;
  }
  .check-wrap {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
  }
  .checkmark {
    top: 4px;
  }
`;

const HeaderSection = styled.div`
  padding: 3px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

LoginContainer.WrapsInput = styled.div`
  width: 100%;
  .input-root {
    margin-bottom: 10px;
  }
  .password-visibility {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
  @media (min-width: 832px) {
    ${props =>
      props.hasMargin &&
      `
      &:first-child {
        margin-right: 10px;
      }
    `}
  }
  > div {
    width: 100%;
  }
`;

LoginContainer.EmptyDiv = styled.div`
  display: none;
`;

LoginContainer.InputContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: 100%;
  margin-top: 12px;
  @media (min-width: 832px) {
    width: 90%;
    max-width: 500px;
  }
  .ref-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-link {
      padding-left: 5px;
      font-family: Gilroy-Medium;
    }
    .ref-link {
      padding-right: 5px;
    }
  }
`;
LoginContainer.ButtonWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  @media (min-width: 832px) {
    margin-top: 22px;
  }

  .fan-form &.align-center {
    margin-top: 20px;
  }
`;

const Phonenumber = styled.div`
  margin-bottom: 10px;
`;

const SmallDescription = styled.span`
  font-family: Gilroy;
  font-size: 12px;
  display: block;
  color: ${props => props.theme.lightGrey};
  text-align: left;
`;

export { LoginContainer, HeaderSection, Phonenumber, SmallDescription };
