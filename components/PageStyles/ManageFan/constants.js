import {
	faListAlt,
	faHeart,
	faUser,
	faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { isVodacom } from 'customHooks/domUtils';

export const getLinks = ({
	t,
	favouriteCount,
	unseenCount,
	asRep,
	entityData,
}) => {
	const links = [
		{
			linkName: t('fan_manage.links.requests'),
			selectedName: 'myVideos',
			url: '/fan-manage/my-videos',
			icon: faListAlt,
			reqCount: unseenCount,
		},
		{
			linkName: t('fan_manage.links.myStars', {
				talent: entityData?.talentPlural,
			}),
			selectedName: 'myStars',
			url: '/fan-manage/my-stars',
			icon: faListAlt,
		},
		{
			linkName: t('fan_manage.links.following'),
			selectedName: 'favorites',
			tooltip: t('fan_manage.links.followTooltip'),
			url: '/fan-manage/favorites',
			icon: faHeart,
			reqCount: favouriteCount,
		},
		{
			linkName: t('fan_manage.links.profile'),
			selectedName: 'profile',
			url: '/fan-manage/settings',
			icon: faUser,
		},
		...(!isVodacom() ? [{
			linkName: t('fan_manage.links.refer', {
				talent: entityData?.talentsSingleCap,
			}),
			selectedName: 'referStar',
			tooltip: t('fan_manage.links.referToolTip', {
				siteName: entityData?.siteName,
			}),
			url: '/fan-manage/referral',
			icon: faUsers,
		}] : [] ),
	];
	if (!asRep) {
		return links.filter(link => {
			if (link.selectedName === 'myStars') return false;
			else if (link.selectedName === 'referStar')
				return entityData.allow_fan_referral;
			return true;
		});
	}
	return links;
};
