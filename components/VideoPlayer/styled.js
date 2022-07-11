import styled from '@emotion/styled';

const ControlOverlay = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 87px;
  background: rgba(0,0,0,0.3);
  z-index: 1;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  opacity: 1;
  transition: opacity 0.5s ease;
  ${props => props.isPlaying && `
    opacity: 0;
    pointer-events: none;
  `};
`;

const ControlIcon = styled.span`
  width: 72px;
  height: 72px;
  font-size: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: 0 auto;
  cursor: pointer;
  color: ${props => props.theme.orangePink};
`;

const CustomControlBar = styled.div`
  position: absolute;
  bottom: 20px;
  left: 17px;
  right: 17px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.pureWhite};
  opacity: 1;
  transition: opacity 0.5s ease;
  ${props => props.isPlaying && `
    opacity: 0;
    pointer-events: none;
  `};
  ${ControlIcon} {
    width: 40px;
    height: 40px;
    padding-left: 2px;
    font-size: 20px;
    background-color: ${props => props.theme.videoSeek};
    color: ${props => props.theme.pureWhite};
  }
  .current-time, .duration {
    width: 43px;
    overflow: hidden;
    font-size: 14px;
  }
  .duration {
    text-align: right;
  }
`;

const VideoRenderDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: relative;
  video {
    border-radius: inherit;
  }
  .player {
    .video-react-play-control, .video-react-volume-menu-button-horizontal, .video-react-time-control, .video-react-fullscreen-control, .video-react-load-progress {
      display: none;
    }
    .video-react .video-react-play-progress {
      background-color: ${props => props.theme.videoSeek};
     }
    .video-react .video-react-slider:focus {
      box-shadow: none;
    }
    .video-react .video-react-load-progress {
      background: transparent;
    }
    .video-react .video-react-progress-control {
      margin: 0 12px;
      min-width: calc(100% - 24px);
      border: 1px solid ${props => props.theme.lightGrey};
      border-radius: 13px;
      opacity: 1;
      transition: opacity 0.5s ease;
      ${props => props.isPlaying && `
        opacity: 0;
        pointer-events: none;
      `};
    }
    .video-react .video-react-load-progress div {
      background: transparent;
    }
    .video-react .video-react-control-bar {
      background: transparent;
      bottom: 65px;
      display: flex;
      z-index: 2;
      height: auto;
    }
    .video-react .video-react-progress-holder {
      background: transparent;
      height: 12px;
      border-radius: inherit;
      overflow: hidden;
      margin: 0;
    }
    .video-react .video-react-progress-holder .video-react-play-progress, .video-react .video-react-progress-holder .video-react-load-progress, .video-react .video-react-progress-holder .video-react-tooltip-progress-bar, .video-react .video-react-progress-holder .video-react-load-progress div {
      height: inherit;
    }
    .video-react .video-react-play-progress:before {
      display: none;
    }
  }
  &.video-hover {
    ${props => props.isPlaying && `
      .video-react .video-react-progress-control, .video-control-wrap, .video-overlay {
        opacity: 1;
        pointer-events: auto;
      }
  `}
  }
`;

VideoRenderDiv.Duration = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  color: ${props => props.theme.pureWhite};
`;

VideoRenderDiv.ControlIconWrapper = styled.div`
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
`;

export {CustomControlBar, ControlOverlay, ControlIcon, VideoRenderDiv as default};
