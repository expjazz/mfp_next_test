import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const ImageUpload = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;
ImageUpload.ContentWrapper = styled.div`
  height: 100%;
  display: ${props => (props.hide ? 'none' : 'block')};
`;

ImageUpload.BackButton = styled.span`
  position: absolute;
  left: 5px;
  color: #707070;
  border: none;
  padding: 0 30px;
  cursor: pointer;
  outline: none;
  font-size: 28px;
`;

ImageUpload.CloseButton = styled.span`
  position: absolute;
  right: 49.5px;
  z-index: 2;
  display: inline-block;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #707070;
  font-size: 30px;
`;

ImageUpload.DetailsWrapper = styled(ImageUpload.ContentWrapper)`
  padding: ${props => (props.imagePresent ? '30px 10px 0' : '15px 10px 10px')};
    &.upload-wrap {
      margin-bottom: 20px;
    }
  @media(min-width: 832px) {
    padding: 35px 60px 32px;
  }
`;
ImageUpload.TakePhotoWrapper = styled(ImageUpload.ContentWrapper)`
    padding: 20px 15px;
    ${media.webView} {
      padding: 15px 25px 25px;
    }
    ${media.largeScreen} {
      padding: 15px 50px 25px;
    }
`;

ImageUpload.ProfileInputButton = styled.div`
  display: ${props => (props.image || props.takePhoto ? 'none' : 'flex')};
  height: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  padding-bottom: 18px;
  ${media.mobileView} {
    padding-bottom: 0;
  }
`;

ImageUpload.UploadedImage = styled.div`
  display: ${props => (!props.image ? 'none' : 'flex')};
  height: calc(100% - 150px);
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  flex-direction: column;
  ${media.mobileView} {
    padding-bottom: 0;
  }
`;

ImageUpload.CoverImage = styled.div`
  position: relative;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props =>
    props.imageUrl ? `url(${props.imageUrl})` : '#d0d2d3'};
  background-repeat: no-repeat;
  background-size: cover;
`;

ImageUpload.ProfileImageWrapper = styled(ImageUpload.CoverImage)`
  width: 124px;
  height: 124px;
  position: relative;
  border: none;
  border-radius: 50%;
  background: ${props =>
    props.imageUrl ? `url(${props.imageUrl})` : '#e4e4e4'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  ${props =>
    props.imageUrl &&
    `
    box-shadow: 0 3px 16px 0 #0000004a;
  `}
  cursor: pointer;
  text-align: center;
  flex: 0 0 auto;
  ${media.mobileView} {
    padding-bottom: 0;
  }

  &:last-child {
    margin-left: 10px;
    margin-right: 0;
    ${media.webView} {
      margin-left: 22px;
    }
  }
`;

ImageUpload.ProfileInputContainer = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
`;

ImageUpload.ProfileInputWrapper = styled.div`
  width: 35px;
  height: 35px;
  display: block;
  margin: 0 auto 6px;
  color: ${props => props.theme.flatBlue};
  font-size: 28px;

  &:first-child {
    svg {
      font-size: 29px;
    }
  }
  &:last-child {
    svg {
      font-size: 33px;
    }
  }
`;

ImageUpload.UploadInput = styled.input`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

ImageUpload.UploadText = styled.span`
  color: #555;
  font-family: 'Gilroy';
  font-size: 14px;
  max-width: 110px;
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

ImageUpload.Heading = styled.div`
  text-align: center;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  font-family: 'Gilroy';
  padding-top: 10px;
  @media (min-width: 832px) {
    padding-top: 37px;
  }
`;
ImageUpload.ControlWrapper = styled.div`
  background-color: rgb(255, 255, 255);
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 13px 12px;
  justify-content: ${props => (props.multiple ? 'space-between' : 'flex-end')};
  @media (min-width: 1025px) {
    box-shadow: none;
    padding: 26px 0;
    border-top: ${props => (props.multiple ? 'none' : '1px solid #EBEBEB')};
  }
  &.registrationSubmit {
    border-top: none;
    text-align: center;
    justify-content: center;
    padding-bottom: 0;

    & > button {
      font-size: 16px;
    }
  }
`;

ImageUpload.ControlButton = styled.button`
  background-color: ${props => props.theme.orangePink};
  color: rgb(255, 255, 255);
  text-align: center;
  display: inline-block;
  font-size: 14px;
  font-family: Gilroy-Medium;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.orangePink};
  border-image: initial;
  &:hover,
  &:focus {
    background-color: #ff3b21;
  }
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
`;

ImageUpload.UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;

ImageUpload.CropperLightButton = styled.span`
  position: relative;
  cursor: pointer;
  background: ${props => props.theme.pureWhite};
  font-family: Gilroy-Bold;
  font-size: 14px;
  line-height: 41px;
  text-align: center;
  color: ${props => props.theme.flatBlue};
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.flatBlue};
  min-width: 150px;
  height: 40px;
  outline: none;
  margin-right: 10px;
  position: relative;
  @media (max-width: 832px) {
    margin-bottom: ${props => (props.isMultiline ? '20px' : '0px')};
  }
  @media (max-width: 320px) {
    min-width: 150px;
  }
  &:hover {
    background-color: ${props => props.theme.flatBlue};
    color: #ededed;
  }
  & > svg {
    margin-right: 5px;
  }
  &:last-child {
    margin-right: 0;
  }
  .icon {
    font-size: 19px;
    &.take-picture {
      margin-bottom: -3px;
    }
    &.upload-picture {
      margin-bottom: -2px;
    }
  }
`;

ImageUpload.ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: ${props => (props.isMultiline ? 'column' : 'row')};
  @media (min-width: 832px) {
    margin-top: 20px;
  }
`;

ImageUpload.VideoElement = styled.video`
  width: 100%;
  height: 262px;
  ${media.webView} {
    height: 400px;
  }
  background: black;
  margin: 10px 0;
`;
ImageUpload.TakePhoto = styled.div`
  display: ${props => (props.takePhoto ? 'block' : 'none')};
  background: #fff;
  overflow: hidden;
  .videoError {
    min-height: 400px;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-family: Gilroy-Medium;
    padding: 0 40px;
    text-align: center;
    line-height: 35px;
  }
`;

ImageUpload.PhotoButtonWrapper = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  .button {
    display: inline-block;
  }
  @media (max-width: 831px) {
    margin-top: 96px;
  }
  @media (min-width: 832px) {
    transform: translateY(-50%);
    bottom: 15px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
`;

export { ImageUpload, ErrorMessage };
