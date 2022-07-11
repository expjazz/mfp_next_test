// import i18n from 'i18next';
const i18n = {
  t: value => value
}
export const ShareContent = (starName, shareUrl, t, entity) => ({
  title: t('common.success_title', { starName }),
  emailSubject: t('common.emailSubject', {
    starName,
    siteName: entity.siteName,
  }),
  emailBody: t('common.emailBody', {
    starName,
    shareUrl,
  }),
  smsTitle: t('common.smsTitle', {
    starName,
    siteName: entity.siteName,
  }),
});
