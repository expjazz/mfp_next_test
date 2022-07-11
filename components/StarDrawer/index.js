import React from 'react';
import PropTypes from 'prop-types';
import StarStyled from './styled';

const StarDrawer = props => {
  return (
    <StarStyled className="star-layout">
      {props.starData.map((star, index) => (
        <svg
          key={index}
          viewBox="0 0 25 25"
          height={star.size}
          width={star.size}
          x={star.horizontal}
          y={star.vertical}
        >
          <g style={{ transform: `rotate(${star.rotation})` }}>
            <polygon
              points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
              fill={star.color}
            />
          </g>
        </svg>
      ))}
    </StarStyled>
  );
};

StarDrawer.propTypes = {
  starData: PropTypes.array.isRequired,
};

export default StarDrawer;
