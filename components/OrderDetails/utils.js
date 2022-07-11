import {
  clarificationTypes,
  clarifyStatus,
} from 'src/constants/requestTypes/clarifications';

export const getTabsList = (bookData, requestType, t) => {
  let tabsList = [];
  if (
    clarificationTypes.indexOf(bookData.request_type) >= 0 &&
    (requestType === 'open' || requestType === 'commercial-open')
  ) {
    tabsList = [
      { label:t('common.request'), value: 'request' },
      {
        label:t('common.clarifications'),
        value: 'clarify',
        highlight: clarifyStatus[bookData.message_status] === 'waiting_clarify',
      },
    ];
  }
  return tabsList;
};

export const getSelectedTab = (bookingData, t) => {
  const {message_status: messageStatus} = bookingData;
  if (messageStatus === 2) {
    // Awaiting Clarification
    return {
      label: t('common.clarifications'),
      value: 'clarify',
      highlight: clarifyStatus[messageStatus] === 'await_clarify', // Awaiting Clarification
    };
  }
  return null;
};
