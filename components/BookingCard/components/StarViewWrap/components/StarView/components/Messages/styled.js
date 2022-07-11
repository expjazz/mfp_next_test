import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Wrapper = styled.section`
  margin: 20px 0;
  ${media.webView} {
    padding: 0 40px;
  }

  .switch {
    display: none;
    ${media.webView} {
      display: block;
    }
  }

  .quick-comment {
    margin-top: 0;
  }

  .detail-wrapper {
    display: flex;
    margin-bottom: 10px;
    .detail-description {
      margin-left: 5px;
    }
  }

  .action-wrapper {
    padding-top: 30px;
    max-width: 310px;
    margin: 0 auto;
    min-height: 210px;
  }

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

  .message-wrap {
    padding-bottom: 10px;
    .message-left {
      border-radius: 0 10px 10px;
      width: 100%;
    }
    .message-right {
      border-radius: 10px 0 10px 10px;
      width: 100%;
    }
  }

  .message-box {
    .input-wrapper {
      height: 90px;
      border: 1px solid ${props => props.theme.borderGrey};
      border-radius: 10px;
      align-items: flex-end;
    }
    .message-text {
      width: 100%;
      padding-top: 10px;
      margin: 3px 3px;
    }
    .message-icon {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }

  .edit-input-wrap {
    padding: 10px 20px 20px 20px;
  }

  .support-action {
    display: flex;
    justify-content: flex-end;
  }

  .edit-btn {
    margin-bottom: 10px;
  }

  .comment-btn {
    border-radius: 10px;
    min-width: auto;
    max-width: 180px;
    min-height: 45px;
    font-size: 16px;
  }
`;

export const Image = styled.span`
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  background: ${props =>
    props.profileImage
      ? `url(${props.profileImage})`
      : 'url(/images/profile.png)'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex: 0 0 40px;
`;
