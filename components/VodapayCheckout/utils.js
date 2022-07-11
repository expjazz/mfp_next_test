export const parseVodacomResponse = res => {
	return {
		payment_id: res.paymentId,
		booking_id: res.reference?.bookingId,
		amount: res.amount,
		status: 0,
		promocode_id: res.reference?.promocodeId
	};
};