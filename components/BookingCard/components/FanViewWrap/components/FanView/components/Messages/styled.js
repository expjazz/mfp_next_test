import styled from '@emotion/styled';
import { Wrapper as Wrap } from '../styled';
import { horizontalPadding } from '../../../../styled';

export const Wrapper = styled(Wrap)`
  padding: 0;
  padding-top: 10px;
  height: 100%;
  .booking-video {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
  .message-container {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
  .msg-contnet-wrp {
    ${horizontalPadding};
    padding-top: 10px;
    padding-bottom: 10px;
    @media (min-width: 832px) {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .message-wrap {
    ${horizontalPadding};
    padding-bottom: 10px;
    @media (min-width: 832px) {
      padding-bottom: 10px;
    }
  }
  .user-card {
    ${horizontalPadding};
    @media (min-width: 832px) {
      .note {
        width: 250px;
      }
    }
  }
`;
