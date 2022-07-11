import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from 'components/Checkbox';
import { MultiSelect, Label, Form, Icon } from './styled';
import { debounce } from 'lodash';

export default function MultipleSelect(props) {
  const [values, setValues] = React.useState(props.values ? props.values : []);
  const [open, setOpen] = React.useState(false);
  const formRef = useRef(null);

  const handleChange = event => {
    let { value } = event.target;
    const lookup = value.reduce((a, e) => {
      a[e.id] = ++a[e.id] || 0;
      return a;
    }, {});
    const duplicate = value.filter(e => lookup[e.id]);
    if (duplicate && duplicate.length > 0) {
      value = value.filter(item => item.id !== duplicate[0].id);
    }
    setValues(value);
    props.getValues(value);
  };

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  )

  let lastScrollTop = 0;

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onScroll = () => {
    if (props.disableScrollLock) {
      const srollPos = window.pageYOffset || document.documentElement.scrollTop;
      if (srollPos > lastScrollTop && open) {
        setOpen(false);
      }
      lastScrollTop = srollPos <= 0 ? 0 : srollPos;
    }
  };

  useEffect(() => {
    if (props.disableScrollLock) window.addEventListener('scroll', onScroll);
    return () => {
      if (props.disableScrollLock)
        window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  useEffect(() => {
    setValues(props.values);
  });

  return (
    <div ref={formRef}>
      <Form classes={{ root: 'form-control' }}>
        <InputLabel
          id="mutiple-checkbox-label"
          classes={{ shrink: 'float-label' }}
        >
          {props.label}
        </InputLabel>
        <MultiSelect
          labelId="mutiple-checkbox-label"
          id="mutiple-checkbox"
          multiple
          value={values}
          defaultValue={props.values}
          onChange={debouncedHandleChange}
          onClose={onClose}
          onOpen={onOpen}
          open={open}
          IconComponent={Icon}
          input={<Input classes={{ root: 'input-root' }} />}
          renderValue={selected =>
            props.labelKey
              ? selected
                  .reduce((acc, cur) => {
                    return `${acc}, ${cur[props.labelKey]}`;
                  }, '')
                  .replace(/^,|,$/g, '')
                  .trim()
              : selected.join(', ')
          }
          classes={{
            root: 'select-root',
            selectMenu: 'select-menu',
            // inputBase: 'input-root',
          }}
          MenuProps={{
            anchorEl: formRef.current,
            variant: 'menu',
            classes: { paper: `list-root-multiple ${props.extraClasses}` },
            disablePortal: true,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,

            ...(props.disableScrollLock ? { container: formRef.current } : {}),
          }}
        >
          {props.data.map(option => {
            const checked = values.find(item => {
              if (
                props.labelKey &&
                item[props.labelKey] === option[props.labelKey]
              ) {
                return item;
              } else if (!props.labelKey && item === option) return item;
              return false;
            });
            return (
              <MenuItem
                key={props.labelKey ? option[props.labelKey] : option}
                value={option}
              >
                <Checkbox checked={checked} />
                <Label
                  className={
                    props.labelClass
                      ? `${checked ? 'is-checked' : 'not-checked'}`
                      : ''
                  }
                >
                  {props.labelKey ? option[props.labelKey] : option}
                </Label>
              </MenuItem>
            );
          })}
        </MultiSelect>
      </Form>
    </div>
  );
}

MultipleSelect.propTypes = {
  getValues: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  labelKey: PropTypes.string,
  values: PropTypes.array,
  disableScrollLock: PropTypes.bool,
  extraClasses: PropTypes.string,
  labelClass: PropTypes.string,
};

MultipleSelect.defaultProps = {
  labelKey: '',
  values: [],
  disableScrollLock: false,
  extraClasses: '',
  labelClass: '',
};
