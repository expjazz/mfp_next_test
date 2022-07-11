import styled from '@emotion/styled'

export const Bold = styled.h4`
  font-size: 14px;
  font-family: Gilroy-Bold;
  line-height: 21px;
  color: ${props => props.theme.greyishBrown};
  margin-bottom: 31px;
`;

export const Wrap = styled.section`
   .comment-root {
    margin-bottom: 13px;
    .comment-section {
      @media(min-width: 1280px) {
        background: ${props => props.theme.pureWhite};
      }
    }
  }
`;
