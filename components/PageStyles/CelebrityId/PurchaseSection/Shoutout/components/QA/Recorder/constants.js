export const questions = (starNM, t) => [
  {
    key: 'que1',
    question: t('purchase_flow.qa.questions.que1'),
  },
  {
    key: 'que2',
    question: t('purchase_flow.qa.questions.que2'),
  },
  {
    key: 'que3',
    question: t('purchase_flow.qa.questions.que3',{starNM}),
  },
];

export const maxUploadSize = 51200;
