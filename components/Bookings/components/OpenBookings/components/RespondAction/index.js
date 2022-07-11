/* eslint-disable camelcase */
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
// import { isEmpty } from 'src/utils/dataStructures';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import RequestHeader from 'components/RequestHeader';
import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/SecondaryButton';
import VideoRecorder from 'components/VideoRecorder';
import ToolTip from 'components/ToolTip';
import { awsKeys } from 'src/constants/';
import { audioVideoSupport, isWebSafari, isIOSDevice, checkMediaRecorderSupport } from 'src/utils/checkOS';
import { recorder } from 'src/constants/videoRecorder';
import { faPlay } from '@fortawesome/pro-solid-svg-icons';
import VideoRender from 'components/VideoRender';
import { useMedia } from 'customHooks/domUtils';
import { getFor, getFrom, checkFromName } from 'src/utils/dataformatter';
import { getTabsList, getSelectedTab } from '../../utils';
import ClarificationsWrap from './components/ClarificationsWrap';
import PurchaseDetails from './components/PurchaseDetails';
import SuccessView from './components/SuccessView';
import { uploadTitles } from './constants';
import { LinkButton } from '../../styled';
import {
  Layout,
  VideoContainer,
  QuestionContainer,
  ShowHide,
  WebButtons,
  MobButtons,
  Speaker,
} from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGeneral } from 'src/context/general';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const Question = props => {
  useDisableRefetchOnFocus()
  const [state, dispatch] = useGeneral()
  const { data: entityData } = useGetPartner()
  const dateFormat = entityData?.partnerData?.base_date_format
  const { commonReducer } = state
  const {videoSrc,
  recorded,
  shouldRecord} = commonReducer
  const videoFile = commonReducer.file
  const playPauseMediaFlg = commonReducer.playPauseMedia
  const { t } = useTranslation();
  const isDesktop = useMedia('(min-width: 1280px)');
  const isMobile = useMedia('(max-width: 831px)');
  const questions = [
    {
      key: 'que1',
      question: t('open_bookings.shoutout.introduce_yourself'),
      className: 'bold-text',
    },
    {
      key: 'que2',
      question: `${t(
        'open_bookings.shoutout.paraphrase',
      )} <span class="bold-text">${t(
        'open_bookings.shoutout.question',
      )}<span> ${t('open_bookings.shoutout.optional')} `,
      className: '',
    },
    {
      key: 'que3',
      question: `<span class="bold-text">${t(
        'open_bookings.shoutout.ans_question',
      )}</br></span> ${t('open_bookings.shoutout.advice', {
        purchaser: entityData?.partnerData?.purchaser_singular_name,
      })}`,
      className: '',
    },
  ];
  const videoRecordInput = useRef(null);
  const audio = useRef(new Audio);
  const [stateObject, updatedStateHandler] = useState({
    showHideFlg: true,
    buttonLabel: videoSrc
      ? props.buttonLabel.primary.continue
      : props.buttonLabel.primary.record,
    error: false,
    isStop: false,
    continueFlg: !!videoSrc,
    qusList: [],
    isUpload: false,
  });
  const [playing, setPlaying] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const isCompMounted = useRef(null);
  const [isQuestion, updateIsQuestion] = useState(true);
  const [noSupport, updateSupport] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const mediaHandler = (btnLabel, isStop, continueFlg) => {
    updatedStateHandler({
      ...stateObject,
      buttonLabel: btnLabel,
      showHideFlg: false,
      error: false,
      isStop,
      continueFlg,
      isUpload: false,
    });
  };

  const startStreaming = () => {
    updatedStateHandler({
      ...stateObject,
      buttonLabel: props.buttonLabel.primary.stop,
    });
  };

  const uploadSuccess = () => {
    props.updateBookingList(props.bookedItem.booking_id);
    if (!isCompMounted.current) {
      props.removeBooking(props.bookedItem.booking_id);
    } else {
      setCompleted(true);
      props.loaderAction(false);
    }
  };

  const uploadVideoRecorded = () => {
    let uploadVideo = null;
    if (videoFile?.name && typeof videoFile?.name === 'string') {
      uploadVideo = videoFile;
    } else {
      uploadVideo = new File([videoFile], 'askVideo.mp4');
    }
    const uploadDet = {
      id: props.bookedItem.booking_id,
      onSuccess: processedFiles => {
        window.scrollTo(0, 0);
        const requestFile = processedFiles[0].fileName;
        if (isCompMounted.current) {
          props.loaderAction(true);
        }
        props.responseVideo(props.requestId, requestFile, uploadSuccess);
      },
      files: [
        {
          title: uploadTitles(props.bookedItem.fan_first_name, t)[
            props.bookedItem.request_type
          ],
          key: awsKeys.shoutouts,
          fileName: videoFile?.name || '',
          file: uploadVideo,
          extension: 'mp4',
          type: 'video',
          bookingId: props.bookedItem.booking_id,
        },
      ],
    };
    props.onAddResumeUpload(uploadDet, props.bookedItem.booking_id);
  };

  const buttonClickHandler = () => {
    setCanPlay(true);
    if (stateObject.buttonLabel === props.buttonLabel.primary.record) {
      if (!shouldRecord) {
        if (props.bookedItem.request_type === 3) {
          updateIsQuestion(false);
        }
        if (checkMediaRecorderSupport()) {
          mediaHandler(props.buttonLabel.primary.record, false, false);
          if (!shouldRecord) props.recordTrigger();
          if (!playPauseMediaFlg) props.playPauseMedia();
        } else if (isIOSDevice()) {
          videoRecordInput.current.click();
        } else if (isWebSafari()) {
          updatedStateHandler({
            ...stateObject,
            error: true,
          });
        }
      }
    } else if (stateObject.buttonLabel === props.buttonLabel.primary.stop) {
      mediaHandler(props.buttonLabel.primary.continue, true, true);
      if (shouldRecord) props.recordTrigger();
      if (playPauseMediaFlg) props.playPauseMedia();
    } else if (stateObject.buttonLabel === props.buttonLabel.primary.continue) {
      uploadVideoRecorded();
    }
  };

  const uploadContinue = () => {
    uploadVideoRecorded();
  };

  const stopRecordHandler = () => {
    mediaHandler(props.buttonLabel.primary.continue, true, true);
    if (shouldRecord) props.recordTrigger();
    if (playPauseMediaFlg) props.playPauseMedia();
  };

  const retryRecordHandler = () => {
    updatedStateHandler({
      ...stateObject,
      showHideFlg: false,
      isUpload: false,
    });
    if (!checkMediaRecorderSupport() && isIOSDevice()) {
      videoRecordInput.current.click();
    }
    if (props.bookedItem.request_type === 3) {
      updateIsQuestion(false);
    }
  };

  const errorHandlerCallback = () => {
    updatedStateHandler({
      ...stateObject,
      error: true,
    });
  };

  const uploadHandler = isIOS => input => {
    const file = input.target.files[0];
    if (file.type.startsWith('video/')) {
      if (shouldRecord) props.recordTrigger();
      if (playPauseMediaFlg) props.playPauseMedia();
      if (props.bookedItem.request_type === 3) {
        updateIsQuestion(false);
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      // const blob = new Blob([file], { type: 'video/webm' });
      const objectURL = window.URL.createObjectURL(file);
      const video = document.createElement('video');
      setCanPlay(!!video.canPlayType(file.type));
      video.remove();
      props.updateMediaStore({
        videoSrc: objectURL,
        superBuffer: file,
        recordedTime: null,
        recorded: Boolean(isIOS),
      });
      updatedStateHandler({
        ...stateObject,
        buttonLabel: props.buttonLabel.primary.continue,
        showHideFlg: false,
        continueFlg: true,
      });
    } else {
      props.updateToast({
        value: true,
        message: t('open_bookings.shoutout.upload_video_error'),
        variant: 'error',
      });
    }
  };

  const getFileUpload = className => {
    return (
      <label
        id="upload"
        htmlFor="fileUpload"
        className={`${[className].join(' ')} ${shouldRecord &&
          !stateObject.error &&
          'disabled-btn'}`}
      >
        <Button className="button" secondary>
          {props.buttonLabel.upload.label}
        </Button>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={uploadHandler()}
        />
      </label>
    );
  };

  const recordMedia = () => {
    if (checkMediaRecorderSupport()) {
      props.updateMediaStore({
        videoSrc: null,
        superBuffer: null,
        recordedTime: '',
        recorded: false,
      });
      mediaHandler(props.buttonLabel.primary.record, false, true);
      if (!shouldRecord) props.recordTrigger();
      if (!playPauseMediaFlg) props.playPauseMedia();
    } else if (isIOSDevice()) {
      videoRecordInput.current.click();
    }
  };

  const getQuestionList = () => {
    if (props.bookedItem.request_type === 3) {
      return questions;
    }
    return stateObject.qusList;
  };

  const declineBooking = () => {
    props.toggleUpdateBooking(
      true,
      props.bookedItem.booking_id,
      true,
      props.bookedItem,
    );
  };

  const playAudio = audioFile => () => {
    if (playing && audio.current.src === audioFile) {
      setPlaying(false);
      audio.current.pause();
    } else {
      audio.current.src = audioFile;
      audio.current.play();
      setPlaying(true);
    }
  };

  const onAudioEnded = () => {
    setPlaying(false);
  };

  const getRecordLink = className => {
    return (
      <span
        onClick={recordMedia}
        role="presentation"
        className={`uploadLink ${className}`}
      >
        {t('common.recordVideo')}
      </span>
    );
  };

  const recordLinkHandler = className => {
    if (noSupport) {
      if (isIOSDevice()) {
        return getRecordLink(className);
      }
      return null;
    } else if (!stateObject.error) {
      return getRecordLink(className);
    }
    return null;
  };

  const getLinkButtons = className => {
    if (!recorded && !shouldRecord) {
      return recordLinkHandler(className);
    }
    return getFileUpload([`uploadLink ${className}`]);
  };

  const closeSuccess = () => {
    props.nextRequestHandler(props.requestId, isDesktop);
    updatedStateHandler({
      ...stateObject,
      continueFlg: false,
    });
  };

  const nextRequest = () => {
    props.nextRequestHandler(props.requestId, true);
    updatedStateHandler({
      ...stateObject,
      error: false,
      continueFlg: false,
    });
  };

  const getRelation = () => {
    if (
      props.bookedItem.request_details.relationship &&
      typeof props.bookedItem.request_details.relationship === 'object'
    ) {
      return `${props.bookedItem.request_details.relationship.title}`;
    } else if (props.bookedItem.request_details.relationship) {
      return `${props.bookedItem.request_details.relationship}`;
    }
  };

  const getScript = () => {
    const date = props.bookedItem.request_details.date ? props.bookedItem.request_details.date.split('T')[0] : null;
    return `<span class="script-details">
        <span>
        ${t('common.occasion')}
          ${
            !isEmpty(props.bookedItem.occasion) ? props.bookedItem.occasion : ''
          }
        </span>
        ${date ?
          `<span>
          ${t('common.date')} ${moment(date).format(
            dateFormat,
          )}
          </span>` : ''}
        ${
          getFor(props.bookedItem)
            ? `<span>${t('common.for')} ${getFor(props.bookedItem)}</span>`
            : ''
        }
        ${
          checkFromName(props.bookedItem)
            ? `<span>
          ${t('common.from')} ${checkFromName(props.bookedItem)}
            ${getRelation() && `<span> (${getRelation()})</span>`}
          </span>`
            : ''
        }
        ${
          props.bookedItem.request_details.for_what
            ? `<span>
          ${t('common.for_what')}: ${props.bookedItem.request_details.for_what}
          </span>`
            : ''
        }
        ${
          props.bookedItem.request_details.event_title
            ? `<span>
          ${t('common.event')}: ${props.bookedItem.request_details.event_title}
          </span>`
            : ''
        }
      </span>`;
  };

  const questionsClick = () => {
    if (shouldRecord) {
      props.updateMediaStore({
        videoSrc: null,
        superBuffer: null,
        recordedTime: null,
        recorded: false,
      });
      updatedStateHandler({
        ...stateObject,
        buttonLabel: props.buttonLabel.primary.record,
        isUpload: false,
      });
    }
    updateIsQuestion(true);
  };

  const showHideCheck = () => {
    if (props.bookedItem.request_type === 3 && isQuestion) {
      return false;
    }
    if (
      stateObject.buttonLabel === props.buttonLabel.primary.record ||
      shouldRecord
    ) {
      return true;
    } else if (props.bookedItem.request_type !== 3 && !videoSrc) {
      return true;
    } else if (
      stateObject.error &&
      props.bookedItem.request_type === 3 &&
      isQuestion
    ) {
      return true;
    } else if (props.bookedItem.request_type === 3 && isQuestion) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    updatedStateHandler({
      ...stateObject,
      buttonLabel: props.buttonLabel.primary.record,
    });
  }, [props.buttonLabel.primary.record]);

  useEffect(() => {
    updateIsQuestion(true);
    setCanPlay(true);
    updatedStateHandler({
      ...stateObject,
      buttonLabel: props.buttonLabel.primary.record,
      isStop: false,
      isUpload: false,
      error: false,
      continueFlg: false,
      qusList: [],
      showHideFlg: true,
    });
    props.playPauseMedia(true);
  }, [props.requestId]);

  const setInitialStateHandler = qusList => {
    updatedStateHandler({
      ...stateObject,
      buttonLabel: videoSrc
        ? props.buttonLabel.primary.continue
        : props.buttonLabel.primary.record,
      qusList: [...[questions[0]], ...qusList],
      isStop: false,
      isUpload: false,
      showHideFlg: true,
      continueFlg: false,
    });
  };

  useEffect(() => {
    if (
      props.bookedItem.request_type !== 3 &&
      props.bookedItem.request_details
    ) {
      const qusList = [
        {
          key: 'que2',
          question:
            props.bookedItem.request_details.templateType !== 'other'
              ? getScript().toString()
              : props.bookedItem.request_details.booking_statement,
          className: '',
        },
        {
          key: 'que3',
          question: props.bookedItem.request_details.important_info,
          className: '',
        },
      ];
      setInitialStateHandler(qusList);
    } else if (!isEmpty(props.bookedItem.commercial_details)) {
      const qusList = [
        {
          key: 'que2',
          question: props.bookedItem.commercial_details.fan_request,
          className: '',
        },
      ];
      setInitialStateHandler(qusList);
    }
    setPlaying(false);
  }, [props.bookedItem.booking_id, JSON.stringify(props.buttonLabel)]);

  const checkDeviceSupport = async () => {
    const deviceSupport = await audioVideoSupport('videoinput');
    if (!deviceSupport) {
      updateSupport(true);
    }
  };

  const clearStates = () => {
    props.recordTrigger(false);
    props.updateMediaStore({
      videoSrc: '',
      superBuffer: '',
      recordedTime: null,
      recorded: false,
    });
    props.playPauseMedia(false);
  };

  useEffect(() => {
    isCompMounted.current = true;
    return () => {
      isCompMounted.current = false;
      clearStates();
    };
  }, []);

  useEffect(() => {
    checkDeviceSupport();
    if (audio.current) {
      audio.current.addEventListener('ended', onAudioEnded);
    }
    setMounted(true);
    return () => {
      if (audio.current) {
        audio.current.removeEventListener('ended', onAudioEnded);
      }
    }
  }, []);

  const getButton = (secondary, className, clickHandler, btnLabel) => {
    if ((noSupport || stateObject.error) && btnLabel === t('common.recordVideo')) {
      return null;
    }
    return (
      <Button
        onClick={clickHandler}
        className={` button ${className}`}
        secondary={secondary}
      >
        {btnLabel}
      </Button>
    );
  };

  const getHeader = () => {
    const getToolTip = audioFile => {
      if (!isEmpty(audioFile))
        return (
          <ToolTip title={t('open_bookings.shoutout.pronounce_title')}>
            <Speaker icon={faPlay} onClick={playAudio(audioFile)} />
          </ToolTip>
        );
      return null;
    };
    const getFromText = (stargramfrom, audioFile) => {
      if (!isEmpty(stargramfrom))
        return (
          <React.Fragment>
            {' '}
            <span className="bold-head-name">{stargramfrom}</span>
            {getToolTip(audioFile)}
          </React.Fragment>
        );
      return '';
    };

    const getForText = (stargramto, to_audio_file) => {
      if (!isEmpty(stargramto)) {
        return (
          <React.Fragment>
            {' '}
            {t('open_bookings.for_lower')}{' '}
            <span className="bold-head-name">{stargramto}</span>
            {getToolTip(to_audio_file)}
          </React.Fragment>
        );
      }
      return '';
    };

    const getHeaderText = occasion => {
      let { to_audio_file, from_audio_file } = props.bookedItem;
      const { honor_audio_file, host_audio_file } = props.bookedItem;
      const { templateType } = props.bookedItem.request_details;
      if (templateType === 7 || templateType === 6) {
        from_audio_file = host_audio_file;
        to_audio_file = honor_audio_file;
      }
      return (
        <React.Fragment>
          {t('open_bookings.shoutout.recorda')}{' '}
          {props.bookedItem.occasion_id !== 18 &&
            props.bookedItem.occasion_id !== 24 && (
              <span className="bold-head-name">
                {props.bookedItem.occasion}
              </span>
            )}{' '}
          {occasion}
          {getForText(getFor(props.bookedItem), to_audio_file)}
          {props.bookedItem.occasion_id !== 18 &&
            props.bookedItem.occasion_id !== 24 &&
            getFromText(getFrom(props.bookedItem, t), from_audio_file)}
        </React.Fragment>
      );
    };

    if (props.bookedItem.request_type === 1) {
      return getHeaderText('shoutout');
    } else if (props.bookedItem.request_type === 2) {
      return getHeaderText('announcement');
    } else if (props.bookedItem.request_type === 4) {
      return (
        <React.Fragment>
          {t('open_bookings.shoutout.recorda')}{' '}
          <span className="bold-head-name">
            {t('open_bookings.shoutout.comercial')}
          </span>{' '}
          {t('open_bookings.shoutout.request_from')}{' '}
          <span className="bold-head-name">
            {props.bookedItem.fan_first_name}
          </span>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {t('open_bookings.shoutout.answer_for')}{' '}
        <span className="bold-head-name">
          {props.bookedItem.fan_first_name}
        </span>
      </React.Fragment>
    );
  };

  const renderError = () => {
    console.log(stateObject?.error, 'error in safari video')
    console.log(isIOSDevice(), 'ios safari device: ')
    return (
      !isIOSDevice() &&
      stateObject.error &&
      !videoSrc &&
      (!isQuestion || props.bookedItem.request_type !== 3) && (
        <QuestionContainer
          isShow
          error
          className="error-msg"
          isQA={props.bookedItem.request_type === 3}
        >
          {isWebSafari() ? (
            <React.Fragment>
              <p className="note">
                {t('open_bookings.shoutout.safari_error')}
                <br />
                <br />
                {t('open_bookings.shoutout.safari_error_advice')}
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="note">
                {t('open_bookings.shoutout.device_error')} <br />
                <br />
                {t('open_bookings.shoutout.device_error_advice')}
              </p>
            </React.Fragment>
          )}

          {videoSrc && isWebSafari() ? (
            getButton(
              false,
              'safari-upload',
              uploadContinue,
              t('open_bookings.continue'),
            )
          ) : (
            <React.Fragment>
              {!isMobile && (
                <React.Fragment>
                  {getFileUpload(['uploadBtn noSupportBtn'])}
                  <LinkButton className="decline-btn" onClick={declineBooking}>
                    {t('open_bookings.declineRequest')}
                  </LinkButton>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          {!isWebSafari() &&
            !stateObject.error &&
            getFileUpload(['uploadBtn noSupportBtn'])}
        </QuestionContainer>
      )
    );
  };

  const renderView = tab => {
    switch (tab) {
      case 'details':
        return <PurchaseDetails bookDetails={props.bookedItem} />;
      case 'clarify':
        return (
          <section className="clarify-wrap">
            <ClarificationsWrap bookItem={props.bookedItem}  {...props} />
          </section>
        );
      default:
        return (
          <React.Fragment>
            <React.Fragment>
              <section className="video-wrapper">
                {props.bookedItem.practice_booking && (
                  <span className="sample-header">
                    {t('open_bookings.shoutout.unpaid')}
                  </span>
                )}
                {props.bookedItem.request_type === 3 && (
                  <ul className="video-option">
                    <li
                      className={isQuestion ? 'ques-item' : ''}
                      onClick={questionsClick}
                      role="presentation"
                    >
                      {t('open_bookings.shoutout.question_cap')}
                    </li>
                    <li
                      className={!isQuestion ? 'ans-item' : ''}
                      onClick={() => updateIsQuestion(false)}
                      role="presentation"
                    >
                      {t('open_bookings.shoutout.answer')}
                    </li>
                  </ul>
                )}
                <VideoContainer isQA={props.bookedItem.request_type === 3}>
                  {props.bookedItem.request_type === 3 && isQuestion ? (
                    <VideoRender
                      variableWidth
                      variableHeight
                      videoSrc={props.bookedItem.request_video[0].s3_video_url}
                      coverImage={
                        props.bookedItem.request_video[0].s3_thumbnail_url
                      }
                      classes={{ container: 'player-container' }}
                    ></VideoRender>
                  ) : (
                    isMounted && (
                      <VideoRecorder
                        {...state.commonReducer}
                        {...props}

                        videoSrc={videoSrc}
                        shouldRecord={shouldRecord}
                        playPauseMediaFlg={commonReducer.playPauseMedia}
                        playPauseMedia={commonReducer.playPauseMedia}
                        updateMediaStore={props.updateMediaStore}
                        duration={recorder.askTimeOut}
                        stopRecordHandler={stopRecordHandler}
                        playPauseMediaAction={props.playPauseMedia}
                        retryRecordHandler={retryRecordHandler}
                        recordTrigger={props.recordTrigger}
                        errorHandler={errorHandlerCallback}
                        forceStop={stateObject.isStop}
                        startStreamingCallback={startStreaming}
                        uploadHandler={uploadHandler}
                        recorded={recorded}
                        videoFile={commonReducer.file}
                        uploader
                      />
                    )
                  )}
                  {!canPlay &&
                    (!isQuestion || props.bookedItem.request_type !== 3) && (
                      <span className="cant-play">
                        {t('common.preview_not_available')}
                      </span>
                    )}
                </VideoContainer>
              </section>
              {(!isQuestion ||
                props.bookedItem.request_type !== 3 ||
                !isMobile) &&
                (props.bookedItem.request_type !== 3 ||
                  (props.bookedItem.request_type === 3 && isQuestion) ||
                  !stateObject.error ||
                  videoSrc) && (
                  <QuestionContainer
                    isShow={stateObject.showHideFlg}
                    errorWeb={
                      (stateObject.error && !isQuestion && !videoSrc) ||
                      (stateObject.error &&
                        props.bookedItem.request_type !== 3 &&
                        !videoSrc)
                    }
                    isQA={props.bookedItem.request_type === 3}
                  >
                    <React.Fragment>
                      <div className="question-wrapper">
                        <h1 className="quesHead">
                          {t('open_bookings.shoutout.qus_head')}
                        </h1>
                        <Scrollbars
                          className="qa-scroll"
                          renderView={prop => (
                            <div {...prop} className="scroll-render" />
                          )}
                        >
                          <QuestionBuilder questionsList={getQuestionList()} />
                          {props.bookedItem.request_type === 3 && (
                            <p className="agreement-note">
                              {t('open_bookings.shoutout.agreement_note', {
                                purchaser: entityData?.partnerData?.purchaser_singular_name,
                              })}
                            </p>
                          )}
                        </Scrollbars>
                      </div>
                      <WebButtons>
                        {(!stateObject.error || videoSrc) &&
                          getButton(
                            false,
                            '',
                            buttonClickHandler,
                            stateObject.buttonLabel,
                          )}
                        {!stateObject.continueFlg
                          ? getFileUpload(['uploadBtn mobDisplay web-link'])
                          : getLinkButtons('uploadBtn web-link')}
                        {stateObject.continueFlg && getLinkButtons('')}
                        <LinkButton
                          className="decline-btn"
                          onClick={declineBooking}
                        >
                          {t('open_bookings.declineRequest')}
                        </LinkButton>
                      </WebButtons>
                    </React.Fragment>
                  </QuestionContainer>
                )}
              <MobButtons
                isQA={props.bookedItem.request_type === 3}
                // isContinueRecord={stateObject.continueFlg && !recorded}
                isError={
                  !isIOSDevice() &&
                  stateObject.error &&
                  !videoSrc &&
                  (!isQuestion || props.bookedItem.request_type !== 3)
                }
                className={
                  videoSrc && stateObject.error ? 'continue-mob' : ''
                }
              >
                {isMobile && renderError()}
                {!stateObject.continueFlg ||
                recorded ||
                shouldRecord
                  ? getFileUpload(['uploadBtn web-link'])
                  : getButton(
                      true,
                      'uploadBtn',
                      recordMedia,
                      t('open_bookings.record_video'),
                    )}
                {!(
                  !isIOSDevice() &&
                  stateObject.error &&
                  !videoSrc &&
                  (!isQuestion || props.bookedItem.request_type !== 3)
                ) &&
                  getButton(
                    false,
                    '',
                    buttonClickHandler,
                    stateObject.buttonLabel,
                  )}
                <LinkButton className="decline-btn" onClick={declineBooking}>
                  {t('open_bookings.declineRequest')}
                </LinkButton>
              </MobButtons>
              {showHideCheck() && (
                <ShowHide
                  onClick={() =>
                    updatedStateHandler({
                      ...stateObject,
                      showHideFlg: !stateObject.showHideFlg,
                    })
                  }
                  isShow={stateObject.showHideFlg}
                  isQA={props.bookedItem.request_type === 3}
                >
                  {stateObject.showHideFlg
                    ? t('common.hide_script')
                    : t('common.show_script')}
                </ShowHide>
              )}
            </React.Fragment>
            {!isMobile && renderError()}
            <input
              ref={videoRecordInput}
              type="file"
              accept="video/mp4,video/x-m4v,video/*;capture=camcorder"
              capture="user"
              className="videoInputCapture"
              onChange={uploadHandler(true)}
            />
          </React.Fragment>
        );
    }
  };

  if (completed) {
    return (
      <SuccessView
        closeHandler={closeSuccess}
        nextRequest={nextRequest}
        templateDet={props.templateDet}
        bookItem={props.bookedItem}
      />
    );
  }

  return (
    <React.Fragment>
      <RequestHeader
        key={props.bookedItem.booking_id}
        renderHeading={getHeader}
        fixedTitle={props.showLang(props.bookedItem.language)}
        onClose={props.closeHandler}
        tabsList={getTabsList(props.bookedItem, undefined, entityData?.partnerData)}
        selected={getSelectedTab(props.bookedItem, entityData?.partnerData)}
      >
        {selectedTab => (
          <Layout varHeight={selectedTab === 'clarify'}>
            {renderView(selectedTab)}
          </Layout>
        )}
      </RequestHeader>
    </React.Fragment>
  );
};

Question.propTypes = {
  updateMediaStore: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  videoSrc: PropTypes.string,
  updateToast: PropTypes.func.isRequired,
  recorded: PropTypes.bool,
  playPauseMediaFlg: PropTypes.bool,
  shouldRecord: PropTypes.bool.isRequired,
  bookedItem: PropTypes.object.isRequired,
  buttonLabel: PropTypes.object.isRequired,
  closeHandler: PropTypes.func.isRequired,
  responseVideo: PropTypes.func.isRequired,
  requestId: PropTypes.string,
  videoFile: PropTypes.object,
  nextRequestHandler: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  updateBookingList: PropTypes.func.isRequired,
};

Question.defaultProps = {
  videoSrc: '',
  recorded: false,
  playPauseMediaFlg: false,
  requestId: '',
  videoFile: {},
};

// function mapStateToProps(state) {
//   return {
//     videoSrc: state.commonReducer.videoSrc,
//     recorded: state.commonReducer.recorded,
//     playPauseMediaFlg: state.commonReducer.playPauseMedia,
//     shouldRecord: state.commonReducer.shouldRecord,
//     videoFile: state.commonReducer.file,
//   };
// }

export default Question
