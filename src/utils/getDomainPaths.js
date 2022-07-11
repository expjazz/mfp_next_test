const productionResponse = [
	// { params:  { site: 'supersport.myfanpark.com' }, locale: 'en-ZA' },
	// { params:  { site: 'supersport.myfanpark.com' }, locale: 'en-US' },
	// { params:  { site: 'ttwithme.com' }, locale: 'en-US' },
	// { params:  { site: 'ttwithme.com' }, locale: 'en-ZA' },
	// { params:  { site: 'nextjs.myfanpark.com' }, locale: 'en-US' },
	// { params:  { site: 'nextjs.myfanpark.com' }, locale: 'en-ZA' },
	{ params:  { site: 'myfanpark.com' }, locale: 'en-US' },

];

const stagingResponse = [
	{ params:  { site: 'staging.ttwithme.com' }, locale: 'en-US' }
];


export const getDeliveryPaths = () => {

	if (process.env.ENV === 'staging') {
		return stagingResponse;
	} else if (process.env.ENV === 'dev') {
		return process.env.devMode === 'production' ? productionResponse : stagingResponse;
	}
	return productionResponse;
};
