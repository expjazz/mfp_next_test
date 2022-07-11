import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0;
  padding-bottom: 30px;
  ${media.modalView} {
    padding: 0 25px;
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    padding: 30px 50px;
    height: auto;
  }

  ${media.modalView} {
    padding: 0;
    #pagedesign-scroll {
      padding: 0 50px;
    }
  }

  .head-title {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
  .back-header {
    top: 80px;
    ${media.modalView} {
      padding: 0;
    }
    ${media.mobileScreen} {
      position: relative;
      top: inherit;
      padding-top: 10px;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    ${media.largeScreen} {
      display: none;
    }
    .back-lbl-wrp {
      ${media.modalView} {
        display: flex;
      }
    }
  }
  .back-root {
    padding-top: 0;
  }

  #pagedesign-scroll {
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
  }
  .desc {
    padding-bottom: 10px;
  }
  .choose-desc {
    padding-top: 20px;
  }
  .img-head {
    padding-top: 40px;
  }
  .align-center {
    margin-top: 20px;
  }
  .drop-wrapper {
    max-width: 320px;
    margin: 5px auto;
    display: flex;
    justify-content: space-between;
  }

  .cover-image {
    display: block;
    width: 348px;
    margin: 0 auto;
    border-radius: 5px;
    height: 92px;
    @media (max-width: 432px) {
      max-width: 100%;
    }
  }
  .goto-link {
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
    .link {
      font-family: Gilroy-Bold;
    }
    ${media.largeScreen} {
      padding-left: 48px;
      max-width: 440px;
    }
  }
  .mob-pad {
    padding: 0 15px;
    ${media.webView} {
      padding: 0;
    }
  }
`;

export const CarouselWrp = styled.div`
  width: 100%;
  position: relative;
  .slider-container {
    max-width: 348px;
    margin: 0 auto;
    @media (max-width: 359px) {
      max-width: 234px;
    }
    @media (min-width: 360px) and (max-width: 432px) {
      max-width: 274px;
    }
  }
  .cover-image {
    width: 348px;
    margin: 0;
    border-radius: 5px;
    display: block;
    height: 92px;
    @media (max-width: 359px) {
      max-width: 234px;
    }
    @media (min-width: 360px) and (max-width: 432px) {
      max-width: 274px;
    }
  }
  .select-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    min-width: 70px;
    min-height: 26px;
    font-family: Gilroy;
  }
  .remove-btn {
    right: 90px;
  }
  .backArrow {
    ${media.webView} {
      left: 60px;
    }
    ${media.largeScreen} {
      left: 85px;
    }
  }
  .nextArrow {
    ${media.webView} {
      right: 60px;
    }
    ${media.largeScreen} {
      right: 85px;
    }
  }
  .arrow-slider {
    top: 50%;
    transform: translateY(-50%);
  }
  .disabled {
    ${media.webView} {
      visibility: hidden;
    }
  }
`;
