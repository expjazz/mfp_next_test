import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarousalWrap } from './styled';

const CustomCarousal = ({
  carousalProps,
  className,
  children,
}) => {
  return (
    <CarousalWrap className={className}>
      <Slider
        pauseOnFocus
        {...carousalProps}
      >
        {
          children
        }
      </Slider>
    </CarousalWrap>
  )
}

export default CustomCarousal;
