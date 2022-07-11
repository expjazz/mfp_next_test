import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';
import { media } from '../../styles/mediaQueries';

export const DialogStyled = styled(Dialog)`
  .body {
    border-radius: 5px;
    max-height: 100%;
    max-width: 100%;
    margin: 20px;
  }
  .service-close {
    ${media.webView} {
      top: 30px;
      z-index: 111;
    }
  }
`;

export const ImageEl = styled.img`
  ${props => props.dims && props.dims.width && `
    width: ${props.dims.width}px;
    height: ${props.dims.height}px;
  `}
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .pre-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    /* color: ${props => props.theme.pureWhite}; */
    box-shadow: 0px 0px 5px 2px rgb(0 0 0 / 50%);
    width: 30px;
  }
  .img-wrapper {
    width: 100%;
    max-height: calc(100vh - 70px);
    max-width: 100%;
    font-size: 0;
  }
`;
