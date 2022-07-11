import styled from '@emotion/styled'
import { css } from '@emotion/react';
import { media } from 'styles/mediaQueries';

const scrollStyle = css`
  position: relative !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  margin: 0 !important;
`;
export const Layout = styled.div`
  height: 100%;
  ${media.mobileScreen} {
    padding-left: 15px;
    padding-right: 15px;
  }
  ${media.modalView} {
    padding-left: 50px;
    padding-right: 50px;
  }

  #completed-scroll {
    ${media.mobileScreen} {
      ${scrollStyle}
      height: 100%;
    }
    ${media.largeScreen} {
      ${scrollStyle};
    }
  }
`;
