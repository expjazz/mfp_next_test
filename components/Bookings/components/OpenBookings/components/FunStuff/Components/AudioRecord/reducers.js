export const initialState = {
  recording: false,
  recordBlob: null,
  recordBlobsList: null,
  hasRecordFile: false,
  hasUploadFile: false,
  uploadFiles: [],
}

export const recordReducer = (state, action) => {
  switch(action.type) {
    case 'record/start':
        return ({
          ...state,
          recording: true,
          recordBlob: null,
          recordBlobsList: null,
          hasRecordFile: false,
        });
    case 'record/stop':
      return ({
        ...state,
        recording: false,
        recordBlob: action.recordBlob,
        recordBlobsList: action.recordBlobsList,
        hasRecordFile: true,
      });
    case 'record/delete':
      return ({
        ...state,
        recording: false,
        recordBlob: null,
        recordBlobsList: null,
        hasRecordFile: false,
      });
    case 'upload':
      return ({
        ...state,
        recording: false,
        hasUploadFile: true,
        uploadFiles: action.files,
      });
    default:
      return initialState;
  }
}
