import styled from '@emotion/styled';
import { media } from '../../styles/mediaQueries';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 15px;
  padding: 0 15px;
  color: ${props => props.theme.flatBlue};
  font-family: Gilroy;
  ${media.mobileScreen} {
    position: relative;
    top: inherit;
    padding-top: 10px;
  }
  .heading-top {
    margin-top: 15px;
  }
  .freshworks-btn {
    cursor: pointer;
  }
  ${media.webView} {
    .heading-top {
      margin-top: 0;
      font-size: 24px;
    }
    position: static;
    padding-right: 0;
  }
  .toast-bar {
    ${media.mobileScreen} {
      position: inherit;
    }
  }
`;
export const Header = styled.span`
  display: flex;
  justify-content: space-between;
  .back-label {
    font-size: 12px;
    padding-left: 8px;
    padding-top: 0;
    &.right-label {
      padding: 0;
    }
  }
  .back-lbl-wrp {
    display: flex;
    align-items: center;
    cursor: pointer;
    ${media.webView} {
      display: none;
    }
  }
  .help-icon {
    cursor: pointer;
    font-size: 20px;
  }
  .help-text {
    font-size: 16px;
    font-family: Gilroy-Semibold;
    margin-left: 2px;
    display: none;
    vertical-align: top;
    margin-top: 2px;
    ${media.webView} {
      display: inline-block;
    }
  }
  .close-icon {
    margin-left: 28px;
    cursor: pointer;
    font-size: 20px;
  }
`;
