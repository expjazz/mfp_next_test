// import AudioRecordV2 from 'components/AudioRecordV2';
// import AudioTest from 'components/AudioRecordV2/components/AudioTest';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import React from 'react';

// const AudioRecordV2 = dynamic(() => import('components/AudioRecordV2'), { ssr: false });
const AudioTest = dynamic(() => import('components/AudioRecordV2/components/AudioTest'), { ssr: false });
function AudioRecord() {

	return (
		<>
			<Script
				src="recorderjs/dist/recorder.js"
			/>
			{/* <AudioRecordV2 /> */}
			<AudioTest />
			<div>AudioRecord</div>
		</>
	);
}

export default AudioRecord;