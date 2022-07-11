import React from 'react';
import PropTypes from 'prop-types';
import WelcomeVideo from './components/WelcomeVideo';

const ProfileVideo = props => {
  const onBack = () => {
    props.goBack();
  };
  return <WelcomeVideo onBack={onBack} {...props} />;
};

const mapStateToProps = state => ({
  userDetails: state.userDetails,
});

ProfileVideo.propTypes = {
  userDetails: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
};
export default ProfileVideo
