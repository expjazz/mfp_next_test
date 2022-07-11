import styled from '@emotion/styled';
import { smallHead } from 'styles/TextStyled';

export const Image = styled.img`
  width: 169px;
  height: 169px;
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  object-fit: cover;
`;

export const SmallHead = styled.span`
  ${smallHead};
  display: block;
  color: ${props => props.theme.greyishBrown};
  text-align: center;
  margin-top: 20px;
`;

export const FooterWrap = styled.span`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  .view-btn {
    margin-right: 10px;
  }
`
export const Layout = styled.section`

`;
