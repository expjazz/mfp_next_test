import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-left: 19px;
  padding-right: 19px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
  ${media.smallScreen} {
    padding-left: 0;
    padding-right: 0;
  }
  @media (max-width: 831px) {
    padding-top: 40px;
    .dash-header {
      top: 77px;
      padding: 0;
    }
  }
  .top-heading {
    text-align: left;
    margin-bottom: 12px;
    @media(min-width: 832px) {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
  .arrow {
    ${media.webView} {
      display: none;
    }
  }
  .head1 {
    padding-top: 0;
    padding-bottom: 32px;
    color: #888888;
    font-weight: normal;
    ${media.webView} {
      text-align: left;
      padding-top: 0 !important;
      padding-bottom: 0;
      margin-bottom: 15px;
    }
    @media (max-width: 831px) {
      padding-bottom: 20px;
      font-size: 24px;
      line-height: 28px;
    }
  }
  /* .middle-section {
    max-width: 620px;
    margin: 0 auto;
    ${media.smallScreen} {
      width: 310px;
    }
    @media (min-width: 832px) {
      width: 560px;
      flex: 1 1 auto;
    }
    @media (min-width: 1280px) {
      width: 567px;
    }
  } */
`;

export const Wrapper = styled.section`
  ${media.webView} {
    display: flex;
  }
  .middle-section {
    position: relative;
    ${media.largeScreen} {
      width: 566px;
      max-width: 100%;
    }
    .custom-loader {
      position: absolute;
      height: auto;
      top: 12%;
      ${media.webView} {
        top: 15%;
      }
    }
  }
`;

export const Social = styled(Card)`
  width: 369px;
  margin-left: 27px;
  padding: 24px 49px 29px;
  align-self: flex-start;
  display: none;
  ${media.largeScreen} {
    display: block;
  }
`;
