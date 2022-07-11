export const tabsList = (t, bool) => {
  return [
    bool ? { label: t('star_profile.posts'), value: 'posts' } : { label: t('star_profile.home'), value: 'posts' },
    { label: t('star_profile.exp'), value: 'exp' },
    { label: t('star_profile.bio'), value: 'bio' },
  ];
};

export const getRateLimits = celebrityDetails => {
  let rateLimits = {}

  celebrityDetails.rate_limit.forEach(item => {
    rateLimits = { ...rateLimits, [item.type]: item };
  });

  return rateLimits
}