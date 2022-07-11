import axios from 'axios';
import { cloneDeep } from 'src/utils/dataStructures';
import { updateUserDetails } from 'store/shared/actions/getUserDetails';
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';

export const MY_VIDEOS_LIST = {
  start: 'fetch_start/MY_VIDEOS_LIST',
  end: 'fetch_end/MY_VIDEOS_LIST',
  success: 'fetch_success/MY_VIDEOS_LIST',
  failed: 'fetch_failed/MY_VIDEOS_LIST',
  updateList: 'update/MY_VIDEOS_LIST',
  reset: 'RESET/MY_VIDEOS_LIST',
  update: 'UPDATE_MY_VIDEOS_LIST',
};

export const myVideosListFetchStart = (refresh, token) => ({
  type: MY_VIDEOS_LIST.start,
  refresh,
  token,
});

export const myVideosListFetchEnd = () => ({
  type: MY_VIDEOS_LIST.end,
});

export const myVideosListFetchSuccess = (
  list,
  offset,
  count,
  videoStatus,
  miscData = {},
) => {
  return {
    type: MY_VIDEOS_LIST.success,
    list,
    offset,
    count,
    videoStatus,
    miscData,
  };
};

export const myVideosListFetchFailed = error => ({
  type: MY_VIDEOS_LIST.failed,
  error,
});

export const myVideosListUpdate = data => ({
  type: MY_VIDEOS_LIST.updateList,
  data,
});

export const myVideosListReset = () => ({
  type: MY_VIDEOS_LIST.reset,
});

export const updateBookingList = data => ({
  type: MY_VIDEOS_LIST.update,
  data,
});

export const updateMyVideosList = (id, newData) => (dispatch, getState) => {
  const originalList = cloneDeep(getState().myVideos.myVideosList.data);
  const dataIndex = originalList.findIndex(item => item.id === id);
  originalList[dataIndex] = newData;
  dispatch(myVideosListUpdate(originalList));
};

export const fetchMyVideosList = (
  offset,
  refresh,
  requestStatus,
  reqType = '',
) => (dispatch, getState) => {
  const { status, limit } = getState().myVideos.myVideosList;
  const videoStatus = requestStatus ? requestStatus : status;
  const source = CancelToken.source();
  if (typeof getState().myVideos.myVideosList.token !== typeof undefined) {
    getState().myVideos.myVideosList.token.cancel(
      'Operation canceled due to new request.',
    );
  }
  dispatch(myVideosListFetchStart(refresh, source));
  return fetch
    .get(
      `${Api.getUserVideos}?status=${videoStatus}&limit=${limit}&role=fan_id&request_type=${reqType}`,
      {
        cancelToken: source.token,
      },
    )
    .then(resp => {
      if (resp.data && resp.data.success && getState().session.isLoggedIn) {
        dispatch(myVideosListFetchEnd());
        const { count } = resp.data.data;
        const miscData = {
          highCancel: resp.data.data.high_cancel,
          highCancelCount: resp.data.data.high_cancel_count,
        }
        dispatch(
          myVideosListFetchSuccess(
            resp.data.data.request_list,
            offset,
            count,
            videoStatus,
            miscData,
          ),
        );
      } else {
        dispatch(myVideosListFetchEnd());
      }
    })
    .catch(exception => {
      if (axios.isCancel(exception)) {
        dispatch(myVideosListFetchEnd());
      }
      dispatch(myVideosListFetchFailed(exception));
    });
};
