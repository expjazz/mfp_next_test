import styled from '@emotion/styled';

export const Layout = styled.section`
  position: relative;
  .font-drop {
    width: 150px;
    border: 1px solid ${props => props.theme.brownGreyTwo};
    border-radius: 5px;
    .font-drop-inner {
      background: ${props => props.theme.pureWhite};
      padding: 0;
      border-radius: 5px;
    }
    .font-drop-list {
      background: ${props => props.theme.pureWhite};
      z-index: 101;
    }
    .custom-selection {
      display: flex;
      align-items: center;
    }
  }
  .drop-custom-scroll {
    max-height: 250px !important;
  }
  .loader-font {
    position: absolute;
    top: 3px;
    #loader-1 {
      width: 30px;
      height: 30px;
    }
  }
`;

export const Li = styled.li`
  padding-bottom: 10px;
  &:hover,
  &:focus,
  &.highlight {
    outline: none;
    font-family: Gilroy;
    padding: 5px 18px;
    background: ${props => props.theme.veryLightPinkTwo};
  }
  .list-font {
    display: block;
    padding-left: 0;
  }
`;

export const Text = styled.span`
  color: ${props => props.theme.flatBlue};
  font-size: 14px;
  font-family: Gilroy;
  padding-left: 10px;
`;

export const DropSubHead = styled.span`
  display: block;
  text-align: center;
  font-size: 14px;
  font-family: Gilroy;
  padding-bottom: 10px;
  padding-top: 10px;
  color: ${props => props.theme.flatBlue};
  cursor: default;
`;

export const Font = styled(Text)`
  color: ${props => props.theme.black};
  font-family: ${props => props.fontFamily};
  font-size: 18px;
  text-align: center;
  &.font-text {
    padding-left: 15px;
  }
`;
