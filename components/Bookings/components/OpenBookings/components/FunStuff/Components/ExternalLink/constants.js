// import i18n from 'i18next';

const i18n = { t: value => value }

const entity = value => value
export const heading = i18n.t('common.provide_link',{purchaserSingle:entity('purchaserSingle')});
