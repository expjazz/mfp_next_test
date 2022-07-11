import styled from '@emotion/styled';
import StarProfileStyled from '../PageStyles/CelebrityId/styled';
// import StarProfileStyled from '../PageStyles/CelebrityId/styled';

const Wrapper = styled.section`
  position: relative;
  .no-bg {
    width: 100%;
    min-height: ${props => (props.banner ? 'auto' : '268px')};
    max-height: 268px;
    background: #000;
    display: block;
  }
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
  border: 2px solid ${props => props.theme.pureWhite};
  @media (min-width: 1280px) {
    width: 235px;
    height: 235px;
    margin-left: 20px;
    border: 4px solid ${props => props.theme.pureWhite};
  }
  img {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
    border: 2px solid ${props => props.theme.pureWhite};
    @media (min-width: 1280px) {
      width: 235px;
      height: 235px;
      margin-left: 20px;
      border: 4px solid ${props => props.theme.pureWhite};
    }
  }
`;

const ProfileImageStarBanner = styled.img`
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
  border: 2px solid ${props => props.theme.pureWhite};
  @media (min-width: 1280px) {
    width: 235px;
    height: 235px;
    margin-left: 20px;
    border: 4px solid ${props => props.theme.pureWhite};
  }
  img {
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.2);
    border: 2px solid ${props => props.theme.pureWhite};
    @media (min-width: 1280px) {
      width: 235px;
      height: 235px;
      margin-left: 20px;
      border: 4px solid ${props => props.theme.pureWhite};
    }
  }
`;



const BannerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: calc(100vw / 3.8);
  @media(min-width: 1019px) {
    height: 268px;
  }
`;

const ProfileWrapper = styled.article`
  ${StarProfileStyled.ContentLimiter};
  margin-top: -75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  position: relative;
  .img-wrp {
    ${props =>
		!props.minimalView &&
      `
      z-index: 14;
    `};
    .prof-cam {
      z-index: 15;
      top: 40px;
      right: -6px;
    }
  }
  ${props => props.isCropping && `
    .prof-cam {
      display: none;
    }
  `};
  .profile-wrp {
    position: relative;
    display: block;
    @media(max-width: 1279px) {
      .prof-cam {
        top: 5px;
      }
    }
  }
  .follow-btn {
    position: absolute;
    right: 10px;
    bottom: 9px;
    min-width: 80px;
  }
  .rating-section {
    position: absolute;
    left: 10px;
    bottom: 15px;
    .rating-star {
      color: ${props => props.theme.starViolet};
      font-size: 18px;
      margin-right: 2px;
    }
    margin-right: 5px;
  }
  @media (min-width: 832px) {
    .follow-btn {
      display: block;
      margin-left: 55px;
    }
  }
  @media (min-width: 1280px) {
    margin-top: -181px;
    padding: 0;
    .img-wrp {
      position: relative;
    }
    flex-direction: row;
    .details-wrap {
      margin-top: 25px;
      display: flex;
      min-height: 80px;
      flex-direction: column;
      align-items: flex-start;
      .rating-section {
        position: static;
        margin-bottom: 12.3px;
        .rate-root {
          display: block !important;
          text-align: center;
        }
        .review-count {
          font-size: 13px;
          color: ${props => props.theme.greyishBrown};
        }
      }
      .follow-btn {
        position: static;
        margin: 0;
        min-width: 95px;
      }
    }
  }
  .fallow-heart {
    position: absolute;
    bottom: 7px;
    left: 0;
    font-size: 19px;
    color: ${props =>
		props.theme.links ? props.theme.links : props.theme.flatBlue};
    cursor: pointer;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  display: block;
  font-size: 0;
  height: calc(100vw / 3.8);
  @media(min-width: 1019px) {
    height: 268px;
  }
`;

export {
	Wrapper,
	ProfileImage,
	BannerImage,
	ProfileWrapper,
	BannerWrapper,
	ProfileImageStarBanner
};
