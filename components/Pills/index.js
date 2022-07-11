import React from 'react';
import PropTypes from 'prop-types';
import { PillWrap } from './styled';

const Pill = props => {
  const tagHandler = tag => () => {
    if (props.tagHandler) props.tagHandler(tag);
  };
  return (
    <PillWrap className={props.className} onClick={tagHandler(props.tag)}>
      {props.tag.name}
    </PillWrap>
  );
};

Pill.propTypes = {
  className: PropTypes.string,
  tagHandler: PropTypes.func,
  tag: PropTypes.object.isRequired,
};

Pill.defaultProps = {
  className: '',
  tagHandler: () => {},
};

export default Pill;
