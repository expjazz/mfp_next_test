import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding: 40px 15px 0;
  ${media.mobileScreen} {
    padding: 0 15px 0;
  }
  .common-header {
    right: 0;
    top: -24px;
    ${media.mobileScreen} {
      top: 0;
      padding: 0;
      .header-wrp {
        padding-top: 12px;
      }
      .heading-top {
        font-size: 24px;
      }
    }
  }
  @media (min-width: 832px) {
    padding-top: 0;
    .common-header {
      padding-left: 0;
    }
  }
`;

export const Wrapper = styled.section`
  margin-top: 2px;
  margin-bottom: 10px;
  .customStar-layout {
    max-width: 400px;
  }
  ${media.webView} {
    margin-top: 0;
  }
`;
