import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
import Api from '../../../lib/api';
import { myVideosListFetchSuccess } from './getMyVideosList';
import { fetch } from '../../../services/fetch';

export const REQUESTS = {
  start: 'requests/START',
  end: 'requests/END',
  failed: 'requests/FAILED',
};

export const requestFetchStart = () => ({
  type: REQUESTS.start,
});

export const requestFetchEnd = () => ({
  type: REQUESTS.end,
});

export const requestFetchFailed = error => ({
  type: REQUESTS.failed,
  error,
});

export const changeRequestList = (requestId, requestStatus) => (dispatch, getState) => {
  let { data: myVideosList, count, offset, videoStatus } = getState().myVideos.myVideosList;
  if (requestStatus === 5) { // cancel requests
    myVideosList = myVideosList.filter(booking => booking.booking_id !== requestId);
    offset -= 1;
    count -= 1;
  }
  dispatch(myVideosListFetchSuccess(myVideosList, offset, count, videoStatus));
}

export const changeRequestStatus = (requestId, requestStatus, comment) => (
  dispatch,
  getState,
) => {
  dispatch(requestFetchStart());
  dispatch(loaderAction(true));
  return fetch
    .post(
      Api.changeRequestStatus,
      {
        id: requestId,
        status: requestStatus,
        comment,
      }
    )
    .then(resp => {
      dispatch(loaderAction(false));
      if (resp.data && resp.data.success) {
        dispatch(requestFetchEnd());
        dispatch(changeRequestList(requestId, requestStatus))
      } else {
        dispatch(requestFetchEnd(requestId, requestStatus));
      }
      return resp.data.success;
    })
    .catch(exception => {
      dispatch(requestFetchEnd());
      dispatch(loaderAction(false));
      dispatch(requestFetchFailed(exception));
      dispatch(updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      }))
    })
};
