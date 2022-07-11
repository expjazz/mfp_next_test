import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { EmptyText } from 'styles/CommonStyled';
import { Heading } from 'styles/TextStyled';
import { celebCompletedStatusList } from 'src/constants/requestStatusList';
import Dropdown from '../../../../components/Dropdown';
import Loader from '../../../../components/Loader';
import Pagination from '../../../../components/Pagination';
import { CompletedCard } from '../../../../components/ListCards';
import { options, filterOptions, sortBy, productTypes } from '../../constants';
import CompletedStyled from './styled';
import { useMediaQuery } from '@material-ui/core';

const CompletedBookings = props => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 831px)');
  const fetchList = low => {
    props.fetchBookingsList(
      low,
      false,
      celebCompletedStatusList,
      props.filter.id,
      props.sort.id,
      props.productType.id,
    );
  };

  const onCompletedClick = requestData => () => {
    props.toggleBookingModal(
      true,
      { ...requestData, id: requestData.booking_id },
      true,
      'Completed requests',
    );
  };

  return (
    <CompletedStyled>
      {!isMobile && <Heading className="main-heading">{t('common.requests')}</Heading>}
      <CompletedStyled.FilterSection>
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
        <Dropdown
          rootClass="drop-down"
          secondary
          selected={props.productType}
          options={productTypes(t)}
          labelKey="title"
          valueKey="id"
          onChange={props.handleFilterOrSort('productType')}
          placeHolder={t('open_bookings.sel_prod_type')}
        />
        <Dropdown
          rootClass="drop-down filter"
          secondary
          selected={props.filter}
          options={filterOptions(t)}
          labelKey="title"
          valueKey="id"
          onChange={props.handleFilterOrSort('filter')}
          placeHolder={t('open_bookings.filter')}
        />
        <Dropdown
          rootClass="drop-down sort-by"
          secondary
          selected={props.sort}
          options={sortBy(t)}
          labelKey="title"
          valueKey="id"
          onChange={props.handleFilterOrSort('sort')}
          placeHolder={t('open_bookings.sort_by')}
        />
      </CompletedStyled.FilterSection>
      {props.bookingsList.data.length > 0 && (
        <Pagination
          classes={{ root: 'pagination-wrapper top' }}
          offset={props.bookingsList.offset}
          count={props.bookingsList.count}
          limit={props.bookingsList.limit}
          dataLoading={props.bookingsList.loading}
          onChange={fetchList}
        />
      )}
      {props.bookingsList.loading && <Loader class="loader-wrap" />}
      {!props.bookingsList.loading && props.bookingsList.data.length === 0 && (
        <EmptyText className="empty-completed-text">
          {t('open_bookings.no_completed_req')}
        </EmptyText>
      )}
      {!props.bookingsList.loading && (
        <CompletedStyled.ListSection>
          {props.bookingsList.data.map(bookItem => (
            <CompletedCard
              onClick={onCompletedClick(bookItem)}
              onFavoriteClick={props.favoriteVideo}
              key={bookItem.id}
              data={bookItem}
              classes={{ root: 'list-item' }}
            />
          ))}
        </CompletedStyled.ListSection>
      )}
      {!props.bookingsList.loading &&
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
    </CompletedStyled>
  );
};

CompletedBookings.propTypes = {
  dropValue: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
  handleFilterOrSort: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  productType: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  favoriteVideo: PropTypes.func.isRequired,
};

// const mapDispatchToProps = dispatch => ({
//   fetchBookingsList: (
//     offset,
//     refresh,
//     requestStatus,
//     filter,
//     sort,
//     requestType,
//   ) =>
//     dispatch(
//       fetchBookingsList(
//         offset,
//         refresh,
//         requestStatus,
//         filter,
//         sort,
//         requestType,
//       ),
//     ),
// });

export default CompletedBookings
