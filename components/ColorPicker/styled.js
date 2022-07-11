import styled from '@emotion/styled';

export const Layout = styled.section`
  position: relative;
  .color-drop {
    width: 150px;
    border: 1px solid ${props => props.theme.brownGreyTwo};
    border-radius: 5px;
    .color-drop-inner {
      background: ${props => props.theme.pureWhite};
      padding: 0;
      border-radius: 5px;
    }
    .color-drop-list {
      background: ${props => props.theme.pureWhite};
      z-index: 101;
    }
    .custom-selection {
      display: flex;
      align-items: center;
    }
  }

  .color-wrpr {
    display: flex;
    width: 70px;
    justify-content: space-between;
    margin: 0 auto;
    .small-color {
      width: 20px;
      height: 30px;
    }
  }
  .drop-custom-scroll {
    max-height: 250px !important;
  }
  .loader-color {
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
  .color-wrpr {
    width: 110px;
    .list-color {
      width: 30px;
      height: 40px;
      display: inline-block;
    }
  }
`;

export const HeadColor = styled.span`
  background-color: ${props => props.color};
`;

export const LinkColor = styled.span`
  background-color: ${props => props.color};
`;

export const BgColor = styled.span`
  background-color: ${props => props.color};
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
