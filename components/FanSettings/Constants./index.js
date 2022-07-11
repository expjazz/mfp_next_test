import { isVodacom } from 'customHooks/domUtils';

export const Links = (t, entityData, isRep, userDetails) => [
	{
		linkName: t('fan_settings.link.photo'),
		selectedName: 'profilePhoto',
		url: '/fan-manage/settings/profile-photo',
		completed: false,
	},
	{
		linkName: t('fan_settings.link.account'),
		selectedName: 'Account',
		url: '/fan-manage/settings/account-info',
		completed: true,
	},
	...!isVodacom() ? [
		{
			linkName: t('fan_settings.link.password'),
			selectedName: 'Password',
			url: '/fan-manage/settings/password',
			completed: true,
		},
	] : [],
	{
		linkName: t('fan_settings.link.notification'),
		selectedName: 'Notification',
		url: '/fan-manage/settings/notification',
		completed: false,
	},
	{
		linkName: t('common.site-settings'),
		selectedName: 'lang',
		url: '/fan-manage/settings/site-settings',
		completed: true,
	},
	// {
	//   linkName: 'Settings',
	//   selectedName: 'settings',
	//   url: '/fan-manage/settings/fan-settings',
	//   completed: false,
	// },
	...userDetails.stripe_payouts && (isRep || entityData.allow_fan_referral) ? [  {
		linkName: t('fan_settings.link.banking'),
		selectedName: 'Payment',
		url: '/fan-manage/settings/payment',
		completed: false,
	}] : []
];
