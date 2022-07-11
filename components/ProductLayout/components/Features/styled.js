import styled from '@emotion/styled';

export const FeaturesContainer = styled.div`
  background-color: #f6f6f6;
  p {
    margin: 0;
  }

  @media only screen and (max-width: 763px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  margin: auto;
  padding: 30px 0;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    width: 100%;
  }
  @media only screen and (max-width: 763px) {
    width: 320px;
    height: ${props => (props.isLoggedIn ? '240px' : '333px')};
    position: relative;
    display: block;
    max-width: 100%;
  }
`;

export const MainBtn = styled.a`
  background-color: #f6f6f6;
  border-radius: 5px;
  box-sizing: border-box;
  color: ${props => props.theme.flatBlue};
  padding: 8px;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.3;
  overflow: hidden;
  width: 211px;
  height: 44px;
  margin: 0 auto;
  text-decoration: none;
  z-index: 1;
  text-align: center;
  text-align-last: center;
  display: block;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

export const Title = styled.div`
  color: #555;
  display: block;
  width: 100%;
  font-family: gilroy;
  font-size: 24px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.3;
  letter-spacing: 0;
  margin-bottom: 15px;
  font-style: normal;
  text-align: center;
  text-align-last: center;

  @media (max-width: 763px) {
    text-align-last: center;
    font-size: 24px;
    display: block;
  }
`;

export const Desc = styled.div`
  color: #555;
  display: block;
  max-width: 606px;
  margin:0 auto;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  z-index: 1;
  line-height: 1.5;
  letter-spacing: 0;
  text-align: center;
  text-align-last: center;
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    max-width: 300px;
  }
  @media only screen and (max-width: 767px) {
    max-width: 300px;
    height: 120px;
    text-align: center;
    text-align-last: center;
    font-size: 16px;
  }
`;

export const PrimaryBtn = styled.span`
  background-color: ${props => props.theme.flatBlue};
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  color: #fff;
  padding: 8px;
  display: block;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.6;
  overflow: hidden;
  width: 206px;
  height: 44px;
  margin: 0 auto;
  text-decoration: none;
  z-index: 1;
  text-align: center;
  text-align-last: center;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  @media only screen and (max-width: 763px) {
    width: 206px;
    height: 44px;
    top: 255.19998168945px;
    left: 57px;
  }
`;
