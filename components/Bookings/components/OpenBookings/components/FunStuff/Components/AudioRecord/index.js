import React, { useState, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import TextArea from 'components/TextArea';
import Button from 'components/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import StatusDisplay from 'components/StatusDisplay';
import { audioVideoSupport } from 'src/utils/checkOS';
import { getStatusList, getDelivStatus } from 'src/utils/getDelivStatus';
import { FlexCenter } from 'styles/CommonStyled';
import { bytesToSize } from 'customHooks/domUtils';
import { Description } from 'styles/TextStyled';
import UploadModal from '../UploadModal';
import { useRecord, getRecordText, getUploadText } from './utils';
import UploadList from './components/UploadList';
import { initialState, recordReducer } from './reducers';
import {
	maxUploadSize,
	maxFileLength,
	fileRegex,
	inputFilter,
} from './constants';
import { CharCount } from '../../styled';
import { Wrap, RecordWrap } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { capitalize } from '@material-ui/core';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';
import useAudioRecordV2 from 'components/AudioRecordV2';
import moment from 'moment';

const AudioRecord = ({
	bookId,
	completeStatus,
	updateStatusVal,
	updateToast,
	completeUpload,
	changeToLink,
}) => {
	useDisableRefetchOnFocus();
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const [response, updateResponse] = useState('');
	const [limModal, toggLimModal] = useState(false);
	const [hasSupport, updateSupport] = useState(true);
	const [playBlob, updatePlayBlob] = useState('');
	const [size, updateSize] = useState(0);
	const audioRef = useRef(null);
	const fileRef = useRef(null);
	const [recordState, dispatch] = useReducer(recordReducer, initialState);
	const [file, setFile] = useState(null);
	const [fileURL, setFileURL] = useState('');
	const onFinish = blob => {
		setFile(blob);
		// updatePlayBlob(blob);
		setFileURL(window.URL.createObjectURL(blob));
	};
	// const recTime = false;
	const { start, stop, reset, recTime } = useAudioRecordV2({onFinish});
	// const { mediaBlob, error, recordBlobs, recTime } = useRecord({
	// 	record: recordState.recording,
	// });
	const formatedRecTime = moment('1900-01-01 00:00:00').add(recTime, 'seconds').format('mm:ss');
	const responseChange = event => {
		updateResponse(event.target.value);
	};

	const fileChange = async event => {
		const file = event.target.files;
		const regex = new RegExp(fileRegex);
		if (
			recordState.uploadFiles.length < maxFileLength &&
      file &&
      regex.test(file[0].name.toLowerCase())
		) {
			if (file[0].size / 1024 + size > maxUploadSize) {
				toggLimModal(true);
			} else {
				dispatch({
					type: 'upload',
					files: [
						...recordState.uploadFiles,
						{
							file: file[0],
							file_name: file[0].name,
							type: 'upload',
							fileBlob: window.URL.createObjectURL(file[0]),
							file_size: bytesToSize(file[0].size),
							file_type: 'audio',
						},
					],
				});
				updateSize(file[0].size / 1024 + size);
			}
		} else if (recordState.uploadFiles.length >= maxFileLength) {
			updateToast({
				value: true,
				message: t('common.file_limit_error'),
				variant: 'error',
			});
		} else {
			updateToast({
				value: true,
				message: t('common.file_format',{input:inputFilter}),
				variant: 'error',
			});
		}
		fileRef.current.value = '';
	};

	const clearStates = () => {
		updateResponse('');
		toggLimModal(false);
		updateSupport(true);
		updatePlayBlob('');
		dispatch({ type: 'reset' });
	};

	useEffect(() => {
		clearStates();
	}, []);

	useEffect(() => {
		audioVideoSupport()
			.then(() => {
				updateSupport(true);
			})
			.catch(() => {
				updateSupport(false);
			});
	}, []);

	// useEffect(() => {
	// 	if (mediaBlob) {
	// 		dispatch({
	// 			type: 'record/stop',
	// 			recordBlob: mediaBlob,
	// 			recordBlobsList: recordBlobs,
	// 			recordFile: new File([mediaBlob], 'audio.webm'),
	// 		});
	// 	}
	// }, [mediaBlob, recordBlobs]);

	useEffect(() => {
		audioRef.current.onended = () => {
			updatePlayBlob('');
		};
	}, [audioRef.current]);

	useEffect(() => {
		if (playBlob) {
			audioRef.current.src = fileURL;
			audioRef.current.play();
		} else {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	}, [playBlob]);

	const removeFile = index => () => {
		updatePlayBlob('');
		const tFiles = [...recordState.uploadFiles];
		tFiles.splice(index, 1);
		dispatch({
			type: 'upload',
			files: tFiles,
		});
	};

	const onRecordClick = () => {
		updatePlayBlob('');
		if (recordState.recording) {
			stop();
		} else {
			start();
		}
		dispatch({ type: recordState.recording ? 'record/stop' : 'record/start' });
	};

	const onDeleteRecord = () => {
		dispatch({ type: 'record/delete' });
		reset();
		updatePlayBlob('');
	};

	const onSecBtnClick = () => {
		updatePlayBlob('');
		if (recordState.hasRecordFile) {
			fileRef.current.click();
		} else {
			onRecordClick();
		}
	};

	const onComplete = () => {
		let recordFileArr = [];
		if (playBlob || file) {
			const recordFile = file;
			recordFileArr = [
				{
					file: recordFile,
					file_name: recordFile.name,
					fileBlob: window.URL.createObjectURL(recordFile),
					file_size: bytesToSize(recordFile.size),
					file_type: 'audio',
				},
			];
		}
		completeUpload(
			{
				celebrity_reply: response,
			},
			[...recordState.uploadFiles, ...recordFileArr],
		);
		// uploadFiles
	};

	const onMediaBtnClick = () => {
		if (playBlob && audioRef.current) {
			updatePlayBlob('');
		} else if (!playBlob && recordState.hasRecordFile && audioRef.current) {
			updatePlayBlob(file);
		} else {
			fileRef.current.click();
		}
	};

	const closeModal = () => {
		toggLimModal(false);
	};

	return (
		<Wrap>
			<UploadModal
				open={limModal}
				changeDelivery={changeToLink}
				tryUpload={closeModal}
			/>
			<div className="flex-col req-sec">
				<span className="sub-head">{t('common.status')}</span>
				<Description className="text note">{t('open_bookings.email_txt',{purchaserSingle: entityData?.partnerData?.purchaser_singular_name, purchaserPlural:capitalize(entityData?.partnerData?.purchaser_plural_name)})}</Description>
				<StatusDisplay
					key={bookId}
					list={getStatusList(completeStatus)}
					onSelect={updateStatusVal}
					selected={getDelivStatus(completeStatus)}
				/>
			</div>
			<div className="flex-col req-sec">
				<span className="sub-head">{t('open_bookings.record_audio')}</span>
				<Description className="text">{t('open_bookings.upload_5')}</Description>
				<UploadList
					fileList={recordState.uploadFiles}
					playBlob={playBlob}
					updatePlayBlob={updatePlayBlob}
					removeFile={removeFile}
				/>
				<span className="horiz-btns">
					<Button
						className="fun-btns"
						disabled={!hasSupport}
						isDisabled={!hasSupport}
						secondary={recordState.hasRecordFile}
						onClick={onRecordClick}
					>
						<FontAwesomeIcon
							icon={recordState.recording ? faStop : faMicrophone}
							className="record-icon"
						/>
						{getRecordText(recordState.recording, recordState.hasRecordFile)}
					</Button>
					<Button
						className="fun-btns"
						secondary
						disabled={recordState.recording}
						onClick={onMediaBtnClick}
					>
						{getUploadText(
							recordState.hasRecordFile,
							playBlob === file,
						)}
					</Button>
					{recordState.hasRecordFile && (
						<Button className="fun-btns" secondary onClick={onDeleteRecord}>
							{t('common.delete')}
						</Button>
					)}
				</span>
				{recTime && (
					<FlexCenter className="buttons recording-time">
						{(recordState.hasRecordFile || recordState.recording) && (
							<RecordWrap>
								{t('open_bookings.recording_length')}
								<span className="record-time">
									{formatedRecTime}
								</span>
							</RecordWrap>
						)}
						{recordState.hasRecordFile && (
							<span
								role="presentation"
								className="link-btn"
								onClick={onSecBtnClick}
							>
								{t('open_bookings.upload_recording')}
							</span>
						)}
					</FlexCenter>
				)}
				<audio ref={audioRef} src={playBlob} controls hidden />
				<input
					hidden
					id="fileUpload"
					accept={inputFilter}
					onChange={fileChange}
					type="file"
					ref={fileRef}
				/>
				<TextArea
					autoSize
					inputProps={{
						onChange: responseChange,
						value: response,
						placeholder: t('open_bookings.funStuff.textPlaceholder',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name}),
						className: 'textarea',
					}}
				/>
				<CharCount>{t('common.char_remains',{length:500 - response.length})}</CharCount>
				<FlexCenter className="buttons">
					<Button
						className="fun-btns"
						onClick={onComplete}
						disabled={
							!recordState.uploadFiles.length && !recordState.hasRecordFile
						}
						isDisabled={
							!recordState.uploadFiles.length && !recordState.hasRecordFile
						}
					>
						{t('complete_save')}
					</Button>
				</FlexCenter>
			</div>
		</Wrap>
	);
};

AudioRecord.propTypes = {
	bookId: PropTypes.string.isRequired,
	completeStatus: PropTypes.string.isRequired,
	updateStatusVal: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	completeUpload: PropTypes.func.isRequired,
	changeToLink: PropTypes.func.isRequired,
};

export default AudioRecord;
