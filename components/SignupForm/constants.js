
// const t = value => value
const entity = value => value
export const SIGN_UP = (t, entityData) => ({
  TITLE: t('common.signupFlow.personalInfo'),

  FAN_ITEM_1_LABEL: t('common.signupFlow.callYou'),
  ITEM_1_PLACEHOLDER_1: t('common.fields.firstName'),
  ITEM_1_PLACEHOLDER_2: t('common.fields.lastName'),
  STAR_ITEM_1_LABEL: t('common.signupFlow.useRealName'),

  COMMON_ITEM_LABEL: t('common.emailHead'),
  FAN_ITEM_2_KEY: 'email',
  STAR_ITEM_2_KEY: 'nickName',
  FAN_ITEM_2_PLACEHOLDER: t('common.emailHead'),
  STAR_ITEM_3_PLACEHOLDER: t('common.emailHead'),
  FAN_ITEM_2_FUNCTION: 'checkEmail',
  STAR_ITEM_2_FUNCTION: 'checkNickNameRequired',

  STAR_ITEM_2_LABEL: t('common.signupFlow.optionalName'),
  STAR_ITEM_2_PLACEHOLDER: t('common.signupFlow.whatStageName'),
  FAN_ITEM_3_KEY_1: 'email',
  STAR_ITEM_3_KEY_1: 'password',
  STAR_ITEM_3_KEY_2: 'confirmPassword',
  FAN_ITEM_3_FUNCTION: 'checkEmail',
  STAR_ITEM_3_FUNCTION: 'checkPassword',
  FAN_ITEM_3_LABEL: t('common.signupFlow.secureAccount'),
  FAN_ITEM_3_PLACEHOLDER_1: t('common.password'),
  FAN_ITEM_3_PLACEHOLDER_2: t('common.confirmPasswd'),
  STAR_FOOTER_LABEL: t('common.signupFlow.takeToRole', { user: entityData.purchaser_singular_name }),
  FAN_FOOTER_LABEL: t('common.signupFlow.takeToRole', { user: entityData.talent_singular_name }),
  FAN_BUTTON_LABEL: t('common.signup'),
  STAR_BUTTON_LABEL: t('common.continue'),
});

export const ROLE_FAN = 'fan'
export const ROLE_STAR = 'star'
