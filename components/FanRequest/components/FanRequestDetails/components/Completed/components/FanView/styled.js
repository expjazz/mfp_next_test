import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import BookingStyled from '../../styled';

const FanViewStyled = styled.div`
  .detail-header {
    font-family: Gilroy-Bold;
    font-size: 14px;
    margin-bottom: 10px;
    width: 100%;
    .detail-head {
      min-width: 50px;
    }
    .detail-desc {
      text-transform: capitalize;
      font-family: Gilroy-Bold;
    }
  }
  .video-footer {
    align-items: center;
    margin-top: 10px;
    width: 100%;
    .star-name {
      margin: 0;
    }
    .book-btn {
      min-height: 25px;
    }
  }
  #comments-scroll-target {
    position: relative !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    margin: 0 !important;
  }
  #comments-scroll-target > section {
    min-height: auto;
  }
  @media (min-width: 832px) {
    height: 100%;
  }
  .action-bar-web {
    display: none;
    @media (min-width: 832px) {
      display: block;
    }
  }
  .action-bar-mob {
    display: block;
    @media (min-width: 832px) {
      display: none;
    }
  }
  .action-list {
    @media (max-width: 831px) {
      border-radius: 0 0 5px 5px;
    }
  }
  .action-list-li {
    :first-child {
      @media (max-width: 831px) {
        border-radius: 0 0 0 5px;
      }
    }

    :last-child {
      @media (max-width: 831px) {
        border-radius: 0 0 5px 0;
      }
    }
  }
  .video-right {
    ${media.modalView} {
      padding-top: 20px;
    }
  }
`;

FanViewStyled.VideoWrapper = styled.div`
  position: relative;
  .player-icon-wrap {
    top: 50%;
    transform: translateY(-50%);
    bottom: unset;
  }
  .video-container {
    box-shadow: none;
    width: 310.3px;
    height: 365.6px;
    ${media.mobileScreen} {
      width: 100%;
    }
    .video-wrap-cus {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    ${props =>
      props.hasReaction &&
      `
      .video-wrap-cus {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    `}
  }
  @media (min-width: 832px) {
    .video-container {
      width: ${props => (props.isPublic ? '320px' : '294px')};
      height: ${props => (props.isPublic ? '413px' : '410px')};
      .video-wrap-cus {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      ${props =>
        props.hasReaction &&
        `
        height: ${props.isPublic ? 'calc(413px - 40px)' : 'calc(410px - 40px)'};
    `}
    }
  }
  .dw-links {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 294px;
    padding-top: 15px;
    ${media.mobileScreen} {
      width: 100%;
    }
    .fa-download {
      font-size: 24px;
      color: ${props => props.theme.flatBlue};
    }
    .download {
      font-size: 12px;
      font-family: Gilroy-Bold;
      padding-left: 10px;
    }
  }
`;

FanViewStyled.DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 20px;
  .more-action-root {
    display: none;
  }
  @media (min-width: 832px) {
    .more-action-root {
      display: block;
    }
  }
`;

FanViewStyled.CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .loader {
    height: 100%;
  }
  .comment-box {
    width: 100%;
  }
  textarea {
    padding: 10px 10px 0;
  }
  .quick-comment {
    border: 1px solid ${props => props.theme.brownGrey};
    border-radius: 50%;
    margin-top: 17px;
  }
`;

const VideoWrapper = styled.section`
  ${FanViewStyled.DetailWrapper} {
    justify-content: center;
    margin-bottom: 16px;
  }
  @media (min-width: 832px) {
    height: 100%;
    ${FanViewStyled} {
      #comments-scroll-target > section {
        @media (max-width: 831px) {
          min-height: 100px;
        }
      }
      #comments-scroll-target {
        position: relative !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        margin: 0 !important;
      }
    }
    ${BookingStyled.CommentList} {
      flex: 1;
    }
  }
`;

export { FanViewStyled as default, VideoWrapper };
