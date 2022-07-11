import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  max-width: 318px;
  padding-top: 35px;
  ${media.webView} {
    max-width: 570px;
  }
  margin: 0 auto;
  @media (max-width: 831px) {
    padding-top: 0;
  }
  .no-device-support {
    ${media.webView} {
      width: 224px;
      padding-left: 0;
    }
    ${media.mobileScreen} {
      height: 125px;
    }
  }
  .video-react-video {
    ${media.mobileScreen} {
      min-height: 305px;
    }
  }
  .remove-text {
    padding-top: 10px;
    width: 100%;
    text-align: center;
  }
  .remove-text-error {
    width: 310px;
  }

  .uploadBtn {
    display: block;
    margin: 20px auto 0;
    height: 40px;
    text-align: center;
    padding: 0;
    width: 150px;
    border-radius: 5px;
    background: ${props => props.theme.pureWhite};
    color: ${props => props.theme.flatBlue};
    border: 1px solid ${props => props.theme.flatBlue};
    font-size: 16px;
    cursor: pointer;
    outline: none;
    min-height: 40px;
    min-width: 150px;
    line-height: 38px;
    font-family: Gilroy-Bold;

    input {
      width: 100%;
    }
    :hover,
    :focus {
      ${media.webView} {
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
      }
    }
    &:active {
      color: #fff;
      background-color: ${props => props.theme.greyishBrown};
      border-color: ${props => props.theme.greyishBrown};
    }
  }
  .mobileBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    ${media.webView} {
      display: none;
    }
    ${media.mobileScreen} {
      order: 3;
    }
    .uploadBtn {
      margin: 0 5px 0 auto;
    }
    .button {
      margin: 0 auto;
    }
  }
  .no-support-web-btns {
    display: flex;
    display: none;
    margin-top: 20px;
    ${media.webView} {
      display: flex;
    }
    .uploadBtn {
      margin: 0 10px 0 0;
    }
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
  .note {
    font-family: Gilroy-Semibold;
    color: #fff;
    font-size: 14px;
    padding-top: 20px;
    ${media.webView} {
      font-family: Gilroy-Light;
      color: ${props => props.theme.greyishBrown};
      padding-bottom: 20px;
    }
  }
  .skip {
    display: none;
    width: 100%;
    text-align: center;
    padding-top: 5px;
    color: ${props => props.theme.twilight};
    font-size: 14px;
    cursor: pointer;
    font-family: Gilroy;
    ${media.webView} {
      display: inline-block;
      padding-top: 15px;
    }
  }
  .skipMob {
    display: block;
    position: absolute;
    top: ${props => (props.error ? '532px' : '620px')};
    left: 0;
    padding-top: 5px;
    ${media.webView} {
      display: none;
    }
  }
  .videoInputCapture {
    display: none;
  }
  .video-wrapper {
    ${media.mobileScreen} {
      flex-direction: column;
      height: 100%;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .video-react-video {
    @media (max-width: 831px) {
      position: relative;
    }
  }
  .hidden {
    display: none;
  }
  .uploadRetry {
    margin-bottom: 0;
    border-radius: 5px;
    font-family: Gilroy-Bold;
  }
  .disabled-btn {
    opacity: 0.3;
    pointer-events: none;
  }
  .uploadLink {
    font-family: Gilroy;
    font-size: 14px;
    color: #2f829c;
    width: 100%;
    display: inline-block;
    text-align: center;
    padding-top: 20px;
    cursor: pointer;
    ${media.mobileScreen} {
      padding-bottom: 15px;
    }
  }
  .retry {
    z-index: 111;
    background: #fff;
    width: 224px !important;
    color: ${props => props.theme.flatBlue};
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding: 0;
    @media (max-width: 831px) {
      bottom: 25px;
    }
  }
  .mob-time {
    position: absolute;
    top: 15px;
    color: #fff;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 100%;
  }
`;

export const VideoContainer = styled.section`
  width: 308px;
  min-width: 308px;
  height: 422px;
  border-radius: 5px;
  background-color: ${props => props.theme.greyishBrown};
  position: relative;
  @media (max-width: 831px) {
    width: 317px;
    height: 454px;
    margin: 0 auto;
    max-height: 56vh;
  }
  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .videoElm {
    width: 100%;
    border-radius: 5px;
    height: 100%;
    object-fit: cover;
  }
  .retry {
    ${props => props.isPlayed && `bottom:90px`};
  }
`;

export const QuestionContainer = styled.section`
  padding-left: ${props => (props.error ? '20px' : '33px')};
  ${media.mobileScreen} {
    padding-left: ${props => (props.error ? '20px' : '26px')};
    position: absolute;
    display: ${props => (props.isShow ? 'block' : 'none')};
    bottom: 0;
    border-radius: 5px;
    background: rgba(0, 0, 0, 1);
    width: 100%;
    height: 289px;
    margin-left: 0;
    padding-right: ${props => (props.error ? '20px' : '0')};
    padding-top: 20px;
  }
  h1 {
    font-family: Gilroy;
    font-size: 18px;
    color: #46829a;
    display: none;
    ${media.webView} {
      display: block;
    }
  }

  .heading {
    font-family: Gilroy-Medium;
    margin-bottom: 23px;
  }
  .tick {
    font-size: 19px;
  }
  .questionWrapper {
    padding-left: 0;
    padding-right: 15px;
    ${media.webView} {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .question {
    ${media.webView} {
      color: ${props => props.theme.greyishBrown};
    }
  }
`;
QuestionContainer.ButtonHeading = styled.div`
  width: 246px;
  height: 18px;
  color: #8f8f8f;
  font-family: Gilroy;
  font-size: 13px;
  margin-bottom: 6px;
  display: flex;
  padding-top: 5px;
  justify-content: center;
`;
QuestionContainer.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  ${media.webView} {
    margin-top: 0;
  }
`;
export const ShowHide = styled.span`
  display: none;
  position: absolute;
  width: 265px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  background: #fff;
  color: ${props => props.theme.flatBlue};
  font-family: Gilroy-Extrabold;
  font-size: 14px;
  cursor: pointer;
  display: block;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  ${media.webView} {
    display: none;
  }
  :after,
  :before {
    position: relative;
    top: ${props => (props.isShow ? '-3px' : '5px')};
    content: '';
    display: inline-block;
    width: 9px;
    height: 9px;
    border-right: 1px solid ${props => props.theme.flatBlue};
    border-top: 1px solid ${props => props.theme.flatBlue};
    transform: ${props => (props.isShow ? 'rotate(135deg)' : 'rotate(315deg)')};
    margin-right: 42px;
    margin-left: 42px;
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
    color: ${props => props.theme.orangePink};
    width: 49.9px;
    height: 49.9px;
  }
`;

export const TimeSpan = styled.span`
  align-items: center;
  flex-direction: column;
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  padding-bottom: 20px;
  display: none;
  ${media.webView} {
    display: flex;
  }
  .text {
    font-size: 16px;
    line-height: 0.9;
    margin-bottom: 4px;
  }
  .time {
    font-size: 21px;
  }
`;

export const FlexBox = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  ${media.webView} {
    justify-content: space-between;
  }
`;
