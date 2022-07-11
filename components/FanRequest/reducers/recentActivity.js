import { RECENT_ACTIVITY } from '../actions/getRecentActivity';

const initalState = {
  activityList: [],
  loading: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case RECENT_ACTIVITY.start:
      return {
        ...state,
        loading: true,
      };

    case RECENT_ACTIVITY.end:
      return {
        ...state,
        loading: false,
      };

    case RECENT_ACTIVITY.success:
      return {
        ...state,
        loading: false,
        activityList: action.activityList,
      };

    case RECENT_ACTIVITY.failed:
      return {
        ...state,
        error: action.error,
      };
    case RECENT_ACTIVITY.updateList:
      return {
        ...state,
        activityList: action.data,
      };
    case RECENT_ACTIVITY.reset:
      return initalState;

    default:
      return state;
  }
};
