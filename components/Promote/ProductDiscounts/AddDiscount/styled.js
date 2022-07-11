import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  ${media.webView} {
    padding-top: 20px;
  }
  ${media.modalView} {
    padding-top: 50px;
  }
  .sub-head {
    ${media.mobileScreen} {
      padding-bottom: 3px;
    }
  }
  .back-header {
    padding: 0;
    position: absolute;
    width: calc(100% - 30px);
    ${media.webView} {
      top: 25px;
      left: 25px;
    }

    ${media.mobileScreen} {
      position: relative;
      padding: 10px 0 15px;

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

  #add-discount-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
  }
  .react-datepicker__input-container {
    width: 100%;
  }
  .input-container {
    .cinput-container {
      margin-top: 10px;
      padding-bottom: 10px;
    }
  }
  .btn-wrp {
    padding-top: 15px;
    max-width: 310px;
    margin: 0 auto;
    display: flex;
    padding-bottom: 20px;
    .update-btn {
      margin-left: 10px;
    }
  }
  .edit-item {
    ${media.smallScreen} {
      flex-basis: 150px;
      min-width: auto;
    }
  }
  .adore-input {
    .adornment {
      color: ${props => props.theme.twilight};
      font-family: Gilroy-Medium;
      padding-top: 2px;
    }
  }
  .terms-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    margin-top: 20px;
    z-index: 101;
    background: ${props => props.theme.white};
    ${media.webView} {
      width: 365px;
      background: ${props => props.theme.pureWhite};
    }
    transform: translate(-50%, -50%);
    padding: 20px;
    -webkit-box-shadow: 0 0 10px #dad8d8;
    box-shadow: 0 0 10px #dad8d8;
    border-radius: 5px;
    .cus-text {
      font-size: 20px;
      line-height: 25px;
    }
    .btn-confirm-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
    }
    .btn-keep {
      margin-bottom: 10px;
    }
  }
`;

export const InputWrapper = styled.div`
  padding-bottom: 10px;
  .check-box {
    z-index: 1 !important;
  }
  .input-root {
    margin-top: 0;
    ${media.largeScreen} {
      max-width: 618px;
    }
  }
`;
