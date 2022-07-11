import { combineReducers } from 'redux';
import pendingList from './pendingList';
import paidList from './paidList';

const earningsList = combineReducers({
  pendingList,
  paidList,
})

export default earningsList;
