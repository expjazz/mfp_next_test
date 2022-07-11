import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import PropTypes from 'prop-types';
import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/SecondaryButton';
import { FlexCenter } from 'styles/CommonStyled';
import { LinkText } from 'styles/TextStyled';
import VideoRecorder from 'components/VideoRecorder';
import {
  checkMediaRecorderSupport,
  isIOSDevice,
  isWebSafari,
} from 'src/utils/checkOS';
// import {
//   recordTrigger,
//   updateMediaStore,
//   playPauseMedia,
// } from 'store/shared/actions/commonActions';
import { recorder } from 'src/constants/videoRecorder';
import VideoRender from 'components/VideoRender';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  TimeSpan,
  FlexBox,
  ShowHide,
} from './Video.styles';
import { questionsAbout } from './dataModals';
import { isEmpty } from 'src/utils/dataStructures';
import { playPauseMedia, recordTrigger, updateMediaStore, useGeneral } from 'src/context/general';
import { getVideoLength } from 'customHooks/domUtils';
import { useMediaQuery } from '@material-ui/core';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const Video = props => {
  useDisableRefetchOnFocus()
  const { data: entityData } = useGetPartner()
  const [state, dispatch] = useGeneral()
  const { commonReducer } = state
  const {
    file: videoFile,
    recordedTime,
    videoSrc,
    shouldRecord: recordState,
    playPauseMedia: playPauseMediaFlg,
    recorded
   } = commonReducer
  const localRecordTrigger = payload => recordTrigger(dispatch, payload)
  const localUpdateMediaStore = payload => updateMediaStore(dispatch, payload)
  const localPlayPauseMedia = payload => playPauseMedia(dispatch, payload)
  const { t } = useTranslation();
  const videoRecordInput = useRef(null);
  const [uploaded, setUploaded] = useState(false);
  const [showHideFlg, showHideScript] = useState(false);
  const [mobileBtns, showMobileBtns] = useState(false);
  const [videoRecord, setVideoRecord] = useState(false);
  const [continueFlg, setContinueFlg] = useState(false);
  const [buttonLabel, changeButtonLabel] = useState(t('common.create_new_video'));
  const [error, errorHandler] = useState(false);
  const [isStop, stopHandler] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isPlayed, setPlayed] = useState(false);
  const [recordingTime, setRecordingTime] = useState('05:00');
  const [uploadTime, setUploadTime] = useState('');
  const isMobile = useMediaQuery('(max-width: 831px)');
  const videoTag = useRef(null);

  useEffect(() => {
    if (isMobile) {
      changeButtonLabel(t('common.create_new_video'));
    }
  }, [isMobile]);

  const mediaHandler = btnLabel => {
    changeButtonLabel(btnLabel);
    showHideScript(false);
    errorHandler(false);
  };

  const startStreaming = () => {
    changeButtonLabel(t('common.stop'));
    props.confirmSave({ saved: false, route: 'welcome-video' });
  };

  const buttonClickHandler = () => {
    if (buttonLabel === t('common.create_new_video')) {
      if (!recordState) {
        if (checkMediaRecorderSupport()) {
          mediaHandler(t('common.record'), false, false);
          stopHandler(false);
          setVideoRecord(true);
          setUploaded(false);
          setContinueFlg(false);
          mediaHandler(t('common.create_new_video'));
          if (!recordState) localRecordTrigger();
          if (!playPauseMediaFlg) localPlayPauseMedia();
        } else if (isIOSDevice()) {
          videoRecordInput.current.click();
        } else if (isWebSafari()) {
          if (!checkMediaRecorderSupport()) {
            errorHandler(true);
          }
        }
      }
      setUploadTime('');
    } else if (buttonLabel === t('common.create_new_video')) {
      showMobileBtns(true);
    } else if (buttonLabel === t('common.stop')) {
      setRecordingTime('05:00');
      mediaHandler(t('common.save&continue'));
      setContinueFlg(true);
      if (recordState) localRecordTrigger();
      if (playPauseMediaFlg) localPlayPauseMedia();
      stopHandler(true);
    } else if (buttonLabel === t('common.save&continue')) {
      if (isMobile) {
        changeButtonLabel(t('common.create_new_video'));
        showMobileBtns(false);
      } else changeButtonLabel(t('common.create_new_video'));
      props.uploadVideo(videoFile);
    }
  };

  const stopRecordHandler = () => {
    mediaHandler(t('common.save&continue'));
    setContinueFlg(true);
    if (recordState) localRecordTrigger();
    if (playPauseMediaFlg) localPlayPauseMedia();
  };

  const retryRecordHandler = () => {
    setUploaded(false);
    showHideScript(false);
    stopHandler(false);
    setVideoRecord(true);
    mediaHandler(t('common.create_new_video'));
    if (!checkMediaRecorderSupport() && isIOSDevice()) {
      videoRecordInput.current.click();
    }
  };
  const errorHandlerCallback = () => {
    errorHandler(true);
  };

  const checkIfNewVideo = () => {
    const pattern = /^blob:/i;
    if (pattern.test(videoSrc)) {
      return true;
    }
    return false;
  };

  const renderTimeHeader = () => {
    if (recordState) {
      return t('common.rem_time');
    } else if (uploadTime) {
      return t('common.wel_vid_length');
    } else if ((videoSrc || props.src) && recordedTime) {
      return t('common.wel_vid_length');
    } else if (isEmpty(recordedTime) && isEmpty(videoSrc)) {
      return t('common.max_time');
    }
    return '';
  };

  const renderTime = () => {
    if (recordState) {
      return recordingTime;
    } else if (uploadTime) {
      return uploadTime;
    } else if (props.src && videoTag.current) {
      return recordingTime;
    } else if (videoSrc) {
      if (
        !videoRecord &&
        (props.videoStatus === 'Pending' || props.videoStatus === 'Processing')
      ) {
        return t('common.processing_uppercamel');
      }
      return recordedTime;
    }
    return '05:00';
  };
  const getRecordTime = time => {
    setRecordingTime(time);
  };

  const uploadHandler = isIOS => async input => {
    const file = input.target.files[0];
    setVideoRecord(false);
    if (file.type.startsWith('video/')) {
      setUploaded(true);
      if (recordState) localRecordTrigger();
      if (playPauseMediaFlg) localPlayPauseMedia();
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      const objectURL = window.URL.createObjectURL(file);
      const time = await getVideoLength(objectURL);
      localUpdateMediaStore({
        videoSrc: objectURL,
        superBuffer: file,
        recordedTime: null,
        recorded: Boolean(isIOS),
      });
      changeButtonLabel(t('common.save&continue'));
      setUploadTime(time);
      showHideScript(false);
      setContinueFlg(true);
      props.confirmSave({ saved: false, route: 'welcome-video' });
    } else {
      props.updateToast({
        value: true,
        message: t('common.upload_video_file'),
        variant: 'error',
      });
    }
  };
  const getFileUpload = className => {
    return (
      <label
        id="upload"
        htmlFor="fileUpload"
        className={`${[className].join(' ')} ${recordState &&
          !error &&
          'disabled-btn'}`}
      >
        <input
          type="file"
          key={Math.random()}
          id="fileUpload"
          className="hidden"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={uploadHandler()}
        />
        {t('common.upload_video')}
      </label>
    );
  };

  const retryRecord = () => {
    if (!checkMediaRecorderSupport() && isIOSDevice()) {
      videoRecordInput.current.click();
    } else {
      retryRecordHandler();
      localRecordTrigger();
      localPlayPauseMedia();
    }
  };

  const getRetryBtn = () => {
    if (uploaded && !recorded && !isPlaying) {
      return (
        <label
          id="upload"
          htmlFor="fileUpload"
          className="retry uploadBtn uploadRetry"
        >
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={uploadHandler(isIOSDevice())}
          />
          {t('common.upload_dif_vid')}
        </label>
      );
    } else if (continueFlg && !isPlaying) {
      return (
        <Button className="retry" onClick={retryRecord}>
          {uploaded ? t('common.upload_dif_vid') : t('common.tryAgain')}
        </Button>
      );
    }
    return '';
  };

  const recordMedia = () => {
    if (!checkMediaRecorderSupport() && isIOSDevice()) {
      videoRecordInput.current.click();
    } else {
      stopHandler(false);
      setVideoRecord(true);
      setUploaded(false);
      mediaHandler(t('common.create_new_video'));
      if (!recordState) localRecordTrigger();
      if (!playPauseMediaFlg) localPlayPauseMedia();
    }
  };

  const getRecordLink = () => {
    if (!error || isIOSDevice()) {
      return (
        <span
          onClick={recordMedia}
          role="presentation"
          className={`uploadBtn ${recordState &&
            !error &&
            'disabled-btn'}`}
        >
          {t('common.recordVideo')}
        </span>
      );
    }
    return '';
  };

  const recordLinkHandler = () => {
    if (!error) {
      return getRecordLink();
    } else if (isIOSDevice) {
      return getRecordLink();
    }
    return null;
  };

  const onVideoEnded = () => {
    setPlaying(false);
  };

  const onVideoStart = () => {
    setPlaying(true);
    setPlayed(true);
  };
  const uploadVideoUnsupport = () => {
    videoRecordInput.current.click();
  };

  useEffect(() => {
    return () => {
      localUpdateMediaStore({
        videoSrc: null,
        superBuffer: null,
        recordedTime: null,
        recorded: false,
      });
    };
  }, []);

  const showVideo = () => {
    if ((props.src || videoSrc) && !videoRecord && !recordState) {
      return (
        <React.Fragment>
          <VideoRender
            variableWidth
            variableHeight
            videoStatus={props.videoStatus}
            cover={!checkIfNewVideo() && props.poster}
            videoSrc={videoSrc ? videoSrc : props.src}
            classes={{ container: 'player-container' }}
            onVideoEnded={onVideoEnded}
            onVideoStart={onVideoStart}
            pauseVideo={onVideoEnded}
          />
          {getRetryBtn()}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <VideoRecorder
          {...state.commonReducer}
          {...props}
          updateMediaStore={localUpdateMediaStore}
          duration={recorder.welcome}
          stopRecordHandler={stopRecordHandler}
          playPauseMediaAction={props.playPauseMedia}
          retryRecordHandler={retryRecordHandler}
          recordTrigger={localRecordTrigger}
          errorHandler={errorHandlerCallback}
          forceStop={isStop}
          getRecordTime={getRecordTime}
          startStreamingCallback={startStreaming}
          playPauseMediaAction={localPlayPauseMedia}
          playPauseMediaFlg={commonReducer.playPauseMedia}
          playPauseMedia={commonReducer.playPauseMedia}
          videoSrc={videoSrc}
          videoFile={commonReducer.file}
        />
      </React.Fragment>
    );
  };

  return (
    <Layout>
      <FlexBox className="video-wrapper">
        <VideoContainer isPlayed={isPlayed}>
          {showVideo()}
          {!isPlaying && (isMobile || (!isMobile && error) || isIOSDevice()) && (
            <TimeSpan className="mob-time">
              <span className="text">{renderTimeHeader()}</span>
              <span className="time">{renderTime()}</span>
            </TimeSpan>
          )}
        </VideoContainer>
        {(!error || isIOSDevice()) && (
          <QuestionContainer isShow={showHideFlg && !error && !mobileBtns}>
            {!error && (
              <React.Fragment>
                {checkMediaRecorderSupport() && (
                  <TimeSpan>
                    <span className="text">{renderTimeHeader()}</span>
                    <span className="time">{renderTime()}</span>
                  </TimeSpan>
                )}
                <h1 className="heading">{t('common.what_you_say')}</h1>
                <QuestionBuilder questionsList={questionsAbout(entityData?.partnerData)} />
                {(!showHideFlg || !isMobile) && (
                  <QuestionContainer.ButtonWrapper>
                    <Button onClick={buttonClickHandler} className="button">
                      {buttonLabel}
                    </Button>
                    {!continueFlg &&
                      !mobileBtns &&
                      getFileUpload(['uploadBtn'])}
                    {continueFlg &&
                      (recorded || isIOSDevice()
                        ? getFileUpload(['uploadBtn'])
                        : recordLinkHandler())}
                  </QuestionContainer.ButtonWrapper>
                )}

                {!isMobile && props.hasRemove && (
                  <LinkText className="remove-text" onClick={props.removeVideo}>
                    {t('common.remove_welcom_vid')}
                  </LinkText>
                )}
              </React.Fragment>
            )}
          </QuestionContainer>
        )}

        {error &&
          !mobileBtns &&
          !isIOSDevice() &&
          (isMobile ? !uploaded : true) && (
            <QuestionContainer className="no-device-support" isShow error>
              <p className="note">
                {isMobile ? (
                  <Trans i18nKey="common.video_rev_error_mob">
                    This device does not have video recording capability or it
                    is turned off. <br />
                    Check your mobile phone settings or try using another
                    device.
                  </Trans>
                ) : (
                  <Trans i18nKey="common.video_rev_error_web">
                    This device does not have video recording capability or it
                    is turned off.
                    <br />
                    <br />
                    Check your computer settings or you can use our iOS or
                    Android app to record your welcome video.
                  </Trans>
                )}
              </p>
              <QuestionContainer.ButtonWrapper>
                {videoSrc && buttonLabel !== t('common.create_new_video') && (
                  <Button onClick={buttonClickHandler} className="button">
                    {buttonLabel}
                  </Button>
                )}
              </QuestionContainer.ButtonWrapper>
            </QuestionContainer>
          )}

        {(buttonLabel === t('common.record') ||
          recordState ||
          buttonLabel === t('common.create_new_video')) &&
          !error &&
          !mobileBtns &&
          !continueFlg &&
          !isPlaying && (
            <ShowHide
              onClick={() => showHideScript(!showHideFlg)}
              isShow={showHideFlg}
            >
              {t('common.instructions')}
            </ShowHide>
          )}
      </FlexBox>

      <FlexCenter className="mobileBtn">
        {recorded || buttonLabel === t('common.create_new_video')
          ? getFileUpload(['uploadBtn'])
          : recordLinkHandler()}
        {(buttonLabel === t('common.save&continue') || !error) && (
          <Button onClick={buttonClickHandler} className="button">
            {buttonLabel}
          </Button>
        )}
      </FlexCenter>

      {isMobile && props.hasRemove && (
        <LinkText className="remove-text" onClick={props.removeVideo}>
          {t('common.remove_welcom_vid')}
        </LinkText>
      )}

      {error && (
        <React.Fragment>
          <div className="no-support-web-btns">
            {getFileUpload(['uploadBtn err-web'])}
            <Button onClick={uploadVideoUnsupport} className="button">
              {t('common.create_new_video')}
            </Button>
          </div>
          {props.hasRemove && !isMobile && (
            <LinkText
              className="remove-text remove-text-error"
              onClick={props.removeVideo}
            >
              {t('common.remove_welcom_vid')}
            </LinkText>
          )}
        </React.Fragment>
      )}

      <input
        ref={videoRecordInput}
        type="file"
        accept="video/mp4,video/x-m4v,video/*;capture=camcorder"
        capture="user"
        className="videoInputCapture"
        onChange={uploadHandler(true)}
      />
    </Layout>
  );
};

Video.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  videoSrc: PropTypes.string,
  uploadVideo: PropTypes.func,
  videoFile: PropTypes.object,
  updateToast: PropTypes.func.isRequired,
  recordState: PropTypes.bool.isRequired,
  recordedTime: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  playPauseMediaFlg: PropTypes.bool.isRequired,
  recorded: PropTypes.bool,
  videoStatus: PropTypes.string,
  confirmSave: PropTypes.func.isRequired,
  removeVideo: PropTypes.func.isRequired,
};

Video.defaultProps = {
  videoSrc: '',
  recordedTime: '',
  videoStatus: '',
  uploadVideo: () => {},
  videoFile: {},
  src: {},
  recorded: false,
};

function mapStateToProps(state) {
  return {
    videoFile: state.commonReducer.file,
    recordedTime: state.commonReducer.recordedTime,
    videoSrc: state.commonReducer.videoSrc,
    recordState: state.commonReducer.shouldRecord,
    playPauseMediaFlg: state.commonReducer.playPauseMedia,
    recorded: state.commonReducer.recorded,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    recordTrigger: value => {
      dispatch(recordTrigger(value));
    },
    updateMediaStore: payload => {
      dispatch(updateMediaStore(payload));
    },
    playPauseMedia: value => {
      dispatch(playPauseMedia(value));
    },
  };
}
export default Video
