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
  .btn-wrp {
    padding-top: 10px;
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
  .shipping-head {
    margin-top: 0;
  }
  .cus-drop {
    background: ${props => props.theme.pureWhite};
    padding: 0;
    height: auto;
    .drop-icon {
      position: absolute;
      right: 10px;
    }
  }
  .country-drop {
    padding-bottom: 10px;
  }
  .drop-list {
    z-index: 10;
    .drop-custom-scroll {
      max-height: 220px !important;
    }
  }
  .info {
    padding-bottom: 10px;
  }
  .input-container {
    .input-wrapper {
      padding-bottom: 10px;
    }
    .two-input {
      display: flex;
      justify-content: space-between;
      .input-wrapper {
        padding-bottom: 0;
        width: 48%;
      }
      .state-drop {
        width: 48%;
      }
    }
  }
  .info-head {
    padding-top: 15px;
  }
  ${props =>
    props.disabled &&
    `opacity: .4;
     pointer-events: none;
     textarea {
      background: ${props.theme.white};
     }
     .lang-dop-cls, .MuiFormControl, .react-phone-number-input {
      background: ${props.theme.white};
     }
  `}
`;

export const ImageWrap = styled.span`
  position: relative;
  display: block;
  .expand {
    position: absolute;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.16);
    bottom: 10px;
    right: 80px;
    ${media.mobileScreen} {
      right: 15px;
    }
    ${media.largeScreen} {
      right: 20px;
    }
    cursor: pointer;
    z-index: 1;
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
  cursor: pointer;
  margin-bottom: 15px;
  ${media.mobileScreen} {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 20px;
  }
`;
