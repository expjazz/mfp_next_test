import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
import { i18n } from 'next-i18next';
// import i18n from 'i18next';
// import { getLocalAmount } from 'utils/currencyUtils';

// const i18n changed = {
//   t: value => value
// }

const entity = value => value
const getLocalAmount = value => value;

export const generateReceipt = ({
  product_request_details: reqDetails,
  created_date: createdData,
  order_details: orderDetails = {},
  language,
  complete_status: completeStatus,
  comment,
  getLocalAmount,
  getLocalSymbol,
  entityData
}) => ({
  open: [
    {
      title: i18n.t('common.orderStatus.purchased'),
      data: moment(createdData).format(entityData?.dateFormat),
    },
    {
      title: i18n.t('common.orderStatus.paid'),
      data: `$${numberToDecimalWithFractionTwo(getLocalAmount(orderDetails.amount), false, false)}`,
    },
    {
      title: i18n.t('common.orderStatus.language'),
      data: language.language,
    },
    {
      title: i18n.t('common.orderStatus.status'),
      data: completeStatus.replace('_', ' '),
    },
  ],
  completed: [
    {
      title: i18n.t('common.orderStatus.purchased'),
      data: moment(createdData).format(entityData?.dateFormat),
    },
    {
      title: i18n.t('common.orderStatus.paid'),
      data: `$${numberToDecimalWithFractionTwo(getLocalAmount(orderDetails.amount), false, false)}`,
    },
    {
      title: i18n.t('common.orderStatus.language'),
      data: language.language,
    },
    {
      title: i18n.t('common.orderStatus.order#'),
      data: orderDetails.order,
    },
  ],
  cancelled: [
    {
      title: i18n.t('common.orderStatus.purchased'),
      data: moment(createdData).format(entityData?.dateFormat),
    },
    {
      title: i18n.t('common.orderStatus.paid'),
      data: i18n.t('common.cancelled'),
    },
    {
      title: i18n.t('common.orderStatus.language'),
      data: language.language,
    },
    {
      title: i18n.t('common.orderStatus.reason'),
      data: comment,
    },
  ],
});
