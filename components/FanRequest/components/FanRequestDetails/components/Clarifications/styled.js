import styled from '@emotion/styled';

export const Wrap = styled.div`
  .description {
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
    .comment .text-bold + p {
      word-break: break-word;
    }
  }
`;
