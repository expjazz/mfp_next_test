import styled from '@emotion/styled';
import BookingStyled from '../../styled';

const StarViewStyled = styled.div`
  #comments-scroll-target {
    position: relative !important;
    margin: 0 !important;
    overflow: initial !important;
    height: auto !important;
    min-height: 100% !important;
    max-height: 100% !important;
  }
  .comment-listing-root {
    background: ${props => props.theme.pureWhite};
  }
  #comments-scroll-target > section {
    height: 100%;
    min-height: auto;
  }
  @media (min-width: 832px) {
    padding: 0 50px;
    display: flex;
    flex-direction: column;
  }
`;

StarViewStyled.VideoWrapper = styled.div`
  position: relative;
  .player-icon-wrap {
    top: 50%;
    transform: translateY(-50%);
    bottom: unset;
  }
  .video-container {
    box-shadow: none;
    width: 250.7px;
    height: 410.9px;
    ${props => props.hasReaction && `
      .video-wrap-cus {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    `}
  }
  @media (min-width: 832px) {
    height: 100%;
    .video-container {
      width: 310.3px;
      height: 100%;
    }
    .video-render-wrap {
      ${props => props.hasReaction && `
        height: calc(100% - 40px);
      `}
    }
  }
`;

StarViewStyled.DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  &:first-child {
    margin-bottom: 8px;
  }
  .title {
    display: block;
  }
`;

StarViewStyled.CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  isolation: isolate;
  align-items: flex-end;
  .loader {
    height: 100%;
  }
  .comment-box {
    width: calc(100% - 50px);
    svg {
      width: 18px;
      height: 18px;
    }
    textarea {
      padding: 10px 10px 0;
    }
  }
  .quick-comment {
    border: 1px solid ${props => props.theme.flatBlue};
    border-radius: 50%;
    .icon-image {
      width: 13px;
      height: 20px;
    }
  }
`;

const VideoWrapper = styled.section`
  ${StarViewStyled.DetailWrapper} {
    justify-content: center;
    margin-bottom: 16px;
  }
  @media(min-width: 832px) {
    height: 100%;
    .comment-listing-root {
      padding-top: 0;
    }
    ${StarViewStyled} {
      padding: 0 30px;
      padding-bottom: 20px;
      #comments-scroll-target {
        position: absolute !important;
        overflow: scroll !important;
        margin-right: -15px !important;
        margin-bottom: -15px !important;
        min-height: initial !important;
        max-height: initial !important;
        & > section {
          padding-right: 16px;
        }
      }
    }
    ${StarViewStyled}, ${BookingStyled.Layout} {
      height: 100%;
    }
    ${BookingStyled.Layout} {
      padding-bottom: 0;
    }
    ${BookingStyled.CommentList} {
      flex: 1;
    }
    ${BookingStyled.RightSection} {
      padding-left: 13px;
    }
  }
`;

export {StarViewStyled as default, VideoWrapper};
