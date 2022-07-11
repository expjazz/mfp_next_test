import styled from '@emotion/styled'
import { css} from '@emotion/react'


export const maxWidth = css`
  max-width: 960px;
  margin: 0 auto;
  @media(max-width: 992px) {
    max-width: 96%;
  }
  @media(max-width: 767px) {
    max-width: 100%;
    padding: 0 15px;
  }
`;

export const Wrapper = styled.div`
  margin-top: 150px;
  @media(min-width: 768px) {
    margin-top: 0;
  }
`;
