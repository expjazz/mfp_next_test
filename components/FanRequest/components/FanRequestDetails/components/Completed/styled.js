import styled from '@emotion/styled'
import { css } from '@emotion/react';
import { media } from 'styles/mediaQueries';

const horizontalPadding = css`
  padding: 0 12px;
  @media (min-width: 832px) {
    padding: 0 50px;
  }
`;

const BookingStyled = styled.div`
  width: 100%;
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
`;

BookingStyled.Layout = styled.div`
  display: flex;
  flex-direction: column;
  ${media.largeScreen} {
    flex-direction: row;
  }
  min-height: 230px;
`;

BookingStyled.LeftSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  ${media.largeScreen} {
    padding-right: 30px;
  }
  .more-action-root {
    display: flex;
    width: 100%;
    justify-content: flex-end;
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
    .more-action-root {
      display: none;
    }
  }
`;

BookingStyled.RightSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding-top: 15px;
  flex: 1;
  position: relative;
  ${media.largeScreen} {
    padding-left: 30px;
    border-left: 1px solid ${props => props.theme.headerGrey};
    .pay-container {
      max-width: 500px;
    }
  }

  @media (min-width: 832px) {
    padding-top: 0;
  }
  .note-info {
    background: transparent;
  }
  .tip-back {
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }

  .payment-heading {
    text-align: left;
    padding-top: 15px;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;

    .detail-title {
      font-family: Gilroy-Regular;
      font-size: 16px;
      padding-bottom: 10px;
      color: #b7b7b7;
    }
    .detail-value {
      font-size: 16px;
      color: ${props => props.theme.greyishBrown};
      font-family: Gilroy-Bold;
      display: flex;
      justify-content: flex-start;
    }
    .head-caps {
      font-family: Gilroy-Bold;
      text-transform: uppercase;
      color: ${props => props.theme.greyishBrown};
      font-size: 18px;
    }
    .val-caps {
      font-size: 18px;
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

BookingStyled.CommentList = styled.div``;

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
