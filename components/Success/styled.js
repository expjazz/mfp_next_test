import styled from '@emotion/styled';

export const Layout = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  .share-page {
    margin-top: 20px;
  }
  &.otp-validate {
    .leftArrow, .close {
      display: none;
    }
    .otpTitle {
      padding-top: 0;
      color: ${props => props.theme.greyishBrown};
    }
  }
  .skip-wrap {
    display: inline-block;
    text-align: center;
    margin-top: 20px;
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Medium;
    cursor: pointer;
  }
  .notf-description {
    font-family: Gilroy-Medium;
  }
  .notf-btn-wrap {
    margin-top: 10px;
  }
  .notf-buttons {
    margin-right: 15px;
  }
  .success-back {
    position: absolute;
    left: 0;
    top: 0;
  }
  .share-page,
  .share-btn,
  .share-btn.share-btn {
    height: 30px;
    min-height: 30px;
    border-radius: 0;
    line-height: 30px;
    min-width: 130px;
  }
  .success-head {
    font-family: Gilroy-Semibold;
  }
`;
