import { requestTypesKeys } from 'src/constants/requestTypes';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
import { i18n } from 'next-i18next';

const getLocalAmount = value => value
const entity = value => value
const getActualPrice = (orderDetails, starMode, getLocalAmount, getLocalSymbol) => {
  if (!starMode && orderDetails.amount_charged !== orderDetails.amount) {
    const promoAmount = getLocalAmount(orderDetails.amount) - getLocalAmount(orderDetails.amount_charged);
    return `${getLocalSymbol()}${numberToDecimalWithFractionTwo(
      getLocalAmount(orderDetails.amount),
      false,
      false
    )} - ${getLocalSymbol()}${numberToDecimalWithFractionTwo(
      promoAmount,
      false,
      false
    )} Promo Code = ${getLocalSymbol()}${numberToDecimalWithFractionTwo(
      getLocalAmount(orderDetails.amount_charged),
      false,
      false,
    )}`;
  }
  return `${getLocalSymbol()}${numberToDecimalWithFractionTwo(getLocalAmount(orderDetails.amount), false, false)}`;
};

export const getOccasion = (occasion) => ({
  [requestTypesKeys.shoutout]: `${occasion} shoutout`,
  [requestTypesKeys.event]: `${occasion} announcement`,
  [requestTypesKeys.qa]: 'Q&A',
  [requestTypesKeys.commercial]: 'Commercial shoutouts'
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
    tooltip: practiceBooking ?  i18n.t('common.orderDet.receipt.tooltip_title1') : i18n.t('common.orderDet.receipt.tooltip_title2'),
    data: practiceBooking ? i18n.t('common.orderStatus.sample_booking_caps') : `${getActualPrice(orderDetails, starMode, getLocalAmount, getLocalSymbol)}`,
  }, {
    title: i18n.t('common.orderStatus.language'),
    data: language.language,
  }, {
    title: i18n.t('common.orderStatus.recorded'),
    data: starMode ? i18n.t('common.orderDet.receipt.video_processing') : i18n.t('common.orderDet.receipt.info',{talent:entityData?.talentSingle})
  }, {
    title: i18n.t('common.orderStatus.order#'),
    data: practiceBooking ? 'n/a' : orderDetails.order,
  }],
  'completed': [{
    title: i18n.t('common.orderStatus.purchased'),
    data: moment(createdDate).format(entityData?.dateFormat)
  }, {
    title: i18n.t('common.orderStatus.paid'),
    data: practiceBooking ? i18n.t('common.orderStatus.sample_booking_caps') : `${getActualPrice(orderDetails, starMode, getLocalAmount, getLocalSymbol)}`,
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
    data: 'Cancelled',
  }, {
    title: i18n.t('common.orderStatus.language'),
    data: language.language,
  }, {
    tooltip: i18n.t('common.orderDet.receipt.tooltip_title3'),
    title: i18n.t('common.orderStatus.recorded'),
    data: 'Cancelled'
  }, {
    title: i18n.t('common.orderStatus.reason'),
    data: comment
  }],
})
