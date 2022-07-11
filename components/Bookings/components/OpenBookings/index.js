import React, { useEffect, useState, lazy, useMemo } from 'react';
// import { connect } from 'react-redux';
import { Trans, useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/pro-light-svg-icons';
// import {
//   commercialBooking,
//   updateCelebrityShare,
//   sharePromoProfile,
// } from 'src/services/';
import { useMedia } from 'customHooks/domUtils';
import RequestHeader from 'components/RequestHeader';
import MoreTips from 'components/MoreTips';
import { Heading } from 'styles/TextStyled';
import SuccessScreen from 'components/SuccessScreen';
import BackHeader from 'components/BackHeader';
import { celebOpenStatusList } from 'src/constants/requestStatusList';
// import {
//   recordTrigger,
//   updateMediaStore,
//   playPauseMedia,
//   loaderAction,
//   setVideoUploadedFlag,
//   updateToast,
// } from 'store/shared/actions/commonActions';
import ErrorHandler from 'components/ErrorHandler';
import { requestTypes, requestTypesKeys } from 'src/constants/requestTypes';
// import { getShareImage } from 'services/userManagement/starDetails';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
// import { onAddResumeUpload } from 'store/shared/actions/handleResumeUpload';
import Loader from 'components/Loader';
import Dropdown from 'components/Dropdown';
import { CommercialCard } from 'components/ListCards';
import { options } from '../../constants';
import { getreqOptions } from './constants';
import OpenStyled, { DefaultLang } from './styled';
// import {
//   toggleUpdateBooking,
//   toggleContactSupport,
// } from 'store/shared/actions/toggleModals';
import OpenListing from './components/OpenListing';
import LanguageModal from './components/LanguageModal';
// import { responseVideo, hasDeclined } from '../../actions/handleRequests';
import { getTabsList, getSelectedTab } from './utils';
// import {
//   updateBookingList,
//   fetchBookingsList,
//   removeBooking,
// } from '../../actions/getBookingsList';
import Clarifications from './components/Clarifications';
import { isEmpty } from 'src/utils/dataStructures';
import { updateMediaStore, useGeneral } from 'src/context/general';
import { useConfigPartner, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import dynamic from 'next/dynamic';
import { getShareImage } from 'src/services/myfanpark/celebActions';
import { commercialBooking } from 'src/services/myfanpark/bookingActions';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { EmptyText } from 'styles/CommonStyled';
import { accountStatus } from 'src/constants/stars/accountStatus';

const MessageAction = dynamic(() => import('./components/MessageAction'))
const RespondAction = dynamic(() => import('./components/RespondAction'))

const SocialShoutout = dynamic(() => import('./components/SocialShoutout'),)

const FunStuff = dynamic(() => import('./components/FunStuff'))

const Products = dynamic(() => import('./components/Products'))

const Commercial = dynamic(() => import('./components/Commercial'))

const OpenBookings = props => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation();
  const [state, dispatch] = useGeneral()
  const { data: config } = useConfigPartner()
  const deliveryTypes = config?.fun_stuff_delivery
  const { shouldRecord, playPauseMedia: playPauseMediaFlg } = state.commonReducer
  const hasDeclinedFlg = false
  const { data: entityData } = useGetPartner()
  const { data: userData } = useFetchLoggedUser()
  const defLangId = userData?.celebrity_details?.languages?.find(lang => lang.default)
  const reqCounts = userData?.celebrity_details?.request_count
  const dateFormat = entityData?.partnerData?.base_date_format
  // shouldRecord: state.commonReducer.shouldRecord,
  // playPauseMediaFlg: state.commonReducer.playPauseMedia,
  // hasDeclinedFlg: state.bookings.requestHandler.hasDeclined,
  // deliveryTypes: state.config.data.fun_stuff_delivery,
  // hasUploadBar: state.resumableUpload.showUploadBar,
  // entityData: state.entity.data,
  // userDetails: state.userDetails.settings_userDetails,
  // defLangId: state.userDetails.settings_celebrityDetails.defaultLangId,
  // reqCounts: state.userDetails.settings_celebrityDetails.request_count,
  // dateFormat: state.entity.data.base_date_format,
  const buttonLabel = {
    primary: {
      continue: t('common.continue'),
      stop: t('common.stopRecording'),
      record: t('common.startRecording'),
    },
    upload: { label: t('purchase_flow.recorder.different_video') },
    next: { label: t('common.next') },
  };

  const isDesktop = useMedia('(min-width: 1280px)');
  const isMobile = useMedia('(max-width: 831px)');
  const clearVideo = () => {
    updateMediaStore(dispatch,{
      videoSrc: null,
      superBuffer: null,
      recordedTime: null,
      recorded: false,
    });
    if (shouldRecord) props.recordTrigger();
    if (playPauseMediaFlg) props.playPauseMedia();
  };
  const [templateDet, setTemplateDet] = useState({});
  const [showLangModal, setLangModal] = useState(false);
  const [selectedBooking, updateSelectedBooking] = useState({});
  const [cardClicked, updateCardClicked] = useState(false);
  const [initialSelected, setInitialSelected] = useState(false);
  const [tabSwitch, setTabSwitch] = useState(false);
  const [reqOption, setReqOption] = useState({});
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState({});

  const requests = useMemo(() => {
    if (!isEmpty(reqOption)) {
      if (reqOption.id === 8 || reqOption.id === 'live') {
        if (reqOption.id === 'live') {
          return props.bookingsList.data.filter(
            req =>
              !isEmpty(req.fun_stuff_request_details) &&
              req.fun_stuff_request_details.delivery_method ===
                deliveryMethods.videoCalls,
          );
        }
        return props.bookingsList.data.filter(
          req =>
            req.request_type === reqOption.id &&
            !isEmpty(req.fun_stuff_request_details) &&
            req.fun_stuff_request_details.delivery_method !==
              deliveryMethods.videoCalls,
        );
      } else if (reqOption.id === 'sample') {
        return props.bookingsList.data.filter(req => req.practice_booking);
      } else if ([1, 2, 3].includes(reqOption.id)) {
        return props.bookingsList.data.filter(req =>
          [1, 2, 3].includes(req.request_type),
        );
      } else if (reqOption.id === 'all') {
        return props.bookingsList.data;
      }
      return props.bookingsList.data.filter(
        req => req.request_type === reqOption.id,
      );
    }
    return [];
  }, [
    reqOption.id,
    props.bookingsList.data.length,
    JSON.stringify(props.bookingsList.data),
  ]);

  const reqOptions = useMemo(() => {
    if (!isEmpty(reqCounts) && reqCounts?.all_request_count > 0) {
      const temp = getreqOptions(reqCounts);
      if (isEmpty(reqOption) || requests.length <= 0) setReqOption(temp[0]);
      return temp;
    }
    return [];
  }, [JSON.stringify(reqCounts), requests.length]);

  const updateSelected = booking => {
    if (props.selected !== booking.booking_id || !isDesktop) {
      updateSelectedBooking(
        requests.find(book => book.booking_id === booking.booking_id),
      );
      props.updateSelected(booking.booking_id);
      updateCardClicked(true);
      clearVideo();
    }
    window.scrollTo(0, 0);
  };

  const reqOptionChange = value => {
    setReqOption(value);
  };

  const getButtonLabels = () => {
    return buttonLabel;
  };

  const nextClick = () => {
    const selectedIndex = requests.findIndex(
      booking => booking.booking_id === props.selected,
    );
    if (requests.length > selectedIndex + 1) {
      props.updateSelected(requests[selectedIndex + 1].booking_id);
      updateSelectedBooking(requests[selectedIndex + 1]);
      clearVideo();
    } else if (requests.length > 0) {
      props.updateSelected(requests[0].booking_id);
      updateSelectedBooking(requests[0]);
      clearVideo();
    }
  };

  const backArrowHandler = () => {
    updateCardClicked(false);
    setInitialSelected(true);
    clearVideo();
  };

  const closeHandler = () => {
    updateCardClicked(false);
    setInitialSelected(true);
    clearVideo();
  };

  const removeBooking = selected => {
    clearVideo();
    props.removeBooking(selected);
  };

  const nextRequestHandler = (selected, clicked) => {
    nextClick();
    props.fetchUserDetails();
    props.removeBooking(selected);
    clearVideo();
    updateCardClicked(clicked);
  };

  const updateStatus = data => {
    if (!isEmpty(data)) {
      const temp = props.bookingsList.data.map(item => {
        if (item.booking_id === props.selected) {
          return { ...item, ...data };
        }
        return item;
      });
      props.updateBookingList(temp);
    }
  };

  const updateList = id => {
    const foundItem = props.bookingsList.data.find(
      booking => booking.booking_id === id,
    );
    if (foundItem) {
      props.updateBookingsList(id, {
        ...foundItem,
        star_sumbitted: true,
      });
      // props.removeBooking(id)
      queryClient.refetchQueries(['loggedUser'])
      // queryClient.refetchQueries(['bookings'])
      // props.fetchUserDetails();
    }
  };

  const onCompleteBooking = id => {
    // props.fetchBookingsList(0, true, celebOpenStatusList);
    queryClient.refetchQueries(['bookings'])
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

  const beforeShare = tid => type => {
    // props.loaderAction(true);
    // return new Promise((resolve, reject) => {
    //   const promiseList = [
    //     updateCelebrityShare('celebrity', { type, tid, shareSource: 2 }),
    //     // Added the share source per PM-2857, to track if the image was shared after a request completition
    //     sharePromoProfile(userData?.user.user_id, tid),
    //   ];
    //   Promise.all(promiseList)
    //     .then(() => {
    //       props.loaderAction(false);
    //       resolve();
    //     })
    //     .catch(exception => {
    //       props.loaderAction(false);
    //       reject();
    //       props.updateToast({
    //         value: true,
    //         message: exception.response.data.error.message,
    //         variant: 'error',
    //       });
    //     });
    // });
  };

  const onDenySuccess = () => {
    props.fetchBookingsList(0, true, celebOpenStatusList);
    nextRequestHandler(props.selected, true);
  };

  const closeCommercialSuccess = () => {
    setSuccess(false);
    updateSelectedBooking({})
  };

  const nextRequest = () => {
    props.updateBookingsList(successData.booking_id, {
      ...successData,
    });
    nextRequestHandler(props.selected, true);
    setSuccess(false);
  };
  // dummy
  const onAction = (data = {}) => (type = 'deny', comment, amount) => {
    if (type === 'approve' || type === 'accept') {
      if (!amount && type === 'approve') {
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
            updateList(data.booking_id);
            props.updateToast({
              value: true,
              message: t('common.reqUpdated'),
              variant: 'success',
            });
            setSuccess(true);
            setSuccessData({
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

  useEffect(() => {
    if (!isEmpty(props.selected)) {
      setInitialSelected(true);
      updateCardClicked(true);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(requests)) {
      if (!isEmpty(props.selected)) {
        updateSelectedBooking(
          requests.find(bookItem => bookItem.booking_id === props.selected) ||
            requests[0],
        );
        if (props.querySelection === props.selected) {
          updateCardClicked(true);
        }
      } else {
        props.updateSelected(requests[0].booking_id);
        updateSelectedBooking(requests[0]);
      }
    } else {
      updateSelectedBooking({});
      updateCardClicked(false);
    }
  }, [JSON.stringify(props.selected), JSON.stringify(requests)]);

  useEffect(() => {
    if (!isEmpty(props.bookingsList.data)) {
      if (hasDeclinedFlg) {
        nextRequestHandler(props.selected, isDesktop);
        props.hasDeclined(false);
      }
    }
  }, [hasDeclinedFlg]);

  useEffect(() => {
    if (templateDet?.id) {
      router.prefetch(`${window.location.origin}/${selectedBooking.celebrity_vanity}?tid=${templateDet.id}`)
    }
  }, [templateDet, templateDet.id, router, selectedBooking.celebrity_vanity])

  const showLang = lang => {
    return !isEmpty(lang) && defLangId.id !== lang.id ? lang.language : null;
  };

  useEffect(() => {
    clearVideo();
  }, [props.selected.booking_id]);

  useEffect(() => {
    if (selectedBooking.request_type) {
      const isLiveCall =
        selectedBooking.request_type === requestTypesKeys.digitalGoods &&
        selectedBooking.fun_stuff_request_details &&
        selectedBooking.fun_stuff_request_details.fun_stuff &&
        selectedBooking.fun_stuff_request_details.fun_stuff.delivery_method ===
          deliveryMethods.videoCalls;
      getShareImage(isLiveCall ? 'live' : selectedBooking.request_type).then(
        resp => {
          if (resp.templates) {
            setTemplateDet({
              ...resp.templates,
              id: resp.templates.id,
              template: resp.templates.background_url,
              beforeShare: beforeShare(resp.templates.id),
            });
          }
        },
      );
    }
    if (showLang(selectedBooking.language)) {
      setLangModal(true);
    } else {
      setLangModal(false);
    }
    setTimeout(() => {
      props.updateToast({
        value: false,
      });
    }, 1000);
  }, [selectedBooking.booking_id]);

  useEffect(() => {
    return () => {
      clearVideo();
    };
  }, []);

  const tabTrigger = () => {
    setTabSwitch(!tabSwitch);
  };
  const renderView = tab => {
    switch (tab) {
      case 'request':
        if (success) {
          return (
            <React.Fragment>
              <BackHeader
                backHandler={closeCommercialSuccess}
                closeCommercialSuccess={closeCommercialSuccess}
                label={t('open_bookings.openRequests')}
              />
              <SuccessScreen
                title={t('open_bookings.success.title')}
                successMsg=""
                note={t('open_bookings.success.note')}
                btnLabel={t('open_bookings.nextReq')}
                shareProps={
                  templateDet.id
                    ? {
                        shareUrl: `
                  ${window.location.origin}/${selectedBooking.celebrity_vanity}?tid=${templateDet.id}
                `,
                        starName:
                          selectedBooking.celebrity_nick_name ||
                          selectedBooking.celebrity_first_name,
                        shareImage: templateDet.template,
                        beforeShare: templateDet.beforeShare,
                      }
                    : {}
                }
                buttonHandler={nextRequest}
              />
            </React.Fragment>
          );
        }

        return (
          <CommercialCard
            {...props}
            key={selectedBooking.id}
            data={selectedBooking}
            isOpen
            onCompleteBooking={onCompleteBooking}
            onApprove={onAction(selectedBooking)}
            onDeny={onAction(selectedBooking)}
            classes={{ root: 'list-item' }}
            nextClick={nextClick}
            tabSwitch={tabTrigger}
          />
        );
      default:
        return (
          <Clarifications {...props} bookItem={selectedBooking} rootclass="cla-root" />
        );
    }
  };

  const ListWrapper = !isDesktop && !isMobile ? Scrollbars : React.Fragment;
  const listProps =
    !isDesktop && !isMobile
      ? {
          className: 'scroll-content',
          renderView: scrollProps => (
            <div id="open-scroll-content" {...scrollProps} />
          ),
          autoHide: true,
        }
      : {};

  return (
    <OpenStyled clicked={cardClicked}>
      <OpenStyled.LeftSection fullWidth={props.bookingsList.data.length === 0}>
        {!isMobile && (
          <Heading className="main-heading">
            {t('open_bookings.requests')}
          </Heading>
        )}
        {props.bookingsList.data.length > 0 && (
          <DefaultLang>
            <Link href="/manage/storefront/services/preferences/languages">
              <a>
                {t('open_bookings.defLanguage')}
                <span className="bold">{props.defaultLang}</span>
                <FontAwesomeIcon className="edit-lang" icon={faPencil} />
              </a>
            </Link>
          </DefaultLang>
        )}
        <Dropdown
          rootClass="drop-down open-drop"
          secondary
          className="select-drop"
          selected={props.dropValue}
          options={options(t)}
          labelKey="title"
          valueKey="id"
          onChange={props.handleCategoryChange}
          placeHolder="Select a request type"
        />
        {reqOptions.length > 0 && props.bookingsList.data.length > 0 && (
          <Dropdown
            rootClass="drop-down filter-open-drop"
            secondary
            className="select-drop"
            selected={reqOption}
            options={reqOptions}
            labelKey="title"
            valueKey="id"
            onChange={reqOptionChange}
          />
        )}
        {/* {!props.bookingsList.loading &&
          props.bookingsList.data.length === 0 && <MoreTips />} */}

          {!props.bookingsList.loading &&
          props.bookingsList.data.length === 0 && (
            <EmptyText className="empty-text">

                You currently do not have any requests. {
                  (userData?.user?.talent_status === accountStatus.live || userData?.user?.talent_status === accountStatus.paused) && (
                    <>
                    {"Visit"}
                      <Link href="/manage/promote/promo-share" shallow={true}>
                        <a>
                          {' '} {t('open_bookings.promote_yourself')} {' '}
                        </a>
                      </Link>
                      {"to get those requests."}
                    </>
                  )
                }
            </EmptyText>
          )}
        <OpenStyled.BookingList>
          <OpenListing
            customLoader
            dataList={requests.filter(req => !req.star_sumbitted)}
            noDataText=""
            loading={props.bookingsList.loading || props.bookingLoading}
            offset={props.bookingsList.offset}
            fetchData={(offset, refresh) => {
                props.infiniteBooking(offset)
              }
            }
            scrollTarget={isMobile ? null : 'open-scroll-target'}
            totalCount={props.bookingsList.count}
            selected={
              !isEmpty(selectedBooking) ? selectedBooking.booking_id : ''
            }
            limit={props.bookingsList.limit}
            expiration={props.config?.request_expiration_days_in_app || 7}
            onClick={updateSelected}
            initialSelected={initialSelected}
            dateFormat={dateFormat}
          />
          {/* </Scrollbars> */}
        </OpenStyled.BookingList>
      </OpenStyled.LeftSection>
      {!isEmpty(selectedBooking) &&
        (isDesktop || cardClicked) &&
        requests.length > 0 && (
          <OpenStyled.Modal>
            <OpenStyled.RightSection
              hasUpload={props.hasUploadBar}
              id="request-display"
              clicked={cardClicked}
            >
              <ListWrapper {...listProps}>
                {showLangModal && (
                  <LanguageModal
                    lang={showLang(selectedBooking.language)}
                    onClose={() => {
                      setLangModal(false);
                    }}
                  />
                )}
                {requestTypes[selectedBooking.request_type] === 'Commercial' &&
                  selectedBooking.request_status !== 2 && (
                    <React.Fragment>
                      <RequestHeader
                        key={selectedBooking.booking_id}
                        renderHeading={() => (
                          <React.Fragment>
                            {t('open_bookings.commercial.heading', {
                              from: selectedBooking.fan_first_name,
                            })}{' '}
                          </React.Fragment>
                        )}
                        tabsList={getTabsList(selectedBooking, undefined, entityData?.partnerData)}
                        selected={
                          tabSwitch
                            ? {
                                label: t(
                                  'open_bookings.commercial.tabs.label',
                                  { purchaser: entityData?.partnerData?.purchaser_singular_name },
                                ),
                                value: 'clarify',
                                highlight: true,
                              }
                            : getSelectedTab(selectedBooking, entityData?.partnerData)
                        }
                        fixedTitle={showLang(selectedBooking.language)}
                        onClose={closeHandler}
                      >
                        {selectedTab => (
                          <React.Fragment>
                            {renderView(selectedTab)}
                          </React.Fragment>
                        )}
                      </RequestHeader>
                    </React.Fragment>
                  )}

                {requestTypes[selectedBooking.request_type] === 'Message' &&
                  !isEmpty(selectedBooking.direct_message_details) && (
                    <ErrorHandler>
                      <MessageAction
                        booking={selectedBooking}
                        skipRequest={nextClick}
                        key={selectedBooking.booking_id}
                        showLang={showLang}
                        loaderAction={props.loaderAction}
                        updateToast={props.updateToast}
                        nextRequestHandler={nextRequestHandler}
                        backArrowHandler={backArrowHandler}
                        closeHandler={closeHandler}
                        toggleContactSupport={props.toggleContactSupport}
                        toggleUpdateBooking={props.toggleUpdateBooking}
                        updateBookingList={updateList}
                      />
                    </ErrorHandler>
                  )}

                {(requestTypes[selectedBooking.request_type] ===
                  'Social Shout-out' ||
                  requestTypes[selectedBooking.request_type] ===
                    'Social Promotion') &&
                  !isEmpty(selectedBooking.social_request_details) && (
                    <ErrorHandler>
                      <SocialShoutout
                        booking={selectedBooking}
                        skipRequest={nextClick}
                        showLang={showLang}
                        key={selectedBooking.booking_id}
                        removeBooking={removeBooking}
                        onAddResumeUpload={props.onAddResumeUpload}
                        backArrowHandler={backArrowHandler}
                        closeHandler={closeHandler}
                        templateDet={templateDet}
                        loaderAction={props.loaderAction}
                        updateToast={props.updateToast}
                        toggleUpdateBooking={props.toggleUpdateBooking}
                        nextRequestHandler={nextRequestHandler}
                        updateBookingList={updateList}
                      />
                    </ErrorHandler>
                  )}

                {requestTypes[selectedBooking.request_type] ===
                  'digitalGoods' &&
                  !isEmpty(selectedBooking.fun_stuff_request_details) && (
                    <ErrorHandler>
                      <FunStuff
                        {...props}
                        booking={selectedBooking}
                        skipRequest={nextClick}
                        showLang={showLang}
                        key={selectedBooking.booking_id}
                        backArrowHandler={backArrowHandler}
                        closeHandler={closeHandler}
                        templateDet={templateDet}
                        loaderAction={props.loaderAction}
                        updateToast={props.updateToast}
                        onAddResumeUpload={props.onAddResumeUpload}
                        toggleUpdateBooking={props.toggleUpdateBooking}
                        removeBooking={removeBooking}
                        nextRequestHandler={nextRequestHandler}
                        toggleContactSupport={props.toggleContactSupport}
                        updateStatus={updateStatus}
                        deliveryTypes={config?.fun_stuff_delivery}
                        updateBookingList={updateList}
                      />
                    </ErrorHandler>
                  )}

                {requestTypes[selectedBooking.request_type] === 'Commercial' &&
                  selectedBooking.request_status === 2 &&
                  !isEmpty(selectedBooking) && (
                    <ErrorHandler>
                      <Commercial
                        booking={selectedBooking}
                        skipRequest={nextClick}
                        key={selectedBooking.booking_id}
                        showLang={showLang}
                        onAddResumeUpload={props.onAddResumeUpload}
                        backArrowHandler={backArrowHandler}
                        closeHandler={closeHandler}
                        templateDet={templateDet}
                        removeBooking={removeBooking}
                        loaderAction={props.loaderAction}
                        updateToast={props.updateToast}
                        toggleUpdateBooking={props.toggleUpdateBooking}
                        nextRequestHandler={nextRequestHandler}
                        toggleContactSupport={props.toggleContactSupport}
                        updateStatus={updateStatus}
                        deliveryTypes={props.deliveryTypes}
                        updateBookingList={updateList}
                        defLangId={defLangId}
                      />
                    </ErrorHandler>
                  )}

                {requestTypes[selectedBooking.request_type] === 'Products' &&
                  !isEmpty(selectedBooking.product_request_details) && (
                    <ErrorHandler>
                      <Products
                        booking={selectedBooking}
                        skipRequest={nextClick}
                        key={selectedBooking.booking_id}
                        showLang={showLang}
                        backArrowHandler={backArrowHandler}
                        closeHandler={closeHandler}
                        templateDet={templateDet}
                        removeBooking={removeBooking}
                        loaderAction={props.loaderAction}
                        updateToast={props.updateToast}
                        toggleUpdateBooking={props.toggleUpdateBooking}
                        nextRequestHandler={nextRequestHandler}
                        toggleContactSupport={props.toggleContactSupport}
                        updateStatus={updateStatus}
                        carriers={
                          props.config.shipping_carriers
                            ? props.config.shipping_carriers.shipping_carriers
                            : []
                        }
                        updateBookingList={updateList}
                      />
                    </ErrorHandler>
                  )}

                {(requestTypes[selectedBooking.request_type] === 'Shout-out' ||
                  requestTypes[selectedBooking.request_type] === 'Event' ||
                  requestTypes[selectedBooking.request_type] === 'Q&A') && ( // open requests
                  <ErrorHandler>
                    <RespondAction
                      {...props}
                      recordTrigger={props.recordTrigger}
                      updateMediaStore={props.updateMediaStore}
                      playPauseMedia={props.playPauseMedia}
                      loaderAction={props.loaderAction}
                      showLang={showLang}
                      key={selectedBooking.booking_id}
                      onAddResumeUpload={props.onAddResumeUpload}
                      setVideoUploadedFlag={props.setVideoUploadedFlag}
                      updateToast={props.updateToast}
                      bookedItem={selectedBooking}
                      removeBooking={removeBooking}
                      buttonLabel={getButtonLabels()}
                      toggleContactSupport={props.toggleContactSupport}
                      toggleUpdateBooking={props.toggleUpdateBooking}
                      nextClick={nextClick}
                      backArrowHandler={backArrowHandler}
                      closeHandler={closeHandler}
                      templateDet={templateDet}
                      responseVideo={props.responseVideo}
                      requestId={props.selected}
                      nextRequestHandler={nextRequestHandler}
                      updateBookingList={updateList}
                    />
                  </ErrorHandler>
                )}
              </ListWrapper>
            </OpenStyled.RightSection>
          </OpenStyled.Modal>
        )}

      {props.bookingsList.loading && props.bookingsList.data.length <= 0 && (
        <Loader class="video-loader" />
      )}
      <div className="overlay-custom" />
    </OpenStyled>
  );
};

OpenBookings.propTypes = {
  bookingsList: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  dropValue: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  querySelection: PropTypes.string.isRequired,
  responseVideo: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  setVideoUploadedFlag: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateSelected: PropTypes.func.isRequired,
  selected: PropTypes.string,
  updateBookingList: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  hasDeclinedFlg: PropTypes.bool.isRequired,
  hasDeclined: PropTypes.func.isRequired,
  updateBookingsList: PropTypes.func.isRequired,
  fetchBookingsList: PropTypes.func.isRequired,
  setRequestType: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
  shouldRecord: PropTypes.bool.isRequired,
  playPauseMediaFlg: PropTypes.bool.isRequired,
  deliveryTypes: PropTypes.array,
  reqCounts: PropTypes.object,
  defaultLang: PropTypes.string,
};

OpenBookings.defaultProps = {
  selected: '',
  deliveryTypes: [],
  reqCounts: {},
  defaultLang: '',
};

function mapDispatchToProps(dispatch) {
  return {
    recordTrigger: value => {
      dispatch(recordTrigger(value));
    },
    updateMediaStore: payload => {
      dispatch(updateMediaStore(payload));
    },
    playPauseMedia: value => {
      dispatch(playPauseMedia(value));
    },
    loaderAction: value => {
      dispatch(loaderAction(value));
    },
    setVideoUploadedFlag: value => {
      dispatch(setVideoUploadedFlag(value));
    },
    removeBooking: bookId => dispatch(removeBooking(bookId)),
    updateToast: toastObj =>
      dispatch(updateToast({ ...toastObj, global: false })),
    responseVideo: (requestId, fileName, callBack) =>
      dispatch(responseVideo(requestId, fileName, callBack)),
    updateBookingList: data => {
      dispatch(updateBookingList(data));
    },
    onAddResumeUpload: (uploadObj, key) =>
      dispatch(onAddResumeUpload(uploadObj, key)),
    toggleUpdateBooking: (state, requestId, mode, requestData, onSuccess) =>
      dispatch(
        toggleUpdateBooking(state, requestId, mode, requestData, onSuccess),
      ),
    toggleContactSupport: state => dispatch(toggleContactSupport(state)),
    hasDeclined: value => {
      dispatch(hasDeclined(value));
    },
    fetchBookingsList: (
      offset,
      refresh,
      requestStatus,
      filterParam,
      sortParam,
      requestType,
    ) =>
      dispatch(
        fetchBookingsList(
          offset,
          refresh,
          requestStatus,
          filterParam,
          sortParam,
          requestType,
        ),
      ),
  };
}
export default OpenBookings
