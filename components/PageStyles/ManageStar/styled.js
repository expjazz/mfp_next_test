import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Dialog from '@material-ui/core/Dialog';
import { Heading } from 'styles/TextStyled';
import { media } from 'styles/mediaQueries';

const visiblity = props => css`
  display: ${props.hidden ? 'none' : 'block'};
  @media (min-width: 832px) {
    display: block;
  }
`;

const ManageStyled = styled.div`
  isolation: isolate;
  ${props => {
    let topOffset = props.headerHeight;
    if (!props.noMenu) {
      topOffset += 45;
    } else {
      topOffset += 30;
    }
    return `margin-top: ${topOffset}px;
    min-height: calc(100vh - ${topOffset}px);
    `;
  }}
  /* margin-top: 300px !important; */

  @media (max-width: 831px) {
    margin-top: ${props =>
      props.headerHeight ? props.headerHeight : 67}px;
    min-height: calc(100vh - 67px);
  }
  background: ${props => props.theme.pureWhite};
  .manage-header {
    top: 77px;
    .header-wrp {
      justify-content: flex-end;
    }
  }
  @media (min-width: 832px) {
    height: auto;
  }
  .head1 {
    padding-top: 4px;
    padding-bottom: 32px;
    @media (min-width: 1280px) {
      padding-top: 9px !important;
      padding-bottom: 0 !important;
    }
    @media (max-width: 831px) {
      padding-bottom: 17px;
      font-size: 24px;
    }
  }
  .popstyle-wrap {
    margin-top: 8px;
    @media (max-width: 831px) {
      margin-top: 0;
    }
    .popstyle-inner {
      padding-top: 35px;
      padding-bottom: 0;
      @media (max-width: 831px) {
        padding: 17px 30px 20px;
      }
      .sub-head {
        padding-bottom: 35px;
        font-size: 24px;
        font-family: Gilroy-Medium;
        font-weight: normal;
        line-height: 28px;
        @media (max-width: 831px) {
          padding-top: 0;
          padding-bottom: 20px;
        }
      }
      .row-wrap {
        padding-bottom: 14px;
      }
      .common-btn {
        margin-top: 37px;
      }

      &.password-update {
        padding-top: 35px;

        @media (max-width: 831px) {
          padding-top: 17px;
        }

        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;
          line-height: 28px;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 20px;
          }
        }
        .inputWrapper {
          margin-bottom: 40px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        .note {
          padding-top: 7px;
        }
        .common-btn {
          margin-top: 32px;
        }
      }

      &.payment {
        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 20px;
          }
        }
        .note {
          line-height: 22px;
        }
      }

      &.notification {
        .sub-head {
          padding-bottom: 35px;
          font-size: 24px;
          font-family: Gilroy-Medium;
          font-weight: normal;
          line-height: 28px;

          @media (max-width: 831px) {
            padding-top: 0;
            padding-bottom: 20px;
            font-weight: normal;
          }
        }

        .terms-container {
          @media (max-width: 831px) {
            max-width: 620px;
            margin: 0 auto;
          }
        }
        .head-text {
          margin-bottom: 16px;
        }
      }
    }
  }
  .manage-user-header {
    @media (max-width: 831px) {
      box-shadow: 0 0 20px 0 #00000029;
    }
  }
  .main-heading {
    text-align: left;
    font-size: 24px;
    padding-bottom: 10px;
  }
  .mob-store-back {
    top: 80px;
    @media (max-width: 831px) {
      position: relative;
      top: inherit;
      padding-top: 10px;
    }
  }
  .store-list {
    padding-top: 50px;

    @media (max-width: 831px) {
      padding-top: 0;
    }

    .menu-icon {
      width: 1em;
    }
  }
  .mobo-head {
    font-size: 24px;
  }

  .toast-wrp {
    .toast-bar {
      position: inherit;
      ${media.mobileScreen} {
      }
      ${media.modalView} {
        position: fixed;
        top: 0;
        min-width: 340px;
        left: auto;
      }
      ${media.largeScreen} {
        margin-top: -45px;
        margin-bottom: 20px;
      }
    }
  }
`;

ManageStyled.Container = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  ${props => props.uploadEnabled && `
    padding-bottom: 86px;
  `}
  @media (min-width: 832px) {
    flex-direction: row;
    ${props => {
      const topOffset = props.headerHeight + 45;
      if (props.headerHeight) {
        return `min-height: calc(100vh - ${topOffset}px);`;
      }
      return `display: none`;
    }}
  }
  .star-name {
    font-size: 24px;
    font-family: Gilroy-Bold;
    color: ${props => props.theme.greyishBrown};
    padding-left: 0;
    ${media.webView} {
      padding-left: 20px;
    }
    ${media.mobileScreen} {
      font-size: 20px;
      margin-top: 15px;
    }
  }
`;

ManageStyled.CardWrapper = styled.section`
  ${visiblity};
  padding: 0 13.5px;
  .customStar-layout {
    padding-top: 20px;
    ${media.mobileScreen} {
      padding-top: 15px;
    }
  }
`;

ManageStyled.MobileHeading = styled(Heading)`
  padding: 17px 0 15px;
  margin: 0 auto;
  ${visiblity};
  @media (min-width: 832px) {
    display: none;
  }
`;

ManageStyled.SidebarWrapper = styled.div`
  max-width: 100%;
  background-color: ${props => props.theme.pureWhite};
  ${media.webView} {
    margin-top: -57px;
    padding-top: 55px;
    width: 272px;
    min-width: 272px;
    background-color: ${props => props.theme.white};
  }
  .normal-li {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .wrapper-li {
    background-color: ${props => props.theme.headerGrey};
    .link-wrap {
      padding-left: 20px;
    }
    ul {
      padding-left: 20px;
      padding-right: 20px;
      margin-top: -5px;
      padding-bottom: 20px;
    }
    .d-link {
      color: ${props => props.theme.flatBlue};
      font-family: Gilroy-Bold;
    }
    .svg-inline--fa {
      color: ${props => props.theme.flatBlue};
    }
  }
  .wrapper-li {
    .sub-link-wrp {
      padding-right: 20px;
    }
  }
`;

ManageStyled.RightContent = styled.div`
  height: 100%;
  flex: 1;
  .site-logo {
    width: 150px;
  }
  ${media.modalView} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 475px;
    margin: 0 auto;
  }
  ${media.largeScreen} {
    width: 980px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  footer {
    padding: 50px 0 10px 15px;
    align-items: flex-end;
    z-index: 1;
    ${media.mobileScreen} {
      padding: 15px 0 10px 15px;
    }
  }

  .MuiFormControl .notchedOutline {
    background-color: ${props => props.theme.pureWhite};
  }
  .input-field {
    z-index: 10;
  }
  .c-wrap,
  .select-menu,
  .react-phone-number-input {
    background-color: ${props => props.theme.pureWhite};
  }
  .mob-footer {
    ${media.largeScreen} {
      display: none;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    font-family: Gilroy-Bold;
    font-size: 10px;
    img {
      padding-bottom: 10px;
    }
  }
`;

export const RightContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media(min-width: 1280px) {
    padding-left: calc(100vw - 100%);
  }
`;

export const ModalContainer = styled.div`
  min-height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  .description {
    margin-top: 15px;
  }
  @media(min-width: 832px) {
    width: auto;
  }
`;

export const UploadListStyled = styled(Dialog)`
  .paperScroll {
    background-color: transparent;
    overflow-y: inherit;
    background-color: ${props => props.theme.pureWhite};
  }
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  @media(min-width: 832px) {
    left: initial !important;
    margin-top: ${props => `${props.headerHeight}px`};
    .paperScroll {
      padding-top: 30px;
      width: 500px;
    }
  }
`;

export default ManageStyled;
