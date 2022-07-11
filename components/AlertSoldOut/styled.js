import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding-top: 5px;
  .fa-telegram-plane {
    font-size: 24px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
  }
`;

export const Message = styled.span`
  font-family: Gilroy-Bold;
  color: ${props => props.theme.errorRed};
`;
