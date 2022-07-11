import styled from '@emotion/styled';

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  margin: 15px auto 35px;
  display: flex;
  justify-content: center;
  .highlights {
    color: ${props => props.theme.orangePink};
  }
  @media only screen and (max-width: 992px) {
      width: 100%;
      padding: 0 15px;
  }

  .base-plan,
  .classic-plan {
    position: relative;
    width: 283px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
    margin: 0 35px;
    padding: 15px 30px;

    @media only screen and (max-width: 767px) {
      margin: 0 auto;
    }
  }

  @media only screen and (max-width: 767px) {
    width: 320px;
    position: relative;
    flex-direction: column;

    .base-plan {
      margin-bottom: 25px;
    }
  }

  p {
    margin: 0;
  }
  .discount-box {
    border: 1px solid ${props => props.theme.brownGrey};
    border-radius: 5px;
    width: 105px;
    margin: 0 auto 20px;
    padding: 10px 10px 0;
  }
`;

export const Starsona = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 29px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.2;
  background-color: transparent;
  background-image: none;
  text-align: center;
  text-align-last: center;
  font-style: normal;
  color: ${props => props.theme.orangePink};
  @media only screen and (max-width: 767px) {
    background-color: transparent;
    background-image: none;
    font-size: 32px;
  }
`;

export const Desc = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 12px;
  font-weight: normal;
  z-index: 1;
  line-height: 1.2;
  background-color: transparent;
  background-image: none;
  height: 28.8px;
  text-align: center;
  text-align-last: center;
  color: ${props => props.theme.greyishBrown};
  margin-bottom: 20px;
  @media only screen and (max-width: 767px) {
    background-color: transparent;
    background-image: none;
    font-size: 12px;
  }
`;

export const Activate = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 13px;
  font-weight: normal;
  z-index: 1;
  line-height: 1.4;
  background-color: transparent;
  background-image: none;
  text-align: left;
  text-align-last: left;
  @media only screen and (max-width: 767px) {
    background-color: transparent;
    background-image: none;
    width: 221px;
    font-size: 13px;
  }
`;

export const Box = styled.div`
  position: absolute;
  display: block;
  z-index: 1;
  border: 1px solid ${props => props.theme.brownGrey};
  border-radius: 5px;
  height: 65px;
  width: 105px;
  top: 70px;
  left: 250px;
  @media only screen and (max-width: 767px) {
    width: 105px;
    height: 65px;
    top: 58px;
    left: 108px;
    display: block;
  }
`;

export const Percentage = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 44px;
  font-weight: 700;
  z-index: 1;
  line-height: 1.2;
  text-align: center;
  text-align-last: center;
  font-style: normal;
  @media only screen and (max-width: 767px) {
    font-size: 43px;
  }
`;

export const SubTitle = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 10px;
  font-weight: normal;
  z-index: 1;
  line-height: 1.2;
  text-align: center;
  text-align-last: center;

  @media only screen and (max-width: 767px) {
    font-size: 10px;
  }
`;

export const Plus = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 13px;
  font-weight: 400;
  z-index: 1;
  line-height: 3.1;
  background-color: transparent;
  background-image: url(/images/select.png);
  background-position: top left;
  background-repeat: repeat-y;
  background-size: initial;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 25px;
  font-style: normal;
  @media only screen and (max-width: 767px) {
    background-position: top left;
    background-repeat: repeat-y;
    background-size: initial;
    font-size: 0.8125rem;
  }
`;

export const PlusTwo = styled.div`
  display: block;
  width: 231px;
  font-family: gilroy;
  font-size: 13px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.4;
  text-align: left;
  text-align-last: left;
  font-style: italic;
  margin: 15px 0;

  @media only screen and (max-width: 767px) {
    font-size: 13px;
  }
`;

export const PlusTwoFeatures = styled.div`
  display: block;
  width: 203px;
  font-family: gilroy;
  font-size: 13px;
  font-weight: 400;
  z-index: 1;
  line-height: 3.1;
  background-color: transparent;
  background-image: url(/images/select.png);
  background-position: top left;
  background-repeat: repeat-y;
  background-size: initial;
  padding-left: 25px;
  font-style: normal;
  @media only screen and (max-width: 767px) {
    font-size: 0.8125rem;
  }
`;

export const ClassicFeatures = styled.div`
  font-family: gilroy;
  font-size: 13px;
  font-weight: normal;
  z-index: 1;
  line-height: 1.4;
  text-align: left;
  text-align-last: left;
  @media only screen and (max-width: 767px) {
    font-size: 13px;
  }
`;

export const ClassicDesc = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 12px;
  font-weight: normal;
  z-index: 1;
  line-height: 1.2;
  height: 28.8px;
  text-align: center;
  text-align-last: center;
  color: #000000;
  margin-bottom: 15px;
  @media only screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

export const Box2 = styled.div`
  display: block;
  z-index: 1;
  border: 1px solid ${props => props.theme.brownGrey};
  border-radius: 5px;
`;

export const Receives = styled.div`
  font-family: gilroy;
  font-size: 10px;
  font-weight: normal;
  z-index: 1;
  line-height: 1.2;
  text-align: center;
  text-align-last: center;
  @media only screen and (max-width: 767px) {
    font-size: 10px;
  }
`;

export const Classic = styled.div`
  font-family: gilroy;
  font-size: 29px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.2;
  text-align: center;
  text-align-last: center;
  font-style: normal;
  @media only screen and (max-width: 767px) {
    font-size: 32px;
    display: block;
  }
`;

export const ClassicBoxOne = styled.div`
  background-color: #ffffff;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
`;

export const ClassicPlusFeatures = styled.div`
  color: #000000;
  display: block;
  font-family: gilroy;
  font-size: 13px;
  font-weight: normal;
  z-index: 1;
  line-height: 2;
  letter-spacing: 0;

  p {
    margin: 15px 0;
  }

  ul {
    padding: 0;
    list-style: none;
    margin: 0;
  }
  li:not(:first-child) {
    padding-top: 5px;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  li {
    position: relative;
    margin-left: calc(1em + 10px);
    line-height: 20px;

    &::before {
      border-radius: 50%;
      content: '';
      position: absolute;
      left: -23px;
      width: 3px;
      height: 3px;
      bottom: 33%;
      background: #000;
      top: 10px;
    }
  }
  @media only screen and (max-width: 767px) {
    width: 200px;
    height: 181px;
    top: 751.03332519531px;
    left: 60px;
    font-size: 13px;
  }
`;
