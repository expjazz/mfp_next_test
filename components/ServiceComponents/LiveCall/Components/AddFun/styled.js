import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  ${media.webView} {
    padding-top: 0;
  }
  ${media.modalView} {
    padding-top: 65px !important;
  }
  .check-ul {
    display: flex;
    .check-description {
      margin-top: 2px;
      width: auto;
    }
    .check-box {
      margin-left: 15px;
      font-family: Gilroy;
    }
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
  #add-fun-scroll {
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
    &:first-child {
      padding-bottom: 10px;
    }
  }
  .qnty-input {
    padding-bottom: 5px;
    padding-top: 0;
  }
  .input-container {
    padding-left: 0;
    padding-top: 0;
    position: relative;
    ${media.modalView} {
      padding-bottom: 40px;
    }
  }
  .desc-wrapper {
    margin-top: 10px;
  }
  .remaining {
    padding-bottom: 10px;
    font-size: 12px;
    text-align: center;
  }
  .hidden-upload {
    display: none;
  }
  .image-preview {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 5px;
    opacity: 0.5;
  }
  .image-wrapper {
    display: flex;
    justify-content: center;
    .image-span {
      position: relative;
      display: flex;
    }
  }
  .close {
    right: 15px;
    top: 10px;
  }
  .edit-item {
    ${props =>
      props.hasImage
        ? 'margin-top: 15px !important'
        : 'margin-top: 0 !important'};
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
  .add-item {
    padding-top: 5px;
  }
  .deliver-drop {
    padding-bottom: 10px;

    .customPlaceholder {
      color: ${props => props.theme.greyishBrown};
    }
  }
  .drop-custom-scroll {
    max-height: 184px !important;
  }
  .drop-list {
    z-index: 20;
  }
  .dashed-btn {
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
  line-height: 11px;
  padding-top: 3px;
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  padding-bottom: 5px;
`;
