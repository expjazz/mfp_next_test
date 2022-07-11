import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextArea as TextInput } from 'styles/CommonStyled';
import { InputHeading } from 'styles/TextStyled';
import { Wrapper, Fieldset } from './styled';

const TextArea = ({ inputProps, autoSize, label, errorField }) => {
  const inputRef = useRef(null);

  const handleAutoSize = () => {
    if (autoSize) {
      const el = inputRef.current;
      const offset = el.offsetHeight - el.clientHeight;
      el.style.cssText = 'height:auto;';
      el.style.cssText = `height: ${el.scrollHeight + offset}px`;
    }
  };

  const onResize = () => {
    handleAutoSize();
  };

  useEffect(() => {
    handleAutoSize();
  }, [inputProps.value]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <React.Fragment>
      {label && <InputHeading>{label}</InputHeading>}
      <Wrapper className='textarea-root'>
        <TextInput
          {...inputProps}
          autoSize
          className={inputProps.className}
          ref={inputRef}
          error={errorField}
        />
        <Fieldset error={errorField} className="fieldset" />
      </Wrapper>
    </React.Fragment>
  );
};

TextArea.propTypes = {
  inputProps: PropTypes.object.isRequired,
  autoSize: PropTypes.bool,
  errorField: PropTypes.bool,
  label: PropTypes.string,
};
TextArea.defaultProps = {
  autoSize: false,
  errorField: false,
  label: '',
};

export default TextArea;
