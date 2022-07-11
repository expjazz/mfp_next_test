import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { LinkStyles } from 'styles/TextStyled';

export const Layout = styled.section`
  width: 100%;
  .local-currency {
    display: block;
    font-size: 12px;
    font-family: Gilroy-Regular;
    color: ${props => props.theme.greyishBrown};
    line-height: 21px;
  }
  .headLbl {
    font-size: 26px;
    font-family: Gilroy-Bold;
    line-height: 30px;
    &.consice-lbl {
      padding: 12px;
      background-color: ${props => props.theme.white};
      flex: 1 0 auto;
      :first-of-type {
        margin-right: 10px;
      }
      ${media.mobileScreen} {
        border-radius: 5px;
      }
    }
    &:before {
      font-size: 14px;
      line-height: 18px;
      color: ${props => props.theme.lightGreyTwo};
      display: flex;
      padding-bottom: 9px;
      font-family: Gilroy-Bold;
      @media (max-width: 831px) {
        padding-bottom: 3px;
        font-family: Gilroy-Semibold;
      }
    }
    @media (min-width: 832px) {
      font-size: 33px;
    }
  }
  .earnings {
    color: ${props => props.theme.bold2};
    ${LinkStyles};
    font-family: Gilroy-Bold;
    font-size: 26px;
    &:before {
      content: attr(data-val);
    }
  }
  .earnings-wrap {
    margin-bottom: 11px;

    &:empty {
      margin-bottom: 0;
    }
  }
  .label {
    /* width: 110px; */
    font-family: Gilroy-Medium;
    line-height: 27px;
    ${props =>
      props.page === 'dashboard' ? 'max-width: 160px; min-width:128px;' : ''}
    ${media.smallScreen} {
      ${props =>
        props.page === 'dashboard' ? 'max-width: 130px; min-width:118px; width: 100%;' : ''}
    }
  }
  .value-wrapper {
    @media (max-width: 831px) {
      display: flex;
      flex-direction: column;
    }
    .val-desc {
      padding-left: 0;
    }
  }
  .payments {
    color: ${props => props.theme.orangePink};
    ${LinkStyles};
    font-family: Gilroy-Bold;
    font-size: 26px;
    &:before {
      content: attr(data-val);
    }
  }
  .cardLayout {
    box-shadow: none !important;
    padding: 15px;
    @media (max-width: 831px) {
      padding: 10px 12px;
    }
    &.consice-layout {
      padding: 0;
      background-color: ${props => props.theme.pureWhite};

      ${media.mobileScreen} {
        margin-bottom: 15px;
      }
    }
  }
  .earningPercentage {
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: ${props => props.theme.lightGreyTwo};
    display: inline-block;
    padding-top: 10px;
    ${media.webView} {
      padding-bottom: 0;
    }
    span:first-child {
      margin-right: 15px;
    }
    @media (max-width: 831px) {
      padding-top: 7px;
    }
  }
  .rating-wrap {
    align-items: flex-start;
    .rating-label {
    }
    .rating {
      margin-top: 1px;
      .start-rate {
        @media (max-width: 831px) {
          font-size: 17px !important;
        }
      }
    }
  }
  .flex-start {
    flex-wrap: wrap;
  }
`;

export const SummaryItem = styled.li`
  display: flex;
  padding-bottom: 7px;
  align-items: flex-start;
  svg {
    color: #cbcbcb;
  }

  .rating-star {
    color: ${props => props.theme.orangePink} !important;
    font-size: 16px;
    ${media.webView} {
      font-size: 20px;
    }
    ${media.smallScreen} {
      font-size: 14px;
    }
  }

  &.column {
    flex-direction: column;
    align-items: flex-start;
  }
  .fundraiser-heading {
    font-size: 16px;
    font-family: Gilroy-Bold;
    color: ${props => props.theme.greyishBrown};
    padding: 10px 0;
  }
  .fund-progress {
    height: 30px;
  }
  .fund-raiser-text {
    font-size: 16px;
  }
  .recent-link{
    width: 100%;
  }
  .rating {
    width: 50%;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    ${media.webView} {
      width: 65%;
      padding-left: 0;
      max-width: 160px;
    }
    .span-descrptn{
      display: flex;
    }
    }
    .rate {
      padding-left: 15px;
      @media (max-width: 425px) {
        padding-left: 10px;
      }
      span + span {
        margin-left: 4px;
      }
    }
    .no-rate {
      font-family: Gilroy;
      color: ${props => props.theme.orangePink};
      font-size: 12px;
      margin-left: 16px;
    }
  }
  .align-mobileview{
    display: flex;
    @media (max-width: 831px) {
      flex-direction: column;
  }
}
  .detail-icon {
    margin-right: 12px;
    width: 1em;
  }
  .commenticon {
    transform: rotateY(180deg);
  }
  .rating-star {
    color: ${props => props.theme.orangePink} !important;
    font-size: 16px;
    ${media.webView} {
      font-size: 20px;
    }
    ${media.smallScreen} {
      font-size: 14px;
    }
  }
  .recent-link {
    width: 100%;
    text-align: center;
    padding-top: 5px;
    font-size: 14px;
  }
`;
export const Label = styled.span`
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #484848;
`;

export const ValueDescription = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 27px;
  color: #484848;
  ${media.mobileScreen} {
    padding-left: 10px;
  }
  @media (max-width: 425px) {
    padding-left: 10px;
  }
  &.time-val {
    padding-left: 4px;
  }
`;
export const Value = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  color: #484848;
  line-height: 27px;
  display: inline-block;
  width: auto;
  padding-left: 10px;
  &.remove-padding {
    padding-left: 0px;
  }
  ${media.webView} {
    width: auto;
    padding-left: 15px;
  }
  .rate-txt {
    font-family: Gilroy-Light;
  }
`;
export const Summary = styled.ul`
  &.consice-summary {
    padding: 12px;
    background-color: ${props => props.theme.white};
    ${media.mobileScreen} {
      border-radius: 5px;
    }
  }
  li {
    padding-bottom: 1px;
  }
`;
