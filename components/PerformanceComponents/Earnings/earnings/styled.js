import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { headingStyle, smallHead, LinkStyles } from 'styles/TextStyled';
import Dialog from '@material-ui/core/Dialog';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  ${media.modalView} {
    height: calc(100% - 160px);
  }
  ${media.mobileScreen} {
    position: relative;
  }
  .download-btn {
    cursor: pointer;
    position: absolute;
    top: 60px;
    right: 50px;
    ${media.largeScreen} {
      top: 26px;
    }
    ${media.mobileScreen} {
      top: -45px;
      right: 20px;
    }
    .download-icon {
      color: ${props => props.theme.flatBlue};
      font-size: 28px;
      margin-left: 16px;
    }
  }

  #earnings-scroll {
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

  .flex-start {
    background-color: ${props => props.theme.white};
    flex-wrap: wrap;
    ${media.largeScreen} {
      background-color: ${props => props.theme.pureWhite};
    }
    ${media.mobileScreen} {
      margin-top: 10px;
    }
  }
`;

export const Wrapper = styled.section`
  border-radius: 5px;
  .headLbl {
    font-size: 26px;
    font-family: Gilroy-Bold;
    line-height: 30px;
    &:before {
      font-size: 14px;
      line-height: 18px;
      color: ${props => props.theme.lightGreyTwo};
      display: flex;
      padding-bottom: 9px;
      ${media.mobileScreen} {
        padding-bottom: 3px;
      }
    }
    ${media.webView} {
      font-size: 33px;
    }
    ${media.largeScreen} {
      font-size: 36px;
    }
  }
  .earnings {
    color: ${props => props.theme.greyishBrown};
    padding: 15px;
    margin-right: 6px;
    ${media.mobileScreen} {
      border-radius: 5px;
      padding: 10px;
    }
    flex: 1;
    &:before {
      content: attr(data-val);
      font-family: Gilroy-Semibold;
    }
  }
  .payments {
    color: ${props => props.theme.orangePink};
    padding: 15px;
    background-color: ${props => props.theme.white};
    flex: 1;
    margin-left: 6px;
    .local-currency {
      color: ${props => props.theme.greyishBrown};
    }
    ${media.largeScreen} {
      background-color: ${props => props.theme.pureWhite};
    }
    ${media.mobileScreen} {
      border-radius: 5px;
      padding: 10px;
    }
    &:before {
      content: attr(data-val);
      font-family: Gilroy-Semibold;
    }
  }
  .info {
    margin: 0 auto;
    display: block;
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Medium;
    text-align: center;
    margin-bottom: 10px;
    width: 100%;
    cursor: pointer;
    margin-bottom: 10px;
  }
`;

export const List = styled.section`
  padding-top: 10px;
  padding-bottom: 40px;
  margin: 0 auto;
  min-height: 280px;
  .scroll-container {
    display: block;
    min-height: inherit;
  }
  ${media.mobileScreen} {
    padding-top: 10px;
  }
  ${media.largeScreen} {
    max-width: 100%;
  }

  .collapse-root {
    background: transparent;
    box-shadow: none;
    margin-top: 16px;
    @media (max-width: 1279px) {
      margin-top: 0;
    }
    .expanded {
      flex: 0 0 calc(100% - 38px);
      @media (max-width: 1279px) {
        margin: 5px 0;
      }
    }
    ::before {
      height: 0;
    }
    .collapse-head {
      padding: 0;
      min-height: auto;
      justify-content: flex-start;
    }
    .expanded {
      flex-grow: inherit;
    }
    .collapse-details {
      padding: 0;
    }
    .fontawesome-icons {
      padding: 0;
      top: 0;
      right: 0;
      position: relative;
      transform: none;
      svg {
        color: #999;
      }
    }
    .collapse-details {
      flex-direction: column;
    }
  }

  .empty-msg {
    text-align: center;
    padding-top: 40px;
    ${media.largeScreen} {
      padding-top: 0;
    }
  }

  .usd {
    display: block;
    padding-bottom: 10px;
    font-family: Gilroy-Bold;
    color: ${props => props.theme.greyishBrown};
    ${media.mobileScreen} {
      text-align: center;
    }
  }
`;

export const DropWrap = styled.section`
  display: flex;
  flex-direction: column;
  @media (max-width: 1279px) {
    margin-bottom: 16px;
  }
  ${media.largeScreen} {
    flex-direction: row;
    align-items: center;
    padding-bottom: 30px;
  }
  ${media.largeScreen} {
    .cus-drop {
      width: 50%;
    }
  }
  .cus-drop + .cus-drop {
    margin-top: 10px;
    ${media.largeScreen} {
      margin-left: 16px;
      margin-top: 0;
    }
  }
`;

export const Heading = styled.span`
  font-family: Gilroy-Medium;
  color: #939393;
  line-height: 30px;
  font-size: 20px;
  display: block;
  ${media.largeScreen} {
    font-size: 24px;
    padding-bottom: ${props => props.padding};
  }
  .sub-head {
    display: block;
    ${media.webView} {
      display: inline;
    }
  }
`;
export const SubHeading = styled.div`
  font-family: Gilroy-Medium;
  font-size: 14px;
  color: #939393;
  padding-bottom: 10px;
`;

SubHeading.Link = styled.a`
  color: rgb(47, 131, 157);
  cursor: pointer;
  text-decoration: none;
`;

export const ListWrapper = styled.section`
  margin-bottom: 24px;
  position: relative;
  .bold-value {
    font-family: Gilroy-Bold;
    color: #535353;
  }
  .medium-value {
    font-family: Gilroy-Medium;
    color: #535353;
  }
`;

export const PlanContent = styled.section`
  padding: 15px;
  display: flex;
  flex-direction: column;
  .heading {
    ${props => headingStyle(props)};
    font-family: Gilroy-Medium;
    color: ${props => props.theme.greyishBrown};
    text-align: left;
    margin-bottom: 10px;
  }
  .small-head {
    ${smallHead};
  }
  .link-desc {
    margin-top: 15px;
  }
  .link {
    ${LinkStyles};
  }
  .action-btn {
    max-width: 150px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .terms-modal {
    background: ${props => props.theme.white};
    ${media.webView} {
      background: ${props => props.theme.pureWhite};
    }
    .cus-text {
      font-size: 20px;
      line-height: 25px;
      margin-bottom: 20px;
    }
  }
  .btn-confirm-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
  }
  .btn-keep {
    margin-bottom: 10px;
  }
`;

export const DialogStyled = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    @media (min-width: 832px) {
      max-height: 700px;
      max-width: 600px;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      max-height: 650px;
    }
    @media (max-width: 831px) {
      max-height: none;
      margin: 0;
    }
  }
`;
