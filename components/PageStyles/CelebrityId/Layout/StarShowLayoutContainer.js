import { isBrowser } from 'customHooks/domUtils';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { locStorage } from 'src/utils/localStorageUtils';
import OutterLoader from '../../../OutterLoader';
import { StarGlobal } from '../styled';
import InjectStyles from './InjectStyles';
import StarShowLayout from './StarShowLayout';
// import OutterLoader from '../../../OutterLoader'
function StarShowLayoutContainer({children, pageProps}) {
	const router = useRouter();
	// const { partnerData } = pageProps
	const { data: loggedUser, isLoggedIn, isLoading } = useFetchLoggedUser();
	const { data: celebData } = useGetCelebrityData();
	const [firstLoad, setFirstLoad] = useState(true);
	const unapprovedTalent = celebData?.user.talent_status === accountStatus.pending;
	const loadingUser = !unapprovedTalent && isBrowser() && (locStorage.getItem('data') && !isLoggedIn);
	const celebIsUser = loggedUser?.user?.id === celebData?.user?.id;
	useEffect(() => {
		setFirstLoad(false);
	}, [firstLoad]);
	if (router.isFallback || (loadingUser && firstLoad)) {
		return <OutterLoader />;
	}

	if (unapprovedTalent && isBrowser() && !celebIsUser) {
		router.push('/404');
		return <OutterLoader />;
	}

	if (pageProps.error) {
		return <h1>{pageProps.error}</h1>;
	}
	return (
		<InjectStyles pageProps={pageProps}>
			<StarShowLayout pageProps={pageProps}>

				{children}
			</StarShowLayout>
		</InjectStyles>
	);
}

export default StarShowLayoutContainer;
