import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Footer = styled.footer`
  ${media.mobileScreen} {
    display: flex;
    flex-direction: column;
    padding: 0 15px 20px;
    align-items: center;
  }
  padding: 0 50px 50px;
  line-height: 32px;
  font-size: 14px;
  font-family: Gilroy;
  color: ${props => props.theme.greyishBrown};
  .acnt,
  .cmpny {
    font-family: Gilroy-Semibold;
  }
  .cmpny {
    line-height: 21px;
  }
  .logo-wrp {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .link-wrp {
    display: flex;
    justify-content: space-between;
  }
  .terms {
    display: flex;
    flex-direction: column;
    padding-left: 150px;
  }
  .links {
    display: flex;
    cursor: pointer;
  }
  .divider {
    padding-left: 10px;
    padding-right: 10px;
  }
  .logo {
    display: flex;
  }
`;

export const Logo = styled.img`
  width: 129px;
`;
