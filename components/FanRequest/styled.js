import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

const Layout = styled.div``;

export default Layout;

export const Wrapper = styled.div`
  .tabs-scrollbar-content {
    overflow-x: scroll!important;
    overflow-y: initial!important;
    min-height: 53px;
  }
  .tab-list {
    margin: 0;
    text-align: left;
    white-space: nowrap;
    height: 28px;
    .tab-item {
      font-size: 16px;
      display: inline-block;
      padding-bottom: 5px;
      &:last-child {
        margin-right: 15px;
      }
    }
    .tabs-track-horizontal {
      display: none!important;
    }
    .tab-highlight {
      border-bottom: 3px solid ${props => props.theme.orangePink};
      color: ${props => props.theme.orangePink};
    }
  }
`;
