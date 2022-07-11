import styled from '@emotion/styled';
import { css } from '@emotion/react'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  padding-right: 0;
  padding-left: 0;

  ${media.webView} {
    padding-left: 20px;
    padding-top: 0;
  }
  ${media.largeScreen} {
    height: auto;
  }

  .local-currency {
    display: block;
    font-size: 12px;
    font-family: Gilroy-Regular;
    line-height: 21px;
  }

  .back-header {
    top: 65px;
    z-index: 10;
    ${media.mobileScreen} {
      display: ${props => (props.hideBack ? 'none' : 'block')};
      background: ${props => props.theme.pureWhite};
      position: relative;
      top: inherit;
      z-index: 10;
      padding: 0 15px 0;
      .header-wrp {
        padding-top: 10px;
      }
    }
    .header-label {
      padding-top: 15px;
      margin-top: 0;
      ${media.webView} {
        padding-top: 0;
        font-size: 24px;
      }
    }
    ${media.webView} {
      padding: 0;
    }
    .heading-top {
      ${props => (props.showMenu ? 'display: block' : 'display: none')};
      ${media.webView} {
        display: block;
      }
      ${media.mobileScreen} {
        padding-bottom: 5px;
        font-size: 24px;
      }
    }
  }

  .menu-layout {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    ${media.webView} {
      display: block;
    }
  }
  .warning-info {
    padding: 15px;
    margin: 15px;
    background: ${props => props.theme.white};
    border-radius: 5px;
    ${media.webView} {
      padding: 10px;
      max-width: 265px;
      margin: 0;
    }
    .info,
    .link {
      font-family: gilroy-regularitalic;
    }
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  height: 100%;
  justify-content: space-between;
  ${media.mobileScreen} {
    flex-direction: column;
  }
  .menu-layout {
    width: 100%;
    padding: 0;
    ${media.webView} {
      width: 240px;
    }
    .menu-desc {
      padding: 0 15px 10px;
      ${media.webView} {
        padding: 5px 0 0;
      }
    }
  }
  .mobo-link-ul {
    .mobo-link {
      ${media.mobileScreen} {
        &:first-child {
          width: 100%;
          max-width: 100%;

          .flex-start {
            flex-direction: row;
            ${media.mobileScreen} {
              margin-top: 10px;
            }
          }
        }
      }
      li {
        width: auto;
        margin-right: 0;
        margin-left: 0;
        ${media.mobileScreen} {
          border-radius: 10px;
          margin-bottom: 0;
        }
      }
    }
    ${media.webView} {
      padding-left: 15px;
      padding-right: 15px;

      .mobo-link:first-of-type {
        width: 100%;
      }
      .mobo-link:not(:first-of-type) {
        flex: 1;
      }
      .mobo-link:nth-child(2) {
        margin-right: 6px;
      }
      .mobo-link:nth-child(3) {
        margin-left: 6px;
      }
    }
  }
`;

export const MWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${media.webView} {
    width: auto;
  }
`;

export const ModalContainer = styled.section`
  height: 100%;
  .back-header {
    padding: 15px 15px 0;
    ${media.webView} {
      padding: 25px 25px 0;
    }
    .close-icon {
      display: none;
      ${media.modalView} {
        display: inline-block;
      }
    }
    .back-lbl-wrp {
      ${media.modalView} {
        display: flex;
      }
    }
  }
`;

const lblStyle = props => css`
  font-family: Gilroy-Semibold;
  display: flex;
  color: ${props.theme.lightGreyTwo};
  font-size: 14px;
`;

const valStyle = props => css`
  color: ${props.theme.greyishBrown};
  font-family: Gilroy-Bold;
  font-size: 26px;
  ${media.mobileScreen} {
    margin-bottom: 0 !important;
  }
`;

export const Li = styled.li`
  background-color: ${props => props.theme.white};
  padding: 14px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .svg-inline--fa {
    font-size: 24px;
    color: ${props => props.theme.greyishBrown};
    margin-bottom: 5px;
    ${media.mobileScreen} {
      min-height: 28px;
    }
  }
  .earnings {
    ${valStyle}
    &:before {
      content: attr(data-val);
      ${lblStyle}
    }
  }
  .payments {
    ${valStyle}
    &:before {
      content: attr(data-val);
      ${lblStyle}
    }
  }
  .flex-start {
    width: 100%;
    padding-top: 10px;
    ${media.mobileScreen} {
      flex-direction: column;
      padding-top: 0;

      span:first-child {
        margin-bottom: 10px;
        padding-right: 10px;
      }

      span:nth-child(2) {
        padding-left: 10px;
      }

      span {
        flex: 0 0 50%;
        word-break: break-word;
      }
    }
  }
`;

export const Text = styled.span`
  width: 100%;
  text-align: center;
  font-family: gilroy-Bold;
  color: ${props => props.theme.flatBlue};
  font-size: 16px;
  line-height: 19px;
  ${media.mobileScreen} {
    font-size: 16px;
  }
`;
