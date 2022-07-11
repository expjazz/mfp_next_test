import styled from '@emotion/styled';
import { media } from '../../../../../styles/mediaQueries';
// import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.div`
  .list-root {
    margin-top: 10px;
    padding: 0 10px;
  }
  .scroll-list-wrp {
    ${media.mobileScreen} {
      width: 100%;
    }
  }
  .star-root {
    margin-right: 10px;
    width: 75px;
    margin-bottom: 1px;
    .star-image {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      object-fit: cover;
    }
    .star-name {
      font-size: 11px;
      font-family: Gilroy-Semibold;
      color: ${props => props.theme.greyishBrown};
      display: block;
      text-align: center;
      margin-top: 5px;
    }
  }
  @media(min-width: 832px) {
    ${props => props.centerList && `
      .scroll-container {
        width: 100%;
        justify-content: center;
      }
    `};
  }
  @media(min-width: 1280px) {
    .list-root {
      padding: 0;
    }
  }
`;
