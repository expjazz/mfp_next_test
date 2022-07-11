import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { isEmpty, cloneDeep } from 'lodash';
// import { toggleBookingModal } from 'store/shared/actions/toggleModals';
import HorizontalListing from 'components/HorizontalListing';
// import { useVisibility, useMedia } from 'src/utils/domUtils';
import { Image } from 'styles/CommonStyled';
import { LinkText } from 'styles/TextStyled';
// import { getInteractionList } from 'services/pageDesign';
import VideoStyled, { Content } from './styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { useVisibility } from 'customHooks/domUtils';
import { useMediaQuery } from '@material-ui/core';
import { getInteractionList } from 'src/services/pageDesign';

const InteractionList = props => {
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [offset, updateOffset] = useState(1);
	const [rootNode, setRootNode] = useState(null);
	const [loading, setLoading] = useState(false);
	const [dataList, updateDataList] = useState([]);
	const [dataCount, setCount] = useState(0);
	const visible = useVisibility(rootNode);

	const onOpenModal = dataObj => () => {
		props.toggleBookingModal(
			true,
			{ id: dataObj.request_id, isPublic: true },
			false,
		);
	};

	const callApi = offSetVal => {
		setLoading(true);
		const result = getInteractionList(
			offSetVal,
			10,
			props.starData.userData.id,
		);
		result
			.then(res => {
				setLoading(false);
				if (res.data && res.data.data && res.data.data.social_media_requests) {
					updateDataList([...dataList, ...res.data.data.social_media_requests]);
					updateOffset(offSetVal);
					setCount(res.data.data.count);
				}
			})
			.catch(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		updateOffset(1);
		setLoading(false);
		updateDataList([]);
		setCount(0);
	}, []);

	useEffect(() => {
		callApi(0);
	}, []);

	const renderContent = item => {
		return (
			<Content key={item.request_id} onClick={onOpenModal(item)}>
				<Image
					className="image"
					image={visible && item.evidence_files && item.evidence_files[0]}
				/>
				<span className="social-item">
					{item.social_media_title.social_media}
				</span>
				<LinkText className="link">for {item.name}</LinkText>
			</Content>
		);
	};

	if (dataList.length < 1 && !loading) {
		return null;
	}

	const tempData = cloneDeep(dataList);
	let listData = [];
	if (!isEmpty(tempData)) {
		[, ...listData] = tempData;
	}
	if (!loading && !listData || listData?.length <= 0) {
		return null;
	}
	return (
		<VideoStyled ref={setRootNode}>
			<VideoStyled.InnerContent>
				<VideoStyled.Header>See Star interactions</VideoStyled.Header>
				{(listData.length > 0 || loading) && (
					<HorizontalListing
						classes={{
							root: 'list-root',
							arrowWrapper: 'slide-arrow',
							listContent: 'scroll-list-wrp',
						}}
						scrollId="interaction-list-scroll"
						showArrows={!isMobile}
						dataList={listData}
						loading={loading}
						offset={offset}
						fetchData={callApi}
						renderContent={renderContent}
						totalCount={dataCount - 1}
						limit={10}
					/>
				)}
			</VideoStyled.InnerContent>
		</VideoStyled>
	);
};

InteractionList.propTypes = {
	starData: PropTypes.object.isRequired,
	toggleBookingModal: PropTypes.func.isRequired,
	isStar: PropTypes.bool.isRequired,
};

InteractionList.defaultProps = {};

export default InteractionList;
