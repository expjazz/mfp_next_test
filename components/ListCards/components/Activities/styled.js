import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  .activityCard {
    padding: 22px;
    margin-bottom: 10px;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.last-child {
      margin-bottom: 0;
    }
    .activityCard-inner {
      width: 100%;
      ${media.mobileScreen} {
        flex-direction: column;
        align-items: flex-start;

        .button-booking, .button-activity {
          align-self: center;
          margin-top: 10px;
        }
        .button-activity {
          min-width: 150px;
          min-height: 40px;
        }
      }
    }
    .custom-flex {
      flex-direction: column;
      align-items: flex-start;
      ${media.webView} {
        flex-direction: row;
      }
    }
    .custom-button {
      margin: 10px auto;
      ${media.webView} {
        margin: 10px 0;
      }
    }
    ${media.smallScreen} {
      padding: 10px;
    }
    @media (max-width: 831px) {
      padding: 17px 22px;
      margin-bottom: 13px;
      min-height: 74px;
    }
    .web-padding {
      ${media.webView} {
        padding-left: 55px;
      }
      span:first-child {
        ${media.mobileScreen} {
          padding-bottom: 5px;
        }
      }
    }
    .todo-padding {
      padding-right: 20px;
      ${media.webView} {
        padding-left: 48px;
      }

    }
    .sub-content {
      display: block;
      margin-top: 5px;
      ${media.webView} {
        display: inline-block;
        margin-top: 0;
      }
      .bar-separator {
        display: none;
        ${media.webView} {
          display: inline-block;
        }
      }
    }
  }
  .button-booking {
    width: auto;
    min-width: 150px;
    min-height: 40px;
    font-size: 14px;
    ${media.webView} {
      min-width: 150px;
    }
  }
  .button-activity {
    max-width: 150px;
    font-size: 14px;
  }
  .button-promote {
    min-width: 329px;
    min-height: 55px;
    font-family: Gilroy-Bold
  }
  .button-margin {
    padding-top: 10px;
    padding-bottom: 20px;
    ${media.webView} {
      display: none;
    }
  }
  .text-activity-cus {
    max-width: 204px;
  }
  .heading-bold {
    font-family: Gilroy-Extrabold;
    font-size: 18px;
    color: ${props => props.theme.flatBlue};
    @media (max-width: 831px) {
      font-size: 14px;
    }
  }
  .head2 {
    font-family: Gilroy-Extrabold;
    font-size: 18px;
    line-height: 30px;
    color: ${props => props.theme.boldBrown};
    padding-top: 28px;
    padding-bottom: 18px;
    @media (max-width: 831px) {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .web-icons {
    display: inherit;
    align-items: center;
    padding-left: 0;
    ${media.webView} {
      padding-left: 19px;
      padding-right: 10px;
    }
    .icons {
      font-size: 24px;
      display: none;
      margin-left: 4px;
      ${media.webView} {
        display: block;
      }
    }
    .icon-heart {
      color: #ff3636;
    }
    .icon-dollar {
      color: ${props => props.theme.orangePink};
    }
  }
  .btn-extra {
    display: none;
    ${media.webView} {
      display: inline-block;
    }
  }
  .tick-text {
    display: none;
    white-space: nowrap;
    font-family: Gilroy-Bold;
    ${media.webView} {
      display: flex;
    }
  }
`;
