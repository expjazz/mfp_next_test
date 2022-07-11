import styled from '@emotion/styled';

export const HeadingBold = styled.span`
  font-family: Gilroy-Semibold;
  font-size: 18px;
  color: ${props => (props.secondary ? '#fff' : props.theme.flatBlue)};
`;
