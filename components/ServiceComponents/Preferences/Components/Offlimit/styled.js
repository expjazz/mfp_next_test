import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrap = styled.div`
  ${media.modalView} {
    height: calc(100% - 35px);
  }
  #offlimit-scroll {
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
  .note-padding {
    padding-bottom: 10px;
  }
  .save-button {
    padding-top: 20px;
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
`;
