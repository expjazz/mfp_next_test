import { cloneDeep } from 'src/utils/dataStructures';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const RECENT_ACTIVITY = {
  start: 'fetch_start/fan_recent_activity',
  end: 'fetch_end/fan_recent_activity',
  success: 'fetch_success/fan_recent_activity',
  failed: 'fetch_failed/fan_recent_activity',
  updateList: 'update/fan_recent_activity',
};

export const recentActivityFetchStart = () => ({
  type: RECENT_ACTIVITY.start,
});

export const recentActivityFetchEnd = () => ({
  type: RECENT_ACTIVITY.end,
});

export const recentActivityFetchSuccess = activityList => ({
  type: RECENT_ACTIVITY.success,
  activityList,
});

export const updateRecentActivityList = data => ({
  type: RECENT_ACTIVITY.updateList,
  data,
});

export const recentActivityFetchFailed = error => ({
  type: RECENT_ACTIVITY.failed,
  error,
});

export const removeActivity = (id) => (dispatch, getState) => {
  const originalList = cloneDeep(getState().myVideos.recentActivity.activityList);
  const newList = originalList.filter(activity => activity.id !== id);
  dispatch(updateRecentActivityList(newList));
}

export const updateActivityList = (id, newData) => (dispatch, getState) => {
  const originalList = cloneDeep(getState().myVideos.recentActivity.activityList);
  const dataIndex = originalList.findIndex(item => item.id === id);
  originalList[dataIndex] = newData;
  dispatch(updateRecentActivityList(originalList));
};

export const fetchRecentActivity = () => (dispatch, getState) => {
  dispatch(recentActivityFetchStart());
  return fetch.get(`${Api.getRecentActivity}?role=fan&limit=1000&offset=0`).then((resp) => {
    if (resp.data && resp.data.success && getState().session.isLoggedIn) {
      dispatch(recentActivityFetchEnd());
      dispatch(recentActivityFetchSuccess(resp.data.data.recent_activities));
    } else {
      dispatch(recentActivityFetchEnd());
    }
  }).catch((exception) => {
    dispatch(recentActivityFetchEnd());
    dispatch(recentActivityFetchFailed(exception));
  });
};
