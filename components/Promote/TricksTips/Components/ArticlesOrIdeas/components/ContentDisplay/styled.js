import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { HTMLContentWrapper } from 'styles/CommonStyled'
import { ChildLayout } from '../../styled';


export const Layout = styled(ChildLayout)`
  @media(min-width: 832px) {
    text-align: center;
  }
`;

export const Image = styled.img`
  ${props => props.isIdeas ? `
    width: 65px;
    height: 65px;
  `: `
    width: 100%;
    height: 101px;
  `}
  object-fit: cover;
  margin: 0 auto;
  border-radius: 6px;
  margin-bottom: 10.7px;
  display: block;
  @media(min-width: 832px) {
    ${props => !props.isIdeas && `
      width: 349px;
    `}
  }
`;

export const Heading = styled.span`
  font-size: 24px;
  font-family: Gilroy-Bold;
  line-height: 28px;
  color: ${props => props.theme.orangePink};
  ${props => props.isIdeas && `
    display: block;
    text-align: center;
  `}
`;

export const ContentWrapper = styled(HTMLContentWrapper)`
  margin: 5px 0;
  width: 100%;
  @media(min-width: 832px) {
    text-align: left;
    margin: 10px 0;
  }
  @media(max-width: 832px) {
    p:first-child {
      margin-block-start: 0;
    }
  }
`;
