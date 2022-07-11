import styled from '@emotion/styled'

const PaginationStyled =  styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

PaginationStyled.Details = styled.div`
  font-family: Gilroy-Extrabold;
  font-size: 18px;
  color: ${props => props.theme.boldBrown};
  span {
    color: ${props => props.theme.lightBrown};
  }
  @media(min-width: 832px) {
    margin-right: 31px;
  }
`;

PaginationStyled.ArrowWrapper = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  color: ${props => props.disabled ? props.theme.dashButtonGrey : props.theme.flatBlue};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${props => props.theme.white};
  border: none;
  outline: none;
  svg {
    ${props => props.disabled && `
      opacity: 0.24;
    `}
  }
  &.left-arrow,
  &.right-arrow {
    svg {
      width: 20px;
      height: 20px;
    }
  }
  &.right-arrow svg {
    margin-left: 4px;
  }
  @media(min-width: 832px) {
    &.left-arrow {
      order: 2;
      margin-right: 14px;
    }
    &.right-arrow {
      order: 3;
    }
  }
`;

export default PaginationStyled;
