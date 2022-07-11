import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  padding: 30px 0;
  @media (max-width: 1280px) {
    padding-top: 0;
  }
  @media (max-width: 831px) {
    height: 100%;
    padding: 0;
    .player-container {
      border-radius: 20px !important;
      vertical-align: bottom;
    }
    .player {
      min-height: 305px;
    }
    .mobileBtn {
      margin-top: 20px;
    }
  }

  ${media.largeScreen} {
    background: ${props => props.theme.white};
  }
  .back-header {
    top: 80px;
    ${media.mobileScreen} {
      top: inherit;
    }
    ${media.modalView} {
      padding: 0;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    .back-lbl-wrp {
      ${media.modalView} {
        display: flex;
      }
    }
    ${media.largeScreen} {
      display: none;
    }
  }
  .wel-head {
    padding-top: 15px;
    padding-bottom: 3px;
    ${media.webView} {
      padding: 0;
    }
  }
  .dots-container {
    @media (max-width: 831px) {
      display: ${props => (props.compSwitch ? 'none' : 'block')};
    }
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  & > section {
    @media (min-width: 1280px) {
      padding-top: 20px;
    }
    @media (max-width: 831px) {
      padding-top: 0;
    }
  }
  @media (max-width: 831px) {
    /* height: calc(100% - 60px) !important; */
    max-height: 450px;
  }
`;
