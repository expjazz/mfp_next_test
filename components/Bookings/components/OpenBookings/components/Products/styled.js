import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 0;
  ${media.largeScreen} {
    padding-left: 35px;
    padding-right: 35px;
    margin-top: 12px;
  }
  .capitalize::first-letter {
    text-transform: uppercase;
  }
  .status-display {
    margin-top: 15px;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .platform-sec {
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
  .req-sec {
    padding-bottom: 30px;
  }
  .link {
    font-size: 16px;
    color: ${props => props.theme.flatBlue};
    line-height: 20px;
    cursor: pointer;
  }
  .note {
    max-width: 260px;
    font-family: Gilroy-Light;
    margin: 0 auto;
    display: block;
  }
  .info {
    font-family: Gilroy-Medium;
    text-align: center;
    padding-top: 10px;
    display: block;
  }
  .close {
    top: 10px;
  }
  .flex-box {
    display: flex;
  }
  .image {
    width: 60px;
    height: 60px;
    margin-top: 0;
    min-width: 60px;
  }
  .input-label-shrink {
    text-align: center;
    transform: none;
    font-family: Gilroy;
    color: #555 !important;
    font-size: 14px;
    line-height: 18px;
    width: 100%;
  }
  .MuiFormControl {
    width: 100%;
    input {
      text-align: center;
      font-size: 18px;
      font-family: Gilroy;
    }
  }
  .float-label {
    width: 100%;
    text-align: center;
    font-family: Gilroy-Light;
  }
  .details {
    padding-top: 10px;
    word-break: break-word;
  }
  .state-drop {
    padding-bottom: 10px;
    padding-top: 10px;
    .cus-drop {
      border: 1px solid ${props => props.theme.veryLightPink};
    }
  }
`;

export const AddressModal = styled.div`
  padding: 41px 20px;
  position: relative;
  border-radius: 20px;
  .address-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .close-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 20px;
    color: ${props => props.theme.flatBlue};
  }
  @media(min-width: 832px) {
    padding: 20px 39px;
  }
`;
