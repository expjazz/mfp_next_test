import { css} from '@emotion/react'
import styled from '@emotion/styled'
import Drawer from '@material-ui/core/Drawer';

const hoverCss = props => css`
  border-left: ${`5px solid ${props.theme.pureWhite}`};
  color: ${props.theme.pureWhite};
  padding-left: 13px;
  font-family: Gilroy-Bold;
`;

const NavWrap = styled.nav`
  height: 100%;
`;

const CategoryStyled = styled.ul`
  padding: 10px 0;
  padding-top: 25px;
  overflow: auto;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  .separator {
    border: 1px solid #333;
    height: 79%;
    margin-left: 13px;
  }
  .cat-arrows {
    color: #333;
    padding: 0 0 9px 0;
    &.arrow-active {
      color: #f6f6f6;
    }
  }
  .cat-list-wrap {
    margin: 0 auto;
  }
  .cat-list-root {
    justify-content: center;
  }
`;

CategoryStyled.Header = styled.div`
  padding: 0 20px;
  padding-top: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  .cat-head-logo {
    flex: 1;
    text-align: center;
  }
  .close-icon {
    color: ${props => props.theme.pureWhite};
    font-size: 28px;
  }
`;

CategoryStyled.Item = styled.li`
  font-family: Gilroy;
  font-size: 21px;
  line-height: 46px;
  padding-left: ${props => (props.selected ? `13px` : '18px')};
  cursor: pointer;
  position: relative;
  color: ${props =>
    props.selected ? props.theme.pureWhite : props.theme.brownGrey};
  border-left: ${props =>
    props.selected ? `5px solid ${props.theme.pureWhite}` : 'none'};
  text-align: left;
  &.about {
    display: flex;
    margin-top: auto;
    align-items: flex-end;
    @media (min-width: 832px) {
      display: none;
    }
  }
  .category-label {
    display: block;
    width: 100%;
  }
  ${props =>
    props.selected &&
    `
      font-family: Gilroy-Bold;
  `};
  &:hover {
    ${hoverCss};
  }
`;

const Wrap = styled(Drawer)`
  color: ${props => props.theme.greyishBrown};
  font-size: 16px;
  .drawer-paper {
    padding: 10px 0;
    width: 100%;
    background-color: #000;
  }
`;

const BackIcon = styled.span`
  width: 20px;
  color: ${props => props.theme.pureWhite};
  padding-right: 10px;
  .back-icon {
    font-size: 28px;
  }
`;

const Banner = styled.img`
  ${props =>
    props.small
      ? `
    width: 36px;
    height: auto;
  `
      : `
    height: 32px;
  `}
`;

export { NavWrap, BackIcon, Banner, Wrap, CategoryStyled as default };
