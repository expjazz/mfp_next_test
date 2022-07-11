import React from 'react';
import PropTypes from 'prop-types';
import TextFieldStyled from './styled';

export const TextInput = props => (
  <TextFieldStyled
    error={props.error}
    placeholder={props.placeholder}
    multiline={props.multiline}
    type={props.type}
    name={props.name}
    value={props.value}
    fullWidth={props.fullWidth}
    onChange={props.onChange}
    onKeyUp={props.onKeyUp}
    onKeyDown={props.onKeyDown}
    onKeyPress={props.onKeyPress}
    id={props.id}
    required={props.required}
    onBlur={props.onBlur}
    label={props.label}
    defaultValue={props.defaultValue}
    classes={{ root: `MuiFormControl ${props.rootClass}` }}
    InputLabelProps={{
      classes: {
        shrink: 'input-label-shrink',
        root: 'float-label',
        error: 'error-field',
        ...props.InputLabelProps.classes,
      },
    }}
    onClick={props.onClick}
    inputRef={props.inputRef}
    InputProps={{
      ...props.InputProps,
      classes: {
        underline: 'input-underline',
        input: 'input-field',
        root: 'input-base',
        error: 'error-field',
        ...props.InputProps.classes,
      },
    }}
    // eslint-disable-next-line
    inputProps={props.nativeProps}
  />
);

TextInput.propTypes = {
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  rootClass: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
  id: PropTypes.string,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  InputProps: PropTypes.object,
  inputRef: PropTypes.object,
  onClick: PropTypes.func,
  label: PropTypes.string,
  InputLabelProps: PropTypes.object,
  nativeProps: PropTypes.object,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  multiline: PropTypes.bool,
};

TextInput.defaultProps = {
  error: false,
  placeholder: '',
  rootClass: '',
  type: '',
  name: '',
  value: '',
  defaultValue: '',
  fullWidth: false,
  id: '',
  required: false,
  multiline: false,
  InputProps: {},
  inputRef: {},
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  label: '',
  InputLabelProps: {},
  nativeProps: {},
  onKeyUp: () => {},
  onKeyDown: () => {},
  onKeyPress: () => {},
};
