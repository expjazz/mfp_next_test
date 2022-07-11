import styled from '@emotion/styled'
import { Card } from 'styles/CommonStyled';
import { descStyles, smallHead } from 'styles/TextStyled';
import { media } from 'styles/mediaQueries';

const OpenStyled = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 832px) {
    flex-direction: row;
    min-height: calc(100vh - 275px);
  }
  @media (min-width: 832px) and (max-width: 1279px) {
    min-height: 100%;
    /* width: calc(100% - 272px); */
  }
  .video-loader {
    position: absolute;
  }
  .overlay-custom {
    display: none;
  }
  .back-header {
    padding-left: 15px;
    padding-right: 15px;
    @media (min-width: 832px) {
      padding: 25px 25px 0;
    }
    .back-lbl-wrp {
      @media (min-width: 832px) {
        display: block;
      }
    }
    @media (min-width: 1280px) {
      display: none;
    }
  }
  .tab-root {
    .tab-item {
      font-size: 16px;
    }
  }
  .emptyText {
    margin-top: 5px;
  }
  ${props =>
    props.clicked &&
    `@media (min-width: 832px) and (max-width: 1279px) {
        .overlay-custom {
            display: block;
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            left: 0;
            background: #010101;
            z-index: 101;
            opacity: .5;
        }
      }
  `}
  .product-header {
    line-height: 25px;
    padding: 0 15px;
    font-size: 20px;
    margin-bottom: 12px;
    @media (max-width: 1279px) {
      margin-top: 30px;
    }
  }
  .fun-status {
    ${smallHead};
    color: ${props => props.theme.flatBlue};
    display: block;
    text-align: center;
    padding-bottom: 15px;
  }
  .scrollRenderView {
    position: relative !important;
    overflow: hidden !important;
    margin: 0 !important;
  }
`;

OpenStyled.BookingList = styled.div`
  height: calc(100vh - 215px);
  @media (min-width: 1280px) {
    height: auto;
  }
  ${media.modalView} {
    height: calc(100% - 100px);
  }
  @media (max-width: 831px) {
    .scroll-parent {
      height: auto !important;
      overflow: auto !important;
      .scroll-container {
        position: static !important;
        width: 100%;
      }
    }
  }
  #open-scroll-target {
    position: relative !important;
    overflow: hidden !important;
    margin: 0 !important;
  }
`;

OpenStyled.LeftSection = styled.div`
  z-index: 1;
  .open-drop {
    @media (min-width: 1280px) {
      width: 300px !important;
    }
  }
  @media (min-width: 1280px) {
    width: 300px;
    ${props => props.fullWidth && `max-width:100%; width: 100%;`};
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 832px) and (max-width: 1279px) {
    width: 100%;
  }
  .filter-open-drop {
    width: 100% !important;
    .droplist-item {
      &:last-child {
        ${media.mobileScreen} {
          margin-bottom: 10px;
        }
      }
    }
  }
  .moretip-layout {
    padding-top: 15px;
  }
`;

OpenStyled.Modal = styled.div`
  @media (min-width: 832px) and (max-width: 1279px) {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media(min-width: 1280px) {
    width: calc(100% - 300px);
  }
`;

OpenStyled.RightSection = styled(Card)`
  flex: 1 1 auto;
  position: relative;
  padding-top: 13px;
  .list-item {
    padding-left: 15px;
    padding-right: 15px;
    background: inherit;
  }
  .back-header {
    z-index: 5;
  }
  .list-item {
    &:hover {
      box-shadow: none;
    }
    @media (min-width: 1280px) {
      padding-left: 35px;
      padding-right: 35px;
    }
  }
  .back-arrow {
    top: 25px !important;
  }
  .arrow-btn {
    top: 36px !important;
    display: none;
    @media (max-width: 1279px) {
      display: block;
    }
  }
  .close-btn-icon {
    position: absolute;
    right: 32px;
    top: 32px;
    z-index: 10;
  }
  .close-btn {
    display: none;
    top: 30px;
    @media (max-width: 1279px) {
      display: block;
    }
  }
  .fun-btns {
    margin-top: 20px;
  }
  .horiz-btns {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .fun-btns {
      margin-right: 10px;
    }
  }
  .buttons {
    flex-direction: column;
    align-items: center;
    /* padding-bottom: 30px; */
    .link-btn {
      font-size: 13px;
      cursor: pointer;
      color: ${props => props.theme.flatBlue};
      font-family: Gilroy;
      padding-top: 15px;
    }
    ${media.largeScreen} {
      padding-bottom: 0;
    }
  }
  .text {
    ${descStyles};
  }
  .or-text {
    display: block;
    text-align: center;
    padding: 14px 0;
    line-height: 16px;
    font-family: Gilroy-Medium;
  }
  .link {
    font-family: Gilroy;
    font-size: 14px;
    color: ${props => props.theme.flatBlue};
    line-height: 20px;
    cursor: pointer;
  }
  .sub-head {
    ${descStyles};
    font-family: Gilroy-Bold;
  }
  @media (min-width: 831px) {
    padding-top: 0;
  }
  @media (max-width: 1279px) {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    padding-top: 0;
    ${props =>
      props.hasUpload &&
      `
      padding-bottom: 86px;
    `}
    background: ${props => props.theme.pureWhite};
    ${props => props.clicked && `display: flex;`}
    overflow: auto;
    flex-direction: column;
  }
  @media (min-width: 832px) and (max-width: 1279px) {
    width: 700px;
    position: static;
    height: 700px;
    flex: unset;
    .request-content {
      padding-top: 13px;
    }
  }
  ${media.largeScreen} {
    display: block;
    width: calc(100% - 24.7px);
    height: 100%;
    margin-left: 24.7px;
    padding: 35px 0;
    padding-top: 15px;
    background: ${props => props.theme.pureWhite};
    .back-arrow {
      display: none;
    }
  }
  .cla-root {
    padding: 0 50px;
    ${media.mobileScreen} {
      padding: 0 15px;
    }
  }

`;

export default OpenStyled;

export const Header = styled.h4`
  font-family: Gilroy-Regular;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
  max-width: 500px;
  ${media.mobileScreen} {
    margin-bottom: 15px;
    padding: 0 55px 0 41px;
  }
  .bold-head-name {
    font-family: Gilroy-SemiBold;
  }
`;

export const LinkButton = styled.span`
  font-size: 13px;
  cursor: pointer;
  color: ${props => props.theme.flatBlue};
  font-family: Gilroy-Medium;
  padding-top: 15px;
`;

export const DefaultLang = styled.span`
  font-family: Gilroy-Regular;
  font-size: 12px;
  padding-bottom: 10px;
  color: ${props => props.theme.greyishBrown};
  display: block;
  .bold {
    font-family: Gilroy-Bold;
  }
  .edit-lang {
    margin-left: 5px;
    color: ${props => props.theme.flatBlue};
  }
`;
