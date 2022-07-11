import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Scrollbars from 'react-custom-scrollbars';
import { isEmpty } from 'src/utils/dataStructures';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { LinkText, HeadingH2 } from 'styles/TextStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import {
	findCompletedVideo,
	numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
import { generateSmsTitle } from 'src/utils/dataToStringFormatter';
import { setVideoViewStatus } from 'src/services/myfanpark/bookingActions';
import DownloadHandler from 'components/DownloadHandler';
// import { addVideoComment } from 'services/addVideoComment';
import CommentListing from 'components/CommentListing';
// import { updateCelebrityShare } from 'services';
import ActionBar from 'components/ActionBar';
import VideoRender from 'components/VideoRender';
import Messages from './components/Messages';
import SocialMedia from './components/Social';
import FunStuff from './components/FunStuff';
import Products from './components/Products';
import Commercial from './components/Commercial';
import BookingStyled from '../../styled';
import FanViewStyled, { VideoWrapper } from './styled';
import { useMediaQuery } from '@material-ui/core';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { addVideoComment } from 'src/services/addVideoComment';
import { updateCelebrityShare } from 'src/services';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const FanView = props => {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [finalVideo, setFinalVideo] = useState('');
	const [videoId, updateVideoId] = useState('');
	const [video, setVideo] = useState('');
	const [tip, setTip] = useState(null);
	const { bookingData } = props;

	useEffect(() => {
		const completedVideo = findCompletedVideo(bookingData);
		setFinalVideo(completedVideo);
		updateVideoId(completedVideo.video_id);
		if (isMobile) {
			props.fetchActivitiesList(bookingData.booking_id, 0, true, {
				isBookingId: true,
				isPublic: false,
				isAll: true,
			});
		} else {
			props.fetchActivitiesList(bookingData.booking_id, 0, true, {
				isBookingId: true,
				isPublic: false,
			});
		}
		setVideoViewStatus(completedVideo.video_id);
		setVideo(findCompletedVideo(bookingData));
		return () => {
			props.resetActivitiesList();
		};
	}, [props.bookingData.id]);

	const fetchActivity = (offset, refresh) => {
		props.fetchActivitiesList(props.bookingData.id, offset, refresh, {
			isBookingId: true,
			isPublic: props.modalData.isPublic,
		});
	};

	const onSelectAction = option => {
		if (option.value === 'download') {
			const completedVideo = findCompletedVideo(bookingData);
			props.downloadFunc(
				completedVideo.download_url || completedVideo.s3_video_url,
				bookingData.booking_title,
			);
		}
	};

	const beforeShare = type => {
		return updateCelebrityShare('video', {
			bookingId: bookingData.booking_id,
			type,
		});
	};

	const submitComment = async comment => {
		props.loaderAction(true);
		try {
			const response = await addVideoComment(
				videoId,
				comment,
				bookingData.booking_id,
			);
			const success = response && response.success;
			if (isMobile && success) {
				props.fetchActivitiesList(bookingData.booking_id, 0, true, {
					isBookingId: true,
					isPublic: false,
					isAll: true,
				});
			} else if (success) {
				props.fetchActivitiesList(bookingData.booking_id, 0, true, {
					isBookingId: true,
					isPublic: false,
				});
			} else {
				throw new exception();
			}
			const newRequestData = { ...bookingData };
			newRequestData.has_comment = true;
			props.updateRequestData(newRequestData);
		} catch (exception) {
			props.updateToast({
				value: true,
				message: exception.response
					? exception.response.data.error.message
					: t('common.something_wrong'),
				variant: 'error',
			});
		}
		props.loaderAction(false);
	};

	const onCompleteAction = (type, data, reqType) => {
		if (type === 'comment') {
			submitComment(data);
		} else if (type === 'tip') {
			setTip(data);
		} else {
			props.onCompleteAction(type, data, reqType);
		}
	};

	const activeTab = props.reaction ? 'React' : '';

	const getActionBar = () => {
		return (
			<ActionBar
				initialSelection
				bookingId={bookingData.booking_id}
				disableRating={bookingData.has_rating}
				disableReaction={bookingData.has_reaction}
				disableComment={bookingData.has_comment}
				onAction={onCompleteAction}
				beforeShare={beforeShare}
				fullShareUrl
				commentDetails={{
					maxLength: 104,
					thresholdLimit: 97,
				}}
				shareDetails={{
					smsTitle: generateSmsTitle(bookingData),
					fullShareUrl: true,
					title: t('common.check_video', { celebrity: bookingData.celebrity }),
					body: t('common.personalized_video', {
						celebrity: bookingData.celebrity,
					}),
					shareUrl: `${finalVideo.video_url || ''}`,
				}}
				onSelectAction={onSelectAction}
				activeTab={activeTab}
			/>
		);
	};

	const renderCommentList = () => {
		return (!props.activitiesList?.data?.length &&
      props.activitiesList.loading) ||
      props.activitiesList?.data?.length ? (
				<BookingStyled.CommentList
					starMode={false}
					noHeight={bookingData.request_type === requestTypesKeys.digitalGoods}
				>
					<Scrollbars
						autoHide
						renderView={scrollProps => (
							<div {...scrollProps} id="comments-scroll-target" />
						)}
					>
						<CommentListing
							notCenter
							scrollTarget="comments-scroll-target"
							dataList={props.activitiesList.data}
							noDataText={t('common.no_comments_yet')}
							disableAction
							celebrityId={bookingData.celebrity_id}
							loading={props.activitiesList.loading}
							offset={props.activitiesList.offset}
							fetchData={fetchActivity}
							totalCount={props.activitiesList.count}
							limit={props.activitiesList.limit}
							isPublic
							celebrity={bookingData.celebrity}
						/>
					</Scrollbars>
				</BookingStyled.CommentList>
			) : null;
	};

	const currentVideo = video;

	if (
		bookingData &&
    bookingData.request_type === requestTypesKeys.message &&
    !isEmpty(bookingData.direct_message_details)
	) {
		return (
			<Messages
				bookingData={bookingData}
				requestType={props.requestType}
				closeModal={props.closeModal}
				toggleRequestFlow={props.toggleRequestFlow}
				toggleDetails={props.toggleDetails}
				fetchCelebDetails={props.fetchCelebDetails}
				onCompleteAction={onCompleteAction}
				toggleContactSupport={props.toggleContactSupport}
				loaderAction={props.loaderAction}
				updateToast={props.updateToast}
				getSuccess={props.getSuccess}
				scrollRef={props.scrollRef}
				setTabHeadHide={props.setTabHeadHide}
				showModalSuccess={props.showModalSuccess}
				updateRequestData={props.updateRequestData}
				entityData={props.entityData}
				currencyData={props.currencyData}
				userDetails={props.userDetails}
				language={props.language}
				history={props.history}
				activeTab={activeTab}
			/>
		);
	}

	if (
		bookingData &&
    (bookingData.request_type === requestTypesKeys.socialShoutout ||
      bookingData.request_type === requestTypesKeys.promotion) &&
    !isEmpty(bookingData.social_request_details)
	) {
		return (
			<SocialMedia
				bookingData={bookingData}
				isPromotion={bookingData.request_type === requestTypesKeys.promotion}
				isBookingStar={false}
				renderCommentList={renderCommentList}
				onCompleteAction={onCompleteAction}
				toggleContactSupport={props.toggleContactSupport}
				loaderAction={props.loaderAction}
				entityData={props.entityData}
				currencyData={props.currencyData}
				userDetails={props.userDetails}
				language={props.language}
				history={props.history}
				activeTab={activeTab}
			/>
		);
	}
	if (
		bookingData &&
    bookingData.request_type === requestTypesKeys.digitalGoods &&
    !isEmpty(bookingData.fun_stuff_request_details)
	) {
		return (
			<FunStuff
				bookingData={bookingData}
				isBookingStar={false}
				renderCommentList={renderCommentList}
				onCompleteAction={onCompleteAction}
				toggleContactSupport={props.toggleContactSupport}
				updateToast={props.updateToast}
				loaderAction={props.loaderAction}
				entityData={props.entityData}
				currencyData={props.currencyData}
				userDetails={props.userDetails}
				language={props.language}
				history={props.history}
				activeTab={activeTab}
			/>
		);
	}
	if (
		bookingData &&
    bookingData.request_type === requestTypesKeys.commercial &&
    !isEmpty(bookingData.commercial_details)
	) {
		return (
			<Commercial
				bookingData={bookingData}
				isBookingStar={false}
				renderCommentList={renderCommentList}
				onCompleteAction={onCompleteAction}
				toggleContactSupport={props.toggleContactSupport}
				updateToast={props.updateToast}
				loaderAction={props.loaderAction}
				entityData={props.entityData}
				currencyData={props.currencyData}
				userDetails={props.userDetails}
				language={props.language}
				history={props.history}
				activeTab={activeTab}
			/>
		);
	}

	if (
		bookingData &&
    bookingData.request_type === requestTypesKeys.products &&
    !isEmpty(bookingData.product_request_details)
	) {
		return (
			<Products
				bookingData={bookingData}
				isBookingStar={false}
				renderCommentList={renderCommentList}
				onCompleteAction={onCompleteAction}
				toggleContactSupport={props.toggleContactSupport}
				loaderAction={props.loaderAction}
				entityData={props.entityData}
				currencyData={props.currencyData}
				userDetails={props.userDetails}
				language={props.language}
				history={props.history}
				activeTab={activeTab}
			/>
		);
	}

	return (
		<VideoWrapper>
			<FanViewStyled>
				<BookingStyled.Layout>
					<BookingStyled.LeftSection>
						<FanViewStyled.VideoWrapper>
							<VideoRender
								classes={{
									container: 'video-container',
								}}
								type={currentVideo.type}
								noBorder
								videoSrc={currentVideo.s3_video_url}
								cover={currentVideo.s3_thumbnail_url}
								onVideoEnded={props.onVideoEnded}
								onVideoStart={props.onVideoStart}
							/>
							{video && !tip && (
								<section className="action-bar-mob">{getActionBar()}</section>
							)}
							<span
								className="dw-links"
								onClick={() => props.downloadFunc(currentVideo.download_url || currentVideo?.s3_video_url)}
								role="presentation"
							>
								<FontAwesomeIcon icon={faDownload} />
								<LinkText className="download">
									{t('common.download_video')}
								</LinkText>
							</span>
						</FanViewStyled.VideoWrapper>
					</BookingStyled.LeftSection>
					<BookingStyled.RightSection className="video-right">
						{!tip && (
							<React.Fragment>
								<FanViewStyled.DetailWrapper>
									<section className="action-bar-web">{getActionBar()}</section>
								</FanViewStyled.DetailWrapper>
								{renderCommentList()}
							</React.Fragment>
						)}
						{tip && (
							<React.Fragment>
								<FontAwesomeIcon
									icon={faArrowLeft}
									onClick={() => {
										setTip(null);
									}}
									className="tip-back"
								/>
								<HeadingH2 className="payment-heading">
									{t('common.payment_details_Cap')}
								</HeadingH2>

								<div className="detail-item">
									<span className="detail-title">{t('common.tip')}</span>
									<span className="detail-value">
										{getLocalSymbol()}
										{numberToDecimalWithFractionTwo(
											getLocalAmount(tip),
											false,
											false,
										)}
									</span>
								</div>

								<div className="detail-item">
									<span className="detail-title head-caps">
										{t('common.total')}
									</span>
									<span className="detail-value val-caps">
										{getLocalSymbol()}
										{numberToDecimalWithFractionTwo(
											getLocalAmount(tip),
											false,
											false,
										)}
									</span>
								</div>

								<Checkout
									promoDetails={{}}
									starData={{
										userData: {
											first_name: props.bookingData.celebrity_first_name,
											user_id: props.bookingData.celebrity_vanity,
											id: props.bookingData.celebrity_id,
										},
										celbData: {
											rate: getLocalAmount(tip),
											charity: props.bookingData.charity,
											bookingPrice: getLocalAmount(tip),
											availability: true,
										},
									}}
									onOptileFail={() => setTip(null)}
									returnUrl={`${window.location.origin}${window.location.pathname}?request_id=${props.bookingData.id}`}
									bookingId={props.bookingData.id}
									deferral="NON_DEFERRED"
									realReturnUrl={`${window.location.origin}${window.location.pathname}?request_id=${props.bookingData.id}`}
									type="tip"
								/>
							</React.Fragment>
						)}
					</BookingStyled.RightSection>
				</BookingStyled.Layout>
			</FanViewStyled>
		</VideoWrapper>
	);
};

FanView.defaultProps = {
	modalData: {},
	activitiesList: {},
	onCompleteAction: () => {},
	getSuccess: () => {},
	scrollRef: {},
	setTabHeadHide: () => {},
	showModalSuccess: () => {},
	requestType: '',
	entityData: {},
	currencyData: {},
	language: {},
	reaction: false,
};

FanView.propTypes = {
	closeModal: PropTypes.func.isRequired,
	bookingData: PropTypes.object.isRequired,
	fetchActivitiesList: PropTypes.func.isRequired,
	toggleContactSupport: PropTypes.func.isRequired,
	toggleDetails: PropTypes.func.isRequired,
	loaderAction: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	modalData: PropTypes.object,
	// eslint-disable-next-line react/no-unused-prop-types
	activitiesList: PropTypes.object,
	onCompleteAction: PropTypes.func,
	updateRequestData: PropTypes.func.isRequired,
	resetActivitiesList: PropTypes.func.isRequired,
	onVideoEnded: PropTypes.func.isRequired,
	onVideoStart: PropTypes.func.isRequired,
	toggleRequestFlow: PropTypes.func.isRequired,
	fetchCelebDetails: PropTypes.func.isRequired,
	getSuccess: PropTypes.func,
	scrollRef: PropTypes.object,
	setTabHeadHide: PropTypes.func,
	showModalSuccess: PropTypes.func,
	requestType: PropTypes.string,
	entityData: PropTypes.object,
	currencyData: PropTypes.object,
	userDetails: PropTypes.object.isRequired,
	language: PropTypes.object,
	history: PropTypes.object.isRequired,
	reaction: PropTypes.bool,
};

export default DownloadHandler(FanView);
