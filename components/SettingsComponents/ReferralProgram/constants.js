import { i18n } from "next-i18next";

const entity = value => value
export const referralProgram = entityData => ({
  description: i18n.t('star_settings.referral.description', {
    siteName: entityData?.siteName,
  }),
  remainingDescription: i18n.t('star_settings.referral.remainingDescription'),
  emailBody: i18n.t('star_settings.referral.emailBody', {
    siteName: entityData?.siteName,
    purchaser: entityData?.purchaserPlural,
  }),

  readMore: i18n.t('star_settings.referral.readMore'),
});
