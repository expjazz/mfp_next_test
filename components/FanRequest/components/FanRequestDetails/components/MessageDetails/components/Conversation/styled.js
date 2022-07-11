import styled from '@emotion/styled';

export const Wrapper = styled.div`
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
    padding-top: 10px;
    padding-bottom: 10px;
    @media (min-width: 832px) {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .message-wrap {
    padding-bottom: 10px;
    @media (min-width: 832px) {
      padding-bottom: 10px;
    }
  }
  .user-card {
    @media (min-width: 832px) {
      .note {
        width: 250px;
      }
    }
  }
  .see-full-link {
    display: block;
    text-align: center;
    padding-bottom: 20px;
  }
  .action-parent {
    padding-bottom: 20px;
  }
`;
