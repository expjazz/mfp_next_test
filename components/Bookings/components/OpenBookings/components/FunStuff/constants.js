// import i18n from 'i18next';

import { i18n } from "next-i18next";




const entity = value => value

export const statusDescription = i18n.t('common.email_sent_to_fan', {purchaserSingle: entity('purchaserSingle'), purchaserPlural:entity('purchaserPluralCap')});
export const statusHeading = i18n.t('common.status');
