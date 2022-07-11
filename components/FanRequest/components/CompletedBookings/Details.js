import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'src/utils/dataStructures';
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { getTime } from 'src/utils/timeUtils';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { Li, Image, Content, Text } from './styled';

function Details(props) {
	const { t } = useTranslation();
	const [isSeen, updateSeen] = useState(props.isRead);
	const { activity = {} } = props;
	const { extra_details: details = {} } = activity;
	const { star_image: star = {} } = details;

	useEffect(() => {
		let timeout = null;
		if (!isSeen) {
			timeout = setTimeout(() => {
				updateSeen(true);
			}, 10000);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const RenderText = booking => {
		if (requestTypesKeys.qa === details.request_type) {
			return (
				<Trans
					i18nKey="stream_completed.live_question_answer"
					values={{
						name: star.name,
					}}
				>
          QA from <span className="tal-name">{}</span> is ready to view
				</Trans>
			);
		} else if (requestTypesKeys.shoutout === details.request_type) {
			return (
				<Trans
					i18nKey="stream_completed.personalised_video"
					values={{
						name: star.name,
					}}
				>
          Video shoutout from <span className="tal-name">{}</span> is ready to
          view
				</Trans>
			);
		} else if (requestTypesKeys.event === details.request_type) {
			return (
				<Trans
					i18nKey="stream_completed.announcement"
					values={{
						name: star.name,
					}}
				>
          Announcement from <span className="tal-name">{}</span> is ready to
          view
				</Trans>
			);
		} else if (requestTypesKeys.commercial === details.request_type) {
			return (
				<Trans
					i18nKey="stream_completed.commercial_personalised_video"
					values={{
						name: star.name,
						title: details.title,
					}}
				>
					{} from <span className="tal-name">{}</span> is ready to view
				</Trans>
			);
		} else if (requestTypesKeys.message === details.request_type) {
			return <Trans i18nKey="stream_completed.dm_message"></Trans>;
		} else if (requestTypesKeys.socialShoutout === details.request_type) {
			return (
				<Trans
					i18nKey="stream_completed.social_interaction"
					values={{
						name: star.name,
					}}
				>
          Social media interaction from <span className="tal-name">{}</span>
          has been completed
				</Trans>
			);
		} else if (requestTypesKeys.promotion === details.request_type) {
			return (
				<Trans
					i18nKey="stream_completed.commercial_social_interaction"
					values={{
						name: star.name,
					}}
				>
          Social media promotion from <span className="tal-name">{}</span> has
          been completed
				</Trans>
			);
		} else if (requestTypesKeys.digitalGoods === details.request_type) {
			return (
				<React.Fragment>
					{booking.title ? (
						<React.Fragment>
							{booking.delivery_method === deliveryMethods.videoCalls ? (
								<Trans
									i18nKey="stream_completed.live_call"
									values={{
										name: star.name,
										title: booking.title,
									}}
								>
									<span>{}</span> from <span className="tal-name">{}</span>
                  has been completed
								</Trans>
							) : (
								<Trans
									i18nKey="stream_completed.fun_stuff"
									values={{
										name: star.name,
										title: booking.title,
									}}
								>
									<span>{}</span> from <span className="tal-name">{}</span>
                  is ready to view
								</Trans>
							)}
						</React.Fragment>
					) : (
						t('bookings.fun_stuff_item')
					)}
				</React.Fragment>
			);
		} else if (requestTypesKeys.products === details.request_type) {
			return (
				<Trans
					i18nKey="stream_completed.merch"
					values={{
						name: star.name,
						title: booking.title,
					}}
				>
					<span>{}</span> from <span className="tal-name">{}</span> has been
          shipped. View to track
				</Trans>
			);
		}
		return '';
	};

	return (
		<React.Fragment>
			<Li
				key={activity.id}
				onClick={() => {
					props.getSelected(details);
					// if (props.onMarkAsRead && !props.isRead)
					//   props.onMarkAsRead(props.group);
				}}
				isRead={isSeen}
			>
				<div className="flex-content">
					<div className="flex-content">
						<Image image={star.thumbnail_url || star.image_url} />
						<Content>
							<Text>{RenderText(details)}</Text>
							{requestTypesKeys.message === details.request_type && (
								<Content bgColor>
									<Text>
										<span className="name">{star.name} </span>
										{!isEmpty(details.conversation) &&
                      (details.conversation.message_reply
                      	? details.conversation.message_reply
                      	: details.conversation.message_request)}
									</Text>
								</Content>
							)}
							<span className="time">{getTime(activity.created_at, true)}</span>
						</Content>
					</div>
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
			</Li>
		</React.Fragment>
	);
}

Details.propTypes = {
	activity: PropTypes.object.isRequired,
	getSelected: PropTypes.func.isRequired,
	// onMarkAsRead: PropTypes.oneOfType([PropTypes.func, null]),
	// group: PropTypes.object,
	isRead: PropTypes.bool,
};

Details.defaultProps = {
	// onMarkAsRead: null,
	// group: {},
	isRead: true,
};
export default Details;
