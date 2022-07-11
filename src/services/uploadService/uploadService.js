import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { status } from 'src/constants/upload';
import axios, { CancelToken } from 'axios';
import { postReactionMedia } from '../postReaction';
import { axiosFetch } from '../fetch';
// import { postReactionMedia } from 'services/postReaction';

const useUpload = ({
  uploadStatus,
  uploadObj,
  toggleUpload,
  toggleUploadBar,
  updatePendingQueue,
  updateCompletedQueue,
  updateUploadPercent,
  isLoggedIn,
  updateResumeUpload,
  pendingQueue,
  }) => {
  const upload = async (fileItem) => {
    let request = uploadObj[fileItem.parentId];
    const { key, file, extension, type, bookingId } = fileItem;
    let updatedFile = { ...fileItem };
    try {
      toggleUpload(true);
      const source = CancelToken.source();
      updatePendingQueue({
        ...fileItem,
        status: status.processing,
        cancelToken: source,
      }, 'update')
          /* eslint-disable no-await-in-loop */
      const fileResponse = await postReactionMedia(
        key,
        file,
        extension,
        type,
        bookingId,
        {
          cancelToken: source.token,
        },
      )
      if (fileResponse.fileName) {
        const fileUpload = await axios.post(fileResponse.url.replace('s3.', 's3-accelerate.'), fileResponse.formData, {
          cancelToken: source.token,
          onUploadProgress: (event) => {
            updatedFile = {...fileItem, progress: (event.loaded/event.total)};
            updatePendingQueue({
              ...fileItem,
              cancelToken: source,
              status: status.processing,
              progress: (event.loaded/event.total),
            }, 'update');
            updateUploadPercent(
              (event.loaded/event.total)*100
            );
          }
        })
        if (fileUpload.status === 201) {
          updatedFile = {
            ...updatedFile,
            fileName: fileResponse.fileName,
            completed: new Date(),
            status: status.completed,
          }
          if (request) {
            const isRequestCompleted = request.fileCount === request.compFileCount + 1;
            request = {
              ...request,
                files: request.files.map(file => {
                  if (file.id === fileItem.id) {
                    return ({...file, ...updatedFile})
                  }
                  return file;
                }),
                compFileCount: request.compFileCount + 1,
                status: isRequestCompleted ? status.completed : request.status,
            }
            updateResumeUpload(request, fileItem.parentId);
            if (isRequestCompleted && request.onSuccess)
              request.onSuccess(request.files);
            ReactDOM.unstable_batchedUpdates(() => {
              updatePendingQueue(updatedFile, 'delete');
              updateCompletedQueue(updatedFile, 'add');
              toggleUpload(false);
            })
          } else {
            throw 'Upload failed';
          }
        }
      } else {
        throw 'No file name received';
      }
    } catch(e) {
      updatedFile = {
        ...updatedFile,
        progress: 0,
        status: window.navigator.onLine ? status.failed : status.offline,
      }
      if (e.message && e.message === 'pause') {
        updatedFile = {
          ...updatedFile,
          status: status.paused,
        }
        updatePendingQueue(updatedFile, 'update');
      } else if (e.message && e.message === 'cancel') {
        updatedFile = {
          ...updatedFile,
          status: status.cancelled,
        }
        ReactDOM.unstable_batchedUpdates(() => {
          updatePendingQueue(updatedFile, 'delete');
          updateCompletedQueue(updatedFile, 'add');
        })
      } else if (!window.navigator.onLine || (e.message && e.message === 'no Internet')) {
        updatePendingQueue(updatedFile, 'update');
      } else if (!e.message || e.message !== 'auth Error') {
        ReactDOM.unstable_batchedUpdates(() => {
          updateCompletedQueue(updatedFile, 'add');
          updatePendingQueue(updatedFile, 'delete');
        })
      }
    }
    toggleUpload(false);
  }

  useEffect(() => {
    const uploadFunc = () => {
      if ((uploadStatus === 'idle' || !uploadStatus) && pendingQueue.length && window.navigator.onLine) {
        const foundFile = pendingQueue.find(pendItem => pendItem.status === status.pending || pendItem.status === status.offline);
        if (foundFile) {
          upload(foundFile);

        }
      }
    }
    uploadFunc();
    window.ononline = () => {
      setTimeout(() => {
        uploadFunc();
      }, 2000)
    }
    window.onoffline = () => {
      if (pendingQueue.length) {
        pendingQueue.forEach(fileItem => {
          if (fileItem.cancelToken) {
            fileItem.cancelToken.cancel('no Internet');
          }
        })
      }
    }
  }, [uploadStatus, pendingQueue])

  return null;
}

export default useUpload;
