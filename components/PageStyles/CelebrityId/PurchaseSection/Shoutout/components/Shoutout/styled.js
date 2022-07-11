import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Container = styled.div`
  max-width: 830px;
  ${media.largeScreen} {
    max-width: 1090px;
  }
  margin: 0 auto;
  display: flex;
  ${media.mobileScreen} {
    flex-direction: column;
  }
`;

export const Center = styled.div`
  width: 600px;
  margin: 0 auto;
  ${media.mobileScreen} {
    width: 100%;
    border-right: none;
    padding-left: 15px;
    padding-right: 15px;
  }
  .desc-sub {
    padding-top: 20px;
    padding-bottom: 10px;
  }
  .dropdown-heading {
    font-size: 16px;
    padding: 5px 18px;
    cursor: default;
    font-family: Gilroy-SemiBold;
  }
  .occasion-divider {
    border-bottom: 2px solid ${props => props.theme.brownGreyTwo};
  }
  .drop-down {
    border: 1px solid ${props => props.theme.headerGrey};
    margin-top: 0;
    .custom {
      background: ${props => props.theme.pureWhite};
    }
    &:hover {
      border-color: ${props => props.theme.brownGrey};
    }
  }
  .subHead {
    font-family: Gilroy-Bold;
    font-size: 16px;
    color: ${props => props.theme.greyishBrown};
  }
  .top-pad {
    padding-top: 20px;
    display: block;
  }
  .check-prvt {
    margin: 30px 0;
  }
  .drop-list {
    z-index: 10;
  }
  .script-details {
    display: flex;
    flex-direction: column;
    font-family: Gilroy;
    line-height: 24px;
  }
  .btn-wrp {
    padding-top: 10px;
  }
  ${props =>
    props.disabled &&
    `opacity: .4;
     pointer-events: none;
     textarea {
      background: ${props.theme.white};
     }
     .lang-dop-cls, .custom {
      background: ${props.theme.white} !important;
     }
  `}
`;

export const Right = styled.div`
  width: 50%;
  padding-left: 60px;
  ${media.mobileScreen} {
    width: 100%;
    padding-left: 0;
    padding-top: 10px;
  }
  .review-btn {
    padding-top: 15px;
  }
  .other-text {
    margin-bottom: 5px;
  }
  .text-area {
    min-height: 110px;
  }
`;

export const FormWrap = styled.div`
  padding-top: 10px;
`;
