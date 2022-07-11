import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
	StreamApp,
	InfiniteScrollPaginator,
	NotificationFeed,
	NewActivitiesNotification,
} from 'react-activity-feed';
import { useTranslation } from 'react-i18next';
import Loader from 'components/Loader';
import 'react-activity-feed/dist/index.css';
import Follow from '../Follow';
import ActionNeeded from '../ActionNeeded/Details';
import CancelledBookings from '../CancelledBookings/Details';
import CompletedBookings from '../CompletedBookings/Details';
import Conversation from '../Conversation/Details';
import EmptyPlaceholder from '../EmptyPlaceholder';
import News from '../News/Details';
import OpenBookings from '../OpenBookings/Details';
import { Wrapper, Ul } from './styled';

function AllBookings(props) {
	const containerRef = useRef(null);
	const feedDataProps = useRef(null);
	const [followPosId, setFollowPos] = useState(null);
	const currentFollowPos = useRef(null);

	const { t } = useTranslation();

	const customDoFeedRequest = (client, feedGroup, userId, options) => {
		const feed = client.feed(feedGroup, userId);
		const feedPromise = feed.get(options);
		if (!feedDataProps.current) {
			feed.subscribe(subsData => {
				if (subsData && subsData.deleted && feedDataProps.current && feedDataProps?.current?.onRemoveActivity) {
					feedDataProps.current.onRemoveActivity(subsData.deleted[0]);
				}
			});
		}

		if (!currentFollowPos.current) {
			feedPromise.then(resultList => {
				const foundResult = resultList.results.find(
					(resultItem, index) => index === 5,
				);
				if (foundResult) {
					setFollowPos(foundResult.id);
					currentFollowPos.current = foundResult.id;
				}
			});
		}
		return feedPromise;
	};

	const markActivityRead = (readFunction) => activityGroup => {
		readFunction(activityGroup);
	};

	return (
		<Wrapper>
			<Ul ref={containerRef}>
				<React.Fragment>
					<StreamApp
						apiKey={process.env.NEXT_PUBLIC_STREAMIO_API_KEY}
						appId={process.env.NEXT_PUBLIC_STREAMIO_APP_ID}
						token={props.streamTocken}
					>
						<NotificationFeed
							feedGroup="notifications_aggregated_2" // or timeline
							notify
							LoadingIndicator={Loader}
							doFeedRequest={customDoFeedRequest}
							Placeholder={() => {
								return (
									<EmptyPlaceholder
										text={t('my_videos.requestEmpty.all', {
											siteName: props.entityData.siteName,
										})}
										imageURL="/images/empty_smile.svg"
										buttonText={t('common.browseTalent', {
											talent: props.entityData.talentSingleCap,
										})}
									/>
								);
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
							Group={({ activityGroup, onMarkAsRead, ...newProp }) => {
								feedDataProps.current = newProp;
								return (
									<React.Fragment>
										{activityGroup.activities &&
                      activityGroup.activities.length > 0 &&
                      activityGroup.activities.map(data => {
                      	return (
                      		<React.Fragment>
                      			{data.activity_type === 'actionneededfeedone' && (
                      				<ActionNeeded
                      					activity={data}
                      					isRead={activityGroup.is_seen}
                      					{...props}
                      					onMarkAsRead={onMarkAsRead}
                      					group={activityGroup}
                      				/>
                      			)}
                      			{data.activity_type === 'cancelrequestone' && (
                      				<CancelledBookings
                      					activity={data}
                      					isRead={activityGroup.is_seen}
                      					{...props}
                      					onMarkAsRead={markActivityRead(onMarkAsRead)}
                      					group={activityGroup}
                      				/>
                      			)}
                      			{data.activity_type === 'completedrequestone' && (
                      				<CompletedBookings
                      					activity={data}
                      					isRead={activityGroup.is_seen}
                      					{...props}
                      					onMarkAsRead={markActivityRead(onMarkAsRead)}
                      					group={activityGroup}
                      				/>
                      			)}
                      			{data.activity_type === 'dmfeedone' && (
                      				<Conversation
                      					activity={data}
                      					isRead={activityGroup.is_seen}
                      					{...props}
                      					onMarkAsRead={markActivityRead(onMarkAsRead)}
                      					group={activityGroup}
                      				/>
                      			)}
                      			{data.activity_type === 'newsuserfeedone' && (
                      				<News
                      					activity={data}
                      					isRead={activityGroup.is_seen}
                      					{...props}
                      					onMarkAsRead={markActivityRead(onMarkAsRead)}
                      					group={activityGroup}
                      				/>
                      			)}
                      			{data.activity_type === 'newrequestone' && (
                      				<OpenBookings
                      					activity={data}
                      					isRead={activityGroup.is_seen}
                      					{...props}
                      					onMarkAsRead={markActivityRead(onMarkAsRead)}
                      					group={activityGroup}
                      				/>
                      			)}
                      		</React.Fragment>
                      	);
                      })}
										{activityGroup.id === followPosId && <Follow />}
									</React.Fragment>
								);
							}}
						/>
					</StreamApp>
				</React.Fragment>
			</Ul>
		</Wrapper>
	);
}

AllBookings.propTypes = {
	streamTocken: PropTypes.string.isRequired,
};

export default AllBookings;
