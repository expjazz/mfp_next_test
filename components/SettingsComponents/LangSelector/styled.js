import styled from '@emotion/styled';
import { Container, Wrapper } from '../styled';

export const Layout = styled(Container)`
  height: inherit;
`;

export const Wrap = styled(Wrapper)`
  .action-btn {
    margin: 0 auto;
    display: block;
  }
`;

export const DropItem = styled.li`
  margin-bottom: 25px;
`;

export const DropHeading = styled.span`
  font-family: Gilroy-Bold;
  font-size: 18px;
  margin-bottom: 5px;
`;

export const DropWrapper = styled.ul`
  margin-top: 15px;
  .drop-custom-scroll {
    max-height: 180px !important;
  }
  .cus-drop {
    margin-bottom: 5px;
  }
`;
