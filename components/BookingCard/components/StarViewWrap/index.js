/* eslint-disable camelcase */
import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { getFor } from 'src/utils/dataformatter';
import RequestHeader from 'components/RequestHeader';
import BookingTitle from 'components/BookingTitle';
import Loader from 'components/Loader';
import { requestTypesKeys, requestTypes } from 'src/constants/requestTypes';
import RequestFlowPopup from 'components/RequestFlowPopup';
import OrderDetails from 'components/OrderDetails';
import StarView from './components/StarView';
import ReactionView from '../ReactionView';
import { RequestContext } from '../../RequestContext';
import Clarifications from '../Clarifications';
import { tabsList } from './constants';
import { getSelectedTab } from './utils';
import BookingStyled from './styled';
import { isEmpty, cloneDeep } from 'src/utils/dataStructures';
import { useFetchFanActivities, useGetPartner, useModalsActivities } from 'customHooks/reactQueryHooks';
import { useGeneral } from 'src/context/general';


const StarViewWrap = props => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const [showDetails, toggleDetails] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [selectedTab, setTab] = useState({});
  const [state, dispatch] = useGeneral()
  const { modals: { bookingModal } } = state
  const scrollRef = useRef(null);
  const { requestData, updateRequestData, closeModal } = useContext(
    RequestContext,
    );
    const [{data: fetchActData}, queryFetchAct] = useFetchFanActivities()
    const localFetchAct = (bookingId, offset, refresh, apiOptions) => {
      queryFetchAct(fetchActData?.data, bookingId, offset, refresh, apiOptions)
    }
  const setDetails = state => () => {
    toggleDetails(state);
  };

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
        if (!isEmpty(stargramfrom))
          return stargramfrom;
      }
      return '';
    };

    if (requestTypes[requestData.request_type] === 'Q&A') {
      return (
        <React.Fragment>
          {t('common.question_from',{requestData:requestData.fan_first_name})}
        </React.Fragment>
      );
    }

    const checkOther = () => {
      if (requestData.occasion_id !== 18 && requestData.occasion_id !== 24) {
        return (
          <React.Fragment>
            { t(getFrom() ? 'common.bookingPopup.titleGenerator1_from' : 'common.bookingPopup.titleGenerator1', {
              occasion: requestData.occasion,
              type: requestTypes[requestData.request_type] === 'Shout-out' ? t('common.shoutout') : t('common.announcement'),
              for: getFor(requestData),
              from: getFrom(),
            })}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          { t(getFrom() ? 'common.bookingPopup.titleGenerator2_from' : 'common.bookingPopup.titleGenerator2', {
            type: requestTypes[requestData.request_type] === 'Shout-out' ? t('common.shoutoutCap') : t('common.announcementCap'),
            for: getFor(requestData),
            from: getFrom(),
          })}
        </React.Fragment>
      );
    };

    return checkOther();
  };

  const { starMode } = props.bookingModal;

  const toggleReaction = (reactionData = null) => {
    if (props.bookingModal.data.reactionUrl) {
      const bookingModal = cloneDeep(props.bookingModal);
      const newBookingModal = {
        ...bookingModal,
        data: {
          ...bookingModal.data,
          reactionUrl: '',
        },
      };
      props.toggleBookingModal(true, newBookingModal, starMode);
    }
    setReaction(reactionData);
  };

  const getHeaderText = customHead => {
    if (requestData.request_details) {
      if (customHead) {
        return <BookingTitle secondary requestData={requestData} />;
      }
      return renderHeading();
    } else if (!isEmpty(requestData.commercial_details)) {
      return t('common.fanViewWrap.commercial_request',{requestData:requestData.fan_first_name});
    } else if (requestData.request_type === requestTypesKeys.message) {
      return starMode
        ? t('common.fanViewWrap.DM_Conversation',{requestData:requestData.fan_first_name})
        : t('common.fanViewWrap.conversation',{requestData:requestData.celebrity});
    } else if (requestData.request_type === requestTypesKeys.socialShoutout) {
      return !starMode
        ? t('common.fanViewWrap.social_media_1',{requestData:requestData.celebrity})
        : t('common.fanViewWrap.social_media_2',{requestData:requestData.fan_first_name});
    } else if (requestData.request_type === requestTypesKeys.promotion) {
      return !starMode
        ? t('common.fanViewWrap.social_media_3',{requestData:requestData.celebrity})
        : t('common.fanViewWrap.social_media_4',{requestData:requestData.fan_first_name});
    } else if (requestData.request_type === requestTypesKeys.digitalGoods) {
      return !starMode
        ? t('common.fanViewWrap.fun_stuff_1',{requestData:requestData.celebrity})
        : t('common.fanViewWrap.fun_stuff_2',{requestData:requestData.fan_first_name});
    } else if (requestData.request_type === requestTypesKeys.products) {
      return !starMode
        ? t('common.fanViewWrap.merch_purchase',{requestData:requestData.merch_purchase})
        : t('common.fanViewWrap.personalised_merch',{requestData:requestData.fan_first_name});
    }
    return t('common.fanViewWrap.video_shout_out');
  };

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

  const setTabSelect = value => {
    setTab(
      tabsList(t,requestData.request_type, requestData, entityData?.partnerData).find(
        tab => tab.value === value,
      ) || tabsList(t,requestData.request_type, requestData, entityData?.partnerData)[0],
    );
  };

  useEffect(() => {
    if (requestData) {
      setTab(getSelectedTab(requestData, showDetails, entityData?.partnerData));
    }
  }, [isEmpty(requestData)]);

  const renderTab = tabSelected => {
    switch (tabSelected) {
      case 'clarify':
        return (
          <Clarifications
            bookData={requestData}
            starMode={starMode}
            loaderAction={props.loaderAction}
            updateToast={props.updateToast}
            updateRequestData={updateRequestData}
          />
        );
      case 'details':
        return (
          <BookingStyled.OrderWrapper
            showDetails={
              tabSelected === 'details' && !props.bookingModal.data.isPublic
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
                  toggleDetails={() => {
                    setTabSelect('common.request');
                  }}
                />
              </BookingStyled.OrderInnerWrapper>
            </Scrollbars>
          </BookingStyled.OrderWrapper>
        );
      default:
        return (
          <BookingStyled.Booking
            showDetails={tabSelected === 'details'}
            starMode={starMode}
            noPadding={requestData.request_type === requestTypesKeys.message}
          >
            <Scrollbars
              renderView={scrollProps => (
                <div {...scrollProps} className="scrollbar-content" />
              )}
              ref={scrollRef}
            >
              <StarView
                bookingData={requestData}
                setReaction={toggleReaction}
                fetchActivitiesList={localFetchAct}
                resetActivitiesList={() => {}}
                loaderAction={props.loaderAction}
                updateToast={props.updateToast}
                activitiesList={fetchActData}
                modalData={bookingModal.data}
                toggleDetails={setTab('details')}
                closeModal={closeModal}
                carriers={
                  props.carriers ? props.carriers.shipping_carriers : []
                }
              />
            </Scrollbars>
          </BookingStyled.Booking>
        );
    }
  };
  return (
    <RequestFlowPopup noPadding disableClose closePopUp={closeModal}>
      {requestData && (
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
              <RequestHeader
                renderHeading={() => (
                  <React.Fragment>{getHeaderText()}</React.Fragment>
                )}
                autoHeight
                popupMode
                onClose={closeModal}
                {...(!props.bookingModal.data.isPublic
                  ? {
                      tabsList: tabsList(t,requestData.request_type, requestData, entityData?.partnerData),
                      selected: selectedTab || {},
                    }
                  : {})}
              >
                {tabSelected => (
                  <BookingStyled
                    showDetails={selectedTab === 'details'}
                    starMode={starMode}
                  >
                    {renderTab(tabSelected)}
                  </BookingStyled>
                )}
              </RequestHeader>
              {props.bookingModal.data.isPublic && (
                <BookingStyled starMode={starMode}>
                  {renderTab('request')}
                </BookingStyled>
              )}
            </React.Fragment>
          )}
        </BookingStyled.Wrapper>
      )}
      {!requestData && <Loader />}
    </RequestFlowPopup>
  );
};

StarViewWrap.defaultProps = {
  userId: '',
};

StarViewWrap.propTypes = {
  toggleBookingModal: PropTypes.func.isRequired,
  bookingModal: PropTypes.object.isRequired,
  fetchActivitiesList: PropTypes.func.isRequired,
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
  carriers: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  toggleBookingModal: (state, bookingData, starMode) =>
    dispatch(toggleBookingModal(state, bookingData, starMode)),
});

export default StarViewWrap
