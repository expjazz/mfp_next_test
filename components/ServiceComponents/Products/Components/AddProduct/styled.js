import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  ${media.webView} {
    padding-top: 0;
  }
  ${media.modalView} {
    padding-top: 65px !important;
  }

  .back-header {
    padding: 0;
    position: absolute;
    top: 70px;
    left: 15px;
    width: calc(100% - 30px);
    ${media.mobileScreen} {
      position: relative;
      top: inherit;
      left: inherit;
      padding-top: 10px;
    }
    ${media.webView} {
      top: 25px;
      left: 25px;
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
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }

  #add-product-scroll {
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

  .input-wrapper {
    padding-bottom: 10px;
    padding-top: 0;
  }

  .quantity-wrap {
    padding-bottom: 5px;
  }
  .normal-input:last-child {
    padding-bottom: 10px;
  }
  .input-container {
    padding-left: 0;
    padding-top: 0;
    position: relative;
  }
  .cinput-container {
    margin-top: 10px;
    ${media.mobileScreen} {
      margin-top: 0;
    }
  }
  .last-input {
    margin-top: 0;
    margin-bottom: 20px;
    margin-left: 35px;
  }
  .customize {
    padding-bottom: 20px;
  }
  .remaining {
    padding-bottom: 20px;
    text-align: center;
    font-size: 12px;
  }
  .hidden-upload {
    display: none;
  }
  .image-preview {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 10px;
    opacity: 0.5;
  }
  .image-wrapper {
    display: flex;
    justify-content: center;
    .image-span {
      position: relative;
      display: flex;
      margin-bottom: 10px;
    }
  }
  .close {
    right: 15px;
    top: 10px;
  }
  .add-item {
    margin-top: 5px;
  }
  .check-ul {
    ${props => props.customize && `padding-top: 10px`};
  }
  .edit-item {
    :first-of-type {
      margin-right: 15px;
    }
  }

  .btn-confirm-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
  }
  .terms-modal {
    top: auto;
    .btn-keep {
      margin-bottom: 10px;
    }
  }
  .list-item-product {
    padding-bottom: 20px;
    ${media.mobileScreen} {
      &:last-child {
        padding-bottom: 10px;
      }
    }
  }
  .dashed-btn {
    margin-bottom: 10px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.greyishBrown};
    .upload-icon {
      margin-right: 7px;
      height: 17px;
      width: 17px;
      color: ${props => props.theme.greyishBrown};
    }
  }
`;

export const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  font-family: Gilroy;
  line-height: 11px;
  padding-top: 3px;
  color: ${props => props.theme.greyishBrown};
  padding-bottom: 10px;
`;
