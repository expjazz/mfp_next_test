import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Container = styled.div`
  height: 100%;
  ${media.mobileScreen} {
    padding: 0 15px 35px;
  }
  ${media.largeScreen} {
    padding: 30px 50px 35px;
  }
  ${media.webView} {
    padding: 30px 50px 35px;
    max-width: 661px;
    margin-left: 25px;
  }
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
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .drop-down {
    width: 100%;
    max-width: none;
  }
  .pagination-wrapper {
    width: 100%;
    margin: 9px 0;
    @media (min-width: 832px) {
      .left-arrow,
      .right-arrow {
        order: initial;
      }
    }
  }
  ${media.largeScreen} {
    min-height: 500px;
  }
  .title {
    padding-bottom: 15px;

    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
`;

export const ModalWrap = styled.div`
  ${media.webView} {
    position: relative;
    height: 100%;
  }
`;

export const ChildLayout = styled.section`
  width: 100%;
  height: 100%;
  ${media.webView} {
    padding-top: 0;
  }
  ${media.largeScreen} {
    margin-top: 20px;
  }
  ${media.modalView} {
    padding-top: 50px;
  }
  .back-header {
    padding: 0;
    position: absolute;
    width: calc(100% - 30px);
    ${media.webView} {
      top: -10px;
      left: -25px;
    }
    ${media.modalView} {
      top: 0;
      left: 0;
    }
    ${media.mobileScreen} {
      position: relative;
      padding-top: 10px;
      padding-bottom: 15px;
      .header-wrp {
        padding-top: 0;
      }
    }
    .right-section {
      display: none;
      ${media.mobileScreen} {
        display: block;
      }
    }
    .back-lbl-wrp {
      ${media.webView} {
        display: flex;
      }
    }
  }
  .sub-head {
    padding-bottom: 10px;
  }
`;
