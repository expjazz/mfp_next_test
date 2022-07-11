import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.div`
  ${media.mobileScreen} {
    .pay-container {
      padding-left: 15px;
      padding-right: 15px;
    }
    .payment-details, .payment-heading {
      padding: 0 15px;
    }
  }
`;
