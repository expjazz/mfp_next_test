import styled from '@emotion/styled';

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 960px;
  position: relative;
  margin: 0 auto 60px;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 96%;
    padding: 0 36px;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin: ${props => props.isLoggedIn ? '0 auto 10px' : '0 auto 35px'};
    padding: 0 15px;
  }
`;

export const Title = styled.div`
  color: #555;
  display: block;
  width: 858px;
  font-family: gilroy;
  font-size: 50px;
  font-weight: 400;
  z-index: 1;
  line-height: 1;
  letter-spacing: 0;
  display: block;
  position: relative;
  top: inherit;
  padding: 30px 0 15px;
  order: 1;

  p {
    margin: 0;
  }
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    height: auto;
    text-align: left;
    text-align-last: left;
    font-size: 31px;
    line-height: 1.1;
    display: block;

  }
`;

export const MainBtn = styled.span`
  background-color: ${props => props.theme.flatBlue};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 8px;
  display: block;
  cursor: pointer;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.3;
  overflow: hidden;
  width: 206px;
  height: 44px;
  -webkit-text-decoration: none;
  text-decoration: none;
  text-align: center;
  text-align-last: center;
  position: relative;
  margin: 0;
  order: 3;
  color: #fff;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 763px) {
    width: 230px;
    height: 50px;
    top: inherit;
    left: inherit;
  }
`;

export const BtnDiv = styled.div`
  position: absolute;
  top: 28%;
  left: 0;
  width: 100%;
  z-index: 1;
  display: block;
`;
export const Desc = styled.div`
  color: #555;
  width: 742px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
  position: relative;
  text-align: left;
  text-align-last: left;
  padding-bottom: 15px;
  order: 2;
  p {
    margin: 0;
  }
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    height: auto;
    text-align: left;
    text-align-last: left;
    font-size: 16px;
  }
`;
