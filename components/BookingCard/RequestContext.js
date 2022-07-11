import React from 'react';

export const RequestContext = React.createContext({
  requestData: null,
  updateRequestData: () => {},
  closeModal: () => {},
});
