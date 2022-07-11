export const getTabsList = (t) => {
  return [
    {
      label: t('common.requests'),
      value: 'request',
    },
    {
      label: t('common.details'),
      value: 'details',
    },
  ];
};

export const getSelectedTab = (t) => {
  return {
    label: t('common.requests'),
    value: 'request',
  };
};
