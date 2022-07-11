import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-right: 0;
  padding-left: 0;

  ${media.webView} {
    padding-left: 0;
    padding-top: 0;
  }
  ${media.largeScreen} {
    height: auto;
  }
  .back-header {
    top: 58px;
    z-index: 10;
    padding: 10px 15px;
    ${media.mobileScreen} {
      display: ${props => (props.hideBack ? 'none' : 'block')};
      background: ${props => props.theme.pureWhite};
      padding: 10px 15px 0;
      position: relative;
      top: inherit;
    }
    .header-label {
      padding-top: 14px;
      margin-top: 0;
      ${media.webView} {
        padding-top: 0;
        font-size: 24px;
      }
    }
    ${media.webView} {
      padding: 0;
    }
    .heading-top {
      ${props => (props.showMenu ? 'display: block' : 'display: none')};
      padding-bottom: 0;
      font-size: 24px;
      ${media.webView} {
        display: block;
        font-size: 20px;
      }
      ${media.mobileScreen} {
        padding-bottom: 5px;
      }
    }
  }
  .menu-layout {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    ${media.webView} {
      display: block;
    }
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  height: 100%;
  justify-content: space-between;
  .menu-layout {
    width: 100%;
    padding: 0;
    ${media.webView} {
      width: 240px;
    }
    .menu-desc {
      padding: 0 15px 10px;
      ${media.webView} {
        padding: 5px 0 0;
      }
    }
  }
`;

export const MWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${media.webView} {
    width: auto;
    padding-left: 20px;
  }
`;

export const ModalContainer = styled.section`
  height: 100%;
  .back-header {
    padding: 15px 15px 0;
    ${media.webView} {
      padding: 25px 25px 0;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    .back-lbl-wrp {
      ${media.modalView} {
        display: flex;
      }
    }
  }
`;
