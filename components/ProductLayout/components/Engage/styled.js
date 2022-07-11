import styled from '@emotion/styled';

export const ContentWrapper = styled.div`

`;

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  display: block;
  margin: auto;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 96%;
    padding: 0 36px;
  }
  @media (max-width: 767px) {
    width: 100%;
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
    position: relative;
    flex: 1 0 50%;
    width: 50%;
    overflow: hidden;
    min-height: 620px;

    @media (max-width: 763px) {
      flex: 0 0 100%;
      width: 330px;
      min-height: 215px;
      margin: 0 auto;
      max-width: 100%;
    }
  }

`;

export const Title = styled.div`
  color: ${props => props.theme.orangePink};
  display: block;
  width: 403px;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 700;
  z-index: 1;
  line-height: 1.3;
  letter-spacing: 0;
  font-style: normal;
  text-align: left;
  text-align-last: left;
  display: block;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    text-align: left;
    text-align-last: left;
    font-size: 24px;
    display: block;
  }
`;

export const Features = styled.div`
  color: #555;
  display: block;
  width: 415px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  z-index: 2;
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
    padding-right: 0;
  }
`;

export const Desk = styled.div`
  color: #999;
  display: block;
  width: 344px;
  font-family: gilroy;
  font-size: 18px;
  font-weight: 400;
  z-index: 2;
  line-height: 1.3;
  letter-spacing: 0;
  margin-bottom: 30px;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ImageDesign = styled.img`
  position: absolute;
  display: block;
  z-index: 2;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  height: 368px;
  width: 325px;
  top: 0;
  right: 0;
  overflow: hidden;
  &.funst {
    z-index: 2;
    height: 337px;
    width: 286px;
    top: 286px;
    left: 0;
  }
  @media only screen and (max-width: 763px) {
    width: 138px;
    height: 156px;
      left: 0;
    &.funst {
      width: 183px;
      height: 215px;
      right: 0;
      left: inherit;
      top: 0;
    }
  }
`;
