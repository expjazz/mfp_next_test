import styled from '@emotion/styled';

export const Main = styled.div`
  background-color: #f6f6f6;
  position: relative;
  display: block;
  padding: 30px 0;

  @media only screen and (max-width: 767px) {
    padding: 30px 15px;
  }
`;

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  margin: auto;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
    padding: 0 15px
  }
  &.features {
    height: 178px;
  }
  &.fulfill {
    height: 100px;
    margin-top: 80px;
  }

  &.receive {
    .wrap-block {
      display: flex;
      margin-left: -30px;

      @media only screen and (max-width: 767px) {
        margin-left: 0;
      }
    }
  }
  p {
    margin: 0;
  }


  .block,
  .wrap-block {
    display: flex;
    flex-wrap: wrap;
  }

  .wrap-block {
    margin-left: -30px;

    @media only screen and (max-width: 767px) {
      flex-direction: column;
      margin-left: 0;
    }
  }

  .block {
    margin-left: 30px;
    justify-content: center;
    margin-bottom: 30px;

    @media only screen and (max-width: 767px) {
      margin-left: 0;
      flex-wrap: nowrap;
      width: 100%;
    }
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    position: relative;
    display: block;
  }
`;

export const Title = styled.div`
  color: #433c3f;
  display: block;
  width: 940px;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0;
  height: 39px;
  font-style: normal;
  text-align: left;
  text-align-last: left;
  margin-bottom: 30px;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 24px;
    font-weight: 700;
    font-style: normal;
  }
`;

export const Feature = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 179px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;

  &.feature2 {
    width: 153px;
  }
  @media only screen and (max-width: 767px) {
    width: 208px;
    text-align: left;
    text-align-last: left;
    font-size: 14px;

    &.feature2 {
      width: 170px;
      height: 63px;
      top: 141px;
      left: 20px;
    }
    &.feature3 {
      width: 190px;
      height: 42px;
      top: 49px;
      left: 110px;
    }
  }
`;

export const FeatureTitle = styled.div`
  color: ${props => props.theme.greyishBrown};
  width: 153px;
  font-family: gilroy;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  height: auto;
  font-style: normal;
  text-align: left;
  text-align-last: left;

  &.connect {
    width: 157px;
    height: 30px;
  }
  &.get-paid {
    width: 126px;
    height: 30px;
  }
  @media only screen and (max-width: 767px) {
    width: 211px;
    height: 30px;
    text-align: left;
    text-align-last: left;
    font-size: 20px;
    &.connect {
      width: 157px;
      top: 110px;
      left: 18px;
      height: 30px;
    }
    &.get-paid {
      width: 211px;
      height: 30px;
      top: 226px;
      left: 109px;
    }
  }
`;

export const FeatureImg = styled.img`
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  height: 82px;
  width: 89px;
  overflow: hidden;
  margin-right: 25px;

  &.get-paid {
    height: 62px;
    width: 86px;
  }
  &.security {
    height: 76px;
    width: 90px;
  }
  @media only screen and (max-width: 767px) {
    width: 89px;
    height: 82px;
    &.get-paid {
      width: 96px;
      height: 66px;
    }
    &.security {
      width: 105px;
      height: 89px;
      order: 2;
      margin-right: 0;
      margin-left: 25px;
    }
  }
`;

export const FulfillTitle = styled.div`
  color: #433c3f;
  display: block;
  width: 936px;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0;
  font-style: normal;
  text-align: left;
  text-align-last: left;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 320px;
    text-align: left;
    text-align-last: left;
    font-size: 24px;
    font-weight: 700;
    font-style: normal;
    max-width: 100%;
  }
`;

export const FulfillSubTitle = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 914px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 252px;
    text-align: left;
    text-align-last: left;
    font-size: 16px;
  }
`;

export const ReceiveImg = styled.img`
  display: block;
  height: 88px;
  width: 118px;
  overflow: hidden;
  margin-right: 25px;

  &.img-next {
    height: 94px;
    width: 112px;
  }
  @media only screen and (max-width: 767px) {
    width: 106px;
    height: 86px;
    &.img-next {
      width: 123px;
      height: 100px;
      order: 2;
      margin-right: 0;
      margin-left: 25px;
    }
  }
`;

export const ReceiveTitle = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 211px;
  font-family: gilroy;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  height: 30px;
  font-style: normal;
  text-align: left;
  text-align-last: left;

  &.next {
    top: 12px;
    left: 643px;
  }
  @media only screen and (max-width: 767px) {
    width: 200px;
    height: 30px;
    top: 136px;
    left: 120px;
    text-align: left;
    text-align-last: left;
    font-size: 20px;
    &.next {
      width: 200px;
      height: 30px;
      top: 7px;
      left: 0px;
    }
  }
`;

export const ReceiveDesc = styled.div`
  color: ${props => props.theme.greyishBrown};
  display: block;
  width: 211px;
  font-family: gilroy;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  &.next {
    top: 43px;
    left: 642px;
  }
  @media only screen and (max-width: 767px) {
    width: 198px;
    height: 63px;
    top: 166px;
    left: 122px;
    text-align: left;
    text-align-last: left;
    font-size: 14px;
    &.next {
      width: 200px;
      height: 63px;
      top: 37px;
      left: 1px;
    }
  }
`;
