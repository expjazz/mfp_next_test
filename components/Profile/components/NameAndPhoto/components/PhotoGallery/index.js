import React, { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import axios from 'axios'
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { postReactionMedia } from 'src/services/postReaction';
import { awsKeys } from 'src/constants/';
import { LinkButton } from 'styles/CommonStyled';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { getImgResolution } from 'src/utils/imageProcessing';
import SecondaryButton from 'components/SecondaryButton';
import ToolTip from 'components/ToolTip';
import { imageLimit, buttonTooltip } from './constants';
import {
  Layout,
  Wrap,
  UploadInput,
  GallImg,
  ImageList,
  ImageItem,
} from './styled';
import { galleryImage } from 'src/services/myfanpark/celebActions';
import { postReactionMedia } from 'src/services/postReaction';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const PhotoGallery = ({ userId, loaderAction, updateToast }) => {
  useDisableRefetchOnFocus()
  const { t } = useTranslation();
  const [imageList, updateImageList] = useState([]);
  const uploadRef = useRef(null);
  const tempImageList = useRef([]);
  const isMobile = useMediaQuery('(max-width: 831px)');

  const uploadToS3 = async finalFile => {
    try {
      const extension = finalFile.type.split('/')[1];
      const resolution = await getImgResolution(finalFile);
      if (extension) {
        const resp = await postReactionMedia(
          awsKeys.galleryImage,
          finalFile,
          extension,
          'image',
        );
        if (resp) {
          const response = await axios.post(resp.url, resp.formData);
          if (response) {
            const imageResp = await galleryImage(
              'add',
              userId,
              resp.fileName,
              resolution,
            );
            if (imageResp.success && imageResp.data && imageResp.data.gallery) {
              updateImageList([
                imageResp.data.gallery,
                ...tempImageList.current,
              ]);
              tempImageList.current = [
                imageResp.data.gallery,
                ...tempImageList.current,
              ];
              return true;
            }
            throw new Error();
          }
          throw new Error();
        }
        throw new Error();
      }
    } catch (e) {
      loaderAction(false);
      updateToast({
        value: true,
        message: t('common.profilesec.image_failed_upload'),
        variant: 'error',
      });
      return false;
    }
  };

  const onUploadFileChange = async () => {
    const { files } = uploadRef.current;
    const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
    const inCorrectFile = Array.from(files).find(
      file => !file || !allowedExtensions.exec(uploadRef.current.value),
    );
    try {
      if (inCorrectFile) {
        updateToast({
          value: true,
          message: t('common.filetype_not_supported'),
          variant: 'error',
        });
      } else if (files.length + imageList.length > imageLimit) {
        updateToast({
          value: true,
          message: t('common.profilesec.image_maxlength_error'),
          variant: 'error',
        });
      } else {
        tempImageList.current = imageList;
        const filePromises = Array.from(files).map(file => {
          return uploadToS3(file);
        });
        loaderAction(true);
        await Promise.all(filePromises).then(() => {
          updateToast({
            value: true,
            message: t('common.uploaded_success'),
            variant: 'success',
          });
        });
        loaderAction(false);
        uploadRef.current.value = '';
        tempImageList.current = [];
      }
    } catch (e) {
      updateToast({
        value: true,
        message: t('commonApiError'),
        variant: 'error',
      });
    }
  };

  const onUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const removeImage = id => async () => {
    loaderAction(true);
    try {
      const resp = await galleryImage('delete', id);
      if (resp.success) {
        updateImageList(imageList.filter(image => image.id !== id));
        updateToast({
          value: true,
          message: t('common.deleted_success'),
          variant: 'success',
        });
      }
    } catch (e) {
      updateToast({
        value: true,
        message: t('common.image_deelte_failed'),
        variant: 'error',
      });
    }
    loaderAction(false);
  };

  const renderImageList = () => {
    return imageList.map(image => (
      <ImageItem key={image.id}>
        <GallImg
          alt="gallery-image"
          src={image.thumbnail || image.gallery_image}
        />
        <LinkButton onClick={removeImage(image.id)}>{t('common.remove')}</LinkButton>
      </ImageItem>
    ));
  };

  const renderButton = () => {
    return (
      <Wrap>
        <ToolTip
          title={
            !isMobile && imageList.length >= imageLimit ? buttonTooltip : ''
          }
        >
          <SecondaryButton
            secondary
            disabled={imageList.length >= imageLimit}
            onClick={onUploadClick}
            className="upload-btn"
          >
            <UploadInput
              accept=".png, .jpeg, .jpg"
              ref={uploadRef}
              onChange={onUploadFileChange}
              type="file"
            />
            <FontAwesomeIcon
              icon={faUpload}
              className="upload-picture"
              htmlFor="profileUpload"
            />
            <span>{t('common.upload_picture')}</span>
          </SecondaryButton>
        </ToolTip>
      </Wrap>
    );
  };

  useEffect(() => {
    const func = async () => {
      const imageResp = await galleryImage('list', userId);
      if (imageResp.success && imageResp.data) {
        updateImageList(imageResp.data.gallery || []);
      }
    };
    func();
  }, [userId]);

  return (
    <Layout>
      <ImageList>
        {renderImageList()}
        {!isMobile && <ImageItem>{renderButton()}</ImageItem>}
      </ImageList>
      {isMobile && renderButton()}
    </Layout>
  );
};

PhotoGallery.propTypes = {
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PhotoGallery;
