
const entity = value => value
export const LOGIN_TYPE = (t, entity) => ({
  ROLE_FAN: t('common.signupFlow.areYou', { purchaser: entity?.purchaser_singular_name }),
  FAN_DESCRIPTION: t('common.signupFlow.registerHere'),
  ROLE_STAR: t('common.signupFlow.areFamous'),
  STAR_DESCRIPTION: t('common.signupFlow.registerHereStar', { siteName: entity?.partner_name, purchaser: entity?.purchaser_plural_name }),
  SIGN_UP_TEXT: t(entity?.entity_id !== 'SUPERSPORT-ZA-1' ? 'common.signupFlow.signupFor' : 'common.signupFlow.signupForSuperSport', { siteName: entity?.partner_name }),
});
