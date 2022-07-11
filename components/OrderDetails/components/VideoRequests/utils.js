import { requestTypesKeys } from 'src/constants/requestTypes';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
import { i18n } from 'next-i18next';
// import { getLocalAmount } from 'utils/currencyUtils';

const getLocalAmount = value => value;
const entity = value => value
const getActualPrice = (orderDetails, starMode, getLocalAmount) => {
  if (!starMode && orderDetails.amount_charged !== orderDetails.amount) {
    const promoAmount = getLocalAmount(orderDetails.amount) - getLocalAmount(orderDetails.amount_charged);
    return `$${numberToDecimalWithFractionTwo(
      getLocalAmount(orderDetails.amount),
      false,
      false
    )} - $${numberToDecimalWithFractionTwo(
      promoAmount,
      false,
      false,
    )} Promo Code = $${numberToDecimalWithFractionTwo(
      getLocalAmount(orderDetails.amount_charged),
      false,
      false,
    )}`;
  }
  return `$${numberToDecimalWithFractionTwo(getLocalAmount(orderDetails.amount), false, false)}`;
};

export const getOccasion = (occasion) => ({
  [requestTypesKeys.shoutout]: i18n.t('common.occShoutout', {occasion}),
  [requestTypesKeys.event]: i18n.t('common.occAnnounce', {occasion}),
  [requestTypesKeys.qa]: i18n.t('common.a&a'),
  [requestTypesKeys.commercial]: i18n.t('common.experiences.commShout')
})

export const generateReceipt = ({
  order_details: orderDetails = {},
  video_created_date: videoCreatedDate,
  created_date: createdDate,
  language,
  practice_booking: practiceBooking,
  comment,
  getLocalAmount,
  getLocalSymbol,
  entityData
}) => starMode => ({
  'open': [{
    title: i18n.t('common.orderStatus.purchased'),
    data: moment(createdDate).format(entityData?.dateFormat)
  }, {
    title: i18n.t('common.orderStatus.paid'),
    tooltip: practiceBooking ? i18n.t('common.receipt.tooltip_title1') : i18n.t('common.receipt.tooltip_title2'),
    data: practiceBooking ? i18n.t('common.sample_booking_caps') : `${getActualPrice(orderDetails, starMode, getLocalAmount)}`,
  }, {
    title: i18n.t('common.orderStatus.language'),
    data: language.language,
  }, {
    title: i18n.t('common.orderStatus.recorded'),
    data: starMode ? i18n.t('common.receipt.video_processing') : i18n.t('common.receipt.info',{talent:entityData?.talentSingle})
  }, {
    title: i18n.t('common.orderStatus.order#'),
    data: practiceBooking ? 'n/a' : orderDetails.order,
  }],
  'completed': [{
    title: i18n.t('common.orderStatus.purchased'),
    data: moment(createdDate).format(entityData?.dateFormat)
  }, {
    title: i18n.t('common.orderStatus.paid'),
    data: practiceBooking ? i18n.t('common.sample_booking_caps') : `${getActualPrice(orderDetails, starMode, getLocalAmount)}`,
  },  {
    title: i18n.t('common.orderStatus.language'),
    data: language.language,
  }, {
    title: i18n.t('common.orderStatus.recorded'),
    data: moment(videoCreatedDate).format(entityData?.dateFormat),
  }, {
    title: i18n.t('common.orderStatus.order#'),
    data: practiceBooking ? 'n/a' : orderDetails.order,
  }],
  'cancelled': [{
    title: i18n.t('common.orderStatus.purchased'),
    data: moment(createdDate).format(entityData?.dateFormat),
  }, {
    title: i18n.t('common.orderStatus.paid'),
    data: i18n.t('common.cancelled'),
  }, {
    title: i18n.t('common.orderStatus.language'),
    data: language.language,
  }, {
    tooltip: i18n.t('common.receipt.tooltip_title3'),
    title: i18n.t('common.orderStatus.recorded'),
    data: i18n.t('common.cancelled')
  }, {
    title: i18n.t('common.orderStatus.reason'),
    data: comment
  }],
})
