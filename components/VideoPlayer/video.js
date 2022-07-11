import { Global, css, keyframes } from '@emotion/react'
/* eslint-disable */
export const VideoGlobal = () => (
  <Global 
    styles={css`
 .player{
   width:100%;
   height: 100%;
   border-radius: inherit;
   position: relative;
 }

 .player .video-react.video-react-fluid,
 .player .video-react.video-react-16-9,
 .player .video-react.video-react-4-3 {
   height: 100%;
   border-radius: inherit;
   padding-top: 0 !important;
   outline: none;
 }
.player .video-react .video-react-poster {
  border-radius: inherit;
 }
`}
  />
)
