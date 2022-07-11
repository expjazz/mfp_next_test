export const ShareContent = (starName, shareUrl, t, entityData) => ({
  title: `${t('common.personalExpFrom', { starName })} \n${t('common.bookUnqExp')}`,
  emailSubject: t('common.checkStar', { starName, siteName: entityData?.partner_name }),
  emailBody: t('common.interestExp', { starName }),
  smsTitle: t('common.checkStar', { starName, siteName: entityData?.partner_name }),
})
