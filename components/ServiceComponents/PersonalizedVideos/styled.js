import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper } from '../styled';

export const Wrap = styled(Wrapper)`
  .list-item-msg {
    padding-bottom: 20px;
    :last-child {
      padding-bottom: 0;
    }
  }

  #personalized-scroll {
    @media (min-width: 1280px) {
      position: relative !important;
      overflow: hidden !important;
    }
    @media (max-width: 831px) {
      position: relative !important;
      overflow: hidden !important;
    }
  }

  .input-container-vdo {
    padding-top: 5px;
    @media (max-width: 831px) {
      padding-left: 0;
    }
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
  .btn-pad {
    padding-top: 0;
  }
`;
