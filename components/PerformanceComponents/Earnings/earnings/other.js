// import { connect } from 'react-redux';
// import { withReducer } from 'services/withReducer';
// import { toggleBookingModal } from 'store/shared/actions/toggleModals';
// import { getDashboardData } from 'services/userManagement/dashboard';
// import { downloadEarnings, downloadEarningsPDF } from 'services/userManagement';
// import earningsList from './reducers';
// import { getEarningsList } from './actions';
// import Earnings from '.';

// const mapStates = state => ({
//   dashBoardData: state.dashBoard.data,
//   earningsList: state.earningsList,
//   userDetails: state.userDetails.settings_userDetails,
//   disbursement: state.userDetails.settings_celebrityDetails.disbursement,
//   stripeUrl: state.stripeRegistration.stripeURL,
//   entityData: state.entity.data,
// });
// function mapDispatch(dispatch) {
//   return {
//     getDashboardData: callBack => {
//       dispatch(getDashboardData(callBack));
//     },
//     downloadEarnings: (download) => {
//       dispatch(downloadEarnings(download));
//     },
//     downloadEarningsPDF: (download) => {
//       dispatch(downloadEarningsPDF(download))
//     },
//     getEarningsList: (status, filter, offset, refresh) => {
//       dispatch(getEarningsList(status, filter, offset, refresh));
//     },
//     toggleBookingModal: (state, bookingData, starMode) =>
//       dispatch(toggleBookingModal(state, bookingData, starMode)),
//   };
// }

// export default withReducer('earningsList', earningsList)(
//   connect(
//     mapStates,
//     mapDispatch,
//   )(Earnings),
// );
