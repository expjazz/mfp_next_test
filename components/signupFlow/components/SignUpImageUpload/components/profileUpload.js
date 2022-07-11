import React from 'react';
import { withTranslation } from 'next-i18next';
import { PropTypes } from 'prop-types';
import EXIF from 'exif-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';

import { detectUserMedia } from 'src/utils/detectCamera';

import { ImageUpload } from '../styled';
import { isBrowser } from 'customHooks/domUtils';
import Loader from 'components/Loader';
import { awsImageUpload } from 'src/services/awsImageUpload';
import { withDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

class ProfileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoading: false,
      finalImage: null,
      finalFile: null,
      recording: false,
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
  }

  componentWillMount() {}

  async onFileChange() {
    const file = document.getElementById('profile').files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (
      file &&
      allowedExtensions.exec(document.getElementById('profile').value)
    ) {
      const correctResolution = await this.checkResolution(file);
      if (correctResolution) {
        this.setState({ imageLoading: true });
        await this.getImageData(file);
      } else {
        this.setState({ imageLoading: false });
      }
    }
  }

  async onUploadFileChange() {
    const file = document.getElementById('profileUpload').files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (
      file &&
      allowedExtensions.exec(document.getElementById('profileUpload').value)
    ) {
      const correctResolution = await this.checkResolution(file);
      if (correctResolution) {
        this.setState({ imageLoading: true });
        await this.getImageData(file);
      } else {
        this.setState({ imageLoading: false });
      }
    }
  }

  onComplete = () => {
    this.setState({ imageLoading: true });
    awsImageUpload(this.state.finalFile, this.state.extension).then(resp => {
      this.setState({ imageLoading: false });
      const fileName = {
        images: [resp],
        avatar_photo: resp,
        featured_image: '',
      };
      this.props.updateProfilePhoto(fileName);
      this.props.onComplete(resp, this.state.finalImage);
    });
  };

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setState({
        extension,
        imageLoading: false,
      });
      this.props.onComplete(reader.result, exif, extension);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image, finalFile: file });
  };

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

  getVideoStream = () => {
    if (!isBrowser()) return false
    if (detectUserMedia()) {
      return navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(stream => {
          this.videoRef.current.srcObject = stream;
          return stream;
        })
        .catch(() => {});
    }
  };

  handleDataAvailable = event => {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  };

  detectCameraMedia = async () => {
    await this.getVideoStream();
    this.setState({ recording: true });
  };

  checkResolution(file) {
    let correctResolution = false;
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    return new Promise(resolve => {
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        this.originalHeight = img.height;
        this.originalWidth = img.width;
        window.URL.revokeObjectURL(img.src);
        if (width >= 100 && height >= 100) {
          correctResolution = true;
        }
        resolve(correctResolution);
      };
    });
  }

  render() {
    return (
      <ImageUpload.DetailsWrapper
        imagePresent={this.props.image}
        className="upload-wrap"
      >
        {!this.state.imageLoading && (
          <React.Fragment>
            <ImageUpload.ProfileInputButton
              className="profile-img-wrapper"
              image={this.props.image}
              takePhoto={this.state.recording}
            >
              <ImageUpload.ProfileImageWrapper
                className="profile-image-wrapper"
                imageUrl={this.state.finalImage}
              >
                <ImageUpload.UploadInput
                  accept=".png, .jpeg, .jpg"
                  id="profile"
                  onChange={() => this.onFileChange()}
                  type="file"
                />
                <ImageUpload.ProfileInputContainer>
                  <ImageUpload.ProfileInputWrapper
                    noImage={this.state.finalImage}
                  >
                    <FontAwesomeIcon icon={faUpload} />
                  </ImageUpload.ProfileInputWrapper>
                  {!this.state.finalImage ? (
                    <ImageUpload.UploadText>
                      {this.props.t('common.signupFlow.uploadPic')}
                    </ImageUpload.UploadText>
                  ) : null}
                </ImageUpload.ProfileInputContainer>
              </ImageUpload.ProfileImageWrapper>
              <ImageUpload.ProfileImageWrapper
                className="profile-image-wrapper"
                imageUrl={this.state.finalImage}
                onClick={this.props.onTakePicture}
              >
                <ImageUpload.ProfileInputContainer>
                  <ImageUpload.ProfileInputWrapper
                    noImage={this.state.finalImage}
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </ImageUpload.ProfileInputWrapper>
                  {!this.state.finalImage ? (
                    <ImageUpload.UploadText>
                      {this.props.t('common.signupFlow.takePic')}
                    </ImageUpload.UploadText>
                  ) : null}
                </ImageUpload.ProfileInputContainer>
              </ImageUpload.ProfileImageWrapper>
            </ImageUpload.ProfileInputButton>
            <ImageUpload.UploadedImage
              className="upload-image"
              image={this.props.image}
            >
              <ImageUpload.ProfileImageWrapper
                className="profile-image-wrapper"
                imageUrl={this.props.image}
              ></ImageUpload.ProfileImageWrapper>
              <ImageUpload.ButtonWrapper
                isMultiline={this.props.multiline}
                className="profile-btn"
              >
                <ImageUpload.CropperLightButton
                  isMultiline={this.props.multiline}
                  onClick={this.props.onTakePicture}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="icon take-picture"
                  />
                  {this.props.t('common.signupFlow.TakePicture')}
                </ImageUpload.CropperLightButton>
                <ImageUpload.CropperLightButton
                  isMultiline={this.props.multiline}
                  htmlFor="profileUpload"
                >
                  <ImageUpload.UploadInput
                    accept=".png, .jpeg, .jpg"
                    id="profileUpload"
                    onChange={() => this.onUploadFileChange()}
                    type="file"
                  />
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="icon upload-picture"
                    htmlFor="profileUpload"
                  />
                  {this.props.t('common.upload_picture')}
                </ImageUpload.CropperLightButton>
              </ImageUpload.ButtonWrapper>
            </ImageUpload.UploadedImage>
            <ImageUpload.TakePhoto takePhoto={this.state.recording}>
              <ImageUpload.VideoElement
                autoPlay
                ref={this.videoRef}
                muted
              />
            </ImageUpload.TakePhoto>
          </React.Fragment>
        )}
        {this.state.imageLoading && <Loader />}
      </ImageUpload.DetailsWrapper>
    );
  }
}

ProfileUpload.propTypes = {
  updateProfilePhoto: PropTypes.func,
  onComplete: PropTypes.func,
  onTakePicture: PropTypes.func,
  image: PropTypes.string,
  multiline: PropTypes.bool,
};

ProfileUpload.defaultProps = {
  updateProfilePhoto: () => {},
  onComplete: () => {},
  onTakePicture: () => {},
  image: '',
  multiline: false,
};

export default withTranslation()(withDisableRefetchOnFocus(ProfileUpload));
