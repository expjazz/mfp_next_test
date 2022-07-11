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
    padding-left: 10px;
    padding-right: 10px;
  }
  .desc-sub {
    padding-bottom: 10px;
  }
  .sub-head {
    font-family: Gilroy-Bold;
    font-size: 14px;
    display: block;
    color: ${props => props.theme.greyishBrown};
    line-height: 22px;
    padding-bottom: 10px;
  }
  .sub-desc {
    font-size: 12px;
    line-height: 16px;
    padding-top: 10px;
  }
  .upload-btn {
    margin-bottom: 10px;
    margin-top: 6px;
  }
  .btn-wrp {
    padding-top: 20px;
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

export const ImageWrap = styled.span`
  position: relative;
  display: block;
  .expand {
    position: absolute;
    bottom: 10px;
    z-index: 1;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);
    right: 80px;
    ${media.mobileScreen} {
      right: 15px;
    }
    ${media.largeScreen} {
      right: 20px;
    }
    cursor: pointer;
    color: #000;
  }
  ${media.mobileScreen} {
    width: 200px;
    margin: 0 auto;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 352px;
  height: 352px;
  ${media.largeScreen} {
    width: 600px;
  }
  display: block;
  margin: 0 auto;
  margin-bottom: 15px;
  cursor: pointer;
  position: relative;
  ${media.mobileScreen} {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 20px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
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
