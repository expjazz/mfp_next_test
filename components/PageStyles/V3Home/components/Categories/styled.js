import { css} from '@emotion/react'
import styled from '@emotion/styled'
import { media } from '../../../../../styles/mediaQueries';
// import { media } from '../../../../styles/mediaQueries';


export const CategoriesContainter = styled.section`
  h3 {
    color: white !important;
    font: 48px/57px Gilroy-Extrabold;
  }

  .categories {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-flow: column;
    .more-container {
      color: #cbcbcb;
      &:hover {
        color: white;
      }
    p {
      margin-top: -25px;
      color: white;
      text-align: center;
      text-transform: uppercase;
      font: 1rem/26px Poppins-Medium;
      ${media.mobileScreen} {
        font-size: 14px;
      }
    }
  }
    ${media.mobileScreen} {
      display: flex;
      flex-wrap: wrap;
      width: 360px;
      margin: auto;
    }
    ${media.smallScreen} {
      width: 270px;

    }
    ${media.modalView} {
      display: flex;
      flex-wrap: wrap;
      }
    }
  }
`

export const CategoriesItem = styled.a`
  border-radius: 50%;
  /* background: ${props => props.bgImg ? `url(/images/homepage-v3/pink.png), url(${props.bgImg})` : 'url(/images/homepage-v3/pink.png)'}; */
  display: flex;
  background-position: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  height: 140px;
  width: 140px;
  background-size: contain;
  color: #cbcbcb;
  position: relative;
  &:hover {
    color: white;
  }
  .img {
    border-radius: 50%;
  }
  .gradient {
    z-index: 2;
  }
  .more {
    font-size: 3rem;
    width: 100%;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.2s ease-in;
    svg {
      color: #cbcbcb;
    }
    &:hover {
      color: white;
      svg {
        color: white;
      }
    }
  }
  ${media.tabletMobile} {
    margin-bottom: 2rem;
    width: 100px;
      height: 100px;
      font-size: 1rem
    }
    ${media.smallScreen} {
      height: 80px;
      width: 80px;
    }

    p {
      z-index: 3;
      text-align: center;
      text-transform: uppercase;
      font: 1rem/26px Poppins-Medium;
      line-height: 16px;
      ${media.tabletMobile} {
      font-size: 0.7rem
    }
    ${media.mobileScreen} {
      font-size: 11px;
    }
    transition: all 0.3s ease-in;
    margin: auto;
  }

`
