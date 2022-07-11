import styled from '@emotion/styled';

export const DetailHead = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  display: block;
  color: ${props => props.theme.greyishBrown};
  line-height: 21px;
`;

export const DetailDesc = styled.span`
  font-family: Gilroy;
  font-size: 16px;
  color: ${props => props.theme.greyishBrown};
  line-height: 21px;
  .description-para {
    display: block;
  }
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const DetailWrap = styled.span`
  display: flex;
`;
