export const initialState = {
  offset: -1,
  loading: false,
  dataList: [],
  limit: 10,
  dataCount: 0,
}

export const dataReducer = (state, action) => {
  switch(action.type) {
    case 'start':
      return { 
        ...state,
        loading: true,
        dataList: action.refresh ? [] : state.dataList,
      };
    case 'end': return { ...state, loading: false };
    case 'success':
      return {
        ...state,
        dataList: [...state.dataList, ...action.data],
        offset: action.offset,
        dataCount: action.count,
        loading: false,
      }
    default: return initialState;
  }
}
