import styled from '@emotion/styled'
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  position: relative;
  width: 100%;
  margin: 0 auto;
  .arrow-img {
    position: absolute;
    top: 50%;
    margin: 0;
    height: 60px;
    transform: translateY(-50%);
  }
  .next-img {
    left: 90%;
  }
  .prev-img {
    right: 90%;
  }
`;

export const Slider = styled.section`
  position: static;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;

  .slide {
    display: inline-block;
    height: 100%;
    width: 348px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 100%;
  }

  .arrow-slider {
    font-size: 65px;
    cursor: pointer;
    color: ${props => props.theme.flatBlue};
    transform: translateY(-50%);
    top: 135px;
    z-index: 5;
    position: absolute;
  }

  .active {
    transform: scale(1);
    opacity: 1;
    transition: transform ease-out 0.45s;
  }
  .disabled {
    transform: scale(0.8);
    opacity: 0.4;
    transition: transform ease-out 0.45s;
  }
`;

export const SlideWrapper = styled.ul`
  position: relative;
  display: flex;
  width: 100%;
  transform: ${props =>
    props.translateValue && `translateX(${props.translateValue}px)`};
  transition: transform ease-out 0.45s;
`;

export const Slide = styled.li``;
