import styled from '@emotion/styled';

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  display: block;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  align-items: flex-start;

  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
    padding: 0 36px;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    position: relative;
    flex-direction : column;
    padding: 0 15px;
    margin-bottom: 35px;

    .product-blk {
      order: 2;
    }
  }
  p {
    margin: 0;
  }
  .wrap-image {
    width: 182px;
    padding: 6px;
    background: #f6f6f6;
    border: 1px solid #cccccc;
    border-radius: 50%;
    z-index: 9;
  }

  .product-img {
    width: 527px;
    flex: 0 0 527px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    @media only screen and (min-width: 768px) and (max-width: 992px) {
      width: 50%;
      flex: 0 0 50%;
    }

    @media only screen and (max-width: 767px) {
      width: 100%;
      flex: 0 0 auto;
      order: 1;

      img {
        max-width: 100%;
      }
    }
  }

  &.inter,
  &.personalized {
    @media only screen and (min-width: 768px) {
      img {
        order: 1;
      }
      .product-blk {
        order: 2;
      }
    }
  }

  &.main-title {
    margin-bottom: 0;
  }

  &.connect {
    margin: 60px auto;
    align-items: center;

    @media only screen and (max-width: 767px) {
      margin: 35px auto;

      .comment-box {
        order: 1;
      }
      .wrap-image {
        order: 2;
        margin-top: -72px;
      }
    }
  }
  .comment-box {
    width: 515px;
    font-family: gilroy;
    text-align: left;
    text-align-last: left;
    font-style: italic;
    background: #f6f6f6;
    padding: 20px 20px 20px 88px;
    margin-left: -75px;
    min-width: 310px;
    z-index: 5;

    @media only screen and (max-width: 767px) {
      width: 100%;
      margin-left: 0;
      padding-left: 20px;
      padding-bottom: 75px;
    }
  }

    .mob-hidden {
      display: block;
    }
    .show-mob {
      display: none;
    }

    @media only screen and (max-width: 767px) {

      .mob-hidden {
        display: none;
      }
      .show-mob {
        display: block;
        order: 3;
      }
`;

export const Title = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  font-family: gilroy;
  font-size: 50px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  font-style: normal;
  padding: 25px 0 60px;
  @media only screen and (max-width: 992px) {
    width: 100%;
    padding: 30px 0;
    text-align: left;
    text-align-last: left;
    font-size: 31px;
    line-height: 1.1;
  }
`;

export const RedTitle = styled.div`
  color: ${props => props.theme.orangePink};
  display: block;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  font-style: normal;
  text-align: left;
  text-align-last: left;

  @media only screen and (max-width: 767px) {
    text-align: left;
    text-align-last: left;
    font-size: 24px;
  }
`;

export const Description = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  font-family: gilroy;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  width: 100%;

  &.commerec {
    max-width: 448px;
  }

  &.personal {
    max-width: 448px;
  }

  &.fun {
    max-width: 448px;
  }

  &.give {
    max-width: 448px;
  }

  &.respond {
    max-width: 448px;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 16px;

    &.commerec {
      width: 100%;
    }

    &.personal {
      width: 100%;
    }

    &.fun {
      width: 100%;
      font-size: 16px;
    }

    &.respond {
      width: 100%;
      font-size: 16px;
    }

    &.give {
      width: 100%;
      font-size: 16px;
    }
  }
`;

export const VideoImg = styled.img`
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  overflow: hidden;
`;

export const GreyTitle = styled.div`
  color: ${props => props.theme.brownGrey};
  display: block;
  font-family: gilroy;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  height: 31.2px;
  font-style: normal;
  text-align: left;
  text-align-last: left;

  &.social {
    top: 203px;
  }

  @media only screen and (max-width: 767px) {
    text-align: left;
    text-align-last: left;
    font-size: 20px;
  }
`;

export const InterImg = styled.img`
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  display: block;
  border: 1px solid ${props => props.theme.orangePink};
  border-radius: 200px;
  height: 165px;
  width: 165px;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
  }
`;

export const Circle = styled.div`
  display: block;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0);
  background-position: top left;
  background-repeat: repeat;
  background-attachment: scroll;
  border: 1px solid #cccccc;
  border-radius: 99px;
  width: 182px;
  @media only screen and (max-width: 767px) {
    width: 175px;
  }
`;

export const ThumbnailDesc = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 412px;
  z-index: 1;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  font-style: italic;
  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: center;
    text-align-last: center;
    font-size: 14px;
  }
`;

export const ThumbnailBox = styled.div`
  display: block;
  background-color: #f6f6f6;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  width: 538px;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const ThumbnailUser = styled.div`
  color: #686868;
  display: block;
  width: 237px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  font-style: normal;
  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
  }
`;

export const FunImg = styled.img`
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  overflow: hidden;
  max-width: 100%;
`;

export const ImgPersonal = styled.img`
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  overflow: hidden;
  max-width: 100%;
`;

export const CommerecImg = styled.img`
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  overflow: hidden;
  max-width: 100%;
`;

export const MainBtn = styled.span`
  cursor: pointer;
  background-color: ${props => props.theme.flatBlue};
  background-image: none;
  background-position: top left;
  background-repeat: repeat;
  background-attachment: scroll;
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  padding: 8px;
  display: block;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.7;
  overflow: hidden;
  width: 207px;
  text-decoration: none;
  text-align: center;
  text-align-last: center;
  transition: all 0.5s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  @media only screen and (max-width: 767px) {
    width: 207px;
  }
`;
