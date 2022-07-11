import { i18n } from 'next-i18next';
import { useState, useEffect, useRef } from 'react';
// import i18n from 'i18next';


export const useRecord = ({ record, maxTime = 300000 }) => {
	const [recordState, updateRecordState] = useState(record);
	const [remTime, updateRemTime] = useState(record);
	const [recTime, updateRecTime] = useState(record);
	const [recordBlobs, updateRecordBlobs] = useState(null);
	const [mediaBlob, updateMediaBlob] = useState(null);
	const [timeString, updateTimeString] = useState('');
	const recordingDate = useRef(null);
	const error = useRef('');
	const recordedBlobs = useRef([]);
	const streamObj = useRef(null);
	const mediaRecorder = useRef(null);
	const timerID = useRef(null);

	const calculateTime = () => {
		let remainingTime = remTime;
		let recordedTime = recTime;
		const finalTime = recordingDate.current.getTime() + maxTime;
		const recordingTime = recordingDate.current.getTime();
		const currentTime = new Date().getTime();
		const remainingSeconds = parseInt((finalTime - currentTime) / 1000, 0) % 60;
		const remainingMinutes =
      parseInt((finalTime - currentTime) / (1000 * 60), 0) % 60;
		const recordedSeconds =
      parseInt((currentTime - recordingTime) / 1000, 0) % 60;
		const recordedMinutes =
      parseInt((currentTime - recordingTime) / (1000 * 60), 0) % 60;
		remainingTime = {
			...remainingTime,
			minutes: remainingMinutes,
			seconds: remainingSeconds,
		};
		recordedTime = {
			...recordedTime,
			minutes: recordedMinutes,
			seconds: recordedSeconds,
		};
		updateRemTime(remainingTime);
		updateRecTime(recordedTime);
		const recordedTimeString = `${
			recordingTime.minutes > 9
				? recordingTime.minutes
				: `0${recordingTime.minutes}`
		} : ${
			recordingTime.seconds > 9
				? recordingTime.seconds
				: `0${recordingTime.seconds}`
		}`;
		updateTimeString(recordedTimeString);
	};

	const handleDataAvailable = event => {
		if (event.data && event.data.size > 0) {
			recordedBlobs.current.push(event.data);
			calculateTime();
		}
	};

	const closeRecord = () => {
		if (recordedBlobs.current.length > 0) {
			const tracks = streamObj.current.getTracks();
			if (tracks) {
				tracks.forEach(track => {
					track.stop();
				});
			}
		}
		if (timerID.current != null) {
			clearTimeout(timerID.current);
		}
		if (recordedBlobs.current.length) {
			const superBuffer = new Blob(recordedBlobs.current, {
				type: 'audio/webm',
			});
			updateRecordBlobs(superBuffer);
			updateMediaBlob(window.URL.createObjectURL(superBuffer));
			const recordedTimeString = `${
				recTime.minutes > 9 ? recTime.minutes : `0${recTime.minutes}`
			} : ${recTime.seconds > 9 ? recTime.seconds : `0${recTime.seconds}`}`;
			updateTimeString(recordedTimeString);
		}
	};

	useEffect(() => {
		updateRecordState(record);
		updateRecTime('');
	}, [record]);

	useEffect(() => {
		if (recordState) {
			recordedBlobs.current = [];
			let mimeType = 'audio/webm;codec=opus';
			if (
				MediaRecorder &&
        MediaRecorder.isTypeSupported('audio/webm;codec=pcm')
			) {
				mimeType = 'audio/webm;codec=pcm';
			}
			const options = {
				bitsPerSecond: 128000,
				mimeType,
			};
			navigator.mediaDevices
				.getUserMedia({
					audio: true,
				})
				.then(stream => {
					streamObj.current = stream;
					try {
						recordingDate.current = new Date();
						mediaRecorder.current = new MediaRecorder(stream, options);
						mediaRecorder.current.start(1000);
						mediaRecorder.current.ondataavailable = handleDataAvailable;
						mediaRecorder.current.onstop = closeRecord;
						timerID.current = setTimeout(() => {
							if (
								mediaRecorder.current &&
                mediaRecorder.current.state !== 'inactive'
							) {
								mediaRecorder.current.stop();
							}
						}, maxTime + 1000);
					} catch (e) {
						error.current = true;
						updateRecordState(false);
					}
				})
				.catch(() => {
					error.current = true;
					updateRecordState(false);
				});
		} else {
			closeRecord();
		}
	}, [recordState]);
	return {
		mediaBlob,
		error,
		recordBlobs,
		recTime,
	};
};

export const getRecordText = (recording, hasRecord) => {
	if (recording) {
		return i18n.t('common.stopRecording');
	} else if (!recording && !hasRecord) {
		return i18n.t('rec_aud_file');
	}
	return i18n.t('re_record');
};

export const getUploadText = (hasRecord, filePlaying) => {
	if (filePlaying) {
		return i18n.t('common.stop');
	} else if (!filePlaying && hasRecord) {
		return i18n.t('common.play');
	}
	return i18n.t('upload_aud_file');
};
