// import Api from '../../lib/api';
// import { fetch } from '../../services/fetch';

import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

// import * as publicActivity from '../../pages/videoPublic/actions/getPublicActivity';
// import * as publicVideoData from '../../pages/videoPublic/actions/getPublicData';

// import { fetchCelebDetails } from '../../pages/starProfile/actions/getCelebDetails';

// export const getVideoPublicMainData = userId => dispatch => {
//   return fetch
//     .get(Api.getVideoPublicMainData(userId), {})
//     .then(resp => {
//       dispatch(publicVideoData.publicVideoDataFetchSuccess(resp.data));

//       if (resp.data.data.success === true) {
//         dispatch(
//           fetchCelebDetails(resp.data.data.stargramz_response.celebrity_id),
//         );
//       }
//     })
//     .catch(error => {
//       dispatch(
//         publicVideoData.publicVideoDataFetchFailed({
//           value: true,
//           // message: error.response.data.error.message,
//           variant: 'error',
//         }),
//       );
//     });
// };

export const getVideoRecentActivityPublicList = userId => {
  // dispatch(publicActivity.publicVideoActivityFetchStart());

  return axiosFetch
    .get(Api.getRecentActivityPublicList(userId), {})
    .then(resp => {
      return resp.data
      // dispatch(publicActivity.publicVideoActivityFetchSuccess(resp.data));
    })
    .catch(error => {
        // publicActivity.publicVideoActivityFetchFailed({
        //   value: true,
        //   // message: error.response.data.error.message,
        //   variant: 'error',
        //   global: true
        // })
      });
};

export const featuedExp = (method = 'get', payload, vanity) => {
  const api = vanity
    ? `${Api.featuredExp}${vanity}`
    : Api.featuredExp;
  return axiosFetch[method](api, payload)
    .then(resp => resp)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};
