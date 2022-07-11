import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  .support-action {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  }
`;

export const Ul = styled.ul``;

export const Li = styled.li`
  padding-bottom: 13px;
  .message-num {
    font-family: Gilroy-Semibold;
    font-size: 14px;
    color: ${props => props.theme.greyishBrown};
    margin-bottom: 6.6px;
    display: block;
  }
  .message-detail {
    min-width: 100px;
    font-family: Gilroy;
    display: inline-block;
  }
`;
