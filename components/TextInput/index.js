import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput, { Label, CustomLabel, NormalLabel } from './styled';

const Input = ({
  inputProps: {
    nativeProps = {},
    mInputProps = { classes: { rest: {} }, InputProps: {} },
    inputLabelProps = { classes: { rest: {} }, LabelProps: {} },
    defaultProps = {},
    rootClass,
    labelObj = {},
  },
  ...props
}) => {
  const [inputFocused, setInputFocus] = useState(false);
  
  const renderLabel = (label, activeLabel, Comp) => {
    if ((inputFocused || defaultProps.value) && activeLabel) {
      return <Comp>{activeLabel}</Comp>
    } else if (label) {
      return <Comp>{label}</Comp>;
    }
    return null;
  }

  const getLabel = () => {
    const { label, activeLabel, customLabel, errorMsg } = labelObj;
    if (customLabel) {
      customLabel();
    } else if (errorMsg && (defaultProps.error || defaultProps.success)) {
      return (
        <span>
          {renderLabel(label, activeLabel, Label)}
          <CustomLabel success={defaultProps.success}>{errorMsg}</CustomLabel>
        </span>
      );
    }
    return renderLabel(label, activeLabel, NormalLabel);
  };

  return (
    <TextInput
      variant={mInputProps.variant ? mInputProps.variant : 'outlined'}
      classes={{ root: `MuiFormControl ${rootClass}` }}
      InputProps={{
        classes: {
          notchedOutline: `notchedOutline ${
            defaultProps.success ? 'success' : ''
          } ${
            mInputProps.classes.notchedOutline
              ? mInputProps.classes.notchedOutline
              : ''
          }`,
          input: `input-field ${
            mInputProps.classes.input ? mInputProps.classes.input : ''
          }`,
          error: 'error-field',
          focused: `focused`,
          ...mInputProps.classes.rest,
        },
        ...mInputProps.InputProps,
      }}
      InputLabelProps={{
        classes: {
          shrink: `input-label-shrink ${
            inputLabelProps.classes.shrink ? inputLabelProps.classes.shrink : ''
          }`,
          root: `float-label ${
            inputLabelProps.classes.labe ? inputLabelProps.classes.label : ''
          }`,
          error: 'error-field',
          focused: 'focused-lbl',
          ...inputLabelProps.classes.rest,
        },
        ...inputLabelProps.LabelProps,
      }}
      // eslint-disable-next-line
      inputProps={nativeProps}
      label={getLabel()}
      {...defaultProps}
      onFocus={event => {
        setInputFocus(true);
        if (defaultProps.onFocus) {
          defaultProps.onFocus(event)
        }
      }}
      onBlur={event => {
        setInputFocus(false);
        if (defaultProps.onBlur) {
          defaultProps.onBlur(event);
        }
      }}
      {...props}
    />
  );
};

Input.propTypes = {
  inputProps: PropTypes.object,
};

Input.defaultProps = {
  inputProps: {},
};

export default Input;
