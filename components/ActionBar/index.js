import React, { useState, useEffect } from 'react';
import axios from 'axios';
import i18n from 'i18next';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Tipping from './components/Tipping';
// import Share from '../Share';
// import { sendFeedback } from '../../services/requestFeedback';
// import { awsKeys } from '../../constants';
// import {
//   postReactionMedia,
//   onReactionComplete,
// } from '../../services/postReaction';
// import {
//   loaderAction,
//   updateToast,
// } from '../../store/shared/actions/commonActions';
// import { toggleLogin } from '../../store/shared/actions/toggleModals';
import ReactionUpload from './components/ReactionUpload';
import ToolTip from '../ToolTip';
import CommentBox from '../CommentBox';
import StarRating from '../StarRating';
import {
	ActionStyled,
	ActionList,
	ListItem,
	DropContent,
	List,
	Wrapper,
} from './styled';
import Share from '../Share';
import { awsKeys } from '../../src/constants';
import { useConfigPartner, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { onReactionComplete, postReactionMedia } from 'src/services/postReaction';
import { sendFeedback } from 'src/services/myfanpark/bookingActions';
import { generalLoader, toggleLogin, updateToast, useGeneral } from 'src/context/general';
import { isVodacom, vodacomWebRedirect } from 'customHooks/domUtils';

// const entity = value => value
const ActionBar = props => {
	const { data: configData } = useConfigPartner();
	const { t } = useTranslation();
	const { data: entityData } = useGetPartner();
	const [actionStates, setActionStates] = useState({
		reaction: !props.disableReaction,
		rating: !props.disableRating,
		comment: !props.disableComment,
	});
	const [state, dispatch] = useGeneral();
	const loaderAction = payload => generalLoader(dispatch, payload);
	const localUpdateToast = payload => updateToast(dispatch, { ...payload, global: true });
	const { data: fanData } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const [tempComment, setTempComment] = useState('');
	const [showList, toggleList] = useState(
		(props.activeTab !== '' && actionStates.reaction) || false,
	);
	const [actionSelected, toggleActionSelected] = useState(false);
	const [activeTab, setActiveTab] = useState(props.activeTab || '');
	const [rate, setRate] = useState(0);
	const onAction = type => value => {
		if (type === 'tip') {
			props.onAction(type, value);
		} else if (isLoggedIn) {
			toggleActionSelected(false);
			props.onAction(type, value);
			if (type === 'comment') {
				toggleList(false);
			}
			setTempComment('');
		} else {
			toggleActionSelected(true);
			toggleLogin(dispatch, {active: true, options: { noRedirect: true }});
			if (type === 'comment') {
				setTempComment(value);
			}
		}
		setActiveTab('');
	};

	const getReactionFile = reactionFile => {
		if (isLoggedIn) {
			const fileType = reactionFile.fileType === 'image' ? 1 : 2; // image = 1 video = 2
			loaderAction(true);
			postReactionMedia(
				awsKeys.reactions,
				reactionFile.fileData,
				reactionFile.extension,
				reactionFile.fileType,
			).then(async resp => {
				try {
					await axios.post(resp.url, resp.formData);
					const response = await sendFeedback('reaction', props.bookingId, {
						fileType,
						fileName: resp.fileName,
					});
					loaderAction(false);
					if (response) {
						onAction('reaction')(reactionFile);
						onReactionComplete(props.bookingId);
						localUpdateToast({
							value: true,
							message: t('common.reactionUploadSuccess'),
							variant: 'success',
						});
					}
				} catch (e) {
					console.log(e, 'reaction error');
					loaderAction(false);
					localUpdateToast({
						value: true,
						message: t('common.reactionUploadFail'),
						variant: 'error',
					});
				}
			});
		} else {
			toggleLogin(dispatch, {active: true, options: { noRedirect: true }});
		}
	};

	const submitRate = async () => {
		if (rate > 0) {
			if (isLoggedIn) {
				loaderAction(true);
				try {
					const response = await sendFeedback('rating', props.bookingId, {
						rating: `${rate}`,
					});
					if (response) {
						toggleList(false);
						onAction('rating')(rate);
						setActionStates({
							...actionStates,
							rating: false,
						});
						localUpdateToast({
							value: true,
							message:
                props.rateProps?.onSuccessMsg || t('common.request_rated'),
							variant: 'success',
						});
					}
					setActiveTab('');
				} catch (e) {
					console.log(e, 'rating fail');
					localUpdateToast({
						value: true,
						message: t('common.ratingFail'),
						variant: 'error',
					});
				}
				loaderAction(false);
			} else {
				toggleLogin(dispatch, {active: true, options: { noRedirect: true }});
			}
		}
	};

	const onRate = rating => {
		setRate(rating);
	};

	const toggleDrop = state => () => {
		if (state === 'Share' && isVodacom()) {
			vodacomWebRedirect(`https://${window.location.host}/external/sharer?share_url=${props?.shareDetails?.shareUrl}`);
			return;
		}
		if (state === activeTab) {
			toggleList(false);
			setActiveTab('');
			props?.actionActive(false);
		} else {
			setActiveTab(state);
			if (props.actionActive) {
				props.actionActive(true);
			}
			toggleList(true);
		}
	};

	useEffect(() => {
		setActionStates({
			reaction: !props.disableReaction,
			rating: !props.disableRating,
			comment: !props.disableComment,
		});
	}, [props.disableRating, props.disableReaction, props.disableComment]);

	useEffect(() => {
		if (actionSelected) {
			toggleList(true);
		}
	}, [isLoggedIn]);

	const disabledChk = () => {
		let cnt = 0;
		[props.disableTips, actionStates.rating, actionStates.comment].forEach(
			(value, index) => {
				if ((!value && index !== 0) || (value && index === 0)) {
					cnt += 1;
				}
			},
		);
		return cnt >= 2;
	};

	const reactionChk = disabledChk();
	return (
		<Wrapper activeTab={activeTab !== ''} className="action-parent">
			<ActionStyled className="action-bar">
				<ActionList className="action-list" activeTab={activeTab !== ''}>
					{!props.shareDisable && (
						<ListItem
							onClick={toggleDrop('Share')}
							active={activeTab === 'Share'}
							className="action-list-li"
						>
							{t('common.share')}
						</ListItem>
					)}
					{actionStates.reaction && (
						<ListItem
							onClick={toggleDrop('React')}
							className="action-list-li"
							active={activeTab === 'React'}
						>
							{reactionChk ? t('common.uploadReaction') : t('common.react')}
						</ListItem>
					)}
					{!props.disableTips && (
						<ListItem
							onClick={toggleDrop('Tip')}
							active={activeTab === 'Tip'}
							className="action-list-li"
						>
							{t('common.tip')}
						</ListItem>
					)}
					{actionStates.rating && (
						<ListItem
							onClick={toggleDrop('Rate')}
							active={activeTab === 'Rate'}
							className="action-list-li"
						>
							{t('common.rate')}
						</ListItem>
					)}
					{actionStates.comment && (
						<ListItem
							onClick={toggleDrop('Comment')}
							active={activeTab === 'Comment'}
							className="action-list-li"
						>
							{t('common.comment')}
						</ListItem>
					)}
				</ActionList>

				<DropContent>
					{showList && (
						<List>
							{!props.shareDisable && activeTab === 'Share' && (
								<ToolTip
									title={t('common.actionShareTitle', {
										siteName: entityData?.partnerData.partner_name,
										purchaserPlural: entityData?.partnerData.purchaser_plural_name,
									})}
									placement="top"
								>
									<Share
										className="action-btn"
										beforeShare={props.beforeShare}
										classes={{
											root: 'share-btn',
										}}
										noPopOver
										buttonText={t('common.share_video')}
										alwaysActive
										download
										downloadVideo={props.onSelectAction}
										{...props.shareDetails}
									/>
								</ToolTip>
							)}

							{actionStates.reaction && activeTab === 'React' && (
								<ReactionUpload
									isLoggedIn={isLoggedIn}
									toggleLogin={() => toggleLogin(dispatch, {active: true, options: { noRedirect: true }})}
									getReactionFile={getReactionFile}
								/>
							)}

							{!props.disableTips && activeTab === 'Tip' && (
								<Tipping
									onTipping={onAction('tip')}
									tipAmounts={configData?.tip_amounts.split(',')}
								/>
							)}
							{actionStates.rating && activeTab === 'Rate' && (
								<div className="rating-wrapper">
									<span className="action-title">{t('common.addrating')}</span>
									<StarRating
										onClick={onRate}
										onChange={onRate}
										rootClass="rating-wrap"
										rating={rate}
									/>
									<button className="rate-button" onClick={submitRate}>
										{t('common.submitButton')}
									</button>
								</div>
							)}
							{actionStates.comment && activeTab === 'Comment' && (
								<CommentBox
									{...props.commentDetails}
									value={tempComment}
									classes={{
										root: 'comment-box',
										inputWrapper: 'input-wrapper',
										icon: 'comment-icon',
									}}
									placeholder={t('common.commentOnVideo')}
									onSubmit={onAction('comment')}
								/>
							)}
						</List>
					)}
				</DropContent>
			</ActionStyled>
		</Wrapper>
	);
};


ActionBar.propTypes = {
	placeholder: PropTypes.string,
	disableRating: PropTypes.bool,
	disableReaction: PropTypes.bool,
	disableTips: PropTypes.bool,
	disableComment: PropTypes.bool,
	onAction: PropTypes.func,
	updateToast: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	bookingId: PropTypes.string.isRequired,
	toggleLogin: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	initialSelection: PropTypes.bool,
	beforeShare: PropTypes.func,
	shareDetails: PropTypes.object,
	commentDetails: PropTypes.object,
	onSelectAction: PropTypes.func.isRequired,
	shareDisable: PropTypes.bool,
	rateProps: PropTypes.object,
	actionActive: PropTypes.func,
	activeTab: PropTypes.string,
};

ActionBar.defaultProps = {
	actionActive: () => {},
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
// });

// const mapDispatchToProps = dispatch => ({
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: toastObject => dispatch(updateToast(toastObject)),
//   toggleLogin: (state, options) => dispatch(toggleLogin(state, options)),
// });

export default ActionBar;
