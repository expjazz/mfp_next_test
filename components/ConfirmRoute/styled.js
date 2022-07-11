import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 40px;
  .message {
    font-family: Gilroy-Medium;
    font-size: 18px;
    color: ${props => props.theme.greyishBrown};
  }
  .btnWrap {
    display: flex;
    width: 250px;
    margin: 0 auto;
    justify-content: space-between;
    padding-top: 20px;
    .common-btn {
      width: 120px;
      min-width: 120px;
      height: 30px;
      min-height: 40px;
      border-radius: 5px;
    }
  }
`;
