import { combineReducers } from 'redux';
import myVideosList from './myVideosList';
import recentActivity from './recentActivity';
import requestHandler from './requestHandler';

const myVideos = combineReducers({
  myVideosList,
  recentActivity,
  requestHandler,
})

export default myVideos;
