import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateCards } from './utils';
import { CardWrap, CarousalWrap } from './styled';
import { DescriptionP } from '../../styles/TextStyled';
import CustomCarousal from '../CustomCarousal';

const CardDisplay = ({ starName, responseTime, className, contentList }) => {
  return (
    <CardWrap className={className}>
      <CustomCarousal
        carousalProps={{
          dots: true,
          infinite: true,
          arrows: false,
          autoplaySpeed: 5000,
          autoplay: true,
          className: 'card-carousal',
        }}
      >
        {(contentList || generateCards(starName, responseTime)).map(
          cardItem => (
            <CarousalWrap key={cardItem.key}>
              <FontAwesomeIcon className="icon" icon={cardItem.icon} />
              <DescriptionP>{cardItem.description}</DescriptionP>
            </CarousalWrap>
          ),
        )}
      </CustomCarousal>
    </CardWrap>
  );
};

CardDisplay.defaultProps = {
  starName: '',
  responseTime: 0,
  className: '',
  contentList: null,
};

CardDisplay.propTypes = {
  starName: PropTypes.string,
  responseTime: PropTypes.number,
  className: PropTypes.string,
  contentList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CardDisplay;
