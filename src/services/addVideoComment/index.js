import Api from 'src/lib/api';
import { axiosFetch, fetch } from '../../services/fetch';

import * as videoService from '../video';

export const addVideoComment = (videoId, comments, bookingId) => {
  const payload = { comments, ...videoId ? {video: videoId} : {booking: bookingId, starsona: true} };
  return axiosFetch.post(Api.addComment, payload).then(resp => resp.data);
};

export const addComment = (videoId, comments) => {
  return axiosFetch
    .post(Api.addComment, {
      comments,
      video: videoId,
    })
    .then(resp => {
      // dispatch(videoService.getVideoRecentActivityPublicList(videoId));
    });
};
