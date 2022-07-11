import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import FanBanner from './FanBanner';
import StarBanner from './StarBanner'

const BannerSection = ({
  profileImage,
  bannerImage,
  starName,
  loaderAction,
  updateToast,
  updateProfilePhoto,
  ...props
}) => {
  const renderFallback = () => {
    return null;
  };

  return (
    <>
      {props.isMyProfile ? (
          <StarBanner
            profileImage={profileImage}
            bannerImage={bannerImage}
            starName={profileImage}
            loaderAction={loaderAction}
            updateToast={updateToast}
            updateProfilePhoto={updateProfilePhoto}
            {...props}
          />
      ) : (
        <FanBanner
          profileImage={profileImage}
          bannerImage={bannerImage}
          starName={profileImage}
          {...props}
        />
      )}
    </>
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
};

export default BannerSection;

{/* <ErrorHandler fallback={renderFallback}> */}
// </ErrorHandler> 