import styled from '@emotion/styled';

export const LabelWrap = styled.span`
  display: flex;
  color: #fe6b57;
  font-family: Gilroy-Semibold;
  font-size: 12px;
  align-items: center;
  svg {
    color: ${props => props.theme.flatBlue};
  }
`;

export const Text = styled.span`
  transform: rotateZ(-10deg);
  padding-left: 5px;
  padding-bottom: 5px;
  line-height: 14px;
`;
