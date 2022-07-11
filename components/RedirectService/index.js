import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGeneral } from 'src/context/general';

function RedirectService() {
	const router = useRouter();
	const pathname = router.asPath;
	const { isLoggedIn, isStar } = useFetchLoggedUser();
	const state = useGeneral()[0];
	const loginOptions = state.modals.loginModal?.options;
	useEffect(() => {
		if (isLoggedIn && !router.query?.token && (pathname === '/' || pathname === '') && !loginOptions?.noRedirect && !router.query.logout && !router.query.site?.includes('supersport')) {
			if (isStar) {
				router.push('/manage');
			} else {
				router.push('/browse-stars');
			}
		}
	}, [isLoggedIn, isStar, pathname, router]);
	return null;
}

export default RedirectService;
