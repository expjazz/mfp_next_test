import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  ${media.webView} {
    min-width: 268px;
  }
  .menu-desc {
    font-family: Gilroy-Light;
    margin-bottom: 15px;
  }
`;

export const Ul = styled.ul`
  transition: all 0.2s ease;
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
  font-family: ${props =>
    props.selected ? 'Gilroy-SemiBold' : 'Gilroy-Regular'};
  color: ${props =>
    props.selected ? props.theme.flatBlue : props.theme.greyishBrown};
  font-size: 16px;
  border-bottom: 1px solid #e2e2e2;
  :first-child {
    border-top: 1px solid #e2e2e2;
  }

  ${media.webView} {
    border: none;
    :first-child {
      border: none;
    }
  }
  cursor: pointer;
  a {
    padding: 12px 0;
    &:hover,
    &:focus,
    &:active {
      font-family: Gilroy-Medium;
      color: ${props => props.theme.flatBlue};
    }
  }
  .link-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  }
  .d-link {
    padding: 12px 0;
  }
  .flex-item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menu-icon {
    font-size: 20px;
    margin-right: 10px;
    margin-bottom: 6px;
  }

  .tick-circle-icon {
    font-size: 24px;
    margin-right: 10px;
    color: ${props =>
      props.completed ? props.theme.green : props.theme.white};
  }

  .tick-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props =>
      props.completed ? props.theme.green : props.theme.headerGrey};
    margin-right: 18px;
    margin-bottom: 4px;
  }
  .count-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    .count {
      margin-right: 20px;
      margin-left: 5px;
    }
  }
`;
