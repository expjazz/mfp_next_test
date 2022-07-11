import styled from '@emotion/styled';

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  margin: auto;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 96%;
    padding: 0 36px;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    height: auto;
    position: relative;
    display: block;
  }

  p {
    margin: 0;
  }
  .content-wrapper {
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 763px) {
      flex-direction: column;
    }
  }

  .text-wrapper {
    flex: 1 0 50%;

    @media (max-width: 767px) {
      width: 100%;
      padding: 0 15px;
    }
  }

  .image-wrapper {
    display: none;
    flex: 0 0 50%;
    width: 50%;
    overflow: hidden;
    min-height: 620px;
    position: relative;

    @media (max-width: 763px) {
      flex: 0 0 100%;
      width: 330px;
      min-height: 465px;
      margin: 30px auto 0;
      max-width: 100%;
    }
  }
`;

export const Title = styled.div`
  color: ${props => props.theme.orangePink};
  display: block;
  width: 413px;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 700;
  z-index: 1;
  line-height: 1.3;
  letter-spacing: 0;
  font-style: normal;
  text-align: left;
  text-align-last: left;
  padding: 30px 0 10px;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }

  @media only screen and (max-width: 763px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 24px;
  }
`;

export const ContentWrapper = styled.div`
  color: #555;
  display: block;
  width: 415px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: left;
  text-align-last: left;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 763px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 16px;
  }
`;

export const SubTitle = styled.div`
  color: #999;
  display: block;
  width: 397px;
  font-family: gilroy;
  font-size: 18px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.3;
  letter-spacing: 0;
  padding-bottom: 25px;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }

  @media only screen and (max-width: 763px) {
    width: 100%;
    font-size: 18px;
  }
`;

export const Image = styled.img`
  position: absolute;
  display: block;
  z-index: 1;
  border: 3px solid #ccc;
  border-radius: 200px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  height: 125px;
  width: 125px;
  top: 408px;
  left: 45px;
  overflow: hidden;
  @media only screen and (max-width: 763px) {
    width: 125px;
    height: 125px;
    top: 327px;
    left: 0;
    right: inherit;
  }

  &.MMartin {
    z-index: 1;
    height: 166px;
    width: 166px;
    top: 150px;
    left: 46px;
    @media only screen and (max-width: 763px) {
      width: 166px;
      height: 166px;
      top: 75px;
      left: 150px;
      right: inherit;
    }
  }

  &.dee {
    z-index: 2;
    height: 125px;
    width: 125px;
    top: 295px;
    left: 12px;
    @media only screen and (max-width: 763px) {
      width: 125px;
      height: 125px;
      top: 275px;
      left: 191px;
      right: inherit;
    }
  }

  &.Mikaela {
    z-index: 3;
    height: 200px;
    width: 200px;
    top: 290px;
    left: 120px;
    @media only screen and (max-width: 763px) {
      width: 200px;
      height: 200px;
      top: 176px;
      left: 37px;
      right: inherit;
    }
  }
  &.Gem {
    z-index: 4;
    height: 189px;
    width: 189px;
    top: 34px;
    left: 143px;
    @media only screen and (max-width: 763px) {
      width: 189px;
      height: 189px;
      top: 10px;
      left: 5px;
      right: inherit;
    }
  }
`;

export const TeamTitle = styled.div`
  color: #686868;
  display: block;
  width: 89px;
  position: absolute;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  z-index: 1;
  line-height: 1.6;
  letter-spacing: 0;
  top: 255px;
  left: 235px;
  height: 25.6px;
  text-align: left;
  text-align-last: left;
  font-style: normal;
  @media only screen and (max-width: 763px) {
    width: 89px;
    height: 25.6px;
    top: 40px;
    left: 190px;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
    right: inherit;
  }
`;
