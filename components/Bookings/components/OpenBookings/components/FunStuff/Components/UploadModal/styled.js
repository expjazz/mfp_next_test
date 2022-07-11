import styled from '@emotion/styled'
import Dialog from '@material-ui/core/Dialog';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.div`
  .hidden-upload {
    display: none;
  }
`;

export const ModalContent = styled.div`
  .back-header {
    padding: 0 15px 15px;
    ${media.webView} {
      padding: 25px 25px 15px;
    }
    .back-lbl-wrp {
      display: block;
    }
  }
  .take-photo-wrp {
    height: auto;
  }
  .buttons {
    flex-direction: column;
    max-width: 160px;
    margin: 0 auto;
    .link-button {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  .upload-err {
    color: ${props => props.theme.errorRed};
    font-family: Gilroy-Bold;
  }
`;

export const DialogStyled = styled(Dialog)`
  .body {
    padding: 15px;
    max-width: 450px;
    background: ${props => props.theme.white};
    ${media.largeScreen} {
      background: ${props => props.theme.pureWhite};
    }
  }
`;
