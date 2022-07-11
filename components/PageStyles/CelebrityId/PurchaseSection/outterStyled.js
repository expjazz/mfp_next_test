import styled from '@emotion/styled';
import { smallHead } from 'styles/TextStyled';

export const ContentWrap = styled.article`
  @media(min-width: 832px) {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .pay-wrp {
      width: 100%;
      /* flex: 1; */
    }
    hr {
      width: 100%;
    }
  }
`;

export const CharityText = styled.span`
  font-size: 14px;
  font-family: Gilroy-Light;
  font-style: italic;
  line-height: 18px;
  display: block;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const SmallHeading = styled.span`
  ${smallHead};
`;

export const PromoWrap = styled.span`
  border-top: 1px solid ${props => props.theme.veryLightPink};
  border-bottom: 1px solid ${props => props.theme.veryLightPink};
  display: block;
  padding: 20px 0;
  margin-top: 30px;
`;

export const RateBold = styled.h5`
  font-size: 18px;
  font-family: Gilroy-Bold;
  margin-bottom: 20px;
  text-align: center;
`;

export const SubTitle = styled.h5`
  font-size: 20px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.greyishBrown};
  margin-top: 30px;
  text-transform: uppercase;
  padding-bottom: 5px;
`;

export const DetailWrap = styled.section`
  transition: 1s ease padding;
  display: none;
  width: 100%;
  font-size: 14px;
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  ${props => props.show && `
    padding-top: 2px;
    display: block;
  `};
  .additional-head {
    margin-top: 15px;
    display: block;
  }
  .additional-info {
    font-size: 14px;
  }
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
    font-size: 16px;
    color: ${props => props.theme.greyishBrown};
    font-family: Gilroy;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
    .details-cta {
      width: 100%;
      font-size: 14px;
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

export const Wrap = styled.section`
  .payment-heading {
    text-align: left;
    color: ${props => props.theme.greyishBrown};
  }
  @media(min-width: 832px) {
    display: flex;
    flex-direction: column;
    /* min-height: 100vh; */
  }
`;
