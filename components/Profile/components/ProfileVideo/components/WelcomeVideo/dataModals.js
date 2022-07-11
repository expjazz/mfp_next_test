import { i18n } from "next-i18next";

const entity = value => value
export const questionsAbout = entityData => [
  {
    key: 'que1',
    question: i18n.t('common.profilesec.video_que1'),
  },
  {
    key: 'que2',
    question: i18n.t('common.profilesec.video_que2'),
  },
  {
    key: 'que3',
    question: i18n.t('common.profilesec.video_que3', { siteName: entityData?.siteName }),
  },
  {
    key: 'que4',
    question: i18n.t('common.profilesec.video_que4', {
      purchaser: entityData?.purchaserPlural,
    }),
  },
];
export const suggestions = [
  {
    heading: i18n.t('common.profilesec.sug_head1'),
    description: i18n.t('common.profilesec.sug_decs'),
  },
  {
    heading: i18n.t('common.profilesec.upload_recording'),
    description: i18n.t('common.profilesec.sug_desc2'),
  },
];

export const questionsVideo = (entityData) => {
  const question = [...questionsAbout(entityData)];
  question[4] = {
    key: 'que5',
    question: i18n.t('common.profilesec.video_que3', {
      siteName: entityData?.siteName,
      purchaser: entityData?.purchaserPlural,
    }),
  };
  return question;
};
