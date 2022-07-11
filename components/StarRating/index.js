import React from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RatingStyled from './styled';
import { customFontIcon } from '../../src/constants';

const StarRating = props => {
  return (
    <RatingStyled className={props.rootClass}>
      <Rating
        className={`rate ${props.ratingClass}`}
        emptySymbol={
          <FontAwesomeIcon className="rating-star empty-star" icon={customFontIcon.starEmSharp} />
        }
        fullSymbol={<FontAwesomeIcon className="rating-star" icon={customFontIcon.starSharp} />}
        fractions={props.fractions}
        initialRating={props.rating}
        readonly={props.readOnly}
        onChange={props.onChange}
        onClick={props.onClick}
        onHover={props.onHover}
      />
    </RatingStyled>
  );
};

StarRating.propTypes = {
  rootClass: PropTypes.string,
  ratingClass: PropTypes.string,
  rating: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  fractions: PropTypes.number,
};

StarRating.defaultProps = {
  rootClass: '',
  ratingClass: '',
  rating: '',
  readOnly: false,
  onChange: () => {},
  onClick: () => {},
  onHover: () => {},
  fractions: 1,
};

export default StarRating;
