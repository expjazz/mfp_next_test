import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { EmptyText } from 'styles/CommonStyled';
import { Heading } from 'styles/TextStyled';
// import { commercialBooking } from 'src/services/';
// import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
// import { toggleUpdateBooking } from 'store/shared/actions/toggleModals';
import { useMedia } from 'customHooks/domUtils';
import { options } from '../../constants';
import {
  commercialStatus,
  celebOpenStatusList,
} from 'src/constants/requestStatusList';
// import { fetchBookingsList } from '../../actions/getBookingsList';
import { CommercialCard } from '../../../../components/ListCards';
import Pagination from '../../../../components/Pagination';
import Loader from '../../../../components/Loader';
import Dropdown from '../../../../components/Dropdown';
import CommercialStyled from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const CommercialBookings = props => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 831px)');
  const { data: userData } = useFetchLoggedUser()
  const celebDetails = userData?.celebrity_details

  const [disableComm, toggCommm] = useState(
    !celebDetails.allow_commercial,
  );

  const fetchList = (low, high) => {
    props.fetchBookingsList(low, false, commercialStatus, '', '', 4);
  };

  const onDenySuccess = () => {
    props.fetchBookingsList(t, 0, true, commercialStatus);
  };

  const onCompleteBooking = id => {
    props.fetchBookingsList(t, 0, true, celebOpenStatusList);
    props.updateSelected(id);
    props.setRequestType(options(t).find(option => option.id === 'open'))();
  };

  const displayError = errorText => {
    props.updateToast({
      value: true,
      message: errorText,
      variant: 'error',
    });
  };

  const onAction = (type = 'deny', data = {}) => (comment, amount) => {
    if (type === 'approve') {
      if (!amount) {
        displayError(t('open_bookings.commercial.priceError'));
      } else {
        props.loaderAction(true);
        commercialBooking({
          booking_id: data.booking_id,
          star_response: comment,
          star_price: amount,
          type: 'response',
        })
          .then(resp => {
            props.loaderAction(false);
            props.updateBookingsList(data.booking_id, {
              ...data,
              ...resp.data.stargramz_response,
            });
          })
          .catch(exception => {
            displayError(
              exception.response
                ? exception.response.data.error.message
                : t('common.commonApiError'),
            );
          });
      }
    } else if (type === 'deny') {
      props.toggleUpdateBooking(
        true,
        data.booking_id,
        true,
        data,
        onDenySuccess,
      );
    }
  };

  const renderCommercials = () => {
    if (!props.bookingsList.loading) {
      return (
        <React.Fragment>
          {props.bookingsList.data.map(bookItem => (
            <CommercialCard
              key={bookItem.id}
              data={bookItem}
              isCommercial
              onCompleteBooking={onCompleteBooking}
              onApprove={onAction('approve', bookItem)}
              onDeny={onAction('deny', bookItem)}
              classes={{ root: 'list-item' }}
            />
          ))}
        </React.Fragment>
      );
    }
    return null;
  };

  useEffect(() => {
    toggCommm(!celebDetails.allow_commercial);
  }, [celebDetails.allow_commercial]);

  return (
    <CommercialStyled>
      {!isMobile && <Heading className="main-heading">{t('common.requests')}</Heading>}
      <CommercialStyled.FilterSection>
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
      </CommercialStyled.FilterSection>
      {!disableComm && props.bookingsList.data.length > 0 && (
        <Pagination
          classes={{ root: 'pagination-wrapper top' }}
          offset={props.bookingsList.offset}
          count={props.bookingsList.count}
          limit={props.bookingsList.limit}
          dataLoading={props.bookingsList.loading}
          onChange={fetchList}
        />
      )}
      {props.bookingsList.loading && <Loader class="loader-wrapper" />}
      {!props.bookingsList.loading &&
        !disableComm &&
        props.bookingsList.data.length === 0 && (
          <EmptyText className="empty-text">
            {t('open_bookings.commercial.no_commercial_req')}
          </EmptyText>
        )}
      {disableComm ? (
        <EmptyText className="empty-text">
          {t('open_bookings.commercial.no_req_note')}
        </EmptyText>
      ) : (
        renderCommercials()
      )}
      {!disableComm &&
        !props.bookingsList.loading &&
        props.bookingsList.count > props.bookingsList.offset &&
        props.bookingsList.data.length > 0 && (
          <Pagination
            classes={{ root: 'pagination-wrapper bottom' }}
            offset={props.bookingsList.offset}
            count={props.bookingsList.count}
            limit={props.bookingsList.limit}
            dataLoading={props.bookingsList.loading}
            onChange={fetchList}
          />
        )}
    </CommercialStyled>
  );
};

CommercialBookings.propTypes = {
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  bookingsList: PropTypes.array.isRequired,
  setRequestType: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
  updateBookingsList: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  updateSelected: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   celebDetails: state.userDetails.settings_celebrityDetails,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchBookingsList: (t, offset, refresh, requestStatus) =>
//     dispatch(fetchBookingsList(t, offset, refresh, requestStatus)),
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: obj => dispatch(updateToast(obj)),
//   toggleUpdateBooking: (state, requestId, starMode, requestData, onSuccess) =>
//     dispatch(
//       toggleUpdateBooking(state, requestId, starMode, requestData, onSuccess),
//     ),
// });

export default CommercialBookings
