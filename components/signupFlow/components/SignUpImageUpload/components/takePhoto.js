import React from 'react';
import { withTranslation } from 'next-i18next';
import { PropTypes } from 'prop-types';
import EXIF from 'exif-js';
import Button from 'components/SecondaryButton';
import { getMobileOperatingSystem } from 'src/utils/checkOS';
// import { detectUserMedia } from 'src/utils/detectCamera';
import { ImageUpload } from '../styled';
import Loader from '../../../../Loader';
import { detectUserMedia } from 'src/utils/detectCamera';
import { withDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

class TakePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoError: '',
      imageLoading: false,
    };
    this.constraints = {
      video: true,
      audio: true,
    };
    this.recordedBlobs = [];
    this.videoRef = React.createRef();
    this.options = {
      mimeType: 'video/webm;codecs=vp8',
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000,
    };
    this.inputRef = React.createRef();
  }

  componentWillMount() {
    if (!getMobileOperatingSystem()) {
      this.detectCameraMedia();
    }
  }

  componentDidMount() {
    if (getMobileOperatingSystem()) {
      this.inputRef.current.click();
    }
  }

  componentWillUnmount() {
    this.closeStream();
  }

  async onFileChange() {
    const file = document.getElementById('profile').files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (
      file &&
      allowedExtensions.exec(document.getElementById('profile').value)
    ) {
      this.setState({ imageLoading: true });
      await this.getImageData(file);
    }
  }

  getVideoStream = () => {
    if (detectUserMedia()) {
      return navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(stream => {
          this.videoRef.current.srcObject = stream;
          this.setState({
            stream,
            videoError: '',
          });
          return stream;
        })
        .catch(e => {
          if (
            e.name === 'NotAllowedError' ||
            e.name === 'PermissionDismissedError'
          ) {
            this.setState({
              videoError: this.props.t('permissionDenied'),
            });
          } else {
            this.setState({
              videoError:
                this.props.t('video_error'),
            });
          }
        });
    }
    this.setState({
      videoError: this.props.t('video_error'),
    });
  };

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setState({ imageLoading: false });
      this.props.onPictureCapture(reader.result, exif, extension);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  getExif = file => {
    return new Promise(resolve => {
      EXIF.getData(file, () => {
        const exif = EXIF.getTag(this, 'Orientation');
        switch (exif) {
          case 3:
            resolve(3);
            break;
          case 4:
            resolve(4);
            break;
          case 5:
            resolve(5);
            break;
          case 6:
            resolve(6);
            break;
          case 7:
            resolve(7);
            break;
          case 8:
            resolve(8);
            break;
          default:
            resolve(9);
        }
      });
    });
  };

  handleDataAvailable = event => {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  };

  detectCameraMedia = async () => {
    await this.getVideoStream();
  };

  closeStream = () => {
    const { stream } = this.state;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }
    this.setState({ stream: null });
  };

  takeScreenshot = () => {
    if (getMobileOperatingSystem()) {
      this.inputRef.current.click();
    } else {
      const canvas = document.createElement('canvas');
      const video = this.videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const base64Image = canvas.toDataURL('image/jpeg');
      canvas.toBlob(async file => {
        const exif = await this.getExif(file);
        const extension = file.type.split('/')[1];
        this.closeStream();
        this.props.onPictureCapture(base64Image, exif, extension);
      }, 'image/jpeg');
    }
  };

  render() {
    const { imageLoading } = this.state;
    return (
      <ImageUpload.TakePhotoWrapper>
        {!imageLoading && (
          <React.Fragment>
            <ImageUpload.TakePhoto takePhoto={this.props.takePicture}>
              {!getMobileOperatingSystem() ? (
                <React.Fragment>
                  {this.state.videoError ? (
                    <div className="videoError">{this.state.videoError}</div>
                  ) : (
                    <ImageUpload.VideoElement
                      webkit-playsinline
                      autoPlay
                      ref={this.videoRef}
                      muted
                    />
                  )}
                </React.Fragment>
              ) : (
                <input
                  ref={this.inputRef}
                  accept="image/*"
                  id="profile"
                  capture="user"
                  onChange={() => this.onFileChange()}
                  type="file"
                />
              )}
            </ImageUpload.TakePhoto>
            {!this.state.videoError && (
              <ImageUpload.PhotoButtonWrapper>
                <Button className="button" onClick={this.takeScreenshot}>
                  {this.props.t('common.snap_pic')}
                </Button>
              </ImageUpload.PhotoButtonWrapper>
            )}
          </React.Fragment>
        )}
        {imageLoading && <Loader />}
      </ImageUpload.TakePhotoWrapper>
    );
  }
}

TakePhoto.propTypes = {
  onPictureCapture: PropTypes.func,
  takePicture: PropTypes.bool,
};

TakePhoto.defaultProps = {
  onPictureCapture: () => {},
  takePicture: false,
};

export default withTranslation(['common'])(withDisableRefetchOnFocus(TakePhoto));
