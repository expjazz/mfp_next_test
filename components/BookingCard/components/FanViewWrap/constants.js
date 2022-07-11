// import i18n from 'i18next';
// import { clarifyStatus } from 'src/constants/requestTypes/clarifications';
// import { requestTypesKeys } from 'src/constants/requestTypes';

const i18n = { t: value => value }
import { requestTypesKeys } from "../../../../src/constants/requestTypes";
import { clarifyStatus } from "../../../../src/constants/requestTypes/clarifications";

export const tabsList = (key, bookingData = {}) => {
  const tabs = {
    [requestTypesKeys.products]: [
      { label: i18n.t('common.request'), value: 'request' },
      { label: i18n.t('common.clarifications'), value: 'clarify' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.digitalGoods]: [
      { label: i18n.t('common.request'), value: 'request' },
      {
        label: i18n.t('common.clarifications'),
        value: 'clarify',
        highlight:
          clarifyStatus[bookingData.message_status] === 'waiting_clarify',
      },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.promotion]: [
      { label: i18n.t('common.request'), value: 'request' },
      { label: i18n.t('common.clarifications'), value: 'clarify' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.socialShoutout]: [
      { label: i18n.t('common.request'), value: 'request' },
      { label: i18n.t('common.clarifications'), value: 'clarify' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.message]: [
      { label: 'Conversation', value: 'request' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.commercial]: [
      { label: i18n.t('common.request'), value: 'request' },
      { label: i18n.t('common.clarifications'), value: 'clarify' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.qa]: [
      { label: i18n.t('common.request'), value: 'request' },
      { label: i18n.t('common.clarifications'), value: 'clarify' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.event]: [
      { label: i18n.t('common.request'), value: 'request' },
      { label: i18n.t('common.clarifications'), value: 'clarify' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
    [requestTypesKeys.shoutout]: [
      { label: i18n.t('common.request'), value: 'request' },
      { label: i18n.t('common.clarifications'), value: 'clarify' },
      { label: i18n.t('common.orderDetails'), value: 'details' },
    ],
  };
  return tabs[key] || [];
};

export const noVideoRequest = [
  requestTypesKeys.shoutout,
  requestTypesKeys.event,
  requestTypesKeys.qa,
  requestTypesKeys.commercial,
];
