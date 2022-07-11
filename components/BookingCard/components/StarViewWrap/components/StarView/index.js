import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import Scrollbars from 'react-custom-scrollbars';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { canStarShare } from 'src/utils/timeUtils';
import { findCompletedVideo } from 'src/utils/dataformatter';
import { generateSmsTitle } from 'src/utils/dataToStringFormatter';
import CommentBox from 'components/CommentBox';
// import { addVideoComment } from 'services/addVideoComment';
import CommentListing from 'components/CommentListing';
import { useMedia } from 'customHooks/domUtils';
import { updateCelebrityShare } from 'src/services';
import Loader from 'components/Loader';
import QuickComment from 'components/QuickComment';
import VideoRender from 'components/VideoRender';
import Share from 'components/Share';
import Messages from './components/Messages';
import SocialMedia from './components/Social';
import FunStuff from './components/FunStuff';
import Products from './components/Products';
import Commercial from './components/Commercial';
import { noVideoRequest } from '../../constants';
import BookingStyled from '../../styled';
import StarViewStyled, { VideoWrapper } from './styled';
import { addVideoComment } from 'src/services/addVideoComment';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useQueryClient } from 'react-query';

const StarView = props => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 831px)');
  const [videoId, updateVideoId] = useState('');
  const [finalVideo, setFinalVideo] = useState('');
  const [video, setVideo] = useState('');
  const [isReaction, setReactionFlag] = useState(false);
  const [reactionVideo, setReactionVideo] = useState('');
  const { bookingData } = props;

  const requestDetails = bookingData.request_details || {};

  useEffect(() => {
    setFinalVideo(findCompletedVideo(bookingData));
    updateVideoId(findCompletedVideo(bookingData).video_id);
    if (isMobile) {
      props.fetchActivitiesList(bookingData.booking_id, 0, true, {
        isAll: true,
        isBookingId: true,
      });
    } else {
      props.fetchActivitiesList(bookingData.booking_id, 0, true, {
        isBookingId: true,
      });
    }
    if (props.modalData.reactionUrl) {
      if (noVideoRequest.indexOf(bookingData.request_type) < 0) {
        props.setReaction({
          s3_video_url:
            props.modalData.reactionType === 2 && props.modalData.reactionUrl,
          type: props.modalData.reactionType === 1 && 'image',
          isReaction: true,
          status: props.modalData.status,
          s3_thumbnail_url:
            props.modalData.reactionType === 2
              ? props.modalData.reactionThumbnail
              : props.modalData.reactionUrl,
        });
      } else {
        setReactionFlag(true);
        setReactionVideo({
          s3_video_url:
            props.modalData.reactionType === 2 && props.modalData.reactionUrl,
          type: props.modalData.reactionType === 1 && 'image',
          isReaction: true,
          status: props.modalData.status,
          s3_thumbnail_url:
            props.modalData.reactionType === 2
              ? props.modalData.reactionThumbnail
              : props.modalData.reactionUrl,
        });
      }
    } else {
      setReactionFlag(false);
    }
    setVideo(findCompletedVideo(bookingData));
  }, [props.bookingData.id]);

  const canShare = useMemo(() => {
    return canStarShare(requestDetails.date);
  }, [requestDetails.date && requestDetails.date]);

  const onReactionClick = (fileUrl, thumbnail, type, status) => {
    if (noVideoRequest.indexOf(bookingData.request_type) < 0) {
      props.setReaction({
        s3_video_url: fileUrl,
        type: type === 1 && 'image',
        isReaction: true,
        s3_thumbnail_url: type === 2 ? thumbnail : fileUrl,
      });
    } else {
      setReactionFlag(true);
      setReactionVideo({
        s3_video_url: fileUrl,
        type: type === 1 && 'image',
        isReaction: true,
        s3_thumbnail_url: type === 2 ? thumbnail : fileUrl,
      });
    }
  };

  const toggleReaction = state => () => {
    setReactionFlag(state);
  };

  const fetchActivity = (offset, refresh) => {
    props.fetchActivitiesList(props.bookingData.id, offset, refresh, {
      isBookingId: true,
    });
  };

  const onQuickComment = () => {
    if (isMobile) {
      props.fetchActivitiesList(bookingData.booking_id, 0, true, {
        isAll: true,
        isBookingId: true,
      });
    } else {
      props.fetchActivitiesList(bookingData.booking_id, 0, true, {
        isBookingId: true,
      });
    }
  };

  const beforeShare = (type) => {
    return updateCelebrityShare('video', { bookingId: bookingData.booking_id, type });
  };

  const queryClient = useQueryClient()

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
          isAll: true,
          isBookingId: true,
        });
        queryClient.refetchQueries(['fan-act-list'])
      } else if (success) {
        props.fetchActivitiesList(bookingData.booking_id, 0, true, {
          isBookingId: true,
        });
        queryClient.refetchQueries(['fan-act-list'])
      } else {
        throw new exception();
      }
      props.loaderAction(false);
    } catch (exception) {
      props.loaderAction(false);
      props.updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
      });
    }
  };

  const renderCommentList = (callProps = {}) => {
    return (!props.activitiesList?.data?.length &&
      props.activitiesList.loading) ||
      props.activitiesList?.data?.length ? (
      <BookingStyled.CommentList className="comment-wrapper" starMode>
        <Scrollbars
          autoHide
          renderView={scrollProps => (
            <div {...scrollProps} id="comments-scroll-target" />
          )}
        >
          <CommentListing
            notCenter
            classes={{
              root: 'comment-listing-root',
            }}
            scrollTarget="comments-scroll-target"
            dataList={props.activitiesList.data}
            noDataText={t('common.no_comments_yet')}
            celebrityId={bookingData.celebrity_id}
            loading={props.activitiesList.loading}
            offset={props.activitiesList.offset}
            fetchData={fetchActivity}
            onReactionClick={onReactionClick}
            totalCount={props.activitiesList.count}
            limit={props.activitiesList.limit}
            customLoader
          />
        </Scrollbars>
      </BookingStyled.CommentList>
    ) : null;
  };

  const renderOrderText = (callProps = {}) => {
    return (
      <BookingStyled.OrderText starMode onClick={props.toggleDetails(true)}>
        {callProps.text ? callProps.text : t('common.orderDetails')}
      </BookingStyled.OrderText>
    );
  };

  if (
    bookingData &&
    bookingData.request_type === requestTypesKeys.message &&
    !isEmpty(bookingData.direct_message_details)
  ) {
    return (
      <Messages
        bookingData={bookingData}
        toggleDetails={props.toggleDetails}
        loaderAction={props.loaderAction}
        updateToast={props.updateToast}
      ></Messages>
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
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        submitComment={submitComment}
        onQuickComment={onQuickComment}
        loaderAction={props.loaderAction}
        updateToast={props.updateToast}
        loading={props.activitiesList.loading}
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
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        submitComment={submitComment}
        onQuickComment={onQuickComment}
        loaderAction={props.loaderAction}
        updateToast={props.updateToast}
        loading={props.activitiesList.loading}
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
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        submitComment={submitComment}
        onQuickComment={onQuickComment}
        loaderAction={props.loaderAction}
        updateToast={props.updateToast}
        loading={props.activitiesList.loading}
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
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        submitComment={submitComment}
        onQuickComment={onQuickComment}
        loaderAction={props.loaderAction}
        updateToast={props.updateToast}
        carriers={props.carriers}
        loading={props.activitiesList.loading}
      />
    );
  }
  const currentVideo = isReaction ? reactionVideo : video;
  return (
    <VideoWrapper>
      <StarViewStyled>
        <BookingStyled.Layout starMode>
          <BookingStyled.LeftSection>
            <StarViewStyled.VideoWrapper hasReaction={!isEmpty(reactionVideo)}>
              {!isEmpty(reactionVideo) && (
                <BookingStyled.TabWrapper>
                  <BookingStyled.TabSwitcher
                    className="star-video"
                    selected={!isReaction}
                    onClick={toggleReaction(false)}
                  >
                    {t('common.talentVideo', { talent: entityData?.partnerData?.talentSingle })}
                  </BookingStyled.TabSwitcher>
                  <BookingStyled.TabSwitcher
                    className="reaction-video"
                    disabled={isEmpty(reactionVideo)}
                    selected={isReaction}
                    onClick={toggleReaction(true)}
                  >
                    {t('common.reaction_video')}
                  </BookingStyled.TabSwitcher>
                </BookingStyled.TabWrapper>
              )}
              <VideoRender
                classes={{
                  container: 'video-container',
                }}
                variableWidth
                variableHeight
                type={currentVideo.type}
                videoStatus={currentVideo.status}
                noBorder
                videoSrc={currentVideo.s3_video_url}
                cover={currentVideo.s3_thumbnail_url}
              />
            </StarViewStyled.VideoWrapper>
          </BookingStyled.LeftSection>
          <BookingStyled.RightSection starMode>
            {bookingData.public_request && (
              <StarViewStyled.DetailWrapper>
                <Share
                  className="action-btn"
                  title={t('common.check_video',{celebrity:bookingData.celebrity})}
                  smsTitle={generateSmsTitle(bookingData)}
                  buttonText={t('common.share_video')}
                  fullShareUrl
                  body={t('common.personalized_video',{celebrity:bookingData.celebrity})}
                  beforeShare={beforeShare}
                  disabled={!canShare}
                  secondary
                  buttonTooltip={
                    !canShare
                      ? t('common.share_video_tootip')
                      : ''
                  }
                  downloadUrl={finalVideo.download_url || finalVideo.s3_video_url}
                  downloadName={bookingData.booking_title}
                  shareUrl={finalVideo.video_url || ''}
                />
              </StarViewStyled.DetailWrapper>
            )}
            {renderCommentList()}
            <StarViewStyled.CommentWrapper>
              <CommentBox
                maxLength={104}
                thresholdLimit={97}
                classes={{ root: 'comment-box' }}
                onSubmit={submitComment}
              />
              <QuickComment
                bookingId={bookingData.booking_id}
                fanName={bookingData.fan_first_name}
                videoId={videoId}
                onSubmit={onQuickComment}
                classes={{ root: 'quick-comment' }}
              />
            </StarViewStyled.CommentWrapper>
            {props.activitiesList.loading && <Loader />}
          </BookingStyled.RightSection>
        </BookingStyled.Layout>
      </StarViewStyled>
    </VideoWrapper>
  );
};

StarView.defaultProps = {
  modalData: {},
  activitiesList: {},
  carriers: [],
};

StarView.propTypes = {
  bookingData: PropTypes.object.isRequired,
  fetchActivitiesList: PropTypes.func.isRequired,
  toggleDetails: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  modalData: PropTypes.object,
  setReaction: PropTypes.func.isRequired,
  activitiesList: PropTypes.object,
  carriers: PropTypes.array,
};

export default StarView;
