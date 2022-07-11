import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Container = styled.div`
  height: 100%;
`;

export const OptileLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  padding-top: 10px;
  ${media.mobileScreen} {
    display: flex;
  }

  iframe {
    height: 100%;
    width: 600px;
    min-height: 100vh;
    border: none;
    background-color: ${props => props.theme.pureWhite};
    ${media.mobileScreen} {
      border: solid 1px ${props => props.theme.headerGrey};
      margin-top: 10px;
      min-height: 150vh;
      padding: 0 10px;
      padding-top: 10px;
      position: relative;
      width: 100%;
      max-width: 489px;
      margin: 0 auto;
    }
  }
`;
