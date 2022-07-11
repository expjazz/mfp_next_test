import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const CropperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .button {
    margin-top: 30px;
    @media (min-width: 832px) {
      margin-top: 0;
    }
  }
  @media (min-width: 832px) {
    width: 100%;
    height: auto;
    max-height: 100%;
  }
  .cropper-drag-box{
    pointer-events: none;
  }
`;

CropperStyled.CropperWrapper = styled.div`
  width: 100%;
  height: 261.6px;
  @media (min-width: 832px) {
    height: 486px;
  }
  img {
    max-width: 100%;
  }
  .cropper-view-box {
    border-radius: 50%;
    border: 2px solid #fff;
    border-style: dashed;
    outline: none;
  }
  .cropper-face {
    background-color: transparent;
  }
  .cropper-modal {
    background: #fff;
  }
  .cropper-point {
    background-color: transparent;
    border: 2px solid #fff;
    width: 12.9px;
    height: 12.9px;
    opacity: 1;
    &.point-n,
    &.point-s,
    &.point-w,
    &.point-e {
      display: none;
    }
    &.point-se {
      width: 12.9px;
      height: 12.9px;
    }
    @media (min-width: 832px) {
      width: 24px;
      height: 24px;
      &.point-se {
        width: 24px;
        height: 24px;
      }
    }
  }
  .cropper-line {
    background-color: transparent;
  }
`;

CropperStyled.SubHead = styled.span`
  font-size: 14px;
  font-family: Gilroy-Bold;
  color: ${props => props.theme.greyishBrown};
  line-height: 22px;
  margin: 32px 0 10px;
`;

CropperStyled.ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  z-index: 1;
  position: relative;
  margin-top: 97px;
  ${media.webView} {
    transform: translateY(-50%);
    margin-top: 0;
    width: 100%;
    padding: 0 32px;
  }
  .btn-text {
    padding-top: 4px;
  }
  .cropper-buttons {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .upload-button {
    display: none;
  }
  @media (max-width: 831px) {
    margin-top: 10px;
    max-width: 315px;
    flex-wrap: wrap;
  }
  @media (min-width: 832px) {
    transform: translateY(-50%);
  }
`;

CropperStyled.UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;

CropperStyled.CropperCancel = styled.span`
  display: block;
  padding: 11px 25px;
  color: #fff;
  cursor: pointer;
`;

export default CropperStyled;
