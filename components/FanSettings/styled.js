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
  }
  ${media.largeScreen} {
    height: auto;
  }
  .sub-head {
    ${media.mobileScreen} {
      padding-top: 15px;
      padding-bottom: 20px;
    }
  }

  .back-header {
    top: 70px;
    z-index: 10;
    ${media.mobileScreen} {
      display: ${props => (props.hideBack ? 'none' : 'block')};
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
      ${media.webView} {
        display: block;
      }
      ${media.mobileScreen} {
        padding-bottom: 10px;
      }
    }
  }

  .sub-menu-wrap {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    ${media.webView} {
      display: block;
    }
  }
  .click-here {
    font-size: 16px;
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Light;
    cursor: pointer;
  }
  .progress-bar {
    display: flex;
    margin-bottom: 54px;
    justify-content: center;
    width: 90%;
    padding-left: 40px;
    ${media.largeScreen} {
      margin-right: 11px;
      margin-bottom: 49px;
      justify-content: flex-end;
    }
    ${media.webView} {
      width: 100%;
      padding-left: 0;
    }
    .progress-wrap {
      width: 100%;
      .progress-fill {
        font-family: Gilroy-Semibold;
      }
    }
  }
  .fan-save-btn {
    margin-top: 20px;
  }
  .profile-btn {
    display: flex;
  }
  .set-wrap {
    max-width: 100%;
  }
  ${media.mobileScreen} {
    padding-bottom: 40px;
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  ${media.largeScreen} {
    flex-direction: row;
  }
  ${media.mobileScreen} {
    padding-top: 0;
  }
  ${props => props.root && 'padding-top: 85px'};
  ${media.webView} {
    padding-top: 0;
  }
  .sub-menu-wrap {
    width: 100%;
    ${media.webView} {
      padding-left: 0;
      width: 240px;
    }
    .menu-ul {
      padding: 0;
    }
  }
  .progress-mob {
    margin-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
    display: block;
    ${media.webView} {
      padding-left: 0;
      padding-right: 0;
      padding-top: 10px;
      margin-bottom: 0px;
    }
    ${media.largeScreen} {
      display: none;
    }
  }
`;

export const RightContentWrap = styled.section`
  flex: 1;
  .header-wrapper {
    padding-top: 25px;
  }
  .progress-web {
    margin-bottom: 20px;
    display: none;
    ${media.largeScreen} {
      display: block;
    }
  }
  .note-progress {
    max-width: 80%;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 24px;
    color: #888;
    font-family: Gilroy-Semibold;
    font-size: 16px;
    line-height: 23px;
    display: block;
    ${media.largeScreen} {
      display: none;
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
  .profile-btn {
    display: flex;
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
