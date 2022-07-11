import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.div`
  padding-top: 50px;
  text-align: center;

  ${media.webView} {
    padding: 50px 0 50px;
  }
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ${media.webView} {
      margin-top: 20px;
    }
    button {
      min-width: 200px;
    }
  }
  button:last-of-type {
    margin-top: 10px;
  }
  .try-again {
    display: block;
    text-align: center;
    padding-top: 10px;
  }
`;
