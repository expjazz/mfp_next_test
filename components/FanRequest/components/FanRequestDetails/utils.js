import { isEmpty } from 'src/utils/dataStructures';
import {
  clarificationTypes,
  clarifyStatus,
} from 'src/constants/requestTypes/clarifications';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { i18n } from 'next-i18next';


export const getTabsList = ({ reqDetails, requestType }) => {
  let tabsList = [];
  if (
    clarificationTypes.indexOf(reqDetails.request_type) >= 0 &&
    !reqDetails.practice_booking
  ) {
    if (requestType === 'completed') {
      tabsList = [
        {
          label: i18n.t('common.request'),
          value: 'request',
        },
        {
          label: i18n.t('common.clarifications'),
          value: 'clarify',
          highlight:
            clarifyStatus[reqDetails.message_status] === 'clarify_receive', // received Clarification
        },
        {
          label: i18n.t('common.details'),
          value: 'details',
        },
      ];
    } else {
      tabsList = [
        {
          label: i18n.t('common.details'),
          value: 'details',
        },
        {
          label: i18n.t('common.clarifications'),
          value: 'clarify',
          highlight:
            clarifyStatus[reqDetails.message_status] === 'clarify_receive', // received Clarification
        },
      ];
    }
    if (reqDetails.request_type === requestTypesKeys.message) {
      tabsList = [
        {
          label: i18n.t('common.conversation'),
          value: 'conversation',
        },
        {
          label: i18n.t('common.details'),
          value: 'details',
        },
      ];
    }
    return tabsList;
  }
  return tabsList;
};

export const getSelectedTab = ({
  reqDetails: { message_status: messageStatus, request_type: typeRequest },
  requestType,
}) => {
  if (messageStatus === 2) {
    return {
      label: i18n.t('common.clarifications'),
      value: 'clarify',
      highlight: clarifyStatus[messageStatus] === 'clarify_receive', // received Clarification
    };
  }
  const tab =
    requestType === 'completed'
      ? {
          label: i18n.t('common.request'),
          value: 'request',
        }
      : {
          label: i18n.t('common.details'),
          value: 'details',
        };
  if (typeRequest === requestTypesKeys.message) {
    return {
      label: i18n.t('common.request'),
      value: 'request',
    };
  }
  return tab;
};

export const showLang = (lang, defLangId) => {
  return !isEmpty(lang) && defLangId !== lang.id ? lang.language : null;
};
