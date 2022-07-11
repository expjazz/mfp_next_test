import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.section`
  padding: 10px;
  ${media.webView} {
    padding: 0 40px;
  };
  .date {
    padding-bottom: 20px;
    display: block;
    font-family: Gilroy;
    color: ${props => props.theme.greyishBrown};
    .date-val {
      font-family: Gilroy-Medium;
    }
  }
  .action-wrapper {
    max-width: 310px;
    margin: 0 auto;
    ${props =>
      props.actionTabActive ? 'min-height: 230px' : 'min-height: auto'};
  }

  .support-action {
    display: flex;
    justify-content: flex-end;
  }
`;
