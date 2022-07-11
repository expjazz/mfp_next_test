import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 0;
  ${media.webView} {
    padding-top: 0;
    position: relative;
  }
  ${media.largeScreen} {
    height: auto;
    background: ${props => props.theme.white};
    ${props => (props.formEnabled ? 'padding-top: 25px' : 'padding-top: 30px')};
    max-width: 700px;
    margin-left: 20px;
  }
  ${media.modalView} {
    height: calc(100% - 50px);
  }
  .title {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }

  .back-header {
    ${media.modalView} {
      padding: 25px 25px 0;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    ${media.largeScreen} {
      ${props => (props.formEnabled ? 'display: block' : 'display: none')};
      .right-section {
        display: none;
      }
      padding: 0 25px;
    }
    .back-lbl-wrp {
      ${media.modalView} {
        display: flex;
      }
      ${media.largeScreen} {
        ${props =>
          props.formEnabled ? 'display: inline-block' : 'display: none'};
      }
    }
  }
  .save-button {
    margin-top: 5px;
  }

  .check-text {
    font-size: 14px;
    line-height: 20px;
    color: #797979;
    margin-top: 5px;
  }

  #scroll-charity {
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
  }

  .fund-head {
    padding-top: 36px;
  }
  .card-title {
    font-family: Gilroy-Bold;
    padding-bottom: 5px;
  }
  .main-desc {
    padding-bottom: 15px;
  }
  .dashed-btn {
    background: #fff;
  }
`;

export const Container = styled.div`
  padding: 0 15px 0;
  ${media.webView} {
    padding: 15px 50px 0;
  }
  ${media.largeScreen} {
    padding: 15px 50px 0;
  }
`;

export const Content = styled.section`
  width: 100%;
  height: auto !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
  .socialmedia-icon {
    color: #cccccc;
    width: 35.7px;
    height: 29px;
  }
  @media (max-width: 831px) {
    height: max-content;
  }
  .title {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
`;

export const ListContainer = styled.div`
  width: 100%;
  &.fund-list {
    padding-top: ${props => (props.hasActiveFund ? '17px' : '27px')};
  }
`;
