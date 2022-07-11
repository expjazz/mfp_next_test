import React from 'react';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { Close } from './styled';

const CloseIcon = props => (
  <Close {...props} icon={faTimes} />
)

export default CloseIcon;
