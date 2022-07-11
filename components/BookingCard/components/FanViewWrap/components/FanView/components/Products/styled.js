import styled from '@emotion/styled';
// import { media } from 'styles/mediaQueries';
import BookingStyled from '../../../../styled';
import FanViewStyled from '../../styled';

export const Wrapper = styled(FanViewStyled)`
  .detail-header {
    margin-bottom: 0;
  }
  .action-root {
    margin-top: 10px;
    width: 100%;
    @media(min-width: 832px) {
      .action-list-li {
        min-width: 106px;
      }
    }
  }
  @media(min-width: 832px) {
    ${BookingStyled.Layout} {
      flex-direction: column;
    }
  }
`;
