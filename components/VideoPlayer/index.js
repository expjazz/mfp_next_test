import React from 'react';
import { Player, BigPlayButton, LoadingSpinner, ControlBar } from 'video-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import '../../node_modules/video-react/dist/video-react.css';
import { getTime } from './utils';
import './video';
import VideoRenderDiv, {CustomControlBar, ControlOverlay, ControlIcon} from './styled';
import { CheckInViewport } from '../../customHooks/domUtils';
import { VideoGlobal } from './video';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primarySrc: props.primarySrc,
      primary: {
        thumbnail: props.primaryCover,
        video: props.primarySrc,
      },
      secondary: {
        thumbnail: props.secondaryCover,
        video: props.secondarySrc,
      },
      videoWrapperRef: null,
      videoHeight: null,
      isPlaying: false,
      currentTime: 0,
      videoDuration: 0,
      hasStarted: false,
    };
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.checkInViewPort();
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    window.addEventListener('scroll', this.checkInViewPort);
    if (this.videoRef.current) {
      this.videoRef.current.addEventListener('mouseenter', this.onMouseEnter);
      this.videoRef.current.addEventListener('mouseleave', this.onMouseLeave);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.pauseVideo !== prevProps.pauseVideo &&
      this.props.pauseVideo
    ) {
      this.player.pause();
      if (this.props.pauseVideoCallBack) this.props.pauseVideoCallBack();
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let { videoHeight } = prevState;
    if (nextProps.ratio && prevState.videoWrapperRef) {
      videoHeight = prevState.videoWrapperRef.clientWidth / nextProps.ratio;
    }
    if (nextProps.primarySrc !== prevState.primarySrc) {
      return {
        ...prevState,
        primarySrc: nextProps.primarySrc,
        primary: {
          thumbnail: nextProps.primaryCover,
          video: nextProps.primarySrc,
        },
        videoHeight,
      };
    }
    return null;
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkInViewPort);
    if (this.videoRef.current) {
      this.videoRef.current.removeEventListener('mouseenter', this.onMouseEnter);
      this.videoRef.current.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }

  onMouseEnter = () => {
    this.videoRef.current.classList.add('video-hover');
  }

  onMouseLeave = () => {
    this.videoRef.current.classList.remove('video-hover');
  }

  checkInViewPort = () => {
    const videoElement = this.videoRef.current;
    const { player } = this.player.getState();
    const visible = CheckInViewport(videoElement);
    if (player.paused && this.props.autoPlay) {
      this.toggleVideoPlay();
    } else if (!visible) {
      this.player.pause();
      if (this.props.pauseVideoCallBack) this.props.pauseVideoCallBack();
    }
  };

  pauseAllVideos = () => {
    const videoElements = Array.prototype.slice.call(
      document.getElementsByTagName('video'),
    );
    videoElements.forEach(video => {
      if (!video.paused) {
        video.pause();
        if (this.props.pauseVideoCallBack) this.props.pauseVideoCallBack();
      }
    });
  };

  toggleVideoPlay = () => {
    const { player } = this.player.getState();
    if (!this.props.noPlay) {
      this.pauseAllVideos();
      if (player.paused) {
        this.player.play();
        if (this.props.onVideoStart) this.props.onVideoStart();
      } else {
        this.player.pause();
        if (this.props.pauseVideoCallBack) this.props.pauseVideoCallBack();
      }
    }
  };

  handleStateChange = (state, prevState) => {
    if (state.hasStarted) {
      this.setState({ hasStarted: true });
    }
    if (state.currentTime !== prevState.currentTime) {
      this.setState({ currentTime: state.currentTime });
    }
    if (state.duration !== prevState.duration) {
      this.setState({ videoDuration: state.duration });
    }
    if (prevState.ended !== state.ended && state.ended) {
      if (this.props.onVideoEnded) {
        this.props.onVideoEnded();
      }
    } else if (
      prevState.ended !== state.ended &&
      state.ended &&
      this.state.primary.video === this.props.primarySrc
    ) {
      if (this.props.onVideoEnded) {
        this.props.onVideoEnded();
      }
    }
    if (
      prevState.paused !== state.paused &&
      !state.paused &&
      this.props.onVideoStart
    ) {
      this.props.onVideoStart();
    } else if (
      prevState.paused !== state.paused &&
      this.props.pauseVideoCallBack &&
      state.paused
    ) {
      this.props.pauseVideoCallBack();
    }
    if (state.error !== null && this.props.onError) {
      this.props.onError();
    }
    if (this.props.noPlay) {
      this.player.pause();
      if (this.props.pauseVideoCallBack) this.props.pauseVideoCallBack();
    }
    this.setState({
      isPlaying: !state.paused,
    });
  };

  render() {
    const { props } = this;
    const { isPlaying, hasStarted } = this.state;

    return (
      <VideoRenderDiv ref={this.videoRef} isPlaying={isPlaying}>
        <VideoGlobal />
        <div className="player">
          <Player
            playsInline
            ref={player => {this.player = player; props.getPlayerRef(player)}}
            poster={this.state.primary.thumbnail || this.props.coverImage}
            src={this.state.primary.video}
            fluid
            {...this.props}
            preload="metadata"
          >
            <LoadingSpinner />
            <ControlBar
              autoHide={false}
              disabled={
                (props.noPlay || !hasStarted || props.disableSeekbar) &&
                !props.playView
              }
            />
            <BigPlayButton position="center-bottom" disabled />
          </Player>
          {((!props.noPlay && hasStarted && !props.disableSeekbar) ||
            props.playView) && (
            <CustomControlBar isPlaying={isPlaying} className='video-control-wrap'>
              <span className="current-time">
                {getTime(this.state.currentTime)}
              </span>
              <ControlIcon
                className="play-button"
                onClick={this.toggleVideoPlay}
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </ControlIcon>
              <span className="duration">
                {getTime(this.state.videoDuration)}
              </span>
            </CustomControlBar>
          )}
          {((!props.noPlay && hasStarted && !props.disableSeekbar) ||
            props.playView) && <ControlOverlay className='video-overlay' isPlaying={isPlaying} />}
          {((!isPlaying && !hasStarted) || props.disableSeekbar) &&
            !props.hidePlay && (
              <VideoRenderDiv.ControlIconWrapper
                onClick={this.toggleVideoPlay}
                className="player-icon-wrap"
              >
                <ControlIcon className="play-button">
                  <FontAwesomeIcon icon={faPlay} />
                </ControlIcon>
                {this.props.renderCustomText()}
              </VideoRenderDiv.ControlIconWrapper>
            )}
        </div>
      </VideoRenderDiv>
    );
  }
}

VideoPlayer.defaultProps = {
  renderCustomText: () => {},
  getPlayerRef: () => {},
}

VideoPlayer.propTypes = {
  renderCustomText: PropTypes.func,
  getPlayerRef: PropTypes.func,
}
