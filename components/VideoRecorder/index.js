  /* eslint-disable radix */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  checkMediaRecorderSupport,
  isIOSDevice,
  isWebSafari,
} from 'src/utils/checkOS';
import { Progress } from './styled';
import { PlayButton } from '../../styles/CommonStyled';
import Button from '../SecondaryButton';
import { isEmpty } from 'src/utils/dataStructures';
import { withDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

let dummyStream = [];

class VideoRecorder extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;
    this.mediaRecorder = '';
    this.timerID = null;
    this.recordedBlobs = [];
    this.superBuffer = null;
    this.videoSrc = null;
    this.alreadyStopped = false;
    this.recordingDate = null;
    this.state = {
      progress: false,
      mediaControls: false,
      remainingTime: {
        minutes: 0,
        seconds: 0,
      },
      recordedTime: {
        minutes: 0,
        seconds: 0,
      },
      isIOSDevice: isIOSDevice(),
      isPreview: false,
    };
  }

  componentDidMount() {
    if (this.props.videoSrc) {
      this.initialLoad();
    } else if (
      !this.props.shouldRecord &&
      checkMediaRecorderSupport()
      // !isWebSafari()
    ) {
      this.recordMedia();
      this.setState({ isPreview: true });
      if (!this.props.playPauseMedia) this.props.playPauseMediaAction();
    }

    if (this.props.shouldRecord) {
      this.recordMedia();
      this.setState({ isPreview: false });
      this.setState({ progress: true, mediaControls: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (checkMediaRecorderSupport()) {
      if (
        this.props.shouldRecord !== prevProps.shouldRecord &&
        this.props.shouldRecord
      ) {
        this.recordMedia();
        this.setState({
          progress: true,
          mediaControls: false,
          isPreview: false,
        });
      } else if (
        this.props.shouldRecord !== prevProps.shouldRecord &&
        !this.props.shouldRecord &&
        !this.alreadyStopped &&
        this.props.forceStop
      ) {
        this.stopRecording();
      } else if (
        !this.props.shouldRecord &&
        this.props.shouldRecord !== prevProps.shouldRecord
      ) {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop();
        }
        this.closeStream();
        this.recordedBlobs = [];
      }
    }
    if (this.props.videoSrc !== prevProps.videoSrc) {
      this.closeStream();
      this.initialLoad();
    }
  }

  componentWillUnmount() {
    this.closeStream();
    this.props.recordTrigger(false);
    this.props.playPauseMediaAction(false);
  }

  getRetryBtn = () => {
    if (this.props.uploader && !this.props.recorded) {
      return (
        <label
          id="upload"
          htmlFor="fileUpload"
          className="retry uploadBtn uploadCustom"
        >
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={this.props.uploadHandler(this.state.isIOSDevice)}
          />
          {this.props.t('common.upload_different_video')}
        </label>
      );
    }
    return (
      <Button className="retry" secondary onClick={this.retryRecordHandler}>
        {this.props.t('common.tryAgain')}
      </Button>
    );
  };

  initialLoad = () => {
    this.videoSrc = this.props.videoSrc;
    if (this.props.videoSrc) this.setState({ mediaControls: true });
    else this.setState({ mediaControls: false });
    const videoElem = this.video;
    videoElem.src = this.videoSrc;
    videoElem.load();
  };

  recordMedia = () => {
    this.alreadyStopped = false;
    this.superBuffer = null;
    this.videoSrc = null;
    this.recordedBlobs = [];
    const videoElem = this.video;
    videoElem.srcObject = null;
    videoElem.src = null;
    // streaming
    navigator.mediaDevices
      .getUserMedia({
        video: { width: { max: 1280 }, height: { max: 720 } },
        audio: true,
      })
      .then(stream => {
        this.recordingDate = new Date();
        if (this.mounted) {
          this.setState({ progress: false });
        }
        videoElem.srcObject = stream;
        dummyStream.push(stream);
        try {
          let options = {
            mimeType: 'video/webm;',
          }
          if (typeof MediaRecorder.isTypeSupported == 'function') {
            if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
              options = {mimeType: 'video/webm;codecs=vp9'};
            } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
              options = {mimeType: 'video/webm;codecs=h264'};
            } else  if (MediaRecorder.isTypeSupported('video/webm')) {
              options = {mimeType: 'video/webm'};
            } else  if (MediaRecorder.isTypeSupported('video/mp4')) {
              options = {mimeType: 'video/mp4'};
            }
          } else {
            throw 'media recorder not supported';
          }
          if (this.props.shouldRecord) {
            // recording
            this.mediaRecorder = new MediaRecorder(stream, options);
            this.mediaRecorder.start(1000);
            this.mediaRecorder.ondataavailable = this.handleDataAvailable;
            if (
              this.props.startStreamingCallback &&
              this.props.shouldRecord &&
              this.mediaRecorder
            ) {
              this.props.startStreamingCallback();
            }
            if (this.props.duration) {
              this.timerID = setTimeout(() => {
                if (this.mounted) {
                  this.stopRecording();
                  this.storeUpdate();
                }
              }, this.props.duration + 1000);
            }
          }
        } catch (e) {
          if (this.mounted) {
            if (this.props.errorHandler && !this.state.isPreview)
              this.props.errorHandler();
          }
        }
        if (!this.mounted) {
          this.closeStream();
        }
      })
      .catch((e) => {
        if (this.mounted && !this.state.isPreview) {
          this.setState({ progress: false });
          if (this.props.errorHandler) this.props.errorHandler();
        }
      });
  };

  handleDataAvailable = event => {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
      this.calculateTime();
    }
  };

  calculateTime = () => {
    let { remainingTime, recordedTime } = this.state;
    const finalTime = this.recordingDate.getTime() + this.props.duration;
    const recordingTime = this.recordingDate.getTime();
    const currentTime = new Date().getTime();
    const remainingSeconds = parseInt(Math.round((finalTime - currentTime) / 1000)) % 60;
    const remainingMinutes =
      parseInt((finalTime - currentTime) / (1000 * 60)) % 60;
    const recordedSeconds = parseInt(Math.round((currentTime - recordingTime) / 1000)) % 60;
    const recordedMinutes =
      parseInt((currentTime - recordingTime) / (1000 * 60)) % 60;
    remainingTime = {
      ...remainingTime,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
    recordedTime = {
      ...recordedTime,
      minutes: recordedMinutes,
      seconds: recordedSeconds,
    };
    this.setState({ remainingTime, recordedTime });
    const remainingTimeString = `${
      remainingTime.minutes > 9
        ? remainingTime.minutes
        : `0${remainingTime.minutes}`
    } : ${
      remainingTime.seconds > 9
        ? remainingTime.seconds
        : `0${remainingTime.seconds}`
    }`;
    if (this.props.getRecordTime) {
      this.props.getRecordTime(remainingTimeString);
    }
  };

  stopRecording = () => {
    const { recordedTime } = this.state;
    if (this.timerID != null) {
      clearTimeout(this.timerID);
    }
    if (!isEmpty(this.recordedBlobs)) {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }
      this.closeStream();
      const {mimeType} = this.mediaRecorder;
      this.superBuffer = new Blob(this.recordedBlobs, { type: mimeType });
      this.videoSrc = window.URL.createObjectURL(this.superBuffer);
      const recordedTimeString = `${
        recordedTime.minutes > 9
          ? recordedTime.minutes
          : `0${recordedTime.minutes}`
      } : ${
        recordedTime.seconds > 9
          ? recordedTime.seconds
          : `0${recordedTime.seconds}`
      }`;
      this.props.updateMediaStore({
        videoSrc: this.videoSrc,
        superBuffer: this.superBuffer,
        recordedTime: recordedTimeString,
        recorded: true,
      });
      this.alreadyStopped = true;
      this.setState({ mediaControls: true });
    }
  };

  storeUpdate = () => {
    if (this.props.stopRecordHandler) {
      this.props.stopRecordHandler();
    }
  };

  closeStream = () => {
    if (dummyStream.length > 0) {
      dummyStream.forEach(streamObj => {
        const tracks = streamObj.getTracks();
        if (tracks) {
          tracks.forEach(track => {
            track.stop();
          });
        }
      });
    }
    dummyStream = [];
    this.video.srcObject = null;
  };

  checkVideoOver = () => {
    this.setState({ mediaControls: true });
    this.props.playPauseMediaAction();
  };

  videoClick = () => {
    if (!this.props.shouldRecord && this.props.videoSrc !== null) {
      this.setState({ mediaControls: true });
      this.video.pause();
      this.props.playPauseMediaAction();
    }
  };

  playPauseClick = event => {
    event.stopPropagation();
    this.props.playPauseMediaAction();
    this.video.play();
    this.setState({ mediaControls: false });
  };

  retryRecordHandler = () => {
    if (this.props.retryRecordHandler) {
      this.props.retryRecordHandler();
    }
    if (this.props.headerUpdate) {
      this.props.headerUpdate(`Ask ${this.props.starNM} something!`);
    }
    if (checkMediaRecorderSupport() || !this.state.isIOSDevice) {
      this.props.recordTrigger();
      this.props.playPauseMediaAction();
      this.setState({ mediaControls: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <video
          ref={video => {
            this.video = video;
          }}
          key={this.props.videoSrc}
          autoPlay={this.props.playPauseMedia}
          id="video-player_tag"
          playsInline
          onEnded={this.checkVideoOver}
          onClick={this.videoClick}
          muted={this.props.shouldRecord || this.state.isPreview}
          className="videoElm"
        >
          <track kind="captions" />
        </video>
        {this.state.progress && <Progress />}

        {this.state.mediaControls && (
          <React.Fragment>
            <PlayButton className="playButton" onClick={this.playPauseClick}>
              <FontAwesomeIcon icon={faPlay} className="button-play" />
            </PlayButton>
            {!this.props.noButtons && this.getRetryBtn()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

VideoRecorder.propTypes = {
  shouldRecord: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  errorHandler: PropTypes.func,
  updateMediaStore: PropTypes.func.isRequired,
  stopRecordHandler: PropTypes.func,
  playPauseMediaAction: PropTypes.func.isRequired,
  retryRecordHandler: PropTypes.func,
  recordTrigger: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.bool.isRequired,
  forceStop: PropTypes.bool.isRequired,
  videoSrc: PropTypes.string,
  startStreamingCallback: PropTypes.func,
  getRecordTime: PropTypes.func,
  headerUpdate: PropTypes.func,
  starNM: PropTypes.string,
  uploadHandler: PropTypes.func,
  recorded: PropTypes.bool,
  uploader: PropTypes.bool,
  noButtons: PropTypes.bool,
};

VideoRecorder.defaultProps = {
  errorHandler: () => {},
  stopRecordHandler: () => {},
  videoSrc: '',
  getRecordTime: () => {},
  startStreamingCallback: () => {},
  headerUpdate: () => {},
  starNM: '',
  uploadHandler: () => {},
  recorded: false,
  uploader: false,
  retryRecordHandler: null,
  noButtons: false,
};

function mapStateToProps(state) {
  return {
    shouldRecord: state.commonReducer.shouldRecord,
    playPauseMedia: state.commonReducer.playPauseMedia,
    videoSrc: state.commonReducer.videoSrc,
  };
}

export default withTranslation()(withDisableRefetchOnFocus(VideoRecorder))
