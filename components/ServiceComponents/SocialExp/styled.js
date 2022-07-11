import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper } from '../styled';

export const Wrap = styled(Wrapper)`
  width: 100%;
  .input-container {
    padding-left: 35px;
  }
  .product-drop {
    padding-top: 10px;
  }
  .drop-list {
    z-index: 1445;
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
  .category-drop {
    padding-top: 10px;
  }
`;
