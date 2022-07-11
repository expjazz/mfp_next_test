import styled from '@emotion/styled';

export const CarousalWrap = styled.div`
  background: transparent;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  text-align: center;
  outline: none;
  .icon {
    margin-bottom: 10px;
    font-size: 32px;
  }
`;

export const CardWrap = styled.div`
  font-size: 16px;
  color: ${props => props.theme.greyishBrown};
  font-family: Gilroy-Regular;
  background-color: ${props => props.theme.pureWhite};
  padding: 19px;
  padding-bottom: 36px;
  .slick-dots {
    li {
      width: 15px;
      height: 15px;
    }
    li button {
      width: 15px;
      height: 15px;
      padding: 5px 0px;
      &:before {
        width: 15px;
        height: 15px;
      }
    }
  }
  @media(min-width: 832px) {
    background-color: ${props => props.theme.white};
  }
`;
