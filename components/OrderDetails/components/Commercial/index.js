import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FlexCenter } from 'styles/CommonStyled';
import PaymentSuccess from '../PaymentSuccess';
import ReceiptDisplay from '../ReceiptDisplay';
import { generateReceipt } from './util';
import { Layout } from './styled';
import OrderStyled, {
  DetailWrapper,
  DetailHead,
  DetailDesc,
} from '../../styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Commercial = props => {
  const { t } = useTranslation();
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { data: entityData } = useGetPartner()
  const { commercial_details: reqDetails, celebrity } = props.bookingData;
  const { bookingData, starMode, requestType, starName } = props;
  const [showPaymentSuccess, togglePaymentSuccess] = useState(false);

  const changePaymentSuccess = state => () => {
    togglePaymentSuccess(state);
    if (!state) {
      props.closeModal();
      props.onPaymentSuccess(bookingData.booking_id);
    }
  };

  if (showPaymentSuccess) {
    return (
      <PaymentSuccess
        showPaymentSuccess={showPaymentSuccess}
        changePaymentSuccess={changePaymentSuccess(false)}
        starName={props.starName}
        userId={bookingData.celebrity_id}
      />
    );
  }

  return (
    <Layout
      isCommercial={
        !starMode &&
        requestType === 'commercial-open' &&
        reqDetails.star_approved
      }
    >
      <div className="content-data">
        <DetailWrapper className="image-wrapper">
          <span>
            <DetailHead>{t('common.ordered_item')}:</DetailHead>
            {!starMode && <DetailDesc>{celebrity}</DetailDesc>}
            <DetailDesc className="capitalise">
              {reqDetails.fan_request}
            </DetailDesc>
            <DetailDesc>{reqDetails.offering.description}</DetailDesc>
          </span>
        </DetailWrapper>
        {reqDetails.description && (
          <DetailWrapper>
            <DetailHead>{t('common.request')}:</DetailHead>
            <DetailDesc>{reqDetails.fan_request}</DetailDesc>
          </DetailWrapper>
        )}
        <ReceiptDisplay
          detailClasses={{
            title: 'detail-title',
          }}
          receiptArray={generateReceipt({...props.bookingData, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})[requestType]}
        />
        {!starMode && requestType === 'open' && (
          <FlexCenter className="order-action">
            <OrderStyled.TextButton onClick={props.cancelBooking}>
              {t('common.cancel_request')}
            </OrderStyled.TextButton>
          </FlexCenter>
        )}
      </div>
    </Layout>
  );
};

Commercial.propTypes = {
  bookingData: PropTypes.object.isRequired,
  requestType: PropTypes.string,
  starName: PropTypes.string,
  cancelBooking: PropTypes.func.isRequired,
  goToPurchase: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  paymentFetchSuccess: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  createCharge: PropTypes.func.isRequired,
  starMode: PropTypes.bool,
};
Commercial.defaultProps = {
  starMode: false,
  requestType: '',
  starName: ' ',
};

export default Commercial;
