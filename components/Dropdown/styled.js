import styled from '@emotion/styled';

const DropdownStyled = styled.div`
  .error-msg {
    font-size: 12px;
    font-family: Gilroy-Medium;
    color: ${props => props.theme.errorRed};
    margin-top: 5px;
    display: block;
  }
`;

DropdownStyled.Select = styled.div`
  position: relative;
  max-width: 100%;
  background: ${props => (props.secondary ? '#fff' : props.theme.white)};
  padding: 0 10px;
  height: 44px;
  outline: none;
  font-family: ${props => (props.secondary ? 'Gilroy-Medium' : 'Gilroy')};
  font-size: 16px;
  display: flex;
  cursor: pointer;
  align-items: center;
  ${props =>
    props.secondary &&
    `
    border: 1px solid ${props.theme.headerGrey};
  `}
  &:hover {
    border-color: ${props => props.theme.brownGrey};
  }
  @media (min-width: 1280px) {
    max-width: 640px;
    width: 100%;
  }
  .custom-selection {
    width: 100%;
    height: 100%;
  }
`;

DropdownStyled.CurrentSelected = styled.span`
  font-family: Gilroy-Medium;
  font-size: 16px;
  text-align: left;
  width: calc(100% - 20px);
  color: ${props => props.theme.brown};
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 10px;
  padding-top: 13px;
  padding-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .n-count {
    margin-right: 10px;
  }
`;

DropdownStyled.DropIcon = styled.span`
  background: url('/images/chevron-down.png') no-repeat;
  background-size: contain;
  background-position: center center;
  width: 20px;
  height: 20px;
`;

DropdownStyled.OptionsList = styled.ul`
  position: ${props => (props.overflowRender ? 'static' : 'absolute')};
  left: 0;
  right: 0;
  top: calc(100% + 1px);
  box-shadow: 0px 7px 13px 0px rgba(0, 0, 0, 0.14);
  background: ${props => props.theme.white};
  z-index: 1;
  ${props =>
    props.secondary &&
    `
    border-top: 1px solid  ${props.theme.headerGrey};
    top: calc(100% - 1px);
  `}
  .track-ver {
    position: absolute;
    min-width: 6px;
    width: 6px !important;
    transition: opacity 200ms ease 0s;
    opacity: 1;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
    z-index: 1400;
  }
`;

DropdownStyled.Options = styled.li`
  font-family: Gilroy;
  padding: 5px 18px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
  color: ${props => props.theme.brown};
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
  ${props =>
    props.secondary &&
    `
    margin-bottom: 0;
    font-family: Gilroy-Medium;
  `}
  color: ${props => props.theme.greyishBrown};
  &:hover, &:focus, &.highlight {
    outline: none;
    font-family: Gilroy;
    padding: 5px 18px;
    background: ${props => props.theme.veryLightPinkTwo};
    ${props =>
      props.secondary &&
      `
      font-family: Gilroy-Bold;
    `}
  }
  &:last-child {
    margin-bottom: 0;
  }
  .count-li {
    margin-right: 27px;
  }
`;

DropdownStyled.OptionItem = styled.span``;

export default DropdownStyled;
