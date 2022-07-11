import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
import { Heading } from 'styles/TextStyled';
import BackHeader from 'components/BackHeader';
// import TakePhoto from 'components/TakePhoto';
import Modal from '../../../Modal';
// import ImageCropper from '../../../ImageCropper';
import { Layout } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import ImageCropper from 'components/ImageCropper';
import TakePhoto from 'components/TakePhoto';

const ImageModal = props => {
  const { t } = useTranslation();
  return (
    <Modal open>
      <Layout>
        <BackHeader
          backHandler={props.closeCropper}
          closeHandler={props.closeCropper}
          label={t('star_settings.photo.profile_photo')}
          noHelp
        />
        <Heading className="crop-head">
          {props.isUpload ? t('common.crop_your_photo') : t('common.take_your_photo')}
        </Heading>
        {props.isUpload && !isEmpty(props.imageUrl) ? (
          <ImageCropper
            onTakePicture={props.takeNewPicture} // on take new picture:- camera
            onUploadComplete={props.newUpload} // on upload file:- image
            aspectRatio={1}
            afterCrop={props.getCroppedImage}
            closeCropper={props.closeCropper}
            cropImage={props.imageUrl}
          />
        ) : (
          <TakePhoto takePicture onPictureCapture={props.takePictureResult} />
        )}
      </Layout>
    </Modal>
  );
};

ImageModal.propTypes = {
  isUpload: PropTypes.bool,
  closeCropper: PropTypes.func,
  takeNewPicture: PropTypes.func,
  newUpload: PropTypes.func,
  getCroppedImage: PropTypes.func,
  takePictureResult: PropTypes.func,
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

ImageModal.defaultProps = {
  isUpload: false,
  closeCropper: () => {},
  takeNewPicture: () => {},
  newUpload: () => {},
  getCroppedImage: () => {},
  takePictureResult: () => {},
  imageUrl: '',
};

export default ImageModal;
