import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
import { i18n } from 'next-i18next';
// const i18n changed = {
//   t: value => value
// }

const entity = value => value// import { getLocalAmount } from 'utils/currencyUtils';

const getLocalAmount = value => value;

export const generateReceipt = ({
  fun_stuff_request_details: {
    fun_stuff: funDetails,
    completed_date: fullFilledDT,
  },
  created_date: createdData,
  language,
  order_details: orderDetails,
  complete_status: completeStatus = '',
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
      data:
        completeStatus.charAt(0).toUpperCase() +
        completeStatus.slice(1).replace('_', ' '),
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
      title: i18n.t('common.orderStatus.delivered'),
      data: moment(fullFilledDT).format(entityData?.dateFormat),
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
      data: i18n.t('cancelled'),
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
