import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/pro-light-svg-icons';
import Button from 'components/SecondaryButton';
import { Layout } from './styled';

function ImgCropper(props) {
  const { t } = useTranslation();
  const cropImage = useRef(null);
  const cropperRef = useRef(null);
  const [dragNotification, toggleDragNotification] = useState(false);

  const handleCrop = () => {
    if (cropperRef && cropperRef.current) {
      const cropperCanvas = cropperRef.current.getCroppedCanvas();
      const base64Image = cropperCanvas.toDataURL('image/jpeg');
      cropperCanvas.toBlob(file => {
        props.afterCrop(file, base64Image);
      }, 'image/jpeg');
    }
  };

  const initializeCropper = () => {
    cropperRef.current = new Cropper(cropImage.current, {
      viewMode: 3,
      dragMode: 'move',
      autoCropArea: 1,
      restore: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      zoom: e => {
        if (e.detail.ratio > 1) {
          e.preventDefault();
          if (cropperRef && cropperRef.current) cropperRef.current('zoomTo', 1);
        }
      },
    });
    const contData = cropperRef.current.getContainerData();
    cropperRef.current.setCropBoxData({
      height: contData.height,
      width: contData.width,
    });
  };

  const hideNotofiaction = () => {
    toggleDragNotification(false);
  };

  useEffect(() => {
    if (cropperRef && cropperRef.current) {
      cropperRef.current.destroy();
      initializeCropper();
    }
    toggleDragNotification(true);
  }, [props.cropImage]);

  useEffect(() => {
    initializeCropper();
  }, []);

  return (
    <Layout id="cropper-wrapper" onClick={hideNotofiaction}>
      <img
        ref={cropImage}
        alt="cropper"
        style={{ maxwidth: '100%' }}
        src={props.cropImage}
      />
      <Button
        onClick={handleCrop}
        className="save-btn-crop"
        ref={props.cropperBtnRef}
      >
        {t('common.save')}
      </Button>
      {dragNotification && (
        <span className="drag">
          <FontAwesomeIcon icon={faArrowsAlt} className="cam-icon" />
          <span>{t('common.cropperDrag')}</span>
        </span>
      )}
    </Layout>
  );
}

ImgCropper.propTypes = {
  afterCrop: PropTypes.func.isRequired,
  cropImage: PropTypes.string.isRequired,
  cropperBtnRef: PropTypes.oneOfType([PropTypes.object, null]),
};
ImgCropper.defaultProps = {
  cropperBtnRef: null,
};

export default ImgCropper;
