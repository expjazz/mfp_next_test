import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Form, Wrapper } from '../styled';

export const FormContainer = styled(Form)``;

export const Wrap = styled(Wrapper)`
  width: 100%;
  ${media.webView} {
    width: 398px;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .profile-image {
      width: 219px;
      height: 219px;
      display: block;
      border-radius: 50%;
      background: ${props =>
        props.imageUrl
          ? `url(${props.imageUrl})`
          : `url(/images/fan-profile-pic.svg)`};
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      margin-bottom: 34px;
    }

    .icon {
      cursor: pointer;
      font-size: 19px;
      &.take-picture {
        margin-bottom: -3px;
      }
      &.upload-picture {
        margin-bottom: -2px;
      }
    }
  }
  .save-btn {
    margin-top: 16px;
  }
  .sub-head {
    padding-bottom: 20px;
    &:before {
      content: attr(data-mob);
      ${media.webView} {
        content: attr(data-web);
      }
    }
  }
`;

export const UploadWrap = styled.span`
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
  margin-bottom: 20px;
  margin-right: 10px;
  &:hover {
    background-color: ${props => props.theme.flatBlue};
    color: #ededed;
  }
  & > svg {
    margin-right: 5px;
  }
`;
export const UploadInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
`;
