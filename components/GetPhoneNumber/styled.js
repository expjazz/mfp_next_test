import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: 34px;
    font-size: 50px;
    z-index: 1;
    ${media.webView} {
      top: 49px;
    }
  }
  .PhoneNoImg {
    background: url(/images/art_highfive.svg) no-repeat;
    display: inline-block;
    background-size: contain;
    width: 196px;
    height: 202px;
    ${media.webView} {
      width: 260px;
      height: 267px;
    }
  }
  .successScroll {
    margin-top: 87px;
    height: calc(100% - 87px) !important;
    display: inline-block;
    ${media.webView} {
      margin-top: 39px;
      height: calc(100% - 39px) !important;
    }
  }
`;
export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 30px;
  ${media.webView} {
    max-width: 400px;
  }
  .firstTitle {
    color: ${props => props.theme.orangePink};
    padding-bottom: 3px;
    padding-top: 15px;
    font-size: 20px;
    padding-top: 0;
    ${media.webView} {
      padding-top: 33px;
      padding-bottom: 10px;
    }
  }
  .otpTitle {
    padding-bottom: 20px;
    padding-top: 30px;
  }
  .orderSuccess {
    color: ${props => props.theme.orangePink};
    font-size: 40px;
    line-height: 39px;
    width: 220px;
    margin: 0 auto;
    padding-bottom: 29px;
    ${media.webView} {
      width: 100%;
      font-size: 34px;
    }
  }
  .note {
    font-family: Gilroy;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #7c7c7c;
    width: 100%;
    margin: 0px auto;
  }
  .browseBtn {
    width: 300px;
    height: 60px;
  }
  .skip {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding-top: 12px;
    color: ${props => props.theme.twilight};
    cursor: pointer;
    font-family: Gilroy;
    font-size: 14px;
  }
`;

Layout.Phonenumber = styled.div`
  padding-bottom: 38px;
  padding-top: 39px;
  @media screen and (min-width: 832px) and (max-height: 720px) {
    padding-top: 23px;
  }
  @media (max-width: 831px) {
    padding-bottom: 10px;
    padding-top: 20px;
  }
  .react-phone-number-input {
    border-bottom: 1px solid #c5d2e0;
    margin-bottom: 10px;
    input {
      height: auto !important;
    }
  }
  .react-phone-number-input__icon {
    width: 32px;
    height: 22px;
    border: none;
  }
  .errorElement {
    color: #990000;
    margin-top: -4px;
    font-family: Gilroy;
    font-size: 14px;
    line-height: 25px;
  }
`;
Layout.Image = styled.div`
  display: block;
  background-color: #d3e7ef;
  background: ${props => props.imageUrl && `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 228px;
  width: 200px;
  margin-bottom: 0;
`;
Layout.ButtonWrapper = styled.div`
  @media (min-width: 832px) {
    // position: absolute;
    bottom: 73px;
    margin: auto;
    left: 0;
    right: 0;
    padding-bottom: 0;
  }
  @media screen and (min-width: 832px) and (max-height: 720px) {
    bottom: 24px;
  }
`;
Content.OtpSubTitle = styled.div`
  font-family: Gilroy;
  font-size: 15px;
  text-align: center;
  max-width: 410px;
  line-height: 22px;
  color: #7c7c7c;
`;
Content.Resend = styled.div`
  font-family: Gilroy;
  font-size: 15px;
  text-align: center;
  max-width: 410px;
  color: ${props => props.theme.twilight};
  line-height: 22px;
  cursor: pointer;
`;
Content.OTPWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  & .errorElement {
    color: red;
    margin-top: 7px;
    margin-bottom: 2px;
    font-size: 12px;
  }
`;

Content.WrapsInput = styled.div`
  width: 40px;
  padding-right: 8px;
  input {
    font-family: Gilroy;
    font-size: 22px;
    text-align: center;
    color: ${props => props.theme.twilight};
    padding: 8px 0 0;
    border: 1px solid ${props => props.theme.greyishBrown};
    &:focus {
      border-color: ${props => props.theme.flatBlue};
    }
    &:after {
      border-color: none;
    }
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
Content.OtpSubTitleWrapper = styled.div`
  margin-bottom: 13px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  .ques {
    display: inline-block;
    width: auto;
  }
`;
Content.Error = styled.p`
  color: #990000;
  margin-top: 7px;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 25px;
`;

export const FloatLabel = styled.section`
  position: relative;
  .react-phone-number-input {
    padding-top: 18px;
  }
  input {
    position: relative;
    display: block;
    width: 100%;
    border: none;
    padding-right: 40px;
    font-family: Gilroy-Medium;
    font-size: 22px;
    color: #555 !important;
    text-align: center;
    background-color: transparent;
    margin: 0px auto;
    height: 32px;
    outline: none !important;

    &::-webkit-input-placeholder,
    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder,
    &::placeholder {
      color: ${props => props.theme.brownGreyTwo};
      opacity: 1;
      font-size: 18px;
      font-family: Gilroy;
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    display: block;
    width: 100%;
    height: 52px;
    line-height: 72px;
    font-family: Gilroy;
    font-size: 18px;
    background: transparent;
    color: #aaa;
    margin: 0px auto;
    cursor: text;
    transition: all 0.15s ease-in-out;
  }
  input:hover,
  input:focus {
    border-color: ${props => props.theme.flatBlue};
  }
  input:focus {
    background-position: left bottom;
    background-size: 100% 1px;
  }

  .react-phone-number-input--focus {
    border-color: ${props => props.theme.flatBlue};
    border-width: 2px;
    outline: none !important;
    background-color: transparent;
    background: -webkit-linear-gradient(bottom, ${props => props.theme.twilight} 50%, ${props => props.theme.twilight} 50%);
    background: linear-gradient(to top, ${props => props.theme.twilight} 50%, ${props => props.theme.twilight} 50%);
    background-position: left bottom;
    background-size: 0 1px;
    background-repeat: no-repeat;
    transition: all 0.3s ease-in-out;
  }

  .react-phone-number-input--focus + label {
    line-height: 15px;
    font-size: 13px;
    margin-top: -5px;
  }
  ${props =>
    props.valid &&
    `label {
      line-height: 15px;
      font-size: 13px;
      margin-top: -5px;
  }`}

  input:focus ::-webkit-input-placeholder {
    color: transparent;
    font-size: 0;
  }
  input:focus :-moz-placeholder {
    color: transparent;
    font-size: 0;
  }
  input:focus ::-moz-placeholder {
    color: transparent;
    font-size: 0;
  }
  input:focus :-ms-input-placeholder {
    color: transparent;
    font-size: 0;
  }
`;
