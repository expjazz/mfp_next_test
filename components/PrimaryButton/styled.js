import styled from '@emotion/styled';

const disabledStyles = (isDisabled) => {
  if (isDisabled) {
    return `
      opacity: 0.3;
      pointer-events: none;
    `;
  }
};

const ButtonStyled = styled.button`
  ${props => disabledStyles(props.isDisabled)};
  background-color: ${props => props.secondary ? '#fff' : props.theme.flatBlue};
  font-family: Gilroy-Bold;
  font-size: 14px;
  padding: 5px 30px;
  min-height: 60px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  line-height: 24px;
  color: ${props => props.secondary ? props.theme.flatBlue : '#fff'};
  max-width: 100%;
  border: ${props => `1px solid ${props.theme.flatBlue}`};
  min-width: 242px;
  outline: none;
  cursor: pointer;
  :hover, :focus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }
  &:active {
    color: #fff;
    background-color: ${props => props.theme.greyishBrown};
    border-color: ${props => props.theme.greyishBrown};
  }
  @media(min-width: 375px) {
    width: 300px;
  }
`;

export default ButtonStyled;
