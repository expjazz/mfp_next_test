import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Container = styled.div`
  max-width: 830px;
  ${media.largeScreen} {
    max-width: 1090px;
  }
  margin: 0 auto;
  display: flex;
  ${media.mobileScreen} {
    flex-direction: column;
  }
  .hidden {
    display: none;
  }
  .disabled {
    opacity: 0.5;
    cursor: default;
  }
  .cant-play {
    color: ${props => props.theme.pureWhite};
    display: block;
    padding: 20px;
    font-family: Gilroy;
    line-height: 22px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #666;
  }
  .vid-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .retry {
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .login-info-wrap {
    padding: 0 15px;
    @media(min-width: 832px) {
      padding: 0;
      max-width: 336px;
    }
  }
  .btn-wrp {
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    @media (min-width: 832px) {
      padding: 0;
    }
    &.auth-wrap {
      padding-left: 15px;
      padding-right: 15px;
      @media (min-width: 832px) {
        padding: 0;
      }
    }
  }

  ${props =>
    props.disabled &&
    `opacity: .4;
     pointer-events: none;
     textarea {
      background: ${props.theme.white};
     }
     .lang-dop-cls {
      background: ${props.theme.white};
     }
  `}
`;

export const Left = styled.div`
  width: 50%;
  border-right: 1px solid ${props => props.theme.brownGreyTwo};
  padding-right: 60px;
  .language-label {
    margin-top: 0;
  }
  ${media.mobileScreen} {
    width: 100%;
    border-right: none;
    padding-left: 15px;
    padding-right: 15px;
  }
  .terms {
    font-family: Gilroy;
    font-size: 12px;
    color: ${props => props.theme.greyishBrown};
    padding-bottom: 10px;
    line-height: 17px;
  }
  .more-link {
    font-size: 12px;
  }
`;

export const Right = styled.div`
  width: 50%;
  padding-left: 60px;
  ${media.mobileScreen} {
    width: 100%;
    padding-left: 0;
    padding-top: 20px;
    flex: 1;
  }

  .btns-wrp {
    flex-direction: column;
    align-items: center;
    width: 336px;
    ${media.mobileScreen} {
      margin: 0 auto;
    }
    .rec-stop {
      margin-top: 15px;
    }
    .upload-link {
      padding-top: 10px;
    }
  }
`;

export const VideoContainer = styled.div`
  width: 336px;
  height: 372px;
  border-radius: 5px;
  background-color: #666;
  align-self: flex-start;
  position: relative;
  ${media.mobileScreen} {
    max-height: 372px;
    min-height: 305px;
    margin: 0 auto;
  }

  #video-player_tag {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }

  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${props => props.hasInsrtuctions && `display: none`};
  }

  .note {
    position: absolute;
    bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: ${props => props.theme.pureWhite};
    font-family: Gilroy;
    font-size: 14px;
  }
`;

export const QuestionWap = styled.div`
  position: absolute;
  bottom: 0;
  padding-bottom: 30px;
  padding-top: 10px;
  ${props =>
    props.show &&
    `max-height: 372px;
     transition: max-height 0.2s ease-in;`};
  .instruction-head-mob {
    color: ${props => props.theme.pureWhite};
    padding-bottom: 15px;
    font-family: Gilroy-Bold;
    font-size: 18px;
    line-height: 22px;
    padding-left: 20px;
  }
`;

export const ShowHide = styled.span`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  background: ${props => props.theme.pureWhite};
  color: ${props => props.theme.flatBlue};
  font-family: Gilroy-Bold;
  cursor: pointer;
  margin: 0 auto;
  :before {
    position: absolute;
    top: ${props => (props.isShow ? '6px' : '12px')};
    left: 24px;
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid ${props => props.theme.flatBlue};
    border-top: 1px solid ${props => props.theme.flatBlue};
    transform: ${props => (props.isShow ? 'rotate(135deg)' : 'rotate(315deg)')};
    margin-right: 28px;
  }
`;
