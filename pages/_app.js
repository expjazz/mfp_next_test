import React, { useEffect } from 'react';
// import '../styles/globals.css'
// import 'tailwindcss/tailwind.css'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider, QueryClient } from 'react-query';
import theme from '../src/theme';
import { GeneralProvider, updateToast, useGeneral } from '../src/context/general';
import { initialState, sessionInitialState } from '../src/context/initialState';
import { Hydrate } from 'react-query/hydration';
import GlobalStyle from '../src/styles/globalStyles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import Modals from '../components/Modals';
import {ErrorBoundary} from 'react-error-boundary';
import { CookiesProvider } from 'react-cookie';
import FontsInject from '../styles/fonts';
import { SessionProvider } from 'src/context/session';
// import Progress from 'components/Progress';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Toast from 'components/Toast';
import RouteLayer from 'components/RouteLayer';
import AuthLayerContainer from 'components/AuthLayer/Container';
import ParnerContainer from 'components/InjectPartnerStyles/ParnerContainer';
import { useRouter } from 'next/router';
import { isBrowser, isVodacom } from 'customHooks/domUtils';
import { locStorage } from 'src/utils/localStorageUtils';

import Favicon from 'components/Favicon';
import { colorThemes } from 'styles/colorThemes';
config.autoAddCss = false;

const CreatePasswordLayer = dynamic(() => import('components/CreatePasswordLayer'), {
	ssr: true
});

const RedirectService = dynamic(() => import('components/RedirectService'), {
	ssr: false
});

const RegCollectorContent = dynamic(() => import('components/RegistrationCollector/Content'), {
	ssr: false
});

const IsClient = dynamic(() => import('components/IsClient'), {
	ssr: false
});
const UploadService = dynamic(() => import('src/services/uploadService'), {
	ssr: false
});


const StripeLayer = dynamic(() => import('components/StrypeLayer'));
const ClientApi = dynamic(() => import('components/ClientApi'), { ssr: false });
const VodapayIntegration = dynamic(() => import('components/VodapayIntegration'));
const Progress = dynamic(() => import('components/Progress'));
const CookiePolicy = dynamic(() => import('components/CookiePolicy'));
// dummy
function ErrorFallbackContext({error, resetErrorBoundary}) {
	const router = useRouter();
	const dispatch = useGeneral()[1];
	// const { t } = useTranslation();
	updateToast(dispatch, {
		value: true,
		message: 'There was an error. Please contact support.',
		variant: 'error',
	});
	if (!router.asPath.includes('browse-stars') ){

		router.push('/browse-stars');
	}

	return null;
}

function ErrorFallback({error, resetErrorBoundary}) {
	const router = useRouter();
	const dispatch = useGeneral()[1];
	// const { t } = useTranslation();
	updateToast(dispatch, {
		value: true,
		message: 'There was an error. Please contact support.',
		variant: 'error',
	});
	if (!router.asPath.includes('browse-stars') ){

		router.push('/browse-stars');
	}
	return null;
}
function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [queryClient] = React.useState(() => new QueryClient());

	React.useEffect(() => {
		if (router.query?.next) {
			window.location.href = router.query.next;
		}
	}, [router.query]);
	React.useEffect(() => {

		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	const getLayout = Component.getLayout || ((page) => page);
	useEffect(() => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.addEventListener('load', () => {
			alert('loaded script');
			window.my = true;
		});
		script.src = 'https://appx/web-view.min.js';
		document.getElementsByTagName('head')[0].appendChild(script);
		alert('script created');
	}, []);
	return (
		<>
			{/* <ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					// reset the state of your app so the error doesn't happen again
				}}
			> */}

			<Head>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<Script
				strategy='lazyOnload'
				src="https://apis.google.com/js/platform.js"
			/>
			<CookiesProvider>
				<GeneralProvider inititalState={initialState}>
					<SessionProvider initialState={sessionInitialState}>
						{/* <ErrorBoundary
								FallbackComponent={ErrorFallbackContext}
								onReset={() => {
									// reset the state of your app so the error doesn't happen again
								}}
							> */}


						<ThemeProvider theme={theme}>
							<EmotionThemeProvider theme={colorThemes}>
								<GlobalStyle />
								{/* <FontsInject /> */}
								{/* <CssBaseline /> */}
								<QueryClientProvider client={queryClient}>
									<Hydrate state={pageProps.dehydratedState}>
										<ParnerContainer>
											<AuthLayerContainer>
												<RouteLayer>
													<VodapayIntegration>

														<IsClient>
															<>
																<div
																	id="audioRecordingProcesserParent"
																	style={{display: 'none'}}
																	className="video-js vjs-default-skin"></div>
																<StripeLayer/>
																{
																	!isVodacom() && <RegCollectorContent />
																}
																<UploadService />
																<ClientApi />
																<Favicon />
																<RedirectService />
															</>
														</IsClient>
														<CreatePasswordLayer>
															{isBrowser() && !locStorage.getItem('cookieEnabled') && !isVodacom() && (
																<CookiePolicy />
															)}
															<Progress />
															<Script
																strategy='lazyOnload'
																id="google_gtag_js"
																dangerouslySetInnerHTML={{ __html: `
                                  (function(w, d, s, l, i) {
                                    w[l] = w[l] || [];
                                    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                                    var f = d.getElementsByTagName(s)[0],
                                      j = d.createElement(s),
                                      dl = l != 'dataLayer' ? '&l=' + l : '';
                                    j.async = true;
                                    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                                    f.parentNode.insertBefore(j, f);
                                  })(window, document, 'script', 'dataLayer', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
                                  `
																}}

															/>
															<Toast history/>
															{getLayout(<Component {...pageProps} />)}
														</CreatePasswordLayer>
													</VodapayIntegration>
												</RouteLayer>
											</AuthLayerContainer>
											<Modals />
										</ParnerContainer>
										<ReactQueryDevtools initialIsOpen={false} />
									</Hydrate>
								</QueryClientProvider>
							</EmotionThemeProvider>
						</ThemeProvider>
						{/* </ErrorBoundary> */}
					</SessionProvider>
				</GeneralProvider>
			</CookiesProvider>
			{/* </ErrorBoundary> */}
		</>
	);

}

export default appWithTranslation(MyApp);
