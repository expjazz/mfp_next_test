import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;

  ${media.webView} {
    padding: 30px 50px;
  }
  ${media.modalView} {
    padding: 0;
  }
  ${media.largeScreen} {
    background: ${props => props.theme.white};
    height: auto;
    min-height: 580px;
  }

  .name-photo-wrap {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    ${media.webView} {
      max-width: 422px;
    }
    ${media.modalView} {
      margin-top: 15px;
    }
  }
  .upload-wrap {
    margin-bottom: 0;
    padding-bottom: 18px;
    @media (min-width: 832px) {
      padding: 10px 60px 38px;
      height: auto;
    }
  }
  .back-header {
    width: calc(100% - 30px);
    padding: 0;
    top: 80px;
    ${media.mobileScreen} {
      position: relative;
      top: inherit;
      padding-top: 10px;
    }

    ${media.webView} {
      width: 100%;
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
    ${media.largeScreen} {
      display: none;
    }
  }
  .nm-heading {
    padding-top: 15px;
    padding-bottom: 3px;
    @media (min-width: 832px) {
      padding-bottom: 10px;
      padding-top: 0;
    }
  }
  .phto-heading {
    padding-bottom: 5px;
    @media (min-width: 832px) {
      padding-bottom: 10px;
    }
  }

  @media (min-width: 832px) {
    border-radius: 5px;
  }
  @media (max-width: 831px) {
    height: 100%;
    padding-top: 0;
    padding-bottom: 20px;
  }
  .cropper-Wrapper {
    ${media.largeScreen} {
      background: ${props => props.theme.white};
    }
  }
  .arrow-head {
    top: 35px;
    @media (min-width: 1280px) {
      display: none;
    }
  }
  .profile-btn {
    flex-direction: row;
    margin-top: 10px;
  }

  @media (max-width: 831px) {
    .upload-wrap {
      padding-top: 0;
    }
  }

  .profile-image-wrapper {
    width: 219px;
    height: 219px;
  }

  .take-photo,
  .crop-photo {
    @media (max-width: 831px) {
      position: absolute;
      top: 65px;
      height: calc(100vh - 75px);
    }
    @media (min-width: 832px) and (max-width: 1280px) {
      top: 0;
      height: calc(100vh - 60px);
    }
  }
  .take-photo,
  .crop-photo {
    .right-section {
      display: none;
    }
  }
  .take-photo .common-btn.button {
    margin-top: -25px;
    @media (min-width: 832px) and (max-width: 1280px) {
      .button {
        margin-top: 90px;
      }
    }
  }
  .crop-photo .cropper-Wrapper {
    padding-top: 45px;
    padding-left: 15px;
    padding-right: 15px;
    ${media.webView} {
      padding: 25px 50px 15px;
    }
    ${media.modalView} {
      padding: 25px;
    }
  }
`;

Layout.SubheaderWrap = styled.div`
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  .head1 {
    padding-top: 0 !important;
  }
`;

Layout.InputWrap = styled.div`
  margin-bottom: 10px;
  @media (min-width: 832px) {
    min-height: 65px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

/* styles for profile image */

const UploadContainer = styled.div`
  background-color: white;
  display: flex;
  padding: 0px 0px;
  flex-direction: column;
  height: 100%;
  padding-bottom: 56px;
  @media (min-width: 1025px) {
    flex-direction: row;
    padding-bottom: 0;
  }
`;

UploadContainer.CropperContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 25px;
  background-color: #fff;
  z-index: 11;
  ${media.largeScreen} {
    background: ${props => props.theme.white};
  }
  @media (max-width: 831px) {
    top: 0;
    height: 100%;
  }

  .cropper-head {
    top: 14px;
    padding: 0 15px;
    z-index: 10;
    display: block;
    background: ${props => props.theme.pureWhite};
    ${media.webView} {
      padding: 0;
    }
    ${media.largeScreen} {
      background: ${props => props.theme.white};
      padding: 0 25px;
    }
    .back-lbl-wrp {
      display: flex;
    }
  }
  .takepic-head {
    ${media.webView} {
      padding-top: 23px;
    }
  }
`;

const ImageUpload = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

ImageUpload.CropWrapper = styled.div`
  &.cropper-Wrapper {
    padding-top: 30px;
    ${media.webView} {
      padding-top: 27px;
    }
    position: relative;
    z-index: 0;
  }
`;

UploadContainer.ProfileUploadWrap = styled.div`
  margin-top: ${props => props.customMargin ? '12px' : '50px'};
  .upload-image {
    height: auto;
  }
  .profileupload {
    height: inherit !important;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

export { UploadContainer, ImageUpload, ErrorMessage };
