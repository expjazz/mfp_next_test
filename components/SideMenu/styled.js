import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div``;

export const LinkStyles = styled.a``;

export const Ul = styled.ul`
  transition: all 0.2s ease;
  ${media.webView} {
    margin-top: 10px;
  }
  .wrapper-li {
    padding: 0 15px;
    ${media.webView} {
      padding: 0;
    }
    .right {
      transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
    }
  }
  .normal-li {
    padding: 0 15px;
    ${media.webView} {
      padding: 0;
    }
    .right {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
  }
  .sub-menu {
    .link-item {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      line-height: 22px;
    }
    .link-item:before {
      content: '-';
      margin-right: 5px;
    }
  }
`;

export const Li = styled.li`
  .right {
    height: 35px;
    font-size: 18px;
    font-family: Gilroy-Medium;
    ${media.webView} {
      display: none;
    }
  }
  font-family: ${props => (props.selected ? 'Gilroy-Bold' : 'Gilroy-Regular')};
  color: ${props =>
    props.selected ? props.theme.flatBlue : props.theme.greyishBrown};
  background-color: ${props => props.selected && props.theme.headerGrey};
  font-size: 16px;
  border-bottom: 1px solid #e2e2e2;
  ${media.mobileScreen} {
    :first-of-type {
      border-top: 1px solid #e2e2e2;
    }
  }
  ${media.webView} {
    border-bottom: none;
  }
  ${media.webView} {
    border: none;
    :first-child {
      border: none;
    }
  }
  cursor: pointer;
  a {
    padding: 15px 0;
    ${media.webView} {
      padding: 20px 0;
    }
    &:hover,
    &:focus,
    &:active {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
    }
  }
  .active {
    max-height: ${props => (props.maxHeight ? `${props.maxHeight}px` : 'auto')};
    li {
      border: none;
      padding-right: 0;
      ${media.webView} {
        padding-left: 15px;
      }
    }
  }
  .hidden {
    max-height: 0;
    overflow: hidden;
    display: none;
  }
  .d-link {
    padding: 15px 0;
    ${media.webView} {
      padding: 20px 0;
    }
  }
  .flex-item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    font-size: 16px;
    line-height: 20px;
  }
  .count {
    margin-top: -1px;
    padding: 3px 7px 1px;
    font-size: 16px;
    font-family: Gilroy-Semibold;
    margin-left: 5px;
  }
  .sub-count {
    margin-top: 0;
  }
  .menu-icon {
    font-size: 20px;
    margin-top: -4px;
    margin-right: 18px;
    width: 20px;
    @media (max-width: 767px) {
      width: 15px;
    }
  }
`;

export const LinkWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  ${media.mobileScreen} {
    padding: 18px 0;
  }
`;
