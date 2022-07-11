import styled from '@emotion/styled';
import { FlexBoxSB } from 'styles/CommonStyled';
import { media } from 'styles/mediaQueries';
import { CardContainer, LeftContent } from '../../styled';

const StarStyled = styled(CardContainer)`
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 18px;
  position: relative;
  cursor: pointer;
  .card-description {
    display: none;
  }
  .commercial.card-description {
    display: initial;
    margin-top: 0;
    display: block;
  }
  .msg-title {
    font-size: 14px;
    .card-description {
      display: inline;
    }
  }
  .heading {
    .activity {
      display: inline-block;
      vertical-align: middle;
      line-height: 30px;
      font-family: Gilroy-Extrabold;
      .activity-btn {
        font-size: 14px;
        cursor: pointer;
      }
      &.flex-justify {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &.desktop {
        display: none;
      }
      &.mobile {
        padding-top: 4px;
      }
      @media (min-width: 832px) {
        font-family: Gilroy;
      }
    }
  }
  .tick-text {
    display: none;
    white-space: nowrap;
    ${media.webView} {
      display: flex;
    }
  }
  .new-hightlight {
      position: relative;
      ${media.largeScreen} {
        height: auto;
        margin: -10px 10px -10px -10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      ${media.uptolargeScreen} {
        margin: -10px -20px 10px -10px;
        width: calc(100% + 25px);
      }
  }
  .icons {
    margin-right: 10px;
    font-size: 19px;
    display: inline-block;
    vertical-align: middle;
    color: ${props => props.theme.orangePink};
    &.icon-comment {
      transform: rotateY(180deg);
    }
    &.icon-rating {
      font-size: 22px;
      margin-right: 6px;
      @media (min-width: 832px) {
        font-size: 24px;
      }
    }
    &.icon-heart {
      color: #ff3636;
      font-size: 23px;
    }
    &.icon-tip {
      width: 23px;
      height: 23px;
      display: inline-block;
      background: ${props => props.theme.orangePink};
      border-radius: 50%;
      color: #fff;
      font-size: 14px;
      text-align: center;
      padding-top: 4px;
      font-family: Gilroy-Regular;
    }
  }
  @media (max-width: 831px) {
    ${props =>
      !props.starMode &&
      props.isNew &&
      `
      padding-top: 27px;
    `};
  }

  @media (min-width: 832px) {
    ${props =>
      !props.starMode &&
      props.isNew &&
      `
      padding-left: 40px;
    `};
  }

  @media (max-width: 1279px) {
    .description {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .action-text {
        font-size: 14px;
        color: ${props => props.theme.flatBlue};
        margin-left: auto;
        margin-bottom: -2px;
        margin-top: 3px;
      }
    }
  }

  @media (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
    padding-top: 18px;
    .description-wrapper {
      ${props =>
        !props.starMode &&
        `
        padding-left: 19.3px;
      `}
      .description {
        cursor: pointer;
        .action-text {
          display: none;
        }
      }
      padding-right: 19.3px;
      .heading {
        display: flex;
        align-items: center;
        .star-name {
          font-family: Gilroy-Bold;
        }
        .activity {
          &.mobile {
            display: none;
          }
          &.desktop {
            display: block;
            line-height: 18px;
          }
        }
      }
    }
    .card-description {
      display: initial;
      margin-top: 9px;
      display: block;
      line-height: 30px;
      font-size: 18px;
      color: ${props => props.theme.flatBlue};

      span {
        line-height: 30px;
        font-size: 18px;
        color: ${props => props.theme.flatBlue};
      }
    }
  }
  // @media (min-width: 832px) and (max-width: 1280px) {
  //   .description-wrapper {
  //     .heading {

  //       & + span {
  //         margin-bottom: 15px;
  //       }
  //     }
  //   }
  // }
`;

StarStyled.LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media(max-width: 832px) {
    margin-bottom: 0;
  }
  .description-wrapper {
    width: 100%;
    @media(max-width: 832px) {
      margin-bottom: 4px;
    }
  }
  .heading {
    width: 100%;

  }
  @media (max-width: 831px) {
    .desktop {
      display: none;
    }
  }
`;

StarStyled.UserImage = styled(LeftContent)`
  display: none;
  background: ${props =>
      props.imageUrl
        ? `url(${props.imageUrl})`
        : 'url(/images/default-cover.jpg)'}
    no-repeat;
  background-position: center center;
  background-size: cover;
  min-width: 69px;
  min-height: 69px;
  ${props =>
    props.starMode
      ? `
    border-radius: 8px;
  `
      : `
    width: 69px;
    height: 69px;
    border-radius: 50%;
  `}
  @media(min-width: 1280px) {
    display: block;
  }
`;

StarStyled.CommentContainer = styled(FlexBoxSB)`
  margin-top: 12.2px;
  justify-content: flex-start;
  @media(max-width: 831px) {
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
  .action-text {
    font-family: Gilroy-Bold;
    font-size: 14px;
    color: ${props => props.theme.flatBlue};
    cursor: pointer;
    position: absolute;
    right: 14px;
    top: 15px;
    @media(max-width: 1279px) {
      top: 20px;
    }
  }
  .comment-section {
    width: 224px;
    background: ${props => props.theme.pureWhite};
    ${props =>
      props.starMode &&
      `
      min-height: 73px;
      width: 209px;
    `}
    overflow: hidden;
    .comment-only {
      height: calc(100% - 16px);
    }
    @media(max-width: 831px) {
      min-height: auto;
      width: 100%;
      max-width: 100%;
      border-radius: 0 5px 5px 5px;
    }
  }
  .divider {
    width: 0;
    height: 71px;
    display: block;
    position: relative;
    border-left: 1px solid #d1d1d1;
    margin-left: 28px;
    @media(max-width: 831px) {
      margin-right: 10px;
    }
    .quick-comment-root {
      width: 28px;
      height: 28px;
      position: absolute;
      left: -15px;
      top: 22px;
      box-shadow: 0 3px 5px 0 rgba(0,0,0,0.06);
      border: solid 1px #e3e3e3;
      border-radius: 50%;
      font-size: 11px;
    }
  }
  @media(min-width: 832px) {
    margin-top: 0;
    align-items: center;
    flex: 0 0 30%;
    .comment-section {
      width: 224px;
    }
  }
  @media(min-width: 832px) and (max-width: 1280px) {
    .comment-section {
      width: 300px;
      max-width: 100%;
    }
    // .action-text {
    //   right: 19px;
    //   top: 15px;
    // }
  }
  @media(min-width: 1280px) {
    .comment-section {
      width: 224px;
      max-width: 100%;
      // height: 73px;
      display: flex;
      flex-direction: column;
      ${props =>
        (props.starMode || props.commercialMode) &&
        `
        width: 267px;
        border-radius: 0 5px 5px 5px;
      `}
      .more-link{
        margin-left: 0;
      }
    }
    .action-text {
      position: static;
      margin-left: 24px;
      white-space: nowrap;
      cursor: pointer;
      ${props =>
        props.starMode &&
        `
        white-space: normal;
      `}
    }
  }
  .review-btn {
    display: none;
    @media(min-width: 1280px) {
      word-break: break-word;
      height: auto;
      line-height: 18px;
      padding: 5px 20px;
      display: block;
      margin-top: 12.5px;
      min-height: auto;
      width: 93px ;
      min-width: 93px;
      margin-left: 25px;
      font-family: Gilroy-SemiBold;
      font-size: 14px;
    }
  }
  .view-suggestion{
    @media(min-width: 1280px) {
    min-width: 78px;
    }
  }
`;

export default StarStyled;
