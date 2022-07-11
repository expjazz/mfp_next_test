import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/TextInput';

const GetPlace = props => {
  const [textInput, setTextInput] = useState(props.value);
  const inputRef = useRef(null);

  const onTextChange = event => {
    setTextInput(event.target.value);
    props.onAddressChange(event.target.value);
  };

  useEffect(() => {
    setTextInput(props.value);
  }, [props.value]);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      props.autoCompleteOptions,
    );
    window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        setTextInput(place.formatted_address);
        props.onPlaceSelect(place.formatted_address, {
          lat: place.geometry.location.lat(),
          lon: place.geometry.location.lng(),
        });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Input
        inputRef={inputRef}
        inputProps={{
          nativeProps: { autoComplete: 'off' },
          defaultProps: {
            value: textInput,
            onChange: onTextChange,
            placeholder: '',
          },
          labelObj: {
            label: props.textInputProps.label,
          },
        }}
      />
    </React.Fragment>
  );
};

GetPlace.defaultProps = {
  textInputProps: {},
  autoCompleteOptions: {},
  onPlaceSelect: () => {},
  onAddressChange: () => {},
  value: '',
};

GetPlace.propTypes = {
  textInputProps: PropTypes.object,
  onPlaceSelect: PropTypes.func,
  onAddressChange: PropTypes.func,
  autoCompleteOptions: PropTypes.object,
  value: PropTypes.string,
};

export default GetPlace;
