import dynamic from 'next/dynamic';
import { lazy } from 'react';
// import { retry } from 'services/lazyLoad';
import { requestTypesKeys } from 'src/constants/requestTypes';

const FunStuff = dynamic(() => import('../FunStuff'));
const Merch = dynamic(() => import('../Merch'));
const Commercial = dynamic(() => import('../Commercial'));
const VideoRequests = dynamic(() => import('../VideoRequests'));
const Message = dynamic(() => import('../MessageDetails'));
const Social = dynamic(() => import('../Social'));

export const componentList = {
	[requestTypesKeys.digitalGoods]: FunStuff,
	[requestTypesKeys.products]: Merch,
	[requestTypesKeys.commercial]: Commercial,
	[requestTypesKeys.shoutout]: VideoRequests,
	[requestTypesKeys.event]: VideoRequests,
	[requestTypesKeys.qa]: VideoRequests,
	[requestTypesKeys.message]: Message,
	[requestTypesKeys.socialShoutout]: Social,
	[requestTypesKeys.promotion]: Social,
};
