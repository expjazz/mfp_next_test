/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Button from 'components/PrimaryButton';
import CommentItem from 'components/CommentItem';
// import { isEmpty } from 'src/utils/dataStructures';
import CommentBox from 'components/CommentBox';
import { getUserImage } from 'src/utils/dataformatter';
import { EditButton, EditInput } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Conversation = props => {
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const [edited, setEdited] = useState(false);
	const [editText, setEditText] = useState('');
	const [stopEdit, setStopEdit] = useState(false);
	const [hasTen, setHasTen] = useState(false);

	const editClick = conversation => () => {
		if (
			editText !== '' &&
      edited &&
      conversation.message_reply !== editText.trim()
		) {
			props.editMessage(editText);
		}
	};

	const onEnter = conversation => value => {
		editClick(conversation)(value);
	};

	const editHandler = conversation => () => {
		setEditText(conversation.message_reply);
		setEdited(!edited);
	};

	const setTimer = () => {
		const reply = props.conversations[props.conversations.length - 1];
		if (reply && reply.fulfilled_date && reply.message_reply) {
			const startDate = new Date(reply.fulfilled_date);
			const endDate = new Date();
			const mSeconds = endDate.getTime() - startDate.getTime();
			if (mSeconds > 0 && 900000 - mSeconds > 0) {
				setTimeout(() => {
					setStopEdit(true);
					setEdited(false);
				}, 900000 - mSeconds);
			} else {
				setStopEdit(true);
				setEdited(false);
			}
		}
	};

	const editTimerHandler = () => {
		if (
			props.editMessage &&
      !isEmpty(props.conversations) &&
      props.conversations.length > 0
		) {
			setTimer();
		}
	};

	useEffect(() => {
		editTimerHandler();
	}, []);

	useEffect(() => {
		editTimerHandler();
	}, [props.convCompleted]);

	useEffect(() => {
		setEdited(false);
	}, [props.stopEditable]);

	useEffect(() => {
		if (props.conversations.length > 5) {
			setHasTen(true);
			return;
		}
		let count = 0;
		props.conversations.some(conv => {
			count += 2;
			if (conv.activities) {
				count += conv.activities.length;
			}
			if (count > 10) {
				return true;
			}
			return false;
		});
		if (count > 10) {
			setHasTen(true);
		}
	}, [props.conversations.length]);

	const getActivities = (activity, index, idx, last, length) => {
		return (
			<React.Fragment key={`activity-${index}-${idx}`}>
				<CommentItem
					type={activity.activity_type}
					activityId="00"
					disableAction
					user={activity.activity_from_user}
					time={activity.created_date}
					visible
					commentDetails={{
						amount: activity.activity_details.amount,
						comments: activity.activity_details.Comment,
						fan_rate: activity.activity_details.fan_rate,
						user_image_url:
              activity.activity_type === 'Message Comment'
              	? getUserImage(props?.avatarPhoto)
              	: getUserImage(props?.fanPhoto),
					}}
					classes={{
						root: 'message-wrap',
						comment: 'comment-container',
					}}
					receive={!(activity.activity_type === 'Message Comment')}
					toUp={last && hasTen && idx === length - 1}
					scrollToBottom={props.scrollToBottom}
					scrollToTop={props.scrollToTop}
					celebrity={props.celebrity}
				/>
			</React.Fragment>
		);
	};

	const { Image } = props;
	const renderConversation = (conv, index) => {
		let comment = conv.comments;
		if (
			!isEmpty(conv.comments) &&
      conv.comments.includes('Star cancellation:')
		) {
			const split = conv.comments.split('Star cancellation: ');
			if (split) {
				[, comment] = split;
			}
		}
		const starCancelled = conv.cancelled_by === 'celebrity';
		let upThreshold = 1;
		if (!props.conversations[props.conversations.length - 1].message_reply) {
			upThreshold = 2;
		}
		return (
			<React.Fragment key={conv.booking_id}>
				{!isEmpty(conv.message_request) && (
					<CommentItem
						type="comment"
						activityId="00"
						disableAction
						user={props.fanFirstName}
						time={conv.created_date}
						visible
						commentDetails={{
							comments: conv.message_request,
							user: { image_url: getUserImage(props.fanPhoto) },
						}}
						classes={{
							root: 'message-wrap',
							comment: 'comment-container',
						}}
						receive
						toBottom={hasTen && index === 0}
						scrollToBottom={props.scrollToBottom}
						scrollToTop={props.scrollToTop}
					/>
				)}
				{!isEmpty(conv.message_reply) && (
					<React.Fragment>
						{edited &&
            props.editMessage &&
            props.bookingId === conv.booking_id &&
            !stopEdit ? (
								<EditInput className="edit-input-wrap">
									<CommentBox
										{...props}
										classes={{
											root: 'message-box',
											inputWrapper: 'input-wrapper',
											icon: 'message-icon',
											input: 'message-text',
										}}
										value={editText}
										placeholder=""
										onChange={setEditText}
										onSubmit={onEnter(conv)}
										notSend
									/>
									<Image profileImage={getUserImage(props?.avatarPhoto)} />
								</EditInput>
							) : (
								<CommentItem
									type="comment"
									activityId="00"
									disableAction
									user={props.user}
									time={conv.fulfilled_date}
									visible
									commentDetails={{
										comments: conv.message_reply,
										user: { image_url: getUserImage(props?.avatarPhoto) },
									}}
									classes={{
										root: 'message-wrap',
										comment: 'comment-container',
									}}
									isEditable={
										props.editMessage &&
                  props.bookingId === conv.booking_id &&
                  !stopEdit &&
                  conv.is_editable
									}
									editHandler={editHandler(conv)}
									toUp={
										hasTen &&
                  index === props.conversations.length - upThreshold &&
                  isEmpty(conv.activities)
									}
									scrollToBottom={props.scrollToBottom}
									scrollToTop={props.scrollToTop}
								/>
							)}

						{props.editMessage &&
              props.bookingId === conv.booking_id &&
              !stopEdit &&
              edited && (
							<EditButton>
								<Button
									className="edit-btn"
									secondary
									onClick={editClick(conv)}
									disabled={editText.length < 10}
									isDisabled={editText.length < 10}
								>
									{ t('common.update') }
								</Button>
							</EditButton>
						)}
					</React.Fragment>
				)}

				{!isEmpty(comment) && (
					<CommentItem
						type="comment"
						activityId="00"
						disableAction
						user={starCancelled ? props.user : props.fanFirstName}
						time={conv.created_date}
						visible
						commentDetails={{
							comments: starCancelled
								? t('common.dm.cancelReason', { request: conv.message_request, comment })
								: `${
									props.isStarview
										? t('common.dm.declineReasonFan', { purchaser: entityData?.partnerData?.purchaser_singular_name })
										: t('common.dm.declineReasonStar', { request: conv.message_request })
								}`,
							user: {
								image_url: getUserImage(
									starCancelled ? props?.avatarPhoto : props.fanPhoto,
								),
							},
						}}
						classes={{
							root: 'message-wrap',
							comment: 'comment-container',
						}}
						receive={!starCancelled}
						toUp={
							hasTen &&
              index === props.conversations.length - upThreshold &&
              isEmpty(conv.activities)
						}
						scrollToBottom={props.scrollToBottom}
						scrollToTop={props.scrollToTop}
					/>
				)}

				{!isEmpty(conv.activities) &&
          conv.activities.length > 0 &&
          conv.activities.map((comm, idx) =>
          	getActivities(
          		comm,
          		index,
          		idx,
          		index === props.conversations.length - 1,
          		conv.activities.length,
          	),
          )}
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			{!isEmpty(props.conversations) &&
        props.conversations.length > 0 &&
        props.conversations.map((conv, index) =>
        	renderConversation(conv, index),
        )}
		</React.Fragment>
	);
};

Conversation.propTypes = {
	avatarPhoto: PropTypes.object.isRequired,
	fanPhoto: PropTypes.object.isRequired,
	conversations: PropTypes.array.isRequired,
	user: PropTypes.string.isRequired,
	fanFirstName: PropTypes.string.isRequired,
	editMessage: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	bookingId: PropTypes.string.isRequired,
	Image: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	convCompleted: PropTypes.bool,
	stopEditable: PropTypes.bool,
	editable: PropTypes.bool,
	isStarview: PropTypes.bool,
	scrollToBottom: PropTypes.func,
	scrollToTop: PropTypes.func,
};

Conversation.defaultProps = {
	editMessage: false,
	Image: false,
	convCompleted: false,
	stopEditable: false,
	editable: false,
	isStarview: false,
	scrollToBottom: () => {},
	scrollToTop: () => {},
};

export default Conversation;
