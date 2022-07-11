import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import React, { useEffect, useRef } from 'react';
import { useGeneral } from 'src/context/general';
import { checkStripe } from 'src/services/myfanpark/stripeActions';

function StripeLayer() {
	const [_, dispatch] = useGeneral();
	// const [cookies] = useCookies()
	const { isLoggedIn } = useFetchLoggedUser();
	const stripe = useRef(true);
	useEffect(() => {
		if (stripe.current && isLoggedIn) {
			stripe.current = false;
			checkStripe(dispatch);
		}
	}, [isLoggedIn]);
	return null;
}

export default StripeLayer;
