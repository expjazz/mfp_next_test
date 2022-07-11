import React from 'react';
import { withTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import { Heading, Description } from 'styles/TextStyled';
import { FlexCenter } from 'styles/CommonStyled';
// import {
//   updateProfilePhoto,
//   setProfilePicToState,
// } from 'store/shared/actions/updateProfilePhoto';
// import { updateUserDetails } from 'store/shared/actions/saveSettings';
// import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import ConfirmRoute from 'components/ConfirmRoute';
import Button from 'components/SecondaryButton';
import { awsImageUpload } from 'src/services/awsImageUpload';
import { imageSizes } from 'src/constants/imageSizes';
import ConfirmSave from 'components/ConfirmSave';
import Input from 'components/TextInput';
import ProfileUpload from '../../../signupFlow/components/SignUpImageUpload/components/profileUpload';
import TakePhoto from '../../../signupFlow/components/SignUpImageUpload/components/takePhoto';
import PhotoGallery from './components/PhotoGallery';
import ImageCropper from '../../../ImageCropper';

import { UploadContainer, ImageUpload, Layout } from './styled';
import { generalLoader, updateToast, withGeneral } from 'src/context/general';
import { withLoggedUser } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { withPartnerData } from 'customHooks/reactQueryHooks';
import { capitalize } from '@material-ui/core';
import { withRouter } from 'next/router';

class NameAndPhoto extends React.Component {
  state = {
    name: this.props.loggedUser?.user?.nick_name
      ? this.props.loggedUser?.user?.nick_name
      : '',
    currentExif: null,
    cropper: false,
    finalImage: this.props.loggedUser?.user?.avatarPhoto
      ? this.props.loggedUser?.user?.avatarPhoto
      : '/images/fan-profile-pic.svg',
    cropImage: null,
    extension: null,
    takePicture: false,
    notSaved: false,
    vanityConfirm: false,
  };
  loaderAction = payload => generalLoader(this.props.dispatch, payload)
  localUpdateToast = payload => updateToast(this.props.dispatch, payload)
  onBack = () => {
    this.setState({
      cropper: false,
      takePicture: false,
    });
  };

  setTakePicture = () => {
    this.setState({ takePicture: true, cropper: false });
  };

  setProfileImage = (imageResult, exif, extension) => {
    this.setState({
      cropper: true,
      currentExif: exif,
      cropImage: imageResult,
      extension,
      takePicture: false,
    });
    this.props.confirmSave({ saved: false, route: 'name-photo' });
  };

  getCroppedImage = (file, image) => {
    this.uploadImage(file);
    this.setState({ finalImage: image });
  };

  uploadImage = file => {
    if (this.state.extension) {
      this.loaderAction(true);
      awsImageUpload(file, this.state.extension)
      .then(resp => {
        const fileName = {
          images: [resp],
          avatar_photo: resp,
          featured_image: '',
        };
          this.props.updateProfilePhoto(fileName).then(res => {
            if (res.avatar_photo) {
              this.props.confirmSave({ saved: true, route: '' });
            }
          });
          const fileURL = URL.createObjectURL(file);
          this.props.setProfilePicToState(fileURL);
        })
        .catch((e) => {
          this.loaderAction(false);
          this.localUpdateToast({
            value: true,
            message: this.props.t('common.uploadFailed'),
            variant: 'error',
            global: false,
          })
        });
    }
  };

  handleFieldChange = (fieldType, fieldValue) => {
    this.setState({
      [fieldType]: fieldValue,
    });
    this.props.confirmSave({ saved: false, route: 'name-photo' });
  };

  closeCropper = () => {
    this.setState({
      cropImage: null,
      cropper: false,
      takePicture: false,
    });
  };

  backHandler = () => {
    if (!this.props.saved.saved) {
      this.setState({ notSaved: true });
    } else {
      this.props.goBack();
    }
  };

  handleConfirm = () => {
    this.setState({ notSaved: false });
    this.props.confirmSave({ saved: true, route: '' });
    this.props.goBack();
  };

  closeConfirmSave = () => {
    this.setState({ notSaved: false });
  };

  updateStageName = (shouldUpdateVanity=false) => {
    const finalUserDetails = {
      celebrity_details: {},
      user_details: {
        nick_name: this.state.name && this.state.name.trim(''),
        show_nick_name:
          this.state.name && this.state.name.trim('') ? true : false,
        update_vanity: shouldUpdateVanity
      },
    };
    this.props.updateUserDetails(
      this.props.loggedUser?.user?.id,
      finalUserDetails,
    );
  }

  onVanityConfirmation = (shouldUpdateVanity) => () => {
    this.setState({
      vanityConfirm: false,
    })
    this.updateStageName(shouldUpdateVanity);
  }

  primaryButtonClick = () => {
    const { vanity_user_approved: vanityApproved } = this.props.loggedUser?.user;
    if (vanityApproved) {
      this.updateStageName(false)
    } else {
      this.setState({
        vanityConfirm: true,
      })
    }
  };

  // eslint-disable-next-line react/sort-comp
  componentWillReceiveProps(newProps) {
    if (
      this.props.loggedUser?.user?.nick_name !==
      newProps?.userDetails?.user?.nick_name
    ) {
      this.props.confirmSave({ saved: true, route: '' });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <ConfirmRoute
          when={!this.props.saved?.saved}
          history={this.props.router}
          validateUrl="/manage/storefront/profile/name-photo"
          confirmSave={this.props.confirmSave}
        />
        <ConfirmSave
          open={this.state.vanityConfirm}
          message={t('common.profilesec.stageNameConfirm')}
          cancelBtnText={t('common.no')}
          confirmBtntext={t('common.yes')}
          closeModal={this.onVanityConfirmation(false)}
          handleConfirm={this.onVanityConfirmation(true)}
        />
        {this.state.notSaved && (
          <ConfirmSave
            open={this.state.notSaved}
            closeModal={this.closeConfirmSave}
            handleConfirm={this.handleConfirm}
          />
        )}
        <Layout>
          {!this.state.takePicture && !this.state.cropper && (
            <BackHeader
              backHandler={this.backHandler}
              label={t('common.design')}
              closeHandler={this.backHandler}
              noHelp
            />
          )}
          <section className="name-photo-wrap">
            <Layout.InputWrap>
              <Heading className="nm-heading">{t('common.stage_name')}</Heading>
              <Input
                inputProps={{
                  nativeProps: { maxLength: 30 },
                  defaultProps: {
                    value: this.state.name,
                    onChange: event => {
                      this.handleFieldChange('name', event.target.value);
                    },
                  },
                  labelObj: {
                    label: t('common.profilesec.name_placeholder', {
                      store: this.props.entityData?.partnerData?.partner_name,
                    }),
                  },
                }}
              />
            </Layout.InputWrap>
            <FlexCenter>
              <Button onClick={this.primaryButtonClick}>{t('common.save')}</Button>
            </FlexCenter>
            {this.state.cropper && (
              <UploadContainer.CropperContainer className="crop-photo">
                <BackHeader
                  backHandler={this.onBack}
                  label={t('common.profilesec.name&phote')}
                  closeHandler={this.onBack}
                  rootClass="cropper-head"
                  noHelp
                />
                <ImageUpload.CropWrapper className="cropper-Wrapper">
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
            )}
            {this.state.takePicture && (
              <UploadContainer.CropperContainer className="take-photo">
                <ImageUpload.CropWrapper>
                  <BackHeader
                    backHandler={this.onBack}
                    label={t('common.profilesec.page_setup')}
                    closeHandler={this.onBack}
                    rootClass="cropper-head"
                    noHelp
                  />
                  <Heading className="takepic-head">
                    {t('common.take_your_photo')}
                  </Heading>
                  <TakePhoto
                    takePicture={this.state.takePicture}
                    onPictureCapture={this.setProfileImage}
                  />
                </ImageUpload.CropWrapper>
              </UploadContainer.CropperContainer>
            )}

            {!this.state.takePicture && !this.state.cropper && (
              <UploadContainer.ProfileUploadWrap>
                <Heading className="phto-heading">
                  {t('common.profilesec.store_photo', {
                    store: capitalize(this.props.entityData?.partnerData?.partner_name),
                  })}
                </Heading>
                <ProfileUpload
                  starMode
                  onTakePicture={this.setTakePicture}
                  onComplete={this.setProfileImage}
                  image={this.state.finalImage}
                  updateProfilePhoto={this.props.updateProfilePhoto}
                  multiline
                  className="profileupload"
                />
              </UploadContainer.ProfileUploadWrap>
            )}
          </section>
          {!this.state.takePicture && !this.state.cropper && (
            <UploadContainer.ProfileUploadWrap customMargin>
              <Heading className="phto-heading">
                {t('common.profilesec.photo_gallery')}
              </Heading>
              <Description>{t('common.profilesec.addintional_photo')}</Description>
              <PhotoGallery
                loaderAction={this.loaderAction}
                updateToast={this.localUpdateToast}
                userId={this.props.loggedUser?.user?.user_id}
              />
            </UploadContainer.ProfileUploadWrap>
          )}
        </Layout>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  userDetails: state.userDetails,
});

// const mapDispatchToProps = dispatch => ({
//   updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj, true, false)),
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: obj => dispatch(updateToast({ ...obj, global: false })),
//   setProfilePicToState: obj => dispatch(setProfilePicToState(obj)),
//   updateUserDetails: (id, obj) =>
//     dispatch(updateUserDetails(id, obj, null, false)),
// });

// NameAndPhoto.propTypes = {
//   userDetails: PropTypes.object.isRequired,
//   updateProfilePhoto: PropTypes.func.isRequired,
//   goBack: PropTypes.func.isRequired,
//   loaderAction: PropTypes.func.isRequired,
//   updateToast: PropTypes.func.isRequired,
//   setProfilePicToState: PropTypes.func.isRequired,
//   updateUserDetails: PropTypes.func.isRequired,
//   history: PropTypes.object.isRequired,
//   saved: PropTypes.object.isRequired,
//   confirmSave: PropTypes.func.isRequired,
// };
export default withRouter(withLoggedUser(withPartnerData(withGeneral(withTranslation()(NameAndPhoto)))))
