import axios from 'axios';
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils';
import { isBrowser } from 'customHooks/domUtils';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { resetState, useGeneral } from 'src/context/general';
import { resetSessiontContext, useSession } from 'src/context/session';
import Api from 'src/lib/api';
import { axiosFetch, paymentFetch } from 'src/services/fetch';
import { checkStripe } from 'src/services/myfanpark/stripeActions';
import { isEmpty } from 'src/utils/dataStructures';
import { locStorage } from 'src/utils/localStorageUtils';
import { parseUserData } from 'src/utils/parseUser';
// import axios from "axios";

export const fetchUserDetails = (userId) => {
	const data = locStorage.getItem('data');
	let id = userId || data?.user?.id;
	if (!id && !data) {
		return;
	}
	const API_URL = `${Api.authGetCelebDetails}${id}/`;
	return axiosFetch
		.get(API_URL)
		.then(resp => {
			if (resp.data && resp.data.success) {
				axiosFetch.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`;
				//axios.defaults.headers.common.authorization = `token ${resp.data.data.user.authentication_token}`
				const full = parseUserData(resp.data.data);
				return full;
			}
		});
};

export default function useFetchLoggedUser(id = '', options = {}) {
	const router = useRouter();
	const [firstLoad, setFirstLoad] = useState(true);
	const queryClient = useQueryClient();
	const stripe = useRef(true);
	// const [_, dispatch] = useGeneral()
	let userId = id;
	if (isBrowser() && !router.query?.logout) {
		if (firstLoad) setFirstLoad(false);
		const user = locStorage.getItem('data');

		if (user?.user) {
			axiosFetch.defaults.headers.common.authorization = `token ${user.user.authentication_token}`;
			paymentFetch.defaults.headers.common.authorization = `token ${user.user.authentication_token}`;
			//axios.defaults.headers.common.authorization = `token ${user.user.authentication_token}`
			userId = user.user.id;
			if (stripe.current) {
				stripe.current = false;
				// checkStripe(dispatch)
			}
		} else {
			if (firstLoad) setFirstLoad(false);
		}
	} else if (isBrowser() && router.query.logout) {
		if (firstLoad) setFirstLoad(false);
		locStorage.removeItem('data');
		userId = '';

	}
	const queryData = useQuery(['loggedUser'], () => fetchUserDetails(userId), options);
	const data = {
		...queryData,
		isStar: queryData?.data?.user.celebrity || (queryData?.data?.celebrity_details && !isEmpty(queryData?.data?.celebrity_details)),
		userLoading: firstLoad || queryData?.isLoading,
		isLoggedIn: queryData?.data && !isEmpty(queryData?.data)
	};

	if (data && userId) {
		return data;
	}
	return data;
}

export const withLoggedUser = Component => {
	return props => {
		const { data, userLoading, isLoggedIn, refetch } = useFetchLoggedUser();
		return <Component
			loggedUser={data}
			userLoading={userLoading}
			isStar={data?.user?.celebrity ||  (data?.celebrity_details && !isEmpty(data?.celebrity_details))}
			isLoggedIn={isLoggedIn}
			celebDetails={data?.celebrity_details || {}}
			notificationCount={props.data?.notificationCount || 0}
			refetchLoggedUser={refetch}
			{...props}
		/>;
	};
};

// export const withSession = Component => {
//   return props => {

//     const context = React.useContext(SessionContext)
//     if (context === undefined) {
//       throw new Error('Cannot use outside of the provider');
//     }

//     return <Component sessionContext={context} {...props}/>
//   }
// }

export const useLogout = () => {
	const dispatch = useGeneral()[1];
	const sessionDispatch = useSession()[1];
	const queryClient = useQueryClient();
	const router = useRouter();
	return () => {
		locStorage.removeItem('data');
		locStorage.removeItem('tempAuthToken');
		queryClient.removeQueries(['loggedUser']);
		queryClient.setQueryData(['loggedUser'], undefined);
		resetState(dispatch);
		resetSessiontContext(sessionDispatch);
		router.push('/');
	};
};

export const useProfileLogout = () => {
	const dispatch = useGeneral()[1];
	const sessionDispatch = useSession()[1];
	const queryClient = useQueryClient();
	const router = useRouter();
	return () => {
		locStorage.removeItem('data');
		locStorage.removeItem('tempAuthToken');
		// queryClient.removeQueries(["loggedUser"])
		// queryClient.setQueryData(['loggedUser'], undefined);
		resetState(dispatch);
		resetSessiontContext(sessionDispatch);
		delete axiosFetch.defaults.headers.common.authorization;
		delete axios.defaults.headers.common.authorization;
		window.location.href = '/';
	};
};

const fetchLoginDataFromToken = authToken => {
	const options = {
		autologin_id: authToken,
	};
	return axiosFetch.post(Api.loginWithToken, options);
};

export const useLoginWithToken = () => {
	const [userId, setUserId] = useState('');
	const router = useRouter();
	const queryClient = useQueryClient();
	useFetchLoggedUser(userId);
	useEffect(() => {
		if (router.query?.token) {
			locStorage.setItem('cookieEnabled', true);
			queryClient.setQueryData(['loggedUser'], undefined);
			fetchLoginDataFromToken(router.query?.token).then(resp => {
				if (resp.data && resp.data.success) {
					locStorage.removeItem('data');
					locStorage.setItem('data', resp.data.data);
					queryClient.setQueryData(['loggedUser'], resp.data.data);
					setUserId(resp.data.data.user.id);
					// router.push('/', undefined, { shallow: true })
				}
			});
		}
	}, [router.query?.token]);
};
