import i18n from 'i18next';

export const requestStatusList = {
  1: i18n.t('common.open'),
  2: i18n.t('common.open'),
  3: i18n.t('common.open'),
  4: i18n.t('common.open'),
  5: i18n.t('common.cancelled'),
  6: i18n.t('common.completed'),
  8: i18n.t('common.commercial')
};

export const celebRequestStatusList = {
  2: i18n.t('common.open'),
  3: i18n.t('common.open'),
  4: i18n.t('common.completed'),
  5: i18n.t('common.cancelled'),
  6: i18n.t('common.completed')
};

export const openStatusList = [1, 2, 3, 4, 8];

export const celebOpenStatusList = [2, 3, 8];

export const celebCompletedStatusList = [4, 6];

export const commercialStatus = [8];

export const processingStatus = [4];

export const celebCancelledStatusList = [5];

export const completedStatusList = [6];
