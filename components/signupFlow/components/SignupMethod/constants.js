// import i18n from 'i18next';
const entity = value => value
// const i18n = {
//   t: value => value
// }
const constants = (t, entity) => ({
  "star": {
    "heading": t('common.signupFlow.createStore', {storeName: entity.storefront_name}),
    "footerLink": t('common.signupFlow.takeToRole', { user: entity.purchaser_singular_name }),
    "subHead": t('common.signupFlow.signupTitle', {user: entity.talent_singular_name, store: entity.storefront_name })
  },
  "fan": {
    "heading": t('common.howCreateAccount'),
    "altDesc": t('common.signupFlow.requestOrFollow', { talent: entity.talent_plural_name}),
    "alternate": t('common.createYourAccount'),
    "footerLink": t('common.signupFlow.takeToRole', { user: entity.talent_singular_name }),
    "alternateFooter": t('common.createUser', {user: entity.storefront_name}),
    "subHead": t('common.userSignup', {user: entity.purchaser_singular_name})
  }
})

export default constants;
