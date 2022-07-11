import DownloadHandler from 'components/DownloadHandler';
import Button from 'components/SecondaryButton/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { Description } from 'styles/TextStyled';
import { Container } from './styled';
function ExternalDownloadRecorder(props) {
	const router = useRouter();
	const downloadUrl = router.asPath.split('download_url=')[1];
	useEffect(() => {
		if (downloadUrl) {
			props.downloadFunc(downloadUrl);
		}
	}, [downloadUrl]);
	return (
		<Container>
			<Description>
        The download should start automatically. If not, feel free to press the button below.
			</Description>

			<Button className='button' onClick={() => props.downloadFunc(downloadUrl)}>
        Download
			</Button>
		</Container>
	);
}

export default DownloadHandler(ExternalDownloadRecorder);