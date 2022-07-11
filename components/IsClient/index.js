import { isBrowser } from 'customHooks/domUtils';
import { useRouter } from 'next/router';
import React from 'react';

function IsClient(props) {
	const router = useRouter();
	if (isBrowser() && !router.isFallback) {
		return props.children;
	}
	return null;
}

export default IsClient;
