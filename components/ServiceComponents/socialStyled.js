import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Wrapper } from './styled';

export const Wrap = styled(Wrapper)`
  height: 100%;
  .note-padding {
    padding-bottom: 20px;
  }
  .info {
    font-family: Gilroy-Semibold;
    padding-bottom: 10px;
    display: block;
  }
  .button-wrp {
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    ${media.modalView} {
      margin-bottom: 20px;
    }
  }
  .socil-icon-wrp {
    padding-right: 0 !important;
    min-width: 30px;
    .social-icon {
      margin-right: 0;
      color: ${props => props.theme.greyishBrown};
    }
  }

  .list-ul-panel {
    flex: 1;
    .check-box {
      margin-bottom: 0;
      padding-top: 0;
    }
    li {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .input-wrp {
    padding-left: 35px;
  }
  .check-box {
    font-family: Gilroy-Semibold;
    color: ${props => props.theme.greyishBrown};
  }

  .content_root {
    padding: 8px 24px 24px 32px;
    padding-left: 45px;
  }

  .acc-wrp {
    height: 100%;
    margin-left: -15px;
    margin-right: -15px;
    ${media.webView} {
      margin: 0;
    }
    ${media.modalView} {
      height: calc(100% - 116px);
    }
  }
`;
