import React, { useState, useCallback } from 'react';
import Select from 'react-select';
import Input from 'components/TextInput';
import MenuItem from '@material-ui/core/MenuItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { MultiSelectStyled } from './styled';

const MultiValueRemove = prop => {
  if (!prop.data.notClearable) {
    return (
      <span {...prop.innerProps}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    );
  }
  return <span className="clear-element" />;
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const Control = prop => {
  const textFieldProps = { ...prop.selectProps.textFieldProps };
  return (
    <Input
      inputProps={{
        defaultProps: {},
        nativeProps: {
          inputRef: prop.ref,
          children: prop.children,
          ...prop.innerProps,
        },
        mInputProps: {
          classes: { rest: {} },
          InputProps: {
            inputComponent,
          },
        },
        labelObj: {
          label: prop.label,
        },
      }}
      {...textFieldProps}
    />
  );
};

const Option = prop => {
  return (
    <MenuItem
      buttonRef={prop.ref}
      selected={prop.isFocused}
      component="div"
      style={{
        fontWeight: prop.isSelected ? 500 : 400,
        border: '1px solid #2f839d',
        background: '#fff',
        margin: '5px',
        borderRadius: '15px',
        display: 'inline-flex',
        padding: '2px 13px',
        fontFamily: 'Gilroy-medium',
        fontSize: '14px',
        cursor: 'pointer',
      }}
      {...prop.innerProps}
    >
      {prop.children}
    </MenuItem>
  );
};

const MultiSelect = props => {
  const [inputValue, updateInput] = useState('');

  const MenuList = useCallback(
    prop => {
      return (
        <React.Fragment>
          <Scrollbars
            renderView={scrollProps => (
              <div {...scrollProps} className="select__menu-list" />
            )}
            autoHeight
            autoHeightMax={prop.maxHeight}
          >
            {prop.children}
          </Scrollbars>
          {props.menuListAdornment ? (
            <span
              onClick={() =>
                prop.selectOption({ label: inputValue, value: inputValue })
              }
              role="presentation"
            >
              {props.menuListAdornment}
            </span>
          ) : null}
        </React.Fragment>
      );
    },
    [props.menuListAdornment],
  );

  const updateInputValue = event => {
    if (event) {
      const val = event.target.value.substring(0, 30);
      if (props.onInputChange) {
        props.onInputChange(val);
      }
      updateInput(val);
    } else {
      if (props.onInputChange) {
        props.onInputChange('');
      }
      updateInput('');
    }
  };

  const renderNoOptions = () => {
    return props.noOptionsMessage;
  };

  const components = {
    Control,
    MultiValueRemove,
    Option,
    MenuList,
  };
  return (
    <MultiSelectStyled data-cy={props.dataCy || ''}>
      <Select
        value={props.value}
        isMulti
        name="selectedProfessions"
        options={
          inputValue !== '' && inputValue.length >= 3 ? props.options : []
        }
        className="basic-multi-select"
        menuIsOpen={inputValue !== '' && inputValue.length >= 3}
        classNamePrefix="select"
        noOptionsMessage={renderNoOptions}
        placeholder={props.placeholder}
        onMenuClose={updateInputValue}
        components={components}
        onChange={props.onChange}
        textFieldProps={{
          label: props.label,
          onChange: updateInputValue,
          onClick: props.onInputClick,
          onFocus: props.onInputClick,
          value: inputValue,
          InputLabelProps:
            props.value && props.value.length
              ? {
                  shrink: true,
                  classes: {
                    shrink: 'input-label-shrink',
                    root: 'input-label',
                  },
                }
              : {
                  classes: {
                    shrink: 'input-label-shrink',
                    root: 'input-label',
                  },
                },
        }}
      />
    </MultiSelectStyled>
  );
};

export default MultiSelect;
