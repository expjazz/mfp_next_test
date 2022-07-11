import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { locStorage } from 'src/utils/localStorageUtils';

export const useRedirectByPreviousLogin = () => {
	const router = useRouter();
	const data = locStorage.getItem('vodapayLogin');
	useEffect(() => {
		if (data) {
			locStorage.removeItem('vodapayLogin');
			const date = moment(data.time);
			const diff = moment().diff(date, 'seconds');
			if (diff < 180) {
				router.push(data.pathname);
			}
		}
	}, [data]);
};