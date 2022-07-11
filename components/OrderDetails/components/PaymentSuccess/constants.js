const entity = value => value

export const ShareContent = (starName, shareUrl, t, entity) => ({
  title: `${t('common.personalExpFrom', {user: starName})}. \n${t('common.bookUnqExp')}`,
  emailSubject: t('common.checkStar', { starName, siteName: entity.siteName }),
  emailBody: t('common.interestExp', { starName, shareUrl}),
  smsTitle: t('common.checkStar', { starName, siteName: entity.siteName }),
})
