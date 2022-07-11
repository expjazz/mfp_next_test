import styled from '@emotion/styled';
import { media } from '../../styles/mediaQueries';
// import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  .message-wrap {
    padding-bottom: 10px;
    .message-left {
      border-radius: 0 10px 10px;
      width: 100%;
    }
    .message-right {
      border-radius: 10px 0 10px 10px;
      width: 100%;
    }
  }
  .back-icon {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
  #category-list-scroll {
    position: relative !important;
    overflow: hidden !important;
    margin: 0 !important;
    .scrollRenderView {
      overflow: hidden !important;
    }
  }
  .heading-back {
    display: none;
  }
  .message-container {
    height: auto;
    padding-bottom: 50px;
  }
  .conv-wrap {
    flex: 1;
  }
  .payment-heading {
    color: ${props => props.theme.greyishBrown};
    text-align: left;
    margin-top: 10px;
  }
  @media (min-width: 832px) {
    .message-container.checkout-wrapper {
      padding-right: 10px;
    }
  }
  @media (min-width: 1280px) {
    .message-container.checkout-wrapper {
      width: 500px;
    }
  }
`;

export const RateBold = styled.h5`
  font-size: 18px;
  font-family: Gilroy-Bold;
  text-align: center;
`;

export const SuccessWrap = styled.div`
  ${media.webView} {
    display: none;
  }
  .note {
    max-width: 340px;
    margin: 0 auto;
    text-align: center;
  }
  .success-Back {
    position: relative;
    .back-lbl-wrp {
      display: block;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${media.largeScreen} {
    flex-direction: row;
    .conv-wrap {
      padding-right: 30px;
    }
    .message-container {
      height: 100%;
      ${props =>
        props.hasPay &&
        `
        border-left: 1px solid ${props.theme.headerGrey};
        padding-left: 30px;
      `}
    }
  }
  .actionbar {
    display: flex;
    flex-direction: column;
    min-width: 50%;
    ${media.largeScreen} {
      padding-left: 30px;
      border-left: 1px solid #e1e1e1;
    }
    .action-parent {
      padding-bottom: 50px;
      ${media.largeScreen} {
        min-height: 290px;
      }
    }
  }
`;

export const DetailWrap = styled.section`
  transition: 1s ease padding;
  display: none;
  width: 100%;
  font-size: 14px;
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  ${props =>
    props.show &&
    `
    padding-top: 2px;
    display: block;
  `};
  .detail-item {
    margin-bottom: 5px;
    display: block;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const DetailWrapper = styled.ul`
  margin-bottom: 10px;
  .detail {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 18px;
    color: ${props => props.theme.greyishBrown};
    font-family: Gilroy;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
    .details-cta {
      width: 100%;
      margin-top: 2px;
      font-size: 14px;
    }
    &.bold {
      font-family: Gilroy-Bold;
      text-transform: uppercase;
    }
    .detail-head {
      margin-right: 10px;
      flex: 1;
      font-size: 16px;
      &.name {
        font-family: Gilroy-Semibold;
      }
      &::first-letter {
        text-transform: capitalize;
      }
    }
    .detail-value {
    }
  }
`;
