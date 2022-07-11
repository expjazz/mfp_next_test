import styled from '@emotion/styled';
import Drawer from '@material-ui/core/Drawer';
import { media } from 'styles/mediaQueries';

export const Wrap = styled(Drawer)`
  color: ${props => props.theme.greyishBrown};
  font-size: 16px;
  &.drawer-root {
    top: 66px;
    ${media.mobileScreen} {
      z-index: 1500;
    }
  }
  .drawer-paper {
    z-index: 1600;
    width: 314px;
    background-color: ${props => props.theme.white};
    top: 61px;
  }
  .back-drop {
    top: 61px;
  }
`;
