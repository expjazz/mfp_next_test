const entity = value => value

export const List = (t) => ([
  {
    heading: t('services.shoutout.optionHeading1'),
    message: t('services.shoutout.description1'),
    state: 'personalised_video',
    active: false,
  },
  {
    heading: t('services.shoutout.optionHeading2'),
    message: t('services.shoutout.description2'),
    state: 'announcement',
    active: false,
  },
  {
    heading: t('services.shoutout.optionHeading3'),
    message: t('services.shoutout.description3', { purchaser: entity('purchaserSingle') }),
    state: 'question_answer',
    active: false,
  },
]);
