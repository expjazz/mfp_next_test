import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import BackHeader from 'components/BackHeader';
import RequestHeader from 'components/RequestHeader';
import { LinkText } from 'styles/TextStyled';
import Dropdown from 'components/Dropdown';
import { getRedirectURL } from 'customHooks/domUtils';
import { awsKeys } from 'src/constants/';
// import { sendDigitalGoods } from 'services/index';
import ImagePreview from 'components/ImagePreview';
import { FlexCenter, Image } from 'styles/CommonStyled';
import SuccessScreen from 'components/SuccessScreen';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { isCallReady } from 'src/utils/videoCall';
import TypeChooser from './Components/TypeChooser';
import Clarifications from '../Clarifications';
import { getTabsList, getSelectedTab } from '../../utils';
import { Layout } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { sendDigitalGoods } from 'src/services/myfanpark/bookingActions';
import { capitalize } from '@material-ui/core';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const FunStuff = props => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const {
    fan_first_name: fanFirstName,
    booking_id: bookingId,
    complete_status: completeStatus,
    fun_stuff_request_details: reqDetails,
  } = props.booking;

  const [preview, setPreview] = useState(null);
  const isMounted = useRef(null);
  const [completed, setCompleted] = useState(false);
  const [deliver, setDeliver] = useState('');
  const [show, showDesc] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const triggerShow = () => {
    showDesc(!show);
  };

  const clearStates = (done, status, resp = {}, updateReqDetails) => {
    setCompleted(false);
    if (status === 'completed') {
      if (isMounted.current) {
        setCompleted(done);
      } else {
        props.removeBooking(bookingId);
      }
    } else if (!isEmpty(status)) {
      props.updateToast({
        value: true,
        message: t('common.updatedSuccessfully'),
        variant: 'success',
      });
    }
    if (updateReqDetails && !isEmpty(updateReqDetails(resp))) {
      props.updateStatus({
        ...updateReqDetails(resp),
      });
    }
    showDesc(false);
  };

  const completeFunStuff = (payload, updateReqDetails) => {
    if (isMounted.current) {
      props.loaderAction(true);
    }
    sendDigitalGoods('response', bookingId, payload)
      .then(resp => {
        props.loaderAction(false);
        if (resp.booking) {
          if (reqDetails.delivery_method !== deliveryMethods.videoCalls) {
            props.updateBookingList(bookingId);
          }
          clearStates(true, payload.complete_status, resp, updateReqDetails);
        } else {
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
            global: true
          });
        }
      })
      .catch((e) => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('open_bookings.failedCompletionError'),
          variant: 'error',
        });
      });
  };

  const uploadFiles = async (
    customPayload,
    files = [],
    updateReqDetails = () => ({}),
  ) => {
    const request = [];
    if (files.length) {
      let uploadDet = {
        onSuccess: (processedFiles) => {
          window.scrollTo(0, 0);
          processedFiles.forEach((processFile, index) => {
            request.push({
              file_name: processFile.fileName,
              file_type: files[index].file_type,
              recorded: files[index].type !== 'upload',
              file_size: files[index].file_size,
            });
          })
          const payload = {
            type: 'response',
            booking_id: bookingId,
            request_files: request,
            complete_status: 'completed',
            ...customPayload,
          };
          completeFunStuff(payload, updateReqDetails);
        },
        files: [],
      }
      const re = /(?:\.([^.]+))?$/;
      files.forEach(file => {
        uploadDet = {
          ...uploadDet,
          id: bookingId,
          files: [...uploadDet.files, {
            title: `Funstuff Item for ${fanFirstName}`,
            fileName: file.file_name,
            key: awsKeys.digitalResponse,
            file: file.file,
            extension: re.exec(file.file_name) ? re.exec(file.file_name)[1] : '',
            type: file.file_type,
            bookingId
          }]
        }
      });
      props.onAddResumeUpload(uploadDet, bookingId);
    } else {
      props.loaderAction(true);
      const payload = {
        type: 'response',
        booking_id: bookingId,
        complete_status: 'completed',
        ...customPayload,
      };
      completeFunStuff(payload, updateReqDetails);
    }
  };

  const updateRequest = (
    payload,
    updateDetailsPayload = () => ({}),
    onSuccess,
  ) => {
    props.loaderAction(true);
    sendDigitalGoods('update', bookingId, {
      ...payload,
    }).then(resp => {
      props.loaderAction(false);
      if (resp.booking) {
        props.updateToast({
          value: true,
          message: t('common.updatedSuccessfully'),
          variant: 'success',
        });
        props.updateStatus({
          ...updateDetailsPayload(resp),
        });
        setShowDelivery(false);
        if (onSuccess) onSuccess();
      } else {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: resp.message,
          variant: 'error',
        });
      }
    });
  };

  const onSuccessDelivery = type => () => {
    setDeliver(type);
  };

  const editDelivery = type => {
    updateRequest(
      {
        delivery_method: type.id,
      },
      () => ({
        fun_stuff_request_details: {
          ...reqDetails,
          delivery_method: type.delivery_type,
        },
      }),
      onSuccessDelivery(),
    );
  };

  const rescheduleCall = (payload, updateDetails, onSuccess) => {
    updateRequest(
      {
        ...payload,
      },
      updateDetails,
      onSuccess,
    );
  };

  const previewImage = src => () => {
    setPreview(src);
  };

  const modalClose = () => {
    setPreview(null);
  };

  const updateStatus = status => {
    props.loaderAction(true);
    sendDigitalGoods('response', bookingId, {
      complete_status: status,
    }).then(resp => {
      props.loaderAction(false);
      if (resp.booking) {
        props.updateToast({
          value: true,
          message: t('open_bookings.statusUpdated'),
          variant: 'success',
        });
        props.updateStatus({ complete_status: status });
      } else {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: resp.message,
          variant: 'error',
        });
      }
    });
  };

  const deliverChange = value => {
    editDelivery(value);
  };

  const changeToLink = () => {
    deliverChange(
      props.deliveryTypes.find(deliv => deliv.delivery_type === 4), // change to link type
    );
  };

  const changeDelivery = value => () => {
    setShowDelivery(value);
  };

  const updateStatusVal = statusVal => {
    updateStatus(statusVal.value);
  };

  const denyRequest = title => {
    props.toggleUpdateBooking(true, bookingId, true, {
      ...props.booking,
      customTitle: title,
    });
  };

  const declineRequest = () => {
    denyRequest('');
  };
  const nextRequest = () => {
    props.nextRequestHandler(bookingId, true);
    clearStates(false);
  };

  const successGoToOpen = () => {
    nextRequest();
    props.backArrowHandler();
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    clearStates(false);
    setShowDelivery(false);
    const deliveryMethod = props.deliveryTypes.find(
      type => type.delivery_type === reqDetails.delivery_method,
    );
    setDeliver(deliveryMethod);
  }, [props.booking.booking_id]);

  if (completed) {
    return (
      <React.Fragment>
        <BackHeader
          backHandler={successGoToOpen}
          closeHandler={nextRequest}
          label={t('open_bookings.openRequests')}
        />
        <SuccessScreen
          title={t('open_bookings.funStuff.successtitle')}
          successMsg=""
          note={t('open_bookings.funStuff.note', { name: fanFirstName })}
          btnLabel={t('open_bookings.nextReq')}
          shareProps={
            props.templateDet.id
              ? {
                  shareUrl: `
              ${window.location.origin}/${props.booking.celebrity_vanity}?tid=${props.templateDet.id}
            `,
                  shareImage: props.templateDet.template,
                  beforeShare: props.templateDet.beforeShare,
                  starName:
                    props.booking.celebrity_nick_name ||
                    props.booking.celebrity_first_name,
                }
              : {}
          }
          buttonHandler={nextRequest}
        />
      </React.Fragment>
    );
  }

  const renderView = tab => {
    switch (tab) {
      case 'request':
        return (
          <React.Fragment>
            {completeStatus === 'in_progress' && (
              <span className="fun-status">
                {t('open_bookings.in_progress')}
              </span>
            )}
            {completeStatus === 'almost_finished' && (
              <span className="fun-status">
                {t('open_bookings.almost_finished')}
              </span>
            )}
            <span className="platform-sec">
              <span className="flex-col">
                <span className="sub-head">{t('open_bookings.for')}</span>
                <span className="text capitalize">
                  {props.booking.fan_first_name}
                </span>
              </span>
            </span>
            <span className="flex-col req-sec">
              <span className="sub-head">
                {t('open_bookings.itemRequested')}
              </span>
              <span className="text">
                {reqDetails.fun_stuff.title}
                {reqDetails.delivery_method === deliveryMethods.videoCalls &&
                reqDetails.fun_stuff.meeting_duration
                  ? ` - ${reqDetails.fun_stuff.meeting_duration} ${t('common.time.minute', {count: reqDetails.fun_stuff.meeting_duration})}`
                  : ''}
              </span>
              <span className="link" role="presentation" onClick={triggerShow}>
                {reqDetails.delivery_method === deliveryMethods.videoCalls && (
                  <React.Fragment>
                    {show
                      ? t('open_bookings.hideCallDetails')
                      : t('open_bookings.showCallDetails')}
                  </React.Fragment>
                )}
                {reqDetails.delivery_method !== deliveryMethods.videoCalls && (
                  <React.Fragment>
                    {show
                      ? t('open_bookings.hideCallDetailsProduct')
                      : t('open_bookings.showCallDetailsProduct')}
                  </React.Fragment>
                )}
              </span>
              {show && (
                <span className="text">{reqDetails.fun_stuff.description}</span>
              )}
            </span>
            <span className="flex-col req-sec">
              <span className="sub-head">
                {reqDetails.delivery_method === deliveryMethods.videoCalls
                  ? t('open_bookings.preferences', {
                      purchaser: capitalize(entityData?.partnerData?.purchaser_singular_name),
                    })
                  : t('open_bookings.requestDetails')}
              </span>
              <span className="text">{reqDetails.description}</span>
              {reqDetails.fan_url && (
                <span className="text">
                  {t('open_bookings.funStuff.linkProvided')}{' '}
                  <LinkText>
                    <a
                      href={getRedirectURL(reqDetails.fan_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reqDetails.fan_url}
                    </a>{' '}
                  </LinkText>
                </span>
              )}
              {reqDetails.fan_image && (
                <div className="fan-image">
                  <Image image={reqDetails.fan_image} />
                  <LinkText onClick={previewImage(reqDetails.fan_image)}>
                    {t('open_bookings.funStuff.viewImage')}{' '}
                  </LinkText>
                </div>
              )}
            </span>

            {showDelivery && (
              <div className="flex-col deliver-wrp">
                <span className="sub-head">
                  {t('open_bookings.funStuff.deliveryType')}
                </span>
                <Dropdown
                  rootClass="deliver-drop"
                  selected={deliver}
                  options={props.deliveryTypes.filter(
                    delivMet =>
                      delivMet.delivery_type !== deliveryMethods.videoCalls,
                  )}
                  labelKey="title"
                  valueKey="id"
                  onChange={deliverChange}
                  placeHolder={t('open_bookings.funStuff.placeHolder')}
                  secondary
                />
                <FlexCenter className="cancel-deli">
                  <LinkText onClick={changeDelivery(false)}>
                    {t('open_bookings.cancel')}
                  </LinkText>
                </FlexCenter>
              </div>
            )}
            {!showDelivery && (
              <TypeChooser
                {...props}
                delivMethod={reqDetails.delivery_method}
                bookId={bookingId}
                changeToLink={changeToLink}
                completeUpload={uploadFiles}
                denyRequest={denyRequest}
                completeStatus={completeStatus}
                updateStatusVal={updateStatusVal}
                booking={props.booking}
                updateToast={props.updateToast}
                editDelivery={editDelivery}
                deliveryTypes={props.deliveryTypes}
                rescheduleCall={rescheduleCall}
                updateDetails={props.updateStatus}
              />
            )}
            <FlexCenter className="buttons deliveryBtn">
              {(reqDetails.delivery_method !== deliveryMethods.videoCalls ||
                ((reqDetails.delivery_method === deliveryMethods.videoCalls &&
                  reqDetails.meeting_date &&
                  !isCallReady(reqDetails.meeting_date)) ||
                  !reqDetails.meeting_date)) && (
                <span
                  onClick={declineRequest}
                  role="presentation"
                  className="link-btn"
                >
                  {t('open_bookings.declineRequest')}
                </span>
              )}
              {!showDelivery &&
                reqDetails.delivery_method !== deliveryMethods.videoCalls && (
                  <span
                    onClick={changeDelivery(true)}
                    role="presentation"
                    className="link-btn"
                  >
                    {t('open_bookings.funStuff.changeDelivery')}
                  </span>
                )}
            </FlexCenter>
          </React.Fragment>
        );
      default:
        return <Clarifications bookItem={props.booking} {...props} />;
    }
  };

  return (
    <React.Fragment>
      <RequestHeader
        key={props.booking.booking_id}
        renderHeading={() => (
          <React.Fragment>
            {reqDetails.delivery_method === deliveryMethods.videoCalls
              ? t('open_bookings.funStuff.liveReq', {
                  name: fanFirstName,
                })
              : t('open_bookings.funStuff.funReq', {
                  name: fanFirstName,
                })}
          </React.Fragment>
        )}
        fixedTitle={props.showLang(props.booking.language)}
        onClose={props.closeHandler}
        tabsList={getTabsList(props.booking, undefined, entityData?.partnerData)}
        selected={getSelectedTab(props.booking, entityData?.partnerData)}
      >
        {selectedTab => <Layout>{renderView(selectedTab)}</Layout>}
      </RequestHeader>

      {preview && (
        <ImagePreview
          src={preview}
          open={preview !== null}
          onClose={modalClose}
        />
      )}
    </React.Fragment>
  );
};

FunStuff.propTypes = {
  backArrowHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  nextRequestHandler: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  deliveryTypes: PropTypes.array.isRequired,
  updateBookingList: PropTypes.func.isRequired,
};

export default FunStuff;
