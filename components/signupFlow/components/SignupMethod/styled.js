import styled from '@emotion/styled';
import { largeHeading, LinkStyles, descStyles } from 'styles/TextStyled';
import { modalPadding } from '../../styled';

const SignUpMethod = styled.div``;

SignUpMethod.Link = styled.span`
  ${LinkStyles};
  cursor: pointer;
`;

SignUpMethod.Description = styled.span`
  ${descStyles};
  margin-top: 5px;
`;

SignUpMethod.SubHead = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  color: ${props => props.theme.greyishBrown};
  line-height: 30px;
  padding-top: 20px;
  text-transform: uppercase;
`;

SignUpMethod.SubTitle = styled.span`
  font-family: Gilroy;
  font-size: 16px;
  display: block;
  color: ${props => props.theme.orangePink};
  line-height: 30px;
`;

SignUpMethod.SocialMediaSignup = styled.div`
  text-align: center;
  height: 100%;
  ${modalPadding};
  padding-bottom: 40px;
  @media (min-width: 832px) {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

SignUpMethod.Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  .input-root {
    padding-bottom: 10px;
  }
  .sign-up-btn {
    width: 150px;
    margin: 0 auto;
  }
  .login-link {
    padding-top: 10px;
  }
`;

SignUpMethod.Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 832px) {
    position: relative;
    padding: 0;
  }
`;
SignUpMethod.Heading = styled.div`
  ${largeHeading};
  text-align: center;
  padding: 0 20px 15px;
  margin: 0 auto;
  margin-bottom: 10px;
  &.or-section {
    padding-bottom: 0;
    font-family: Gilroy-Medium;
    margin-bottom: 5px;
    padding-top: 10px;
    @media (min-width: 832px) {
      margin-bottom: 13px;
    }
  }
  @media (min-width: 831px) {
    padding: 0 0 21px;
    max-width: 100%;
  }
`;

SignUpMethod.ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* @media (max-width: 831px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 300px;
    margin: 0 auto;
  } */
`;

SignUpMethod.Button = styled.button`
  font-size: 100%;
  font-family: inherit;
  border: 0;
  outline: none;
  background-color: white;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #fff;
  border-radius: 5px;
  &.email-wrap {
    margin-top: 7px;
    margin-bottom: 20px;
    @media (min-width: 831px) {
      margin-top: 0;
      padding-top: 3px;
      margin-bottom: 0;
      .label {
        margin-top: -6px;
      }
    }
  }
  margin-bottom: 5px;
`;

SignUpMethod.Icon = styled.div`
  color: ${props => props.theme.flatBlue};
  font-size: 40px;
`;

SignUpMethod.SocialMediaIcon = styled.div`
  display: block;
`;

SignUpMethod.SocialMediaLabel = styled.div`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${props => props.theme.flatBlue};
`;
SignUpMethod.GoogleWrapper = styled.div`
  display: none;
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

export { SignUpMethod, SocialButton };
