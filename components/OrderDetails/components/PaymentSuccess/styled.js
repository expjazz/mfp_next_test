import styled from '@emotion/styled';

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  .close-icon {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 34px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
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
  .share-page,
  .share-btn {
    height: 30px;
    min-height: 30px;
    border-radius: 0;
    line-height: 30px;
    min-width: 130px;
    margin-top: 15px;
    margin-right: 0;
  }
  .success-head {
    font-family: Gilroy-Semibold;
    color: ${props => props.theme.greyishBrown};
    font-size: 24px;
    text-align: center;
  }
`;
