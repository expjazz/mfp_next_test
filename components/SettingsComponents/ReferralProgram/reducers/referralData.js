import { REFERRAL } from '../actions/getReferrals';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
  pendingPayments: '$0.00',
  totalEarnings: '$0.00',
  lastPayment: '$0.00',
  lastPaymntDate: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case REFERRAL.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : action.list,
        token: action.token,
      };

    case REFERRAL.end:
      return {
        ...state,
        loading: false,
      };

    case REFERRAL.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        count: action.count,
        pendingPayments: action.paymentDetails.pendingPayments,
        totalEarnings: action.paymentDetails.totalEarnings,
        lastPayment: action.paymentDetails.lastPayment,
        lastPaymntDate: action.paymentDetails.lastPaymntDate,
      };

    case REFERRAL.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
