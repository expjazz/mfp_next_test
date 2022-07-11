import styled from '@emotion/styled';

export const Wrapper = styled.section`
  .react-phone-number-input {
    margin-bottom: 10px;
  }
  .react-phone-number-input__row {
    ${props => (props.valid ? 'padding-bottom: 0' : 'padding-bottom:4px')};
  }
`;

export const FloatLabel = styled.section`
  position: relative;
  .react-phone-number-input {
    ${props => (props.valid ? 'padding-top: 16px' : 'padding-top: 13px')};
    ${props =>
      props.error
        ? `border: 1px solid ${props.theme.errorRed}`
        : `border: 1px solid ${props.theme.headerGrey}`};
    :hover {
      border-color: ${props => props.theme.brownGrey};
    }
  }
  input {
    position: relative;
    display: block;
    width: 100%;
    border: none;
    padding-right: 40px;
    font-family: Gilroy-Medium;
    font-size: 18px;
    color: ${props => props.theme.twilight};
    background-color: transparent;
    margin: 0px auto;
    height: 25px;
    outline: none !important;
  }

  label {
    position: absolute;
    bottom: 10px;
    left: 60px;
    display: block;
    font-family: Gilroy-Medium;
    font-size: 16px;
    background: transparent;
    color: ${props =>
      props.error ? props.theme.errorRed : props.theme.brownGreyTwo};
    margin: 0px auto;
    cursor: text;
    transition: all 0.15s ease-in-out;
  }

  .react-phone-number-input--focus {
    border-color: ${props =>
      !props.error ? props.theme.flatBlue : props.theme.errorRed};
    border-width: 2px;
    :hover {
      border-color: ${props =>
        !props.error ? props.theme.flatBlue : props.theme.errorRed};
    }
    padding-top: 16px;
    .react-phone-number-input__row {
      padding-bottom: 0;
    }
  }

  .react-phone-number-input--focus + label {
    line-height: 15px;
    font-size: 10px;
    margin-top: 2px;
    opacity: 1;
    text-transform: uppercase;
    left: 10px;
    top: 0px;
    color: ${props => props.theme.brownGrey};
  }
  .react-phone-number-input__country--native {
    padding-left: 10px;
    padding-bottom: 6px;
  }

  ${props =>
    props.valid &&
    `label {
      line-height: 15px;
      font-size: 10px;
      margin-top: 2px; 
      opacity: 1;
      text-transform: uppercase;
      left: 10px;
      top: 0px;
      color: ${props.error ? props.theme.errorRed : props.theme.brownGrey};
  }`}
`;

export const Error = styled.span`
  color: ${props => props.theme.errorRed};
  font-family: Gilroy;
  font-size: 12px;
  line-height: 25px;
`;
