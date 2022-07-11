import styled from '@emotion/styled';
import { css } from '@emotion/react'
// import { Link } from 'react-router-dom';

const maxWidth = css`
  margin: 0 auto;
  padding: 30px 40px 50px;
  @media(max-width: 992px) {
    max-width: 100%;
    padding: 0;
  }
`;

export const SearchWrap = styled.div`
  width: 100%;
  margin-top: 10px;
  @media(min-width: 1280px) {
    width: auto;
    margin-top: 0;
    display: flex;
    justify-content: center;
    height: 40px;
    flex: 1;
    order: 1;
    flex: 0 0 100%;
    margin-bottom: -50px;
  }
  @media(max-width: 1279px) {
    order: 4;
  }
  .search-root {
    @media(max-width: 1279px) {
      height: 41px;
      margin: 3px auto 0;
    }
    @media(min-width: 992px) {
      min-width: 320px;
    }
    @media (min-width: 1280px) and (max-width: 1599px){
      min-width: 341px;
    }
    @media(min-width: 1600px) {
      min-width: 500px;
    }
  }
`;

export const Widget = styled.div`
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  background-color: #fff;
  background-image: none;
  position: relative;
  display: block;
  position: absolute;
  &.widget-section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.16);
    z-index: 20;
    padding-bottom: 10px;
    @media(min-width: 832px) {
      position: relative;
      height: auto;
      box-shadow: none;
      padding-bottom: 0;
    }
  }
`;

export const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  position: relative;
  width: 100%;
  @media (max-width: 992px) {
    width: 100%;
    padding: 0 15px;
  }
`;

export const WidgetImg = styled.a`
  display: block;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  width: 145px;
  overflow: hidden;
  display: block;
  margin-right: 20px;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  @media (max-width: 831px) {
    width: 180px;
    order: 1;
    margin-right: 0;
    img {
      margin-top: 7px;
      width: 154px;
      height: auto;
    }
  }
  @media (min-width: 1279px) {
    margin-bottom: 7px;
    order: 2;
  }
`;

export const WidgetButton = styled.a`
  background-color: transparent;
  border-radius: 5px;
  box-sizing: border-box;
  color: ${props => props.theme?.flatBlue};
  padding-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  display: block;
  font-family: gilroy;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 1.3;
  overflow: hidden;
  text-decoration: none;
  text-align: center;
  text-align-last: center;
  margin-left: 15px;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
  &.active {
    color: #555;
    font-weight: bold;
  }
  &.bg-blue {
    background-color: ${props => props.theme.flatBlue};
    color: #fff;
    padding: 4px;
    width: 96.6667px;
  }

  @media (max-width: 831px) {
    margin: 0 80px 0 0;
    padding: 0;
    font-size: 14px;

    &:last-child {
      margin-right: 0;
    }
    &.bg-blue {
      padding: 8px 0px;
      width: 69px;
      margin-right: 13%;
      &:last-child {
        margin-right: 0;
      }
      font-size: 12px;
      margin-top: 10px;
    }
  }

  @media (max-width: 420px) {
    margin: 0;
  }

  @media (max-width: 320px) {
    font-size: 11px;
    &.bg-blue {
      width: 55px;
    }
  }
`;

export const StyledText = styled.div`
  text-align: center;
  font-size: inherit;
  ${props => props.highlight && `
    color: #000;
    font-family: Gilroy-bold;
  `}
`;

export const UserPhoto = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  @media(max-width: 1279px) {
    display: none;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  @media(max-width: 831px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 420px) {
    justify-content: space-between;
  }
`;

export const LinksWrapper = styled.div`
  display: flex;
  align-items: center;

  @media(min-width: 1280px) {
    height: 60px;
    flex: 1;
    order: 3;
  }
  @media (max-width: 1279px) {
    width: 100%;
    margin-top: 10px;
    order: 3;
    justify-content: center;
    flex-direction: column;
  }
  @media (max-width: 420px) {
    justify-content: space-between;
  }
`;

export const SignupWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  .notf-count {
    line-height: 18px;
    padding: 7px 10px 5px;
  }
  .user-name {
    margin: 0 15px 0 5px;
    display: block;
    font-family: Gilroy-Medium;
    font-size: 16px;
    margin-top: 3px;
    color: ${props => props.theme.flatBlue};
  }
  @media (max-width: 1280px) {
    order: 2;
    padding-left: 2px;
    .user-name {
      display: none;
    }
  }
  @media (max-width: 320px) {
    width: 110px;
  }
  @media (min-width: 1279px) {
    order: 4;
  }
`;

export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${maxWidth};
  flex-wrap: wrap;
  @media(min-width: 1280px) {
    justify-content: flex-start;
  }
  @media (max-width: 1279px) {
    flex-wrap: wrap;
    padding-top: 25px;
  }
  @media (max-width: 832px) {
    padding-top: 10px;
  }
`;
