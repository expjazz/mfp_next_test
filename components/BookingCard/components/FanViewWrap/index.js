/* eslint-disable camelcase */
import React, { useState, useEffect, useRef, useContext } from 'react';
// import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { connect } from 'react-redux';
// import { cloneDeep } from 'src/utils/dataStructures';
import { Scrollbars } from 'react-custom-scrollbars';
// import { isEmpty } from 'src/utils/dataStructures';
// import { updateCharge } from 'store/shared/actions/processPayments';
// import { CloseButton, BackArrow, FlexCenter } from 'styles/CommonStyled';
// import { getFor } from 'src/utils/dataformatter';
// import BackHeader from 'components/BackHeader';
import BackHeader from '../../../../components/BackHeader'
import TabWrap from '../../../../components/TabWrap';
import RequestFlowPopup from '../../../../components/RequestFlowPopup';
// import OrderDetails from 'components/OrderDetails';
// import BookingTitle from 'components/BookingTitle';
// import ModalHeader from 'components/ModalHeader';
import ModalHeader from '../../../ModalHeader'
// // import Loader from 'components/Loader';
// import SuccessScreen from 'components/SuccessScreen';
// import { useMedia } from 'customHooks/domUtils';
// import { toggleBookingModal } from 'store/shared/actions/toggleModals';
// import { requestTypes, requestTypesKeys } from 'src/constants/requestTypes';
// import { getShortName } from 'src/utils/dataToStringFormatter';
import { RequestContext } from '../../RequestContext';
// import ReactionView from '../ReactionView';
import FanView from './components/FanView';
// import Clarifications from '../Clarifications';

import { tabsList } from './constants';
import { getSelectedTab } from './utils';
import BookingStyled, { SuccessWrap } from './styled';
// import { getShortName } from '../../../src/utils/dataToStringFormatter';
// import { requestTypes, requestTypesKeys } from '../../../src/constants/requestTypes';
import { useMediaQuery } from '@material-ui/core';
import Loader from '../../../../components/Loader';
// import { getFor } from '../../../src/utils/dataformatter';
import { cloneDeep, isEmpty } from '../../../../src/utils/dataStructures';
import { CloseButton, BackArrow, FlexCenter } from '../../../../styles/CommonStyled';
import { useGeneral } from '../../../../src/context/general';
import { requestTypes, requestTypesKeys } from '../../../../src/constants/requestTypes';
import { getFor } from '../../../../src/utils/dataformatter';
import ReactionView from './ReactionView';
import { getShortName } from '../../../../src/utils/dataToStringFormatter';
import SuccessScreen from 'components/SuccessScreen';

const updateCharge = () => {}
const FanViewWrap = props => {
  const { t } = useTranslation();
  const [state, dispatch] = useGeneral()
  const { bookingModal } = state.modals
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [showDetails, toggleDetails] = useState(false);
  const [showPaymentSuccess, togglePaymentSuccess] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [videoStatus, setVideoStatus] = useState(false);
  const [tabHeadHide, setTabHeadHide] = useState(false);
  const [successData, setSuccessData] = useState({});
  const scrollRef = useRef(null);
  const { requestData, updateRequestData, closeModal } = useContext(
    RequestContext,
  );

  const setDetails = state => () => {
    toggleDetails(state);
  };

  const changePaymentSuccess = state => () => {
    togglePaymentSuccess(state);
    setSuccessData({});
  };

  const onFanCompleteAction = (type, data) => {
    const newRequestData = { ...requestData };
    if (type === 'rating') {
      // props.fetchActivitiesList(newRequestData.booking_id, 0, true, {
      //   isBookingId: true,
      //   isAll: isMobile,
      //   isPublic: props.bookingModal.data.isPublic,
      // });
      newRequestData.has_rating = true;
      updateRequestData(newRequestData);
    } else if (type === 'reaction') {
      // props.fetchActivitiesList(newRequestData.booking_id, 0, true, {
      //   isBookingId: true,
      //   isAll: isMobile,
      //   isPublic: props.bookingModal.data.isPublic,
      // });
      newRequestData.has_reaction = true;
      updateRequestData(newRequestData);
    }
  };

  const backArrowHandler = () => {
    if (showDetails) {
      setDetails(false)();
    } else {
      closeModal();
    }
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const renderHeading = () => {
    const requestDetails = requestData.request_details;

    const getFrom = () => {
      if (
        requestDetails &&
        requestDetails.is_myself !== undefined &&
        requestData.occasion_id !== 18 &&
        requestData.occasion_id !== 24 &&
        !requestDetails.is_myself
      ) {
        const { templateType, stargramto } = requestDetails;
        let { stargramfrom } = requestDetails;
        if (templateType === 7 || templateType === 6) {
          stargramfrom = stargramto;
        }
        if (!isEmpty(stargramfrom)) return stargramfrom;
      }
      return '';
    };

    if (requestTypes[requestData.request_type] === 'Q&A') {
      return (
        <React.Fragment>
          {t('common.question_from', {
            requestData: requestData.fan_first_name,
          })}
        </React.Fragment>
      );
    }

    const checkOther = () => {
      if (requestData.occasion_id !== 18 && requestData.occasion_id !== 24) {
        return (
          <React.Fragment>
            {t(
              getFrom()
                ? 'common.bookingPopup.titleGenerator1_from'
                : 'common.bookingPopup.titleGenerator1',
              {
                occasion: requestData.occasion,
                type:
                  requestTypes[requestData.request_type] === 'Shout-out'
                    ? t('common.shoutout')
                    : t('common.announcement'),
                for: getFor(requestData),
                from: getFrom(),
              },
            )}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          {t(
            getFrom()
              ? 'common.bookingPopup.titleGenerator2_from'
              : 'common.bookingPopup.titleGenerator2',
            {
              type:
                requestTypes[requestData.request_type] === 'Shout-out'
                  ? t('common.shoutoutCap')
                  : t('common.announcementCap'),
              for: getFor(requestData),
              from: getFrom(),
            },
          )}
        </React.Fragment>
      );
    };

    return checkOther();
  };

  const { starMode } = bookingModal;

  const toggleReaction = (reactionData = null) => {
    if (bookingModal.data.reactionUrl) {
      const tempBookingModal = cloneDeep(bookingModal);
      const newBookingModal = {
        ...tempBookingModal,
        data: {
          ...bookingModal.data,
          reactionUrl: '',
        },
      };
      props.toggleBookingModal(true, newBookingModal, starMode);
    }
    setReaction(reactionData);
  };

  const onVideoStart = () => {
    if (!starMode && isMobile) setVideoStatus(true);
  };

  const onVideoEnded = () => {
    if (!starMode && isMobile) setVideoStatus(false);
  };

  const getHeaderText = customHead => {
    if (requestData.request_details) {
      if (customHead) {
        return <BookingTitle secondary requestData={requestData} />;
      }
      return renderHeading();
    } else if (!isEmpty(requestData.commercial_details)) {
      return t('common.fanViewWrap.commercial_request', {
        requestData: requestData.fan_first_name,
      });
    } else if (requestData.request_type === requestTypesKeys.message) {
      return starMode
        ? t('common.fanViewWrap.DM_Conversation', {
            requestData: requestData.fan_first_name,
          })
        : t('common.fanViewWrap.conversation', {
            requestData: requestData.celebrity,
          });
    } else if (requestData.request_type === requestTypesKeys.socialShoutout) {
      return !starMode
        ? t('common.fanViewWrap.social_media_1', {
            requestData: requestData.celebrity,
          })
        : t('common.fanViewWrap.social_media_2', {
            requestData: requestData.fan_first_name,
          });
    } else if (requestData.request_type === requestTypesKeys.promotion) {
      return !starMode
        ? t('common.fanViewWrap.social_media_3', {
            requestData: requestData.celebrity,
          })
        : t('common.fanViewWrap.social_media_4', {
            requestData: requestData.fan_first_name,
          });
    } else if (requestData.request_type === requestTypesKeys.digitalGoods) {
      return !starMode
        ? t('common.fanViewWrap.fun_stuff_1', {
            requestData: requestData.celebrity,
          })
        : t('common.fanViewWrap.fun_stuff_2', {
            requestData: requestData.fan_first_name,
          });
    } else if (requestData.request_type === requestTypesKeys.products) {
      return !starMode
        ? t('common.fanViewWrap.merch_purchase', {
            requestData: requestData.merch_purchase,
          })
        : t('common.fanViewWrap.personalised_merch', {
            requestData: requestData.fan_first_name,
          });
    }
    return t('common.fanViewWrap.video_shout_out');
  };

  useEffect(() => {
    if (!isMobile) setVideoStatus(false);
  }, [isMobile]);

  useEffect(() => {
    if (bookingModal.data.reactionData) {
      setReaction({
        ...bookingModal.data.reactionData,
        s3_video_url: bookingModal.data.reactionData.reaction_file_url,
        autoPlay: true,
      })
    }
  }, [bookingModal.data.reactionData])

  useEffect(() => {
    if (
      scrollRef &&
      scrollRef.current &&
      requestData.request_type === requestTypesKeys.message &&
      starMode
    ) {
      scrollRef.current.scrollToBottom();
    }
  });

  const showModalSuccess = data => {
    setSuccessData(data);
    togglePaymentSuccess(true);
  };

  const getSuccess = (cusProps = {}) => {
    return (
      <RequestFlowPopup
        noPadding
        disableClose
        closePopUp={changePaymentSuccess(false)}
      >
        <SuccessWrap>
          {cusProps.component && cusProps.component}
          {cusProps.backHeader && (
            <BackHeader
              backHandler={changePaymentSuccess(false)}
              label={cusProps.backLabel}
              closeHandler={changePaymentSuccess(false)}
              rootClass="success-Back"
            />
          )}
          <SuccessScreen
            title={t('common.bookingSuccess.title')}
            successMsg={t('common.bookingSuccess.successMsg')}
            note={
              requestData.request_type === requestTypesKeys.message ||
              requestData.request_type === requestTypesKeys.products
                ? ''
                : t('common.bookingSuccess.note')
            }
            btnLabel={
              requestData.request_type === requestTypesKeys.message
                ? t('common.back_conversation')
                : t('common.back_request')
            }
            closeHandler={changePaymentSuccess(false)}
            buttonHandler={changePaymentSuccess(false)}
            cusProps={
              !isEmpty(cusProps)
                ? {
                    ...cusProps,
                    buttonHandler: changePaymentSuccess(false),
                  }
                : {}
            }
          />
        </SuccessWrap>
      </RequestFlowPopup>
    );
  };

  if (showPaymentSuccess) {
    return getSuccess(successData);
  }

  const renderTab = (selectedTab, setTab = () => {}) => {
    switch (selectedTab) {
      case 'clarify':
        return (
          <Clarifications
            bookData={requestData}
            starMode={starMode}
            loaderAction={props.loaderAction}
            updateRequestData={updateRequestData}
          />
        );
      case 'details':
        return (
          <BookingStyled.OrderWrapper
            showDetails={
              selectedTab === 'details' && !props.bookingModal.data.isPublic
            }
            starMode={starMode}
          >
            <Scrollbars
              renderView={scrollProps => (
                <div {...scrollProps} className="scrollbar-content" />
              )}
            >
              <BookingStyled.OrderInnerWrapper>
                <OrderDetails
                  closeModal={closeModal}
                  disableHeader
                  disableFooter
                  starMode={starMode}
                  onPrimaryClick={setDetails(false)}
                  bookingData={requestData}
                  toggleDetails={setTab('request')}
                />
              </BookingStyled.OrderInnerWrapper>
            </Scrollbars>
          </BookingStyled.OrderWrapper>
        );
      default:
        return (
          <BookingStyled.Booking
            showDetails={selectedTab === 'details'}
            starMode={starMode}
            noPadding={requestData.request_type === requestTypesKeys.message}
          >
            <Scrollbars
              renderView={scrollProps => (
                <div {...scrollProps} className="scrollbar-content" />
              )}
              ref={scrollRef}
            >
              <FanView
                bookingData={requestData}
                userId={props.userId}
                isStar={props.isStar}
                setReaction={toggleReaction}
                fetchActivitiesList={props.fetchActivitiesList}
                resetActivitiesList={props.resetActivitiesList}
                toggleContactSupport={props.toggleContactSupport}
                updateRequestData={updateRequestData}
                toggleBookingModal={props.toggleBookingModal}
                loaderAction={props.loaderAction}
                updateToast={props.updateToast}
                isLoggedIn={props.isLoggedIn}
                toggleLogin={props.toggleLogin}
                onCompleteAction={onFanCompleteAction}
                activitiesList={props.activitiesList}
                modalData={bookingModal.data}
                toggleDetails={setTab('details')}
                closeModal={closeModal}
                onVideoEnded={onVideoEnded}
                onVideoStart={onVideoStart}
                videoStatus={videoStatus}
                toggleRequestFlow={props.toggleRequestFlow}
                updateFormBuilderProps={props.updateFormBuilderProps}
                fetchCelebDetails={props.fetchCelebDetails}
                scrollRef={scrollRef}
                getSuccess={getSuccess}
                setTabHeadHide={setTabHeadHide}
                showModalSuccess={showModalSuccess}
                history={props.history}
                userDetails={props.userDetails}
                entityData={props.entityData}
                currencyData={props.currencyData}
                language={props.language}
              />
            </Scrollbars>
          </BookingStyled.Booking>
        );
    }
  };

  return (
    <RequestFlowPopup noPadding disableClose closePopUp={closeModal}>
      {!requestData ? (
        <Loader />
      ) : (
        <BookingStyled.Wrapper
          reaction={reaction}
          starMode={starMode}
          className="booking-video"
        >
          {reaction ? (
            <ReactionView
              reaction={reaction}
              closeReactionView={toggleReaction}
            />
          ) : (
            <React.Fragment>
              {!starMode && !videoStatus ? (
                <ModalHeader
                  arrowVisible={isMobile}
                  starImage={
                    requestData.avatar_photo &&
                    (requestData.avatar_photo.thumbnail_url ||
                      requestData.avatar_photo.image_url)
                  }
                  backArrowHandler={backArrowHandler}
                  closeHandler={closeModal}
                />
              ) : (
                !starMode && (
                  <FlexCenter>
                    <BackArrow
                      id="modal-header-close"
                      className="arrow"
                      onClick={backArrowHandler}
                    />
                    <span className="star-title-nm">
                      {getShortName(
                        requestData.celebrity_nick_name,
                        requestData.celebrity_first_name,
                      )}
                    </span>

                    <CloseButton onClick={closeModal} id="id_close" />
                  </FlexCenter>
                )
              )}
              {starMode && (
                <React.Fragment>
                  <BackHeader
                    rootClass="book-modal-header"
                    backHandler={backArrowHandler}
                    closeHandler={closeModal}
                    label={props.bookingModal.backLabel}
                  />
                </React.Fragment>
              )}

              {!tabHeadHide && (
                <React.Fragment>
                  <BookingStyled.HeaderText>
                    {getHeaderText()}
                  </BookingStyled.HeaderText>
                  {!bookingModal.data.isPublic && (
                    <TabWrap
                      tabsList={tabsList(requestData.request_type, requestData)}
                      selected={getSelectedTab(requestData, showDetails) || {}}
                      tabProps={{
                        listClass: 'tab-list',
                      }}
                    >
                      {(selectedTab, setTab) => (
                        <BookingStyled
                          showDetails={selectedTab === 'details'}
                          starMode={starMode}
                        >
                          {renderTab(selectedTab, setTab)}
                        </BookingStyled>
                      )}
                    </TabWrap>
                  )}
                </React.Fragment>
              )}
              {(tabHeadHide || bookingModal.data.isPublic) && (
                <BookingStyled starMode={starMode}>
                  {renderTab('request')}
                </BookingStyled>
              )}
            </React.Fragment>
          )}
        </BookingStyled.Wrapper>
      )}
    </RequestFlowPopup>
  );
};

FanViewWrap.defaultProps = {
  userId: '',
  entityData: {},
  currencyData: {},
  language: {},
};

FanViewWrap.propTypes = {
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
  updateFormBuilderProps: PropTypes.func.isRequired,
  toggleRequestFlow: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  entityData: PropTypes.object,
  currencyData: PropTypes.object,
  userDetails: PropTypes.object.isRequired,
  tipPayment: PropTypes.func.isRequired,
  language: PropTypes.object,
};

// const mapDispatchToProps = dispatch => ({
//   toggleBookingModal: (state, bookingData, starMode) =>
//     dispatch(toggleBookingModal(state, bookingData, starMode)),
//   tipPayment: (payload, callBack) => {
//     dispatch(updateCharge(payload, callBack));
//   },
// });

export default FanViewWrap
