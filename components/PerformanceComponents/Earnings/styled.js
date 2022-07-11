import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper } from '../styled';

export const Wrap = styled(Wrapper)`
  width: 100%;

  .title {
    ${media.mobileScreen} {
      padding-top: 15px;
    }
  }
`;
