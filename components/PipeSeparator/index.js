import React from 'react';
import PropTypes from 'prop-types';

const PipeSeparator = ({list, listKey, ...props}) => {

  const onItemClick = (listItem) => () => {
    props.onItemClick(listItem);
  }

  const renderList = () => {
    let string = [];
    if (list) {
      list.forEach((listItem, index) => {
        if (index === list.length - 1) {
          string = [...string, <span key={index} className={props.itemClass} onClick={onItemClick(listItem)}>{`${listItem[listKey]}`}</span>];
        } else {
        string = [...string, <span key={index} className={props.itemClass} onClick={onItemClick(listItem)}>{`${listItem[listKey]} | `}</span>];
        }
      });
      return string;
    }
  }
  return (
    <React.Fragment>
      { renderList() }
    </React.Fragment>
  )
};

PipeSeparator.defaultProps = {
  onItemClick: () => {},
  itemClass: '',
  list: [],
}

PipeSeparator.propTypes = {
  onItemClick: PropTypes.func,
  list: PropTypes.array,
  itemClass: PropTypes.string,
  listKey: PropTypes.string.isRequired,
}

export default PipeSeparator;
