import React from 'react';
import { withTheme } from '@emotion/react';
import LoaderWrapper from './styled';

const Loader = props => (
  <LoaderWrapper className={props.class}>
    <LoaderWrapper.inner>
      <svg
        version="1.1"
        id="loader-1"
        x="0px"
        y="0px"
        width={props.size ? `${props.size}px` : '40px'}
        height={props.size ? `${props.size}px` : '40px'}
        viewBox="0 0 50 50"
        style={{ enableBackground: 'new 0 0 50 50' }}
      >
        <path
          fill={props.theme.orangePink} 
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </LoaderWrapper.inner>
  </LoaderWrapper>
);
export default withTheme(Loader);
