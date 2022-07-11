export const requestTypes = {
  9: 'Products',
  8: 'digitalGoods',
  7: 'Social Promotion',
  6: 'Social Shout-out',
  5: 'Message',
  4: 'Commercial',
  3: 'Q&A',
  2: 'Event',
  1: 'Shout-out',
};


export const requestTypeStream = {
  personalised_video: 'personalised_video',
  event_announcement: 'event_announcement',
  live_question_answer: 'live_question_answer',
  commercial_personalised_video: 'commercial_personalised_video',
  dm_message: 'dm_message',
  social_interaction: 'social_interaction',
  commercial_social_interaction: 'commercial_social_interaction',
  fun_stuff: 'fun_stuff',
  merch: 'merch',
};

export const requestTypeStreamKeys = {
  personalised_video: 1,
  event_announcement: 2,
  live_question_answer: 3,
  commercial_personalised_video: 4,
  dm_message: 5,
  social_interaction: 6,
  commercial_social_interaction: 7,
  fun_stuff: 8,
  merch: 9,
};


export const requestTypesKeys = {
  products: 9,
  digitalGoods: 8,
  promotion: 7,
  socialShoutout: 6,
  message: 5,
  commercial: 4,
  qa: 3,
  event: 2,
  shoutout: 1,
  duets: 10,
};

export const mainRequests = {
  personal: {
    key: 'personal',
    apiKeys: ['personalised_video', 'announcement', 'question_answer'],
    requestTypes: [
      requestTypesKeys.shoutout,
      requestTypesKeys.event,
      requestTypesKeys.qa,
    ],
  },
  interaction: {
    key: 'interaction',
    apiKeys: ['direct_message', 'social_shout_out'],
    requestTypes: [requestTypesKeys.message, requestTypesKeys.socialShoutout],
  },
  digitalGoods: {
    key: 'digitalGoods',
    apiKeys: ['fun_stuff'],
    requestTypes: [requestTypesKeys.digitalGoods],
  },
  products: {
    key: 'products',
    apiKeys: ['products'],
    requestTypes: [requestTypesKeys.products],
  },
  commercial: {
    key: 'commercial',
    apiKeys: ['commercial', 'social_promotions'],
    requestTypes: [requestTypesKeys.commercial, requestTypesKeys.promotion],
  },
};

export const requestTypeTitle = {
  4: 'video',
  3: 'video',
  2: 'announcement',
  1: 'video shout-out',
};

export const cancelledBy = {
  star: 2,
  fan: 1,
  timedOut: 3,
};
