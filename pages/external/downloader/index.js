import ExternalDownloadRecorder from 'components/ExternalDownloadRecorder';
import ExternalHeader from 'components/ExternalNavBar';
import PageTitle from 'components/PageTitle';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Downloader() {
	const router = useRouter();
	useEffect(() => {
		if (window.FreshworksWidget) {
			window.FreshworksWidget('hide', 'launcher');
		}
	}, []);
	return (
		<div>
			<ExternalHeader />
			<PageTitle>
        Download
			</PageTitle>
			<ExternalDownloadRecorder />
		</div>
	);
}

export default Downloader;