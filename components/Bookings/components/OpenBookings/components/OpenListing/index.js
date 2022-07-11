import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import { CompactCard } from 'components/ListCards';
import { withScroll } from 'components/withScroll';
// import { withScroll } from 'src/services/withScroll';

const OpenListing = (props) => {

  const onClick = bookItem => () => {
    props.onClick(bookItem);
  }
  return (
    <React.Fragment>
      {
        props.dataList.map((bookItem) => (
          <CompactCard
            key={bookItem.booking_id}
            keyValue={bookItem.booking_id}
            expiration={
              bookItem.payment_type === 'in_app'
                ? props.expiration
                : bookItem.expiry_days
            }
            bookData={bookItem}
            onClick={onClick(bookItem)}
            selected={props.selected === bookItem.booking_id}
            initialSelected={props.initialSelected}
            dateFormat={props.dateFormat}
          />
        ))
      }
      {
        props.loading && props.dataList.length > 0 &&
          <Loader />
      }
    </React.Fragment>
  )
}

OpenListing.defaultProps = {
}

OpenListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  initialSelected: PropTypes.bool.isRequired,
  selected: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  expiration: PropTypes.string.isRequired,
}

export default withScroll(OpenListing);
