import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import Popover from '@material-ui/core/Popover';
import PickerStyled from './styled';

const Picker = props => {
  const anchorEl = useRef(null);
  const [showList, toggleList] = useState(false);

  const openList = () => {
    toggleList(!showList);
  };

  const handleClose = () => {
    toggleList(false);
  };

  const onSelect = item => () => {
    handleClose();
    if (props.onSelect) {
      props.onSelect(item);
    }
  };

  return (
    <PickerStyled>
      <PickerStyled.Selected onClick={openList}>
        {props.selected && props.selected.label}
        <PickerStyled.Arrow ref={anchorEl}>
          <FontAwesomeIcon icon={faChevronDown} />
        </PickerStyled.Arrow>
      </PickerStyled.Selected>
      <Popover
        id="picker-popper"
        open={showList}
        anchorEl={anchorEl && anchorEl.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <PickerStyled.ListWrapper>
          {props.list.map(listItem => (
            <PickerStyled.ListItem
              key={listItem.value}
              onClick={onSelect(listItem)}
            >
              {listItem.label}
            </PickerStyled.ListItem>
          ))}
        </PickerStyled.ListWrapper>
      </Popover>
    </PickerStyled>
  );
};

Picker.propTypes = {
  list: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
};

export default Picker;
