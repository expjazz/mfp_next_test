import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const MessageActWrap = styled.section`
  height: 100%;
`;

export const Layout = styled.section`
  height: 100%;
  ${media.largeScreen} {
    height: calc(100% - 40px);
  }
  padding: 4px 15px;
  @media (min-width: 832px) and (max-width: 1279px) {
    height: 100%;
  }
  @media (min-width: 1280px) {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 30px;
  }
  .message-title {
    text-align: center;
    width: 100%;
    display: inline-block;
    padding-bottom: 30px;
    font-family: Gilroy-Regular;
    color: ${props => props.theme.orangePink};
    font-size: 24px;
  }
  .message-wrap {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    &:first-child {
      margin-top: 10px;
    }
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
    @media (min-width: 1280px) {
      padding: 0 15px;
    }
  }
  .action-footer {
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;
  }
  .payment-notfc {
    font-size: 14px;
    color: ${props => props.theme.notfColor};
    font-family: Gilroy-Semibold;
    display: block;
    text-align: center;
    padding-top: 20px;
  }
  .send-btn {
    flex-direction: column;
    align-items: center;
    ${props =>
      props.response ? 'margin-bottom: 15px' : 'margin-bottom: 30px'};
    ${media.largeScreen} {
      margin-bottom: 0;
    }
  }
  .support-action {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  }
  #scrollbar-content-msg {
    ${media.mobileScreen} {
      position: relative !important;
      margin: 0 !important;
      overflow: initial !important;
      height: auto !important;
      min-height: 100% !important;
      max-height: 100% !important;
    }
    ${media.largeScreen} {
      position: relative !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
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

export const CommentsWrapper = styled.section`
  @media (min-width: 832px) and (max-width: 1279px) {
    height: calc(100% - 334px);
  }
  margin-bottom: 15px;
  .scrollbar-content {
    padding: 0 10px;
  }
  .message-list-scroll {
    @media (min-width: 1280px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

export const CommentInput = styled.section`
  display: flex;
  flex-direction: column;
  .message-box {
    width: 100%;
  }
  padding-bottom: 20px;
  .remaining {
    text-align: right;
    padding-top: 5px;
    font-size: 12px;
    font-family: Gilroy;
  }
`;
