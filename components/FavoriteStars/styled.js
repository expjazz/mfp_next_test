import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const FavouriteStyled = styled.div`
  position: relative;
  padding: 0 17px 20px;
  @media (max-width: 831px) {
    padding: 15px 17px 20px;
  }
  .back-header {
    padding: 0;
    padding-right: 30px;
    ${media.webView} {
      padding-bottom: 15px;
    }
  }
`;

export default FavouriteStyled;
