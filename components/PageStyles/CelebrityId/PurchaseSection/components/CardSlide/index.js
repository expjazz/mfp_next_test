import React from 'react';
import PropTypes from 'prop-types';
import CardDisplay from 'components/CardDisplay';
import { generateCards } from './constants';
import { Wrapper } from './styled';
import { useTranslation } from 'next-i18next';

function CardSlide({ starName, starData, requestType }) {
  const { t } = useTranslation()
  return (
    <Wrapper className="slide-wrp">
      <CardDisplay
        className="card-display"
        starName={starName}
        responseTime={starData.average_response_value}
        contentList={generateCards(
          starName,
          starData.average_response_value,
          requestType,
          t
        )}
      />
    </Wrapper>
  );
}

CardSlide.propTypes = {
  starName: PropTypes.string,
  starData: PropTypes.object.isRequired,
  requestType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
CardSlide.defaultProps = {
  starName: '',
  requestType: '',
};

export default CardSlide;
