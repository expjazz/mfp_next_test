import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  .support-action {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export const Li = styled.li`
  padding-bottom: 15px;
  ${media.webView} {
    padding-right: 140px;
  }
  .message-num {
    font-family: Gilroy-Bold;
    font-size: 16px;
    color: ${props => props.theme.greyishBrown};
    margin-bottom: 6.6px;
    display: block;
  }
  .message-detail {
    min-width: 100px;
    font-size: 16px;
    font-family: Gilroy;
    display: inline-block;
  }
`;
