import styled from '@emotion/styled';

const VideoPublicStyled = styled.div`
  margin-top: 120.52px;
  .comment-list > div {
    display: flex;
    & > div {
      width: 100%;
    }
  }
  @media(min-width: 1280px) {
    margin-top: 120.52px;
    height: auto;
  }
  @media(max-width: 1279px) {
    background: #f6f6f6;
    margin-top: 70px;
  }
  .comment-section-wrap {
    background: ${props => props.theme.pureWhite};
  }
  .manage-user-header {
    @media(max-width: 1279px) {
      height: 70px;
    }
  }
  .footer-wraper {
    position: relative;
    z-index: 99;
  }
  .publicvideo-scroll {
    width: 101% !important;

    .comment-section {
      width: calc(100% - 62px);
      padding: 10px 8px 10px 10px;

      .comment > span {
        flex: 1;
      }

      .action-button {
        margin-left: 5px;
      }
    }
  }
`;

VideoPublicStyled.StarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 30px;
  left: 30px;
  bottom: 0;
  //z-index: 100;

  @media (max-width: 1023px) {
    display: none;
  }
`;

VideoPublicStyled.RatingWrapper = styled.div`
  display: none;
  margin-bottom: 15px;
  .rating-heading {
    font-family: Gilroy-Regular;
    font-size: 12px;
    color: #3c3c3c;
  }
  @media(min-width: 1280px) {
    display: block;
  }
`;

VideoPublicStyled.TitleWrapper = styled.div`
  width: auto;
  margin: 0 auto;
  background: none;
  position: relative;
  z-index: 10;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  width: 875px;

  @media(max-width: 1279px) {
    background: #f6f6f6;
    padding-top: 25px;
    width: 100%;
  }

  & > div {
    margin-bottom: 0;
    display: flex;
    justify-content: center;
  }

  h1 {
    line-height: 40px;
    font-weight: normal;
    font-family: Gilroy-'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    max-width: 85%;
    margin-bottom: 10px;

    @media(max-width: 1279px) {
      font-size: 30px;
      line-height: 34px;
      background: #f6f6f6;
      padding: 0 15px;
      width: 100%;
    }
  }
`;

VideoPublicStyled.DashBorder = styled.div`
  position: absolute;
  left: 0;
  top: 138px;
  height: 218px;
  border: 2px dashed ${props => props.theme.orangePink};
  border-radius: 16px 16px 0 0;
  border-bottom: none;
  width: 100%;
  right: 0;
  margin: 0 auto;

  @media (min-width: 832px) {
    max-width: 806px;
  }
  @media (min-width: 1280px) {
    max-width: 905px;
  }

  @media (max-width: 1279px) {
    display: none;
  }
`;

VideoPublicStyled.PageWrapper = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
  background: #f6f6f6;
  margin-top: 15px;
  min-height: 70.6vh;

  @media (max-width: 1279px) {
    margin-top: 0;
    padding-top: 0;
    margin-top: -15px;
    min-height: auto;
  }

`;

VideoPublicStyled.Row = styled.div`
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0 auto;

  @media (min-width: 1280px) {
    max-width: 1055px;
  }

  @media (max-width: 1279px) {
    max-width: 100%;
    padding: 0 15px;
    width: 100%;
    background: #f6f6f6;
    max-width: 600px;
  }
`;

VideoPublicStyled.Width288Block = styled.div`
  z-index: 10;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 29%;
  max-height: 600px;
  background: #f6f6f6;

  &.profile-wrapper {
    margin-top: 32px;

    @media (max-width: 1279px) {
      order: 2;
      margin-top: 15px;
    }
  }

  @media (max-width: 1279px) {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;

    @media (max-width: 1279px) {
      order: 3;
      padding-bottom: 10px;
    }
  }
`;

VideoPublicStyled.TabSwitcher = styled.span`
  display: block;
  cursor: pointer;
  font-family: Gilroy-Medium;
  color: ${props => props.theme.flatBlue};
  ${props => props.selected && `
    color: #555;
    font-family: Gilroy-Bold;
    margin-top: -1px;
  `}
  ${props => props.disabled && `
    pointer-events: none;
  `}
  &.reaction-video {
    margin-right: 10px;
  }
  &.star-video {
    margin-left: 10px;
  }
`;

VideoPublicStyled.Inner100perMin576Block = styled.div`
  z-index: 2;
  -ms-flex: 1 1 418px;
  flex: 1 1 418px;
  flex-direction: column;
  position: relative;
  min-height: 606px;
  display: flex;
  align-items: center;
  .video-switcher {
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    color: ${props => props.theme.brownGrey};
  }
  .close-btn {
    top: 7px;
    left: -45px;
    @media (max-width: 600px) {
      top: -12px;
      left: 0;
    }
  }
  @media (max-width: 1279px) {
    order: 1;
  }
  .player-icon-wrap {
    top: calc(50% - 36px);
  }
  @media (max-width: 1279px) {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 30px;
    max-height: 80vh;
    min-height: 60vh;
    margin-bottom: 20px;
    & > section > div > div {
      padding: 15px;
    }
  }
`;

VideoPublicStyled.VideoWrapper = styled.section`
    max-width: 418px;
    width: 100%;
    height: 100%;
    position: relative;
    ${props => props.isReaction && `
      & > div {
        @media (max-width: 600px) {
          margin-top: 20px;
        }
      }
    `}
    & > div {
      width: 100%;
      height: 100%;
    }
    & > div > div {
      padding: 32px;
      background-color: #fff;
      box-shadow: none;
    }

`;

VideoPublicStyled.Profile = styled.div`
  width: 100%;
  @media (max-width: 1279px) {
    display: flex;
    align-items: flex-start;
    position: relative;
    padding-bottom: 25px;
    padding-right: 42px;
  }
`;

VideoPublicStyled.ProfileAvatar = styled.div`
  width: 164px;
  height: 164px;
  @media(min-width: 1280px) {
    position: relative;
  }
  @media (max-width: 1279px) {
    width: 45px;
    height: 45px;
    margin-right: 15px;
  }

  img {
    z-index: 3;
  }
`;

VideoPublicStyled.Proffession = styled.div`
  margin: 15px 10px 15px 0;
  .category-item {
    cursor: pointer;
  }
  @media (max-width: 1279px) {
    display: none;
  }

  span {
    font-family: Gilroy;
    font-size: 21px;
    font-weight: normal;
    line-height: 29px;
    letter-spacing: normal;
    text-align: left;
    color: ${props => props.theme.twilight};
    line-height: 29px;
  }
`;

VideoPublicStyled.ProfileFavorite = styled.span`
  float: right;
  margin-top: -25px;
  margin-right: -10px;
  color: ${props => props.theme.flatBlue};
  cursor: pointer;
  position: relative;
  z-index: 9;
  @media (max-width: 1279px) {
    position: absolute;
    right: 25px;
    top: 25px;
  }
`;

VideoPublicStyled.Label = styled.span`
  @media(max-width: 1279px) {
    display: none;
  }
  position: absolute;
  left: 0;
  top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding-top: 3px;
  font-family: Gilroy-Bold;
  background: ${props => props.theme.orangePink};
  width: 51px;
  height: 24px;
  font-size: 17px;
`;

VideoPublicStyled.AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

VideoPublicStyled.ProfileNameWrapper = styled.span`
  display: block;
  width: 100%;
  @media (max-width: 1279px) {
    width: calc(100% - 45px);
  }
`;

VideoPublicStyled.ProfileName = styled.h1`
  font-family: 'Avenir-Medium';
  font-size: 55px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.theme.twilight};
  margin-bottom: 10px;
  width: 100%;
  @media (max-width: 1279px) {
    font-size: 24px;
    line-height: 28px;
  }
`;

VideoPublicStyled.ProfileInterests = styled.div`
  margin-top: 13px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1279px) {
    display: none;
  }
`;

VideoPublicStyled.ProfileInterest = styled.div`
  padding: 1px 15px 0px;
  margin-bottom: 8px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 15px;
  border: 1px solid ${props => props.theme.orangePink};
  background-color: #ffffff;
  color: ${props => props.theme.orangePink};
  text-transform: capitalize;
  font-family: 'Gilroy-Medium';
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: normal;
`;

VideoPublicStyled.ProfileLink = styled.div`
  margin-top: 15px;
  a {
    color: ${props => props.theme.flatBlue};
    font-family: 'Gilroy';
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: normal;
  }
  @media (max-width: 1279px) {
    position: absolute;
    bottom: 10px;
    left: 58px;
  }
`;

VideoPublicStyled.Comment = styled.div`
  padding-left: 32px;
  z-index: 3;
  height: 100%;
  .dw-links {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 294px;
    padding-top: 15px;
    @media(max-width: 831px) {
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
  @media (max-width: 1279px) {
    padding-left: 0;
  }
`;

VideoPublicStyled.CommentShowLove = styled.div`
  .action-dropbar {
    background: white;
  };
  border-radius: 10px;
  background-color: #ffffff;
`;

VideoPublicStyled.CommentBody = styled.div`
  height: 100%;
  max-height: 521px;
  @media (max-width: 1279px) {
    height: 35vh;
  }
`;

export default VideoPublicStyled;


export const PaymentPopup = styled.section`
  height: 100%;
  .scroll-section-payment {
    height: calc(100% - 80px);
  }
`;
