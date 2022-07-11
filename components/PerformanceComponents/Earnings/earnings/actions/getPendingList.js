

// export const PENDING_LIST = {
//   start: 'fetch_start/PENDING_LIST',
//   end: 'fetch_end/PENDING_LIST',
//   success: 'fetch_success/PENDING_LIST',
//   failed: 'fetch_failed/PENDING_LIST',
// };

import Api from "src/lib/api";
import { axiosFetch } from "src/services/fetch";

// export const pendingListFetchStart = () => ({
//   type: PENDING_LIST.start,
// });

// export const pendingListFetchEnd = () => ({
//   type: PENDING_LIST.end,
// });

// export const pendingListFetchSuccess = (list) => {
//   return (
//     {
//       type: PENDING_LIST.success,
//       list,
//     });
// };

// export const pendingListFetchFailed = error => ({
//   type: PENDING_LIST.failed,
//   error,
// });


export const fetchPendingList = (filter) => {
  return axiosFetch.get(`${Api.getEarningsList}?status=pending&limit=200&sorting=${filter}`)
  .then((resp) => {
    if (resp.data && resp.data.success) {
      return {
        data: resp.data.data.earning_list
      }
      // dispatch(pendingListFetchSuccess(resp.data.data.earning_list));
    } else {
    }
  }).catch((exception) => {

  });
};
