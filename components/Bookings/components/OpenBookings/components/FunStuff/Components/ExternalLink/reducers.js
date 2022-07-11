export const initialState = {
  link: '',
  error: '',
}

export const linkReducer = (state, action) => {
  switch(action.type) {
    case 'linkUpdate': return ({...state, link: action.link, error: ''});
    case 'errorUpdate': return ({...state, error: action.error});
    default: return initialState;
  }
}
