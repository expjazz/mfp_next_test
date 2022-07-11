import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { useTranslation } from 'next-i18next';
import Input from 'components/TextInput';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout } from './styled';
import { CommonCharCount } from 'styles/CommonStyled';

const renderSuggestion = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  props,
}) => {
  const isHighlighted = highlightedIndex === index;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion[props.valueKey]}
      selected={isHighlighted}
      component="div"
    >
      {suggestion[props.labelKey]}
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  suggestion: PropTypes.object,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  highlightedIndex: PropTypes.number,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  props: PropTypes.object,
};
renderSuggestion.defaultProps = {
  suggestion: {},
  index: 0,
  itemProps: {},
  highlightedIndex: 0,
  valueKey: '',
  labelKey: '',
  props: {},
};

const AutoComplete = props => {
  const [inputVal, setInputValue] = useState('');
  const { t } = useTranslation()
  useEffect(() => {
    if (props.value && props.value[props.labelKey]) {
      setInputValue(props.value[props.labelKey]);
    } else {
      setInputValue(props.value);
    }
  }, [props.value]);
  const handleInputChange = event => {
    setInputValue(event.target.value);
    props.onChange(event.target.value, props.type);
  };

  const renderInput = inputProps => {
    const { InputProps } = inputProps;
    return (
      <Input
        inputProps={{
          defaultProps: {
            value: inputVal,
            onChange: InputProps.onChange,
          },
          mInputProps: {
            classes: { rest: {} },
            InputProps: { ...InputProps },
          },
          labelObj: {
            label: props.placeholder,
          },
          nativeProps: InputProps.maxLength ? { maxLength: InputProps.maxLength } : {}
        }}
      />
    );
  };

  const getSuggestions = value => {
    const inputValue = value.toLowerCase();
    setInputValue(inputValue);
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : props.list.filter(suggestion => {
          const keep = suggestion[props.labelKey]
            .toLowerCase()
            .includes(inputValue);
          return keep;
        });
  };

  const handleOptionChange = item => {
    setInputValue(item);
    props.onChange(
      props.list.find(
        x => x[props.labelKey].toLowerCase() === item.toLowerCase(),
      ),
      props.type,
    );
  };

  return (
    <Downshift
      id="downshift-simple"
      onChange={handleOptionChange}
      inputValue={inputVal}
    >
      {({
        getInputProps,
        getItemProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
      }) => (
        <div style={{ height: '100%' }}>
          {renderInput({
            InputProps: getInputProps({
              onChange: handleInputChange,
              ...props.maxLength ? { maxLength: props.maxLength } : {}
            }),
          })}
          {props.showCharCount && (
            <>
              <CommonCharCount>
                  {t('purchase_flow.char_remains', { length:  props.maxLength - parseFloat(inputVal.length) })}
              </CommonCharCount>
            </>
          )}
          <Layout>
            {isOpen && getSuggestions(inputValue).length > 0 ? (
              <Paper className="paper">
                <Scrollbars className="scrollbar">
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({
                        item: suggestion[props.labelKey],
                      }),
                      highlightedIndex,
                      selectedItem,
                      props,
                    }),
                  )}
                </Scrollbars>
              </Paper>
            ) : null}
          </Layout>
        </div>
      )}
    </Downshift>
  );
};

AutoComplete.propTypes = {
  labelKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  list: PropTypes.array,
  placeholder: PropTypes.string,
  showCharCount: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool,])
};

AutoComplete.defaultProps = {
  labelKey: '',
  value: '',
  type: '',
  list: [],
  placeholder: '',
  showCharCount: false,
  maxLength: false
};
export default AutoComplete;
