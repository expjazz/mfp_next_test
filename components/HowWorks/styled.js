import styled from '@emotion/styled';
import Dialog from '@material-ui/core/Dialog';

export const Heading = styled.h5`
  font-size: 24px;
  font-family: Gilroy-Medium;
  color: ${props => props.theme.greyAlternate};
  text-align: center;
  text-transform:uppercase;
`;

export const Logo = styled.img`
  width: auto;
  max-width: 150px;
  display: block;
  margin: 0 auto;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  .list-item {
    margin-top: 20px;
    max-width: 225px;
    text-align: center;
    .how-icon {
      font-size: 24px;
      margin-bottom: 10px;
    }
  }
`;

export const Footer = styled.section`
  padding: 15px 0;
  .note {
    font-size: 12px;
    display: block;
    margin-top: 10px;
    text-align: center;
    font-family: Gilroy-Regular;
    line-height: 15px;
    color: ${props => props.theme.greyishBrown};
  }
  @media(min-width: 832px) {
    margin-top: 10px;
  }
  @media(min-width: 1280px) {
    .note {
      max-width: 400px;
    }
  }
`;

export const Content = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DialogStyled = styled(Dialog)`
  .paper-root {
    max-width: 100%;
    padding-top: 60px;
    .close-icon {
      position: absolute;
      top: 25px;
      right: 15px;
      font-size: 24px;
      cursor: pointer;
    }
    @media (min-width: 832px) {
      max-height: 700px;
      max-width: 600px;
      height: auto;
      width: auto;
    }
    @media screen and (min-width: 832px) and (max-height: 720px) {
      max-height: 650px;
    }
    @media (max-width: 831px) {
      max-height: none;
      height: 100vh;
      width: 100%;
      margin: 0;
    }
  }
`;
