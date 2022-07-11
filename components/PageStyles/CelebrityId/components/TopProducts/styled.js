import styled from '@emotion/styled';
import { media } from '../../../../../styles/mediaQueries';
// import { media } from '../../../../styles/mediaQueries';

export const Wrap = styled.article`
  .featured-heading {
    padding: 0 10px;
    margin-bottom: 10px;
  }
  .price-bold, .price-wrap {
    font-size: 16px;
    line-height: 21px;
  }
  .start-btn {
    font-family: Gilroy-Bold;
    font-size: 14px;
  }
  .star-products {
    ${media.tabletMobile} {
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
    }
  }
`;
