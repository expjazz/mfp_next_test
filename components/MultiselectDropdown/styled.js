import styled from '@emotion/styled';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { media } from 'styles/mediaQueries';

export const MultiSelect = styled(Select)`
  width: 100%;
  position: relative;
  margin-top: 15px;
  .checkmark {
    z-index: -1;
  }
  .check-box {
    z-index: -1;
    margin-bottom: 18px;
  }
  .list-root-multiple {
    background: ${props => props.theme.white};
    ${media.webView} {
      max-height: calc(100% - 390px);
      background: ${props => props.theme.pureWhite};
    }
  }
  .select-menu:focus {
    background-color: transparent;
  }
  &:after {
    border-bottom: none !important;
  }
  &:hover {
    &:before {
      border-bottom: none !important;
    }
  }
  &:before,
  &.focus {
    border-bottom: none !important;
  }

  .select-menu {
    font-family: Gilroy-Medium;
    color: ${props => props.theme.twilight};
    font-size: 15px;
    padding: 12px 35px 12px 12px;
    background: #fff;
  }
`;

export const Label = styled.span`
  font-family: Gilroy-Medium;
  color: ${props => props.theme.greyishBrown};
`;

export const Form = styled(FormControl)`
  width: 100%;
  #mutiple-checkbox-label {
    width: 100%;
    text-align: center;
    color: ${props => props.theme.brownGreyTwo};
  }
  .float-label {
    color: ${props => props.theme.greyishBrown} !important;
    transform: none;
    font-size: 12px;
  }
  &.form-control {
    border: 1px solid ${props => props.theme.headerGrey};
    :hover {
      border-color: ${props => props.theme.brownGrey};
    }
  }
`;

export const Icon = styled.span`
  background: url('/images/chevron-down.png') no-repeat;
  background-size: contain;
  background-position: center center;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;
