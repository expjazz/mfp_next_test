import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 0;
  ${media.mobileScreen} {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }
  ${media.largeScreen} {
    height: auto;
  }

  .back-header {
    top: 80px;
    z-index: 10;

    ${media.mobileScreen} {
      display: ${props => (props.hideBack ? 'none' : 'block')};
      top: inherit;
    }

    .header-label {
      padding-top: 14px;
      margin-top: 0;
      font-size: 24px;
      ${media.webView} {
        padding-top: 0;
      }
    }
    ${media.webView} {
      padding: 0;
    }
    .heading-top {
      ${props => (props.showMenu ? 'display: block' : 'display: none')};
      ${media.mobileScreen} {
        padding-bottom: 5px;
        padding-top: 15px;
      }
      ${media.webView} {
        display: block;
      }
    }
  }
  .sub-menu-wrap {
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
  .sub-menu-wrap {
    width: 100%;
    ${media.webView} {
      width: 240px;
    }
    .menu-ul {
      padding: 0;
    }
  }
`;

export const OtpWrap = styled(Card)`
  height: 100%;
  width: 100%;
  border-radius: 0;
  background: ${props => props.theme.pureWhite};
  position: relative;
  ${media.webView} {
    width: 700px;
    border-radius: 5px;
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
  }
  .otpTitle {
    padding-top: 55px;
    ${media.modalView} {
      padding-top: 20px;
    }
    ${media.largeScreen} {
      padding-top: 24px;
    }
  }

  .back-header {
    padding: 0;
    top: 15px;
    display: block;
    left: 15px;
    ${media.webView} {
      padding: 25px 25px 0;
    }
    .right-section {
      display: none;
    }
    .back-lbl-wrp {
      ${media.web} {
        display: flex;
      }
    }
  }

  .leftArrow,
  .close {
    display: none;
  }
`;

export const MenuDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0;
  width: 100%;
  ${media.webView} {
    padding-top: 0;
    width: auto;
  }
  .desc {
    width: 100%;
    padding: 5px 15px 24px;
    ${media.webView} {
      width: 240px;
      padding: 5px 0;
    }
  }
`;

export const ModalContainer = styled.section`
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
