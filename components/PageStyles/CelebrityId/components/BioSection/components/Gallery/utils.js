import React from 'react';

export const renderDots = (current, imageList, sliderRef={}) => (dots) => {

  const onDotClick = (dotKey) => () => {
    if (sliderRef.current && current >=6 && dotKey === "6") {
      if (current === (imageList.length - 1)) {
        sliderRef.current.slickGoTo(0);
      } else {
        sliderRef.current.slickGoTo(current + 1);
      }
    } else {
      sliderRef.current.slickGoTo(dotKey);
    }
  }

  const getClassName = (dotKey) => {
    if ((current >= 6 && dotKey === "6") || current === parseInt(dotKey, 0)) {
      return 'slick-active';
    }
    return '';
  }

  const newDots = dots.filter(dotItem => dotItem.key <= 6).map(dotItem => ({
    ...dotItem,
    props: {
      ...dotItem.props,
      className: getClassName(dotItem.key),
      children: {
        ...dotItem.props.children,
        props: {
          ...dotItem.props.children.props,
          onClick: onDotClick(dotItem.key),
        }
      }
    }
  }))
  return <ul>{newDots}</ul>
}
