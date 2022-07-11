import styled from '@emotion/styled';

export const ActorContainer = styled.div`
  @media (max-width: 767px) {
    position: relative;
    margin-top: 30px;
  }
`;

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  height: 270px;
  width: 960px;
  position: relative;
  display: block;
  margin: auto;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 320px;
    height: 386px;
    position: relative;
    display: block;
    max-width: 100%;
  }
  p {
    margin: 0;
  }
`;

export const Thumb = styled.img`
  display: block;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${props => props.theme.orangePink};
`;

export const Overlay = styled.div`
  position: absolute;
  display: block;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  background-position: top left;
  z-index: 1;
  background-repeat: repeat;
  background-attachment: scroll;
  border: 1px solid #cccccc;
  border-radius: 50%;
  height: 182px;
  width: 182px;
  padding: 6px;
  top: 45px;
  left: 175px;
  @media only screen and (max-width: 767px) {
    width: 175px;
    height: 175px;
    top: 123px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export const Desc = styled.div`
  color: #555;
  display: block;
  width: 412px;
  position: absolute;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  z-index: 2;
  line-height: 1.5;
  letter-spacing: 0;
  top: 112px;
  left: 364px;
  height: 72px;
  text-align: left;
  text-align-last: left;
  font-style: italic;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 327px;
  }
  @media only screen and (max-width: 767px) {
    width: 287px;
    height: 84px;
    top: 22px;
    left: 16.5px;
    text-align: center;
    text-align-last: center;
    font-size: 14px;
  }
`;

export const ActorOverlay = styled.div`
  position: absolute;
  display: block;
  background-color: #f6f6f6;
  height: 97px;
  width: 538px;
  top: 98px;
  left: 255px;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 460px;
    height: 115px;

  }
  @media only screen and (max-width: 767px) {
    width: 320px;
    height: 131px;
    top: 13px;
    left: 0;
    max-width: 100%;
  }
`;

export const ActorDetail = styled.div`
  color: #686868;
  display: block;
  width: 382px;
  position: absolute;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  z-index: 1;
  line-height: 1.6;
  letter-spacing: 0;
  top: 64px;
  left: 364px;
  height: 25.6px;
  text-align: left;
  text-align-last: left;
  font-style: normal;
  @media only screen and (max-width: 767px) {
    width: 175px;
    height: 76.8px;
    top: 308px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
  }
`;
