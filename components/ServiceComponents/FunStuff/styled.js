import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Container, Wrapper } from '../styled';

export const ModalWrap = styled(Container)`
  ${media.webView} {
    position: relative;
  }
  ${media.modalView} {
    ${props => props.isForm && 'height: calc(100% - 15px)'};
  }
  #funlist-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      margin: 0 !important;
    }
  }
`;

export const Wrap = styled(Wrapper)`
  .text {
    font-family: Gilroy;
    font-size: 14px;
    line-height: 21px;
    color: ${props => props.theme.greyishBrown};
  }
  .link {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
    font-family: Gilroy-Medium;
  }

  .terms-wrap {
    position: relative;
  }
  .terms-modal.terms-modal {
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
  }
  .confirm-modal {
    width: 320px;
  }
  .info-button {
    margin-top: 15px;
  }
  .dashed-btn {
    background: #fff;
    margin-top: 0;

    &.add-item {
      margin-top: 5px;
    }
  }
  .input-wrapper {
    padding-top: 0;
  }
  .custom-loader {
    justify-content: flex-start;
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
`;
