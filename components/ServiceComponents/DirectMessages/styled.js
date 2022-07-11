import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper } from '../styled';

export const Wrap = styled(Wrapper)`
  .input-container {
    padding-left: 35px;
    padding-top: 10px;

    & > section:first-child {
      padding-top: 0;
    }
  }
  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 3px;
      padding-bottom: 0;
    }
  }
  .label-input.error-red {
    color: ${props => props.theme.errorRed};
  }
`;
