import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/pro-light-svg-icons';
import PaginationStyled from './styled';

const Pagination = (props) => {

  const [pageLimit, updatePageLimits] = useState({ low: props.offset + 1, high: props.offset + props.limit });

  const updateOffsets = type => () => {
    if (props.dataLoading) {
      return;
    }
    if (type === 'next') {
      const low = pageLimit.low + props.limit;
      const high = props.limit + pageLimit.high >= props.count ? props.count : props.limit + pageLimit.high;
      props.onChange(low - 1, high);
    } else {
      const low = pageLimit.low - props.limit;
      const high = pageLimit.high - props.limit;
      props.onChange(low - 1, high);
    }
  }

  useEffect(() => {
    const low = props.count ? props.offset + 1 : 0;
    const high = props.offset + props.limit;
    updatePageLimits({
      low,
      high: high >= props.count ? props.count : high,
    })
  }, [props.offset, props.count])

  return (
    <PaginationStyled className={props.classes.root}>
      <PaginationStyled.ArrowWrapper className='left-arrow' disabled={pageLimit.low <= 1} onClick={updateOffsets('prev')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </PaginationStyled.ArrowWrapper>
      <PaginationStyled.Details className={props.classes.pageDisplay}>
        {pageLimit.low} - {pageLimit.high} <span>of</span> {props.count}
      </PaginationStyled.Details>
      <PaginationStyled.ArrowWrapper className='right-arrow' disabled={pageLimit.high === props.count} onClick={updateOffsets('next')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </PaginationStyled.ArrowWrapper>
    </PaginationStyled>
  )
}

Pagination.defaultProps = {
  dataLoading: false,
  offset: 0,
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  dataLoading: PropTypes.bool,
  offset: PropTypes.number,
}

export default Pagination;
