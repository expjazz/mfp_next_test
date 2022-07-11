import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
import { i18n } from 'next-i18next';

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
      data: `${getLocalSymbol()}${numberToDecimalWithFractionTwo(getLocalAmount(orderDetails.amount), false, false)}`,
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
      data: `${getLocalSymbol()}${numberToDecimalWithFractionTwo(getLocalAmount(orderDetails.amount), false, false)}`,
    },
    {
      title: i18n.t('common.orderStatus.language'),
      data: language.language,
    },
    {
      title: i18n.t('common.orderStatus.tracking#'),
      data: reqDetails.tracking_number,
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
