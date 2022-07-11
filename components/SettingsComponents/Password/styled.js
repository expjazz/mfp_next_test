import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../styled';

export const FormContainer = styled(Form)`
  .inputWrapper {
    position: relative;
    margin-bottom: 10px;
    :last-of-type {
      margin-bottom: 0;
    }
    .show-password {
      position: absolute;
      right: 0;
      cursor: pointer;
      font-size: 20px;
      color: ${props => props.theme.flatBlue};
      top: 10px;
      right: 10px;
      z-index: 10;
    }
  }
  .custom-wrap {
    .input-field {
      margin-right: 72px;
      padding-left: 70px;
    }
  }
  .notchedOutline {
    height: auto;
  }
`;

export const Wrap = styled(Wrapper)`
  width: 100%;
  ${media.webView} {
    margin: 0 auto;
    width: 400px;
  }
  .note {
    line-height: 15px;
    padding-bottom: 20px;
    font-size: 12px;
    padding-top: 7px;
  }
  .password-note {
    margin-left: 10px;
  }
  .error-msg {
    font-size: 12px;
    font-family: Gilroy-Medium;
    color: #980100;
    margin-top: 5px;
    display: block;
  }
`;
