import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Button from 'components/SecondaryButton';
import StatusDisplay from 'components/StatusDisplay';
import TextArea from 'components/TextArea';
import FunList from 'components/FunList';
import { getStatusList, getDelivStatus } from 'src/utils/getDelivStatus';
import { FlexCenter, Dashed } from 'styles/CommonStyled';
import { bytesToSize } from 'customHooks/domUtils';
import { Description } from 'styles/TextStyled';
import UploadModal from '../UploadModal';
import {
  heading,
  description,
  maxUploadSize,
  maxFileLength,
  fileRegex,
  inputFilter,
} from './constants';
import {
  statusHeading,
  statusDescription
} from '../../constants';
import {
  Ul, ListWrapper
} from '../../styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const FileUpload = ({
  bookId,
  completeStatus,
  updateStatusVal,
  updateToast,
  completeUpload,
  changeToLink,
}) => {
  useDisableRefetchOnFocus()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const [size, updateSize] = useState(0);
  const [limModal, toggLimMoal] = useState(false);
  const [response, updateResponse] = useState('');
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);

  const responseChange = event => {
    updateResponse(event.target.value);
  };

  const onComplete = () => {
    completeUpload({
      celebrity_reply: response,
    }, files)
  };

  const removeImage = index => () => {
    const tFiles = [...files];
    tFiles.splice(index, 1);
    setFiles(tFiles);
  };

  const fileChange = async event => {
    const file = event.target.files;
    const regex = new RegExp(
      fileRegex,
    );

    if (
      files.length < maxFileLength &&
      file &&
      regex.test(file[0].name.toLowerCase())
    ) {
      if (file[0].size / 1024 + size > maxUploadSize) {
        toggLimMoal(true);
      } else {
        const tFiles = [...files];
        tFiles.push({
          file: file[0],
          file_name: file[0].name,
          type: 'upload',
          file_size: bytesToSize(file[0].size),
          file_type: 'application',
        });
        setFiles(tFiles);
        updateSize(file[0].size / 1024);
      }
    } else if (files.length >= maxFileLength) {
      updateToast({
        value: true,
        message: t('common.file_limit_error'),
        variant: 'error',
      });
    } else {
      updateToast({
        value: true,
        message: t('common.file_format',{input:inputFilter}),
        variant: 'error',
      });
    }
    fileRef.current.value = '';
  };

  const clearStates = () => {
    updateResponse('');
    setFiles([]);
    toggLimMoal(false);
    updateSize(0);
  }

  useEffect(() => {
    clearStates();
  }, [bookId])

  const closeModal = () => {
    toggLimMoal(false);
  }

  return (
    <React.Fragment>
      <UploadModal
        open={limModal}
        changeDelivery={changeToLink}
        tryUpload={closeModal}
      />
      <div className="flex-col req-sec">
        <span className="sub-head">{statusHeading}</span>
        <Description className="text note">
          {statusDescription}
        </Description>
        <StatusDisplay
          key={bookId}
          list={getStatusList(completeStatus)}
          onSelect={updateStatusVal}
          selected={getDelivStatus(completeStatus)}
        />
      </div>
      <div className="flex-col">
        <span className="sub-head">{t('open_bookings.commercial.uploadFile')}</span>
        <Description className="text note">
          {t("open_bookings.file_upload_limit")}
        </Description>
        <ListWrapper>
          <Ul>
            {files.map((file, index) => {
              return (
                <FunList
                  key={index}
                  close
                  removeImage={removeImage(index)}
                  fun={{
                    ...file,
                  }}
                  fileName
                />
              );
            })}
          </Ul>
        </ListWrapper>
        <div className='req-sec'>
          {
            size <= maxUploadSize ?
              <Dashed htmlFor="fileUpload">
                <input
                  className="hidden-upload"
                  id="fileUpload"
                  accept={inputFilter}
                  onChange={fileChange}
                  type="file"
                  ref={fileRef}
                />
                {t("open_bookings.commercial.uploadFile")}
              </Dashed>
            : 'asdasd'
          }
        </div>
        <TextArea
          autoSize
          inputProps={{
            onChange: responseChange,
            value: response,
            maxLength: 500,
            placeholder:t('open_bookings.funStuff.textPlaceholder',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name}),
            className: 'textarea',
          }}
        />
        <FlexCenter className="buttons">
          <Button
            className="fun-btns"
            onClick={onComplete}
            disabled={!files.length}
            isDisabled={!files.length}
          >
            {t('open_bookings.completeOrder')}
          </Button>
        </FlexCenter>
      </div>
    </React.Fragment>
  )
}

FileUpload.propTypes = {
  bookId: PropTypes.string.isRequired,
  completeStatus: PropTypes.string.isRequired,
  updateStatusVal: PropTypes.func.isRequired,
  completeUpload: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  changeToLink: PropTypes.func.isRequired,
}

export default FileUpload;
