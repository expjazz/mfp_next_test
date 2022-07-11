import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import Button from 'components/SecondaryButton';
// import { requestProduct } from 'services/index';
import StatusDisplay from 'components/StatusDisplay';
import BackHeader from 'components/BackHeader';
import { getStatusList, getDelivStatus } from 'src/utils/getDelivStatus';
import { TextInput } from 'components/TextField';
import RequestHeader from 'components/RequestHeader';
import TextArea from 'components/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'components/Dropdown';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { numberToCommaFormatter } from 'src/utils/dataformatter';
import { FlexCenter, Image } from 'styles/CommonStyled';
import Dialog from '@material-ui/core/Dialog';
import SuccessScreen from 'components/SuccessScreen';
import Clarifications from '../Clarifications';
import { getTabsList, getSelectedTab } from '../../utils';
import { Layout, AddressModal } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { requestProduct } from 'src/services/myfanpark/bookingActions';

const Products = props => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [completed, setCompleted] = useState(false);
  const isMounted = useRef(null);
  const [formData, updateFormData] = useState({
    details: '',
    trackingId: '',
    shippingCarrier: {},
  });
  const [addrModal, toggleAddrModal] = useState(false);
  const [show, showDesc] = useState(false);
  const {
    fan_first_name: fanFirstName,
    booking_id: bookingId,
    complete_status: completeStatus,
    product_request_details: reqDetails,
  } = props.booking;

  const triggerShow = () => {
    showDesc(!show);
  };

  const clearStates = done => {
    if (isMounted.current) {
      setCompleted(done);
    } else {
      nextRequest();
    }
    updateFormData({ details: '', trackingId: '' });
    showDesc(false);
  };

  const completeRequest = () => {
    const payload = {
      celebrity_reply: formData.details,
      tracking_number: formData.trackingId,
      shipping_carrier: !isEmpty(formData.shippingCarrier)
        ? formData.shippingCarrier.key
        : '',
      complete_status: t('common.completedSmall'),
    };
    props.loaderAction(true);
    requestProduct('response', bookingId, payload)
      .then(resp => {
        props.loaderAction(false);
        if (resp.booking) {
          clearStates(true);
          props.updateBookingList(bookingId);
        } else {
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
          });
        }
      })
      .catch(() => {
        props.loaderAction(false);
        props.updateToast({
          value: true,
          message: t('open_bookings.failedCompletionError'),
          variant: 'error',
        });
      });
  };

  const updateStatus = status => {
    props.loaderAction(true);
    requestProduct('response', bookingId, {
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
  const updateStatusVal = statusVal => {
    updateStatus(statusVal.value);
  };

  const denyRequest = () => {
    props.toggleUpdateBooking(true, bookingId, true, props.booking);
  };

  const nextRequest = () => {
    props.nextRequestHandler(bookingId, true);
    clearStates(false);
  };

  const inputChange = state => event => {
    updateFormData({ ...formData, [state]: event.target.value });
  };

  const onCarrierChange = carrier => {
    updateFormData({ ...formData, shippingCarrier: carrier });
  };

  const showAddrModal = state => () => {
    toggleAddrModal(state);
  };

  const carriers = useMemo(() => {
    return props.carriers.map(carrier => ({ label: carrier, key: carrier }));
  }, [props.carriers.length]);

  const successGoToOpen = () => {
    nextRequest();
    props.backArrowHandler();
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, [])

  useEffect(() => {
    clearStates(false);
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
          title={t('open_bookings.merch.successtitle')}
          successMsg=""
          note={t('open_bookings.merch.note', { name: fanFirstName })}
          btnLabel={t('open_bookings.nextReq')}
          shareProps={
            props.templateDet.id
              ? {
                  shareUrl: `
              ${window.location.origin}/${props.booking.celebrity_vanity}?tid=${props.templateDet.id}
            `,
                  starName:
                    props.booking.celebrity_nick_name ||
                    props.booking.celebrity_first_name,
                  shareImage: props.templateDet.template,
                  beforeShare: props.templateDet.beforeShare,
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
                <span className="sub-head ">
                  {t('open_bookings.merch.mailto')}
                </span>
                <span className="text capitalize">
                  {reqDetails.shipping_full_name}
                </span>
                <span className="text capitalize">
                  {reqDetails.shipping_address_1}
                </span>
                {reqDetails.shipping_address_2 && (
                  <span className="text capitalize">
                    {reqDetails.shipping_address_2}
                  </span>
                )}
                <span className="text capitalize">
                  {reqDetails.shipping_city}, {reqDetails.shipping_state}
                  {reqDetails.shipping_country
                    ? `, ${reqDetails.shipping_country} `
                    : ' '}
                  {reqDetails.shipping_zip_code}
                </span>
                {reqDetails.shipping_phone && (
                  <span className="text capitalize">
                    {reqDetails.shipping_phone}
                  </span>
                )}
                <span
                  className="link"
                  role="presentation"
                  onClick={showAddrModal(true)}
                >
                  {t('open_bookings.merch.returnAdd')}
                </span>
              </span>
            </span>
            <span className="flex-col req-sec">
              <span className="sub-head">
                {t('open_bookings.merch.merchandisePurchased')}
              </span>
              <span className="flex-box">
                <Image
                  className="image"
                  image={
                    reqDetails.product.product_image &&
                    reqDetails.product.product_image.length > 0
                      ? reqDetails.product.product_image[0]
                      : null
                  }
                ></Image>
                <span className="flex-col prod-info">
                  <span className="text">{reqDetails.product.title}</span>
                  <span className="text">
                    ${numberToCommaFormatter(reqDetails.product.price)}
                  </span>
                  <span
                    className="link"
                    role="presentation"
                    onClick={triggerShow}
                  >
                    {show
                      ? t('open_bookings.hideCallDetailsProduct')
                      : t('open_bookings.showCallDetailsProduct')}
                  </span>
                </span>
              </span>
              {show && (
                <span className="text details">
                  {reqDetails.product.description}
                </span>
              )}
            </span>
            {reqDetails.description && (
              <span className="flex-col req-sec">
                <span className="sub-head">
                  {t('open_bookings.requestDetails')}
                </span>
                <span className="text">{reqDetails.description}</span>
              </span>
            )}
            <span className="flex-col req-sec">
              <span className="sub-head">
                {t('open_bookings.merch.fulfillReq')}
              </span>
              <span className="text">
                {t('open_bookings.merch.info', {
                  purchaser: entityData?.partnerData?.purchaser_plural_name,
                })}
              </span>
              <span className="horiz-btns status-display">
                <StatusDisplay
                  key={props.booking.booking_id}
                  list={getStatusList(completeStatus)}
                  onSelect={updateStatusVal}
                  selected={getDelivStatus(completeStatus)}
                />
              </span>
            </span>
            <span className="flex-col req-sec">
              <span className="sub-head">
                {t('open_bookings.completeOrder')}
              </span>
              <span className="text">
                {t('open_bookings.merch.trackingNote')}
                <a
                  className="link"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://about.myfanpark.com/shipping"
                >
                  {' '}
                  {t('open_bookings.merch.shippingTerms')}
                </a>
              </span>
            </span>
            <TextInput
              label={t('open_bookings.merch.t_bumber_input_lbl')}
              onChange={inputChange('trackingId')}
              value={formData.trackingId}
              InputProps={{
                classes: { error: 'error-field', input: 'input-field' },
              }}
              InputLabelProps={{
                classes: { shrink: 'input-label-shrink', root: 'float-label' },
              }}
              nativeProps={{ type: 'text', maxLength: 50 }}
            />
            <Dropdown
              rootClass="state-drop"
              secondary
              selected={formData.shippingCarrier}
              options={carriers || []}
              labelKey="label"
              valueKey="key"
              onChange={onCarrierChange}
              placeHolder={t('open_bookings.merch.carrier_drop_placeholder')}
              className="cus-drop"
            />
            <TextArea
              className="textarea"
              autoSize
              inputProps={{
                onChange: inputChange('details'),
                value: formData.details,
                maxLength: 500,
                placeholder: t(
                  'open_bookings.merch.comments_input_placeholder',
                ),
              }}
            />
            <FlexCenter className="buttons">
              <Button className="fun-btns" onClick={completeRequest}>
                {t('open_bookings.merch.markShipped')}
              </Button>
              <span
                onClick={denyRequest}
                role="presentation"
                className="link-btn"
              >
                {t('open_bookings.declineRequest')}
              </span>
            </FlexCenter>
          </React.Fragment>
        );
      default:
        return <Clarifications bookItem={props.booking} {...props} />;
    }
  };

  return (
    <React.Fragment>
      <Dialog open={addrModal} onClose={showAddrModal(false)}>
        <AddressModal>
          <FontAwesomeIcon
            onClick={showAddrModal(false)}
            icon={faTimes}
            className="close-icon"
          />
          <span className="text">
            {t('open_bookings.merch.return_add_note')}
          </span>
          <div className="address-wrapper">
            <span className="text">
              {entityData?.partnerData?.partner_name} - {t('open_bookings.merch.ret_dept')}
            </span>
            <span className="text">{t('open_bookings.merch.attn')}: {t('open_bookings.merch.return_name')}</span>
            <span className="text">{t('open_bookings.merch.address1')}</span>
            <span className="text">{t('open_bookings.merch.address2')}</span>
          </div>
        </AddressModal>
      </Dialog>
      <RequestHeader
        key={props.booking.booking_id}
        renderHeading={() => (
          <React.Fragment>
            {t('open_bookings.merch.heading', { name: fanFirstName })}
          </React.Fragment>
        )}
        fixedTitle={props.showLang(props.booking.language)}
        onClose={props.closeHandler}
        tabsList={getTabsList(props.booking, undefined, entityData?.partnerData)}
        selected={getSelectedTab(props.booking, entityData?.partnerData)}
      >
        {selectedTab => (
          <Layout hasState={!isEmpty(formData.shippingCarrier)}>
            {renderView(selectedTab)}
          </Layout>
        )}
      </RequestHeader>
    </React.Fragment>
  );
};

Products.propTypes = {
  backArrowHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  nextRequestHandler: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  carriers: PropTypes.array.isRequired,
  updateBookingList: PropTypes.func.isRequired,
};

export default Products;
