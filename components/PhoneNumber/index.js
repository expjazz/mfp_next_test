import React from 'react';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FloatLabel, Error, Wrapper } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import flags from 'react-phone-number-input/flags'

const PhoneNumber = ({ numProps, renderCTA }) => {
  return (
    <Wrapper className='ph-number-wrapper' valid={numProps.emptyValid || !isEmpty(numProps.value)}>
      <FloatLabel valid={!isEmpty(numProps.value)} error={numProps.notValid}>
        <PhoneInput
          ref={numProps.phoneRef}
          id="for-phno"
          country={numProps.country}
          placeholder={numProps.placeholder}
          value={numProps.value}
          onCountryChange={numProps.countryChange}
          flags={flags}
          onChange={numProps.onChange}
          onBlur={numProps.onBlur}
        />
        <label htmlFor="for-phno" className="ph-label">
          {numProps.label}
        </label>
        <Error>{numProps.error}</Error>
      </FloatLabel>
      {renderCTA ? renderCTA() : null}
    </Wrapper>
  );
};

PhoneNumber.propTypes = {
  numProps: PropTypes.object.isRequired,
};

export default PhoneNumber;
