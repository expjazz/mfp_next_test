import React, { useEffect } from 'react';
import useAudioRecordV2 from '..';

function AudioTest() {
	const { player, start, stop, file, fileURL } = useAudioRecordV2();
	return (
		<div>
			<button onClick={start}>
    record
			</button>

			<button onClick={stop}>
    stop
			</button>

			<button onClick={() => player?.play()}>
    play
			</button>
			{fileURL && <audio src={fileURL} controls />}
		</div>
	);
}

export default AudioTest;