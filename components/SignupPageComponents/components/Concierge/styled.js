import styled from '@emotion/styled';

export const ConciergeConatiner = styled.div`
  padding: 30px 0;

  .show-mob {
    display: none;
  }
  .hide-mob {
    display: block;
  }

  @media (max-width: 767px) {
    padding-top: 0;

    .show-mob {
      display: block;
    }
    .hide-mob {
      display: none;
    }
  }
`;

export const FirstImgCont = styled.div`
  position: relative;
`;

export const Conatiner = styled.div`
  width: 90%;
  margin: 0 auto;
  @media (max-width: 992px) {
    width: 96%;
    position: relative;
  }
  @media (max-width: 767px) {
    width: 100%;
    padding: 0 15px;
    position: relative;
  }
`;

export const MainBtn = styled.a`
  background-color: ${props => props.theme.orangePink};
  border-radius: 5px;
  box-sizing: border-box;
  color: #fff;
  padding: 10px;
  display: block;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.3;
  overflow: hidden;
  width: 245px;
  -webkit-text-decoration: none;
  text-decoration: none;
  z-index: 1;
  text-align: center;
  text-align-last: center;
  display: block;
  margin: 7px auto 20px;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 767px) {
    margin-top: 25px;
  }
`;

export const MainP = styled.p`
  color: ${props => props.theme.greyishBrown};
  display: block;
  font-family: gilroy;
  font-size: 30px;
  font-weight: 400;
  z-index: 100000;
  line-height: 1.3;
  letter-spacing: 0;
  font-style: normal;
  text-align: center;
  text-align-last: center;
  display: block;
  margin: 30px auto 18px auto;
  @media (max-width: 767px) {
    font-size: 1.4em;
    width: 300px;
  }
`;

export const ImgsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;


  img {
    margin-right: 15px;
  }
  @media (min-width: 767px) and (max-width: 992px) {
    justify-content: flex-end;
    img {
      width: 160px;
      height: auto;
    }
  }
  @media (max-width: 767px) {
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    display: block;
    position: relative;
    width: 330px;
    margin: 0 auto;
    padding-bottom: 30px;
    height: 485px;
    padding-top: 0;
    order: 2;
    max-width: 100%;

    img {
      position: absolute;
    }
    img:first-child {
      width: 226px;
      height: 445px;
      left: 0;
      display: block;
      bottom: 20px;
    }
    img:nth-child(2) {
      width: 119px;
      height: 236px;
      bottom: 95px;
      left: 210px;
      z-index: 2;
      display: block;
    }
    img:nth-child(3) {
      width: 119px;
      height: 234px;
      bottom: 5px;
      left: 179px;
      display: block;
    }
  }
  @media (max-width: 320px) {
    img:nth-child(2) {
      left: inherit;
      right: 0px;
      margin-right: 0;
    }
    img:nth-child(3) {
      left: inherit;
      right: 25px;
      margin-right: 0;
    }
  }
  @media (max-width: 375px) {
    img {
      width: 70px;
      height: auto;
    }
  }
`;
export const BannerWrraper = styled.div`
  position: relative;

  @media (max-width: 967px) {
    display: flex;
    flex-direction: column;
  }

`;
export const KenziContainer = styled.div`
  position: absolute;
  top: 12%;
  left: -152px;
  img {
    border-radius: 50%;
    border: 1px solid ${props => props.theme.orangePink};
  }

  @media (min-width: 767px) and (max-width: 992px) {
    img {
      width: 120px;
      height: 120px;
    }
  }
  @media (max-width: 767px) {
    position: relative;
    top: inherit;
    left: inherit;
    right: inherit;
    margin: auto;
    width: 167px;
    img {
      width: 167px;
      height: 167px;
    }
  }
`;

export const KendiDesc = styled.div`
  @media (max-width: 767px) {
    position: relative;
    top: inherit;
    text-align: center;
    left: inherit;
    width: 150px;
  }
`;

export const KenziP = styled.p`
  font-weight: bold;
  color: #333;
  margin: 181px 0 0 40px;
  font-size: 14px;
  width: 103px;
  i {
    display: block;
    font-weight: 400;
    color: #777;
  }
  @media (max-width: 767px) {
    color: #686868;
    margin: 9px 0;
    font-family: gilroy;
    width: auto;
    font-size: 16px;
    font-weight: 700;
    z-index: 2;
    letter-spacing: 0;
  }
`;

export const KenziCircle = styled.div`
    position: absolute;
    z-index: 2;
    background-color: rgba(0,0,0,0);
    border-radius: 99px;
    height: 182px;
    width: 182px;
    top: -9px;
    left: -10px;

    div {
      position: relative;
      width: 185px;
      height: 185px;

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: -10px;
        left: -10px;
        width: 100%;
        height: 100%;
        background: transparent;
        border: 1px solid #ccc;
        padding: 0;
        border-radius: 50%;
        right: 0;
      }

      img {
        width: 165px;
        height: 165px;
      }
    }

    @media only screen and (max-width: 763px) {
      width: 182px;
      height: 182px;
      top: inherit;
      left: inherit;
      position: relative;
    }
    @media (min-width: 767px) and (max-width: 992px) {
      height: 140px;
      width: 140px;
      top: -10px;
      left: -11px;
    }
`;

export const PrimaryBtn = styled.a`
  background-color: #cee8f0;
  border-radius: 5px;
  box-sizing: border-box;
  color: #555;
  padding: 10px;
  display: block;
  font-family: lato;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.3;
  width: 173px;
  -webkit-text-decoration: none;
  text-decoration: none;
  z-index: 3;
  text-align: center;
  text-align-last: center;
  display: block;
  margin: 25px auto;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 767px) {
    left: 0;
    position: relative;
    top: inherit;
    margin-top: 0;
    right: inherit;
  }
`;
