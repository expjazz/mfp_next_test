import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
import { i18n } from 'next-i18next';

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
}) => ({
  open: [
    {
      title: i18n.t('common.orderStatus.purchased'),
      data: moment(createdData).format(entity('dateFormat')),
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
      data: moment(createdData).format(entity('dateFormat')),
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
      title: i18n.t('common.orderStatus.shipTo'),
      data: `
    ${reqDetails.shipping_full_name} \n ${reqDetails.shipping_address_1},${
        reqDetails.shipping_address_2
          ? ` ${reqDetails.shipping_address_2},`
          : ''
      } ${reqDetails.shipping_city}, ${reqDetails.shipping_state}${
        reqDetails.shipping_country ? `, ${reqDetails.shipping_country}` : ''
      } ${
        reqDetails.shipping_zip_code
      } \n ${reqDetails.shipping_phone}`,
    },
    {
      title: i18n.t('common.orderStatus.shipped'),
      data: moment(reqDetails.completed_date).format(entity('dateFormat')),
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
      data: moment(createdData).format(entity('dateFormat')),
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
