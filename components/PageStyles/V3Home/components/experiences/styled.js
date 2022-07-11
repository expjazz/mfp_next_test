import styled from '@emotion/styled'
import { media } from '../../../../../styles/mediaQueries';

export const ItemContainer = styled.a`
  position: relative;
  height: 340px !important;
  margin-right: 10px;
  border-radius: 15px;
  ${media.modalView} {
    width:  var(--width);
  }
  width: var(--width);
  ${media.mobileScreen} {
    width: 150px;
    height: 270px !important;
  }

  .width {
    position: relative;
    width:  var(--width);
    height: 340px;
  ${media.mobileScreen} {
    width: 150px;
    height: 270px !important;
  }

  ${media.modalView} {
    width:  var(--width);
  }

  }

  .gradient{
    width:  var(--width);
    height: 340px !important;
    border-radius: 15px;
    z-index: 2;
    background: linear-gradient( to top, rgb(7 7 7),rgb(149 144 145 / 0%) );
    position: absolute;
    ${media.modalView} {
      width:  var(--width);
    }
    ${media.mobileScreen} {
      width: 150px;
      height: 270px !important;
    }
  }
  .bg {
    /* position: absolute */
    border-radius: 15px;
  }
  .content {
    top: 0;
    z-index: 3;
    background-size: cover;
    background-position: center;
    width: var(--width);
    height: 340px !important;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    ${media.modalView} {
      width:  var(--width);
    }
    ${media.mobileScreen} {
      width: 150px;
      height: 270px !important;
    }
    .title {
      color: white;
      font: 19px/18px Poppins-Medium;
      font-weight: 600;
      text-align: center;
      ${media.mobileScreen} {
        font-size: 18px;
      }
      line-height: 1;
      text-transform: uppercase;
    }
    .description {
      color: white;
      font: 13px/18px Poppins-Light;
      font-weight: 100;
      width: 180px;
      white-space: break-spaces;
      text-align: center;
      ${media.mobileScreen} {
        font-size: 12px;
        line-height: 1;
      }
    }

    .container-top {
      height: 70%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding: 0 10px;
      ${media.modalView} {
      width: 180px;
      }
      ${media.mobileScreen} {
        width: 150px;
      }
    }

    .container-bottom {
      height: 30%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-top: 15px;
      padding: 0 10px;
      ${media.modalView} {
      width: 180px;
      }
      ${media.mobileScreen} {
        width: 150px;
      }
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: 60px;
      align-items: center;
      ${media.modalView} {
      width: 180px;
      }
      ${media.mobileScreen} {
        width: 150px;
      }
    }
  }
`

export const ExperiencesContainer = styled.ul`
  margin-top: 5px;
  width: 100%;
  white-space: nowrap;
  .arrow-icon {
    /* background: #ffc0c0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
    line-height: 100px;
    vertical-align: middle;
    padding: 30px; */
    width: 39px;
    height: 39px;
    border-radius: 50%;
    text-align: center;
    line-height: 82px;
    vertical-align: middle;
    padding: 7px;
    ${media.mobileScreen} {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      text-align: center;
      line-height: 82px;
      vertical-align: middle;
      padding: 7px;
    }

  }
  .list-root {
    section {
      ${media.mobileScreen} {
        padding: 0;
        /* padding-right: 55px; */
      }
      width: calc(100% - 0px);
      /* width: 100% !important; */
    }
  }
  .custom-arrow {
    width: 0px !important;
    .arrow-active {
      color: #cbcbcb !important;
      transition: all 0.3s ease-in;
      &:hover {
      color: white;
      }
    }
    .left {
      font-size: 58px;
      transform: translate(-13px, 0);
      z-index: 40;
      ${media.mobileScreen} {
        transform: translate(-19px,0px);
      }
    }
    .right {
      font-size: 58px;
      transform: translate(-30px,0px);
      ${media.mobileScreen} {
        transform: translate(-20px,0px);
      }
      z-index: 40;
    }
    svg {
      background-color: #707070;
      border-radius: 50%;
      color: #cbcbcb !important;
      transition: all 0.3s ease-in;
      &:hover {
        color: white !important;
      }

    }
  }
  .scroll-container {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
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
  .description {
    color: white;
    width: fit-content;
    white-space: break-spaces;
  }
  .title {
    color: white;
    width: fit-content;
    white-space: break-spaces;
  }
`
