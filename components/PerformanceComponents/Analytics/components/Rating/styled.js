import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Container, Wrapper } from '../../../styled';

export const Layout = styled(Container)`
  ${media.modalView} {
    height: calc(100% - 55px);
    padding: 70px 50px 35px;
  }
  ${media.largeScreen} {
    padding: 50px 50px 35px;
  }
`;

export const Wrap = styled(Wrapper)`
  width: 100%;
  .heading {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
      margin-bottom: -10px;
    }
  }
  .drop-down {
    padding-top: 10px;
  }
  .view-btn {
    min-width: 80px;
    min-height: 30px;
    height: 30px;
  }
  .date {
    font-family: Gilroy-Bold;
  }
  .rea-rec {
    display: flex;
    flex-direction: column;
    padding-right: 3px;
  }
  .time {
    font-family: Gilroy-Medium;
    font-size: 10px;
    color: ${props => props.theme.lightGrey};
  }
  .title {
    font-family: Gilroy-Semibold;
    font-size: 14px;
    color: ${props => props.theme.lightGrey};
  }
  #rating-scroll {
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    .content {
      ${media.mobileScreen} {
        background: #fff;
        border-radius: 0 5px 5px 5px;
      }
    }
  }
`;
