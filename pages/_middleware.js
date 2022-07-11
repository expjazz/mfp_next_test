
import React from 'react';
import { botdEdge } from 'lib/botd';

import { NextRequest, NextResponse } from 'next/server';
import { detectBots } from 'lib/detectBots';
const PUBLIC_FILE = /\.(.*)$/;

const countryToLocale = {
	ZA: 'en-ZA',
	US: 'en-US',
	CA: 'en-CA',
	DE: 'de',
	NG: 'en-NG',
	IN: 'en-IN',
};
const i18n = {
	locales: process.env.ENV === 'staging' ? ['en-US', 'en-CA'] : ['en-ZA', 'en-US', 'de', 'en-CA', 'en-NG', 'en-IN'],
};

const handleBrokenCatchAll = (pathname) => {
	const arrayToRewrite = ['fun', 'live', 'social', 'merch', 'commercial'];
	const split = pathname.split('/');
	const lastParam = split[split.length - 1];
	if (arrayToRewrite.includes(lastParam)) {
		return `${pathname}/index`;
	}
	return pathname;
};

const rewriteLocale = (req) => {
	const country = req.geo.country;
	const { cookies } = req;
	const localeCookie = cookies['NEXT_LOCALE'];
	let { pathname, href } = req.nextUrl;

	const countryLocale = countryToLocale[country];

	const first = req.nextUrl.locale;
	// Removing requests that try to get assets
	if (!PUBLIC_FILE.test(req.nextUrl.pathname)) {

		// Handling cases with the locale cookie
		if (localeCookie && first !== localeCookie) {
			req.nextUrl.locale = localeCookie;
			// return NextResponse.redirect(req.nextUrl);
			return localeCookie;

			// Handling cases without the locale cookie
		} else if (!localeCookie) {
			if (!first && countryLocale && countryLocale !== defaultLocale && i18n.locales.includes(countryLocale)) {

				return handleLocaleRedirect(req, countryLocale);
			}
			if (!first && !countryLocale) {

				return handleLocaleRedirect(req, defaultLocale);
			}
			if (first && countryLocale && i18n.locales.includes(countryLocale) && countryLocale !== first) {

				return handleLocaleRedirect(req, countryLocale);
			}
			if (first && !countryLocale && i18n.locales.includes(first)) {

				return handleLocaleRedirect(req, first);
			} else if (!i18n.locales.includes(first)) {

				return handleLocaleRedirect(req, defaultLocale);
			}
		}
	}
};

const defaultLocale = 'en-US';

/**
 *
 * @param {*} req NextJS request
 * @param {*} locale Locale to set the cookie and redirect
 * @returns
 */
const handleLocaleRedirect = (req, locale) => {
	req.nextUrl.locale = locale;
	const res = NextResponse.redirect(req.nextUrl);
	res.cookie('NEXT_LOCALE', locale);
	return locale;
	// return res;
};
export async function middleware(req) {
	const isBot = detectBots(req);
	if (isBot) {
		// Bot detected!
		const url = req.nextUrl.clone();
		url.pathname = '/bot-detected';
		const rewrite = NextResponse.rewrite(url);

		return rewrite;
	}
	let { pathname, href } = req.nextUrl;

	const country = req.geo.country;
	const { cookies } = req;
	const localeCookie = cookies['NEXT_LOCALE'];

	const countryLocale = countryToLocale[country];

	const first = req.nextUrl.locale;

	// Clone the request url
	const url = req.nextUrl.clone();


	// Get hostname of request (e.g. demo.vercel.pub)
	const hostname = req.headers.get('host');

	const getRedirect = env => process.env.devMode !== 'production' && (env === 'staging' || env === 'dev') ? 'vodacom.staging.myfanpark.com' : 'vodacom.myfanpark.com';
	const currentHost = hostname.includes('localhost') || hostname.includes('ngrok') ? getRedirect(process.env.ENV) : hostname;

	if (!pathname.includes('.') && !pathname.startsWith('/api') && !pathname.includes('manage') && !req.nextUrl.searchParams.get('tid') && !pathname.includes('/tag/')) {
		const locale = rewriteLocale(req);
		console.log(' locale: ', locale, url.locale);
		console.log(' pathname', pathname);
		if (locale && locale !== url.locale && (pathname !== '/' && pathname !== '/en-US' && pathname !== '/en-ZA' && pathname !== '/en-CA' && pathname !== '/en-NG' && pathname !== '/en-IN') && !currentHost?.toLowerCase().includes('vodacom')) {
			url.locale = locale;
			return NextResponse.redirect(url);
		}

		const toRedirect = `/_site/${currentHost}${pathname}`;
		console.log(' to redirect', toRedirect);
		if (pathname !== toRedirect && !pathname.includes('audio-recorder') && !pathname.includes('external')) {

			url.pathname = toRedirect;
			url.pathname = handleBrokenCatchAll(url.pathname);
			console.log('pathname to rewrite: ', url.pathname);
			return NextResponse.rewrite(url);
		}
	}

	if (pathname.includes('.') && pathname.includes('sitemap') && pathname.includes('.xml')) {
		const redirect = `${process.env.NEXT_PUBLIC_API_URL}${pathname.slice(1)}`;
		return NextResponse.rewrite(redirect);
	}

}


