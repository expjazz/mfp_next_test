import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  height: 100%;
  ${media.modalView} {
    height: calc(100% - 130px);
  }
  padding: 0 15px 35px;
  background-color: ${props => props.theme.pureWhite};
  ${media.largeScreen} {
    background-color: ${props => props.theme.white};
    padding: 70px 15px 35px;
    max-width: 700px;
    margin-left: 20px;
  }
  ${media.webView} {
    padding: 35px 50px;
  }
  .img-star {
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin: 0;
    margin-right: 10px;
    ${media.mobileScreen} {
      width: auto;
      min-width: 44px;
    }
  }
  .img-wrp {
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    flex-direction: column;
    .cat {
      font-family: Gilroy-Medium;
      font-size: 13px;
      color: ${props => props.theme.greyishBrown};
    }
    .name {
      font-family: Gilroy-Bold;
      font-size: 17px;
      color: ${props => props.theme.flatBlue};
    }
  }
  .auto__select__wrap {
    padding-top: 10px;
    .auto__select__control--is-focused {
      border-color: ${props => props.theme.flatBlue};
      box-shadow: 0 0 0 1px ${props => props.theme.flatBlue};
    }
    .auto__select__indicator,
    .auto__select__indicator-separator {
      display: none;
    }
    .auto__select__menu {
      box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.25);
      z-index: 1445;
    }
    .auto__select__control {
      border-radius: 0;
    }
    .auto__select__control {
      padding-left: 24px;
      background-color: ${props => props.theme.white};
      ${media.largeScreen} {
        background-color: ${props => props.theme.pureWhite};
      }
      .auto__select__placeholder {
        font-family: Gilroy-Medium;
        font-size: 16px;
        color: ${props => props.theme.brownGrey};
      }
    }
  }
  #cross-talent-scroll {
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
  }
  .title {
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
`;

export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .sel-btn {
    min-width: 80px;
  }
`;

export const Search = styled.div`
  position: relative;
  .svg-inline--fa {
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 10px;
    color: ${props => props.theme.greyishBrown};
    pointer-events: none;
  }
  .auto__select__wrap .auto__select__control {
    background: #fff;
  }
`;
