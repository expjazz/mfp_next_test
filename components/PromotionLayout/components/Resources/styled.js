import styled from '@emotion/styled'
import { css } from '@emotion/react'

const CircleBoxStyles = css`
  display: block;
  background-color: #fff;
  background-image: none;
  background-position: top left;
  background-repeat: repeat;
  background-attachment: scroll;
  border: 1px solid #cccccc;
  border-radius: 50%;
  height: 182px;
  width: 182px;
  padding: 6px;
  @media only screen and (max-width: 767px) {
    width: 175px;
    height: 175px;
  }
`;

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  display: flex;
  margin: auto;
  padding-top: 50px;
  padding-bottom: 30px;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
    padding: 50px 15px 30px;
  }
  &.fan-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 640px;
  }
  &.adler {
    max-width: 640px;
    .comment-box {
      display: flex;
      align-items: center;
      flex: 0 0 50%;
      margin-bottom: 5px;
    }
  }
  &.growth {
    max-width: 640px;
    .growth-content {
      flex: 0 0 50%;
      padding-right: 30px;

      @media only screen and (max-width: 767px) {
        flex: 0 0 100%;
        padding-right: 0;
        order: 2;
        width: 100%;
      }
    }
    .growth-image {
      flex: 0 0 50%;
      margin-left: 30px;

      @media only screen and (max-width: 767px) {
        flex: 0 0 100%;
        margin-left: 0;
        margin-bottom: 15px;
      }
    }
  }
  &.ryan {
    max-width: 640px;
    .ryan-content {
      flex: 0 0 50%;
      display: flex;
      align-items: flex-start;

      @media only screen and (max-width: 767px) {
        margin-bottom: 5px;
      }
    }
  }
  &.education {
    max-width: 640px;

    .education-image {
      margin-right: 30px;

      @media only screen and (max-width: 767px) {
        margin-right: 0;
        margin-bottom: 15px;
      }
    }

    .education-content {
      padding-left: 30px;

      @media only screen and (max-width: 767px) {
        padding-left: 0;
      }
    }
  }
  &.btn {
    max-width: 640px;

    @media only screen and (max-width: 767px) {
      margin-bottom: 30px;
    }
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    padding: 0 15px;
    &.fan-container {
      width: 100%;
      margin-bottom: 50px;
      flex-direction: column;
      align-items: flex-start;
    }
    &.adler {
      flex-direction: column;
      margin-bottom: 50px;
    }
    &.growth {
      flex-direction: column;
      margin-bottom: 50px;
    }
    &.ryan {
      flex-direction: column;
      margin-bottom: 50px;
    }
    &.education {
      flex-direction: column;
      margin-bottom: 30px;
    }
  }
  p {
    margin: 0;
  }
  .resource-image {
    position: relative;
    height: 211px;
    margin-right: 30px;
    flex: 0 0 50%;
    justify-content: flex-end;

    @media only screen and (max-width: 767px) {
      margin: auto auto 20px;
      flex: 0 0 211px;
      width: 226px;
    }
  }
  .resource-content {
    margin-left: 30px;
    flex: 0 0 50%;
    @media only screen and (max-width: 767px) {
      margin-left: 0;
    }
  }
`;

export const Title = styled.div`
  color: ${props => props.theme.greyishBrown};
  width: 886px;
  font-family: gilroy;
  font-size: 50px;
  font-weight: normal;
  line-height: 1;
  letter-spacing: 0;
  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 31px;
    line-height: 1.1;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

export const FanTitle = styled.div`
  color: ${props => props.theme.orangePink};
  display: block;
  width: 403px;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0;
  font-style: normal;
  text-align: left;
  text-align-last: left;

  &:first-letter {
    text-transform: capitalize;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

export const FanDesc = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 391px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  @media only screen and (max-width: 767px) {
    text-align: left;
    text-align-last: left;
    font-size: 16px;
    width: 100%;
  }
`;

export const Image = styled.img`
  position: absolute;
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  height: 211px;
  right: 0;
  overflow: hidden;
  @media only screen and (max-width: 767px) {
    width: 226px;
    height: 211px;
    left: 0;
    top: 0;
  }
`;

export const ImageBox = styled.div`
  position: absolute;
  display: block;
  border: 2px solid ${props => props.theme.orangePink};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.19);
  height: 31px;
  width: 113px;
  top: 141px;
  right: 0;
  @media only screen and (max-width: 767px) {
    width: 113px;
    height: 31px;
    right: 0;
  }
`;

export const SearchIcon = styled.i`
  box-sizing: content-box;
  color: ${props => props.theme.orangePink};
  font-size: 35px;
  font-weight: 400;
  line-height: 1;
  height: 50px;
  width: 50px;
  position: absolute;
  text-align: center;
  text-align-last: center;
  text-decoration: none;
  display: block;
  top: 110px;
  right: -23px;
  @media only screen and (max-width: 767px) {
    width: 50px;
    height: 50px;
    right: -23px;
    font-size: 35px;
  }
`;

export const AdlerImage = styled.img`
  display: block;
  border: 2px solid ${props => props.theme.orangePink};
  border-radius: 50%;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const AdlerBox = styled.div`
  ${CircleBoxStyles};
  z-index: 10;
  @media only screen and (max-width: 767px) {
    top: 21px;
    left: 10px;
  }
`;

export const AdlerSecondBox = styled.div`
  position: absolute;
  display: block;
  background-color: #f6f6f6;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  height: 83px;
  width: 370px;
  top: 77px;
  left: 437px;
  z-index: -1;
  @media only screen and (max-width: 767px) {
    width: 248px;
    height: 109px;
    top: 39px;
    left: 72px;
  }
`;

export const AdlerDesc = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 375px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  font-style: italic;
  background: #f6f6f6;
  padding: 20px 20px 20px 88px;
  margin-left: -75px;
  min-width: 310px;
  z-index: 5;
  @media only screen and (max-width: 992px) {
    width: calc(100% - 116px);
    min-width: inherit;
    text-align: center;
    text-align-last: center;
    font-size: 14px;
  }
`;

export const AdlerDetail = styled.div`
  color: #686868;
  display: block;
  width: 233px;
  flex: 0 0 50%;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0;
  text-align: right;
  text-align-last: right;
  font-style: normal;
  margin-right: 30px;
  @media only screen and (max-width: 767px) {
    width: 140px;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
    order: 2;
  }
`;

export const GrowthTitle = styled.div`
  color: ${props => props.theme.orangePink};
  display: block;
  width: 381px;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  font-style: normal;
  text-align: left;
  text-align-last: left;
  margin-bottom: 15px;
  @media only screen and (max-width: 767px) {
    text-align: left;
    text-align-last: left;
    font-size: 24px;
    width: auto;
  }
`;

export const GrowthDesc = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  font-family: gilroy;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  @media only screen and (max-width: 767px) {
    text-align: left;
    text-align-last: left;
    font-size: 16px;
  }
`;

export const GrowthImg = styled.img`
  display: block;
  height: 211px;
  width: 293px;
  overflow: hidden;
  @media only screen and (max-width: 767px) {
    width: 208px;
    height: 149px;
    top: 9.1999816894531px;
    left: 56px;
  }
`;

export const RyanImg = styled.img`
  display: block;
  border: 2px solid ${props => props.theme.orangePink};
  border-radius: 50%;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const RyanDesc = styled.div`
  color: #686868;
  display: block;
  width: 375px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  font-style: italic;
  background: #f6f6f6;
  padding: 20px 88px 20px 20px;
  margin-right: -75px;
  @media only screen and (max-width: 992px) {
    text-align: center;
    text-align-last: center;
    width: calc(100% - 116px);
  }
`;

export const RyanBox = styled.div`
  ${CircleBoxStyles};
  top: 34px;
  left: 425px;
  @media only screen and (max-width: 767px) {
    top: 177px;
    left: 82px;
  }
`;

export const RyanSecondBox = styled.div`
  position: absolute;
  display: block;
  background-color: #f6f6f6;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  height: 134px;
  width: 477px;
  z-index: -1;
  top: 47px;
  left: 34px;
  @media only screen and (max-width: 767px) {
    width: 320px;
    height: 215px;
    top: 16px;
    left: 0px;
  }
`;

export const RyanDetail = styled.div`
  color: #686868;
  display: block;
  width: 270px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  font-style: normal;
  flex: 0 0 50%;
  margin-left: 30px;
  @media only screen and (max-width: 767px) {
    width: 270px;
    text-align: center;
    text-align-last: center;
    margin-top: 15px;
  }
`;

export const EducationTitle = styled.div`
  color: ${props => props.theme.orangePink};
  display: block;
  width: 337px;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
  top: 57px;
  font-style: normal;
  text-align: left;
  text-align-last: left;
  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 25px;
    margin-bottom: 15px;
  }
`;

export const EducationDesc = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 340px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0;
  height: 120px;
  text-align: left;
  text-align-last: left;
  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 16px;
  }
`;

export const EducationImg = styled.img`
  display: block;
  height: 247px;
  width: 321px;
  overflow: hidden;
  @media only screen and (max-width: 767px) {
    width: 240px;
    height: 184px;
    top: 5.3333435058594px;
    left: 40px;
  }
`;

export const Button = styled.span`
  background-color: ${props => props.theme.flatBlue};
  cursor: pointer;
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
  height: 44px;
  text-decoration: none;
  text-align: center;
  text-align-last: center;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 767px) {
    width: 207px;
    height: 44px;
    top: 20px;
    left: 56px;
  }
`;
