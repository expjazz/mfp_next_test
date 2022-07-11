// import i18n from 'i18next';

import { faFireAlt } from '@fortawesome/pro-regular-svg-icons';
const entity = value => value


export const FAN_REG_SUCCESS = (t, entity) => ({
  ICON: faFireAlt,
  IMAGE_URL: '/images/art_highfive.svg',
  MESSAGE: t('common.signupFlow.welcomeSite', { siteName: entity.seo_site_name }),
  DESCRIPTION: t('common.signupFlow.description1'),
  TITLE: t('common.completeMsg.title'),
  PRIMARY_BUTTON: t('common.browseTalent', {talent: entity.talent_plural_name}),
  BOOKING_PRIMARY_BUTTON: t('common.completeBooking'),
  SECONDARY_BUTTON: t('common.signupFlow.seeTrending'),
});

export const REFERRAL = (t, entity) => ({
  DESCRIPTION: t('common.signupFlow.referralDescription', {talent: entity?.talent_singular_name}),
})

export const STAR_REG_SUCCESS = (t, entity) => ({
  IMAGE_URL: '/images/art_highfive.svg',
  MESSAGE: t('common.signupFlow.welcomeSite', { siteName: entity?.seo_site_name }),
  DESCRIPTION: t('common.signupFlow.starSuccessDesc', { storeName: entity?.storefront_name, purchaser: entity?.purchaser_singular_name }),
  TITLE: t('common.completeMsg.title'),
  PRIMARY_BUTTON: t('common.designStore', { storeName: entity?.storefront_name }),
  SECONDARY_BUTTON: t('common.addExp'),
});

export const COMPLETE_SIGNUP = t => ({
  TITLE: t('common.signupFlow.continueJourney'),
  MAIN_TITLE: t('common.signupFlow.completeSignup'),
  DESCRIPTION: t('common.signupFlow.regStarted'),
  IMAGE_URL:`/images/art_star.svg`,
  PRIMARY_BUTTON: t('common.signupFlow.finishSignup'),
  SECONDARY_BUTTON: t('common.skipNow'),
})

export const CONFIRM_PASSWORD = t => ({
  TITLE1: t('common.passwordValid.passStart'),
  SUB_TITLE: t('common.passwordValid.reqPass'),
  FIRST_INPUT_TEXT: t('common.password'),
  SECOND_INPUT_TEXT: t('common.confirmPasswd'),
  BUTTON_TEXT: t('common.continue'),
})

export const MAX_STAR_PRICE = 500;
