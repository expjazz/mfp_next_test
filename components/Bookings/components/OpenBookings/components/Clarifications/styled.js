import styled from '@emotion/styled'
import { smallHead } from 'styles/TextStyled';

export const Wrap = styled.section`
  .title {
    ${smallHead};
    display: block;
    margin-bottom: 13px;
  }
  .send-btn {
    margin: 13px auto;
    display: block;
  }
  .textarea {
    font-size: 12px;
    font-family: Gilroy;
    @media(min-width: 832px) {
      font-size: 14px;
    }
  }
  .comment-root {
    margin-bottom: 13px;
    .comment-section {
      @media(min-width: 1280px) {
        /* background: ${props => props.theme.pureWhite}; */
      }
    }
    .comment .text-bold + p {
      word-break: break-word;
    }
  }
`;
