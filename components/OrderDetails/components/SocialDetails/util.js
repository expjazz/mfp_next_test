import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
import { i18n } from 'next-i18next';
// import { getLocalAmount } from 'utils/currencyUtils';

const getLocalAmount = value => value;

const entity = value => value
export const generateReceipt = ({
  social_request_details: socialDetails = {},
  order_details: orderDetails = {},
  created_date: createdData,
  language,
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
      title: i18n.t('common.orderStatus.completed'),
      data: 'Pending',
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
      title: i18n.t('common.orderStatus.completed'),
      data: moment(socialDetails.completed_date).format(entityData?.dateFormat),
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
      data: 'Cancelled',
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
