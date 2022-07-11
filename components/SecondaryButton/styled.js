import styled from '@emotion/styled';

const disabledStyles = isDisabled => {
  if (isDisabled) {
    return `
      opacity: 0.3;
      pointer-events: none;
    `;
  }
};

const ButtonStyled = styled.button`
  ${props => disabledStyles(props.isDisabled)};
  ${props => disabledStyles(props.disabled)};
  background-color: ${props =>
    props.secondary
      ? props.theme.pureWhite
      : props.theme.links || props.theme.flatBlue};
  font-family: Gilroy-Semibold;
  font-size: 16px;
  color: ${props =>
    props.secondary
      ? props.theme.links || props.theme.flatBlue
      : props.theme.pureWhite};
  max-width: 100%;
  border: 1px solid;
  border-color: ${props => props.theme.links || props.theme.flatBlue};
  min-width: 150px;
  min-height: 40px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  :hover,
  :focus {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  }
  &:active {
    ${props =>
      props.secondary
        ? `
      border-color: ${props.theme.greyishBrown};
      color: ${props.theme.greyishBrown};
    `
        : `
      background-color: ${props.theme.greyishBrown};
    `}
  }
`;

export default ButtonStyled;
