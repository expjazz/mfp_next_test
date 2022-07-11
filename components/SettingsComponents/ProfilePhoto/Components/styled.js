import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  .modal-head {
    padding-top: 30px;
    text-align: center;
    color: ${props => props.theme.orangePink};
    font-size: 24px;
    font-family: Gilroy;
    ${media.webView} {
      padding-top: 50px;
    }
  }
  .crop-wrap {
    margin-top: 20px;
  }
  .crop-head {
    padding-top: 70px;
    ${media.webView} {
      padding-top: 0;
    }
  }
  .back-header {
    padding: 15px 15px 15px;
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
`;
