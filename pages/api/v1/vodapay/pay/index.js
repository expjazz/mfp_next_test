import moment from 'moment';
import vodacomApi from 'src/lib/vodacomApi';
import { getRequestTime, vodacomFetch } from 'src/services/fetch';
const vodacomHeaderConstructor = require('src/utils/vodacomHeaders');

export default async function handler(req, res) {
	const time = getRequestTime();
	const amount = parseInt(parseFloat(req.body.amount) * 100);
	const hash = {
		productCode: 'CASHIER_PAYMENT', // This should not change
		salesCode: '51051000101000000011', // This should not change
		paymentNotifyUrl: `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_ENDPOINT}vodapay_process_payment`, // The endpoint on your server which we send the payment notification to
		// "paymentRequestId": params[:reference] ? params[:reference].to_json : (Time.now + 7.days).iso8601, // A uniquely generated ID for the payment request. This is handled on your servers
		'paymentRequestId':time, // A uniquely generated ID for the payment request. This is handled on your servers

		// "paymentRedirectUrl":"http://mock.vision.vodacom.aws.corp/mock/api/v1/payments/notifyPayment.htm", // This is not necessary and can be left out
		'paymentExpiryTime':moment(time).add(7, 'days').format('yyyy-MM-DDTHH:mm:ssZ'), // The time until the payment is valid until
		'paymentAmount':{
			'currency':'ZAR', // The currency code. Should always be ZAR
			'value': amount // The amount in South african cents for the sale
		},
		'order':{
			'goods':{ // Additional details about the items purchased
				'referenceGoodsId':'goods123',
				'reference': '',
				'goodsUnitAmount':{
					'currency':'ZAR',
					'value': amount
				},
				'goodsName': req.body.title
			},
			'env':{
				'terminalType':'MINI_APP' // The environment which the payment should use. This should not change
			},
			'orderDescription': req.body.title, //The title of the payement which is displayed on the payment screens
			'buyer':{
				'referenceBuyerId': req.body.vd_id // The unique id of the user on the vodapay servers. You get this from applyToken endpoint
			}
		}
	};
	const headers = vodacomHeaderConstructor('POST', vodacomApi.pay, hash, true, time);
	console.log('voda headers: ', headers);
	console.log('voda body: ', hash);
	try {
		const vodaResponse = 	await vodacomFetch.post(vodacomApi.pay,
		  hash
			, {
				headers,
			}
		);
		console.log('vodaResponse', vodaResponse.data);
		res.status(200).json({ data: vodaResponse.data });
	} catch (e) {
		console.log('vodaError: ', e);
		res.status(500).json(e);
	}
}