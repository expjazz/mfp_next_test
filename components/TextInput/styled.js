import { css} from '@emotion/react'
import styled from '@emotion/styled'
import TextField from '@material-ui/core/TextField';

const placeholder = props => css`
  color: ${props.theme.brownGreyTwo} !important;
  opacity: 1;
  font-size: 16px;
  font-family: Gilroy;
`;

const TextInput = styled(TextField)`
  width: 100%;
  font-family: Gilroy;
  .notchedOutline {
    height: 44px;
    border-radius: 0;
    top: 0px;
    border-color: ${props => props.theme.headerGrey} !important;
    &.success {
      border-color: ${props => props.theme.verifyGreen} !important;
    }
    legend {
      display: none;
    }
  }
  &:hover {
    .notchedOutline {
      border-color: ${props => props.theme.brownGrey} !important;
    }
  }
  textarea {
    font-family: Gilroy-Medium;
    font-size: 18px;
  }
  .input-field {
    padding: 19px 10px 5px;
    color: ${props => props.theme.twilight};
    font-family: Gilroy-Medium;
    font-size: 18px;
    ::-webkit-input-placeholder {
      ${placeholder}
    }
    ::-moz-placeholder {
      ${placeholder}
    }
    :-ms-input-placeholder {
      ${placeholder}
    }
    :-moz-placeholder {
      ${placeholder}
    }
  }
  .float-label {
    transform: translate(10px, 12px) scale(1);
    color: ${props => props.theme.brownGreyTwo};
    text-align: left;
    font-family: Gilroy-Medium;
    top: 3px;
    font-size: 16px;
  }
  .input-label-shrink {
    transform: none !important;
    text-transform: uppercase;
    width: 100%;
    font-size: 10px;
    padding-left: 10px;
    padding-top: 2px;
    text-align: left;
    color: ${props => props.theme.brownGrey};
  }
  .focused {
    .notchedOutline {
      border-color: ${props => props.theme.flatBlue} !important;
    }
  }
  .focused-lbl {
    color: ${props => props.theme.brownGrey} !important;
  }
  .error-field {
    color: ${props => props.theme.errorRed} !important;
    .notchedOutline {
      border-color: ${props => props.theme.errorRed} !important;
    }
  }
`;

export const CustomLabel = styled.span`
  color: ${props =>
    props.success ? props.theme.verifyGreen : props.theme.errorRed};
`;

export const Label = styled.span`
  color: ${props => props.theme.brownGreyTwo} !important;
  padding-right: 10px;
`;

export const NormalLabel = styled.span`

`;

export default TextInput;
