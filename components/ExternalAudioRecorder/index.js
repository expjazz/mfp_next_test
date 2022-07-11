import useAudioRecordV2 from 'components/AudioRecordV2';
import Button from 'components/SecondaryButton';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { openAwsUploadCredentials } from 'src/services/awsImageUpload';
import { postNewAudioExternalFile } from 'src/services/myfanpark/fanActions';
import { Loading } from 'styles/CommonStyled';
import { Description } from 'styles/TextStyled';
import { Container } from './styled';
function ExternalAudioRecorder() {
	const audio = useRef(new Audio);
	const router = useRouter();
	const dispatch = useGeneral()[1];
	const [loading, setLoading] = useState(false);
	const [uploadedFileName, setUploadedFileName] = useState(null);
	const {
		start,
		stop,
		file,
		fileURL,
		status,
		recTime
	} = useAudioRecordV2({
		audioComponent: 'external-recorder'
	});
	const formatedRecTime = moment('1900-01-01 00:00:00').add(recTime, 'seconds').format('mm:ss');
	useEffect(() => {
		audio.current.src = fileURL;
	}, [fileURL]);
	const play = () => {
		audio.current.play();
	};
	const recordBtnClick = () => {
		status === 'recording' ? stop() : start();
	};
	const uploadFile = async () => {
		setLoading(true);
		generalLoader(dispatch, true);
		const fileType = file?.name?.split('.')[1];
		try {

			const filename = await openAwsUploadCredentials('audio_files', fileType, 'audio', file);
			if (!filename) {
				return;
			}
			const resp = await postNewAudioExternalFile(filename, router.query.unique_id);
			if (resp.data.id) {
				setUploadedFileName(filename);
			}
			setLoading(false);
			generalLoader(dispatch, false);
		} catch(e) {
			setLoading(false);
			generalLoader(dispatch, false);
			updateToast(dispatch, {
				value: true,
				message:'There was an error uploading your file. Please try again later.',
				global: true,
				variant: 'error'
			});
		}
	};

	return (
		<Container>
			<Button className="recorder-button" onClick={recordBtnClick}>{status === 'recording' ? 'Stop Recording' : 'Start Recording'}</Button>

			{
				fileURL && (
					<Button className="recorder-button" onClick={play}>Play</Button>
				)
			}

			{
				file && (
					<Button className="recorder-button" onClick={uploadFile}>Upload</Button>
				)
			}

			{
				formatedRecTime && (
					<Description>
						{formatedRecTime}
					</Description>
				)
			}

			{/* {
					uploadedFileName && (
						<div>
							<a
								href="vodapaywallet://deeplink.htm?action=miniapp&miniappId=3460020119360172&query=request_id%3DwdL00pdj%26type%3Dcompleted%26page%3Dvideo%26id%3DmepQP6aM"
							>{uploadedFileName}</a>
						</div>
					)
				} */}

			{
				uploadedFileName && (
					<Description>
              The file was saved. You can close this to keep with your request now.
					</Description>
				)
			}
		</Container>
	);
}

export default ExternalAudioRecorder;