import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import SwitchStyled from './styled';

const Switch = props => {
  const { t } = useTranslation();
  const handleChecked = value => {
    props.handleChecked(value);
  };

  const activeText = props.activeText === null ? t('common.active') : props.activeText
  const inActiveText = props.inActiveText === null? t('common.inactive') : props.inActiveText

  return (
    <SwitchStyled
      className={props.rootClass}
      content={props.value ? activeText : inActiveText}
    >
      <input
        className="switch-input"
        type="checkbox"
        checked={props.value}
        onChange={event => handleChecked(event.target.checked)}
      />
      <span className="slider"></span>
    </SwitchStyled>
  );
};

Switch.propTypes = {
  handleChecked: PropTypes.func,
  value: PropTypes.bool,
  activeText: PropTypes.string,
  rootClass: PropTypes.string,
  inActiveText: PropTypes.string
};
Switch.defaultProps = {
  handleChecked: () => {},
  value: false,
  rootClass: '',
  activeText: null,
  inActiveText: null
};

export default Switch;
