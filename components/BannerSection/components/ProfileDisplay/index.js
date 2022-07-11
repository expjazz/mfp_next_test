import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import {
	ProfileImage,
	ProfileWrapper,
} from '../../styled';
import { useMedia } from '../../../../customHooks/domUtils';
import StarRating from '../../../StarRating';
import { useMediaQuery } from '@material-ui/core';
import FollowButton from '../../../PageStyles/CelebrityId/components/FollowButton';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import Image from 'next/image';

const ProfileDisplay = ({ profileImage, starName, profileVideo, rating, ratingCount, ...props }) => {
	const isMobile = useMediaQuery('(max-width: 1279px)');
	const { t } = useTranslation();
	const { data: entityData } = useGetPartner();
	return (
		<ProfileWrapper minimalView={props.minimalView}>
			<span className="img-wrp">
				<ProfileImage>

					<Image
						priority
						src={profileImage || 'images/default-cover.jpg'}
						layout="fill"
						objectFit='cover'
						width={isMobile ? 120 : 235}
						height={isMobile ? 120 : 235}
						alt={`${starName} on ${entityData?.partnerData.partner_name}`}
					/>
				</ProfileImage>
				<section className='details-wrap'>
					<section className='rating-section'>
						<StarRating readOnly ratingClass="rate-root" rating={rating} />
						{!isMobile ? (
							<span className='review-count'>
								{ratingCount} {t('common.reviews')}
							</span>
						) : ''}
					</section>
					<FollowButton className="follow-btn" />
				</section>
			</span>
		</ProfileWrapper>
	);
};

ProfileDisplay.defaultProps = {
	profileVideo: '',
	profileImage: '',
	starName: '',
	rating: 0,
};

ProfileDisplay.propTypes = {
	profileVideo: PropTypes.string,
	rating: PropTypes.number,
	profileImage: PropTypes.string,
	starName: PropTypes.string,
};

// const mapStateToProps = state => ({
//   profileVideo: state.starDetails.celebDetails.celebrityDetails.profile_video,
//   rating: state.starDetails.celebDetails.celebrityDetails.rating,
//   ratingCount: state.starDetails.celebDetails.celebrityDetails.rating_count,
// });

export default ProfileDisplay;
