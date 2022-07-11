import {
  clarificationTypes,
  clarifyStatus,
} from 'src/constants/requestTypes/clarifications';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { i18n } from 'next-i18next';


const entity = value => value
export const getTabsList = (bookData, status, entityData) => {
  let tabsList = [];
  if (
    clarificationTypes.indexOf(bookData.request_type) >= 0 &&
    !bookData.practice_booking
  ) {
    tabsList = [
      ...tabsList,
      {
        label: i18n.t('open_bookings.ask_qa',{purchaserSingle:entityData?.purchaserSingle}),
        value: 'clarify',
        highlight: clarifyStatus[bookData.message_status] === 'clarify_receive', // received Clarification
      },
    ];
    if (
      bookData.request_type === requestTypesKeys.shoutout ||
      bookData.request_type === requestTypesKeys.event ||
      bookData.request_type === requestTypesKeys.qa ||
      (bookData.request_type === requestTypesKeys.commercial && status === 2)
    ) {
      tabsList = [
        {
          label: i18n.t('common.recording'),
          value: 'recording',
        },
        ...tabsList,
        {
          label: i18n.t('common.details'),
          value: 'details',
        },
      ];
    } else {
      tabsList = [{ label: i18n.t('common.request'), value: 'request' }, ...tabsList];
    }
  }
  return tabsList;
};

export const getSelectedTab = ({ message_status: messageStatus }, entityData) => {
  if (messageStatus === 3) {
    // received Clarification
    return {
      label: i18n.t('open_bookings.ask_qa',{purchaserSingle:entityData?.purchaserSingle}),
      value: 'clarify',
      highlight: clarifyStatus[messageStatus] === 'clarify_receive', // received Clarification
    };
  }
  return {};
};
