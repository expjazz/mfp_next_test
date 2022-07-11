import { PAID_LIST } from '../actions/getPaidList';

const initalState = {
  data: [],
  limit: 5,
  offset: -1,
  loading: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case PAID_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case PAID_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case PAID_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        count: action.count,
      };

    case PAID_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
