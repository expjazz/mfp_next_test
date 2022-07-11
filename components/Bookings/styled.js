import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const BookingsStyled = styled.div`
  position: relative;
  .info-text {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Medium;
    font-size: 16px;
    cursor: pointer;
    margin: 6px 0;
    display: block;
    text-align: center;
    strong {
      font-family: Gilroy-Medium;
      font-weight: normal;
    }
    @media (min-width: 832px) {
      margin: 0;
      font-size: 18px;
      display: none;
    }
  }
  &.booking-wrapper {
    padding-left: 0;
    padding-right: 0;
    ${media.modalView} {
      padding-left: 20px;
    }
    ${media.mobileScreen} {
      position: relative;
      margin-top: 0;
    }
    @media (max-width: 1280px) and (min-width: 442px) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .heading-top {
    @media (max-width: 831px) {
      font-size: 24px;
    }
  }
  .common-header {
    padding-left: 15px;
    padding-right: 15px;
    @media (min-width: 832px) {
      padding: 0;
      margin-bottom: 10px;
    }
  }
  .arrow {
    width: 14px;
    height: 28px;
    top: 15px;
    ${media.webView} {
      display: none;
    }
  }
  .latest-activity {
    padding-top: 17px;
    @media (max-width: 831px) {
      padding-top: 0;
    }
  }
  .drop-down {
    width: 100%;
    margin-bottom: 10px;
    @media (min-width: 1280px) {
      width: 275px;
    }

    .drop-icon + ul {
      @media (max-width: 831px) {
        z-index: 100;
        width: calc(100% + 2px);
        margin-left: -1px;
      }
    }
  }
  @media (min-width: 832px) {
    padding: 0;
  }
  .booking-header {
    top: -24px;
    ${media.webView} {
      display: none;
    }
    ${media.mobileScreen} {
      position: relative;
      top: inherit;
    }
  }
`;

BookingsStyled.Container = styled.div`
  @media (max-width: 831px) {
    width: 620px;
    margin: 0px auto;
    padding: 5px 15px 30px;
    max-width: 100%;
  }
  @media (max-width: 1279px) and (min-width: 832px) {
    height: 100%;
  }
  .empty-text {
    justify-content: left;
    display: block;
    font-family: Gilroy-Light;
    font-size: 14px;
    line-height: 18px;

    a {
      color: ${props => props.theme.flatBlue};
    }
  }
  .nodata-head {
    display: none;
    ${media.webView} {
      display: block;
      font-size: 24px;
      text-align: left;
    }
  }
`;

BookingsStyled.Header = styled.span`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
  text-align: center;
  display: block;
  margin-bottom: 15px;
  @media (min-width: 832px) {
    text-align: left;
  }
`;

BookingsStyled.SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 17px;
  .info-text {
    display: none;
  }
  @media (min-width: 832px) {
    .info-text {
      display: block;
    }
  }
`;

export default BookingsStyled;
