import styled from '@emotion/styled';
import { media } from '../../styles/mediaQueries'
import { LinkStyles } from '../../styles/TextStyled'

export const FooterStyled = styled.footer`
  padding: 20px 0;
  background: #fff;
  display: none;
  @media(max-width: 831px) {
    padding: 0 15px;
  }
  @media (min-width: 832px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 30px 30px 20px;
  }
  @media only screen and (min-width: 832px) and (max-width: 1024px) {
    padding: 10px 15px;
  }
  .search-root {
    padding-left: 30px;
    width: 400px;
    height: 39px;
    margin-bottom: 15px;
    @media(min-width: 832px) {
      .suggestion-wrap {
        top: calc(100% - 359px);
      }
    }
  }
  .hidden-link {
    color: ${props => props.theme.pureWhite};
  }
  .link-search-container {
    ${props => props.isV3 ? 'display: flex;' : ''}
  }
  .link-wrapper {
    display: flex;
    ${props => props.isV3 && `
      ${media.webView} {
        flex-direction: column;
      }
    `}
    @media(max-width: 831px) {
      flex-direction: column;
    }
    .link-sec {
      text-align: left;
      padding-left: 50px;
      display: flex;
      flex-wrap: wrap;
      ${props => props.isV3 && `
      ${media.webView} {
        padding-left: 300px;
      }
    `}
      @media(max-width: 831px) {
        padding-left: 0;
      }
      @media only screen and (min-width: 832px) and (max-width: 959px) {
        padding-left: 30px;
      }
    }
    .link-col {
      display: flex;
      flex-direction: column;
      min-width: 180px;
      margin-right: 50px;
      @media(max-width: 831px) {
        padding: 10px 0;
      }
      @media only screen and (min-width: 832px) and (max-width: 959px) {
        min-width: 160px;
        margin-right: 30px;
      }
      @media (min-width: 832px) {
        margin-top: 20px;
      }
      :last-child {
        min-width: auto;
        margin-right: 0;
      }
    }
    .link-row-col {
      display: flex;
      flex-direction: column;
      margin-right: 45px;
    }
    .link-row {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    .two-col {
      display: flex;
      justify-content: space-between;
    }
    .subText {
      font-size: 14px;
      line-height: 18px;
      color: ${props => props.theme.greyishBrown};
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon {
        margin-left: 5px;
        font-size: 24px;
        transform: rotate(-20deg);
        width: 25px;
        margin-left: auto;
        margin-right: 8px;
        padding-left: 9px;
        @media (max-width: 831px) {
          margin-left: 10px;
        }
      }
      img {
        width: 35px;
        margin-left: auto;
        @media (max-width: 831px) {
          margin-left: 10px;
        }
      }
    }
    .title {
      font-family: Gilroy-Bold;
      font-size: 14px;
      line-height: 15px;
      color: ${props => props.theme.greyishBrown};
      padding-bottom: 5px;
    }
  }
  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media (min-width: 832px) {
      margin-top: 20px;
    }
  }
  .social-icon-footer {
    color: ${props => props.theme.brownGrey};
    font-size: 38px;
    margin-left: 10px;
    @media (min-width: 832px) {
      font-size: 38px;
    }
  }
`;

export const shareIcon = styled.img`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 10px;
  margin-left: 0;
  display: inline-block;
`;

export const StoreIcon = styled.img`
  cursor: pointer;
  width: 90px;
  height: 40px;
  display: inline-block;
  margin-bottom: -10px;
  &.first {
    margin-right: 10px;
  }
`;

export const StoreIconWrapper = styled.div`
  @media (min-width: 832px) {
    margin: 0;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 20px;
    margin-right: 0;
    width: 20%;
    justify-content: flex-end;
  }
`;

export const Image = styled.img`
  width: auto;
  display: block;
  max-width: 150px;
`;

export const IconWrapper = styled.span`
  display: flex;
  width: 140px;
  justify-content: flex-end;
  @media (min-width: 832px) {
    width: 190px;
  }
`;

export const Anchor = styled.a`
  ${LinkStyles};
  font-family: Gilroy-Light;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  ${props => props.isV3 ? `
    ${media.webView} {
      display: flex;
      width: 300px;
      img {
        margin: auto 0px;
      }
    }
  ` : ''}
`;
