/* eslint-disable camelcase */
import React, { useState, useEffect, lazy } from 'react';
// import { withRouter } from 'react-router-dom';
// import { retry } from 'services/lazyLoad';
import PropTypes from 'prop-types';
import ErrorHandler from '../../components/ErrorHandler'
// import { connect } from 'react-redux';
// import { fetchCelebDetails } from 'pages/starProfile/actions/getCelebDetails';
// import ErrorHandler from 'components/ErrorHandler';
// import Loader from 'components/Loader';
// import RequestFlowPopup from 'components/RequestFlowPopup';
import { RequestContext } from './RequestContext';
// import { getRequestDetails } from '../../services/request';
// import {
//   updateToast,
//   loaderAction,
// } from '../../store/shared/actions/commonActions';
// import {
//   fetchActivitiesList,
//   resetActivitiesList,
// } from '../../store/shared/actions/getActivities';
// import {
//   toggleBookingModal,
//   toggleContactSupport,
//   toggleLogin,
//   toggleRequestFlow,
// } from '../../store/shared/actions/toggleModals';
import Loader from '../Loader';
import FanView from './components/FanViewWrap'

import { editModals, generalLoader, updateToast, useGeneral } from '../../src/context/general';
import { getRequestDetails } from '../../src/services/myfanpark';
// const FanView = lazy(() => retry(() => import('./components/FanViewWrap')));
// const StarView = lazy(() => retry(() => import('./components/StarViewWrap')));
import { initialState } from '../../src/context/initialState';
import RequestFlowPopup from 'components/RequestFlowPopup';
import dynamic from 'next/dynamic';

const StarView = dynamic(() => import('./components/StarViewWrap'), {
  ssr: false
})
const BookingCard = props => {
  const [requestData, setRequestData] = useState(null);
  const [state, dispatch] = useGeneral()
  const localUpdateToast = payload => updateToast(dispatch, { ...payload, global: true })
  const loaderAction = payload => generalLoader(dispatch, payload)
  const { bookingModal } = state?.modals
  const closeModal = () => {
    editModals(dispatch, { key: 'bookingModal', payload: { ...initialState.modals.bookingModal } })
    // props.toggleBookingModal(false);
  };

  const callRequestDetails = () => {
    getRequestDetails(
      bookingModal.requestId,
      props.isLoggedIn,
      true,
    ).then(requestDetails => {
      const newRequestDetails =
        requestDetails.success &&
        requestDetails.data &&
        requestDetails.data.stargramz_response;
      if (newRequestDetails) {
        setRequestData(requestDetails.data.stargramz_response);
      }
    });
  };

  useEffect(() => {
    if (bookingModal.requestId) {
      callRequestDetails();
    }
  }, [bookingModal.requestId]);

  const updateRequestData = newData => {
    setRequestData(newData);
  };


  const getFallBack = () => {
    return (
      <RequestFlowPopup noPadding disableClose closePopUp={closeModal}>
        <Loader />
      </RequestFlowPopup>
      // <h1>Fallback</h1>
    );
  };

  const { starMode } = bookingModal;
  return (
    <RequestContext.Provider
      value={{ requestData, updateRequestData, closeModal }}
    >
      <ErrorHandler fallback={getFallBack}>
        {
          starMode ?
            <StarView
              {...props}
              toggleBookingModal={closeModal}
              bookingModal={bookingModal}
              updateToast={localUpdateToast}
              loaderAction={loaderAction}
            />
          :
            <FanView
              {...props}
              toggleBookingModal={closeModal}
              bookingModal={bookingModal}
              updateToast={localUpdateToast}
              loaderAction={loaderAction}
            />
        }
        {/* <FanView
          {...props}
        /> */}
      </ErrorHandler>
    </RequestContext.Provider>
  );
};

BookingCard.defaultProps = {
  userId: '',
  isLoggedIn: false,
};

BookingCard.propTypes = {
  toggleBookingModal: PropTypes.func.isRequired,
  bookingModal: PropTypes.object.isRequired,
  fetchActivitiesList: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  resetActivitiesList: PropTypes.func.isRequired,
  activitiesList: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  userId: PropTypes.string,
  toggleRequestFlow: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  carriers: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

// const mapStateToProps = state => ({
//   bookingModal: state.modals.bookingModal,
//   activitiesList: state.activitiesList,
//   isStar: state.session.starRole,
//   isLoggedIn: state.session.isLoggedIn,
//   userId: state.session.auth_token.id,
//   carriers: state.config.data.shipping_carriers,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleBookingModal: (state, bookingData, starMode) =>
//     dispatch(toggleBookingModal(state, bookingData, starMode)),
//   toggleContactSupport: state => dispatch(toggleContactSupport(state)),
//   fetchActivitiesList: (bookingId, offset, refresh, apiOptions) =>
//     dispatch(fetchActivitiesList(bookingId, offset, refresh, apiOptions)),
//   resetActivitiesList: () => dispatch(resetActivitiesList()),
//   updateToast: errorObject => dispatch(updateToast(errorObject)),
//   loaderAction: state => dispatch(loaderAction(state)),
//   toggleLogin: state => dispatch(toggleLogin(state)),
//   toggleRequestFlow: state => dispatch(toggleRequestFlow(state)),
//   fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
// });

export default BookingCard
