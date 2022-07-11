import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { EmptyText } from 'styles/CommonStyled';
import { Description, Heading } from 'styles/TextStyled';
import { requestTypes } from 'src/constants/requestTypes';
import { useMedia } from 'customHooks/domUtils';
import { options } from '../../constants';
import { celebCancelledStatusList } from 'src/constants/requestStatusList';
// import { fetchBookingsList } from '../../actions/getBookingsList';
import { GeneralList } from '../../../../components/ListCards';
import OrderDetails from '../../../../components/OrderDetails';
import Pagination from '../../../../components/Pagination';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import CancelledStyled from './styled';
import { isEmpty } from 'src/utils/dataStructures';

const CancelledBookings = props => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 831px)');
  const [selected, updateSelected] = useState({});

  const fetchList = low => {
    props.fetchBookingsList(low, false, celebCancelledStatusList);
  };

  const onSetSelected = bookItem => () => {
    if (requestTypes[bookItem.request_type] === 'Message') {
      props.toggleBookingModal(
        true,
        { ...bookItem, id: bookItem.booking_id },
        true,
        t('open_bookings.cancelled_req'),
      );
    } else {
      updateSelected(bookItem);
    }
  };
  return (
    <CancelledStyled>
      {!isMobile && <Heading className="main-heading">{t('common.requests')}</Heading>}
      {!isEmpty(selected) && (
        <OrderDetails
          isModal
          disableFooter
          closeModal={onSetSelected({})}
          bookingData={selected}
          starMode
          backLabel={t('open_bookings.cancelled_req')}
          from="star-cancel"
        />
      )}
      <CancelledStyled.FilterSection>
        <Dropdown
          rootClass="drop-down"
          secondary
          selected={props.dropValue}
          options={options(t)}
          labelKey="title"
          valueKey="id"
          onChange={props.handleCategoryChange}
          placeHolder={t('open_bookings.request_type_drop')}
        />
      </CancelledStyled.FilterSection>
      {props.bookingsList?.data?.length > 0 && (
        <Pagination
          classes={{ root: 'pagination-wrapper top' }}
          offset={props.bookingsList.offset}
          count={props.bookingsList.count}
          limit={props.bookingsList.limit}
          dataLoading={props.bookingsList.loading}
          onChange={fetchList}
        />
      )}
      {!props.bookingsList.loading && props.bookingsList.data?.length === 0 && (
        <EmptyText className="empty-text">
          {t('open_bookings.no_cancel_req')}
          <br />
          {t('open_bookings.cancel_note')}
        </EmptyText>
      )}
      {props.bookingsList.highCancel && (
        <Description className="cancel-count-notification">
          {t('open_bookings.cancel_desc', {
            count: props.bookingsList.highCancelCount,
          })}
        </Description>
      )}
      {props.bookingsList.loading && <Loader class="loader-wrapper" />}
      {!props.bookingsList.loading &&
        props.bookingsList.data?.map(bookItem => (
          <GeneralList
            expiration={props.config?.request_expiration_days || 7}
            onPrimaryClick={onSetSelected(bookItem)}
            key={bookItem.booking_id}
            data={bookItem}
            isOpen={false}
          />
        ))}
      {!props.bookingsList.loading &&
        props.bookingsList.count > props.bookingsList.offset &&
        props.bookingsList.data?.length > 0 && (
          <Pagination
            classes={{ root: 'pagination-wrapper bottom' }}
            offset={props.bookingsList.offset}
            count={props.bookingsList.count}
            limit={props.bookingsList.limit}
            dataLoading={props.bookingsList.loading}
            onChange={fetchList}
          />
        )}
    </CancelledStyled>
  );
};

CancelledBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchBookingsList: (t, offset, refresh, requestStatus) =>
    dispatch(fetchBookingsList(t, offset, refresh, requestStatus)),
});

export default CancelledBookings
