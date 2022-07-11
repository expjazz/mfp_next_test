import styled from '@emotion/styled';
import AvatarContainer from 'components/StarBlock/styled';
import HomeStyled from 'components/PageStyles/V3Home/styled';
export const PriceBold = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
`;

export const Discount = styled.span`
  color: ${props => props.theme.orangePink};
  padding-right: 5px;
  ${AvatarContainer.Price} & {
    font-weight: normal;
    font-size: 11px;
  }
  ${HomeStyled} & {
    font-weight: normal;
    font-size: 11px;
  }
`;

export const PriceWrap = styled.span`
  font-size: 14px;
  align-items: center;
  font-family: Gilroy-Bold;
`;
