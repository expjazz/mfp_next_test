import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { media } from 'styles/mediaQueries';

const scrollStyle = css`
  position: relative !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  margin: 0 !important;
`;
export const Layout = styled.div`
  height: 100%;
  ${media.mobileScreen} {
    padding-left: 15px;
    padding-right: 15px;
  }
  ${media.modalView} {
    padding-left: 50px;
    padding-right: 50px;
  }
  #stars-scroll {
    ${media.mobileScreen} {
      ${scrollStyle}
    }
    ${media.largeScreen} {
      ${scrollStyle};
    }
  }
  .pagination-wrapper {
    justify-content: flex-start;
  }
  .req-li {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 15px 10px;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.veryLightPink};
    .exp-wrp {
      display: flex;
      justify-content: space-between;
      padding-top: 4px;
    }
    .time {
      font-family: Gilroy-Bold;
      font-size: 14px;
      color: ${props => props.theme.greyishBrown};
    }
    .for {
      font-family: Gilroy-Bold;
      font-size: 14px;
      line-height: 22px;
      color: #7c7c7c;
      margin-bottom: 5px;
    }
    .name {
      font-family: Gilroy-Extrabold;
      font-size: 24px;
    }
  }
  .tick-text {
    flex-direction: row;
    color: ${props => props.theme.orangePink};
  }
  .det-wrp {
    display: flex;
    justify-content: space-between;
    flex-wrap: flex-wrap;
    .left {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .flex-col {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      color: ${props => props.theme.greyishBrown};
      font-family: Gilroy;
      line-height: 22px;
      padding-bottom: 20px;
    }
    .heading {
      font-family: Gilroy-Bold;
    }
    .btns {
      display: flex;
      flex-direction: column;
      button {
        margin-bottom: 15px;
      }
      .share-btn {
        width: 150px;
        margin-right: 0;
      }
    }
  }
`;
