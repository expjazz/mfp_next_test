import styled from '@emotion/styled';
import { Card } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';
import { Heading } from 'styles/TextStyled';
import { Wrapper } from '../styled';

export const ScrollWrap = styled.section`
  ${media.modalView} {
    ${props =>
      props.selected
        ? `
      height: calc(100% - 106px);
    `
        : `
      height: calc(100% - 187px);
    `}
  }
  #fan-info-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
  }
`;

export const Wrap = styled(Wrapper)`
  width: 100%;
  .cus-drop {
    &.drop-down {
      margin-top: 10px;
      padding-top: 0;
    }
  }
  ${Heading} {
    position: relative;
    .download-icon {
      position: absolute;
      right: 0;
      cursor: pointer;
      color: ${props => props.theme.flatBlue};
      font-size: 27px;
    }
    ${media.mobileScreen} {
      padding-top: 15px;
    }
  }
  .loader {
    height: auto;
  }
  ${props =>
    props.selectedId &&
    `
    padding-top: 15px;
  `}
  ${media.mobileScreen} {
    ${props =>
      props.selectedId &&
      `
      padding-top: 0;
    `}
  }
  .pagination-wrapper {
    margin: 15px 0;
    padding-top: 0;
    @media(min-width: 832px) {
      .page-display {
        margin: 0;
      }
      .left-arrow,
      .right-arrow {
        order: initial;
      }
    }
  }
  .title {
    ::first-letter {
      text-transform: capitalize;
    }
  }
`;

export const ConciseView = styled(Card)`
  font-family: Gilroy-Regular;
  padding: 17px;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  justify-content: space-between;
  .col {
    max-width: 50%;
    display: flex;
    flex-direction: column;
    padding-right: 5px;
    .head {
      font-family: Gilroy-Semibold;
      font-size: 14px;
      line-height: 18px;
      color: ${props => props.theme.lightGreyTwo};
    }
    .bold {
      font-size: 26px;
      font-family: Gilroy-Bold;
      line-height: 30px;
      color: ${props => props.theme.bold2};
    }
    &:last-child {
      padding-right: 0;
      text-align: right;
      word-break: break-all;
    }
  }
`;
