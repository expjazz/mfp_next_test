import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import moment from 'moment';
// import { getLocalAmount } from 'utils/currencyUtils';
import { getCallTime } from 'src/utils/videoCall';
import { i18n } from 'next-i18next';



export const generateReceipt = ({
  fun_stuff_request_details: {
    completed_date: fullFilledDT,
    meeting_date: meetingDate,
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
      data: `${getLocalSymbol()}${numberToDecimalWithFractionTwo(
        getLocalAmount(orderDetails.amount),
        false,
        false
      )}`,
    },
    meetingDate
      ? {
          title: i18n.t('common.orderStatus.scheduled'),
          data: getCallTime(meetingDate, entityData),
        }
      : '',
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
      data: `${getLocalSymbol()}${numberToDecimalWithFractionTwo(
        getLocalAmount(orderDetails.amount),
        false,
        false
      )}`,
    },
    meetingDate
      ? {
          title: i18n.t('common.orderStatus.scheduled'),
          data: getCallTime(meetingDate, entityData),
        }
      : '',
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
      data: 'Cancelled',
    },
    meetingDate
      ? {
          title: i18n.t('common.orderStatus.scheduled'),
          data: getCallTime(meetingDate, entityData),
        }
      : '',
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
