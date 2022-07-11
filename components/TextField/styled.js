import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';

const TextFieldStyled = styled(TextField)`
  width: 100%;
  .input-base {
    width: 100%;
    &:after {
      border-color: ${props => props.theme.flatBlue};
    }
    &:hover {
      &:before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
      }
    }
    input {
      color: ${props => props.theme.twilight};
      font-size: 18px;
      line-height: 25px;
      font-family: Gilroy-Medium;
      text-align: center;
      padding: 6px 0 5px;

      ::-webkit-input-placeholder {
        color: ${props => props.theme.brownGreyTwo} !important;
        opacity: 1;
        font-size: 18px;
        font-family: Gilroy;
      }
      ::-moz-placeholder {
        color: ${props => props.theme.brownGreyTwo} !important;
        opacity: 1;
        font-size: 18px;
        font-family: Gilroy;
      }
      :-ms-input-placeholder {
        color: ${props => props.theme.brownGreyTwo} !important;
        opacity: 1;
        font-size: 18px;
        font-family: Gilroy;
      }
      :-moz-placeholder {
        color: ${props => props.theme.brownGreyTwo} !important;
        opacity: 1;
        font-size: 18px;
        font-family: Gilroy;
      }
    }
  }
  .float-label {
    display: inline-block;
    width: 100%;
    text-align: center;
    color: ${props => props.theme.brownGreyTwo} !important;
    font-family: Gilroy;
    font-size: 18px;
  }
  .input-label-shrink {
    right: 0;
    text-align: center;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    font-size: 12px;
    line-height: 18px;
    font-family: Gilroy;
    color: ${props => props.theme.greyishBrown} !important;
  }
  .error-field {
    ${props => props.value && `color: ${props.theme.errorRed} !important`};
    &:after {
      border-bottom-color: ${props => props.theme.errorRed} !important;
    }
  }
`;

export default TextFieldStyled;
