import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 110px;
  ${media.webView} {
    padding-top: 0;
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    padding-top: 30px;
    height: auto;
  }
  ${media.mobileScreen} {
    padding-top: 0;
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

  .bio-wrapper,
  .headline-wrapper {
    height: auto !important;
    width: 100%;
    padding: 0 15px;
    ${media.webView} {
      padding: 0;
    }
  }
  .headline-wrapper {
    padding-bottom: 9px;
    .MuiFormControl {
      .input-root {
        height: 125px;
        @media (max-width: 831px) {
          height: 165px;
        }
      }
    }
  }

  textarea {
    min-height: auto;
  }

  .share-text {
    min-height: 55px;
  }

  #bio-scroll {
    ${media.mobileScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
  }
  .desc {
    padding: 0 15px;
    ${media.webView} {
      padding: 0 50px;
    }
    ${media.modalView} {
      padding: 0 25px;
    }
  }
  .input-wrapper {
    padding: 15px 0 30px;
    ${media.webView} {
      padding: 15px 25px 35px;
    }
    ${media.largeScreen} {
      padding: 15px 50px 35px;
    }
  }
  .textarea-cus {
    min-height: 178px;
  }
  .nm-heading {
    ${media.modalView} {
      padding-top: 15px;
    }
    ${media.mobileScreen} {
      padding-bottom: 3px;
      padding-top: 15px;
    }
  }
  .align-center {
    margin-top: 13px;
  }
`;

export const PageHeading = styled.div`
  text-align: center;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  font-family: Gilroy-Medium;
  font-weight: normal;
  padding-bottom: 10px;
`;
export const Wrapper = styled.section`
  width: 100%;
  @media (max-width: 831px) {
    height: max-content;
  }
  &.info-wrapper {
    padding: 10px 15px 0;
    ${media.webView} {
      padding: 10px 0 0;
    }
    .react-datepicker-wrapper {
      display: block;
    }
    .react-datepicker__input-container {
      display: block;
    }
    .react-datepicker__header__dropdown--select {
      padding: 10px 0;
    }
    .react-datepicker__month-dropdown-container--select {
      margin-right: 10px;
    }
    .react-datepicker__year-read-view--down-arrow {
      top: 5px;
      border-width: 5px;
    }
  }
  .react-datepicker-popper {
    z-index: 20;
    top: 30px !important;
  }
  .react-datepicker__month-read-view {
    border: 1px solid ${props => props.theme.headerGrey};
    border-radius: 0;
    text-align: left;
    padding: 2px 6px;
  }
  .react-datepicker__month-read-view--down-arrow {
    top: 6px;
    right: 5px;
    border-width: 5px;
  }
  .react-datepicker__current-month {
    display: none;
  }
  .react-datepicker__day--outside-month {
    opacity: 0.5;
  }
  .multiline-input {
    height: auto;
  }
  .float-label {
    padding-right: 20px;
  }

  .multiline-outline {
    padding: 19px 10px 5px;
    .notchedOutline {
      height: auto;
    }
    .input-field {
      padding: 0;
      overflow: hidden;
    }
  }
`;

export const CharCount = styled.span`
  display: block;
  text-align: right;
  font-size: 11px;
  font-family: Gilroy;
  padding-top: 3px;
  color: ${props => props.theme.greyishBrown};
`;
