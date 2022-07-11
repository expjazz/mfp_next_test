
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';
import Script from 'next/script';
import fontsArr from 'styles/fontsArr';
export default class MyDocument extends Document {
	// test
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* PWA primary color */}
					<meta name="theme-color" content={theme.palette.primary.main} />

					<link rel="apple-touch-icon" href="/mfp1.png"></link>
					<meta name="theme-color" content="#fff" />
					{(process.env.ENV === 'dev' || process.env.ENV === 'staging') &&  (<meta name="robots" content="noindex" />)}
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<meta
						name="google-signin-client_id"
						content="86585295157-07s9jds1q8p6aorv2vulb0h4dfctlaga.apps.googleusercontent.com"
					/>
					<meta
						name="google-site-verification"
						content="7kRJCN_7MepCfqKvUiYOaJKagob-Sn5qP8qZf1fh9Uw"
					/>
					<meta
						name="facebook-domain-verification"
						content="zebqjxlu4giwnhekzogedkjs1pkxvc"
					/>
					{
						fontsArr.map(font => (
							<style data-href={font.src} key={font.fontFamily}>
								{
									`
                  @font-face {
                    font-family: ${font.fontFamily};
                    font-display: swap;
                    src: url(${font.src});
                  }
                  `
								}
							</style>
						))
					}
					<script dangerouslySetInnerHTML={{ __html: `
              window.fwSettings = {
            widget_id: 62000001228,
          };
                        !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()


          ` }} />

					<script
						src="https://widget.freshworks.com/widgets/62000001228.js"
					/>

				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
//   url: 'https://widget.freshworks.com/widgets/62000001228.js',
//   func: function() {
//     !(function() {
//       if ('function' != typeof window.FreshworksWidget) {
//         var n = function() {
//           n.q.push(arguments);
//         };
//         (n.q = []), (window.FreshworksWidget = n);
//       }
//     })();
//   }
// }]
// for(var i=0;i<scripts.length;i=i+1) {
//   var tag = document.createElement("script");
//   tag.src = scripts[i].url;
//   document.body.appendChild(tag);
//   tag.onload = scripts[i].func;
// }
// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	};
};