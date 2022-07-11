import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { bytesToSize } from 'customHooks/domUtils';
import TakePhoto from 'components/TakePhoto';
import TextArea from 'components/TextArea';
import Modal from 'components/Modal';
import Button from 'components/SecondaryButton';
import { Heading, Description } from 'styles/TextStyled';
import { Image, Close, FlexCenter } from 'styles/CommonStyled';
import StatusDisplay from 'components/StatusDisplay';
import { getStatusList, getDelivStatus } from 'src/utils/getDelivStatus';
import BackHeader from 'components/BackHeader';
import { imageTypes, fileTypes } from './constants';
import UploadModal from '../UploadModal';
import { CharCount } from '../../styled';
import { Wrapper, Buttons, ModalContent, Ul, Li } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

function ImageCapture(props) {
  useDisableRefetchOnFocus()
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const {
    booking_id: bookingId,
    complete_status: completeStatus,
  } = props.booking;
  const fileRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [size, updateSize] = useState(0);
  const [response, updateResponse] = useState('');
  const [sizeError, updateSizeError] = useState(false);

  const uploadFiles = async () => {
    props.completeUpload(
      {
        celebrity_reply: response,
      },
      files,
    );
  };

  const getImage = ({ base64, file }) => {
    const tFiles = [...files];
    tFiles.push({
      file,
      base64,
      file_name: `${Math.floor(100000 + Math.random() * 900000)}.${
        file.type.split('/')[1]
      }`,
      file_size: bytesToSize(file.size),
      file_type: 'image',
      key: tFiles.length + 1,
    });
    setFiles(tFiles);
    setOpen(false);
    updateSize(size + file.size);
  };

  const fileChange = event => {
    const file = event.target.files;
    const regex = new RegExp(
      '([a-zA-Z0-9~!\\[\\]@#$%,.^&?><)(+:[}{= *s_\\.-:])+(.jpg|.gif|.png|.jpeg|.tif|.tiff|.eps|.ai|.raw|.bmp)$',
    );

    if (files.filter(img => img.type === 'upload').length < 10) {
      if (file && regex.test(file[0].name.toLowerCase())) {
        if (file[0].size / 1024 + size > 5242880) {
          props.updateToast({
            value: true,
            message: t('open_bookings.file_less_5'),
            variant: 'error',
          });
          updateSizeError(true);
        } else {
          const tFiles = [...files];
          tFiles.push({
            file: file[0],
            base64: URL.createObjectURL(file[0]),
            file_name: file[0].name,
            file_size: bytesToSize(file[0].size),
            file_type: 'image',
            type: 'upload',
            key: tFiles.length + 1,
          });
          setFiles(tFiles);
          updateSize(file[0].size / 1024 + size);
        }
      } else {
        props.updateToast({
          value: true,
          message: t('common.file_format',{input:inputFilter}),
          variant: 'error',
        });
      }
    } else {
      props.updateToast({
        value: true,
        message: t('open_bookings.max_10'),
        variant: 'error',
      });
    }
    fileRef.current.value = '';
  };
  const closeModal = () => {
    setOpen(false);
  };

  const triggerCapture = () => {
    setOpen(true);
  };

  const removeImage = image => () => {
    const tFiles = files.filter(file => file.key !== image.key);
    setFiles(tFiles);
  };

  const responseChange = event => {
    updateResponse(event.target.value);
  };

  const tryUpload = () => {
    updateSizeError(false);
  };

  const changeDelivery = () => {
    updateSizeError(false);
    props.editDelivery(
      props.deliveryTypes.find(type => type.delivery_type === 4),
    );
  };

  const uploadPhoto = () => {
    if (fileRef && fileRef.current) fileRef.current.click();
  };

  return (
    <Wrapper>
      <span className="sub-head">{t('common.status')}</span>
      <span className="text text-pad">
        {t('open_bookings.email_txt',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name,purchaserPlural:entityData?.partnerData?.purchaser_singular_name})}
      </span>
      <StatusDisplay
        key={bookingId}
        list={getStatusList(completeStatus)}
        onSelect={props.updateStatusVal}
        selected={getDelivStatus(completeStatus)}
      />
      <span className="sub-head head-pad">{t('open_bookings.upload_image')}</span>
      <Description>
        {t('open_bookings.file_size5')}
      </Description>
      {files && files.length > 0 && (
        <Ul>
          {files.map(file => {
            return (
              <Li key={file.key}>
                <Close className="close" onClick={removeImage(file)} />
                <Image image={file.base64} className="image"></Image>
                <span className="file-details">
                  <span className="file-name">{file.file_name}</span>
                  <span className="file-size">
                    {file.file_type} - {file.file_size}
                  </span>
                </span>
              </Li>
            );
          })}
        </Ul>
      )}
      <Buttons>
        <Button onClick={triggerCapture}>{t('common.take_photo')}</Button>
        <Button secondary onClick={uploadPhoto}>
          {t('open_bookings.upload_photo')}
          <input
            className="hidden-upload"
            id="fileUpload"
            onChange={fileChange}
            type="file"
            accept={imageTypes}
            ref={fileRef}
          />
        </Button>
      </Buttons>

      <TextArea
        autoSize
        inputProps={{
          onChange: responseChange,
          value: response,
          maxLength: 500,
          placeholder: t('open_bookings.funStuff.textPlaceholder',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name}),
          className: 'textarea',
        }}
      />
      <CharCount>{t('common.char_remains', {length:500-response.length})}</CharCount>
      <FlexCenter className="buttons">
        <Button
          className="fun-btns"
          onClick={uploadFiles}
          disabled={!(response.length > 10 || files.length > 0)}
          isDisabled={!(response.length > 10 || files.length > 0)}
        >
          {t('open_bookings.completeOrder')}
        </Button>
      </FlexCenter>

      {open && (
        <Modal open={open} onClose={() => {}}>
          <ModalContent>
            <BackHeader
              backHandler={closeModal}
              closeHandler={closeModal}
              label="Capture photo"
            />
            <Heading className="crop-head">{t('common.take_your_photo')}</Heading>
            <TakePhoto takePicture onPictureCapture={getImage} />
          </ModalContent>
        </Modal>
      )}

      {sizeError && (
        <UploadModal
          open={sizeError}
          tryUpload={tryUpload}
          changeDelivery={changeDelivery}
        />
      )}
    </Wrapper>
  );
}

ImageCapture.propTypes = {
  updateToast: PropTypes.func.isRequired,
  completeUpload: PropTypes.func.isRequired,
  editDelivery: PropTypes.func.isRequired,
  deliveryTypes: PropTypes.array.isRequired,
  booking: PropTypes.object.isRequired,
  updateStatusVal: PropTypes.func.isRequired,
};

export default ImageCapture;
