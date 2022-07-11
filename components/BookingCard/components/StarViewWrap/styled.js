import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Heading } from 'styles/TextStyled';
import { media } from 'styles/mediaQueries';

const horizontalPadding = css`
  padding: 0 12px;
  @media (min-width: 832px) {
    padding: 0 50px;
  }
  @media (maxn-width: 832px) {
    height: 100%;
  }
`;

const BookingStyled = styled.div`
  height: 100vh;
  flex: 1;
  ${media.webView} {
    margin-top: 20px;
  }
  .scrollbar-content {
    position: static !important;
    overflow: initial !important;
    @media (max-width: 831px) {
      height: 100%;
    }
  }
  .links {
    cursor: pointer;
  }
  @media (min-width: 832px) {
    height: 100%;
    position: relative;
    .scrollbar-content {
      position: absolute !important;
      display: flex;
      overflow: scroll !important;
      flex-direction: column;
      justify-content: flex-start;
      .action-bar div:nth-child(2) {
        margin-bottom: 0;
      }
    }
  }
  .text {
    font-family: Gilroy;
    font-size: 14px;
    color: ${props => props.theme.lightBlack};
    line-height: 20px;
  }
  .box {
    background: ${props => props.theme.white};
    padding: 15px;
    box-sizing: border-box;
    margin: 4px 0px 10px;
    display: block;
  }
  .sub-head {
    font-family: Gilroy-Bold;
    font-size: 14px;
    display: block;
    color: ${props => props.theme.greyishBrown};
    line-height: 21px;
  }
  .img-content {
    display: flex;
  }
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    .fa-download {
      font-size: 24px;
      color: ${props => props.theme.flatBlue};
    }
    .download {
      font-size: 10px;
    }
  }
`;

BookingStyled.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${props =>
    props.reaction &&
    `
    padding-top: 70px;
  `};
  @media (min-width: 832px) {
    height: 100%;
  }
  .close-btn {
    z-index: 1;
  }
  .headerGlobal {
    margin-bottom: 20px;
    height: 111px;
    min-height: 111px;
    &:after {
      top: 100%;
    }
  }
  .book-modal-header {
    left: 0;
    right: 0;
    padding: 0 13px;
    @media (min-width: 832px) {
      position: absolute;
      justify-content: flex-end;
      display: flex;
      top: 30px;
      padding: 0 30px;
    }
  }
  .tab-list {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  &.booking-video {
    @media (max-width: 831px) {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
  .star-title-nm {
    padding-top: 40px;
    font-size: 20px;
    font-family: Gilroy;
    color: #555;
    margin-bottom: 20px;
  }
`;

BookingStyled.Heading = styled.span`
  display: block;
  font-family: Gilroy-Regular;
  font-size: 24px;
  display: block;
  text-align: center;
  color: #555;
  margin: 0 0 10px;
  @media (max-width: 831px) {
    font-size: 18px;
    color: #999;
    margin: 20px 0 10px;
    text-align: left;
  }
`;

BookingStyled.TabWrapper = styled.div`
  display: flex;
`;

BookingStyled.TabSwitcher = styled.span`
  padding: 10px;
  flex: 1;
  font-family: Gilroy-Medium;
  background-color: ${props =>
    props.selected ? props.theme.orangePink : props.theme.greyishBrown};
  color: ${props => props.theme.pureWhite};
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  &.star-video {
    border-top-left-radius: 5px;
    border-right: 1px solid ${props => props.theme.pureWhite};
  }
  &.reaction-video {
    border-top-right-radius: 5px;
  }
`;

BookingStyled.Booking = styled.div`
  ${props => (props.starMode || !props.noPadding) && horizontalPadding}
  @media (min-width: 832px) {
    height: 100%;
    padding: 0;
    display: block;
  }
`;

BookingStyled.OrderWrapper = styled.div`
  ${horizontalPadding};
  @media (min-width: 832px) {
    height: 100%;
    display: block;
    background: #fff;
  }
  .ordertext-bottom {
    padding-bottom: 20px;
    text-align: center;
    @media (min-width: 832px) {
      position: absolute;
      bottom: 0px;
      display: block;
      text-align: center;
      width: 100%;
      background: #fff;
      height: 24px;
      padding-bottom: 0;
    }
  }
`;

BookingStyled.OrderInnerWrapper = styled.div`
  @media (min-width: 832px) {
    height: auto;
    max-height: 100%;
  }
`;

BookingStyled.OrderText = styled.span`
  font-family: Gilroy-SemiBold;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  margin-top: 14px;
  text-align: center;
  display: none;
  @media (min-width: 832px) {
    display: block;
  }
`;

BookingStyled.HeaderText = styled(Heading)`
  font-family: Gilroy-SemiBold;
  font-size: 18px;
  color: ${props => props.theme.orangePink};
  padding: 0;
  text-align: center;
  line-height: 27px;
  word-break: break-word;
  white-space: normal;
  word-wrap: break-word;
  font-weight: normal;
  ${horizontalPadding};
  strong {
    font-family: Gilroy-Medium;
    font-weight: normal;
  }
  @media (min-width: 832px) {
    margin-top: 11px;
  }
`;

BookingStyled.Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  @media (min-width: 832px) {
    flex-direction: row;
    padding-top: 0;
    height: auto;
  }
`;

BookingStyled.LeftSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-direction: column;
  .more-action-root {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  ${BookingStyled.OrderText} {
    display: none;
  }
  .star-name {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    width: 100%;
    font-family: Avenir-Medium;
    font-size: 20px;
    color: ${props => props.theme.twilight};
    @media (max-width: 831px) {
      max-width: 600px;
      margin-left: 30px;
    }
  }
  @media (min-width: 832px) {
    justify-content: flex-start;
    width: auto;
    .more-action-root {
      display: none;
    }
    ${BookingStyled.OrderText} {
      display: block;
    }
  }
`;

BookingStyled.RightSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding-top: 15px;
  @media (min-width: 832px) {
    padding-top: 0;
    flex: 1 1 auto;
    ${BookingStyled.OrderText} {
      display: none;
    }
  }
`;

BookingStyled.title = styled.span`
  font-family: Gilroy-Regular;
  font-size: 14px;
  color: #b7b7b7;
`;

BookingStyled.Description = styled.span`
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #565657;
`;

BookingStyled.CommentList = styled.div`
  ${props =>
    props.isPublic &&
    `
    order: 3;
  `}
`;

const PaymentPopup = styled.section`
  height: 100%;
  .scroll-section-payment {
    height: calc(100% - 110px);
    margin-top: 30px;
  }
`;

const OrderText = styled.span`
  font-family: Gilroy-SemiBold;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  display: none;
  @media (min-width: 832px) {
    display: block;
  }
`;

const EvidenceItem = styled.li`
  min-width: 215px;
  width: 215px;
  height: 250px;
  background: ${props =>
    props.imageUrl ? `url(${props.imageUrl})` : props.theme.boldBrown};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  ${media.webView} {
    min-width: 260px;
    width: 260px;
    height: 400px;
  }
  border-radius: 5px;
  margin-right: 10px;
  display: inline-block;
`;
const SuccessWrap = styled.div`
  height: calc(100% - 80px);
  .success-Back {
    padding: 28px 28px 0;
    .back-lbl-wrp {
      display: block;
    }
  }
`;
export {
  BookingStyled as default,
  EvidenceItem,
  PaymentPopup,
  OrderText,
  horizontalPadding,
  SuccessWrap,
};
