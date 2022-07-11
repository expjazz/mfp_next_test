import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, withTranslation } from 'next-i18next';
// import { connect } from 'react-redux';
import { faMicrophone } from '@fortawesome/pro-solid-svg-icons';
// import { isIOSDevice } from 'src/utils/checkOS';
import { AudioRecorderDiv } from './styled';
// import { checkMediaRecorderSupport } from '../../utils/checkOS';
import { checkMediaRecorderSupport, isIOSDevice } from 'src/utils/checkOS';
import { audioRecordHandler, saveAudioRecording, useGeneral, withGeneral } from 'src/context/general';
import { ReactMic } from 'react-mic';
import useAudioRecordV2, { withAudioRecordV2 } from 'components/AudioRecordV2';
import { useRef } from 'react';
import { useEffect } from 'react';
// import { ReactMic } from 'react-mic';
// import { audioRecordHandler } from '../../store/shared/actions/commonActions';
const audioReducer = (state, action) => {
	switch (action.type) {
	case 'START':
		return { ...state, recording: true, playing: false };
	case 'STOP':
		return { ...state, recording: false, playing: false };
	case 'PLAY':
		return { ...state, recording: false, playing: true };
	case 'ALL':
		return action.payload;
	case 'KEY':
		return { ...state, ...action.payload };
	default:
		return state;
	}
};
const initialState = {
	play: false,
	start: false,
	stop: true,
	status: null,
	active: false,
};
const AudioRecordV2 = props => {
	const { t } = useTranslation();
	const user = props.target;
	const url = useRef(null);
	const audio = useRef(new Audio);
	const [localState, localDispatch] = useReducer(audioReducer, initialState);
	const setState = newState => {
		localDispatch({ type: 'KEY', payload: newState });
	};
	const [state, dispatch] = useGeneral();
	function saveRecording(file) {
		setState({ active: false });
		saveAudioRecording(dispatch, {key: user, audio: {
			recordedBlob: file,
			recordedUrl: window.URL.createObjectURL(file),
		}});
	}
	const { reset: resetRecordingHook, start: startRecordingHook, stop:
    stopRecordingHook, file, fileURL } = useAudioRecordV2({
		onFinish: file => saveRecording(file),
		audioComponent: 'audioRecordingProcesser' + user
	});

	function onAudioEnded() {
		setState({ play: false });
		audioRecordHandler(dispatch, { recording: false, playing: false });
	}
	useEffect(() => {
		audio.current.addEventListener('ended', onAudioEnded);
	}, [audio]);
	const stopRecording = () => {
		setState({ stop: true, start: false, status: 'completed' });
		audioRecordHandler(dispatch, { recording: false, playing: false });
		stopRecordingHook();
	};

	const startRecording = () => {
		if (!state.commonReducer.audioFlags.recording && !state.commonReducer.audioFlags.playing) {
			setState({ active: true, start: true, stop: false });
			audioRecordHandler(dispatch, { recording: true, playing: false });
			startRecordingHook();
		}
	};

	useEffect(() => {
		if (localState.active) {
			// setState({start: true, stop: false});
		}
	}, [localState.active]);

	function deleteRecording(target, hookDelete = false) {
		props.resetRecording(target);
		if (hookDelete) {
		  resetRecordingHook();
		}
	}

	function playRecording(target) {
		if (!state.commonReducer.audioFlags.recording && !state.commonReducer.audioFlags.playing) {
			url.current = props.audioRecorder.recorded[user].recordedUrl;
			audio.current.src = url.current;
			audio.current.play();
			setState({ play: true });
			audioRecordHandler(dispatch, { recording: false, playing: true });
		}
	}

	function pauseRecording() {
		audio.current.pause();
		setState({ play: false });
		audioRecordHandler(dispatch, { recording: false, playing: false });
	}

	const handleRecorder = () => {
		localState.start ? stopRecording() : startRecording();
	};

	function reRecording(target) {
		deleteRecording(target);
		startRecording();
	}

	const renderAudio = target => {
		let audioFile = props.audioRecorder.recorded;
		if (checkMediaRecorderSupport()) {
			return (
				<React.Fragment>
					{/* {localState.start && <Ripple onClick={handleRecorder} />} */}
					<AudioRecorderDiv.ControlWrapper
						className={localState.start && 'recording'}
						recording={
							state.commonReducer.audioFlags.playing || state.commonReducer.audioFlags.recording
						}
					>
						{(audioFile[target] && audioFile[target].recordedBlob) ||
            (audioFile[target] && audioFile[target].recordedUrl) ? (
								<React.Fragment>
									{!localState.play || audio.current.ended ? (
										<React.Fragment>
											<AudioRecorderDiv.PlayButton
												onClick={() => playRecording(user)}
												playing={
													state.commonReducer.audioFlags.playing ||
                        state.commonReducer.audioFlags.recording
												}
											>
												{t('common.playBack')}
											</AudioRecorderDiv.PlayButton>
                    |
										</React.Fragment>
									) : (
										<React.Fragment>
											<AudioRecorderDiv.PauseButton
												onClick={() => pauseRecording()}
											>
												{t('common.stop')}
											</AudioRecorderDiv.PauseButton>
                    |
										</React.Fragment>
									)}
									<AudioRecorderDiv.Rerecord
										onClick={() => reRecording(target)}
										recording={
											state.commonReducer.audioFlags.playing ||
                    state.commonReducer.audioFlags.recording
										}
									>
										{t('common.record')}
									</AudioRecorderDiv.Rerecord>{' '}
                |
									<AudioRecorderDiv.CloseButton
										onClick={() => deleteRecording(target, true)}
									>
										{t('common.delete')}
									</AudioRecorderDiv.CloseButton>
								</React.Fragment>
							) : (
								<React.Fragment>
									{localState.start ? (
										<span
											className="voice-progress"
											onClick={handleRecorder}
											role="presentation"
										></span>
									) : (
										<div
											onClick={handleRecorder}
											type="button"
											role="presentation"
										>
											<AudioRecorderDiv.Icon
												icon={faMicrophone}
												className="mic-icon"
												recording={
													state.commonReducer.audioFlags.playing ||
                        state.commonReducer.audioFlags.recording
												}
											/>
										</div>
									)}
								</React.Fragment>
							)}

						{!localState.start &&
              !(audioFile[target] && audioFile[target].recordedUrl) && (
							<span
								className="recText"
								onClick={handleRecorder}
								role="presentation"
							>
								{t('common.pronounce_name')}
							</span>
						)}
						{localState.start && (
							<AudioRecorderDiv.PauseButton
								onClick={() => handleRecorder()}
							>
								{t('common.stopRecording')}
							</AudioRecorderDiv.PauseButton>
						)}
					</AudioRecorderDiv.ControlWrapper>
				</React.Fragment>
			);
		}
	};
	const target = user;

	return (
		<AudioRecorderDiv
			className="pronounce-wrap"
			recorded={
				props.audioRecorder.recorded[target] &&
          props.audioRecorder.recorded[target].recordedUrl
			}
		>
			<>
				{renderAudio(target)}
			</>
		</AudioRecorderDiv>
	);
};

export default AudioRecordV2;