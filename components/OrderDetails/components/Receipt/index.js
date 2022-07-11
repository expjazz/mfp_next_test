import React from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import PropTypes from 'prop-types';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { requestTypes } from 'src/constants/requestTypes';
import ToolTip from '../../../ToolTip';
import OrderStyled from '../../styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Receipt = ({
  starName,
  occasion,
  createdDate,
  practiceBooking,
  requestStatus,
  orderDetails,
  requestType,
  starMode,
  videoCreatedDate,
  comment,
}) => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const getActualPrice = () => {
    if (!starMode && orderDetails.amount_charged !== orderDetails.amount) {
      const promoAmount = orderDetails.amount - orderDetails.amount_charged;
      return `${getLocalSymbol()}${numberToDecimalWithFractionTwo(
        getLocalAmount(orderDetails.amount),
        false,
        false,
      )} - ${getLocalSymbol()}${numberToDecimalWithFractionTwo(
        getLocalAmount(promoAmount),
        false,
        false,
      )} Promo Code = ${getLocalSymbol()}${numberToDecimalWithFractionTwo(
        getLocalAmount(orderDetails.amount_charged),
        false,
        false,
      )}`;
    }
    return `${getLocalSymbol()}${numberToDecimalWithFractionTwo(getLocalAmount(orderDetails.amount), false, false)}`;
  };

  const getProduct = () => {
    if (requestTypes[requestType] === 'Commercial') {
      return t('common.commercial_request');
    } else if (requestTypes[requestType] === 'Q&A') {
      return t('common.a&a');
    } else if (requestTypes[requestType] === 'Event') {
      return t('common.occAnnounce', { occasion });
    } else if (requestTypes[requestType] === '"digitalGoods"') {
      return t('common.fun_stuff');
    }
    return t('common.occShoutout', {occasion});
  };

  return (
    <OrderStyled.DetailList>
      {!starMode && (
        <li className="detail-item">
          <span className="detail-title">{t('common.receipt.star')}</span>
          <span className="detail-value">{starName}</span>
        </li>
      )}
      <li className="detail-item">
        <span className="detail-title">
          {starMode ? t('common.orderStatus.purchased') : t('common.receipt.purchase_date')}:
        </span>
        <span className="detail-value">
          {moment(createdDate).format(entityData?.partnerData?.base_date_format)}
        </span>
      </li>
      {!starMode && (
        <li className="detail-item">
          <span className="detail-title">{t('common.receipt.product')}</span>
          <span className="detail-value">{getProduct()}</span>
        </li>
      )}
      <li className="detail-item">
        <span className="detail-title">
          {starMode ? t('common.paid') : t('common.receipt.amount_paid')}:
        </span>
        {practiceBooking ? (
          <ToolTip title={t('common.receipt.tooltip_title1')}>
            <span className="detail-value">{t('common.sample_booking_caps')}</span>
          </ToolTip>
        ) : (
          <ToolTip
            title={requestStatus === 'open' ? t('common.receipt.tooltip_title2') : ''}
          >
            <span className="detail-value">
              {requestStatus === 'cancelled' ? `${getLocalSymbol()}0.00` : `${getActualPrice()}`}
            </span>
          </ToolTip>
        )}
      </li>
      <li className="detail-item">
        <span className="detail-title">
          {starMode ? t('common.receipt.recorded') : t('common.receipt.recorded_delivered')}:
        </span>
        <span className="detail-value">
          {requestStatus === 'open' &&
            !starMode &&
            t('common.receipt.info', { talent: entityData?.partnerData?.talent_singular_name })}
          {requestStatus === 'open' &&
            starMode &&
            t('common.receipt.video_processing')}
          {requestStatus === 'cancelled' && t('common.cancelledCap')}
          {requestStatus === 'completed' &&
            moment(videoCreatedDate).format(entityData?.partnerData?.base_date_format)}
          {requestStatus === 'cancelled' && (
            <ToolTip title={t(t('common.receipt.tooltip_title3'))}>
              <span className="detail-comment">{comment}</span>
            </ToolTip>
          )}
        </span>
      </li>
      {(orderDetails.order || practiceBooking) && (
        <li className="detail-item">
          <span className="detail-title">{t('common.order#')}</span>
          <span className="detail-value">
            {practiceBooking ? t('common.n/a') : orderDetails.order}
          </span>
        </li>
      )}
    </OrderStyled.DetailList>
  );
};

Receipt.defaultProps = {
  orderDetails: {},
};

Receipt.propTypes = {
  createdDate: PropTypes.string.isRequired,
  practiceBooking: PropTypes.func.isRequired,
  requestStatus: PropTypes.string.isRequired,
  orderDetails: PropTypes.object,
  starMode: PropTypes.bool.isRequired,
  videoCreatedDate: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  starName: PropTypes.string.isRequired,
};

export default Receipt;
