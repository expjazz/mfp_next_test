import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  .color-dropdown {
    ${media.webView} {
      padding-bottom: 10px;
    }
  }
`;
