import { MY_VIDEOS_LIST } from '../actions/getMyVideosList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 1000,
  highCancel: false,
  highCancelCount: 0,
  status: 'all',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case MY_VIDEOS_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
        token: action.token,
      };

    case MY_VIDEOS_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case MY_VIDEOS_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        highCancel: action.miscData.highCancel,
        highCancelCount: action.miscData.highCancelCount,
        count: action.count,
        status: action.videoStatus,
      };

    case MY_VIDEOS_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    case MY_VIDEOS_LIST.updateList:
      return {
        ...state,
        data: action.data,
      };

    case MY_VIDEOS_LIST.update:
      return {
        ...state,
        data: action.data,
      };

    case MY_VIDEOS_LIST.reset:
      return initalState;

    default:
      return state;
  }
};
