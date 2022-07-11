import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/pro-light-svg-icons';
import SlideItem from 'components/SlideItem';
import { Image } from 'styles/CommonStyled';
import { Layout, Slider, SlideWrapper } from './styled';
import { useMediaQuery } from '@material-ui/core';

const Carousel = props => {
  const isWeb = useMediaQuery('(min-width: 832px)');
  const isSmall = useMediaQuery('(max-width: 359px)');
  const isMob = useMediaQuery('(min-width: 360px) and (max-width: 432px)');
  const curIndex = useRef(0);
  const tValue = useRef(0);
  const threshold = useRef(348);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const goToPrevSlide = () => {
    if (curIndex.current === 0) return;
    curIndex.current -= 1;
    tValue.current += threshold.current;
    setTranslateValue(tValue.current);
    setCurrentIndex(curIndex.current);
  };

  const goToNextSlide = () => {
    if (curIndex.current < props.data.length - 1) {
      curIndex.current += 1;
      tValue.current -= threshold.current;
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
    if (props.data.length > 1) {
      curIndex.current -= 1;
      tValue.current += threshold.current;
      setTranslateValue(tValue.current);
      setCurrentIndex(curIndex.current);
    }
  }, [props.deleted.id]);

  useEffect(() => {
    setCurrentIndex(0);
    curIndex.current = 0;
    setTranslateValue(0);
    tValue.current = 0;
    if (isMob) {
      threshold.current = 274;
    } else if (isSmall) {
      threshold.current = 234;
    } else {
      threshold.current = 348;
    }
  }, [isMob, isSmall, isWeb]);

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
          <React.Fragment>
            {isWeb && (
              <FontAwesomeIcon
                className="backArrow arrow-slider"
                icon={faAngleLeft}
                onClick={goToPrevSlide}
              />
            )}
          </React.Fragment>
        )}
        {currentIndex < props.data.length - 1 && (
          <React.Fragment>
            {isWeb && (
              <FontAwesomeIcon
                className="nextArrow arrow-slider"
                icon={faAngleRight}
                onClick={goToNextSlide}
              />
            )}
          </React.Fragment>
        )}
      </Slider>
      {!isWeb && (
        <React.Fragment>
          {currentIndex !== 0 && (
            <Image
              className="prev-img arrow-img"
              onClick={goToPrevSlide}
              image={props.data[currentIndex - 1].image}
            />
          )}
          {currentIndex < props.data.length - 1 && (
            <Image
              className="next-img arrow-img"
              onClick={goToNextSlide}
              image={props.data[currentIndex + 1].image}
            />
          )}
        </React.Fragment>
      )}
    </Layout>
  );
};

Carousel.propTypes = {
  data: PropTypes.array.isRequired,
  getComponent: PropTypes.func.isRequired,
  deleted: PropTypes.object,
};
Carousel.defaultProps = {
  deleted: {},
};
export default Carousel;
