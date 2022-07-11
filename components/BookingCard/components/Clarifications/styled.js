import styled from '@emotion/styled';
import { horizontalPadding } from '../../styled';

export const Wrap = styled.section`
  ${horizontalPadding};
  .description {
    margin-bottom: 13px;
    margin-top: 5px;
  }
  .comment-root {
    margin-bottom: 13px;
    .comment .text-bold + p {
      word-break: break-word;
    }
  }
  .textarea {
    font-size: 12px;
    font-family: Gilroy;
    @media(min-width: 832px) {
      font-size: 14px;
    }
  }
  .clari-btn {
    padding-top: 15px;
  }
`;
