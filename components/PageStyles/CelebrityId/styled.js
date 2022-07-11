import { Global, css, keyframes } from '@emotion/react';
import { media } from '../../../styles/mediaQueries';
import styled from '@emotion/styled';
import { largeHeading, smallHead } from '../../../styles/TextStyled';
import Head from 'next/head';
import { isVodacom } from 'customHooks/domUtils';

const headerCatAnim = keyframes`
  from {
    max-height: 120px;
  }
  to {
    max-height: 0;
    overflow: hidden;
  }
`;

/* eslint-disable */
export const StarGlobal = props => <>
{
  props.config && props.config?.font && (

  <Head>
    <link
      rel="preload"
      href={props.config.font_url}
      as="font"
      crossOrigin=""
    />
  </Head>
    )
  }
<Global
  styles={css`
  ${props.config && props.config?.font ? `

    @font-face {
      font-family: ${props.config.font};
      font-display: swap;
      src: url(${props.config.font_url})
      format('opentype');
    }
    ` : ''}
`
  }
  /> </>


const StarProfileStyled = styled.div`
  display: flex;
  align-items: ${props => (props.centerAlign ? 'center' : 'flex-start')};
  @media (min-width: 832px) {
    height: auto;
    .footer-root {
      border-top: 1px solid ${props => props.theme.white};
      ${props =>
        props.minimalView &&
        `
        padding: 30px 10px;
      `};
    }
  }
  .star-footer {
    max-width: 1019px;
    margin: 0 auto;
  }
  .follow-btn-wrp {
    padding-bottom: 20px;
    .follow-btn {
      min-height: 30px;
      padding: 0 10px;
    }
  }
  .tab-list {
    padding-top: 7px;
    border-top: solid 1px ${props => props.theme.veryLightPink};
    border-bottom: solid 1px ${props => props.theme.veryLightPink};
    display: flex;
    max-width: 1019px;
    margin: 0 auto;
    background: ${props => props.theme.pureWhite};
    margin-bottom: 0;
    pointer-events: auto;
    align-items: flex-end;
    .tab-item {
      padding-bottom: 5px;
      flex: 1;
      font-size: 16px;
      font-family: Gilroy-Regular;
      &.tab-highlight {
        font-family: Gilroy-Bold;
        color: ${props =>
          props.theme.links ? props.theme.links : props.theme.flatBlue};
        border-bottom: none;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-bottom: 3px solid
            ${props =>
              props.theme.links ? props.theme.links : props.theme.flatBlue};
        }
      }
    }
  }
  ${media.largeScreen} {
    .star-footer {
      max-width: 1019px;
    }
    .tab-list {
      max-width: 1019px;
    }
  }
  #how-it-works {
    padding-top: 20px;
  }
  .how-it-works {
    font-family: ${props =>
      props.theme.font ? props.theme.font : 'Gilroy-Bold'};
    color: ${props => props.theme.flatBlue};
  }
  .infohead-mob {
    font-family: ${props =>
      props.theme.font ? props.theme.font : 'Gilroy-Bold'};
    color: ${props =>
      props.theme.accent ? props.theme.accent : props.theme.orangePink};
  }
  .prof-loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  @media (min-width: 1280px) {
    .manage-user-header {
      z-index: 99;
    }
    .star-footer {
      padding-left: 0;
      padding-right: 0;
      .footer-left-section {
        justify-content: flex-start;
      }
    }
    ${props => {
      const headerHeight = props.headerHeight ? props.headerHeight : 126;
      const navHeight =
        props.headNavRef.current && props.headNavRef.current.clientHeight
          ? props.headNavRef.current.clientHeight
          : 0;
      const finalOffset = props.showSticky
        ? headerHeight - navHeight
        : headerHeight;
      return `
          margin-top: ${finalOffset}px;
          min-height: calc(100vh - ${finalOffset}px);
        `;
    }}
  }
`;

StarProfileStyled.Container = styled.div`
  ${props => (props.loaded ? 'visibility: visible' : 'visibility: hidden')};
  margin: 0 auto;
  width: 100%;
  ${media.largeScreen} {
    /* padding-top: 75px; */
  }
  .partner-footer {
    display: block;
    background-color: #121212;
    padding-top: 20px;
    margin-top: 20px;
    .foot-link {
      color: ${props => props.theme.superSportRed}
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
    .foot-link {
      color: ${props => props.theme.superSportRed}
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
  .mob-crop-btns {
    position: absolute;
    top: calc(100vw / 3.8 + 18px);
    z-index: 20;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px 10px;
    @media (min-width: 832px) {
      display: none;
    }
    button {
      min-width: 110px;
      height: 34px;
      min-height: 34px;
    }
  }

  .manage-user-header {
    ${props => props.fanView && `z-index: 99`};
  }
`;

/* new ones */

StarProfileStyled.SectionWrapper = css`
  margin-bottom: 35px;
`;

StarProfileStyled.HorzSpacing = css`
  padding: 0 10px;
`;

StarProfileStyled.MainHeading = styled.h3`
  font-size: 24px;
  color: ${props => props.theme.orangePink};
`;

StarProfileStyled.ContentLimiter = css`
  ${media.largeScreen} {
    max-width: 1019px;
  }
  max-width: 1019px;
  margin: 0px auto;
`;

StarProfileStyled.Wrapper = styled.section`

  ${props => !props.fullWidth && StarProfileStyled.ContentLimiter};
  ${props => props.withPadding && StarProfileStyled.HorzSpacing};
  padding-bottom: 35px;
  @media (max-width: 831px) {
    &.product-wrap {
      margin-bottom: 0;
    }
  }
`;

StarProfileStyled.FundRaiser = styled.div`
  margin-top: 20px;
  font-family: ${props =>
    props.theme.font ? props.theme.font : 'Gilroy-Medium'};
  .charity-text {
    margin-bottom: 5px;
    text-align: left;
    display: block;
    font-size: 18px;
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyAlternate};
  }
  .fund-wrap {
    display: flex;
    align-items: center;
    font-size: 12px;
    flex-wrap: wrap;
    color: ${props => props.theme.lightGrey};
    .goal-text {
      font-size: 16px;
      font-family: Gilroy-Bold;
    }
    .fund-raiser {
      flex: 1;
      width: auto;
      margin-right: 10px;
      background: transparent;
      max-width: 600px;
      padding: 2px;
      border: 1px solid ${props => props.theme.greyishBrown};
      .progress {
        background: ${props => props.theme.greyAlternate};
      }
    }
  }
`;

StarProfileStyled.ErrorWrapper = styled.span``;

export const Name = styled.h1`
  margin-top: 10px;
  max-width: 100%;
  font-family: ${props =>
    props.theme.font ? props.theme.font : 'Gilroy-Bold'};
  text-align: center;
  display: block;
  line-height: 60px;
  color: ${props =>
    props.theme.accent ? props.theme.accent : props.theme.orangePink};
  @media (min-width: 1280px) {
    text-align: left;
    margin-bottom: 5px;
    line-height: 68px;
  }
`;

export const Headline = styled.h2`
  font-size: 24px;
  font-family: Gilroy-RegularItalic;
  text-align: center;
  ${StarProfileStyled.HorzSpacing};
  color: ${props => props.theme.normalGrey};
  line-height: 33px;
  display: block;
  @media (min-width: 1280px) {
    max-width: 846px;
    margin: 0 auto;
  }
`;

export const TabWrapper = styled.section`
  max-width: 1019px;
  margin: 0 auto;
  background-color: ${props => props.theme.pureWhite};
  ${props => (props.loaded ? 'height:auto' : 'height:500px')}
  .navigationHeader {
    ${smallHead};
    background: ${props => props.theme.white};
    padding: 12px 8px;
    padding-bottom: 0px;
  }
  @media (min-width: 1280px) {
    max-width: 1019px;
    .tab-list {
      justify-content: center;
      padding-top: 5px;
      .tab-item {
        flex: initial;
        width: 225px;
      }
    }
  }
`;

export const CtaButton = styled.a`
  text-transform: uppercase;
  font-family: Gilroy-Bold;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.pureWhite};
  ${props =>
    props.disabled &&
    `
    opacity: 0.7;
    pointer-events: none;
  `};
`;

export const BannerWrap = styled.section`
  margin-bottom: 10px;
  max-width: 1019px;
  ${media.largeScreen} {
    max-width: 1019px;
  }
  margin: 0 auto;
`;

export const Container = styled.div``;

export const SmallHeading = styled.h5`
  font-size: 13px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.greyishBrown};
  line-height: 19px;
`;

export const MainHeading = styled.h2`
  ${largeHeading};
  font-family: Gilroy-Medium;
  letter-spacing: 1px;
  text-transform: uppercase;
  ${StarProfileStyled.ContentLimiter};
  margin-bottom: 10px;
  color: ${props =>
    props.theme.accent ? props.theme.accent : props.theme.orangePink};
  @media (min-width: 832px) {
    text-align: center;
    padding: 0 10px;
  }
`;

export const More = styled.span`
  color: ${props =>
    props.theme.links ? props.theme.links : props.theme.flatBlue};
  margin-left: 5px;
  cursor: pointer;
  text-transform: lowercase;
`;

export const TabContentWrap = styled.section`
  /* transition: all 0.7s; */
  background-color: ${props => props.theme.pureWhite};
  ${props => {
    if (props.showSticky) {
      let mobOffset = props.collapsed && !props.checkoutMode ? 87 : 90;
      mobOffset = props.checkoutMode ? 71 : mobOffset;
      let deskOffset = props.collapsed && !props.checkoutMode ? 133 : 188;
      deskOffset = props.checkoutMode ? 100 : deskOffset;
      return `
        padding-top: ${props.expHeight + mobOffset}px;
        @media(min-width: 1280px) {
          padding-top: ${props.expHeight + deskOffset}px;
        }
      `;
    }
  }};
`;

export const ExpWrapper = styled.section`
  width: 100%;
  pointer-events: auto;
  ${props =>
    props.showSticky &&
    `
    ${media.largeScreen} {
    max-width: 1019px;
    }
    max-width: 1019px;
    margin: 0 auto;
    // box-shadow: 0px 1px 10px 0 rgb(255 255 255);
    z-index: 14;
    background: ${props.theme.pureWhite};
  `}
`;

export const StickyWrapper = styled.section`
  .manage-user-header {
    pointer-events: auto;
    .header-cat-wrap {
      max-height: 120px;
    }
  }
  ${props =>
    props.showSticky &&
    css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    z-index: 17;
    pointer-events: none;
    .star-header {
      position: static;
      background-color: ${props.theme.customBlack};
      padding: 10px 10px;
      z-index: 3;
    }
    .manage-user-header {
      position: static;

    }
    .manage-header, .manage-user-header {
      position: static;
      box-shadow: none;
    }
  `}
  .sticky-star-details {
    box-shadow: -10px 4px 10px 0 rgb(255 255 255);
    z-index: 14;
    height: 100px;
    display: flex;
    pointer-events: auto;
    align-items: center;
    background-color: ${props => props.theme.pureWhite};
    justify-content: space-between;
    max-width: 1019px;
    ${media.largeScreen} {
      max-width: 1019px;
    }
    margin: 0 auto;
    ${props =>
      props.checkoutMode &&
      `
      border-bottom: 1px solid ${props.theme.veryLightPink};
    `};
    .star-det {
      display: flex;
      align-items: center;
      .star-pic {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
      }
      .star-name {
        font-size: 41px;
        color: ${props => props.theme.greyAlternate};
        font-family: ${props =>
          props.theme.font ? props.theme.font : 'Gilroy-Bold'};
      }
    }
  }
  #tabs-render {
    background: ${props => props.theme.pureWhite};
  }
  #exp-render {
    background: ${props => props.theme.pureWhite};
  }
`;

export default StarProfileStyled;
