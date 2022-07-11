import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/pro-light-svg-icons';
import {
  requestTypes,
  requestTypeTitle,
  requestTypesKeys,
} from 'src/constants/requestTypes';
import { getFor, numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { getLocalAmount } from 'utils/currencyUtils';
import { CardItem, Status, DateCol, DetailRow, DetailCol } from './styled';

const PaymentItem = props => {
  const dateFormat = props.entityData?.base_date_format
  const { t } = useTranslation();
  const [expand, setExpand] = useState(false);
  const { data } = props;

  const getLocalAmount = value => value || 0;
  let occasionCus = '';
  if (data.starsona.occasion_id === 18) {
    occasionCus = t('common.shoutoutCap');
  } else if (data.starsona.occasion_id === 24) {
    occasionCus = t('common.announcementCap');
  } else if (requestTypes[data.starsona.request_type] === 'Commercial') {
    occasionCus = t('common.commercialCap');
  }
  const bookingData = {
    ...data.starsona,
  };

  const onExpand = () => {
    setExpand(!expand);
  };
  const checkOther = () => {
    if (data.transaction_type === 'Tip Transaction') {
      return <span className="script-msg">{t('common.tip_payment')}</span>;
    } else if (data.starsona.request_type === requestTypesKeys.socialShoutout) {
      return (
        <span className="script-msg">
          {t('common.fanViewWrap.social_media_2', {
            requestData: data.starsona.fan_first_name,
          })}
        </span>
      );
    } else if (data.starsona.request_type === requestTypesKeys.promotion) {
      return (
        <span className="script-msg">
          {t('common.fanViewWrap.social_media_4', {
            requestData: data.starsona.fan_first_name,
          })}
        </span>
      );
    } else if (data.starsona.request_type === requestTypesKeys.digitalGoods) {
      return (
        <span className="script-msg">
          {t('common.fanViewWrap.fun_stuff_2', {
            requestData: data.starsona.fan_first_name,
          })}
        </span>
      );
    } else if (data.starsona.request_type === requestTypesKeys.products) {
      return (
        <span className="script-msg">
          {t('common.fanViewWrap.personalised_merch', {
            requestData: data.starsona.fan_first_name,
          })}
        </span>
      );
    }
    if (data.starsona.request_type === requestTypesKeys.message) {
      return (
        <span className="script-msg">
          {t('common.fanViewWrap.dm_for', {
            name: data.starsona.fan_first_name,
          })}
        </span>
      );
    } else if (data.starsona.occasion === 'Live Question and Answer') {
      return (
        <span className="script-msg">
          {t('common.fanViewWrap.qa_for', {
            name: data.starsona.fan_first_name,
            occasion: data.starsona.occasion,
          })}
        </span>
      );
    } else if (
      data.starsona.occasion_id !== 18 &&
      data.starsona.occasion_id !== 24 &&
      requestTypes[data.starsona.request_type] !== 'Commercial'
    ) {
      return (
        <span className="script-msg">
          {t('common.fanViewWrap.comm_for', {
            occation: data.starsona.occasion,
            type: requestTypeTitle[data.starsona.request_type],
            name: getFor(bookingData),
          })}
        </span>
      );
    }
    return (
      <span className="script-msg">
        {t('common.fanViewWrap.mes_for', {
          occation: occasionCus,
          name: getFor(bookingData),
        })}
      </span>
    );
  };

  const getStatus = status => {
    if (status === 'Pending') {
      return t('common.processing_uppercamel');
    } else if (status === 'Payout Failed') {
      return t('common.payout_failed');
    }
    return t('common.paid');
  };

  return (
    <CardItem>
      <DateCol>
        {moment(data.fulfillment_date || data.created_date).format(
          dateFormat,
        )}
      </DateCol>
      <DetailCol>
        <DetailRow>
          <span className="detail-col pay-name">{checkOther()}</span>
          <Status className="detail-col">
            {getStatus(data.payout_status)}
          </Status>
          <span className="detail-col amount highlight">
            {data.practice_transaction ? (
              <span className="sample-label">
                {t('common.sample_booking_caps')}
              </span>
            ) : (
              `$${numberToDecimalWithFractionTwo(
                getLocalAmount(data.amount) || '0.00',
                false,
                false,
              )}`
            )}
            <FontAwesomeIcon
              icon={expand ? faMinusCircle : faPlusCircle}
              onClick={onExpand}
            />
          </span>
        </DetailRow>
        {expand && (
          <React.Fragment>
            <DetailRow className="sub-row">
              <span className="detail-col pay-name">
                {t('earnings.original_price')}
              </span>
              <Status className="detail-col"></Status>
              <span className="detail-col amount">
                $
                {numberToDecimalWithFractionTwo(
                  getLocalAmount(
                    data.transaction_type !== 'Tip Transaction'
                      ? data.original_amount
                      : data.full_amount,
                  ) || '0.00',
                  false,
                  false,
                )}
              </span>
            </DetailRow>
            {data.promocode_discount && (
              <DetailRow className="sub-row">
                <span className="detail-col pay-name">
                  {t('earnings.coupon_discount')}
                  {data.platform_paid_promocode
                    ? ` ${t('earnings.paid_by')}`
                    : ''}
                </span>
                <Status className="detail-col"></Status>
                <span className="detail-col amount">
                  {data.promocode_type === 2 && `-${data.promocode_discount}%`}
                  {data.promocode_type === 1 &&
                    `-$${numberToDecimalWithFractionTwo(
                      getLocalAmount(data.promocode_discount) || '0.00',
                      false,
                      false,
                    )}`}
                </span>
              </DetailRow>
            )}
            <DetailRow className="sub-row">
              <span className="detail-col pay-name">
                {t('earnings.platform_fee')}
              </span>
              <Status className="detail-col"></Status>
              <span className="detail-col amount">
                -$
                {numberToDecimalWithFractionTwo(
                  getLocalAmount(data.starsona_cut) || '0.00',
                  false,
                  false,
                )}
              </span>
            </DetailRow>
            <DetailRow className="sub-row">
              <span className="detail-col pay-name">
                {t('earnings.total_payment')}
              </span>
              <Status className="detail-col"></Status>
              <span className="detail-col amount">
                $
                {numberToDecimalWithFractionTwo(
                  getLocalAmount(data.amount) || '0.00',
                  false,
                  false,
                )}
              </span>
            </DetailRow>
          </React.Fragment>
        )}
        {/* <DetailRow>
          <span className="detail-col pay-name">{t('common.proccessing_fee')}</span>
          <Status className="detail-col"></Status>
          <span className="detail-col amount">
            -${numberToDecimalWithFractionTwo(data.stripe_fee || '0.00', false, false)}
          </span>
        </DetailRow> */}
      </DetailCol>
      <section className="right-sec"></section>
    </CardItem>
  );
};

// PaymentItem.propTypes = {
//   data: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//   dateFormat: state.entity.data.base_date_format,
// });

export default PaymentItem
