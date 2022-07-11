import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  position: relative;
  width: 300px;
  ${media.largeScreen} {
    width: 795px;
  }
  margin: 0 auto;
`;

export const Slider = styled.section`
  position: static;
  width: 265px;
  ${media.largeScreen} {
    width: 795px;
    position: relative;
  }
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;

  .slide {
    display: inline-block;
    height: 100%;
    width: 265px;
    min-width: 265px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 100%;
  }

  .arrow-slider {
    font-size: 65px;
    cursor: pointer;
    color: ${props => props.theme.flatBlue};
    top: 50%;
    z-index: 5;
    position: absolute;
  }

  .nextArrow {
    right: -35px;
    ${media.largeScreen} {
      right: 118px;
    }
    ${media.smallScreen} {
      right: -20px;
    }
    @media (max-width: 340px) {
      right: -10px;
    }
  }

  .backArrow {
    left: -35px;
    ${media.largeScreen} {
      left: 118px;
    }
    ${media.smallScreen} {
      left: -20px;
    }
    @media (max-width: 340px) {
      left: -10px;
    }
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
  align-items: center;
  width: 265px;
  ${media.largeScreen} {
    width: 795px;
  }
  transform: ${props =>
    props.translateValue && `translateX(${props.translateValue}px)`};
  transition: transform ease-out 0.45s;
`;

export const Slide = styled.li``;
