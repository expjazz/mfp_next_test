import ExternalHeader from 'components/ExternalNavBar';
import { Container } from 'components/PageStyles/ExternalAudio/styled';
import PageTitle from 'components/PageTitle';
import dynamic from 'next/dynamic';
// import ExternalAudioRecorder from 'components/ExternalAudioRecorder';
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Description } from 'styles/TextStyled';
const ExternalAudioRecorder = dynamic(() => import('components/ExternalAudioRecorder'), {
	ssr: false,
});
function AudioRecorder() {
	useEffect(() => {
		if (window.FreshworksWidget) {
			window.FreshworksWidget('hide', 'launcher');
		}
	}, []);
	return (
		<div className="">
			<ExternalHeader />
			<Container>
				<PageTitle>
        Record Audio
				</PageTitle>

				<Description>
        Please record a voice note to give your Talent clarity on how to pronounce any names that must be mentioned.
				</Description>
				<ExternalAudioRecorder />
			</Container>
		</div>
	);
}

export default AudioRecorder;