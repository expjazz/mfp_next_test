import { Global, css } from '@emotion/react';
import Head from 'next/head';
/* eslint-disable */
const FontsInject = () => (
  <>
  <Head>
    {/* {
      fontsArr.map(font => (
        <link
          // rel="preload"
          key={font.src}
          href={font.src}
          rel="stylesheet"
        />
      ))
    } */}
    <Global styles={css`

  @font-face {
    font-family: 'Avenir-Regular';
    font-display: swap;
    src: local('Avenir'), url(${`/fonts/Avenir/Avenir-Regular.ttf`}) format('truetype');
  }
  @font-face {
    font-family: 'Avenir-Light';
    font-display: swap;
    src: local('Avenir'), url(${`/fonts/Avenir/Avenir-Light.ttf`}) format('truetype');
  }
  @font-face {
    font-family: 'Avenir-Bold';
    font-display: swap;
    src: local('Avenir'), url(${`/fonts/Avenir/Avenir-Bold.ttf`}) format('truetype');
  }
  /* @font-face {
    font-family: 'Avenir-Heavy';
    font-display: swap;
    src: local('Avenir'), url(${`/fonts/Avenir/Avenir-Heavy.ttf`}) format('truetype');
  } */
  @font-face {
    font-family: 'Avenir-Medium';
    font-display: swap;
    src: local('Avenir'), url(${`/fonts/Avenir/Avenir-Medium.ttf`}) format('truetype');
  }
  /* @font-face {
    font-family: 'Gilroy-Black';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Black.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-BlackItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-BlackItalic.otf`}) format('opentype');
  } */
  @font-face {
    font-family: 'Gilroy-Bold';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Bold.otf`}) format('opentype');
  }
  /* @font-face {
    font-family: 'Gilroy-BoldItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-BoldItalic.otf`}) format('opentype');
  } */
  @font-face {
    font-family: 'Gilroy-Extrabold';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Extrabold.otf`}) format('opentype');
  }
  /* @font-face {
    font-family: 'Gilroy-ExtraboldItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-ExtraboldItalic.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-Heavy';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Heavy.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-HeavyItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-HeavyItalic.otf`}) format('opentype');
  } */
  @font-face {
    font-family: 'Gilroy-Light';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Light.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-LightItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-LightItalic.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-Medium';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Medium.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Regular.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-Regular';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Regular.otf`}) format('opentype');
  }
  /* @font-face {
    font-family: 'Gilroy-MediumItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-MediumItalic.otf`}) format('opentype');
  } */
  @font-face {
    font-family: 'Gilroy-Semibold';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Semibold.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-RegularItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-RegularItalic.otf`}) format('opentype');
  }
  /* @font-face {
    font-family: 'Gilroy-SemiboldItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-SemiboldItalic.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-Thin';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-Thin.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-ThinItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-ThinItalic.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-UltraLight';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-UltraLight.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Gilroy-UltraLightItalic';
    font-display: swap;
    src: local('Gilroy'), url(${`/fonts/Gilroy/Gilroy-UltraLightItalic.otf`}) format('opentype');
  }
  @font-face {
    font-family: 'Shadow-Light';
    font-display: swap;
    src: url(${`/fonts/Shadow/ShadowsIntoLightTwo-Regular.ttf`}) format('truetype');
  }
  @font-face {
    font-family: 'Poppins-Black';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-Black.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-BlackItalic';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-BlackItalic.woff2') format('woff2');
  } */
  /* @font-face {
    font-family: 'Poppins-Bold';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-Bold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-BoldItalic';
    font-display: swap;
    src: url('/fonts/Gilroy/Poppins-BoldItalic.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-Extrabold';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-ExtraBold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-ExtraBoldItalic';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-ExtraboldItalic.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-ExtraLight';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-ExtraLight.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-ExtraLightItalic';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-ExtraLightItalic.woff2') format('woff2');
  } */
  @font-face {
    font-family: 'Poppins-Light';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-Light.woff2') format('woff2');
  }
  /* @font-face {
    font-family: 'Poppins-LightItalic';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-LightItalic.woff2') format('woff2');
  } */
  @font-face {
    font-family: 'Poppins-Medium';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-Medium.woff2') format('woff2');
  }
  /* @font-face {
    font-family: 'Poppins-MediumItalic';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-MediumItalic.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-Regular';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-Semibold';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-Semibold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-SemiboldItalic';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-SemiboldItalic.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-Thin';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-Thin.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Poppins-ThinItalic';
    font-display: swap;
    src: local('Poppins'), url('/fonts/Poppins/Poppins-ThinItalic.woff2') format('woff2');
  } */
  `}/>
  </Head>

</>
)


export default FontsInject