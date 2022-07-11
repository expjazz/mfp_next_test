import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { smallHead } from 'styles/TextStyled';

export const Image = styled.img`
  width: 169px;
  height: 169px;
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  object-fit: cover;
`;

export const SmallHead = styled.span`
  ${smallHead};
  color: ${props => props.theme.greyishBrown};
`;

export const FooterWrap = styled.span`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  .share-btn {
    margin-right: 10px;
    min-height: 40px;
  }
`;

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  position: relative;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: 34px;
    font-size: 50px;
    z-index: 1;
    ${media.webView} {
      top: 49px;
    }
  }
  .successImg {
    background: url(/images/art_highfive.svg) no-repeat;
    background-position: center;
    display: inline-block;
    background-size: contain;
    width: 196px;
    height: 138px;
    ${media.webView} {
      width: 260px;
      height: 225px;
    }
  }
  .successScroll {
    margin-top: 44px;
    height: calc(100% - 44px) !important;
    display: inline-block;
    ${media.webView} {
      margin-top: 39px;
      height: calc(100% - 39px) !important;
    }
  }
  &.content-wrapper {
    display: flex;
    flex-direction: column;
    @media (min-width: 1280px) {
      .list-item {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }
`;
export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 15px;
  ${media.webView} {
    max-width: 100%;
    padding: 0 60px;
  }
  ${media.mobileScreen} {
    padding-right: 15px;
    padding-left: 15px;
    max-width: 340px;
  }
  .highFive {
    color: ${props => props.theme.orangePink};
    padding-bottom: 8px;
    padding-top: 15px;
    font-family: Gilroy-Bold;
    ${media.webView} {
      padding-top: 24px;
    }
  }
  .orderSuccess {
    color: ${props => props.theme.orangePink};
    font-size: 40px;
    line-height: 39px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 10px;
    ${media.webView} {
      font-size: 34px;
      padding-bottom: 24px;
    }
  }
  .note {
    color: ${props => props.theme.greyishBrown};
    font-size: 16px;
    line-height: 22px;
    padding-bottom: 28px;
    ${media.mobileScreen} {
      padding-bottom: 14px;
    }
  }
  .browseBtn {
    margin: 0 auto 25px !important;
    ${media.mobileScreen} {
      margin: 0 auto !important;
    }
  }
  .align-center {
    margin-bottom: 20px;
  }
`;
