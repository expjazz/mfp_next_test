import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrap = styled.div`
  ${media.modalView} {
    height: calc(100% - 35px);
  }
  #preference-scroll {
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
  .list-item-preference {
    padding-bottom: 20px;
  }
  .note-padding {
    padding-bottom: 10px;
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
`;
