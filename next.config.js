const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withTM = require('next-transpile-modules')(['fitty', 'react-svg', 'react-fitty']); // pass the modules you would like to see transpiled
const productionResponse = process.env.ENV === 'dev' ? [
	{ params:  { site: 'myfanpark.com' }, locale: 'en-US' },
	{ params:  { site: 'supersport.myfanpark.com' }, locale: 'en-ZA' },
] : [
	// { params:  { site: 'nextjs.myfanpark.com' }, locale: 'en-US' },
	{ params:  { site: 'myfanpark.com' }, locale: 'en-US' },
	{ params:  { site: 'supersport.myfanpark.com' }, locale: 'en-ZA' },
	{ params:  { site: 'ttwithme.com' }, locale: 'en-US' },
	{ params:  { site: 'vodacom.myfanpark.com' }, locale: 'en-ZA' },
];

const stagingResponse = process.env.ENV !== 'dev' ? [
	{ params:  { site: 'staging.ttwithme.com' }, locale: 'en-US' },
	{ params:  { site: 'vodacom.staging.myfanpark.com' }, locale: 'en-US' },
] : [{ params:  { site: 'staging.ttwithme.com' }, locale: 'en-US' }];

/*
  This function allows to run the app with all different enviroments.
  process.env.ENV is dev when running yarn dev and staging when its preview mode.
*/
const getDeliveryPaths = () => {
	if (process.env.ENV === 'staging') {
		return stagingResponse;
	} else if (process.env.ENV === 'dev') {
		return process.env.devMode === 'production' ? productionResponse : stagingResponse;
	}
	return productionResponse;
};
const getServerDomain = () => process.env.NEXT_PUBLIC_NGROK_URL === 'ngrok' ? process.env.ngrok_url : 'localhost:8123';
const handleDomains = (path, tempValue = null) => {
	let result = [];

	let value = process.env.ENV === 'dev' ? getServerDomain() : `${path.params.site}`;
	if (tempValue) {
		value = tempValue;
	}
	result = [
		...result,

		{
			source: '/fan-manage/:fanSlug*',
			has: [
				{
					type: 'header',
					key: 'Host',
					value,
				},
			],
			destination: `/_site/${path.params.site}/fan-manage/:fanSlug*`,
		},
		{
			source: '/manage/:slug*',
			has: [
				{
					type: 'header',
					key: 'Host',
					value,
				},
			],
			destination: `/_site/${path.params.site}/manage/:slug*`,
		},
		{
			source: `/_site/${path.params.site}/manage/index`,
			destination: `/_site/${path.params.site}/manage/index`
		},

		{
			source: '/:celebrityId',
			has: [
				{
					type: 'query',
					key: 'tid',
					value: '(?<tid>.*)' // Named capture group to match anything on the value
				},
				{
					type: 'query',
					key: 'fb',
					value: '(?<fb>.*)'
				},
				{
					type: 'header',
					key: 'Host',
					value,
				},
			],
			destination: `/_site/${path.params.site}/:celebrityId/:tid?fb=true`
		},
		{
			source: '/:celebrityId',
			has: [
				{
					type: 'query',
					key: 'tid',
					value: '(?<tid>.*)' // Named capture group to match anything on the value
				},
				{
					type: 'query',
					key: 'ct',
					value: '(?<ct>.*)'
				},
				{
					type: 'header',
					key: 'Host',
					value,
				},
			],
			destination: `/_site/${path.params.site}/:celebrityId/:tid?ct=true`

		},

		{
			source: '/:celebrityId',
			has: [
				{
					type: 'query',
					key: 'tid',
					value: '(?<tid>.*)' // Named capture group to match anything on the value
				},
				{
					type: 'header',
					key: 'Host',
					value,
				},
			],
			destination: `/_site/${path.params.site}/:celebrityId/:tid`
		},
		{
			source: '/tag/:tagSlug',
			has: [
				{
					type: 'header',
					key: 'Host',
					value,
				},
			],
			destination: `/_site/${path.params.site}/tag/:tagSlug`,
		}

	];
	return result;
};

function handleRewrites() {
	const paths = getDeliveryPaths();
	let result = [];
	paths.forEach(path => {
		result = [...result, ...handleDomains(path)];
	});
	// result = [...result, ...handleDomains({
	//   params: {
	//     site: 'myfanpark.com'
	//   }
	// }, 'nextjs.myfanpark.com')]
	return result;
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
const securityHeaders = [
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	},
	{
		key: 'X-Permitted-Cross-Domain-Policies',
		value: 'none'
	},
	{
		key: 'Referrer-Policy',
		value: 'strict-origin-when-cross-origin'
	},
	{
		key: 'Content-Security-Policy',
		value: 'self'
	},
	{
		key: 'X-Frame-Options',
		value: 'DENY'
	},

];

module.exports = withBundleAnalyzer(withTM(withPWA({
	i18n,
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=65540 ; includeSubDomains'
					},
				]
			},
			{
				source: '/:path*',
				headers: securityHeaders
			}
		];
	},
	async rewrites() {
		console.log('rewrites: ', handleRewrites());
		return {

			beforeFiles: [
				...handleRewrites(),
			]
		};
	},
	images: {
		domains: [
			'dxjnh2froe2ec.cloudfront.net',
			'starsona-stb-usea1.s3.amazonaws.com',
			'd2mdxsti6y5rs.cloudfront.net',
			'starsona-prb-usea1.s3.amazonaws.com',
			'd3fuf6v6tzgp30.cloudfront.net'
		]
	},
	eslint: {
		// Warning: Dangerously allow production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
	},
})));

