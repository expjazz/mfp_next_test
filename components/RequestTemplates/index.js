/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'next-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import AutoComplete from 'components/Autosuggest';
// import { checkMediaRecorderSupport, audioVideoSupport } from 'src/utils/checkOS';
import Input from 'components/TextInput';
import { Templates, FlexBox } from './styled';
// import AudioRecorder from 'components/AudioRecorder';
import { checkMediaRecorderSupport, audioVideoSupport } from 'src/utils/checkOS';
import { useTranslation } from 'next-i18next';
import AutoComplete from 'components/AutoSuggest';
import { resetRecording, useGeneral } from 'src/context/general';
import { CommonCharCount } from 'styles/CommonStyled';
import dynamic from 'next/dynamic';
import { isVodacom, isVodacomIOS, makeId, vodacomWebRedirect } from 'customHooks/domUtils';
import { deleteNewAudioExternalFile } from 'src/services/myfanpark/fanActions';
// import AudioRecorder from 'components/AudioRecord';

const AudioRecorder = dynamic(() => import('components/AudioRecordAudioV2'), { ssr: false });
function RequestTemplates({
	templateType,
	bookingData,
	saveAudioRecording,
	handleInputChange,
	updateUserToMyself,
	occasion,
	validationFields,
	formError,
	occasionName,
}) {
	const { t } = useTranslation();
	const [state, dispatch] = useGeneral();
	const { audioRecorder, commonReducer } = state;
	const checkDeviceSupport = async () => {
		const supportAudio = await audioVideoSupport('audioinput');
		return supportAudio;
	};
	const [supportAudio, updateDeviceSupport] = useState(false);

	useEffect(() => {
		checkDeviceSupport().then(result => {
			if (typeof result === 'boolean') {
				updateDeviceSupport(true);
			}
		});
	}, []);

	const getVodacomAudioRecordingLabels = fileName => {
		const redirect = () => vodacomWebRedirect(`https://${window.location.host}/audio-recorder?unique_id=${randomId}`);
		if (bookingData?.[`${fileName}_external_uploader`]) {
			return (
				<>

					<span
						className="recText"
						onClick={() => {
							const randomId = makeId(10);
							handleInputChange(randomId, `${fileName}_external_uploader`);
							// handleInputChange('HszQx2Yzev', `${fileName}_external_uploader`);
							vodacomWebRedirect(`https://${window.location.host}/audio-recorder?unique_id=${randomId}`);
						}}
						role="presentation"
					>

						{t('common.edit')}

					</span>

					<span
						className="recText"
						role="presentation"
					>

						{'|'}

					</span>

					<span
						className="recText"
						onClick={async () => {
							handleInputChange('', `${fileName}_external_uploader`);
							await deleteNewAudioExternalFile(bookingData?.[`${fileName}_external_uploader`]);
						}}
						role="presentation"
					>

						{t('common.delete')}

					</span>
				</>
			);
		}

		return (
			<span
				className="recText"
				onClick={() => {
					const randomId = makeId(10);
					handleInputChange(randomId, `${fileName}_external_uploader`);
					// handleInputChange('HszQx2Yzev', `${fileName}_external_uploader`);
					vodacomWebRedirect(`https://${window.location.host}/audio-recorder?unique_id=${randomId}`);
				}}
				role="presentation"
			>
				{
					t('common.pronounce_name')
				}
			</span>
		);
	};

	const getTextInput = ({
		placeholder,
		value,
		audioFlg,
		onChange,
		state,
		forSelf,
		maxLength,
		fileName,
		showCharCount
	}) => {
		const getLength = () => value ? value.length : 0;
		return (
			<Templates.InputWrapper>
				<Input
					inputProps={{
						nativeProps: {
							maxLength,
							'data-cy': state,
						},
						defaultProps: {
							value,
							onChange: event => onChange(event.target.value, state),
							error:
                formError && value === '' && validationFields.includes(state),
						},
						mInputProps: {
							classes: { rest: {} },
							InputProps: { id: placeholder },
						},
						labelObj: {
							label: placeholder,
						},
					}}
				/>
				{showCharCount && maxLength && (
					<React.Fragment>
						<CommonCharCount>
							{t('purchase_flow.char_remains', { length: maxLength - getLength() })}
						</CommonCharCount>
					</React.Fragment>
				)}
				{bookingData.user === 'someoneElse' &&
          forSelf &&
          value === '' &&
          occasion !== 13 &&
          occasion !== 37 && (
					<Templates.Myself onClick={updateUserToMyself}>
						{t('common.video_for_me')}
					</Templates.Myself>
				)}

				{audioFlg &&
          value !== '' &&
          checkMediaRecorderSupport() &&
          supportAudio &&
          !window.navigator.userAgent.indexOf('MSIE ') > -1 &&
          !window.navigator.userAgent.indexOf('Trident/') > -1 && (
					<Templates.WrapsAudioInput>
						{
							isVodacom() ? getVodacomAudioRecordingLabels(fileName) : (
								<AudioRecorder
									key={fileName}
									target={fileName}
									audioRecorder={audioRecorder}
									saveAudioRecording={(target, audio) =>
										saveAudioRecording(target, audio)
									}
									resetRecording={target => resetRecording(dispatch, target)}
								/>
							)
						}
					</Templates.WrapsAudioInput>
				)}
			</Templates.InputWrapper>
		);
	};

	const getSelect = (placeholder, value, onChange, maxLength = false, showCharCount = false) => {
		return (
			<Templates.InputWrapper data-cy='shoutout-relationship'>
				<React.Fragment>
					{bookingData.hostName !== '' &&
            bookingData.user === 'someoneElse' &&
            bookingData.userName && (
						<span className="relationship-text">
							<span>{bookingData.userName}</span> is{' '}
							<span>{`${bookingData.hostName}'s`}</span>
                ...
						</span>
					)}
				</React.Fragment>
				<AutoComplete
					placeholder={placeholder}
					onChange={onChange}
					list={bookingData.relationship}
					labelKey="title"
					valueKey="id"
					type="relationshipValue"
					value={value}
					maxLength={maxLength}
					showCharCount={showCharCount}
				/>
			</Templates.InputWrapper>
		);
	};

	const getDatePicker = (placeholder, date, onChange, minDate, maxDate) => {
		return (
			<Templates.InputWrapper>
				<div className="datepickerWrapper">
					<DatePicker
						dateFormat="MMMM Do"
						withPortal
						minDate={minDate}
						maxDate={maxDate}
						customInput={
							<Input
								inputProps={{
									nativeProps: { readOnly: true },
									labelObj: {
										label: placeholder,
									},
								}}
							/>
						}
						popperPlacement="bottom"
						selected={date}
						onChange={dt => onChange(dt, 'date')}
					/>
				</div>
			</Templates.InputWrapper>
		);
	};

	const getFiledProps = (
		placeholder,
		audioFlg,
		state,
		forSelf,
		maxLength,
		fileName,
		showMaxLength = false
	) => {
		return {
			placeholder,
			audioFlg,
			onChange: handleInputChange,
			value: bookingData[state],
			state,
			forSelf,
			maxLength,
			fileName,
			showCharCount: showMaxLength
		};
	};

	const getVideoFor = state => {
		return getTextInput(
			getFiledProps(
				t('common.who_is_this_video_for'),
				true,
				state,
				true,
				55,
				'for',
				true
			),
		);
	};

	const getVideoFrom = state => {
		return getTextInput(
			getFiledProps(
				t('common.who_is_this_video_from'),
				true,
				state,
				false,
				55,
				'from',
				true
			),
		);
	};

	const getSpecification = (placeholder, state, isAudio, fileName) => {
		return getTextInput(
			getFiledProps(placeholder, isAudio, state, false, 55, fileName, true),
		);
	};

	const getRelationship = () => {
		return getSelect(
			t('common.how_are_you_related'),
			bookingData.relationshipValue,
			handleInputChange,
			55,
			true
		);
	};

	const getDate = () => {
		return getDatePicker(
			t('date_of_occasion'),
			bookingData.date,
			handleInputChange,
		);
	};

	switch (templateType) {
	case 1:
		return (
			<FlexBox>
				{bookingData.user === 'someoneElse' ? (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getVideoFrom('userName')}
						{getRelationship()}
						{getDate()}
					</React.Fragment>
				) : (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getDate()}
					</React.Fragment>
				)}
			</FlexBox>
		);
	case 2:
		return (
			<FlexBox>
				{bookingData.user === 'someoneElse' ? (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getVideoFrom('userName')}
						{getRelationship()}
						{getSpecification(
							t('common.honoring'),
							'specification',
							true,
							'honor',
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getSpecification(
							t('common.honoring'),
							'specification',
							true,
							'honor',
						)}
					</React.Fragment>
				)}
			</FlexBox>
		);
	case 3:
		return (
			<FlexBox>
				{bookingData.user === 'someoneElse' ? (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getVideoFrom('userName')}
						{getRelationship()}
						{getSpecification(
							t('common.what_is_this_for', {
								eventName: bookingData.eventName,
							}),
							'specification',
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getSpecification(
							t('common.what_is_this_for', {
								eventName: bookingData.eventName,
							}),
							'specification',
						)}
					</React.Fragment>
				)}
			</FlexBox>
		);
	case 4:
		return (
			<FlexBox>
				{bookingData.user === 'someoneElse' ? (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getVideoFrom('userName')}
						{getRelationship()}
						{getTextInput(
							getFiledProps(
								t('common.for_what'),
								false,
								'specification',
								false,
								'',
								55,
								'',
								true
							),
						)}

					</React.Fragment>
				) : (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getTextInput(
							getFiledProps(
								t('common.for_what'),
								false,
								'specification',
								true,
								'',
								55,
								'',
								true
							),
						)}
					</React.Fragment>
				)}
			</FlexBox>
		);
	case 5:
		return (
			<FlexBox>
				{bookingData.user === 'someoneElse' ? (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getVideoFrom('userName')}
						{getRelationship()}
						{getTextInput(
							getFiledProps(
								t('common.from_where'),
								false,
								'specification',
								false,
								55,
								'',
								true
							),
						)}
						{getDate(true)}
					</React.Fragment>
				) : (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getTextInput(
							getFiledProps(
								t('common.from_where'),
								false,
								'specification',
								false,
								55,
								'',
								true
							),
						)}
						{getDate(true)}
					</React.Fragment>
				)}
			</FlexBox>
		);
	case 6:
		return (
			<FlexBox>
				{getTextInput(
					getFiledProps(
						t('common.name_of_the_event'),
						false,
						'specification',
						false,
						52,
						'',
					),
				)}
				{getDatePicker(
					t('common.when_is_the_event'),
					bookingData.date,
					handleInputChange,
					new Date(),
					null,
				)}
			</FlexBox>
		);
	case 7:
		return (
			<FlexBox>
				{getTextInput(
					getFiledProps(
						t('common.honoring'),
						true,
						'specification',
						false,
						55,
						'honor',
						true
					),
				)}
				{getTextInput(
					getFiledProps(
						t('common.who_is_hosting_the_event'),
						true,
						'hostName',
						false,
						55,
						'host',
						true
					),
				)}
				{getDatePicker(
					t('common.when_is_the_event'),
					bookingData.date,
					handleInputChange,
					new Date(),
					null,
				)}
			</FlexBox>
		);
		/* special occasion */
	case 8:
		return (
			<FlexBox>
				{bookingData.user === 'someoneElse' ? (
					<React.Fragment>
						{getVideoFor('hostName')}
						{getVideoFrom('userName')}
						{getRelationship()}
					</React.Fragment>
				) : (
					<React.Fragment>{getVideoFor('hostName')}</React.Fragment>
				)}
			</FlexBox>
		);

	default:
		return null;
	}
}

export default RequestTemplates;
