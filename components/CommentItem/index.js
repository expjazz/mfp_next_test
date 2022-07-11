import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {
	faTimes,
	faArrowAltCircleDown,
	faArrowAltCircleUp,
} from '@fortawesome/pro-light-svg-icons';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { useMedia } from 'customHooks/domUtils';
// import VideoRender from 'components/VideoRender';
// // import { FlexCenter } from 'styles/CommonStyled';
// import { getLocalAmount } from 'utils/currencyUtils';
// import SecondaryButton from '../SecondaryButton';
import StarRating from '../StarRating';
// import { numberToDecimalWithFractionTwo } from '../../utils/dataformatter';
// import { getTime } from '../../utils/timeUtils';
// import { toggleActivityVisibility } from '../../store/shared/actions/getActivities';
import CommentStyled from './styled';
import { useMediaQuery } from '@material-ui/core';
import SecondaryButton from '../SecondaryButton';
import { getTime } from '../../src/utils/timeUtils';
import { FlexCenter } from '../../styles/CommonStyled';
import VideoRender from '../VideoRender';
import { numberToDecimalWithFractionTwo } from '../../src/utils/dataformatter';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { toggleActivityVisibility } from 'src/services/myfanpark';
import { useQueryClient } from 'react-query';
import { useGeneral } from 'src/context/general';

const CommentItem = props => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [reaction, setReaction] = useState(null);
	const queryClient = useQueryClient();
	const dispatch = useGeneral()[1];
	const visibilityChange = (activityId, callback = () => {}) => toggleActivityVisibility(activityId, callback, queryClient, dispatch);

	const onReactionClick = () => {
		setReaction(props.commentDetails);
	};

	const clearReaction = () => {
		setReaction(null);
	};

	const renderCommentDetails = text => {
		if (props.commentLimit && text && text.length > props.commentLimit) {
			return (
				<React.Fragment>
					{text.substring(0, props.commentLimit)}
					<span
						className="more-link"
						onClick={props.onMoreClick}
						role="presentation"
					>
						{t('common.more')}
					</span>
				</React.Fragment>
			);
		}
		return text;
	};

	const renderComment = () => {
		const { type } = props;
		if (type === 'reaction') {
			return (
				<span className="comment reaction">
					<FontAwesomeIcon icon={faHeart} className="icons icon-heart" />
					<span>
						<span className="text-description">
							{t('common.reactionRecorded')}:
						</span>
						<span className="text-bold">
							{moment(props.commentDetails.created_date).format('MMM D, YYYY')}
						</span>
					</span>
					<SecondaryButton className="action-button" onClick={onReactionClick}>
						{isMobile ? t('common.play') : t('common.view')}
					</SecondaryButton>
				</span>
			);
		} else if (type === 'tip') {
			return (
				<span className="comment tip">
					<span className="title">
						{props.isMessaging
							? t('common.tipped', { name: props.user })
							: t('common.tippedYou', { name: props.celebrity })}
					</span>
					<span className="text-bold amount">
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(props.commentDetails.amount),
							false,
							false,
						)}
					</span>
				</span>
			);
		} else if (type === 'rating') {
			return (
				<span className="comment tip">
					<span className="title">
						<span className="text-bold user-name">{props.user}</span>
						{props.isPublic
							? t('common.ratedVideo')
							: `${
								props.isMessaging ? t('common.rated') : t('common.ratedYou')
							}`}{' '}
					</span>
					<span className="rating">
						<StarRating rating={props.commentDetails.fan_rate} readOnly />
					</span>
				</span>
			);
		}
		return (
			<div className="comment comment-only">
				<span className="text-bold user-name">{props.user}</span>
				{props.commentDetails.comments &&
        props.commentDetails.comments.length &&
        props.commentDetails.comments.split('/n').length > 0
					? props.commentDetails.comments
						.split('/n')
						.map((commentItem, index) => (
							<p key={`comment-${index}`}>
								{renderCommentDetails(commentItem)}
							</p>
						))
					: renderCommentDetails(props.commentDetails.comments)}
			</div>
		);
	};

	const getUserImage = () => {
		if (props.type === 'comment') {
			return props.commentDetails.user && props.commentDetails.user.image_url;
		}
		return props.commentDetails.user_image_url;
	};

	const onSelectAction = () => {
		visibilityChange(props.activityId);
	};

	// const zoom = e => {
	//   e.preventDefault();
	//   const zoomer = e.currentTarget;
	//   let offsetX = e.pageX;
	//   let offsetY = e.pageY;

	//   if (e.clientX) {
	//     offsetX = e.clientX;
	//   }
	//   if (e.clientY) {
	//     offsetY = e.clientY;
	//   }
	//   const x = (offsetX / zoomer.offsetWidth) * 100;
	//   const y = (offsetY / zoomer.offsetHeight) * 100;
	//   zoomer.style.backgroundPosition = `${x}% ${y}%`;
	// };

	return (
		<CommentStyled className={props.classes.root}>
			<CommentStyled.Container
				receive={props.receive}
				className={props.classes.container}
			>
				<span className="arrow-wrapper">
					<CommentStyled.ProfileImage profileImage={getUserImage()} />
					{props.toBottom && props.scrollToBottom && (
						<span
							className="icon-wrapper"
							onClick={() => props.scrollToBottom()}
							role="presentation"
						>
							<FontAwesomeIcon icon={faArrowAltCircleDown} />
							<span className="mesg">{t('common.lastMessage')}</span>
						</span>
					)}
					{props.toUp && props.scrollToTop && (
						<span
							className="icon-wrapper"
							onClick={() => props.scrollToTop()}
							role="presentation"
						>
							<FontAwesomeIcon icon={faArrowAltCircleUp} />
							<span className="mesg">{t('common.firstMessage')}</span>
						</span>
					)}
				</span>
				<CommentStyled.CommentWrapper
					className="comment-section-wrap"
					receive={props.receive}
				>
					<CommentStyled.Comment
						className={props.classes.comment}
						visible={
							props.type === 'tip' || props.type === 'rating' || props.visible
						}
					>
						{renderComment()}

						<span className="comment-footer">
							<span className="time">
								{getTime(props.time)}
								{props.isEditable && (
									<React.Fragment>
										{' '}
                    |
										<span
											onClick={props.editHandler}
											role="presentation"
											className="edit-lbl"
										>
											{' '}
											{t('common.edit')}
										</span>
									</React.Fragment>
								)}
							</span>
						</span>
						{reaction && (
							<FlexCenter>
								<div className="reaction-wrap">
									<FontAwesomeIcon
										icon={faTimes}
										onClick={clearReaction}
										className="close-reaction"
									/>
									{reaction.file_type !== 1 && (
										<VideoRender
											classes={{
												container: 'video-container',
											}}
											type={reaction.file_type}
											noBorder
											videoSrc={reaction.reaction_file_url}
											cover={reaction.s3_thumbnail_url}
										/>
									)}
									{reaction.file_type === 1 && (
										<img
											src={reaction.reaction_file_url}
											alt="reaction"
											className="reaction-img"
										/>
									// <CommentStyled.Figure
									//   className="zoom"
									//   onMouseMove={event => zoom(event)}
									//   onTouchMove={event => zoom(event)}
									//   src={reaction.reaction_file_url}
									// >
									//   <img src={reaction.reaction_file_url} alt="" />
									// </CommentStyled.Figure>
									)}
								</div>
							</FlexCenter>
						)}
					</CommentStyled.Comment>
					{!props.disableAction &&
            (props.type === 'reactions' || props.type === 'comment') && (
						<CommentStyled.Hide onClick={onSelectAction}>
							{props.type === 'tip' ||
                props.type === 'rating' ||
                props.visible
								? t('common.hide')
								: t('common.show')}
						</CommentStyled.Hide>
					)}
				</CommentStyled.CommentWrapper>
			</CommentStyled.Container>
		</CommentStyled>
	);
};

CommentItem.defaultProps = {
	type: '',
	receive: false,
	classes: {},
	user: '',
	time: '',
	disableAction: false,
	onReactionClick: () => {},
	commentDetails: {},
	activityId: '',
	visible: true,
	isPublic: false,
	commentLimit: 0,
	onMoreClick: () => {},
	isMessaging: false,
	isEditable: false,
	editHandler: () => {},
	scrollToBottom: () => {},
	scrollToTop: () => {},
	toBottom: false,
	toUp: false,
};

CommentItem.propTypes = {
	type: PropTypes.string,
	receive: PropTypes.bool,
	classes: PropTypes.object,
	user: PropTypes.string,
	time: PropTypes.string,
	activityId: PropTypes.string,
	disableAction: PropTypes.bool,
	visible: PropTypes.bool,
	commentDetails: PropTypes.object,
	onReactionClick: PropTypes.func,
	toggleActivityVisibility: PropTypes.func.isRequired,
	commentLimit: PropTypes.number,
	isPublic: PropTypes.bool,
	onMoreClick: PropTypes.func,
	isMessaging: PropTypes.bool,
	isEditable: PropTypes.bool,
	editHandler: PropTypes.func,
	scrollToBottom: PropTypes.func,
	scrollToTop: PropTypes.func,
	toBottom: PropTypes.bool,
	toUp: PropTypes.bool,
};

// const mapDispatchToProps = dispatch => ({
//   toggleActivityVisibility: activityId =>
//     dispatch(toggleActivityVisibility(activityId)),
// });

export default CommentItem;
