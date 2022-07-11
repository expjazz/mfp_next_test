import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './styled';

const SecondaryButton = React.forwardRef((props, forwardRef) => (
  <ButtonStyled {...props} ref={forwardRef}>{props.children}</ButtonStyled>
));

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SecondaryButton;
