import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import logdna from '@logdna/browser';
import React, { useEffect } from 'react';
import { withCookies } from 'react-cookie';
import { axiosFetch } from 'src/services/fetch';
import { dashBoardUpdate } from 'src/services/myfanpark/loggedActions';
import { haveLogDNA } from 'customHooks/domUtils';
import { useRedirectByPreviousLogin } from './utils';

function ClientApi(props) {
	const { isLoggedIn } = useFetchLoggedUser();
	const { cookies } = props;
	useRedirectByPreviousLogin();
	const cookie = cookies.get('NEXT_LOCALE');
	const { locale } = useRouter();
	useEffect(() => {
		if (isLoggedIn) {
			dashBoardUpdate();
		}
	}, [isLoggedIn]);

	useEffect(async () => {
		if (!haveLogDNA()) {

			logdna.init(process.env.NEXT_PUBLIC_LOG_DNA, {
				disabled: typeof window === 'undefined',
			}).addContext({
				hostname: 'myFanPark web',
				app: 'myFanPark',
				indexMeta: true,
				Tag: 'LogDNA-Browser',
				console: true,
			});
		}
	}, []);

	useEffect(() => {
		axiosFetch.defaults.headers.common['accept-language'] = 'en-US' || cookie || locale;
	}, [cookie, locale]);
	return null;
}

export default withCookies(ClientApi);
