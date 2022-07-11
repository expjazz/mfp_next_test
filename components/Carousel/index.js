import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/pro-light-svg-icons';
import SlideItem from 'components/SlideItem';
import { Layout, Slider, SlideWrapper } from './styled';
import { useMediaQuery } from '@material-ui/core';

const Carousel = props => {
  const isMobile = useMediaQuery('(max-width: 1279px)');
  const curIndex = useRef(0);
  const tValue = useRef(isMobile ? 0 : 265);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(isMobile ? 0 : 265);

  const goToPrevSlide = () => {
    if (curIndex.current === 0) return;
    curIndex.current -= 1;
    tValue.current += 265;
    setTranslateValue(tValue.current);
    setCurrentIndex(curIndex.current);
  };

  const goToNextSlide = () => {
    if (curIndex.current < props.data.length - 1) {
      curIndex.current += 1;
      tValue.current -= 265;
      setTranslateValue(tValue.current);
      setCurrentIndex(curIndex.current);
    }
  };

  const keyPress = event => {
    if (event.keyCode === 39) {
      goToNextSlide();
    } else if (event.keyCode === 37) {
      goToPrevSlide();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', keyPress);
    return () => {
      window.removeEventListener('keyup', keyPress);
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    curIndex.current = 0;
    if (isMobile) {
      setTranslateValue(0);
      tValue.current = 0;
    } else {
      setTranslateValue(265);
      tValue.current = 265;
    }
  }, [isMobile]);

  const getSlide = (item, index) => {
    return (
      <SlideItem
        key={index}
        currentIndex={currentIndex}
        index={index}
        getComponent={props.getComponent}
        item={item}
        goToNextSlide={goToNextSlide}
        goToPrevSlide={goToPrevSlide}
        translateValue={translateValue}
        data={props.data}
      />
    );
  };

  return (
    <Layout className="slider-layout">
      <Slider className="slider-container">
        <SlideWrapper
          translateValue={translateValue}
          className="slider-wrapper"
        >
          {props.data.map((item, index) => getSlide(item, index))}
        </SlideWrapper>
        {currentIndex !== 0 && (
          <FontAwesomeIcon
            className="backArrow arrow-slider"
            icon={faAngleLeft}
            onClick={goToPrevSlide}
          />
        )}
        {currentIndex < props.data.length - 1 && (
          <FontAwesomeIcon
            className="nextArrow arrow-slider"
            icon={faAngleRight}
            onClick={goToNextSlide}
          />
        )}
      </Slider>
    </Layout>
  );
};

Carousel.propTypes = {
  data: PropTypes.array.isRequired,
  getComponent: PropTypes.func.isRequired,
};
export default Carousel;
