import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';
import { media } from '../../styles/mediaQueries';

export const DialogStyled = styled(Dialog)`
  .body {
    min-width: ${props =>
      props.overrideProps && props.overrideProps.width
        ? props.overrideProps.width
        : '310px'};
    height: ${props =>
      props.overrideProps && props.overrideProps.height
        ? props.overrideProps.height
        : 'auto'};
    border-radius: 20px;
  }
  .paperScroll {
    ${media.mobileScreen} {
      max-height: 100%;
    }
  }
`;
