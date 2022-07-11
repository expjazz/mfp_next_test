import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextArea as TextInput } from 'styles/CommonStyled';
import { Wrapper, Label } from './styled';
import { isEmpty } from 'src/utils/dataStructures';

const CInput = ({
  inputProps,
  autoSize,
  label,
  activeLabel,
  containerCls,
  wrapperCls,
  inputCls,
  labelCls,
}) => {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const handleAutoSize = () => {
    if (autoSize) {
      const el = inputRef.current;
      const offset = el.offsetHeight - el.clientHeight;
      el.style.cssText = 'height: auto;';
      el.style.cssText = `height: ${el.scrollHeight + offset}px`;
    }
  };
  const triggerInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
      inputRef.current.focus();
    }
  };
  const onInputClick = () => {
    if (inputRef && inputRef.current && !focused) {
      inputRef.current.click();
      inputRef.current.focus();
    }
  };
  const onResize = () => {
    handleAutoSize();
  };

  const onFocus = event => {
    setFocused(true);
    if (inputProps.onFocus) inputProps.onFocus(event);
  };
  const onBlur = event => {
    setFocused(false);
    if (inputProps.onBlur) inputProps.onBlur(event);
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
    <div className={`cinput-container  ${containerCls}`}>
      <Wrapper
        className={`${wrapperCls} ${focused ? 'focused' : ''} c-wrap`}
        onClick={onInputClick}
      >
        <TextInput
          {...inputProps}
          autoSize
          className={`autoInput ${inputCls}`}
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Label
          className={`label ${labelCls}`}
          onClick={triggerInput}
          hasValue={!isEmpty(inputProps.value)}
        >
          { (focused || inputProps.value) && activeLabel ? activeLabel : label}
        </Label>
      </Wrapper>
    </div>
  );
};

CInput.propTypes = {
  inputProps: PropTypes.object.isRequired,
  autoSize: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  activeLabel: PropTypes.string,
  containerCls: PropTypes.string,
  inputCls: PropTypes.string,
  wrapperCls: PropTypes.string,
  labelCls: PropTypes.string,
};
CInput.defaultProps = {
  autoSize: false,
  className: '',
  label: '',
  containerCls: '',
  inputCls: '',
  wrapperCls: '',
  labelCls: '',
};

export default CInput;
