import { status } from "src/constants/upload";
import { addResumeUpload, completedQueueUpdate, pendingQueueUpdate, updateResumeUpload } from "./general";
import { isEmpty } from '/src/utils/dataStructures'
export const updateQueue = (baseQueue, newItem, type) => {
  let currentQueue = baseQueue;
  if (type === 'add') {
    const foundQueue = currentQueue.find(item => item.id === newItem.id);
    if (foundQueue) {
      currentQueue = currentQueue.filter(item => item.id !== newItem.id);
    }
    currentQueue = [...currentQueue, newItem];
  } else if (type === 'update') {
    currentQueue = currentQueue.map(item => {
      if (item.id === newItem.id) {
        return ({...item, ...newItem});
      }
      return item;
    })
  } else if (type === 'deleteWithParent') {
    currentQueue = currentQueue.filter(item => item.parentId !== newItem.parentId);
  } else {
    currentQueue = currentQueue.filter(item => item.id !== newItem.id);
  }
  return currentQueue;
}


export const onAddResumeUpload = (dispatch, uploadData, key, currentUpObj, currentProcessQueue, resumableUpload) => {
  const newUploadData = {...uploadData};
  currentProcessQueue.forEach(file => {
    if (file.parentId === key && file.cancelToken) {
      file.cancelToken.cancel(
        'Operation canceled due to new request.',
      );
    }
  })
  const {[key]: found, ...remUploadObj} = currentUpObj;
  // updateResumeUpload(dispatch, {...remUploadObj})
  const fileCount = newUploadData.files ? newUploadData.files.length : 0;
  const compFileCount = 0;
  const newFilesArray = newUploadData.files ? newUploadData.files.map((file, index) => {
    const newFile = {
      ...file,
      parentId: key,
      id: `${key}-${index}`,
      progress: 0,
      status: status.pending,
      cancelToken: null,
    }
    let queue = updateQueue(resumableUpload.pendingQueue, newFile, 'delete')
    pendingQueueUpdate(dispatch, { newFile, type: 'delete' })
    let completedQueue = updateQueue(resumableUpload.completedQueue, newFile, 'delete');
    completedQueueUpdate(dispatch, completedQueue)
    const pendingQueue = updateQueue(resumableUpload.pendingQueue, newFile, 'add')
    pendingQueueUpdate(dispatch, { newFile, type: 'add' })
    return newFile;
  }) : [];

  addResumeUpload(dispatch, {uploadObj: {
    ...newUploadData,
    fileCount,
    compFileCount,
    status: status.pending,
    files: newFilesArray,
  }, key})
}