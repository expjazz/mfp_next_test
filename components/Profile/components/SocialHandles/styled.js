import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  padding-top: 0;
  ${media.webView} {
    padding-top: 0;
    height: auto;
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .back-header {
    top: 80px;
    ${media.mobileScreen} {
      top: inherit;
    }
    ${media.modalView} {
      padding: 0;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    ${media.largeScreen} {
      display: none;
    }
    .back-lbl-wrp {
      ${media.modalView} {
        display: flex;
      }
    }
  }
  .input-base {
    input {
      text-align: left;
      padding: 2px 0 5px;
    }
  }
  .title {
    ${media.modalView} {
      padding-top: 15px;
    }
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
`;

export const Heading = styled.div`
  text-align: center;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  font-family: Gilroy-Medium;
  font-weight: normal;
  padding-top: 0;
  margin-bottom: 10px;
  @media (max-width: 831px) {
    padding-top: 17px;
    max-width: 230px;
    margin: 0 auto 20px;
    line-height: 28px;
  }
`;

export const Content = styled.section`
  width: 100%;
  height: auto !important;
  display: flex;
  flex-direction: column;
  padding: 0 15px 20px;
  ${media.webView} {
    padding: 0 25px 20px;
  }
  ${media.largeScreen} {
    padding: 0 50px 20px;
  }
  .description {
    ${media.mobileScreen} {
      padding-bottom: 10px;
    }
  }
  .socialmedia-icon {
    width: 14.7px;
    height: 16px;
    color: ${props => props.theme.flatBlue};
  }
  .gigsalad-icon {
    width: 15.7px;
    height: 22px;
    svg {
      height: 24px;
      width: 19px;
    }
  }
  .gig-sald {
    display: flex;
    .shp0 {
      fill: ${props => props.theme.flatBlue};
    }
  }
`;

Content.MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
`;
Content.InputWraper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 5px;
  &:first-child {
    padding-top: 0;
  }
  .MuiFormControl {
    .input-root {
      &:before,
      &:after {
        display: none;
      }
    }
    .input-field {
      padding-left: 0;
    }
    .adornment-root {
      padding-top: 12px;
      margin-right: 3px;
      z-index: 10;
    }
  }
  @media (max-width: 831px) {
    width: 100%;
  }
`;
Content.InputLabel = styled.div`
  font-size: 22px;
  line-height: 25px;
  margin-top: 4px;
  margin-left: 3px;
  color: ${props => props.theme.twilight};
`;
