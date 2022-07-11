import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';
import { media } from '../../styles/mediaQueries';

export const DialogStyled = styled(Dialog)`
  .body {
    width: 700px;
    height: ${props =>
      props.overrideProps && props.overrideProps.height
        ? props.overrideProps.height
        : '700px'};
    max-width: 100%;
    border-radius: 20px;
    max-height: 700px;
    @media screen and (min-width: 832px) and (max-height: 720px) {
      max-height: 650px;
    }

    ${media.mobileScreen} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 0;
      display: block;
    }
  }
  .paperScroll {
    ${media.mobileScreen} {
      max-height: 100%;
    }
  }
  .service-close {
    ${media.webView} {
      top: 30px;
      z-index: 111;
    }
  }
`;
