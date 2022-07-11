import React, { useState, useRef, lazy } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
// import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
// import { isEmpty, cloneDeep } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraAlt } from '@fortawesome/pro-regular-svg-icons';
import Modal from 'components/Modal';
// import { retry } from 'services/lazyLoad';
import ErrorHandler from 'components/ErrorHandler';
// import ProfilePhoto from 'components/SettingsComponents/ProfilePhoto';
import BackHeader from 'components/BackHeader';
import StarRating from 'components/StarRating';
import ImgCropper from 'components/Cropper';
// import { useMedia } from 'src/utils/domUtils';
import { backgroundImages } from 'src/services/pageDesign';
import { awsKeys } from 'src/constants/index';
import { awsImageUpload } from 'src/services/awsImageUpload';
import { postReactionMedia } from 'src/services/postReaction';
import Button from 'components/SecondaryButton';
// import FollowButton from '../FollowButton';
import BannerUpload from './components/BannerUpload';
import {
	Wrapper,
	ProfileWrapper,
	BannerWrapper,
	CamBg,
	ProfilePicker,
} from './starStyled';

import { ProfileImage, BannerImage, ProfileImageStarBanner } from './styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { useMediaQuery } from '@material-ui/core';
import ProfilePhoto from 'components/SettingsComponents/ProfilePhoto';
import FollowButton from 'components/PageStyles/CelebrityId/components/FollowButton';
// import Dropdown from '../Dropdown';
// import StarDropdown from 'components/StarDropdown';
const Dropdown = dynamic(() => import('components/StarDropdown'));

const BannerSection = ({
	profileImage,
	bannerImage,
	starName,
	loaderAction,
	updateToast,
	updateProfilePhoto,
	...props
}) => {
	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 1279px)');
	const { data: fanData } = useFetchLoggedUser();
	const { data: celebrityData } = useGetCelebrityData();
	const userDetails = celebrityData?.user;
	const celebDetails = celebrityData?.celebrity_details;
	const loggedinUserDetails = fanData?.user;
	const loggedinCelbDetails = fanData?.celebrity_details;
	// const { settings_userDetails: loggedinUserDetails } = props.logedinUserData;
	// const {
	//   settings_celebrityDetails: loggedinCelbDetails,
	// } = props.logedinUserData;

	const [profileModal, setProfileModal] = useState(false);
	const [bannerImg, setBannerImage] = useState('');
	const [croppedData, setCroppedData] = useState('');
	const inputRef = useRef(null);
	const cropperBtnRef = useRef(null);

	const triggerProfileModal = () => {
		setProfileModal(true);
	};

	const profileModalClose = () => {
		setProfileModal(false);
	};

	const bannerUploadTrigger = event => {
		event.stopPropagation();
		if (inputRef && inputRef.current) {
			inputRef.current.click();
		}
	};

	const bannerImageData = data => {
		setBannerImage(data);
	};

	const updateCoverImage = (file, base64) => {
		const result = backgroundImages('post', {
			image: file,
			type: 'new_image',
		});
		result
			.then(res => {
				loaderAction(false);
				if (res.status === 'success') {
					setBannerImage('');
					setCroppedData(base64);
				} else {
					updateToast({
						value: true,
						message: t('common.uploadFailed'),
						variant: 'error',
					});
				}
			})
			.catch(() => {
				loaderAction(false);
				updateToast({
					value: true,
					message: t('common.uploadFailed'),
					variant: 'error',
				});
			});
	};

	const afterCrop = (file, base64) => {
		loaderAction(true);
		const result = postReactionMedia(
			awsKeys.coverImage,
			file,
			file.type.split('/')[1],
			file.type.split('/')[0],
		);
		result
			.then(res => {
				const response = axios.post(res.url, res.formData);
				response
					.then(() => {
						updateCoverImage(res.fileName, base64);
					})
					.catch(() => {
						loaderAction(false);
						updateToast({
							value: true,
							message: t('common.uploadFailed'),
							variant: 'error',
						});
					});
			})
			.catch(() => {
				loaderAction(false);
				updateToast({
					value: true,
					message: t('common.uploadFailed'),
					variant: 'error',
				});
			});
	};
	const cancelBnrCrop = () => {
		setCroppedData('');
		setBannerImage('');
		if (inputRef && inputRef.current) inputRef.current.value = null;
	};
	const triggerCropper = () => {
		if (cropperBtnRef && cropperBtnRef.current) cropperBtnRef.current.click();
	};

	const updateStore = avatarPhoto => {
		const userData = cloneDeep(userDetails);
		const loginUserData = cloneDeep(loggedinUserDetails);
		userData.avatar_photo = avatarPhoto;
		userData.avatarPhoto = avatarPhoto.image_url;
		loginUserData.avatar_photo = avatarPhoto;
		props.updateCelebDetails({
			userDetails: userData,
			celebrityDetails: celebDetails,
		});
		props.updateUserDetails({
			userDetails: loginUserData,
			celbDetails: loggedinCelbDetails,
		});
	};

	const updateProfilePic = ({ croppedFile }) => {
		loaderAction(true);
		awsImageUpload(croppedFile, croppedFile.type.split('/')[1])
			.then(resp => {
				const fileName = {
					images: [resp],
					avatar_photo: resp,
					featured_image: '',
				};
				updateProfilePhoto(fileName)
					.then(res => {
						loaderAction(false);
						if (res.avatar_photo) {
							setProfileModal(false);
							updateStore(res.avatar_photo);
							updateToast({
								value: true,
								message: t('common.update_success'),
								variant: 'success',
							});
						} else {
							updateToast({
								value: true,
								message: t('common.update_failed'),
								variant: 'error',
							});
						}
					})
					.catch((e) => {
						updateToast({
							value: true,
							message: t('common.update_failed'),
							variant: 'error',
						});
					});
			})
			.catch((e) => {
				loaderAction(false);
				updateToast({
					value: true,
					message: t('common.update_failed'),
					variant: 'error',
				});
			});
	};

	return (
		<React.Fragment>
			{bannerImg && (
				<div className="mob-crop-btns">
					<Button secondary onClick={cancelBnrCrop}>
						{t('common.cancel')}
					</Button>
					<Button secondary onClick={triggerCropper}>
						{t('common.save')}
					</Button>
				</div>
			)}
			<Wrapper
				minimalView={props.minimalView}
				imageUrl={profileImage}
				banner={bannerImage}
			>
				<BannerWrapper isCropping={bannerImg}>
					{!isEmpty(bannerImage) ? (
						<React.Fragment>
							{bannerImg ? (
								<ImgCropper
									cropImage={bannerImg}
									afterCrop={afterCrop}
									cropperBtnRef={cropperBtnRef}
								/>
							) : (
								<BannerImage src={croppedData || bannerImage} />
							)}
						</React.Fragment>
					) : (
						<span className="no-bg"></span>
					)}

					<CamBg className="bnr-cam">
						<FontAwesomeIcon
							icon={faCameraAlt}
							className="cam-icon"
							onClick={bannerUploadTrigger}
						/>
					</CamBg>

					<BannerUpload
						inputRef={inputRef}
						imageData={bannerImageData}
						updateToast={updateToast}
					/>
				</BannerWrapper>
				<ProfileWrapper minimalView={props.minimalView} isCropping={bannerImg}>
					<section className="img-wrp">
						<span className='profile-wrp'>
							<ProfileImageStarBanner
								src={profileImage || '/images/default-cover.jpg'}
								alt={`${starName} on `}
							/>

							<CamBg className="prof-cam" onClick={triggerProfileModal}>
								<FontAwesomeIcon icon={faCameraAlt} className="cam-icon" />
							</CamBg>
						</span>
						<section className='details-wrap'>
							<section className='rating-section'>
								{
									props.rating >0 &&
                    <StarRating readOnly ratingClass="rate-root" rating={props.rating} />
								}
								{props.ratingCount && !isMobile ? (
									<span className='review-count'>
										{props.ratingCount} {t('common.reviews')}
									</span>
								) : ''}
							</section>
							<FollowButton className="follow-btn" />
						</section>
					</section>

					<div className="drop-container">
						{bannerImg && (
							<div className="cropper-save-wrp">
								<Button
									secondary
									className="cancel-btn"
									onClick={cancelBnrCrop}
								>
									{t('common.cancel')}
								</Button>
								<Button onClick={triggerCropper}>{t('common.save_changes')}</Button>
							</div>
						)}
						{
							!isMobile &&
                <ErrorHandler>
                	<Dropdown
                		curUserData={props.curUserData}
                		logedinUserData={props.logedinUserData}
                		updateUserDetails={props.updateUserDetails}
                		updateCelebDetails={props.updateCelebDetails}
                		loaderAction={loaderAction}
                		updateToast={updateToast}
                	/>
                </ErrorHandler>
						}
					</div>
				</ProfileWrapper>
				{
					isMobile &&
            <ErrorHandler>
            	<Dropdown
            		curUserData={props.curUserData}
            		logedinUserData={props.logedinUserData}
            		updateUserDetails={props.updateUserDetails}
            		updateCelebDetails={props.updateCelebDetails}
            		loaderAction={loaderAction}
            		updateToast={updateToast}
            	/>
            </ErrorHandler>
				}
			</Wrapper>
			{profileModal && (
				<Modal open={profileModal} onClose={profileModalClose}>
					<ProfilePicker>
						<BackHeader
							backHandler={profileModalClose}
							closeHandler={profileModalClose}
							label="Profile"
						/>
						<ProfilePhoto
							updateProfilePhoto={updateProfilePic}
							mobHead="Photo"
							webHead="Profile Photo"
							profImg={profileImage || '/images/default-cover.jpg'}
							classes={{ root: 'prof-cam-container' }}
						/>
					</ProfilePicker>
				</Modal>
			)}
		</React.Fragment>
	);
};

BannerSection.defaultProps = {
	profileImage: '',
	bannerImage: '',
	starName: '',
	isMyProfile: false,
};

BannerSection.propTypes = {
	profileImage: PropTypes.string,
	bannerImage: PropTypes.string,
	starName: PropTypes.string,
	loaderAction: PropTypes.func.isRequired,
	updateProfilePhoto: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	updateCelebDetails: PropTypes.func.isRequired,
	curUserData: PropTypes.object.isRequired,
	logedinUserData: PropTypes.object.isRequired,
	updateUserDetails: PropTypes.func.isRequired,
	isMyProfile: PropTypes.bool,
	minimalView: PropTypes.bool.isRequired,
};

// const mapStateToProps = state => ({
//   rating: state.starDetails.celebDetails.celebrityDetails.rating,
//   ratingCount: state.starDetails.celebDetails.celebrityDetails.rating_count,
// });

export default BannerSection;
