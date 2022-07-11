import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { faBell, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/pro-regular-svg-icons';
import { getTime } from 'src/utils/timeUtils';
import { getReactionText } from './constants';
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

	const getClarification = () => {
		if (details.item_type === 'clarification') {
			return t('common.clari_req');
		} else if (details.star_price === details.fan_budget) {
			return t('common.price_accepted');
		} else if (details.star_price !== details.fan_price) {
			return t('common.new_price');
		}
		return '';
	};

	const getContent = () => {
		if (details.item_type === 'completed_request') {
			return (
				<Trans
					i18nKey="actionneeded.uploaded"
					values={{
						name: star.name,
						requestText: getReactionText(t)[details.request_type],
						talent: props.entityData.talentSingleCap,
					}}
				>
          Send <span className="tal-name">{}</span> a video, photo or comment.
          Talent loves to hear what smiles they created.
				</Trans>
			);
		} else if (details.item_type === 'clarification') {
			return details.star_message;
		} else if (details.item_type === 'live_call') {
			return t('actionneeded.live_call_notification', { talent: star.name });
		} else if (details.star_price === details.fan_budget) {
			return details.star_message || t('actionneeded.price_accepted');
		} else if (details.star_price !== details.fan_budget) {
			if (details.star_price > details.fan_budget) {
				return details.star_message || t('actionneeded.greater_price');
			} else if (details.star_price < details.fan_budget) {
				return details.star_message || t('actionneeded.less_price');
			} else {
				return details.star_message || t('actionneeded.new_price');
			}
		}
		return '';
	};

	return (
		<React.Fragment>
			<Li
				key={activity.id}
				onClick={() => {
					props.getSelected({
						...details,
						request_hashed_id:
              details.request_hashed_id || details.hashed_booking_id,
						reaction: details.item_type === 'completed_request',
					});
					// if (props.onMarkAsRead && !props.isRead)
					//   props.onMarkAsRead(props.group);
				}}
				isRead={isSeen}
			>
				{details.item_type !== 'completed_request' &&
          details.item_type !== 'live_call' && (
					<span className="action">
						<FontAwesomeIcon icon={faBell} />
						{getClarification()}
					</span>
				)}
				{details.item_type === 'completed_request' && (
					<span className="action">
						<FontAwesomeIcon icon={faVideo} />
						{t('common.upload_int')}
					</span>
				)}
				{details.item_type === 'live_call' && (
					<span className="action">
						<FontAwesomeIcon icon={faDesktop} />
						{t('common.live_exp')}
					</span>
				)}
				<div className="flex-content">
					<div className="flex-content align-top">
						<Image image={star.thumbnail_url || star.image_url} />
						<Content
							bgColor={
								details.item_type !== 'completed_request' &&
                details.item_type !== 'live_call'
							}
						>
							<Text>
								{details.item_type !== 'completed_request' &&
                  details.item_type !== 'live_call' && (
									<span className="name">{star.name} </span>
								)}
								{getContent()}
							</Text>
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
