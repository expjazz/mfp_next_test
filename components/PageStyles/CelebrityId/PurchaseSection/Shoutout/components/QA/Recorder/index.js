import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation, Trans } from 'next-i18next';
import { Trans, useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import { DescriptionP, LinkText } from 'styles/TextStyled';
import { FlexCenter } from 'styles/CommonStyled';
// import QuestionBuilder from 'components/QuestionBuilder';
import Button from 'components/SecondaryButton';
import VideoRecorder from 'components/VideoRecorder';
import LangSelector from 'components/LangSelector';
import PromoDisplay from 'components/PromoDisplay';
import { isWebSafari, isIOSDevice } from 'src/utils/checkOS';
// import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { getLocalAmount } from 'utils/currencyUtils';
// import Login from 'components/Login&Signup';
import { recorder } from 'src/constants/videoRecorder';
import { questions, maxUploadSize } from './constants';
// import LoginHandler from '../../../../LoginHandler';
import { HeadingH2 } from '../../../../styled';
import {
  Container,
  Left,
  Right,
  VideoContainer,
  QuestionWap,
  ShowHide,
} from '../styled';
// import { StarContext } from '../../../../../StarContext';
import {
  SubTitle,
  RateBold,
  PromoWrap,
  CharityText,
} from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
// import { useAddToLiveCart } from 'customHooks/domUtils';
import { isEmpty } from 'src/utils/dataStructures';
import QuestionBuilder from 'components/QuestionBuilder';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import LoginHandler from 'components/LoginHandler';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';
function Recorder(props) {
  useDisableRefetchOnFocus()
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()

  const { t } = useTranslation();
  const { data: fanData } = useFetchLoggedUser()
  const [showHide, setShowHide] = useState(false);
  const [isStop, forceStop] = useState(false);
  const [error, setError] = useState(false);
  const [isRecorded, setIsRecorded] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const [recordingTime, setRecordingTime] = useState('02:00');
  const iosInput = useRef(null);
  const uploadInput = useRef(null);
  const isBookable = useGetCelebrityData()?.data?.isBookable && isCelebLocStorage()
  const { promoCode, updatePromoCode } = useContext(StarContext);

  const uploadHandler = recorded => input => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'Q&A Upload' });
    }
    const file = input.target.files[0];
    if (file.type.startsWith('video/')) {
      if (file.size / 1024 <= maxUploadSize) {
        if (props.shouldRecord) props.recordTrigger();
        if (props.playPauseMediaFlg) props.playPauseMedia();
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        const objectURL = window.URL.createObjectURL(file);
        const video = document.createElement('video');
        setCanPlay(!!video.canPlayType(file.type));
        video.remove();
        props.updateMediaStore({
          videoSrc: objectURL,
          superBuffer: file,
          recordedTime: null,
          recorded,
        });
        setError(false);
        setIsRecorded(recorded);
        setShowHide(false);
      } else {
        props.updateToast({
          value: true,
          message: t('common.file_size_50'),
          variant: 'error',
          global: true
        });
      }
    } else {
      props.updateToast({
        value: true,
        message: t('purchase_flow.recorder.upload_video'),
        variant: 'error',
        global: true
      });
    }
    iosInput.current.value = '';
    uploadInput.current.value = '';
  };
  const { data: celebrityData } = useGetCelebrityData()
  const addToCart = useAddToLiveCart(celebrityData, 'qa');
  const triggerRecord = () => {
    addToCart()
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'Q&A Record' });
    }
    try {

      setShowHide(false);
      setCanPlay(true);
      if (!props.shouldRecord) {
        if (isIOSDevice()) {
          if (iosInput && iosInput.current) iosInput.current.click();
        } else if (isWebSafari()) {
          setError(true);
        } else {
          if (!props.shouldRecord) props.recordTrigger();
          if (!props.playPauseMediaFlg) props.playPauseMedia();
          setIsRecorded(true);
        }
      }
    } catch (e) {
      // alert(e)
    }
  };

  const uploadClick = () => {
    // if (!props.recorded || !props.videoSrc || error) {
    if (uploadInput && uploadInput.current) uploadInput.current.click();
  };

  const recordClick = () => {
    setShowHide(false);
    if (isIOSDevice()) {
      if (iosInput && iosInput.current) iosInput.current.click();
    } else {
      triggerRecord();
    }
  };

  const stopRecordHandler = () => {
    forceStop(true);
    setIsRecording(false);
    if (props.shouldRecord) props.recordTrigger(false);
    if (props.playPauseMediaFlg) props.playPauseMedia(false);
  };

  const getRecordTime = recordTime => {
    setRecordingTime(recordTime);
  };

  const startStreaming = () => {
    setIsRecording(true);
  };

  const errorHandlerCallback = () => {
    setError(true);
  };

  const onShowHide = () => {
    setShowHide(!showHide);
  };

  const onContinue = () => {
    props.onContinue();
  };

  const getRetryBtn = () => {
    if (!props.recorded) {
      return (
        <Button
          className="retry"
          secondary
          onClick={uploadClick}
          disabled={isRecording}
          isDisabled={isRecording}
        >
          {t('common.upload_video')}
        </Button>
      );
    }
    return (
      <Button className="retry" secondary onClick={triggerRecord}>
        {t('purchase_flow.recorder.try_again')}
      </Button>
    );
  };

  const getError = () => {
    return (
      <React.Fragment>
        {isWebSafari() ? (
          <React.Fragment>
            <p className="note">
              <Trans i18nKey="purchase_flow.recorder.safari_support">
                Safari does not currently support browser video recording.
                <br />
                <br />
                Please use Chrome, Firefox, any browser using your phone or you
                can also upload your video.
              </Trans>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className="note">
              <Trans i18nKey="purchase_flow.recorder.video_support">
                Your system does not have video recording capability, but you
                will need to record a video to ask a question to the Star.{' '}
                <br />
                <br />
                You can:
                <br />
                <br /> Record with our App
                <br /> Use our iOS or Android app to book the star.
              </Trans>
            </p>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return (
    <Container disabled={!isBookable}>
      <Left>
        <HeadingH2>
          {t('purchase_flow.recorder.ask_something', { starNM: props.starNM })}
        </HeadingH2>
        <RateBold>
          {getLocalSymbol()}
          {numberToDecimalWithFractionTwo(
            getLocalAmount(props.discount),
            false,
            false,
          )}
        </RateBold>
        <DescriptionP className="desc-sub">
          {t('purchase_flow.recorder.description')}
          {!props.isLoggedIn && t('purchase_flow.recorder.start_account')}
        </DescriptionP>
        <SubTitle>{t('common.requestDet')}</SubTitle>
        <LangSelector
          language={props.lang}
          onSelectLang={props.onSelectLang}
          starName={props.starData.userData.shortName}
          starDefaultLang={props.starData.celbData.languages.find(lang => lang.default)}
          langList={props.starData.celbData.languages}
        />
        {(!isEmpty(props.starData.celbData.charity) &&
          props.starData.celbData.charity[0]) ||
        !props.hasDis ? (
          <PromoWrap>
            {!isEmpty(props.starData.celbData.charity) &&
            props.starData.celbData.charity[0] ? (
              <CharityText>
                {t('common.proceedGo', {
                  charity:
                    typeof props.starData.celbData.charity === 'string'
                      ? props.starData.celbData.charity
                      : props.starData.celbData.charity[0].charity,
                })}
              </CharityText>
            ) : null}
            {!props.hasDis && (
              <PromoDisplay
                rate={props.starData.celbData.rate}
                celebId={props.starData.userData.id}
                promoObj={promoCode}
                updatePromoCode={updatePromoCode}
              />
            )}
          </PromoWrap>
        ) : null}
      </Left>
      <Right>
        <LoginHandler
          signupClasses={{
            root: 'btn-wrp auth-wrap'
          }}
          onComplete={onContinue}
        >
          {(shouldProceed, onAction) => (
            <React.Fragment>
              <VideoContainer hasInsrtuctions={showHide}>
                <VideoRecorder
                  {...props}
                  updateMediaStore={props.updateMediaStore}
                  duration={recorder.askTimeOut}
                  stopRecordHandler={stopRecordHandler}
                  recordTrigger={props.recordTrigger}
                  errorHandler={errorHandlerCallback}
                  forceStop={isStop}
                  startStreamingCallback={startStreaming}
                  starNM={props.starNM}
                  uploadHandler={uploadHandler}
                  recorded={props.recorded}
                  getRecordTime={getRecordTime}
                  uploader
                  noButtons
                  playPauseMedia={props.redPlay}
                />

                <QuestionWap show={showHide}>
                  {showHide && !props.shouldRecord && (
                    <React.Fragment>
                      <h1 className="instruction-head-mob">
                        {t('purchase_flow.recorder.ask_question', {
                          starNM: props.starNM,
                        })}
                      </h1>
                      <QuestionBuilder
                        questionsList={questions(props.starNM, t)}
                      />
                    </React.Fragment>
                  )}
                </QuestionWap>
                {!props.shouldRecord &&
                  !error &&
                  (!props.playPauseMediaFlg || !props.videoSrc) && (
                    <ShowHide onClick={onShowHide} isShow={showHide}>
                      {t('purchase_flow.recorder.instructions')}
                    </ShowHide>
                  )}
                {error && getError()}
                {!canPlay && (
                  <span className="cant-play">
                    {t('purchase_flow.recorder.no_preview')}
                  </span>
                )}
              </VideoContainer>
              <FlexCenter className="btns-wrp">
                {!isRecording && !error && !props.videoSrc && (
                  <Button onClick={triggerRecord} className="rec-stop">
                    {t('purchase_flow.recorder.record')}
                  </Button>
                )}
                {isRecording && (
                  <Button onClick={stopRecordHandler} className="rec-stop">
                    {t('purchase_flow.recorder.stop')}
                  </Button>
                )}
                {props.videoSrc && !props.shouldRecord && (
                  <div className="vid-btns">
                    {getRetryBtn()}
                    <Button
                      isDisabled={!shouldProceed || !isBookable}
                      disabled={!shouldProceed || !isBookable}
                      onClick={onAction}
                      className="rec-stop"
                    >
                      {t('purchase_flow.recorder.continue')}
                    </Button>
                  </div>
                )}
                {isRecorded && (
                  <LinkText
                    className={`upload-link ${isRecording ? 'disabled' : ''}`}
                    onClick={!isRecording ? uploadClick : () => {}}
                  >
                    {t('purchase_flow.recorder.upload_video_text')}
                  </LinkText>
                )}
                {!isRecorded && (
                  <LinkText
                    className={`upload-link ${isRecording ? 'disabled' : ''}`}
                    onClick={!isRecording ? recordClick : () => {}}
                  >
                    {t('purchase_flow.recorder.record_video')}
                  </LinkText>
                )}
              </FlexCenter>
            </React.Fragment>
          )}
        </LoginHandler>
      </Right>
      <input
        ref={uploadInput}
        type="file"
        id="fileUpload"
        className="hidden"
        accept="video/*"
        onChange={uploadHandler(false)}
      />
      <input
        ref={iosInput}
        type="file"
        accept="video/*;capture=camcorder"
        capture="user"
        className="hidden"
        onChange={uploadHandler(true)}
      />
    </Container>
  );
}

Recorder.propTypes = {
  starNM: PropTypes.string.isRequired,
  videoSrc: PropTypes.string,
  updateToast: PropTypes.func.isRequired,
  updateMediaStore: PropTypes.func.isRequired,
  recordTrigger: PropTypes.func.isRequired,
  playPauseMedia: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  shouldRecord: PropTypes.bool.isRequired,
  playPauseMediaFlg: PropTypes.bool.isRequired,
  recorded: PropTypes.bool.isRequired,
  starData: PropTypes.object.isRequired,
  onSelectLang: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

Recorder.defaultProps = {
  videoSrc: '',
};

export default Recorder;
