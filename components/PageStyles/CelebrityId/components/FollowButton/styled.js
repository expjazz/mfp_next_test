import styled from '@emotion/styled';
import SecondaryButton from '../../../../SecondaryButton';

export const FollButton = styled(SecondaryButton)`
  ${props => props.theme.links && `
    color: ${props.theme.links};
    border-color: ${props.theme.links};
  `};
  text-transform: uppercase;
  border-radius: 0;
  display: flex;
  padding-top: 4px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  font-family: Gilroy-Regular;
  min-width: 122px;
  min-height: 30px;
`;
