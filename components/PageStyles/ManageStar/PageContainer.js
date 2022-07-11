import React, { useEffect, useRef } from 'react';
import OutterLoader from 'components/OutterLoader';
import { isBrowser } from 'customHooks/domUtils';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { toggleLogin, useGeneral } from 'src/context/general';

function PageContainer(props) {
	const router = useRouter();
	const { data: entityData, isFetching: partnerFetching, isLoading: partnerLoading } = useGetPartner();
	const { data, isLoading, isStar, isLoggedIn, isFetching } = useFetchLoggedUser();
	const dispatch = useGeneral()[1];
	const starPage = isStar && router.asPath.includes('/manage');
	const fanPage = !isStar && router.asPath.includes('fan-manage');
	useEffect(() => {
		if (isLoggedIn && !isStar && router.asPath.includes('/manage')) {
			router.push('/fan-manage', undefined, { shallow: true });
		}
		if (isLoggedIn && isStar && router.asPath.includes('fan-manage')) {
			router.push('/manage', undefined, { shallow: true });
		}
	}, [data, isStar, isLoggedIn, router]);

	useEffect(() => {
		if (!isLoggedIn && !isLoading && !isFetching) {
			// router.push('/?login=true')
			toggleLogin(dispatch, {active: true, options: { noRedirect: true }});
		}
	}, [isLoggedIn, isLoading, isFetching, router]);

	if (!isBrowser() || !isLoggedIn || isLoading || partnerLoading || !data || !data?.user || !data?.celebrity_details) {
		return <OutterLoader />;
	}

	if (starPage || fanPage) {
		return props.children;
	}
	return null;
}

export default PageContainer;
