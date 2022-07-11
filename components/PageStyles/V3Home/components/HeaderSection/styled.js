import styled from '@emotion/styled';
import { media } from '../../../../../styles/mediaQueries';

export const CustomStrong = styled.strong`
  color: ${props => props.color};
  font-weight: 300;
`;

export const HeadWrap = styled.section`
  padding-top: 0;
  padding-bottom: 2rem;
  ${media.modalView} {
    padding-top: 0;
  }
  ${media.mobileScreen} {
    padding: 0 0 2rem 0;
  }
  .midle {
    text-align: center;
  }
  p {
      color: #8D8D8E;
      font: 20px/65px Poppins-Light;
      ${media.modalView} {
        line-height: 35px;
        font-size: 19px;
      }
      line-height: 65px;
      padding: 0;
      font-weight: 300;
      ${media.mobileScreen} {
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 0;
        padding: 0 1rem;
        margin-top: 10px;
      }
    }

  h1 {
    color: white;
    font: 38px/37px Poppins-Medium;
    font-weight: 300;


    ${media.modalView} {
      font-size: 30px;
    }
    ${media.mobileScreen} {
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 10px;
    }

  }
.banner-section {
  display: flex;
  padding: 0;
  flex-direction: column;

  ${media.largeScreen} {
    padding: 50px 0 80px;
    flex-direction: row;
  }



  .left-col {
    flex: 0 0 100%;
    margin-bottom: 50px;
    padding-top: 0;

    ${media.mobileScreen} {
      margin-bottom: 20px;
    }

    ${media.largeScreen} {
      flex: 0 0 calc(50% - 85px);
      margin-right: 45px;
      margin-bottom: 0;
      padding-top: 40px;
    }

    button {
      min-width: 365px;
      font: 22px/31px Gilroy-Semibold;
      padding: 7px 15px;
    }
  }


  .hide-desk {
    display: block;
    margin: 15px 0 0 195px;
    max-width: 142px;
    min-width: 142px;

    ${media.largeScreen} {
      display: none;
    }
    @media(min-width: 832px) and (max-width: 1279px) {
      margin-left: 57%;
    }
  }
  .show-desk {
    display: none;

    ${media.largeScreen} {
      display: block;
    }
  }

  .right-col {
    flex: 0 0 100%;
    min-height: 588px;

    ${media.modalView} {
      min-width: 600px;
      max-width: 600px;
      margin: 0 auto 50px;
    }

    ${media.largeScreen} {
      flex: 1 1 50%;
      min-width: 654px;
    }

    ${media.mobileScreen} {
      min-height: 379px;
      width: 348px;
      margin: 0 auto;
      max-width: 100%;
    }

    .mobile-section {
      ${props => `
        background: ${props.theme.flatBlue};
        background: -webkit-linear-gradient(top left, ${props.theme.flatBlue}, ${props.theme.orangePink});
        background: -moz-linear-gradient(top left, ${props.theme.flatBlue}, ${props.theme.orangePink});
        background: linear-gradient(to bottom right, ${props.theme.flatBlue}, ${props.theme.orangePink});
      `}
      min-height: 475px;
      border-radius: 30px;
      padding-left: 57%;
      padding-right: 55px;
      display: flex;
      align-items: center;
      position: relative;

      p {
        font: 20px/32px Gilroy-Bold;
        color: #fff;
        text-align: center;

        ${media.mobileScreen} {
          font-size: 16px;
          line-height: 25px;
          text-align: left;
        }
        @media(min-width: 832px) and (max-width: 1279px) {
          text-align: left;
        }
      }

      ${media.mobileScreen} {
        padding: 25px 15px 25px 205px;
        min-height: 229px;
        border-radius: 20px;
      }
    }
    .mobile-frame {
      position: absolute;
      left: 55px;
      top: 53px;
      width: 270px;
      height: 535px;

      ${media.mobileScreen} {
        left: 15px;
        top: 25px;
        height: 336px;
        width: 169px;
        min-height: 270px;
        display: block;
        min-width: 169px;
        margin-bottom: -150px;
        margin-right: 15px;
      }

      .mobile-frame-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 5px;
      }

      .mobile-frame-blk {
        position: absolute;
        background: url(/images/frame.svg) no-repeat;
        background-size: 100% 100%;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
    }
    .video-wrapper {
      width: calc(100% - 20px);
      height: calc(100% - 3px);
      display: block;
      margin: 0 10px 10px;
      padding-top: 6px;
      position: relative;
      z-index: 5;
      border-radius: 23px;
      background: #333;
      ${media.mobileScreen} {
        padding-top: 2px;
        width: calc(100% - 13px);
        height: calc(100% - 2px);
        margin: 0 6px 5px;
        padding-bottom: 0;
      }
      video {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: 2px 2px 23px 23px;
        background: #ccc;
        &:focus {
          outline: none;
        }
      }
    }
  }
}

`;
