import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Slide } from './styled';

const SlideItem = props => {
  const slideRef = useRef(null);
  let startX = '';
  let startY = '';
  let distX = '';
  let distY = '';
  const threshold = 50; // min distance
  const restraint = 100; // maximum distance perpendicular direction
  const allowedTime = 200; // maximum time
  let elapsedTime = '';
  let startTime = '';

  const touchStart = e => {
    const touchBbj = e.changedTouches[0];
    startX = touchBbj.pageX;
    startY = touchBbj.pageY;
    startTime = new Date().getTime();
  };

  const touchEnd = e => {
    const touchBbj = e.changedTouches[0];
    distX = touchBbj.pageX - startX;
    distY = touchBbj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX < 0) {
          props.goToNextSlide();
        } else {
          props.goToPrevSlide();
        }
      }
      // for up and down - Math.abs(distY) >= threshold && Math.abs(distX) <= restraint
    }
  };

  useEffect(() => {
    slideRef?.current.addEventListener('touchstart', touchStart);
    slideRef?.current.addEventListener('touchend', touchEnd);
    return () => {
      slideRef?.current?.removeEventListener('touchstart', touchStart);
      slideRef?.current?.removeEventListener('touchend', touchEnd);
    };
  }, []);

  const getSlide = () => {
    return (
      <Slide
        ref={slideRef}
        key={props.index}
        className={`slide ${
          props.currentIndex === props.index ? 'active' : 'disabled'
        }`}
      >
        {props.getComponent(props.item, props.currentIndex === props.index, props.currentIndex)}
      </Slide>
    );
  };

  return <React.Fragment>{getSlide()}</React.Fragment>;
};

SlideItem.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  getComponent: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  goToNextSlide: PropTypes.func.isRequired,
  goToPrevSlide: PropTypes.func.isRequired,
  translateValue: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default SlideItem;
