import styled from '@emotion/styled';

export const ArtistContainerDiv = styled.div`
  padding-bottom: 50px;

  @media (max-width: 767px) {
    padding-bottom: 0;
  }
`;

export const GridCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gab: 50px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    /* width: 75%;
    margin: 0 28px auto; */
  }
  @media(min-width: 992px) {
    grid-template-columns: 1.5fr 1fr;
    &.align-fix {
      grid-template-columns: 0.9fr 1fr;
    }
  }
`;

export const ArtistBtn = styled.div`
  color: ${props => props.theme.orangePink};
  display: block;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 700;
  z-index: 1;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  font-style: normal;
  text-align: left;
  text-align-last: left;
  display: block;
  padding-top: 60px;
  @media (max-width: 767px) {
    padding: 0;
    font-size: 25px;
    max-width: 300px;
    p {
      margin: 0;
    }
  }
`;

export const ArtistCompare = styled.a`
  border-radius: 4px;
  box-sizing: border-box;
  color: ${props => props.theme.flatBlue};
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 0;
  display: block;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 1.3;
  overflow: hidden;
  width: 204px;
  height: 29px;
  text-decoration: none;
  z-index: 1;
  text-align: left;
  text-align-last: left;
  display: block;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 767px) {
    position: absolute;
    bottom: -42px;
    left: 65px;
    transform: translateX(-34%);
    &.cameo-link {
      position: static;
      transform: none;
    }
  }
`;

export const Artist = styled.div`
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  background-color: #fff;
  background-image: none;
  position: relative;
  display: block;
  margin: 25px 0;
  &.right-thumb {
    .img-thumb-right {
      margin-right: -33px;
      left: -12px;
    }
    .right-pd {
      padding-left: 15px;
      p {
        width: 270px;
      }
    }
    .show-mob {
      display: block;
    }
    .hide-mob {
      display: none;
    }
    @media (max-width: 767px) {
      .img-thumb-right {
        margin-right:0;
        left: inherit;
        top: inherit;
        background: #fff;
        border-radius: 50%;
      }
      .right-pd {
        padding: 0 67px 0 6px;
        width: calc(100% - 110px);
        word-break: break-word;
        display: flex;
        min-height: auto;
        margin-right: -58px;
      }
      .show-mob {
        display: block;
      }
      .hide-mob {
        display: none;
      }
    }
    @media (min-width: 768px) and (max-width: 992px) {
      .right-pd {
        margin-right: -75px;
        margin-left: 0;
        padding-right: 60px;
        display: flex;
        align-items: center;
      }
    }
  }
  &:last-child ${ArtistBtn} {
    margin-top: 10px;
  }

  @media (max-width: 767px) {
    margin: 25px 0;
    margin-bottom: 30px;
    &.right-thumb ${GridCol} {
      display: flex;
      flex-direction: column-reverse;
      padding-bottom: 46px;
    }
    &.right-thumb ${ArtistBtn} {
      margin-top: 0;
    }
    &.right-thumb ${ArtistCompare} {
      position: relative;
      bottom: 0;
    }
  }
  @media(min-width: 992px) {
    &.right-thumb {
      .img-thumb-right {
        left: -42px;
      }
    }
  }
`;

export const ArtistLink = styled.a`
  background-color: #cee8f0;
  border-radius: 5px;
  box-sizing: border-box;
  color: ${props => props.theme.greyishBrown};
  padding: 8px;
  display: block;
  font-family: lato;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.3;
  overflow: hidden;
  position: absolute;
  width: 158px;
  height: 35px;
  text-decoration: none;
  z-index: 1;
  text-align: center;
  text-align-last: center;
  right: 40px;
  bottom: -15px;
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 767px) {
    right: 15px;
    bottom: -20px;

    &.show-mob {
      right: 0;
      left: 0;
      margin: auto;
      bottom: inherit;
      margin-top: 15px;
    }
  }

  @media (max-width: 320px) {
    right: 14px;
  }
`;

export const ArtistLinkText = styled.div`
  display: block;
  width: 100%;
  z-index: 1;
  display: block;
`;

export const ArtistText = styled.div`
  color: #555;
  display: block;
  width: 233px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.5;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  height: 96px;
  text-align: left;
  text-align-last: left;
  font-style: italic;
  display: block;
  background: #f6f6f6;
  padding: 8px;
  display: block;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: 100%;
  padding-left: 65px;
  margin-top: 16px;
  position: relative;
  min-height: 120px;


  &.right-pd ${ArtistLink} {
    left: 40px;
    right: inherit;
  }

  @media (max-width: 320px) {
    p {
      font-size: 14px;
    }
  }
  @media (max-width: 767px) {
    width: calc(100% - 110px);
    min-height: 117px;
    height: auto;
    text-align: center;
    text-align-last: center;
    font-size: 13px;
    display: block;
    margin-bottom: auto;
    margin-top: 20px;
    padding-left: 57px;
    padding-right: 10px;
    padding-top: 15px;
    &.right-pd {
      margin-top: 35px;
      p {
        padding-top: 25px;
        padding-bottom: 25px;
      }
    }
    &.right-pd ${ArtistLink} {
      top: 233px;
      left: 120px;
    }
  }
  p.right-star-desc {
    padding-bottom: 15px;
  }
  @media(min-width: 992px) {
    p.right-star-desc {
      width: 260px;
      padding-bottom: 20px;
    }
  }
  @media (min-width: 768px) and (max-width: 992px) {
    margin-left: -40px;
    padding-left: 105px;
  }
`;

export const ArtistImg = styled.img`
  z-index: 1;
  border-top: 1px solid ${props => props.theme.orangePink};
  border-left: 1px solid ${props => props.theme.orangePink};
  border-right: 1px solid ${props => props.theme.orangePink};
  border-bottom: 1px solid ${props => props.theme.orangePink};
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  height: 165px;
  width: 165px;
  overflow: hidden;
  display: block;

  @media (max-width: 767px) {
    height: 145px;
    width: 145px;
  }
`;

export const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  position: relative;
  max-width: 960px;
  width: 100%;
  @media (max-width: 992px) {
    max-width: 96%;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0 15px;
  }
`;

export const ArtistDesc = styled.div`
  color: #555;
  display: block;
  max-width: 370px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.5;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  display: block;
  p {
    max-width: 363px;
  }
  @media(max-width: 400px) {
    p {
      width: auto;
    }
  }
  @media (max-width: 767px) {
    width: 100%;
    max-width: 100%;
    p {
      margin: 5px 0;
      max-width: 100%;
    }
  }
  @media (max-width: 375px) {
    font-size: 14px;
    width: 280px;
  }
`;

export const ArtistJob = styled.div`
  color: #686868;
  display: block;
  width: 188px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  z-index: 1;
  line-height: 1.6;
  letter-spacing: 0;
  height: 50px;
  text-align: left;
  text-align-last: left;
  font-style: normal;
  display: block;
  margin-left: 80px;
  p:first-child {
    margin: 16px 0 0;
  }
  p:nth-child(2) {
    margin: 0;
    font-weight: normal;
  }
  &.right-article-job {
    display: block;
    text-align-last: unset;
    margin-right: 95px;
    width: auto;
    text-align: right;
    @media (max-width: 767px) {
      text-align: center;
      width: 100%;
      margin-left: 0;
      margin-top: -20px;
      height: auto;
    }
  }

  @media (max-width: 767px) {
    font-size: 14px;
    margin-left: 0;
    width: 100%;

    p {
      width: 100%;
      text-align: center;
      text-align-last: center;
    }
  }
`;

export const LeftThumb = styled.div`
  margin: 0;
  &.apply-margin {
    margin-left: 50px;
  }
  @media (max-width: 767px) {
    margin: 0 auto auto 0;
    &.apply-margin {
      margin-left: 0;
    }
  }
`;

export const ThumbnailContainer = styled.div`
  margin-top: 50px;
  display: flex;
  @media (max-width: 767px) {
    width: 100%;
    margin: 20px auto;
    max-width: 385px;
  }
`;

export const ArtistThumb = styled.div`
  margin-right: -50px;
  z-index: 2;
  position: relative;
  padding: 10px;
  width: 183px;
  height: 183px;
  border-radius: 50%;
  background: #fff;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: 1px solid #ccc;
    padding: 0;
    border-radius: 50%;
    right: 0;
  }
  @media (max-width: 992px) {
    margin-top: 20px;
  }
  @media (max-width: 767px) {
    margin-top: 14px;
    margin-left: 0;
    width: 163px;
    height: 163px;
  }
`;
