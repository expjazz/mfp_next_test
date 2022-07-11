import { connect } from 'react-redux';
import { withReducer } from 'services/withReducer';
import { withTranslation } from 'react-i18next';
import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import myVideos from './reducers';
import { fetchUserDetails, updateNotificationCount } from '../../store/shared/actions/getUserDetails';
import FanRequest from '.';

const mapStateToProps = state => ({
  myVideosList: state.myVideos.myVideosList,
  userDetails: state.userDetails.settings_userDetails,
  recentActivity: state.myVideos.recentActivity,
  config: state.config.data,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  loaderAction: state => dispatch(loaderAction(state)),
  updateNotificationCount: () => dispatch(updateNotificationCount()),
  updateToast: toastObj => {
    dispatch(updateToast({ ...toastObj, global: false }));
  },
});

export default withTranslation()(withReducer('myVideos', myVideos)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FanRequest)),
);
