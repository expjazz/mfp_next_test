import styled from '@emotion/styled';
import { media } from '../../../../../styles/mediaQueries';
// import { media } from '../../../../../styles/mediaQueries';

export const ItemContainer = styled.a`
  z-index: 5;
  .gradient {
    /* background: url(/images/homepage-v3/squared-pink.png); */
    z-index: 2;
    /* position: absolute;
    width: 100%;
    height: 100%; */
  }
  /* background-size: cover;
  background-position: center; */
  width: var(--width);
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  transition: width 0.3s;
  margin-bottom: 10px;
  .more {
    font-size: 3rem;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${media.mobileScreen} {
      font-size: 1.7rem;
    }
    svg {
      color: white;
    }
  }
  ${media.webView} {
    height: 100px;
    &:hover {
      /* width: 220px; */
      height: 220px;
      /* margin: 0 10px; */
      transform: translate(0px, -80px);
      margin-bottom: -67px;
    }
  }
  ${media.mobileScreen} {
    width: var(--width);
    height: 52px;
    margin-bottom: 2rem;
  }
  .title {
    color: white;
    font: 19px/26px Poppins-Medium;
    font-weight: 600;
    /* white-space: nowrap; */
    ${media.mobileScreen} {
      font-size: 9px;
    }
    @media (max-width: 376px) {
      font-size: 9px;
    }
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
  }

  .subtitle {
    color: white;
    font: 14px Poppins-Medium;
    /* margin-top: 10px; */
    font-weight: 100;
    ${media.mobileScreen} {
      font-size: 10px;
    }
    line-height: 1.5;
  }

  .container {
    z-index: 3;
    padding: 0 2.3rem;gi
    text-align: center;
  }
`;

export const ExperiencesContainer = styled.div`
  .scroll-container {
    display: block;
    min-height: inherit;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  /* height: 200px; */
  margin-bottom: 12px;
  ${media.mobileScreen} {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    justify-content: space-around;
    grid-gap: 0;
  }
`;
