import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';
import { Heading } from 'styles/TextStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Layout = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 10px;
  width: 600px;
  margin: 0 auto;
  ${props =>
    !props.varHeight &&
    `
    height: 493px;
  `}
  ${media.mobileScreen} {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 319px;
    margin: 0 auto;
    flex: 1 1 auto;
    display: flex;
    height: 400px;
  }
  .clarify-wrap {
    width: 100%;
    ${media.webView} {
      max-width: 600px;
      margin: 0 auto;
      width: 100%;
    }
  }
  .video-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .sample-header {
      font-size: 14px;
      font-family: Gilroy;
      display: block;
      text-align: center;
      margin-bottom: 10px;
      position: absolute;
      top: 8px;
      left: 0;
      right: 0;
      color: ${props => props.theme.pureWhite};
      z-index: 1;
    }
    ${media.mobileScreen} {
      order: 1;
      .player-container {
        max-height: inherit;
      }
    }
  }
  .button {
    height: 40px;
  }
  .videoElm {
    width: 319px;
    border-radius: 5px;
    height: 100%;
    object-fit: cover;
    z-index: 11;
  }
  .note {
    color: #999;
    font-family: Gilroy-Light;
    font-size: 14px;
    ${props => props.isQA && `padding-top: 32px;`}
    ${media.mobileScreen} {
      color: #fff;
      font-size: 14px;
      padding-top: 20px;
    }
  }
  .quesHead {
    padding-bottom: 20px;
    font-family: Gilroy;
    font-size: 14px;
    color: #7c7c7c;
    text-transform: capitalize;
  }
  .uploadLink {
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: ${props => props.theme.flatBlue};
    width: 100%;
    display: inline-block;
    text-align: center;
    padding-top: 20px;
    display: block;
    ${media.webView} {
      display: none;
    }
  }
  .web-link {
    display: none;
    padding-top: 0;
    ${media.webView} {
      display: block;
      margin-top: 10px !important;
    }
  }
  .hidden {
    display: none;
  }
  .uploadBtn {
    text-align: center;
    display: block;
    margin-right: 12px;
    cursor: pointer;
    width: calc(50% - 6px);
    @media (min-width: 832px) {
      margin-right: 0;
      width: 100%;
    }
    .button {
      pointer-events: none;
      width: 100%;
      @media (min-width: 832px) {
        width: 160px;
      }
    }
  }

  .safari-upload {
    margin-top: 40px;
  }
  .videoInputCapture {
    display: none;
  }
  .video-option {
    justify-content: center;
    display: flex;
    padding-bottom: 11px;
    li {
      display: inline-block;
      font-family: Gilroy-Light;
      font-size: 16px;
      color: #cccccc;
      cursor: pointer;

      &.ques-item {
        font-family: Gilroy-Medium;
      }
    }
    li + li:before {
      content: '|';
      padding-left: 15px;
      padding-right: 15px;
      color: #2f2f2f;
    }
  }
  .questionWrapper {
    padding-bottom: 16px;
    :last-of-type {
      padding-bottom: 9px;
    }
  }
  .next-btn {
    display: none;
    ${media.largeScreen} {
      display: block;
    }
  }
  .ques-item {
    color: #2f2f2f !important;
    font-family: Gilroy-Semibold;
  }
  .ans-item {
    color: #2f2f2f !important;
    font-family: Gilroy-Semibold !important;
  }
  .player-container {
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    .player-icon-wrap {
      top: 50%;
      transform: translateY(-50%);
      bottom: unset;
    }
  }
  .disabled-btn {
    opacity: 0.3;
    pointer-events: none;
  }
  .noSupportBtn {
    position: absolute;
    left: 0;
    top: 285px;
    ${media.webView} {
      position: static;
      margin-top: 40px;
    }
    ${media.mobileScreen} {
      top: inherit;
      margin-top: 40px;
      margin-bottom: 20px;
      left: 0;
      right: 0;
      min-height: 40px;
    }
  }
  .error-msg {
    max-width: 225px;
    ${media.mobileScreen} {
      max-width: inherit;
    }
  }

  .continue-mob {
    bottom: -70px;
    .decline-btn {
      padding-left: 10px;
    }
  }
`;

export const VideoContainer = styled.section`
  width: 319px;
  height: 100%;
  border-radius: 5px;
  background-color: #e3e3e3;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  position: relative;
  ${media.mobileScreen} {
    margin-bottom: 0;
    overflow: hidden;
  }
  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  .retry {
    background: #fff;
    width: 224px;
    color: ${props => props.theme.flatBlue};
    position: absolute;
    transform: translateX(-50%);
    bottom: 20px;
    left: 50%;
    z-index: 11;
  }
  .uploadCustom {
    bottom: 8px;
    padding: 11px 0;
    border-radius: 5px;
    height: 40px;
    font-size: 14px;
    font-family: Gilroy-Bold;
    border: 1px solid ${props => props.theme.flatBlue};
    width: 185px;
    :hover,
    :focus {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
    }
    &:active {
      border-color: ${props => props.theme.greyishBrown};
      color: ${props => props.theme.greyishBrown};
    }
  }
  .cant-play {
    display: block;
    padding: 20px;
    font-family: Gilroy;
    line-height: 22px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #e3e3e3;
    z-index: 11;
  }
`;

export const QuestionContainer = styled.section`
  padding-left: ${props => (props.error ? '20px' : '34px')};
  ${props => props.isQA && `padding-top: 28px;`}
  display: flex;
  align-items: center;
  flex-direction: column;
  ${props => props.errorWeb && `display:none`};
  min-width: 220px;
  flex: 1 1 auto;
  font-family: Gilroy-Bold;
  ${media.mobileScreen} {
    position: absolute;
    display: ${props => (props.isShow ? 'block' : 'none')};
    padding-left: 15px;
    padding-top: 50px;
    padding-bottom: 25px;
    top: ${props => (props.isQA ? '40px' : '10px')};
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.47);
    left: 50%;
    width: 319px;
    transform: translateX(-50%);
    order: 2;
    z-index: 999;
    &.error-msg {
      position: relative;
      left: initial;
      transform: initial;
      bottom: 0;
      background: transparent;
      order: initial;
      padding-left: 0;
      padding-right: 0;
      .note {
        color: ${props => props.theme.greyishBrown};
      }
    }
    &:empty {
      display: none;
    }
  }
  .question-wrapper {
    position: relative;
    width: 100%;
    height: 280px;
    ${media.mobileScreen} {
      position: initial;
      max-height: 280px;
    }
    .more-action-root {
      position: absolute;
      top: -10px;
      right: -11px;
      ${media.mobileScreen} {
        top: inherit;
        bottom: 18px;
        right: 10px;
        z-index: 999;
        .more-action-icon {
          background: #fff;
        }
      }
      .more-action-icon {
        width: 30px;
        height: 30px;
      }
    }
    .qa-scroll {
      max-height: 243px !important;
      @media (max-width: 831px) {
        /* .scroll-render {
          margin-bottom: 0 !important;
        } */
      }
    }
  }
  h1 {
    font-family: Gilroy;
    font-size: 18px;
    color: #46829a;
    ${media.mobileScreen} {
      display: none;
    }
  }
  .button {
    height: 40px;
    padding: 0;
    min-height: auto;
    width: 200px;
    min-width: auto;
    font-size: 14px;
    ${media.webView} {
      width: 160px;
    }
    ${media.mobileScreen} {
      display: none;
    }
  }
  .mobDisplay {
    display: none;
    ${media.webView} {
      display: block;
    }
  }
  .bold-text,
  .boldTxt {
    font-family: Gilroy-Medium;
    font-size: 16px;
    color: #fff;
    ${media.webView} {
      color: #2f2f2f;
    }
  }
  .question {
    font-size: 14px;
    line-height: 16px;
    color: #555;
    font-family: Gilroy;
    .bold-text {
      font-size: 14px;
    }
    ${media.mobileScreen} {
      padding-left: 5px;
      font-family: Gilroy-Semibold;
      color: #fff;
    }
    p {
      color: #555;
      ${media.mobileScreen} {
        color: #fff;
      }
    }
    .boldTxt,
    &.bold-text {
      font-family: Gilroy;
      color: #555;
      font-size: 14px;
      ${media.mobileScreen} {
        font-family: Gilroy-Semibold;
        line-height: 16px;
        color: #fff;
      }
    }
  }
  .agreement-note {
    font-family: Gilroy-Light;
    font-size: 12px;
    color: #fff;
    padding-left: 20px;
    ${media.webView} {
      color: #3b3b3b;
      padding-left: 29px;
    }
  }

  .script-details {
    display: flex;
    flex-direction: column;
    font-family: Gilroy;
    line-height: 24px;
  }
`;

export const ShowHide = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 0 22px;
  align-items: center;
  order: 2;
  position: absolute;
  top: ${props => (props.isQA ? '50px' : '20px')};
  width: auto;
  right: 10px;
  left: 10px;
  text-align: center;
  height: 30px;
  line-height: 21px;
  border-radius: 5px;
  background: #fff;
  color: ${props => props.theme.flatBlue};
  font-family: Gilroy-Extrabold;
  font-size: 14px;
  cursor: pointer;
  z-index: 9999;
  ${media.webView} {
    display: none;
  }
  /* :after, */
  :before {
    position: relative;
    top: ${props => (props.isShow ? '3px' : '-3px')};
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid ${props => props.theme.flatBlue};
    border-top: 1px solid ${props => props.theme.flatBlue};
    transform: ${props => (props.isShow ? 'rotate(315deg)' : 'rotate(135deg)')};
    margin-right: 28px;
  }
  :after {
    position: relative;
    top: ${props => (props.isShow ? '3px' : '-3px')};
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid ${props => props.theme.flatBlue};
    border-top: 1px solid ${props => props.theme.flatBlue};
    transform: ${props => (props.isShow ? 'rotate(315deg)' : 'rotate(135deg)')};
    margin-left: 28px;
  }
`;

export const PlayButton = styled.section`
  display: flex;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: #fff;
  align-items: center;
  svg {
    font-size: 44px;
    color: red;
  }
`;
export const WebButtons = styled.section`
  padding-top: 20px;
  ${media.mobileScreen} {
    padding-top: 0;
  }
  display: none;
  ${media.webView} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const MobButtons = styled.section`
  position: absolute;
  bottom: -100px;
  order: 3;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 15px;
  padding-top: 15px;
  justify-content: center;
  ${props => props.isContinueRecord && `
      flex-direction: column;
      align-items: center;
  `};
  ${props =>
    props.isError &&
    `
    bottom: -200px;
  `}
  .button {
    width: calc(50% - 6px);
  }
  ${media.webView} {
    display: none;
  }
`;

export const MainHeading = styled(Heading)`
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
`;

export const Speaker = styled(FontAwesomeIcon)`
  font-size: 18px;
  color: ${props => props.theme.flatBlue};
  margin-left: 9px;
  margin-right: 9px;
  cursor: pointer;
  ${props => props.recording && `pointer-events:none; color: #c0bfbf;`}
`;
