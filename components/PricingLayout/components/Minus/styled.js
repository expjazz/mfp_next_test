import styled from '@emotion/styled';

export const Container = styled.div`
  font-size: 14px;
  font-family: arial;
  width: 960px;
  position: relative;
  display: block;
  margin: auto;
  position: relative;

  @media only screen and (max-width: 992px) {
      width: 100%;
      padding: 0 15px;
  }

  p {
    margin: 0;
  }
  @media (max-width: 767px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const Title = styled.div`
  font-family: gilroy;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  text-align: left;
  text-align-last: left;
  font-style: normal;
  @media only screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

export const MinusList = styled.div`
  display: block;
  font-family: gilroy;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2;
  text-align: left;
  text-align-last: left;
  font-style: normal;

  ul {
    padding: 0;
    list-style: none;
    margin: 10px 0 10px 20px;
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
    width: 320px;
    font-size: 14px;
    line-height: 1.3;
    max-width: 100%;
  }
`;

export const Desc = styled.div`
  font-family: gilroy;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4;
  text-align: left;
  text-align-last: left;
  @media only screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

export const MainBtn = styled.span`
  background-color: ${props => props.theme.flatBlue};
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  color: #ffffff;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  line-height: 1.3;
  overflow: hidden;
  width: 207px;
  height: 44px;
  text-decoration: none;
  text-align: center;
  text-align-last: center;

  @media only screen and (max-width: 767px) {
    width: 207px;
    height: 44px;
  }
`;

export const LinkWrapper = styled.div`
  position: relative;
  width: 960px;
  margin: auto;
  height: 104px;
  margin-top: 25px;
  @media (max-width: 992px) {
    width: 320px;
    height: 90px;
  }
`;
