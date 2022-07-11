import React, { useState, useRef, useEffect, useMemo } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation,Trans } from 'react-i18next';
// import { cloneDeep } from 'src/utils/dataStructures';
import Button from 'components/SecondaryButton';
import { Description } from 'styles/TextStyled';
import { bytesToSize } from 'customHooks/domUtils';
import VideoRecorder from 'components/VideoRecorder';
import { Close } from 'styles/CommonStyled';
import {
  checkMediaRecorderSupport,
  audioVideoSupport,
  isWebSafari,
} from 'src/utils/checkOS';
import UploadModal from '../../UploadModal';
import { videoTypes, fileTypes } from './constants';
import { Layout, VideoContainer, Buttons, Ul, Li } from './styled';
import { cloneDeep } from 'src/utils/dataStructures';
import { useGeneral } from 'src/context/general';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const VideoRec = props => {
  useDisableRefetchOnFocus()
  const { t } = useTranslation();
  const [state, dispatch] = useGeneral()
  const { commonReducer } = state
  const {
    videoSrc,
    videoUploaded,
    playPauseMedia: playPauseMediaFlg,
    shouldRecord,
    recordedTime
  } = commonReducer
  const uploadField = useRef(null);
  const [size, updateSize] = useState(0);
  const [sizeError, updateSizeError] = useState(false);
  const [stateObject, updatedStateHandler] = useState({
    isStop: false,
    error: false,
  });
  const [noSupport, updateSupport] = useState(false);

  const stopRecordHandler = () => {
    updatedStateHandler({ ...stateObject, isStop: true });
    if (shouldRecord) props.recordTrigger();
    if (playPauseMediaFlg) props.playPauseMedia();
  };

  const errorHandlerCallback = () => {
    updatedStateHandler({
      ...stateObject,
      error: true,
    });
  };

  const uploadHandler = () => input => {
    const file = input.target.files[0];
    const regex = new RegExp(
      '([a-zA-Z0-9~!\\[\\]@#$%,.^&?><)(+:[}{= *s_\\.-:])+(.wmv|.webm|.mpg|.mp2|.mpe|.mpv|.avi|.mov|.mp4|.mkv)$',
    );
    if (props.files.filter(vdo => vdo.type === 'upload').length < 10) {
      if (file && regex.test(file.name.toLowerCase())) {
        if (file.size / 1024 + size > 5242880) {
          props.updateToast({
            value: true,
            message: t('open_bookings.file_less_5'),
            variant: 'error',
          });
          updateSizeError(true);
        } else {
          const tFiles = [...cloneDeep(props.files)];
          tFiles.push({
            file,
            file_name: file.name,
            file_size: bytesToSize(file.size),
            file_type: 'video',
            type: 'upload',
            key: tFiles.length + 1,
          });
          props.updateFiles(tFiles);
          const tSize = tFiles.reduce((acc, cur) => {
            return acc + cur.file.size / 1024;
          }, 0);
          updateSize(tSize);
        }
      } else {
        props.updateToast({
          value: true,
          message: t('common.file_format',{input:fileTypes}),
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
    uploadField.current.value = '';
  };

  const recordMedia = () => {
    if (shouldRecord) {
      stopRecordHandler();
    } else {
      if (!shouldRecord) props.recordTrigger();
      if (!playPauseMediaFlg) props.playPauseMedia();
    }
  };

  const uploadtrigger = () => {
    if (uploadField && uploadField.current) {
      uploadField.current.click();
    }
  };

  const checkDeviceSupport = async () => {
    const deviceSupport = await audioVideoSupport('videoinput');
    if (!deviceSupport) {
      updateSupport(true);
    }
  };

  const changeDelivery = () => {
    updateSizeError(false);
    props.editDelivery(
      props.deliveryTypes.find(type => type.delivery_type === 4),
    );
  };

  const removeVideo = image => () => {
    const tFiles = props.files.filter(file => file.key !== image.key);
    props.updateFiles(tFiles);
  };

  const tryUpload = () => {
    updateSizeError(false);
  };

  useEffect(() => {
    checkDeviceSupport();
    props.playPauseMedia(true);
  }, []);

  const hasSupport = useMemo(() => {
    return (
      !noSupport &&
      !isWebSafari() &&
      checkMediaRecorderSupport()
    );
  }, [noSupport]);

  return (
    <Layout>
      <span className="sub-head">{t('open_bookings.record_your_video')}</span>
      <Description>{t('open_bookings.record_size')}</Description>

      {props.files && props.files.length > 0 && (
        <Ul>
          {props.files.map(file => {
            return (
              <Li key={file.key}>
                <Close className="close" onClick={removeVideo(file)} />
                <span className="file-details">
                  <span className="file-name">{file.file_name}</span>
                  <span className="file-size">
                    {t('common.file_size')} - {file.file_size}
                  </span>
                </span>
              </Li>
            );
          })}
        </Ul>
      )}
      {hasSupport && (
        <VideoContainer>
          <VideoRecorder
            updateMediaStore={props.updateMediaStore}
            stopRecordHandler={stopRecordHandler}
            playPauseMediaAction={props.playPauseMedia}
            recordTrigger={props.recordTrigger}
            errorHandler={errorHandlerCallback}
            forceStop={stateObject.isStop}
            uploadHandler={uploadHandler}
            videoSrc={videoSrc}
            shouldRecord={shouldRecord}
            playPauseMediaFlg={commonReducer.playPauseMedia}
            playPauseMedia={commonReducer.playPauseMedia}
            updateMediaStore={props.updateMediaStore}
            videoFile={commonReducer.file}
            uploader
          />
        </VideoContainer>
      )}
      <Buttons hasSupport={hasSupport}>
        <Button secondary onClick={uploadtrigger}>
          {t('common.upload_video')}
          <input
            ref={uploadField}
            type="file"
            id="fileUpload"
            className="hidden"
            accept={videoTypes}
            onChange={uploadHandler()}
          />
        </Button>
        {hasSupport && (
          <Button onClick={recordMedia}>
            {shouldRecord ? t('common.stopRecording') : t('common.startRecording')}
          </Button>
        )}
      </Buttons>
      {sizeError && (
        <UploadModal
          open={sizeError}
          tryUpload={tryUpload}
          changeDelivery={changeDelivery}
        />
      )}
    </Layout>
  );
};

VideoRec.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateFiles: PropTypes.func.isRequired,
  playPauseMediaFlg: PropTypes.bool,
  shouldRecord: PropTypes.bool.isRequired,
  files: PropTypes.array,
  editDelivery: PropTypes.func.isRequired,
  deliveryTypes: PropTypes.array.isRequired,
};

VideoRec.defaultProps = {
  playPauseMediaFlg: false,
  files: [],
};

// function mapStateToProps(state) {
//   return {
//     videoSrc: state.commonReducer.videoSrc,
//     videoUploaded: state.commonReducer.videoUploaded,
//     playPauseMediaFlg: state.commonReducer.playPauseMedia,
//     shouldRecord: state.commonReducer.shouldRecord,
//     recordedTime: state.commonReducer.recordedTime,
//   };
// }

export default VideoRec
