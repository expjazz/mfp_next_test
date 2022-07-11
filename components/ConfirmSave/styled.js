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
    justify-content: center;
    padding-top: 20px;
    .confirm-btn-styles {
      margin-right: 10px;
      min-width: 110px;
    }
  }
`;
