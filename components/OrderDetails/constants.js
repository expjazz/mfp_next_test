import i18n from 'i18next';

export const moreOptions = {
  'open': [{
    label: i18n.t('common.account_settings.contactsupport'),
    value: 'contact',
  }, {
    label: i18n.t('common.cancel_request_small'),
    value: 'cancel',
  }],
  'cancelled': [{
    label: i18n.t('common.account_settings.contactsupport'),
    value: 'contact',
  }],
  'completed': [{
    label: i18n.t('common.account_settings.contactsupport'),
    value: 'contact',
  }, {
    label: i18n.t('common.download'),
    value: 'download',
  }],
  'commercial': [{
    label: i18n.t('common.account_settings.contactsupport'),
    value: 'contact',
  }, {
    label: i18n.t('common.cancel_request_small'),
    value: 'cancel',
  }],
}
