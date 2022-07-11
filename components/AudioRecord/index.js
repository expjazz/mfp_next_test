import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
// import { connect } from 'react-redux';
import { faMicrophone } from '@fortawesome/pro-solid-svg-icons';
// import { isIOSDevice } from 'src/utils/checkOS';
import { AudioRecorderDiv } from './styled';
// import { checkMediaRecorderSupport } from '../../utils/checkOS';
import { checkMediaRecorderSupport, isIOSDevice } from 'src/utils/checkOS';
import { audioRecordHandler, saveAudioRecording, withGeneral } from 'src/context/general';
import { ReactMic } from 'react-mic';
import { withAudioRecordV2 } from 'components/AudioRecordV2';
// import { ReactMic } from 'react-mic';
// import { audioRecordHandler } from '../../store/shared/actions/commonActions';

class AudioRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      start: false,
      stop: true,
      status: null,
      active: false,
    };
    this.audio = new Audio();
    this.user = props.target;
    this.onAudioEnded = this.onAudioEnded.bind(this);
    this.saveRecording = this.saveRecording.bind(this);
  }

  componentWillMount() {
    if (
      !window.navigator.userAgent.indexOf('MSIE ') > -1 ||
      window.navigator.userAgent.indexOf('Trident/') > -1
    ) {
    }
  }

  componentDidMount() {
    this.audio.addEventListener('ended', this.onAudioEnded);
  }

  componentWillUnmount() {
    this.stopRecording();
  }

  onAudioEnded() {
    this.setState({ play: false });
    audioRecordHandler(this.props.generalContext[1], { recording: false, playing: false });
  }

  stopRecording = () => {
    this.setState({ stop: true, start: false, status: 'completed' });
    audioRecordHandler(this.props.generalContext[1], { recording: false, playing: false });
  };

  startRecording = () => {
    if (!this.props.generalData.commonReducer.audioFlags.recording && !this.props.generalData.commonReducer.audioFlags.playing) {
      this.setState({ active: true }, () => {
        this.setState({ start: true, stop: false });
      });
      audioRecordHandler(this.props.generalContext[1], { recording: true, playing: false });
    }
  };

  deleteRecording(target) {
    this.props.resetRecording(target);
  }

  playRecording(target) {
    if (!this.props.generalData.commonReducer.audioFlags.recording && !this.props.generalData.commonReducer.audioFlags.playing) {
      this.url = this.props.audioRecorder.recorded[target].recordedUrl;
      this.audio.src = this.url;
      this.audio.play();
      this.setState({ play: true });
      audioRecordHandler(this.props.generalContext[1], { recording: false, playing: true });
    }
  }

  pauseRecording() {
    this.audio.pause();
    this.setState({ play: false });
    audioRecordHandler(this.props.generalContext[1], { recording: false, playing: false });
  }

  saveRecording(recordedBlob) {
    this.setState({ active: false });
    saveAudioRecording(this.props.generalContext[1], {key: this.user, audio: {
      recordedBlob: recordedBlob.blob,
      recordedUrl: recordedBlob.blobURL,
    }});
  }

  handleRecorder = () => {
    this.state.start ? this.stopRecording() : this.startRecording();
  };

  reRecording(target) {
    this.deleteRecording(target);
    this.startRecording();
  }
  renderAudio = target => {
    const audio = this.props.audioRecorder.recorded;
    if (checkMediaRecorderSupport()) {
      return (
        <React.Fragment>
          {/* {this.state.start && <Ripple onClick={this.handleRecorder} />} */}
          {this.state.active && (
            <div style={{ display: 'none' }}>
              <ReactMic
                record={this.state.start}
                onStop={this.saveRecording}
                strokeColor="white"
                backgroundColor="#2e819b"
                save={this.state.stop && this.state.status === 'completed'}
                mimeType={isIOSDevice() ? 'audio/wav' : 'audio/webm'}
              />
            </div>
          )}
          <AudioRecorderDiv.ControlWrapper
            className={this.state.start && 'recording'}
            recording={
              this.props.generalData.commonReducer.audioFlags.playing || this.props.generalData.commonReducer.audioFlags.recording
            }
          >
            {(audio[target] && audio[target].recordedBlob) ||
            (audio[target] && audio[target].recordedUrl) ? (
              <React.Fragment>
                {!this.state.play || this.audio.ended ? (
                  <React.Fragment>
                    <AudioRecorderDiv.PlayButton
                      onClick={() => this.playRecording(target)}
                      playing={
                        this.props.generalData.commonReducer.audioFlags.playing ||
                        this.props.generalData.commonReducer.audioFlags.recording
                      }
                    >
                      {this.props.t('common.playBack')}
                    </AudioRecorderDiv.PlayButton>
                    |
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <AudioRecorderDiv.PauseButton
                      onClick={() => this.pauseRecording()}
                    >
                      {this.props.t('common.stop')}
                    </AudioRecorderDiv.PauseButton>
                    |
                  </React.Fragment>
                )}
                <AudioRecorderDiv.Rerecord
                  onClick={() => this.reRecording(target)}
                  recording={
                    this.props.generalData.commonReducer.audioFlags.playing ||
                    this.props.generalData.commonReducer.audioFlags.recording
                  }
                >
                  {this.props.t('common.record')}
                </AudioRecorderDiv.Rerecord>{' '}
                |
                <AudioRecorderDiv.CloseButton
                  onClick={() => this.deleteRecording(target)}
                >
                  {this.props.t('common.delete')}
                </AudioRecorderDiv.CloseButton>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {this.state.start ? (
                  <span
                    className="voice-progress"
                    onClick={this.handleRecorder}
                    role="presentation"
                  ></span>
                ) : (
                  <div
                    onClick={this.handleRecorder}
                    type="button"
                    role="presentation"
                  >
                    <AudioRecorderDiv.Icon
                      icon={faMicrophone}
                      className="mic-icon"
                      recording={
                        this.props.generalData.commonReducer.audioFlags.playing ||
                        this.props.generalData.commonReducer.audioFlags.recording
                      }
                    />
                  </div>
                )}
              </React.Fragment>
            )}

            {!this.state.start &&
              !(audio[target] && audio[target].recordedUrl) && (
                <span
                  className="recText"
                  onClick={this.handleRecorder}
                  role="presentation"
                >
                {this.props.t('common.pronounce_name')}
                </span>
              )}
            {this.state.start && (
              <AudioRecorderDiv.PauseButton
                onClick={() => this.handleRecorder()}
              >
                {this.props.t('common.stopRecording')}
              </AudioRecorderDiv.PauseButton>
            )}
          </AudioRecorderDiv.ControlWrapper>
        </React.Fragment>
      );
    }

    return null;
  };

  render() {
    const target = this.user;

    return (
      <AudioRecorderDiv
        className="pronounce-wrap"
        recorded={
          this.props.audioRecorder.recorded[target] &&
          this.props.audioRecorder.recorded[target].recordedUrl
        }
      >
        {this.renderAudio(target)}
      </AudioRecorderDiv>
    );
  }
}

AudioRecorder.propTypes = {
  audioFlags: PropTypes.object,
  audioRecordHandler: PropTypes.func.isRequired,
  audioRecorder: PropTypes.object,
  saveAudioRecording: PropTypes.func,
  resetRecording: PropTypes.func,
};

AudioRecorder.defaultProps = {
  audioFlags: {},
  audioRecorder: {},
  saveAudioRecording: () => {},
  resetRecording: () => {},
};

// const mapStateToProps = state => ({
//   audioFlags: state.commonReducer.audioFlags,
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     audioRecordHandler: audioFlags => {
//       dispatch(audioRecordHandler(audioFlags));
//     },
//   };
// }
export default withTranslation()(withGeneral(withAudioRecordV2(AudioRecorder)))
