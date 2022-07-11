import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import {
  Wrapper as Wrap,
  ProfileWrapper as ProfileWrap,
  BannerWrapper as BannerWrap,
} from './styled';

const Wrapper = styled(Wrap)`
  .cam-icon {
    color: ${props => props.theme.flatBlue};
    font-size: 18px;
  }
  .drop-wrapper {
    @media(max-width: 1279px) {
      flex-direction: row;
      margin: 0 auto;
      width: 320px;
      display: flex;
      justify-content: space-between;
    }
  }
  .bnr-cam {
    right: 20px;
    bottom: 20px;
    z-index: 1;
  }
`;

const ProfileWrapper = styled(ProfileWrap)`
  .drop-container {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    @media(min-width: 832px) {
      position: absolute;
      top: 0;
      right: 10px;
      .drop-wrapper {
        z-index: 14;
      }
    }
    @media(min-width: 1019px) {
      align-items: flex-end;
      position: absolute;
      top: -8px;
      right: 13px;
    }
    .cropper-save-wrp {
      justify-content: flex-end;
      display: none;
      ${media.webView} {
        display: flex;
        margin-bottom: 10px;
      }
      .cancel-btn {
        margin-right: 10px;
      }
      @media(min-width: 832px) {
        z-index: 14;
      }
    }
  }
`;

const BannerWrapper = styled(BannerWrap)`
  #bannerUpload {
    display: none;
  }
  #cropper-wrapper {
    z-index: 14;
    height: calc(100vw / 3.8);
    min-height: 140px;
    @media(min-width: 1019px) {
      height: 268px;
    }
  }
  .save-btn-crop {
    display: none;
  }
`;

const CamBg = styled.span`
  border-radius: 50%;
  position: absolute;
  font-size: 22px;
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.flatBlue};
  background: ${props => props.theme.pureWhite};
`;

const ProfilePicker = styled.div`
  .prof-cam-container {
    background: ${props => props.theme.pureWhite};
    padding: 70px 0;
    ${media.webView} {
      padding: 0;
    }
    .profile-btn {
      display: flex;
    }
  }
  .back-header {
    padding: 0 15px 15px;
    padding-top: 10px;
    ${media.webView} {
      padding: 25px 25px 15px;
    }
    .back-lbl-wrp {
      display: block;
    }
  }
`;

export {
  Wrapper,
  ProfileWrapper,
  BannerWrapper,
  CamBg,
  ProfilePicker,
};
