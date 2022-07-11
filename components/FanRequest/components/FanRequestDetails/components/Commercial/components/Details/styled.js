import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  display: flex;
  flex-direction: column;
  ${media.largeScreen} {
    flex-direction: row;
  }
  .image-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .detail-title {
    min-width: 85px;
    display: inline-block;
  }
  .order-action {
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 15px;
  }
  .support-action {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .image {
    margin: 0;
    border-radius: 5px;
  }
  .commercial-actions {
    align-items: center;
    flex-direction: column;
  }
  .content-data {
    flex: 1;
    ${media.largeScreen} {
      ${props => props.hasPay && 'padding-right: 30px'};
    }
  }
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

export const DetailWrapper = styled.div`
  margin-bottom: 20px;
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

export const PaymentView = styled.section`
  margin-top: 20px;
  overflow: hidden;
  ${media.largeScreen} {
    padding-left: 30px;
    border-left: 1px solid ${props => props.theme.headerGrey};
  }
  ${media.largeScreen} {
    width: 50%;
  }
  .commercial-actions {
    padding-top: 10px;
  }
  .payment-heading {
    text-align: left;
    color: ${props => props.theme.greyishBrown};
  }
`;
