import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Description } from 'styles/TextStyled';
import DisplayStyled from './styled';

const DisplayCard = props => {
  const onClose = event => {
    event.stopPropagation();
    props.onClose(props.id);
  };
  return (
    <DisplayStyled key={props.id} onClick={props.onClick}>
      {props.title && <DisplayStyled.Title>{props.title}</DisplayStyled.Title>}
      {props.heading && (
        <DisplayStyled.Heading>{props.heading}</DisplayStyled.Heading>
      )}
      {props.description && (
        <Description className="desc">{props.description}</Description>
      )}
      {props.onClose ? (
        <DisplayStyled.CloseButton onClick={onClose}>
          <FontAwesomeIcon className="close-icon" icon={faTimes} />
        </DisplayStyled.CloseButton>
      ) : null}
    </DisplayStyled>
  );
};

DisplayCard.defaultProps = {
  title: '',
  heading: '',
  id: '',
  description: '',
  onClose: undefined,
  onClick: () => {},
};

DisplayCard.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
};

export default DisplayCard;
