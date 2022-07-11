import Loader from 'components/Loader';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useGeneral } from 'src/context/general';
import { postTruzoCode } from 'src/services/myfanpark/celebActions';

function TruzoWrapper() {
	const router = useRouter();
	const boolean = router.asPath.includes('truzo_error');
	const dispatch = useGeneral()[1];
	const queryClient = useQueryClient();
	const { data: userData, isLoggedIn } = useFetchLoggedUser();
	useEffect(() => {
		if (isLoggedIn) {
			const obj = router.query;
			if (!boolean || (obj.status === 'manual')) {
				if (obj.status === 'manual') {
					postTruzoCode(
						obj.state,
						{ truzo_auth_code: obj.code, truzo_auth_status: obj.status, user_id: obj.state },
						dispatch,
						queryClient
					);
				} else {
					postTruzoCode(
						obj.state,
						{ truzo_auth_code: obj.code, truzo_auth_status: 'live', user_id: obj.state },
						dispatch,
						queryClient
					);
				}
				router.push('/manage/settings/payment');
			} else {
				postTruzoCode(obj.state, { truzo_auth_status: obj.status, user_id: obj.state });
				router.push(`/manage/settings/payment/truzo_error${obj && obj.status ? `?status=${obj.status}` : ''}`);
			}
		}
	}, [isLoggedIn]);
	return (
		<Loader />
	);
}

export default TruzoWrapper;