import React, { useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { toggleBookingModal } from 'store/shared/actions/toggleModals';
import HorizontalListing from 'components/HorizontalListing';
import BlockContent from 'components/BlockContent';
// import { useMedia } from 'customHooks/domUtils';
// import { fetchCelebVideosList } from 'pages/starProfile/actions/getCelebVideos';
import VideoStyled from './styled';
import { editGeneralState, editModals, useGeneral } from 'src/context/general';
import { fetchCelebVideosList } from 'src/services/myfanpark/celebActions';
import { useRouter } from 'next/router';

const VideoList = props => {
	const [state, dispatch] = useGeneral();
	const { celebVideos: videosList } = state;
	const isMobile = useMediaQuery('(max-width: 831px)');

	const getDuration = duration => {
		if (duration) {
			return duration.slice(3, duration.length);
		}
		return null;
	};

	const onOpenModal = dataObj => () => {
		editModals(dispatch, { key: 'bookingModal', payload: { ...state.modals.bookingModal, active: true, requestId: dataObj.booking_id, data: { ...dataObj, isPublic: true } } });

		// props.toggleBookingModal(
		//   true,
		//   { id: dataObj.booking_id, isPublic: true },
		//   false,
		// );
	};
	const router = useRouter();
	const getVideos = async () => {

		const payload = await fetchCelebVideosList(props.userData.id, 0, true, null, videosList, router);
		editGeneralState(dispatch, { payload, key: 'celebVideos' });
	};

	useEffect(() => {
		editGeneralState(dispatch, { payload: {...videosList, loading: true}, key: 'celebVideos' });
		getVideos();
	}, []);

	const renderContent = (item, index) => {
		return (
			<BlockContent
				key={`${index}-${item.video_id}`}
				playIcon
				classes={{
					root: 'block-root',
					heading: 'video-head',
					title: 'video-title',
				}}
				onClick={onOpenModal(item)}
				image={item.thumbnail || item.s3_thumbnail_url}
				title={getDuration(item.duration)}
				heading={item.occasion}
			/>
		);
	};

	if (!videosList?.data?.length && !videosList?.loading) {
		return null;
	}

	return (
		<VideoStyled>
			<VideoStyled.InnerContent>
				<VideoStyled.Header>{props.entityData.purchaser_singular_name} shoutouts</VideoStyled.Header>
				{(videosList?.data?.length > 0 || videosList.loading) && (
					<HorizontalListing
						classes={{ root: 'list-root' }}
						scrollId="video-list-scroll"
						showArrows={!isMobile}
						dataList={videosList?.data || []}
						loading={videosList.loading}
						offset={videosList.offset}
						fetchData={async (offset, refresh) => {
							editGeneralState(dispatch, { payload: {...videosList, loading: true}, key: 'celebVideos' });

							const payload = await fetchCelebVideosList(props.userData.id, offset, refresh, null, videosList);
							editGeneralState(dispatch, { payload, key: 'celebVideos' });

						}}
						renderContent={renderContent}
						totalCount={videosList.count}
						limit={videosList.limit}
					/>
				)}
			</VideoStyled.InnerContent>
		</VideoStyled>
	);
};

VideoList.propTypes = {
	celebId: PropTypes.string.isRequired,
	videosList: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	fetchCelebVideosList: PropTypes.func.isRequired,
	toggleBookingModal: PropTypes.func.isRequired,
	isStar: PropTypes.bool.isRequired,
};
VideoList.defaultProps = {};

// const mapStateToProps = state => ({
//   videosList: state.starDetails.celebVideos,
// });

// const mapDispatchToProps = dispatch => ({
//   fetchCelebVideosList: (id, offset, refresh, customLimit) =>
//     dispatch(fetchCelebVideosList(id, offset, refresh, customLimit)),
//   toggleBookingModal: (state, bookingData, starMode) =>
//     dispatch(toggleBookingModal(state, bookingData, starMode)),
// });

export default VideoList;
