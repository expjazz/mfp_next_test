import { clarifyStatus } from 'src/constants/requestTypes/clarifications';
import { requestTypesKeys } from 'src/constants/requestTypes';
const entity = value => value

/**
 *
 * @param t use translator hook
 * @param {*} key Key
 * @param {*} bookingData Booking info
 * @param entity Entity Data
 * @returns Array of arrays with objects
 */
export const tabsList = (t,key, bookingData = {}, entity = {}) => {
  const tabs = {
    [requestTypesKeys.products]: [
      { label: t('common.request'), value: 'request' },
      { label: t('common.ask_qa',{purchaserSingle:entity.purchaserSingle}), value: 'clarify' },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.digitalGoods]: [
      { label: t('common.request'), value: 'request' },
      {
        label: t('common.ask_qa',{purchaserSingle:entity?.purchaserSingle}),
        value: 'clarify',
        highlight:
          clarifyStatus[bookingData.message_status] === 'waiting_clarify',
      },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.promotion]: [
      { label: t('common.request'), value: 'request' },
      { label: t('common.ask_qa',{purchaserSingle:entity?.purchaserSingle}), value: 'clarify' },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.socialShoutout]: [
      { label: t('common.request'), value: 'request' },
      { label: t('common.ask_qa',{purchaserSingle:entity?.purchaserSingle}), value: 'clarify' },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.message]: [
      { label: t('common.conversation'), value: 'request' },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.commercial]: [
      { label: t('common.request'), value: 'request' },
      { label: t('common.ask_qa',{purchaserSingle:entity?.purchaserSingle}), value: 'clarify' },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.qa]: [
      { label: t('common.request'), value: 'request' },
      { label: t('common.ask_qa',{purchaserSingle:entity?.purchaserSingle}), value: 'clarify' },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.event]: [
      { label: t('common.request'), value: 'request' },
      { label: t('common.ask_qa',{purchaserSingle:entity?.purchaserSingle}), value: 'clarify' },
      { label: t('common.details'), value: 'details' },
    ],
    [requestTypesKeys.shoutout]: [
      { label: t('common.request'), value: 'request' },
      { label: t('common.ask_qa',{purchaserSingle:entity?.purchaserSingle}), value: 'clarify' },
      { label: t('common.details'), value: 'details' },
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
