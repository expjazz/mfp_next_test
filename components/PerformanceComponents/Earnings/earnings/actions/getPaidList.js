

// export const PAID_LIST = {
//   start: 'fetch_start/PAID_LIST',
//   end: 'fetch_end/PAID_LIST',
//   success: 'fetch_success/PAID_LIST',
//   failed: 'fetch_failed/PAID_LIST',
// };

import Api from "src/lib/api";
import { axiosFetch } from "src/services/fetch";

// export const paidListFetchStart = refresh => ({
//   type: PAID_LIST.start,
//   refresh,
// });

// export const paidListFetchEnd = () => ({
//   type: PAID_LIST.end,
// });

// export const paidListFetchSuccess = (list, offset, count) => {
//   return (
//     {
//       type: PAID_LIST.success,
//       list,
//       offset,
//       count,
//     });
// };

// export const paidListFetchFailed = error => ({
//   type: PAID_LIST.failed,
//   error,
// });


export const fetchPaidList = (offset, refresh, filter, limit, prevData) => {
  return axiosFetch.get(`${Api.getEarningsList}?status=paid&limit=${limit}&offset=${offset}&sorting=${filter}`)
  .then((resp) => {
    if (resp.data && resp.data.success) {
      let list = prevData;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.earning_list;
      } else {
        list = [...list, ...resp.data.data.earning_list];
      }

      return {
        offset: offset,
        data: list,
        count: count,
      }
    //  dispatch(paidListFetchSuccess(list, offset, count));
    } else {
    }
  }).catch((exception) => {

  });
};
