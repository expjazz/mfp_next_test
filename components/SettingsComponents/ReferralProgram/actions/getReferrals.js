
import { data } from 'autoprefixer';
import { updateToast } from 'src/context/general';
import Api from 'src/lib/api';
import { axiosFetch } from 'src/services/fetch';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { updateToast } from 'store/shared/actions/commonActions';

export const REFERRAL = {
  start: 'fetch_start/referral',
  end: 'fetch_end/referral',
  success: 'fetch_success/referral',
  failed: 'fetch_failed/referral',
};

export const referralFetchStart = (refresh) => ({
  type: REFERRAL.start,
  refresh,
});

export const referralFetchEnd = () => ({
  type: REFERRAL.end,
});

export const referralFetchSuccess = (list, offset, count, paymentDetails) => {
  return {
    type: REFERRAL.success,
    list,
    offset,
    count,
    paymentDetails,
  };
};

export const referralFetchFailed = (error) => ({
  type: REFERRAL.failed,
  error,
});

export const fetchReferralData = (offset, refresh, limit = 20, dispatch = () => {}, prevData = []) => {
  return axiosFetch
    .get(`${Api.getReferralDetails}?offset=${offset}&limit=${limit}`)
    .then(resp => {
      if (resp.data && resp.data.success) {
        const apiData = resp.data.data.referral_info;
        const paymentDetails = {
          pendingPayments: numberToDecimalWithFractionTwo(apiData.pending_payments),
          totalEarnings: numberToDecimalWithFractionTwo(apiData.total_earnings),
          lastPayment: numberToDecimalWithFractionTwo(apiData.last_payment_amount),
          lastPaymntDate: apiData.last_payment_date,
        }
        const list = [...prevData, ... resp.data.data.referrals];
        const { count } = resp.data.data;
        return {
          data: list,
          offset,
          count,
          ...paymentDetails
        }
        // dispatch(referralFetchSuccess(
        //   list,
        //   offset,
        //   count,
        //   paymentDetails,
        // ));
      } else {
      }
    })
    .catch((exception) => {
      updateToast(dispatch, {
        value: true,
        message: exception.response && exception.response.data ? exception.response.data.error.message : '',
        variant: 'error',
      })
    });
};
