import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  position: relative;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: -20px;
    font-size: 50px;
    z-index: 1;
    display: block;
    ${media.webView} {
      top: 49px;
    }
    ${media.largeScreen} {
      display: none;
    }
  }
  .successImg {
    /* background: url('/images/art_highfive.svg') no-repeat; */
    display: inline-block;
    background-size: contain;
    width: 196px;
    height: 202px;
    ${media.webView} {
      width: 260px;
      height: 267px;
    }
  }
  .successScroll {
    margin-top: 0;
    height: calc(100% - 87px) !important;
    display: inline-block;
    ${media.webView} {
      margin-top: 39px;
      height: calc(100% - 39px) !important;
    }
  }
  &.content-wrapper {
    display: flex;
    flex-direction: column;
  }
`;
export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 30px;
  ${media.webView} {
    max-width: 100%;
    padding: 0 75px;
  }
  .highFive {
    color: #5e5391;
    padding-bottom: 8px;
    padding-top: 15px;
    ${media.webView} {
      padding-top: 24px;
    }
  }
  .note {
    color: #7c7c7c;
    font-size: 14px;
    line-height: 24px;
    padding-bottom: 45px;
    ${media.mobileScreen} {
      padding-bottom: 15px;
    }
  }
  .button-next {
    width: 200px;
    height: 60px;
    min-width: 200px;
    min-height: 40px;
  }
`;

export const Message = styled.p`
  color: #5e5391;
  font-size: 24px;
  font-family: Gilroy;
  padding-bottom:16px;
  .bold-message {
    font-family: Gilroy-Bold;
  }
`;
