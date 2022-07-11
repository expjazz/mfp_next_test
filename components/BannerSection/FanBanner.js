import React from 'react';
import PropTypes from 'prop-types';
import ProfileDisplay from './components/ProfileDisplay';

import {
	Wrapper,
	BannerImage,
	BannerWrapper,
} from './styled';
import { isEmpty } from '../../src/utils/dataStructures';
import Image from 'next/image';

const FanBanner = ({ profileImage, bannerImage, starName, ...props }) => {
	return (
		<Wrapper
			minimalView={props.minimalView}
			imageUrl={profileImage}
			banner={bannerImage}
		>
			<BannerWrapper>
				{!isEmpty(bannerImage) ? (
					<Image priority layout="fill" src={bannerImage} />
				) : (
					<span className="no-bg"></span>
				)}
			</BannerWrapper>
			<ProfileDisplay
				profileImage={profileImage}
				starName={starName}
				rating={props.curUserData.celebDetails.rating}
				ratingCount={props.curUserData.celebDetails.rating_count}
			/>
		</Wrapper>
	);
};

FanBanner.defaultProps = {
	profileImage: '',
	bannerImage: '',
	starName: '',
};

FanBanner.propTypes = {
	profileImage: PropTypes.string,
	bannerImage: PropTypes.string,
	starName: PropTypes.string,
	minimalView: PropTypes.bool.isRequired,
};

export default FanBanner;
