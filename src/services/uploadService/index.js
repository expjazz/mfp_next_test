import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import React from 'react';
import { completedQueueUpdate, initiateUpload, pendingQueueUpdate, toggleFullView, toggleUploadBar, updateResumeUpload, updateUploadPercent, useGeneral } from 'src/context/general';
import { updateQueue } from 'src/context/queueHelpers';
// import {
//   toggleFullView,
//   initiateUpload,
//   updateResumeUpload,
//   updatePendingQueue,
//   toggleUploadBar,
//   updateCompletedQueue,
//   updateUploadPercent,
// } from 'store/shared/actions/handleResumeUpload';
import useUpload from './uploadService';

const UploadService = (props) => {
  const [state, dispatch] = useGeneral()
  // uploadStatus,
  // uploadObj,
  // toggleUpload,
  // updatePendingQueue,
  // updateCompletedQueue,
  // updateUploadPercent,
  // isLoggedIn,
  // updateResumeUpload,
  // pendingQueue,
  const {
    showUploadBar,
    uploadObj,
    pendingQueue,
    completedQueue,
    uploadStatus,
    fullUploadView,
    status,
  } = state.resumableUpload
  const { data: userData } = useFetchLoggedUser()

  function updatePendingQueue(newFile, type) {
    // const queue = updateQueue(pendingQueue, newFile, type)
    pendingQueueUpdate(dispatch, {newFile, type})
  }
  function updateCompletedQueue(newFile, type) {
    const queue = updateQueue(completedQueue, newFile, type)
    completedQueueUpdate(dispatch, queue)
  }

  function localUpdateResumeUpload(request, key) {
    updateResumeUpload(dispatch, { request, key })
  }

  useUpload({
    ...state.resumableUpload,
    uploadStatus: status,
    updatePendingQueue,
    updateCompletedQueue,
    updateResumeUpload: localUpdateResumeUpload,
    isLoggedIn: !!userData,
    updateUploadPercent: payload => updateUploadPercent(dispatch, payload),
    initiateUpload: payload => initiateUpload(dispatch, payload),
    toggleFullView: payload => toggleFullView(dispatch, payload),
    toggleUploadBar: payload => toggleUploadBar(dispatch, payload),
    toggleUpload: payload => initiateUpload(dispatch, payload)

  });

  return null;
}

// const mapStateToProps = state => ({
//   showUploadBar: state.resumableUpload.showUploadBar,
//   uploadObj: state.resumableUpload.uploadObj,
//   pendingQueue: state.resumableUpload.pendingQueue,
//   isLoggedIn: state.session.isLoggedIn,
//   completedQueue: state.resumableUpload.completedQueue,
//   uploadStatus: state.resumableUpload.status,
//   fullUploadView: state.resumableUpload.fullUploadView,
// })

// const mapDispatchToProps = dispatch => ({
//   toggleFullView: state => dispatch(toggleFullView(state)),
//   updateUploadPercent: percent => dispatch(updateUploadPercent(percent)),
//   toggleUploadBar: state => dispatch(toggleUploadBar(state)),
//   updatePendingQueue: (item, type) => dispatch(updatePendingQueue(item, type)),
//   updateCompletedQueue: (item, type) => dispatch(updateCompletedQueue(item, type)),
//   updateResumeUpload: (request, key) => dispatch(updateResumeUpload(request, key)),
//   toggleUpload: state => dispatch(initiateUpload(state)),
// })
export default  UploadService
