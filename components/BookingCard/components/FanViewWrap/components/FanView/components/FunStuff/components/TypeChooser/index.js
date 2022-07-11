import React from 'react';
import PropTypes from 'prop-types';
// import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { componentList } from './constants';
import { deliveryMethods } from '../../../../../../../../../../src/constants/requestTypes/funTypes';

const TypeChooser = ({
  delivMethod,
  ...props
}) => {
  const Component = componentList[delivMethod] || componentList[deliveryMethods.file];
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
  delivMethod: deliveryMethods.file,
}

TypeChooser.propTypes = {
  delivMethod: PropTypes.number,
}

export default TypeChooser
