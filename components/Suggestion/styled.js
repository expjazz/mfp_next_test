import styled from '@emotion/styled';
import { Card } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-right: 0;
  padding-left: 0;
  ${props => props.showMenu && 'padding-top: 40px'};
  ${media.webView} {
    padding-left: 20px;
    padding-top: 0;
  }
  ${media.largeScreen} {
    height: auto;
  }

  .back-header {
    top: 70px;
    z-index: 10;
    ${media.mobileScreen} {
      display: ${props => (props.hideBack ? 'none' : 'block')};
      background: ${props => props.theme.pureWhite};
      position: relative;
      top: inherit;
      padding-top:10px;

      .header-wrp {
        padding-top: 0;
      }
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
    }
  }

  .heading {
    ${media.mobileScreen} {
      padding-top: 15px;
      padding-bottom: 3px;
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
  ${media.webView} {
    width: auto;
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

export const Container = styled(Card)`
  height: 100%;
  width: 100%;
  border-radius: 0;
  background: ${props => props.theme.pureWhite};
  box-shadow: none !important;
  display: flex;
  justify-content: center;
  padding: 15px 15px 35px 15px;
  .scroll-root {
    ${media.largeScreen} {
      position: static !important;
      overflow: initial !important;
    }
    ${media.mobileScreen} {
      position: static !important;
      overflow: initial !important;
    }
    #inner-scroll {
      ${media.largeScreen} {
        position: static !important;
        overflow: hidden !important;
        margin: 0 !important;
      }
      ${media.mobileScreen} {
        position: static !important;
        overflow: hidden !important;
        margin: 0 !important;
      }
    }
  }
  ${media.modalView} {
    padding: 15px 25px 35px;
    height: calc(100% - 50px);
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    padding: 30px 35px 35px;
    margin-top: 8px;
  }

  .flex-col {
    flex-direction: column;
  }
  .list-ul {
    padding-inline-start: 40px;
    margin: 10px 0 0;
    li {
      list-style-type: disc;
      padding-bottom: 5px;
    }
  }
  .btn-wrap {
    padding-top: 10px;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  .check-head-text {
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  padding-left: 20px;
  padding-right: 20px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  display: flex;
  .main-text {
    font-family: Gilroy-Bold;
  }
`;

export const InputContainer = styled.section`
  padding-top: 30px;
`;

export const InputWrapper = styled.section`
  text-align: center;
  padding-bottom: 10px;
  .label-input {
    font-family: Gilroy;
    font-size: 12px;
    line-height: 21px;
    color: ${props => props.theme.greyishBrown};
  }
`;
