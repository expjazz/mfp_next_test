/* eslint-disable camelcase */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import FanView from './components/FanView';
import { useCurrencyData } from 'customHooks/currencyUtils';
import { toggleBookingModal, useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useConfigPartner } from 'customHooks/reactQueryHooks';

const Completed = props => {
	const currencyData = useCurrencyData();
	const scrollRef = useRef(null);
	const { data: userData } = useFetchLoggedUser();
	const { reqDetails } = props;
	const [state, dispatch] = useGeneral();
	const { data: config } = useConfigPartner();
	const updateRequestData = data => {
		// props.onUpdateData(data.id, data);
	};
	const localToggleBooking = (active, bookingData, starMode) => {

		toggleBookingModal(dispatch, active, bookingData, starMode );
	};

	return (
		<FanView
			bookingData={reqDetails}
			userId={props.userId}
			updateRequestData={updateRequestData}
			scrollRef={scrollRef}
			currencyData={currencyData}
			onCompleteAction={props.onFanCompleteAction}
			toggleBookingModal={localToggleBooking}
			isStar={!!userData?.celebrity_details}
			carriers={config?.shipping_carriers}
			{...props}
		/>
	);
};

Completed.defaultProps = {
	userId: '',
};

Completed.propTypes = {
	onFanCompleteAction: PropTypes.func.isRequired,
	userId: PropTypes.string,
	// onUpdateData: PropTypes.func.isRequired,
	reqDetails: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
	toggleBookingModal: (state, bookingData, starMode) =>
		dispatch(toggleBookingModal(state, bookingData, starMode)),
});

export default Completed;

// activitiesList: state.activitiesList,
// isStar: state.session.starRole,
// isLoggedIn: state.session.isLoggedIn,
// userId: state.session.auth_token.id,
// carriers: state.config.data.shipping_carriers,