import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { largeHeading } from 'styles/TextStyled';
import { modalPadding } from '../../styled';

const UploadContainer = styled.div`

`;

UploadContainer.SubHead = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  text-transform: uppercase;
  color: ${props => props.theme.greyishBrown};
  line-height: 30px;
  display: block;
  text-align: center;
  text-transform: uppercase;
  padding-top: 40px;
  @media(min-width: 832px) {
    padding-top: 0;
  }
`;

UploadContainer.Wrapper = styled.div`
  ${modalPadding};
  .basic-multi-select {
    label {
    }
  }

  .error-msg {
    font-size: 14px;
    margin: 10px 0;
    color: #990000;
  }
`;

UploadContainer.CropperContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 3;
  ${modalPadding};
`;

UploadContainer.Container = styled.div`
  .action-buttons {
    top: 9px;
  }
`;

UploadContainer.Heading = styled.div`
  ${largeHeading}
  @media (min-width: 832px) {
    &.fans-want {
      & ~ .upload-wrap {
        padding-top: 58px;
        padding-bottom: 0;
        margin-bottom: 57px;
        @media (min-width: 832px) {
          margin-bottom: 40px;
        }
      }
    }
    &.select-category {
      & ~ .upload-wrap {
        padding-bottom: 0;
        margin-bottom: 15px;
        @media (min-width: 832px) {
          margin-bottom: 20px;
        }
      }
    }
  }
  @media screen and (min-width: 832px) and (max-height: 720px) {
    &.fans-want {
      & ~ .upload-wrap {
        margin-bottom: 20px;
      }
    }
  }
  @media (max-width: 831px) {
    padding-top: 0px;
    margin: 0 auto 9px;
    &.fans-want {
      & ~ .upload-wrap {
        margin-bottom: 30px;
      }
    }
    &.select-category {
      max-width: 260px;
      white-space: pre-line;
      & ~ .upload-wrap {
        margin-bottom: 30px;
      }
    }
  }
`;

UploadContainer.ButtonWrapper = styled.div`
  z-index: 1000;
  margin-top: 0;
  text-align: center;
  padding-bottom: 20px;
  @media (max-width: 831px) {
    margin-top: 20px;
  }
  @media (min-width: 832px) {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 73px;
    padding-bottom: 0;
  }
  @media screen and (min-width: 832px) and (max-height: 720px) {
    bottom: 23px;
  }
  &.align-bottom {
    @media (min-width: 832px) {
      bottom: 60px;
    }
  }
`;

UploadContainer.BrowseCategoryWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 3;
  max-height: 550px;
  height: 100%;
  top: 0;
  @media (max-width: 831px) {
    position: absolute;
  }
  ${UploadContainer.Heading} {
    padding-top: 27px;
    @media (min-width: 832px) {
      padding-top: 52px;
    }
  }
`;

UploadContainer.BrowseCategoryContainer = styled.div`
  display: flex;
  padding: 30px 40px 5px 70px;
  align-items: flex-start;
  flex-direction: column;
  height: 450px;
  @media (min-width: 768px) {
    flex-direction: row;
  }

  .right-section {
    display: flex;
    flex-direction: column;
    height: 525px;
    width: 100%;
  }
  .subCategoryHeading {
    color: #555;
    font-family: Gilroy-SemiBold;
    font-size: 19px;
    line-height: 23px;
    margin-bottom: 10px;
    max-width: 270px;
    span {
      font-family: Gilroy-Light;
      font-size: 14px;
      display: block;
    }
  }
`;

UploadContainer.ScrollbarsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

UploadContainer.DesktopView = styled.div`
  display: none;
  @media (min-width: 832px) {
    display: block;
  }
`;

UploadContainer.MobileView = styled.div`
  display: block;
  max-width: 317px;
  margin: 0 auto;
  ${UploadContainer.BrowseCategoryContainer} {
    padding: 4px 20px 10px;
    display: block;
    ${media.mobileView} {
      padding: 30px 20px 10px;
    }

    &.mobile-select-category .select__indicators {
      display: none;
    }
  }
  #nested-list {
    max-height: 293px !important;
  }
  ${UploadContainer.Heading} {
    padding-top: 40px;
    max-width: 253px;
    white-space: pre-line;
    margin: 0 auto 11px;
  }
  .select-input {
    margin-top: 18px;
  }

  @media (min-width: 832px) {
    display: none;
  }
`;

UploadContainer.ItemWrapper = styled.ul`
  min-width: 227px;
`;

UploadContainer.SubItemWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: visible;
  li {
    padding: 1px 15px 0;
    border-radius: 15px;
    border: 1px solid ${props => props.theme.flatBlue};
    display: flex;
    font-family: Gilroy-Medium;
    font-size: 12px;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    line-height: 20px;
    margin-bottom: 5px;
    color: #555;
  }
`;
UploadContainer.Item = styled.li`
  font-size: 22px;
  font-family: Gilroy;
  cursor: pointer;
  padding: 0 0 28px;
  background-color: ${props =>
    props.selected ? props.theme.flatBlue : '#fff'};
  color: ${props => (props.selected ? '#fff' : '#555')} !important;

  &.categoryItem {
    background-color: #fff;
    color: ${props =>
      props.selected ? props.theme.flatBlue : '#999'} !important;
    font-family: ${props => (props.selected ? 'Gilroy-Medium' : 'Gilroy')};
  }
`;

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
  padding: ${props => (props.imagePresent ? '30px 10px 0' : '32px 10px 10px')};
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
  ${largeHeading};
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

ImageUpload.ControlButton = styled.section`
  display: flex;
  justify-content: center;
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

export { UploadContainer, ImageUpload, ErrorMessage };
