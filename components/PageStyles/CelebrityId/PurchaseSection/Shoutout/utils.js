
export const reqList = (services, t) => ([
  {
    type: 'shoutout',
    title: t('common.personalized_video_shoutout'),
    description: t('common.personalized_video_desc'),
    image: '/images/shoutout.jpg',
    slug: 'shoutout',
    active: services.personalised_video,
  },
  {
    type: 'event',
    title: t('common.announcementCaps'),
    description: t('common.announcementCapsDesc'),
    image: '/images/announcement.jpg',
    slug: 'event',
    active: services.announcement,
  },
  {
    type: 'qa',
    title: t('common.ask_question'),
    description: t('common.ask_question_desc'),
    image: '/images/question.jpg',
    slug: 'qa',
    active: services.question_answer
  },
].filter(prod => prod.active));
