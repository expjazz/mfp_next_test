import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalLazy } from '../withScroll/HorizontalLazy';

const ScrollList = (props) => {
  return (
    <React.Fragment>
      { props.renderPreContent ? props.renderPreContent() : null }
      {
        props.dataList.map((data, index) => (
          props.renderContent(data, index)
        ))
      }
    </React.Fragment>
  )
}

ScrollList.defaultProps = {
  renderContent: () => {},
  renderPreContent: false,
}

ScrollList.propTypes = {
  dataList: PropTypes.array.isRequired,
  renderContent: PropTypes.func,
  renderPreContent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
}

export default HorizontalLazy(ScrollList);
