import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${props => props.theme.headerGrey};
  transition: all 0.2s ease-in-out;
  min-height: 44px;
  display: flex;
  :hover {
    border-color: ${props => props.theme.brownGrey};
  }
  &.focused {
    border-color: ${props => props.theme.flatBlue};
    border-width: 2px;
  }
  ${props =>
    props.hasValue &&
    `border-color: ${props.theme.flatBlue};border-width: 2px`};
  .autoInput {
    font-size: 18px;
    min-height: 14px;
    height: 14px;
    border-radius: 0;
    padding: 0 10px;
    margin-top: 16px;
    border: none;
    z-index: 5;
    background: transparent;
    :focus + .label {
      font-size: 10px;
      top: 3px;
      padding-bottom: 6px;
      text-transform: uppercase;
      color: ${props => props.theme.brownGrey};
    }
  }
`;

export const Label = styled.span`
  position: absolute;
  left: 9px;
  color: ${props =>
    props.hasValue ? props.theme.brownGrey : props.theme.brownGreyTwo};
  font-family: Gilroy-Medium;
  font-size: 16px;
  ${props => (props.hasValue ? 'top: 3px;' : 'bottom:10px')};
  ${props =>
    props.hasValue &&
    'font-size: 10px; padding-bottom: 6px; text-transform: uppercase;'};
  background: transparent;
  cursor: text;
  transition: all 0.15s ease-in-out;
  z-index: 4;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;
