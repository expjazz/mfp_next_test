import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrap } from '../socialStyled';

export const Layout = styled(Wrap)`
  ${media.modalView} {
    height: calc(100% - 10px);
  }
  #commercial-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      margin: 0 !important;
    }
  }
  .list-item {
    padding-bottom: 20px;
  }
  .video-shout-li {
    flex-direction: column;
  }
  .li-content-wrap {
    display: flex;
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
  .panel-container {
    border-bottom: 1px solid #cccccc;
    border-top: none;

    &:first-child {
      border-top: 1px solid #cccccc;
    }
  }
`;
