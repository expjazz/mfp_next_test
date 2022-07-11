import styled from '@emotion/styled'
import { css } from '@emotion/react';
import { Heading } from 'styles/TextStyled';

const horizontalPadding = css`
  padding: 0 12px;
  padding-top: 0;
  @media (min-width: 832px) {
    padding: 0 50px;
    padding-top: 70px;
  }
`;

const OrderStyled = styled.div`
  ${props => props.isModal && !props.isCommercial && horizontalPadding};
  padding-top: 0;
  height: 100%;
  .scroll-shout-details {
    display: flex;
    flex-direction: column;
  }
  ${props =>
    props.isModal &&
    props.isCommercial &&
    `
    .content-data {
      padding: 0 12px;
      @media (min-width: 832px) {
        padding: 0 50px;
      }
    }
  `}
  @media (min-width: 832px) {
    padding-top: 0;
  }
  .order-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

OrderStyled.HeaderText = styled(Heading)`
  text-align: center;
  word-break: break-word;
  white-space: normal;
  word-wrap: break-word;
  font-weight: normal;
  ${props =>
    props.starMode &&
    `
    padding-top: 15px;
    margin-bottom: 3px;
  `}
  strong {
    font-family: Gilroy-Medium;
    font-weight: normal;
  }
`;

OrderStyled.Heading = styled.span`
  font-family: Gilroy-Regular;
  font-size: 24px;
  display: block;
  text-align: center;
  color: ${props => props.theme.flatBlue};
  margin: 30px 0 10px;
  ${props =>
    !props.starMode &&
    `
    margin-top: 0;
  `}
  @media(max-width: 831px) {
    font-size: 18px;
    color: #999;
    margin: 20px 0 10px;
    text-align: left;
  }
`;

OrderStyled.TextButton = styled.span`
  display: block;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  font-size: 14px;
  font-family: Gilroy-Regular;
`;

OrderStyled.ColumnCenter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 13px;
  @media (max-width: 831px) {
    justify-content: flex-start;
    margin-left: 10px;
  }
  .check-text {
    padding-top: 7px;
    font-size: 12px;
  }
`;

OrderStyled.DetailList = styled.ul`
  display: table;
  padding: 20px 0;
  .detail-item {
    display: table-row;
    padding: 10px 0;
    .detail-title {
      font-family: Gilroy-Regular;
      font-size: 14px;
      padding-bottom: 10px;
      display: table-cell;
      color: #b7b7b7;
    }
    .detail-value {
      font-family: Gilroy-Medium;
      font-size: 14px;
      color: #565657;
      display: table-cell;
      padding-left: 10px;
      line-height: 25px;
      .detail-comment {
        display: block;
      }
    }
  }
`;

OrderStyled.ScriptWrapper = styled.div`
  display: block;
  max-width: 520px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 831px) {
    max-width: 100%;
  }
  .script {
    color: ${props => props.theme.flatBlue};
    font-size: 17px;
    line-height: 23px;
  }
  .script-wrapper {
    margin-bottom: 15px;
    &.star-reply {
      .script-container {
        background: ${props => props.theme.greyBackground};
        padding: 18px 30px;
        .script {
          color: ${props => props.theme.greyishBrown};
        }
      }
    }
  }
  section:nth-child(2) {
    &:not(.script-wrapper) {
      padding: 18px 30px;
    }
  }
  ${props =>
    props.isMoreActions &&
    `
    padding-top: 40px;
  `}
  .additional-info {
    display: flex;
    padding-left: 11px;
    padding-top: 13px;
    font-family: Gilroy-Regular;
    font-size: 14px;
    color: ${props => props.theme.greyishBrown};

    padding-left: 43px;
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 5px;
    }
    @media (max-width: 831px) {
      padding: 0;
    }
    .value {
      min-height: 85px;
      max-height: 85px;
      overflow: auto;
      padding-left: 0;
      margin-bottom: 5px;
      @media (max-width: 831px) {
        min-height: 20px;
      }
      &::-webkit-scrollbar {
        width: 5px;
        height: 8px;
        background-color: #aaa;
      }

      &::-webkit-scrollbar-thumb {
        background: #000;
      }
    }
    @media (min-width: 832px) {
      padding-left: 43px;
      display: flex;
      flex-direction: column;
      .title {
        margin-bottom: 5px;
      }
    }
  }
  .more-action-root {
    position: absolute;
    top: 0;
    right: 12px;
    @media (min-width: 832px) {
      right: -30px;
    }
  }
  @media (min-width: 832px) {
    padding-top: 0;
  }
`;

OrderStyled.Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 44px;
  .star-action-btn {
    display: ${props => (props.starMode ? 'none' : 'block')};
    margin-bottom: 20px;
    @media (min-width: 832px) {
      display: block;
    }
  }
  .commercial-footer {
    margin: 20px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    ${OrderStyled.TextButton} {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
    @media (max-width: 831px) {
      ${OrderStyled.TextButton} {
        margin-right: 0;
        margin-bottom: 10px;
      }
      .commercial-actions {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
  @media (max-width: 831px) {
    padding: 0;
    align-items: center;
    display: block;
  }
`;

OrderStyled.PaymentView = styled.section`
  margin-top: 20px;
  .scroll-section-payment {
    .scrollRenderView {
      position: static !important;
    }
  }
  .pay-container {
    background: ${props => props.theme.white};
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
  }
`;

export default OrderStyled;

export const OrderText = styled.span`
  font-family: Gilroy-SemiBold;
  font-size: 14px;
  color: ${props => props.theme.flatBlue};
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
  display: ${props => (props.starMode ? 'none' : 'block')};
  @media (min-width: 832px) {
    display: block;
  }
  @media (min-width: 832px) {
    display: flex;
    flex: 1 0 auto;
    align-items: flex-end;
    justify-content: center;
  }
`;

export const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  ${props => props.starMode && props.isModal && horizontalPadding}
  .order-modal-header {
    left: 0;
    right: 0;
    @media (min-width: 832px) {
      position: absolute;
      justify-content: flex-end;
      display: flex;
      top: 30px;
      padding: 0 30px;
    }
  }
  ${props =>
    props.isModal &&
    `
    height: 100%;
  `};
`;

export const LinkItem = styled.a`
  font-size: 14px;
  font-family: Gilroy-Regular;
  color: ${props => props.theme.flatBlue};
  line-height: 21px;
`;

export const DetailHead = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  display: block;
  color: ${props => props.theme.greyishBrown};
  line-height: 20px;
`;

export const DetailDesc = styled.span`
  font-family: Gilroy;
  font-size: 16px;
  display: block;
  color: ${props => props.theme.greyishBrown};
  line-height: 21px;
  overflow-wrap: break-word;
  &.capitalise {
    text-transform: capitalize;
  }
`;

export const DetailWrapper = styled.section`
  margin-bottom: 20px;
  .script-details {
    display: flex;
    flex-direction: column;
    font-family: Gilroy;
    line-height: 24px;
  }
`;
