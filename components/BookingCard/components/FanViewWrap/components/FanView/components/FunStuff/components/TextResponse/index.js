import React from 'react';
import PropTypes from 'prop-types';
// import { DescriptionP } from 'styles/TextStyled';
import { Wrapper } from './styled';
import { DescriptionP } from '../../../../../../../../../../styles/TextStyled';

function TextResponse(props) {
  const { fun_stuff_request_details: reqDetails } = props.bookingData;

  return (
    <Wrapper>
      <span className="sub-head">{reqDetails.fun_stuff.title}</span>
      <DescriptionP className="text-wrapper">
        {reqDetails.celebrity_reply}
      </DescriptionP>
    </Wrapper>
  );
}

TextResponse.propTypes = {
  bookingData: PropTypes.object.isRequired,
};

export default TextResponse;
