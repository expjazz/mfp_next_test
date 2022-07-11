export const ctaList = (t, entityData) => {
  return [
    {
      heading: t('dashboard.activityCard.industry.heading'),
      value_main: t('dashboard.activityCard.industry.valueMain', {
        purchase: entityData?.talent_plural_name,
      }),
      value_sub: '',
      btnTextPrimary: t('dashboard.activityCard.industry.btnTextPrimary'),
      btnTextSecondary: '',
    },
    {
      heading: t('dashboard.activityCard.promotion.heading'),
      value_main: t('dashboard.activityCard.promotion.valueMain', {
        purchase: entityData?.talent_plural_name,
      }),
      value_sub: '',
      btnTextPrimary: t('dashboard.activityCard.promotion.btnTextPrimary'),
      btnTextSecondary: '',
      url: '/manage/promote/promo-share',
    },
    {
      heading: t('dashboard.activityCard.sampleVideo.heading'),
      value_main: t('dashboard.activityCard.sampleVideo.valueMain', {
        purchase: entityData?.talent_plural_name,
      }),
      value_sub: '',
      btnTextPrimary: t('dashboard.activityCard.sampleVideo.btnTextPrimary'),
      btnTextSecondary: '',
      url: '',
    },
    {
      heading: t('dashboard.activityCard.pricing.heading'),
      value_main: t('dashboard.activityCard.pricing.valueMain', {
        purchase: entityData?.talent_plural_name,
      }),
      value_sub: '',
      btnTextPrimary: t('dashboard.activityCard.pricing.btnTextPrimary'),
      btnTextSecondary: '',
      url: '/manage/storefront/services/personalized-videos',
    },
    {
      heading: t('dashboard.activityCard.bio.heading'),
      value_main: t('dashboard.activityCard.bio.valueMain'),
      value_sub: '',
      btnTextPrimary: t('dashboard.activityCard.bio.btnTextPrimary'),
      btnTextSecondary: '',
      url: '/manage/storefront/profile/bio',
    },
    {
      heading: t('dashboard.activityCard.refferal.heading'),
      value_main: t('dashboard.activityCard.refferal.valueMain'),
      value_sub: '',
      btnTextPrimary: t('dashboard.activityCard.refferal.btnTextPrimary'),
      btnTextSecondary: '',
      url: '',
    },
    {
      heading: t('dashboard.activityCard.welocmeVideo.heading'),
      value_main: t('dashboard.activityCard.welocmeVideo.valueMain', {
        purchase: entityData?.talent_plural_name,
      }),
      value_sub: '',
      btnTextPrimary: t('dashboard.activityCard.welocmeVideo.btnTextPrimary'),
      btnTextSecondary: '',
      url: '/manage/storefront/profile/welcome-video',
    },
  ];
};
