import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Heading } from 'styles/TextStyled';
import Button from '../../SecondaryButton';
import { Container } from '../styled';
import { Wrap, UploadWrap, UploadInput } from './styled';
import ImageModal from './Components';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';

const ProfilePhoto = props => {
	useDisableRefetchOnFocus();
	const { t } = useTranslation();
	const [imageData, updateData] = useState({
		openModal: false,
		isUpload: false,
		imageUrl: null,
	});

	const [croppedData, updateCroppedData] = useState({
		croppedUrl: null,
		croppedFile: null,
	});
	const closeCropper = () => {
		updateData({
			...imageData,
			openModal: false,
		});
	};
	const takeNewPicture = () => {
		updateData({
			...imageData,
			isUpload: false,
			openModal: true,
		});
	};

	const takePictureResult = ({ base64 }) => {
		updateData({
			...imageData,
			isUpload: true,
			imageUrl: base64,
		});
	};

	const getCroppedImage = (file, base64Url) => {
		updateCroppedData({
			...croppedData,
			croppedUrl: base64Url,
			croppedFile: file,
		});
	};

	const newUpload = imageUrl => {
		updateData({
			...imageData,
			imageUrl,
		});
	};

	const uploadPicture = file => {
		const allowedExtensions = /((\.jpeg)|(\.jpg)|(\.png))$/i;
		if (allowedExtensions.exec(file.target.value)) {
			updateData({
				...imageData,
				isUpload: true,
				openModal: true,
				imageUrl: window.URL.createObjectURL(file.target.files[0]),
			});
		}
	};

	return (
		<Container className={`${props.classes.root} set-wrap`}>
			<Wrap imageUrl={croppedData.croppedUrl || props.profImg}>
				<Heading
					className="sub-head"
					data-web={props.webHead}
					data-mob={props.mobHead}
				></Heading>
				<section className="content-wrapper">
					<span className="profile-image" />
					<section className="profile-btn">
						<UploadWrap onClick={takeNewPicture}>
							<FontAwesomeIcon icon={faCamera} className="icon take-picture" />
							{t('common.take_picture')}
						</UploadWrap>
						<UploadWrap htmlFor="profileUpload">
							<UploadInput
								accept=".png, .jpeg, .jpg"
								id="profileUpload"
								type="file"
								onChange={uploadPicture}
							/>
							<FontAwesomeIcon
								htmlFor="profileUpload"
								icon={faUpload}
								className="icon upload-picture"
							/>
							{t('common.upload_picture')}
						</UploadWrap>
					</section>

					<Button
						disabled={!croppedData.croppedUrl}
						isDisabled={!croppedData.croppedUrl}
						onClick={() => props.updateProfilePhoto(croppedData)}
					>
						{t('common.save')}
					</Button>
				</section>
				{imageData.openModal && (
					<ImageModal
						isUpload={imageData.isUpload}
						imageUrl={imageData.imageUrl}
						takeNewPicture={takeNewPicture} // on take new picture:- camera
						newUpload={newUpload} // on upload file:- image
						closeCropper={closeCropper}
						getCroppedImage={getCroppedImage}
						takePictureResult={takePictureResult}
					/>
				)}
			</Wrap>
		</Container>
	);
};

ProfilePhoto.propTypes = {
	webHead: PropTypes.string,
	mobHead: PropTypes.string,
	updateProfilePhoto: PropTypes.func.isRequired,
	profImg: PropTypes.string,
	classes: PropTypes.object,
};

ProfilePhoto.defaultProps = {
	webHead: '',
	mobHead: '',
	profImg: '',
	classes: {},
};

export default ProfilePhoto;
