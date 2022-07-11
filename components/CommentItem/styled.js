import styled from '@emotion/styled';
import { media } from '../../styles/mediaQueries';

const CommentStyled = styled.div`
  display: inline-block;
  width: 100%;
`;

CommentStyled.Container = styled.div`
  display: flex;
  /* align-items: flex-start; */
  ${props =>
    !props.receive &&
    `
    flex-direction: row-reverse;
  `}
  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 39px;
    text-align: center;
    padding-top: 10px;
    cursor: pointer;
    color: ${props => props.theme.flatBlue};
    .mesg {
      font-size: 8px;
      text-transform: uppercase;
      padding-top: 4px;
      font-family: Gilroy-Medium;
    }
  }
`;

CommentStyled.ProfileImage = styled.span`
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  background: ${props =>
    props.profileImage
      ? `url(${props.profileImage})`
      : 'url(images/profile.png)'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex: 0 0 40px;
`;
CommentStyled.CommentWrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.msgBubble};
  ${props => props.receive && `background-color: ${props.theme.white}`};
  border-radius: 5px;
  position: relative;
  ${props =>
    props.receive
      ? `
    border-top-left-radius: 0;
    margin-left: 15.2px;
  `
      : `
    border-top-right-radius: 0;
    margin-right: 15.2px;
  `}
`;
CommentStyled.Comment = styled.span`
  padding: 10px;
  display: block;
  position: relative;
  ${props =>
    !props.visible &&
    `
    opacity: 0.5;
  `}
  .hidden-header {
    display: block;
    text-align: center;
    color: #999;
    font-size: 12px;
    font-family: Gilroy-Bold;
  }
  .more-link {
    font-family: Gilroy-Medium;
    text-transform: uppercase;
    font-size: 14px;
    color: ${props => props.theme.flatBlue};
    margin-left: 5px;
    cursor: pointer;
  }
  .comment {
    font-family: Gilroy;
    font-size: 14px;
    color: #3c3c3c;
    display: block;
    line-height: 16px;
    overflow: hidden;
    margin-bottom: 3px;
    .text-bold {
      font-family: Gilroy-SemiBold;
      font-size: 14px;
      color: ${props => props.theme.lightBlack};
      & + p {
        display: inline;
        line-height: 15px;
      }
      &.user-name {
        margin-right: 5px;
        font-family: Gilroy-Bold;
        line-height: 18px;
      }
      &.amount {
        font-size: 16px;
      }
    }
    &.comment-only {
      @media (min-width: 832px) {
        .user-name {
          font-size: inherit;
        }
      }
    }
    &.reaction {
      display: flex;
      font-size: 14px;
      .icon-heart {
        color: #ff3636;
        width: 27px;
        height: 23px;
        display: none;
        margin-right: 10px;
        @media (min-width: 832px) {
          display: block;
        }
      }
      .text-bold {
        line-height: 15px;
      }
      .action-button {
        margin-left: auto;
      }
      @media (min-width: 832px) {
        font-size: 12px;
      }
    }
    &.tip {
      font-family: Gilroy-Semibold;
      font-size: 14px;
      line-height: 17px;
      color: ${props => props.theme.lightGrey};
      .title {
        font-size: 14px;
        font-family: inherit;
        @media (min-width: 832px) {
          font-size: inherit;
        }
      }
      .user-name {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }
      .text-bold {
        font-family: Gilroy-Bold;
        line-height: 17px;
        margin-top: 5px;
        display: block;
      }
    }
    .rating {
      font-size: 17px;
      label {
        padding: 0;
      }
    }
    .action-button {
      width: auto;
      min-width: auto;
      min-height: auto;
      padding: 0 15px;
      line-height: 16px;
      max-height: 30px;
      font-size: 12px;
      font-family: Gilroy-Extrabold;
      ${media.mobileScreen} {
        width: 65px;
      }
    }
    .text-description {
      font-family: Gilroy-Light;
      font-size: 12px;
      display: block;
    }
    .title {
      font-family: Gilroy-Regular;
      font-size: 12px;
      display: block;
    }
  }
  .comment-footer {
    display: flex;
    margin-top: 0;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .more-action-root {
      width: 10px;
      height: 10px;
      margin-top: -7px;
      .more-action-icon {
        width: 10px;
        height: 10px;
        min-width: auto;
        border: none;
      }
    }
    .time {
      font-family: Gilroy-Medium;
      font-size: 10px;
      line-height: 15px;
      color: ${props => props.theme.lightGrey};
    }
  }
  .edit-lbl {
    cursor: pointer;
    font-size: 12px;
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Semibold;
  }
  .reaction-wrap {
    position: relative;
    .reaction-img,
    .video-render-wrap {
      width: 100%;
      object-fit: contain;
    }
    .close-reaction {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      z-index: 11;
    }
  }
`;

CommentStyled.Hide = styled.span`
  font-size: 12px;
  font-family: Gilroy;
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  color: ${props => props.theme.flatBlue};
`;

CommentStyled.Figure = styled.figure`
  background-image: ${props => `url(${props.src})`};
  background-position: 0.2% 92.8826%;
  margin: 0;
  max-width: 245px;
  max-height: 245px;
  object-fit: cover;
  ${media.webView} {
    max-width: 225px;
    max-height: 225px;
  }
  img:hover {
    opacity: 0;
  }
  img {
    transition: opacity 0.5s;
    display: block;
    width: 100%;
  }
  background-position: 50% 50%;
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
`;

export default CommentStyled;
