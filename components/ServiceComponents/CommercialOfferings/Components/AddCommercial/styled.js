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

  ${media.mobileScreen} {
    .float-label {
      transform: translate(10px, 4px) scale(1) !important;
    }

    .bottom-btns {
      margin-bottom: 20px;
    }
  }

  .pt-08 {
    padding-top: 0.8rem !important;
  }

  .custom-blue {
    color: #1e36a0 !important;
    text-align: center;
  }

  .drop-list {
    box-shadow: -1px 0px 0px 0px ${props => props.theme.headerGrey}, 1px 0px 0px 0px ${props => props.theme.headerGrey};
    z-index: 1000 !important;
  }

  .dropdown-heading {
    font-size: 16px;
    padding: 5px 18px;
    cursor: default;
    font-family: Gilroy-SemiBold;
  }
  .dropdown-list-container {
    display: flex;
    padding: 10px 10px;
    align-items: flex-start;
    height: fit-content;
    border-bottom: 1px solid ${props => props.theme.headerGrey};
    margin: 0;
    background: white;
    &:hover {
      box-shadow: inset 0px 0px 0px 1px ${props => props.theme.brownGrey};
    }
    img {
      transform: translate(0px, 2px);
      height: 60px;
      width: 60px;
      object-fit: cover;
      border-radius: 5px;
    }
    div {
      display: flex;
      flex-direction: column;
      /* flex-grow: 2; */
      flex-grow: 2;
      /* height: 60px; */
      padding-left: 7px;
    }
    .title {
      font-weight: 800;
    }

  }

  .drop-down {
    margin-top: 0;
    background: ${props => props.theme.pureWhite};
    .custom {
      background: ${props => props.theme.pureWhite};
    }
    &:hover {
      border-color: ${props => props.theme.brownGrey};
    }
  }

  .drop-list {
    z-index: 10;
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

  #add-commercial-scroll {
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
    :last-of-type {
      padding-bottom: 5px;
    }
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

  .last-input {
    margin-top: 0;
    margin-bottom: 20px;
  }
  .customize {
    padding-bottom: 20px;
  }
  .desc-note {
    padding-bottom: 20px;
    font-size: 12px;
    line-height: 18px;
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
    padding-bottom: 10px;
    .image-span {
      position: relative;
      display: flex;
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
