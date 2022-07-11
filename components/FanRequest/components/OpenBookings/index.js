import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
	StreamApp,
	FlatFeed,
	InfiniteScrollPaginator,
	NewActivitiesNotification,
} from 'react-activity-feed';
import { useTranslation } from 'react-i18next';
import Loader from 'components/Loader';
import 'react-activity-feed/dist/index.css';
import EmptyPlaceholder from '../EmptyPlaceholder';
import { withFeedSubscription } from '../../services';
import Details from './Details';
import { Wrapper, Ul } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

function OpenBookings(props) {
	const { data: entityData } = useGetPartner();
	const containerRef = useRef(null);
	const { t } = useTranslation();

	return (
		<Wrapper>
			<Ul ref={containerRef}>
				<React.Fragment>
					<StreamApp
						apiKey={process.env.NEXT_PUBLIC_STREAMIO_API_KEY}
						appId={process.env.NEXT_PUBLIC_STREAMIO_APP_ID}
						token={props.streamTocken}
					>
						<FlatFeed
							feedGroup="newrequestone" // or timeline
							notify
							doFeedRequest={props.handleFeedRequest}
							LoadingIndicator={Loader}
							Placeholder={() => {
								return (<EmptyPlaceholder
									text={t('my_videos.requestEmpty.open', {talent: entityData?.partnerData?.talentSingleCap})}
									imageURL='/images/empty_wow.svg'
									buttonText={t('common.browseTalent', {talent: entityData?.partnerData?.talentSingleCap})}
								/>);
							}}
							Paginator={feedProps => (
								<InfiniteScrollPaginator {...feedProps} Loader={Loader} />
							)}
							options={{
								limit: 25,
							}}
							Notifier={data => {
								if (data.adds.length > 0) {
									return (
										<NewActivitiesNotification
											onClick={(clickProps) => {
												data.onClick(clickProps);
												props.onFeedUpdate();
											}}
											labelFunction={() => {
												return data.adds.length > 1
													? t('unread_notification_plural', {
														count: data.adds.length,
													})
													: t('unread_notification', {
														count: data.adds.length,
													});
											}}
										/>
									);
								}
								return null;
							}}
							Activity={activity => {
								props.setFeedDataProps(activity);
								return <Details {...activity} {...props} isRead />;
							}}
						/>
					</StreamApp>
				</React.Fragment>
			</Ul>
		</Wrapper>
	);
}

OpenBookings.propTypes = {
	getSelected: PropTypes.func.isRequired,
	streamTocken: PropTypes.string.isRequired,
	handleFeedRequest: PropTypes.func.isRequired,
	setFeedDataProps: PropTypes.func.isRequired,
};

export default withFeedSubscription(OpenBookings);
