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
`;

export const Center = styled.div`
  width: 600px;
  margin: 0 auto;
  ${media.mobileScreen} {
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    border-right: none;
  }
  .sub-head {
    font-family: Gilroy-Bold;
    font-size: 16px;
    display: block;
    color: ${props => props.theme.greyishBrown};
    line-height: 22px;
    padding-bottom: 5px;
  }
  .sub-desc {
    font-size: 12px;
    padding-top: 10px;
  }
  .sub-head {
    font-family: Gilroy-Bold;
    font-size: 16px;
    display: block;
    color: ${props => props.theme.greyishBrown};
    line-height: 22px;
    padding-bottom: 5px;
  }
  .sub-gap {
    padding-top: 10px;
  }
  .sub-desc {
    font-size: 12px;
    padding-top: 10px;
  }
  .upload-btn {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .social-head {
    text-transform: uppercase;
  }
  .btn-wrp {
    padding-top: 20px;
  }
  .head-gap {
    padding-bottom: 2px;
  }
  ${props =>
    props.disabled &&
    `opacity: .4;
     pointer-events: none;
     textarea {
      background: ${props.theme.white};
     }
     .lang-dop-cls, .MuiFormControl {
      background: ${props.theme.white};
     }
  `}
`;

export const Image = styled.img`
  object-fit: cover;
  width: 352px;
  display: block;
  margin: 0 auto;
  padding-bottom: 15px;
  position: relative;
  ${media.mobileScreen} {
    width: 100%;
    padding-bottom: 20px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  padding-top: 15px;
`;

export const ImageSpan = styled.span`
  position: relative;
  border-radius: 5px;
  background: ${props => `
    url(${props.image}) rgba(0, 0, 0, 0.35)
  `};
  background-blend-mode: multiply;
  width: 120px;
  height: 120px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .close {
    right: 15px;
    top: 10px;
  }
`;
