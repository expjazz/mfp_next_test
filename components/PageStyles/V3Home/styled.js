import styled from '@emotion/styled';
import { media } from '../../../styles/mediaQueries';

const OutterPage = styled.div`
  isolation: isolate;
  background-color: #2C2A30;
  height: fit-content;
  overflow-x: hidden;
  .know-container {
    h3 {
      color: white !important;
    }
  }
  .second {
    a, span {
      /* color: ${props => props.theme.v3LightGray} */
      color: white;
    }
  }
  .bg-black, .partner-footer {
    background-color: #121212;
  }
  .bg-black {
    ${media.mobileScreen} {
      padding-bottom: 20px;
    }
  }
  .partner-footer {
    display: block;
    .foot-link {
      color: #EF1461;
    }
    .input-root {
      border: 1px solid ${props => props.theme.v3LightGray};
      color: ${props => props.theme.v3LightGray};
      background-color: ${props => props.theme.customBlack};
      border-radius: 20px;
    }
    .search-icon {
      display: inline-block;
      font-size: 28px;
      width: 28px;
      cursor: pointer;
      height: 28px;
      color: ${props => props.theme.v3LightGray};
      margin-right: 30px !important;
      height: 100%;
      ${media.mobileScreen} {
        margin-right: 10px !important;
      }
      ${media.smallScreen} {
        width: 12px;
      }

    }
    #search-term {
    font-family: Poppins-Medium;
    font-size: 16px;
    line-height: 38px;
    color: ${props => props.theme.brownGrey};
    ${media.mobileScreen} {
      padding: 0;
      font-size: 14px;
    }
  }
  .search-root {
    /* max-height: 35px; */
    /* margin-top: 0; */
    border-radius: 31px;
    padding-left: 0 !important;
    /* margin-top: 17px; */
    width: 100%;
    font-family: Poppins-Medium;
    max-height: 61px;
    height: 61px;
    /* min-width: 500px; */
    border-radius: 31px;
    ${media.webView} {
      /* margin-top: -4px; */
      transform: translate(0px, 10px);
      width: 70%;
    }
    ${media.mobileScreen} {
      max-height: 35px;
      margin-top: 15px;
    }
  }


  .search-suggest-root {
    border-radius: 31px;
    color: ${props => props.theme.v3LightGray};
    background-color: ${props => props.theme.lighterGray};
  }
    .title {
      color: ${props => props.theme.v3LightGray} !important;
      font-family: Poppins-Medium;
    }
    a {
      font-family: Poppins-Medium;
    }
    .link-row-col {
      .subText {
        color: ${props => props.theme.v3LightGray} !important;
      }
    }
  }
`;

const HomeStyled = styled.div`
  /* isolation: isolate; */
  margin-top: 0;
  height: fit-content;
  p, h3, h1, h2, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }
  ${media.largeScreen} {
    max-width: 1280px;
    margin: auto;
    /* padding: 0 20px; */
  }
  ${media.mobileScreen} {
    overflow-x: hidden;
  }
  /* min-height: 100vh; */

  .manage-user-header {
    z-index: 51;
  }
  .rounded-corners {
    border-radius: 15px;
  }
  /* margin-top: 110px; */
  .arrow-active {
    .arrow-icon {
      color: ${props => props.theme.flatBlue};
    }
  }

  .foot-link {
    color: ${props => props.theme.flatBlue};
  }
  @media (min-width: 832px) {
    /* margin-top: 130px; */
    .role-btn {
      display: none;
    }
    .list-head {
      color: ${props => props.theme.orangePink};
      font: 24px/34px Poppins-Medium;
    }
  }
  @media (min-width: 1280px) {
    margin-top: 74px;
  }
  .list-root {
    margin-top: 10px;
    ${media.mobileScreen} {
      margin-top: 0;
    }
  }
  .partner-footer {
    padding: 10px 40px 20px;
    display: flex;

    ${media.mobileScreen} {
      flex-direction: column;
    }

    .search-root {
      width: 443px;
      height: 32px;
      padding-left: 135px;
      display: block;

      svg {
        font-size: 21px;
      }
      #search-term {
        font-size: 16px;
        font-family: Poppins-Light;
        line-height: 38px;
      }
      #search-term::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #999;
      }
      #search-term::-moz-placeholder {
        /* Firefox 19+ */
        color: #999;
      }
      #search-term:-ms-input-placeholder {
        /* IE 10+ */
        color: #999;
      }
      #search-term:-moz-placeholder {
        /* Firefox 18- */
        color: #999;
      }
    }
    .link-wrapper .title {
      font-size: 14px;
      line-height: 15px;
    }

    .social-icon-footer {
      font-size: 38px;
    }
    .link-sec {
      padding-left: 135px;
    }
    .foot-link {
      font-size: 14px;
      line-height: 18px;
    }
    .two-col {
      margin-right: 30px;
    }
    .link-row-col {
      margin-right: 50px;
    }
    ${media.mobileScreen} {
      padding: 20px 15px 20px;

      .link-wrapper {
        flex-direction: column;
      }
      .search-root {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .link-col {
        margin-bottom: 0;
      }
      .search-root,
      .link-sec {
        padding-left: 0;
        width: 100%;

        .link-row-col:last-child,
        .two-col {
          margin-right: 0;
        }

        .link-row-col:last-child {
          margin-bottom: 0;
        }
      }
      .icon-wrapper {
        align-items: flex-start;

        & > span {
          width: auto;
        }

        a:first-child .social-icon-footer {
          margin-left: 0;
        }
      }
    }
  }
`;

const Divider = styled.hr`
    margin-top: 3rem;
    border: 1px solid #333333;
    width: 100%;
    ${media.mobileScreen} {
      margin-top: 1rem;
    }
`;

const TopStarsCarousel = styled.div`
  margin-top: 5px;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  .list-root {
    /* position: relative; */
    section {
      width: 100% !important;
      padding: 0 !important;
    }
  }
  .custom-arrow {
    /* position: relative; */
    width: 0px !important;
    padding-bottom: 39px;
    .arrow-active {
      color: #cbcbcb !important;
      transition: all 0.3s ease-in;
      &:hover {
      color: white;
      }
    }
    .left {
      font-size: 58px;
      /* transform: translate(-41px, 0); */
      padding-bottom: 52px;
      position: absolute;
      left: 61px;
      z-index: 40;
      ${media.mobileScreen} {
        transform: translate(-19px,0px);
      }
    }
    .right {
      font-size: 58px;

      position: absolute;
      right: 61px;
      padding-bottom: 52px;

      ${media.mobileScreen} {
        transform: translate(-20px,0px);
      }
      z-index: 40;
    }
    svg {
      background: #ffc0c0;
      width: 39px;
      height: 39px;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
      vertical-align: middle;
      background-color: #707070;
      border-radius: 50%;
      color: #cbcbcb !important;
      transition: all 0.3s ease-in;
      padding: 7px;
      &:hover {
        color: white !important;
      }

    }
  }
  .scroll-container {
    width: 100%;
    justify-content: space-between;
    ${media.mobileScreen} {
      display: flex;
    }
    ::last-child {
      margin-right: 0px !important;
    }
    &:last-child {
      margin-right: 0px !important;
    }
  }
  .scroll-container:last-child {
      margin-right: 0px !important;
    }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -ms-overflow-style: none;
  .top-stars-bottom {
    margin-top: 10px;
    ${media.mobileScreen} {
      margin-top: 5px;
    }
  }
  .top-stars-slide {
    width: 270px;
    height: 270px;
    height: fit-content;
    margin-right: 12px;
  }
  .top-stars-img {
    position: relative;
    width: 270px;
    height: 70%;
    border-radius: 10%;
  }
  .img {
    width: 270px;
    /* height: 100%; */
    border-radius: 10%;
    object-fit: cover;
  }
  .top-stars-slide {
    width: 180px;

    ${media.modalView} {
      width: 150px;
    }
    ${media.mobileScreen} {
      width: 120px;
    }
  }
  .small-img {
    display: none !important;
    ${media.mobileScreen} {
      display: block !important;
    }
  }
  .medium-img {
    display: none !important;
    ${media.modalView} {
      display: block !important;
    }
  }
  .big-img {
    display: none !important;
    ${media.largeScreen} {
      display: block !important;
    }
  }
  .top-stars-img, .img {
    width: 180px;
    height: 180px;

    ${media.modalView} {
      width: 150px;
      height: 150px;
    }
    ${media.mobileScreen} {
      width: 120px;
      height: 120px;
    }
  }

  .top-stars-subtitle {
    color: white;
    font: 13px/15px Poppins-Light;
    white-space: break-spaces;
    letter-spacing: 1px;
    font-weight: 100;
    margin: 2px 0 10px;
    ${media.modalView} {
      font-size: 13px;
      line-height: 15px;
      margin: 2px 0 10px;
    }
    ${media.mobileScreen} {
      margin-top: -5px;
      font-size: 10px;
      margin: 1px 0 9px;
      line-height: 10px;
    }
  }
  .top-stars-price {
    color: white;
    font: 11px/15px Poppins-Light;
    white-space: break-spaces;
    letter-spacing: 1px;
    font-weight: 100;
    ${media.modalView} {
      font-size: 11px;
      line-height: 15px;
    }
    ${media.mobileScreen} {
      font-size: 10px;
      line-height: 10px;
    }
  }
  .top-stars-title {
    color: white;
    font: 16px/18px Poppins-Medium;
    letter-spacing: 1px;
    font-weight: 400;
    white-space: nowrap;
    max-width: 160px;
    overflow: hidden !important;
    text-overflow: ellipsis;
    ${media.modalView} {
      font-size: 16px;
      line-height: 18px;
    }
    ${media.mobileScreen} {
      line-height: 16px;
      margin: 0;
      font-size: 13px;
    }
  }
`;
const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  .link {
    color: white;
    font: 1rem/40px Poppins-Medium;
  }
  h3 {
    font: 22px/18px Poppins-Medium;
    color: white;
    margin-top: 3rem;
    margin-bottom: 2rem;
    letter-spacing: 1px;
    font-weight: 500;
    ${media.modalView} {
      font-size: 19px;
      line-height: 18px;
    }
    ${media.mobileScreen} {
      font-size: 1.5rem;
      margin: 1.7rem 0 0.8rem;
    }
  }
`;

const BodyContainer = styled.div`
  /* min-height: 100vh; */
  position: relative;
  padding: ${props => props?.hasPromocode ? '7' : '2'}rem 6rem;
  background-color: #2C2A30;
  ${media.modalView} {
    padding: ${props => props?.hasPromocode ? '10' : '2'}rem 2rem;
  }

  @media only screen and (max-width: 1000px) {
  padding: ${props => props?.hasPromocode ? '10' : '2'}rem 1.5rem;
}

  `;

export const DiscountContainer = styled.div`
  margin-top: ${props => props?.height || '78'}px;
`;


export {
	HomeStyled as default,
	BodyContainer,
	TopStarsCarousel,
	SectionTitle,
	OutterPage,
	Divider
};
