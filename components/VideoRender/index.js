import React from 'react';
// import i18n from 'i18next';
import PropTypes from 'prop-types';
import VideoPlayer from '../VideoPlayer';
import VideoRenderDiv from './styled';
import { i18n } from 'next-i18next';

export default class VideoRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverImage: null,
    };
    this.coverImage = new Image();
    this.profileImage = new Image();
    this.mounted = true;
  }
  componentWillMount() {
    this.coverImage.onload = () => {
      if (this.mounted) {
        this.setState({ coverImage: this.coverImage.src });
      }
    };
    this.coverImage.src = this.props.cover;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cover !== this.props.cover) {
      this.setState({ coverImage: null });
      this.coverImage.onload = () => {
        if (this.mounted) {
          this.setState({ coverImage: this.coverImage.src });
        }
      };
      this.coverImage.src = this.props.cover;
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  renderCustomText = () => {
    if (this.props.customText) {
      return (
        <VideoRenderDiv.CustomText>
          {this.props.customText}
        </VideoRenderDiv.CustomText>
      );
    }
  };

  render() {
    const { props } = this;
    const isProcessing =
      props.videoStatus === 'Processing' || props.videoStatus === 'Pending';
    return (
      <VideoRenderDiv
        variableWidth={props.variableWidth}
        variableHeight={props.variableHeight}
        onClick={props.enableVideoPopup}
        className="video-render-wrap"
      >
        <VideoRenderDiv.Container
          className={`${props.classes.container} ${props.className}`}
          noBorder={props.noBorder}
          noPlay={isProcessing || this.props.noPlay}
          variableWidth={props.variableWidth}
          variableHeight={props.variableHeight}
        >
          <VideoRenderDiv.Content
            imageUrl={this.state.coverImage}
            noPlay={isProcessing || this.props.noPlay}
            className="video-wrap-cus"
          >
            {isProcessing && (
              <span className="status-indicator">{i18n.t('common.processing_video')}</span>
            )}
            {props.duration && this.props.noPlay && (
              <VideoRenderDiv.Duration>
                {props.duration}
              </VideoRenderDiv.Duration>
            )}
            {!isProcessing && (
              <React.Fragment>
                {props.type === 'image' ? (
                  <VideoRenderDiv.ReactionImage
                    imageUrl={this.state.coverImage}
                  />
                ) : (
                  <VideoPlayer
                    renderCustomText={this.renderCustomText}
                    autoPlay={this.props.autoPlay}
                    disableSeekbar={this.props.disableSeekbar}
                    videoAltText={this.props.videoAltText}
                    playView={this.props.playView}
                    noPlay={isProcessing || this.props.noPlay}
                    hidePlay={isProcessing || this.props.hidePlay}
                    coverImage={this.state.coverImage}
                    onError={this.props.onVideoError}
                    primarySrc={props.videoSrc}
                    onVideoEnded={props.onVideoEnded}
                    onVideoStart={props.onVideoStart}
                    pauseVideoCallBack={props.pauseVideo}
                  />
                )}
              </React.Fragment>
            )}
          </VideoRenderDiv.Content>
        </VideoRenderDiv.Container>
      </VideoRenderDiv>
    );
  }
}

VideoRender.defaultProps = {
  classes: {},
  waterMark: false,
  videoAltText: '',
};

VideoRender.propTypes = {
  classes: PropTypes.object,
  waterMark: PropTypes.bool,
  videoAltText: PropTypes.string,
};
