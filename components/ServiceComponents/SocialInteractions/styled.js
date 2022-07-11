import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrap } from '../socialStyled';

export const Layout = styled(Wrap)`
  #social-inetraction-scroll {
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
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
  .custom-loader {
    justify-content: start;
  }
`;
