import { PENDING_LIST } from '../actions/getPendingList';

const initalState = {
  data: [],
  loading: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case PENDING_LIST.start:
      return {
        ...state,
        loading: true,
      };

    case PENDING_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case PENDING_LIST.success:
      return {
        ...state,
        loading: false,
        data: action.list,
      };

    case PENDING_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
