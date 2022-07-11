import React from 'react';
import { withTranslation, Trans } from 'next-i18next';
import PropTypes from 'prop-types';
import Link from 'next/link'
import { EmptyText } from 'styles/CommonStyled';
import BackHeader from 'components/BackHeader';
import { Heading } from 'styles/TextStyled';
import MoreTips from 'components/MoreTips';
import OpenBookings from './components/OpenBookings';
import CompletedBookings from './components/CompletedBookings';
import AllBookings from './components/AllBookings';
import CancelledBookings from './components/CancelledBookings';
import CommercialBookings from './components/CommercialBookings';
import { options, filterOptions, sortBy, productTypes } from './constants';
// import { getReactions } from '../../services/requestFeedback';
// import { checkIfAnyBooking, getRequestDetails } from '../../services/request';
import OrderDetails from '../../components/OrderDetails';
import {
  celebOpenStatusList,
  celebCompletedStatusList,
  celebCancelledStatusList,
  commercialStatus,
} from 'src/constants/requestStatusList';
import { parseQueryString } from 'src/utils/dataformatter';
import BookingsStyled from './styled';
import { withRouter } from 'next/router';
import { withConfigParter, withFetchBookingList, withQueryClient } from 'customHooks/reactQueryHooks';
import { checkIfAnyBooking, favoriteVideo, getBookings, getReactions, responseVideo } from 'src/services/myfanpark/bookingActions';
import { generalLoader, playPauseMedia, recordTrigger, setVideoUploadedFlag, toggleBookingModal, toggleUpdateBooking, updateMediaStore, updateToast, withGeneral } from 'src/context/general';
import { withLoggedUser } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { onAddResumeUpload } from 'src/context/queueHelpers';
import { getRequestDetails } from 'src/services/myfanpark';
import { accountStatus } from 'src/constants/stars/accountStatus';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    let dropValue = {};
    let selected = '';
    console.log(this.props.t,'akakakak')
    this.queryString = this.props.router.query;
    const newDropValue = options(this.props.t).find(
      option => option.id === this.queryString.type,
    );
    let filter = filterOptions(this.props.t).find(
      filterItem => filterItem.id === this.queryString.filter,
    );
    let sort = sortBy(this.props.t).find(
      sortItem => sortItem.id === this.queryString.sort,
    );

    let productType = productTypes(this.props.t).find(
      productItem => productItem.id == this.queryString.product,
    );
    if (this.queryString.selected && newDropValue.id === 'open') {
      if (this.queryString.selected.includes('?')) {
        selected = this.queryString.selected.split('?')[0];
        this.queryString.selected = selected
      } else {
        selected = this.queryString.selected;
      }
    }
    if (!filter) {
      filter = {
        title: this.props.t('common.showAll'),
        id: '',
      };
    }
    if (!productType) {
      productType = {
        title: this.props.t('common.all_request_type'),
        id: '',
      };
    }
    if (!sort) {
      sort = {
        title: this.props.t('common.mostRecent'),
        id: '',
      };
    }
    if (newDropValue && newDropValue.id !== 'all') {
      dropValue = newDropValue;
      this.fetchList(newDropValue.id, filter, sort, productType);
    } else {
      dropValue = options(this.props.t)[0];
      this.fetchList('open');
    }
    this.state = {
      dropValue,
      orderDetails: null,
      filter,
      selected,
      sort,
      productType,
      hasBookings: true,
      prevOffset: 0,
      bookingLoading: false,
    };
  }

  componentDidMount() {
    // this.props.fetchUserDetails(this.props.userDetails.user_id);
    checkIfAnyBooking('celebrity_id').then(hasBookings => {
      this.setState({ hasBookings });
    });
    if (this.queryString.request_id) {
      let reqId = this.queryString.request_id
      if (this.queryString.request_id.includes('?')) {
        reqId = this.queryString.request_id.split('?')[0]
      }
      generalLoader(this.props.dispatch, true);
      getRequestDetails(reqId, true, true).then(
        async requestDetails => {
          let reaction = null;
          if (this.queryString.reaction_id) {
            const reactionsList = await getReactions(
              reqId,
            );
            reaction = reactionsList.reactionFiles.find(
              reactionItem =>
                reactionItem.reaction_id === this.queryString.reaction_id,
            );
          }
          generalLoader(this.props.dispatch, false);
          if (requestDetails.success) {
            const newRequestDetails = requestDetails.data.stargramz_response;
            if (
              celebCompletedStatusList.indexOf(
                newRequestDetails.request_status,
              ) >= 0
            ) {
              if (reaction) {
                toggleBookingModal(this.props.dispatch,
                  true,
                  {
                    id: reqId,
                    reactionUrl: reaction.reaction_file_url,
                    reactionType: reaction.file_type,
                    reactionThumbnail: reaction.reaction_thumbnail_url,
                  },
                  true,
                  'Completed requests',
                );
              } else {
                toggleBookingModal(
                  this.props.dispatch,
                  true,
                  { id: reqId },
                  true,
                );
              }
            } else if (
              celebCancelledStatusList.indexOf(
                newRequestDetails.request_status,
              ) >= 0
            ) {
              this.setState({
                orderDetails: requestDetails.data.stargramz_response,
              });
            }
          }
        },
      ).catch(e => {
        generalLoader(this.props.dispatch, false)
      });
    }
  }

  onBackClick = () => {
    const arr = this.props.router?.query?.slug
    if (arr?.[arr?.length - 1 || 0] !== 'bookings') {
      this.props?.router?.back();
    } else {
      this.props.router.push('/manage', undefined, { shallow: true });
    }
  };

  loaderAction = payload => {
    generalLoader(this.props.dispatch, payload)
  }

  updateToast = payload => {
    updateToast(this.props.dispatch, payload)
  }

  onOpenClick = bookingId => () => {
    this.setState({
      dropValue: {
        title: 'Open',
        id: 'open',
      },
      selected: bookingId,
    });
  };

  setRequestType = dropValue => () => {
    this.setState({ dropValue });
  };

  setRequest = bookId => {
    this.setState({ selected: bookId });
  };

  fetchUserDetails = () => {
    this.props.queryClient.refetchQueries(['loggedUser'])
    // this.props.fetchUserDetails(this.props.userDetails.user_id);
  };

  closeOrderDetails = () => {
    this.setState({ orderDetails: null });
  };

  recordTrigger = payload => recordTrigger(this.props.dispatch, payload)

  updateMediaStore = payload => updateMediaStore(this.props.dispatch, payload)

  playPauseMedia = payload => playPauseMedia(this.props.dispatch, payload)

  setVideoUploadedFlag = payload => setVideoUploadedFlag(this.props.dispatch, payload)
  pagFetchList = (
    offset,
    refresh,
    requestStatus,
    filterParam,
    sortParam,
    requestType
  ) => {
    this.props.bookingListFn.getListParams(
    this.props.t,
    offset,
    refresh,
    requestStatus,
    filterParam,
    sortParam,
    requestType
    )}
  fetchList = (type, filter = {}, sort = {}, productType = {}) => {
    // t,
    // offset,
    // refresh,
    // requestStatus,
    // filterParam = '',
    // sortParam = '',
    // requestType,
    switch (type) {
      case 'open':
        this.props.bookingListFn.getListParams(this.props.t, 0, true, celebOpenStatusList);
        break;
      case 'completed':
        this.props.bookingListFn.getListParams(
          this.props.t,
          0,
          true,
          celebCompletedStatusList,
          filter.id,
          sort.id,
          productType.id,
          );
        break;
      case 'cancelled':
        this.props.bookingListFn.getListParams(this.props.t, 0, true, celebCancelledStatusList);
        break;
      case 'commercial':
        this.props.bookingListFn.getListParams(this.props.t, 0, true, commercialStatus, '', '', 4);
        // this.props.fetchBookingsList(0, true, commercialStatus, '', '', 4);
        break;
      default:
        return null;
    }
    return null;
  };

  handleCategoryChange = option => {
    const { filter, sort, productType } = this.state;
    this.setState({ dropValue: option });
    this.fetchList(option.id, filter, sort, productType);
  };

  handleFilterOrSort = type => option => {
    const { dropValue } = this.state;
    let { filter, sort, productType } = this.state;
    this.setState({ [type]: option });
    filter = type === 'filter' ? option : filter;
    sort = type === 'sort' ? option : sort;
    productType = type === 'productType' ? option : productType;
    this.fetchList(dropValue.id, filter, sort, productType);
  };

  localUpdateToast = payload => {
    updateToast(this.props.dispatch, {...payload, global: true})
  }

  toggleBookingModal = (active, bookingData, starMode, backLabel) => {
    toggleBookingModal(this.props.dispatch, active, bookingData, starMode, backLabel)
  }

  updateBookingsList = (id, data) => {
    const {bookingsListQueryParams, bookingsList} = this.props
    const originalList = bookingsList.data
    const dataIndex = originalList.findIndex(item => item.booking_id === id)
    if (dataIndex) {
      originalList[dataIndex] = data;
      this.props.queryClient.setQueryData(['bookings', ...bookingsListQueryParams], {...bookingsList, data: originalList})
      // this.props.queryClient.refetchQueries(['bookings', ...bookingsListQueryParams])
    }
  }

  updateBookingList = (data) => {
    if (!Array.isArray(data)) return;
    const {bookingsListQueryParams, bookingsList} = this.props
    this.props.queryClient.setQueryData(['bookings', ...bookingsListQueryParams], {...bookingsList, data, count: data.length})

  }

  removeBooking = bookId => {
    const {bookingsList} = this.props
    const currentList = bookingsList.data
    const newList = currentList.filter(
      item => item.booking_id !== bookId,
    );
    this.updateBookingList(newList);
  }

  responseVideo = (requestId, fileName, callBack) => {
    const userData = this.props.loggedUser
    responseVideo(requestId, fileName, callBack, userData, this.props.queryClient, this.props.dispatch)
  }

  onAddResumeUpload = (uploadObj, key) => {
    const state = this.props.generalData
    const { resumableUpload } = state
    const currentProcessQueue = resumableUpload.pendingQueue;
    onAddResumeUpload(this.props.dispatch, uploadObj, key, uploadObj, currentProcessQueue, resumableUpload)
  }

  toggleUpdateBooking = (state, requestId, mode, requestData, onSuccess) => {
    toggleUpdateBooking(this.props.dispatch, state, requestId, mode, requestData, onSuccess)
  }

  favoriteVideo = (bookingId, videoId) => {
    favoriteVideo(bookingId, videoId, this.props.bookingsList, this.updateBookingsList, this.props.dispatch)
  }

  infiniteBooking = async offset => {
    console.log('refetch booking: ', offset, this.state.prevOffset);
    const { bookingsListQueryParams } = this.props
    const fullBookingObj = this.props.queryClient.getQueryData(['bookings', ...bookingsListQueryParams])
    let filterString = '';
    let sortString = '';
    filterOptions(this.props.t).forEach(filterOption => {
      if (filterOption.id !== '') {
        filterString = `${filterString}&${filterOption.id}=${filterOption.id ===
          filterParam}`;
        }
      })
      sortBy(this.props.t, this.props.entityData?.partnerData).forEach(sortOption => {
        if (sortOption.id !== '') {
          sortString = `${sortString}&${sortOption.id}=${sortOption.id ===
            sortParam}`;
          }
        });
        const [
          _offset,
          refresh,
          requestStatus,
          filterParam,
          sortParam,
          requestType,
          status,
          limit
        ] = bookingsListQueryParams
    this.setState({bookingLoading: true})
        const newData = await getBookings(
          2,
          limit,
          offset + this.state.prevOffset,
          filterString,
          sortString,
          requestType
          )
    this.setState({prevOffset: offset, bookingLoading: false})
    this.props.queryClient.setQueryData(['bookings', ...bookingsListQueryParams], {...fullBookingObj, data: [...fullBookingObj.data, ...newData]})
  }

  render() {
    const {
      dropValue,
      selected,
      filter,
      sort,
      hasBookings,
      orderDetails,
      productType,
    } = this.state;
    const { props } = this;
    return (
      <BookingsStyled className="booking-wrapper">
        <BackHeader
          rootClass="booking-header"
          backHandler={this.onBackClick}
          label={this.props.t('common.requests')}
          heading={this.props.t('common.requests')}
          noHelp
        />

        {orderDetails && (
          <OrderDetails
            toggleUpdateBooking={this.toggleUpdateBooking}
            isModal
            starMode
            closeModal={this.closeOrderDetails}
            onCheckboxChange={this.onPrivacyChange}
            bookingData={orderDetails}
          />
        )}
        <BookingsStyled.Container>
          {hasBookings ||
          (props.bookingsList && props.bookingsList.data.length > 0) ? (
            <React.Fragment>
              {dropValue.id === 'all' && (
                <AllBookings
                  toggleUpdateBooking={this.toggleUpdateBooking}
                  bookingsList={{...props.bookingsList, loading: props.bookingsListLoading}}
                  recentActivity={props.recentActivity}
                  updateBookingsList={this.updateBookingsList}
                  dropValue={dropValue}
                  loaderAction={this.loaderAction}
                  updateToast={this.updateToast}
                  config={props.config}
                  handleCategoryChange={this.handleCategoryChange}
                  onOpenClick={this.onOpenClick}
                  setRequestType={this.setRequestType}
                  responseVideo={this.responseVideo}
                />
              )}
              {dropValue.id === 'open' && (
                <OpenBookings
                  toggleUpdateBooking={this.toggleUpdateBooking}
                  recordTrigger={this.recordTrigger}
                  updateMediaStore={this.updateMediaStore}
                  loaderAction={this.loaderAction}
                  updateToast={this.updateToast}
                  playPauseMedia={this.playPauseMedia}
                  setVideoUploadedFlag={this.setVideoUploadedFlag}
                  updateToast={this.localUpdateToast}
                  bookingsList={{...props.bookingsList, loading: props.bookingsListLoading}}
                  config={props.config}
                  dropValue={dropValue}
                  selected={selected}
                  querySelection={this.queryString.selected}
                  fetchUserDetails={this.fetchUserDetails}
                  updateSelected={this.setRequest}
                  handleCategoryChange={this.handleCategoryChange}
                  updateBookingsList={this.updateBookingsList}
                  updateBookingList={this.updateBookingList}
                  removeBooking={this.removeBooking}
                  setRequestType={this.setRequestType}
                  defaultLang={this.props.defaultLang}
                  onAddResumeUpload={this.onAddResumeUpload}
                  hasUploadBar={this.props.generalData.resumableUpload.showUploadBar}
                  responseVideo={this.responseVideo}
                  fetchBookingsList={this.pagFetchList}
                  bookingsListQueryParams={this.props.bookingsListQueryParams}
                  infiniteBooking={this.infiniteBooking}
                  bookingLoading={this.state.bookingLoading}
                />
              )}
              {dropValue.id === 'completed' && (
                <CompletedBookings
                  toggleUpdateBooking={this.toggleUpdateBooking}
                  toggleBookingModal={this.toggleBookingModal}
                  fetchBookingsList={this.pagFetchList}
                  loaderAction={this.loaderAction}
                  updateToast={this.updateToast}
                  updateToast={this.localUpdateToast}
                  bookingsList={{...props.bookingsList, loading: props.bookingsListLoading}}
                  dropValue={dropValue}
                  filter={filter}
                  sort={sort}
                  productType={productType}
                  favoriteVideo={this.favoriteVideo}
                  handleCategoryChange={this.handleCategoryChange}
                  handleFilterOrSort={this.handleFilterOrSort}
                />
              )}
              {dropValue.id === 'cancelled' && (
                <CancelledBookings
                  toggleUpdateBooking={this.toggleUpdateBooking}
                  updateToast={this.localUpdateToast}
                  loaderAction={this.loaderAction}
                  fetchBookingsList={this.pagFetchList}
                  bookingsList={{...props.bookingsList, loading: props.bookingsListLoading}}
                  config={props.config}
                  dropValue={dropValue}
                  toggleBookingModal={this.toggleBookingModal}
                  handleCategoryChange={this.handleCategoryChange}
                />
              )}
              {dropValue.id === 'commercial' && (
                <CommercialBookings
                  toggleUpdateBooking={this.toggleUpdateBooking}
                  updateToast={this.localUpdateToast}
                  bookingsList={{...props.bookingsList, loading: props.bookingsListLoading}}
                  dropValue={dropValue}
                  setRequestType={this.setRequestType}
                  loaderAction={this.loaderAction}
                  updateSelected={this.setRequest}
                  toggleBookingModal={this.toggleBookingModal}
                  handleCategoryChange={this.handleCategoryChange}
                  updateBookingsList={this.updateBookingsList}
                  fetchBookingsList={this.pagFetchList}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Heading className="nodata-head">
                {this.props.t('bookings.fan_requests')}
              </Heading>
                <EmptyText className="empty-text">
            You currently do not have any requests. {
                    (this.props.loggedUser?.user?.talent_status === accountStatus.live ||this.props.loggedUser?.user?.talent_status === accountStatus.paused) && (
                      <>
                      {"Visit"}
                        <Link href="/manage/promote/promo-share" shallow={true}>
                          <a>
                            {' '} {this.props.t('open_bookings.promote_yourself')} {' '}
                          </a>
                        </Link>
                        {"to get those requests."}
                      </>
                    )
                  }
            </EmptyText>

              <MoreTips />
            </React.Fragment>
          )}
        </BookingsStyled.Container>
      </BookingsStyled>
    );
  }
}

Bookings.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  bookingsList: PropTypes.object.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  toggleBookingModal: PropTypes.func.isRequired,
  recentActivity: PropTypes.object.isRequired,
  favoriteVideo: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateBookingsList: PropTypes.func.isRequired,
  defaultLang: PropTypes.string,
};

Bookings.defaultProps = {
  defaultLang: '',
};

export default withQueryClient(withLoggedUser(withGeneral(withConfigParter(withFetchBookingList(withTranslation()(withRouter(Bookings)))))));
