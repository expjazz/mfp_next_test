import { css} from '@emotion/react'
import styled from '@emotion/styled'

const hoverCss = props => css`
  border-left: ${`5px solid ${props.theme.pureWhite}`};
  color: ${props.theme.pureWhite};
  padding-left: 13px;
  font-family: Gilroy-Bold;
`;

const NavWrap = styled.nav`
  @media (max-width: 831px) {
    height: 100%;
  }
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
  @media (min-width: 832px) {
    flex-direction: row;
    .cat-list-wrap {
      display: flex;
      padding-top: 4px;
    }
    height: 100%;
    flex-wrap: wrap;
    padding-top: 0;
    max-width: 832px;
    padding-bottom: 4px;
    justify-content: center;
    width: 100%;
    max-width: inherit;
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (min-width: 1280px) {
    max-width: none;
    padding-bottom: 20px;
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
  @media (max-width: 831px) {
    ${props =>
      props.selected &&
      `
        font-family: Gilroy-Bold;
    `};
    &:hover {
      ${hoverCss}
    }
  }
  @media (min-width: 832px) {
    font-family: Gilroy;
    line-height: 23px;
    margin-bottom: 7px;
    border-radius: 29px;
    padding: 0;
    border: none;
    color: ${props =>
      props.selected ? props.theme.greyishBrown : props.theme.pureWhite};
    background: ${props =>
      props.selected ? props.theme.pureWhite : props.theme.darkGrey};
    margin-left: 13px;
    border-left: 0 none;
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      background: ${props => props.theme.pureWhite};
      color: ${props => props.theme.greyishBrown};
    }
    .category-label {
      width: auto;
      display: initial;
      font-family: Gilroy;
      font-size: 16px;
      padding: 11px 22px;
      white-space: nowrap;
      display: block;
    }
  }
  @media (min-width: 1280px) {
    line-height: 18px;
  }
`;

export { NavWrap, CategoryStyled as default };
