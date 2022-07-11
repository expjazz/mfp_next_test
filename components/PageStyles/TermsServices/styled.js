import styled from '@emotion/styled';
import { largeHeading, smallHead, descStyles } from 'styles/TextStyled';
import { media } from 'styles/mediaQueries';

export const Content = styled.article`
  padding: 10px 0;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Wrap = styled.section`
  padding: 15px;
  padding-top: ${props => `${props.headerHeight ? props.headerHeight : 60}px`};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  @media(min-width: 832px) {
    padding-top: ${props => `${props.headerHeight ? props.headerHeight : 126}px`};
  }
  .wrap-content {
    flex: 1 1 auto;
  }
  .heading {
    ${largeHeading};
    padding: 40px 0 20px;
    color: ${props => props.theme.orangePink};
    margin: auto;
    ${media.mobileScreen} {
      padding: 20px 0;
    }
  }
  strong {
    ${smallHead};
    margin-bottom: 5px;
  }
  p {
    ${descStyles};
    margin-bottom: 15px;
  }
  li {
    list-style-type: inherit;
  }
  .footer-root {
    display: block;
  }
`;
