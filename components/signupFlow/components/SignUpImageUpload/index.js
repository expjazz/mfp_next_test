import React from 'react';
import { withTranslation } from 'next-i18next';
import BackHeader from 'components/BackHeader';
import { ROLES } from 'src/constants/userType';
import Button from 'components/SecondaryButton';
import ProfileUpload from './components/profileUpload';
import TakePhoto from './components/takePhoto';
import { awsImageUpload } from 'src/services/awsImageUpload';
import { ErrorMessage, ImageUpload, UploadContainer } from './styled';
import ImageCropper from 'components/ImageCropper';
import { imageSizes } from 'src/constants/imageSizes';
import { withPartnerData } from 'customHooks/reactQueryHooks';
import { locStorage } from 'src/utils/localStorageUtils';
import { axiosFetch } from 'src/services/fetch';


const entity = value => value
class SignUpImageUpload extends React.Component {
  state = {
    currentExif: null,
    verificationDisable: false,
    cropper: false,
    finalImage: this.props.signupDetails.profileImage,
    cropImage: null,
    extension: null,
    takePicture: false,
    isContinue: false,
  };

  onBack = () => {
    this.props.scrollRef.scrollTop = 0;
    this.setState({
      cropper: false,
      takePicture: false,
    });
  };

  setProfileImage = (imageResult, exif, extension) => {
    this.props.scrollRef.scrollTop = 0;
    this.setState({
      cropper: true,
      currentExif: exif,
      cropImage: imageResult,
      extension,
    });
  };

  getCroppedImage = (file, image) => {
    this.setState({ finalImage: image });
    this.props.generalLoader(true);
    awsImageUpload(file, this.state.extension)
    .then((resp) => {
      const fileName = {
        "images": [resp],
        "avatar_photo": resp,
        "featured_image": "",
      }
      this.props.updateProfilePhoto(fileName)
        .then((resp) => {
          this.props.generalLoader(false);
          if (resp?.avatar_photo) {
            this.props.setSignupFlow({
              profileImage: resp.avatar_photo.image_url,
            })
          }
        });
      const fileURL = URL.createObjectURL(file);
      if (this.props.setProfilePicToState) {

        this.props.setProfilePicToState(fileURL);
      }
    })
    .catch((e) => {
      // this.props.loaderAction(false);
      this.props.updateToast({
        value: true,
        message: this.props.t('common.refresh_error'),
        variant: 'error',
        global: true,
      });
    });
  };

  setTakePicture = () => {
    this.props.scrollRef.scrollTop = 0;
    this.setState({ takePicture: true, cropper: false });
  };

  componentDidMount() {
    const token = locStorage.getItem('tempAuthToken')
    if (token) {
      axiosFetch.defaults.headers.common.authorization = `token ${token}`
    }
  }

  goToStep = type => {
    const { verificationDisable } = this.state;
    if (type === 'prev') {
      if (verificationDisable && this.props.currentStep === 8) {
        this.props.changeStep(this.props.currentStep - 2);
      } else {
        this.props.changeStep(this.props.currentStep - 1);
      }
    } else if (verificationDisable && this.props.currentStep === 6) {
      this.props.changeStep(this.props.currentStep + 2);
    } else {
      this.props.changeStep(this.props.currentStep + 1);
    }
  };

  continueClickhandler = () => {
    this.setState({isContinue: true});
    this.props.continueClickCallback(this.state.finalImage, this.state.cropImage);
  }
  closeCropper = () => {
    this.props.scrollRef.scrollTop = 0;
    this.setState({
      cropImage: null,
      cropper: false,
      takePicture: false,
    });
  };

  renderContent = () => {
    const { cropper, takePicture } = this.state;
    if (cropper) {
      return (
        <UploadContainer.CropperContainer>
          <BackHeader
            rootClass='crop-header'
            backHandler={this.onBack}
            closeHandler={this.onBack}
            noHelp
          />
          {
            this.props.signupRole !== ROLES.fan &&
              <UploadContainer.SubHead>
                { this.props.t('common.signupFlow.signupTitle', {
                  user: this.props?.entityData.partnerData.talent_singular_name,
                  store: this.props?.entityData.partnerData.storefront_name
                }) }
              </UploadContainer.SubHead>
          }
          <ImageUpload.Heading>{this.props.t('common.signupFlow.cropPhoto')}</ImageUpload.Heading>
          <ImageUpload.CropWrapper className='cropper-Wrapper'>
            <ImageCropper
              onTakePicture={this.setTakePicture}
              onUploadComplete={this.setProfileImage}
              exifData={this.state.currentExif}
              aspectRatio={imageSizes.profile}
              afterCrop={this.getCroppedImage}
              closeCropper={this.closeCropper}
              cropImage={this.state.cropImage}
            />
          </ImageUpload.CropWrapper>
        </UploadContainer.CropperContainer>
      );
    } else if (takePicture) {
      return (
        <UploadContainer.CropperContainer>
          <ImageUpload.CropWrapper>
            <BackHeader
              rootClass='crop-header'
              backHandler={this.onBack}
              closeHandler={this.onBack}
              noHelp
            />
            <ImageUpload.Heading>{this.props.t('common.take_your_photo')}</ImageUpload.Heading>
            <TakePhoto
              takePicture={takePicture}
              onPictureCapture={this.setProfileImage}
            />
          </ImageUpload.CropWrapper>
        </UploadContainer.CropperContainer>
      );
    }
    return (
      <UploadContainer.Wrapper>
        {
          this.props.signupRole !== ROLES.fan &&
            <UploadContainer.SubHead>
              { this.props.t('common.signupFlow.signupTitle', {
                  user: this.props?.entityData.partnerData.talent_singular_name,
                  store: this.props?.entityData.partnerData.storefront_name
                }) }
            </UploadContainer.SubHead>
        }
        <UploadContainer.Heading className={this.state.finalImage ? 'select-category' : 'fans-want'}>
          {this.state.finalImage
            ? this.props.t('common.lookGreat')
            : this.props.t('common.readyCloseup')}
        </UploadContainer.Heading>
        <ProfileUpload
          starMode
          onTakePicture={this.setTakePicture}
          onComplete={this.setProfileImage}
          image={this.state.finalImage}
          updateProfilePhoto={this.props.updateProfilePhoto}
        />
        <ImageUpload.ControlButton>
          <Button onClick={this.continueClickhandler}>{this.props.t('common.continue')}</Button>
        </ImageUpload.ControlButton>
        {!((this.state.finalImage || this.state.cropImage)) && this.state.isContinue &&(
          <ErrorMessage className="error-msg">{this.props.t('common.signupFlow.addProfilePic')}</ErrorMessage>
        )}
      </UploadContainer.Wrapper>
    );
  };

  render() {
    const { cropper, takePicture } = this.state;
    return (
      <UploadContainer.Container>
        {
          !cropper && !takePicture &&
            <BackHeader
              rootClass='method-header'
              backHandler={this.props.onBack}
              closeHandler={this.props.closeSignupFlow}
              noHelp
            />
        }
        {this.renderContent()}
      </UploadContainer.Container>
    );
  }
}

// const mapStateToProps = state => ({
//   loading: state.session.loading,
//   signupDetails: state.signupDetails,
//   professionsList: state.professionsList,
// });

// const mapProps = dispatch => ({
//   updateLoginStatus: sessionDetails =>
//     dispatch(updateLoginStatus(sessionDetails)),
//   fetchUserDetails: id => dispatch(fetchUserDetails(id)),
//   fetchSuggestionList: searchParam =>
//     dispatch(fetchSuggestionList(searchParam)),
// });

export default withTranslation()((withPartnerData(SignUpImageUpload)));
