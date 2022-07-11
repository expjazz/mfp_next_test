import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import { useTranslation } from 'next-i18next';
import Truncate from 'react-truncate';
// import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useVisibility, useMedia } from 'customHooks/domUtils';
// import { Description } from 'styles/TextStyled';
import Button from '../../../../../../SecondaryButton';
// import HorizontalListing from 'components/HorizontalListing';
// import { getRecentRequest } from 'services/pageDesign';
// import { FlexCenter, Image } from 'styles/CommonStyled';
import { Layout, Content, RequestButton } from './styled';
import { ContentWrapper } from '../../styled';
import { Container, SmallHeading } from '../../../../styled';
import { getDetails } from './util';
import { useMediaQuery } from '@material-ui/core';
import { isEmpty } from '../../../../../../../src/utils/dataStructures';
import { useVisibility } from '../../../../../../../customHooks/domUtils';
import HorizontalListing from '../../../../../../HorizontalListing';
import { FlexCenter, Image } from '../../../../../../../styles/CommonStyled';
import { Description } from '../../../../../../../styles/TextStyled';
import { useTranslation } from 'next-i18next';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getRecentRequest } from '../../../../../../../src/services/myfanpark';

function RecentRequests(props) {
	const router = useRouter();
	const { celebrityId } = router.query;

	const isMobile = useMediaQuery('(max-width: 831px)');
	const [offset, updateOffset] = useState(1);
	const [loading, setLoading] = useState(false);
	const [rootNode, setRootNode] = useState(null);
	const { data: recentRequests } = useQuery(['getRecentRequest', celebrityId], () => getRecentRequest(0, 10, celebrityId));
	const visible = useVisibility(rootNode);
	const [dataList, updateDataList] = useState(recentRequests?.requests);
	const [dataCount, setCount] = useState(recentRequests?.count);

	const { t } = useTranslation();

	const callApi = offSetVal => {
		setLoading(true);
		const result = getRecentRequest(offSetVal, 10, props.userDetails.user_id);
		result
			.then(res => {
				setLoading(false);
				if (res.requests) {
					updateDataList([...dataList, ...res.requests]);
					updateOffset(offSetVal);
					setCount(res.count);
				}
			})
			.catch(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		dataList?.forEach(item => {
			const data = getDetails(
				item,
				props.userDetails.first_name,
				props.celebDetails,
				props.userDetails.user_id,
				t
			);
			router.prefetch(data.url);
		});
	}, []);

	const renderContent = item => {
		const data = getDetails(
			item,
			props.userDetails.first_name,
			props.celebDetails,
			props.userDetails.user_id,
			t
		);
		if (!isEmpty(data)) {
			return (
				<Content
					config={props.config || {}}
					key={item.request_id}
					onClick={() => {
						if (props.isBookable && item.is_available_for_booking) {
							router.push(data.url);
						}
					}}
					clickabel={
						!props.isStar && props.isBookable && item.is_available_for_booking
					}
				>
					<FlexCenter>
						{data.cusIcon
							? data.cusIcon
							: data.icon && <FontAwesomeIcon icon={data.icon} />}
						{data.image && <Image image={data.image} className="product-img" />}
					</FlexCenter>
					<Description className="desc">
						{visible && (
							<Truncate lines={data.lineClamb ? data.lineClamb : 6}>
								{data.desc}
							</Truncate>
						)}
					</Description>
					{item.is_available_for_booking && (
						<RequestButton>
							<Button
								className="book-btn"
								secondary
								disabled={props.isStar || !props.isBookable}
							>
								{data.btnTitle}
							</Button>
						</RequestButton>
					)}
				</Content>
			);
		}
		return null;
	};

	if (dataList?.length === 0 && !loading) {
		return null;
	}

	return (
		<ContentWrapper>
			<SmallHeading>{t('star_profile.popExp')}</SmallHeading>
			<Container ref={setRootNode}>
				<Layout centerList={dataList?.length <= 5}>
					<HorizontalListing
						classes={{
							root: 'list-root',
							arrowWrapper: 'slide-arrow',
							listContent: 'scroll-list-wrp',
						}}
						scrollId="recent-list-scroll"
						showArrows={!isMobile}
						dataList={dataList}
						loading={loading}
						offset={offset}
						fetchData={callApi}
						renderContent={renderContent}
						totalCount={dataCount}
						limit={10}
						config={{}}
					/>
				</Layout>
			</Container>
		</ContentWrapper>
	);
}

RecentRequests.propTypes = {
	config: PropTypes.object,
	userDetails: PropTypes.object.isRequired,
	isStar: PropTypes.bool,
	isBookable: PropTypes.bool,
	history: PropTypes.object.isRequired,
	celebDetails: PropTypes.object.isRequired,
	celebId: PropTypes.string.isRequired,
};
RecentRequests.defaultProps = {
	config: {},
	isStar: false,
	isBookable: false,
};

export default RecentRequests;
