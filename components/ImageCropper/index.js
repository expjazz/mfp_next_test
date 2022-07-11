import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'next-i18next';
import EXIF from 'exif-js';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import Button from 'components/SecondaryButton';
import CropperStyled from './styled';
import { withDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: false, cropImage: props.cropImage };
    this.cropImage = React.createRef();
    this.cropper = null;
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeCapture);
    this.resizeCapture();
    this.initializeCropper();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.isMobile !== prevState.isMobile ||
        this.state.cropImage !== prevState.cropImage) &&
      this.cropper
    ) {
      this.cropper.destroy();
      this.initializeCropper();
    }
  }

  componentWillUnmount() {
    if (this.cropper) {
      this.cropper.destroy();
    }
    window.removeEventListener('resize', this.resizeCapture);
  }

  async onFileChange() {
    const file = document.getElementById('profile').files[0];
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    if (
      file &&
      allowedExtensions.exec(document.getElementById('profile').value)
    ) {
      await this.getImageData(file);
    }
  }

  async getImageData(file) {
    const extension = file.type.split('/')[1];
    const reader = new FileReader();
    const exif = await this.getExif(file);
    this.currentExif = exif;
    reader.onload = () => {
      this.setState({ cropImage: reader.result });
      this.props.onUploadComplete(reader.result, exif, extension);
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

  initializeCropper = () => {
    this.cropper = new Cropper(this.cropImage.current, {
      aspectRatio: 1,
      viewMode: 1,
      // dragMode: 'move',
      cropmove: event => {
        if (this.state.isMobile) {
          const data = this.cropper.getData();
          if (data.width < 150) {
            event.preventDefault();
            data.width = 150;
            this.cropper.setData(data);
          }

          if (data.height < 150) {
            event.preventDefault();
            data.height = 150;
            this.cropper.setData(data);
          }
        }
      },
      zoomable: false,
      // zoomable: this.state.isMobile,
      // zoom: e => {
      //   if (e.detail.ratio > 1) {
      //     e.preventDefault();
      //     this.cropper('zoomTo', 1);
      //   }
      // },
    });
  };

  resizeCapture = () => {
    if (
      document.body.getBoundingClientRect().width <= 832 ||
      window.innerWidth <= 832
    ) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  handleCrop = () => {
    const cropperCanvas = this.cropper.getCroppedCanvas({
      width: 1024,
      height: 1024,
    });
    const base64Image = cropperCanvas.toDataURL('image/jpeg');
    cropperCanvas.toBlob(file => {
      this.props.afterCrop(file, base64Image);
      this.props.closeCropper();
    }, 'image/jpeg');
  };

  uploadImage = () => {
    this.inputRef.current.click();
  };

  render() {
    return (
      <CropperStyled>
        <CropperStyled.CropperWrapper className="crop-wrap">
          <img
            ref={this.cropImage}
            alt="cropper"
            style={{ maxwidth: '100%' }}
            src={this.state.cropImage}
          />
        </CropperStyled.CropperWrapper>
        {this.state.isMobile && (
          <Button onClick={this.handleCrop} className="button">
            {this.props.t('common.cropper.like')}
          </Button>
        )}
        <CropperStyled.ButtonWrapper>
          {this.state.isMobile && (
            <CropperStyled.SubHead>
              {this.props.t('common.cropper.change')}
            </CropperStyled.SubHead>
          )}
          <Button
            secondary
            onClick={this.props.onTakePicture}
            className="take-picture cropper-buttons"
          >
            <span className="btn-text">{this.props.t('common.cropper.new')}</span>
          </Button>
          {!this.state.isMobile && (
            <Button onClick={this.handleCrop} className="button">
              {this.props.t('common.cropper.like')}
            </Button>
          )}
          <Button
            onClick={this.uploadImage}
            secondary
            className="upload-picture cropper-buttons"
          >
            <input
              className="upload-button"
              ref={this.inputRef}
              accept=".png, .jpeg, .jpg"
              id="profile"
              onChange={() => this.onFileChange()}
              type="file"
            />
            <span className="btn-text">{this.props.t('common.cropper.upload')}</span>
          </Button>
        </CropperStyled.ButtonWrapper>
      </CropperStyled>
    );
  }
}

ImageCropper.propTypes = {
  cropImage: PropTypes.object,
  onUploadComplete: PropTypes.func,
  afterCrop: PropTypes.func,
  closeCropper: PropTypes.func,
  onTakePicture: PropTypes.func,
};

ImageCropper.defaultProps = {
  cropImage: {},
  onUploadComplete: () => {},
  afterCrop: () => {},
  closeCropper: () => {},
  onTakePicture: () => {},
};

export default withTranslation()(withDisableRefetchOnFocus(ImageCropper));
