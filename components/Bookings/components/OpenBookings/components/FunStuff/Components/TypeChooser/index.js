import React from 'react';
import PropTypes from 'prop-types';
import { componentList } from './constants';

const TypeChooser = ({
  delivMethod,
  ...props
}) => {
  const Component = componentList[delivMethod] || componentList[1];
  if (Component) {
    return (
      <Component
        {...props}
      />
    )
  }
  return null;
}

TypeChooser.defaultProps = {
  delivMethod: 1,
}

TypeChooser.propTypes = {
  delivMethod: PropTypes.number,
}

export default TypeChooser
