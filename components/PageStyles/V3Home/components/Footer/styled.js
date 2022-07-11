import styled from '@emotion/styled'
import { media } from '../../../../../styles/mediaQueries'
// import { media } from '../../../../styles/mediaQueries'

export const FooterContainer = styled.section`
  display: flex;
  ${media.largeScreen} {
    max-width: 1280px;
    margin: auto;
    /* padding: 0 20px; */
  }
  padding: 6rem 3rem 0;
  ${media.mobileScreen} {
    flex-direction: column;
    padding: 2rem 1rem;
  }
  background-color: #121212;
  svg {
    color: white;
    fill: white;
  }
  h3 {
    color: white;
    font: 22px/23px Poppins-Medium;
    ${media.modalView} {
      font-size: 19px;
    }
    ${media.mobileScreen} {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
    line-height: 1;
  }
  .list {
    width: 50%;
    li {
      padding: 0;
      cursor: pointer;
      span {
        font: 14px/20px Poppins-Medium;
      }
    }
    ${media.mobileScreen} {
      width: 100%;
      li {
        padding: 0;
      }
    }
    ${media.modalView} {
      width: 100%;
      li {
        padding: 0;
      }
    }
  }
  .child {
    width: 50%;
    ${media.mobileScreen} {
      width: 100%;
  }
  }
  span {
    color: white;
    font: 13px/26px Poppins-Medium;
    ${media.mobileScreen} {
    font-size: 1rem;
  }
  }
  .accordion-content {
    font: 13px/26px Poppins-Light;
    ${media.mobileScreen} {
    font-size: 1rem;
  }
    font-weight: 100;
  }
  .small{
    span {
      margin-top: 10px;
      font-size: 13px !important;
      font-weight: 100;
      font-family: Poppins-Light;
    }
  }

`

export const OutterContainer = styled.div`
    background-color: #121212;
`
export const Divider = styled.hr`
border: 1px solid #333333;
margin-top: 20px;
margin-bottom: 20px;
width: 100%;
`
