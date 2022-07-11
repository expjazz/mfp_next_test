import styled from '@emotion/styled';
import { EmptyText } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  padding: 0 15px 35px 15px;
  ${media.modalView} {
    padding: 15px 50px 35px;
    height: calc(100% - 50px);
  }
  ${media.largeScreen} {
    padding: 55px 15px 35px 15;
  }
  .cus-drop {
    margin-bottom: 19px;
  }
  .drop-list {
    z-index: 6;
  }
  .cat-divider {
    border-bottom: 2px solid ${props => props.theme.borderGrey};
  }
  ${EmptyText} {
    padding-bottom: 3px;
  }
  ${media.largeScreen} {
    max-width: 661px;
    margin-left: 25px;
    padding: 30px 50px 35px;
    .cat-drop {
      background-color: ${props => props.theme.pureWhite};
      max-width: 100%;
    }
    background: ${props => props.theme.white};
    .slider-layout,
    .slider-container,
    .slider-wrapper {
      width: 600px;
    }
    .slider-wrapper {
      margin-left: -90px;
    }
    .nextArrow {
      right: 49px;
    }
    .backArrow {
      left: 49px;
    }
    .arrow-slider {
      top: 50%;
      /* transform: translate(-50%, 0); */
    }
  }
  .card-heading {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
  .card-layout {
    ul {
      align-items: flex-start !important;
    }
    svg {
      top: 132px !important;
    }
    ${media.mobileScreen} {
      background: ${props => props.theme.pureWhite};
    }
    ${media.modalView} {
      background: ${props => props.theme.pureWhite};
    }
    .share-root {
      display: flex;
      justify-content: center;
      padding-bottom: 20px;
    }
    .disabled {
      padding-top: 80px;
    }
  }
  .promo-head {
    font-size: 16px;
    font-family: Gilroy-Bold;
    line-height: 21px;
    color: ${props => props.theme.greyishBrown};
  }
  .promo-note {
    margin-bottom: 19px;
    ${media.webView} {
      line-height: 22px;
    }
  }
  .template-wrap {
    padding-right: 0;
    padding-top: 0;
    ${media.webView} {
      padding-left: 35px;
      padding-top: 31px;
      flex: 0 0 calc(33.33% - 35px);
    }
  }
  .share-text {
    display: inline-block;
    text-align: center;
    width: 100%;
  }
  .social-container {
    padding-top: 30px;
    .social-wrap {
      font-size: 30px;
      padding-top: 18px;
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 0 auto;
      .social-icon {
        color: ${props => props.theme.flatBlue};
        cursor: pointer;
        margin-right: 15px;
      }
      .twitter-icon {
        margin-right: 30px;
      }
      .insta-story {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .story-text {
          font-size: 10px;
          font-family: Gilroy-Medium;
          color: ${props => props.theme.flatBlue};
        }
        .social-icon {
          margin-right: 0;
        }
      }
    }
  }

  .custom-container-wrap {
    width: 265px !important;
  }

  .custom-temp-wrap {
    width: 265px !important;
  }

  .contanier-wrap {
    width: 265px !important;
    height: 265px !important;
  }
  .temp_wrap,
  .temp-wrap {
    width: 265px !important;
    height: 265px !important;

    /* temp three */
    .temp_three_name {
      left: 0 !important;
      top: 70px !important;
      font-size: 21px !important;
      font-weight: normal !important;
    }
    .temp_three_sname {
      left: 0;
      width: 100% !important;
      top: 98px !important;
      font-size: 15px !important;
      color: #555;
      font-family: Gilroy-Semibold;
    }

    /* temp one */
    .temp_one_name {
      left: 0 !important;
      width: 100% !important;
      bottom: 50px !important;
      font-size: 18px !important;
      color: ${props => props.theme.orangePink};
      font-family: Gilroy;
    }
  }
  .container-wrap {
    width: 265px !important;
    height: 265px !important;
  }
`;
