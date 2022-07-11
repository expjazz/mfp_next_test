import React, { useEffect, useRef, useState } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

// Required imports when recording audio-only using the videojs-wavesurfer plugin
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;

// Register videojs-wavesurfer plugin
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';
import RecorderjsEngine from 'videojs-record/dist/plugins/videojs.record.recorderjs.js';

// import { audioRecordOptions } from './utils';
const audioRecordOptions = (props) => ({
	controls: true,
	bigPlayButton: true,
	width: 320,
	height: 240,
	fluid: false,
	plugins: {
		// wavesurfer section is only needed when recording audio-only
		wavesurfer: {
			backend: 'WebAudio',
			waveColor: '#36393b',
			progressColor: 'black',
			debug: true,
			cursorWidth: 1,
			msDisplayMax: 20,
			hideScrollbar: true,
			displayMilliseconds: true,
			userActions: {
				click: false
			},
			plugins: [
				// enable microphone plugin
				WaveSurfer.microphone.create({
					bufferSize: 4096,
					numberOfInputChannels: 1,
					numberOfOutputChannels: 1,
					constraints: {
						video: false,
						audio: true
					}
				})
			]
		},
		record: {
			audio: true,
			audioMimeType: 'auto',
			video: false,
			maxLength: 10,
			debug: true,
			timeSlice: props.timeSlice || 1000,
		},
	}
});

const createAudio = (parentId, id) => {
	const parent = document.getElementById(parentId);
	const ele = document.createElement('audio');
	ele.id = id;
	ele.className = 'video-js vjs-default-skin';
	ele.style.display = 'none';
	parent.appendChild(ele);
	return ele;
};
function useAudioRecordV2(props) {
	const player = useRef(null);
	const [update, setUpdate] = useState(false);
	const [blob, setBlob] = useState(null);
	const [recTime, setRecTime] = useState(0);
	const [status, setStatus] = useState('idle');
	let time = useRef(0);
	useEffect(() => {
		createAudio('audioRecordingProcesserParent', props?.audioComponent || 'audioRecordingProcesser');
		player.current = videojs(props.audioComponent || 'audioRecordingProcesser', audioRecordOptions(props), () => {
			const version_info = 'Using video.js ' + videojs.VERSION +
          ' with videojs-record ' + videojs.getPluginVersion('record') +
          ' and recordrtc ' + RecordRTC.version;
			videojs.log(version_info);
		});
		player.current.on('finishRecord', () => {
			if (props?.onFinish) {
				props.onFinish(player.current.recordedData);
			}
			setBlob(player.current.recordedData);
		});

		player.current.on('timestamp', () => {
			// setRecTime(player.current.currentTimestamp);
			time.current += 1;
			setRecTime(time.current);
			if (props?.onTimestamp) {
				props.onTimestamp(player.current.currentTimestamp);
			}
		});

		setTimeout(() => {
			player.current.record().getDevice();
		}, 500);
		setUpdate(true);
		// player.current?.record().getDevice();
		// console.log('video ', video);
		return () => {
			player.current?.dispose();
		};
	}, []);

	const start = () => {
		time.current = 0;
		setRecTime(0);
		player?.current?.record().start();
		setStatus('recording');
	};
	const stop = () => {
		player?.current?.record().stop();
		setStatus('idle');
	};
	return {
		player: player.current,
		start,
		stop,
		file: blob,
		fileURL: blob ? window.URL.createObjectURL(blob) : '',
		reset: () => {
			player?.current?.record().reset();
			player.current.record().getDevice();
		},
		recTime,
		status
	};

}

export default useAudioRecordV2;

export const withAudioRecordV2 = (Component) => {
	const audioRecorder = useAudioRecordV2();
	return (
		<Component
			audioRecorder={audioRecorder}
		/>
	);
};