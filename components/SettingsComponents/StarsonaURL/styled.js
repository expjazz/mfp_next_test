import styled from '@emotion/styled';
import { Form, Wrapper } from '../styled';

export const FormContainer = styled(Form)`
  padding-top: 5px;
  .adornment-root {
    z-index: 10;
    margin-right: 1px;
    font-size: 18px;
    color: ${props => props.theme.greyishBrown};
    font-family: Gilroy-Medium;
    padding-top: 10px;
    &.adornment-end {
      padding-top: 0;
      .adornicon {
        font-size: 20px;
        &.error {
          color: ${props => props.theme.errorRed};
        }
        &.success {
          color: ${props => props.theme.verifyGreen};
        }
      }
    }
  }
  .adornment-start {
    padding-left: 10px;
    padding-right: 10px;
  }
  .input-base input {
    text-align: left;
  }
  .url {
    font-size: 12px;
    font-family: Gilroy-Medium;
  }
  .input-field {
    padding: 18px 0px 5px;
  }
`;

export const Wrap = styled(Wrapper)`
  .button-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
  }
  .copy-button {
    margin-top: 10px;
  }
  .inner-head {
    padding-bottom: 10px;
    @media (max-width: 831px) {
      padding-bottom: 3px;
    }
  }
`;
