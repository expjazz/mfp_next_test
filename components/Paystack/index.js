import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import Script from 'next/script';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/SecondaryButton';
import { Container } from './styled';
import { useGetPaystackCards, usePaystackPost } from 'customHooks/reactQueryHooks';
import { useRouter } from 'next/router';

function Paystack(props) {
	const { data: userData } = useFetchLoggedUser();
	const { bookingPrice } = props.starData.celbData;
	const { data: cardsData } = useGetPaystackCards();
	console.log('paystack cards: ', cardsData);
 	const router = useRouter();
	const onSuccess = resp => {
		console.log('success', resp);
		if (resp?.data?.attributes) {
			router.push(`/${props.starData?.userData?.user_id}/thankyou?paystack=true`);
		}
	};
	const pay = usePaystackPost(onSuccess);
	function payWithPaystack() {
		const metadata = { request_id: props?.bookingId, promocode_id: props?.promoDetails?.id };
		console.log(metadata);
		// eslint-disable-next-line no-undef
		let handler = PaystackPop.setup({
			key: process.env.NEXT_PUBLIC_PAYSTACK, // Replace with your public key
			email: userData?.user.email,
			amount: parseFloat(bookingPrice) * 100,
			currency: 'ZAR',
			channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
			ref: '', // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
			// label: "Optional string that replaces customer email"
			metadata: metadata,

			onClose: function(){
				alert('Window closed.');
			},
			callback: function(response){
				let message = 'Payment complete! Reference: ' + response.reference;
				console.log('paystack response: ', response);
				pay.mutate({
					metadata,
					...response,
					user_id: userData?.user?.id,
					platform: 'myFanPark',
					booking_id: props.bookingId,
					promocode: props.promoDetails,
					save_card: true,
				});
				// alert(message);
			}
		});
		handler.openIframe();
	}
	return (
		<Container>
			<Script strategy='lazyOnload' src="https://js.paystack.co/v1/inline.js" />
			<Button onClick={payWithPaystack}>Pay with Paystack</Button>
		</Container>
	);
}

export default Paystack;

Paystack.propTypes = {
	promoDetails: PropTypes.object,
	bookingId: PropTypes.string.isRequired,
	starData: PropTypes.object
};