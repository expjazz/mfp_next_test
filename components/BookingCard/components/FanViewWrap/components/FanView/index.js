import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Scrollbars from 'react-custom-scrollbars';
import { isEmpty } from 'src/utils/dataStructures';
import fitty from 'fitty';
// import { requestTypesKeys } from 'src/constants/requestTypes';
import Button from '../../../../..//SecondaryButton';
// import { FlexBoxSB } from 'styles/CommonStyled';
// import { purchaseUrl } from 'constants/url';
import { purchaseUrl } from '../../../../../../src/constants/url';
import {
  openStatusList,
  completedStatusList,
} from '../../../../../../src/constants/requestStatusList';
// import { generateSmsTitle } from 'src/utils/dataToStringFormatter';
// import { setVideoViewStatus } from 'src/services/myfanpark/bookingActions';
// import DownloadHandler from 'components/DownloadHandler';
// import { useMedia } from 'customHooks/domUtils';
// import { addVideoComment } from 'services/addVideoComment';
// import CommentListing from 'components/CommentListing';
// import { updateCelebrityShare } from 'services';
import ActionBar from '../../../../../ActionBar';
// import VideoRender from 'components/VideoRender';
import Messages from './components/Messages';
import SocialMedia from './components/Social';
import { noVideoRequest } from '../../constants';
import FunStuff from './components/FunStuff';
import Products from './components/Products';
import Commercial from './components/Commercial';
import { starNameSizes } from './constants';
import BookingStyled from '../../styled';
import FanViewStyled, { VideoWrapper } from './styled';
import { requestTypesKeys } from '../../../../../../src/constants/requestTypes';
import { FlexBoxSB } from '../../../../../../styles/CommonStyled';
import { findCompletedVideo } from '../../../../../../src/utils/dataformatter';
import { generateSmsTitle } from '../../../../../../src/utils/dataToStringFormatter';
import DownloadHandler from '../../../../../DownloadHandler';
import { useMediaQuery } from '@material-ui/core';
import VideoRender from '../../../../../VideoRender';
import { useQuery } from 'react-query';
import { fetchActivitiesList } from '../../../../../../src/services/myfanpark';
import CommentListing from '../../../../../../components/CommentListing'
import { useGeneral } from '../../../../../../src/context/general';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { addVideoComment } from 'src/services/addVideoComment';
import { locStorage } from 'src/utils/localStorageUtils';
import { useRouter } from 'next/router';
const setVideoViewStatus = () => {}
const updateCelebrityShare = () => {}
const FanView = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const [state, dispatch] = useGeneral()
  const { data: fanData } = useFetchLoggedUser()
  const { modals: { bookingModal } } = state
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [requestType, updateRequestType] = useState('completed');
  const [finalVideo, setFinalVideo] = useState('');
  const [isReaction, setReactionFlag] = useState(false);
  const [isBookingStar, updateBookingStar] = useState(fanData && bookingData && (fanData?.user?.id === bookingData?.celebrity_id));
  const [videoId, updateVideoId] = useState('');
  const [reactionVideo, setReactionVideo] = useState('');
  const [video, setVideo] = useState('');
  const { bookingData } = props;
  const {data: activitiesList, error: activitiesListError, isLoading: activitiesListLoading} = useQuery(['tempActivitiesList', bookingData.id, bookingModal, bookingData], () => fetchActivitiesList(bookingData.id, 0, 10, true, {isPublic: props.bookingModal?.data?.isPublic, isAll: isMobile, isBookingId: true}))
  if (activitiesListError) {
    console.log(activitiesListError)
    // alert(activitiesListError.message)
  }
  useEffect(() => {
    const completedVideo = findCompletedVideo(bookingData);
    setFinalVideo(completedVideo);
    updateVideoId(completedVideo.video_id);
    // updateBookingStar(props.userId === bookingData.celebrity_id);
    // if (isMobile) {
    //   props.fetchActivitiesList(bookingData.booking_id, 0, true, {
    //     isBookingId: true,
    //     isPublic: bookingModal.isPublic,
    //     isAll: true,
    //   });
    // } else {
    //   props.fetchActivitiesList(bookingData.booking_id, 0, true, {
    //     isBookingId: true,
    //     isPublic: bookingModal.isPublic,
    //   });
    // }
    // if (!bookingModal.isPublic) {
      // setVideoViewStatus(completedVideo.video_id);
    // }

    if (bookingModal.reactionUrl) {

      if (noVideoRequest.indexOf(bookingData.request_type) < 0) {
        props.setReaction({
          s3_video_url:
            bookingModal.reactionType === 2 && bookingModal.reactionUrl,
          type: bookingModal.reactionType === 1 && 'image',
          isReaction: true,
          status: bookingModal.status,
          s3_thumbnail_url:
            bookingModal.reactionType === 2
              ? bookingModal.reactionThumbnail
              : bookingModal.reactionUrl,
        });
      } else {
        setReactionFlag(true);
        setReactionVideo({
          s3_video_url:
            bookingModal.reactionType === 2 && bookingModal.reactionUrl,
          type: bookingModal.reactionType === 1 && 'image',
          isReaction: true,
          status: bookingModal.status,
          s3_thumbnail_url:
            bookingModal.reactionType === 2
              ? bookingModal.reactionThumbnail
              : bookingModal.reactionUrl,
        });
      }
    } else {
      setReactionFlag(false);
    }
    setVideo(findCompletedVideo(bookingData));
    if (openStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('open');
    } else if (completedStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('completed');
    } else {
      updateRequestType('cancelled');
    }
    return () => {
      // props.resetActivitiesList();
    };
  }, [bookingData.id]);

  const autoFitText = () => {
    try {
      if (document.getElementById(`card-star-name`)) {
        fitty(`#card-star-name`, {
          minSize: starNameSizes.minNameSize,
          maxSize: starNameSizes.maxNameSize,
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    autoFitText();
  }, [bookingData.celebrity, isMobile]);

  const onReactionClick = (fileUrl, thumbnail, type) => {
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

  const fetchActivity = (offset, refresh) => {
    props.fetchActivitiesList(props.bookingData.id, offset, refresh, {
      isBookingId: true,
      isPublic: bookingModal.data?.isPublic,
    });
  };

  const onSelectAction = option => {
    if (option.value === 'contact') {
      props.toggleContactSupport(true);
    } else if (option.value === 'download') {
      const completedVideo = findCompletedVideo(bookingData);
      props.downloadFunc(
        completedVideo.download_url || completedVideo.s3_video_url,
        bookingData.booking_title,
      );
    }
  };

  const bookStar = type => () => {
    router.push(
      `/${props.bookingData.celebrity_vanity}${purchaseUrl[type]}`,
    );
    props.toggleBookingModal(false);
  };

  const beforeShare = type => {
    return updateCelebrityShare('video', {
      bookingId: bookingData.booking_id,
      type,
    });
  };

  const submitComment = async comment => {
    if (!props.isLoggedIn) {
      props.toggleLogin(true);
      props.toggleBookingModal(true, { ...bookingModal, comment }, false);
    } else {
      props.loaderAction(true);
      try {
        const response = await addVideoComment(
          videoId,
          comment,
          bookingData.booking_id,
        );
        const success = response && response.success;
        if (isMobile && success) {
          // props.fetchActivitiesList(bookingData.booking_id, 0, true, {
          //   isBookingId: true,
          //   isPublic: bookingModal.data?.isPublic,
          //   isAll: true,
          // });
        } else if (success) {
          // props.fetchActivitiesList(bookingData.booking_id, 0, true, {
          //   isBookingId: true,
          //   isPublic: bookingModal.data?.isPublic,
          // });
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
    }
  };

  const onCompleteAction = (type, data) => {
    if (type === 'comment') {
      submitComment(data);
    } else if (type === 'tip') {
      locStorage.setItem(
        'req_data',
        {
          returnUrl: window.location.pathname,
          amount: data,
          bookingId: props.bookingData.id,
          noback: true,
          userId: props.bookingData.celebrity_vanity,
          promoCode: {},
        },
      );
      props.toggleBookingModal(false);
      router.push({
        pathname: `/${props.bookingData.celebrity_vanity}/tip`,
      });
    } else {
      props.onCompleteAction(type, data);
    }
  };
  const getActionBar = () => {
    return (
      <ActionBar
        initialSelection
        bookingId={bookingData.booking_id}
        disableRating={isBookingStar || bookingData.has_rating}
        disableReaction={isBookingStar || bookingData.has_reaction}
        disableComment={bookingData.has_comment && !isBookingStar}
        disableTips={isBookingStar}
        onAction={onCompleteAction}
        beforeShare={beforeShare}
        actionActive={() => {}}
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
      />
    );
  };

  const toggleReaction = state => () => {
    setReactionFlag(state);
  };

  const renderOrderText = (callProps = {}) => {
    return (
      <BookingStyled.OrderText
        onClick={props.toggleDetails(true)}
        starMode={false}
      >
        {callProps.text ? callProps.text : t('common.orderDetails')}
      </BookingStyled.OrderText>
    );
  };


  const renderCommentList = (callProps = {}) => {
    return (!activitiesListLoading && !activitiesListError) &&
      activitiesList?.count ? (
      <BookingStyled.CommentList
        starMode={false}
        isPublic={
          callProps.isPublic ? callProps.isPublic : bookingModal.data?.isPublic
        }
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
            dataList={activitiesList?.recent_activities}
            noDataText={t('common.no_comments_yet')}
            disableAction
            celebrityId={bookingData.celebrity_id}
            loading={activitiesListLoading}
            offset={0}
            fetchData={fetchActivity}
            onReactionClick={
              callProps.onReactionClick
                ? callProps.onReactionClick
                : onReactionClick
            }
            totalCount={activitiesList ? 0 : 0}
            limit={10}
            isPublic
          />
        </Scrollbars>
      </BookingStyled.CommentList>
    ) : null;
  };

  const currentVideo = isReaction ? reactionVideo : video;

  if (
    bookingData &&
    bookingData.request_type === requestTypesKeys.message &&
    !isEmpty(bookingData.direct_message_details)
  ) {
    return (
      <Messages
        bookingData={bookingData}
        requestType={requestType}
        closeModal={props.closeModal}
        updateFormBuilderProps={props.updateFormBuilderProps}
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
        entityData={entityData?.partnerData}
        currencyData={props.currencyData}
        userDetails={props.userDetails}
        language={props.language}
        history={props.history}
        toggleBookingModal={props.toggleBookingModal}
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
        isBookingStar={isBookingStar}
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        onCompleteAction={onCompleteAction}
        toggleContactSupport={props.toggleContactSupport}
        entityData={entityData?.partnerData}
        currencyData={props.currencyData}
        userDetails={props.userDetails}
        loaderAction={props.loaderAction}
        updateToast={props.updateToast}
        language={props.language}
        history={props.history}
        toggleBookingModal={props.toggleBookingModal}
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
        isBookingStar={isBookingStar}
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        onCompleteAction={onCompleteAction}
        toggleContactSupport={props.toggleContactSupport}
        updateToast={props.updateToast}
        entityData={entityData?.partnerData}
        currencyData={props.currencyData}
        userDetails={props.userDetails}
        loaderAction={props.loaderAction}
        language={props.language}
        history={props.history}
        toggleBookingModal={props.toggleBookingModal}
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
        isBookingStar={isBookingStar}
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        onCompleteAction={onCompleteAction}
        toggleContactSupport={props.toggleContactSupport}
        updateToast={props.updateToast}
        entityData={entityData?.partnerData}
        currencyData={props.currencyData}
        userDetails={props.userDetails}
        loaderAction={props.loaderAction}
        language={props.language}
        history={props.history}
        toggleBookingModal={props.toggleBookingModal}
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
        isBookingStar={isBookingStar}
        renderOrderText={renderOrderText}
        renderCommentList={renderCommentList}
        onCompleteAction={onCompleteAction}
        toggleContactSupport={props.toggleContactSupport}
        entityData={entityData?.partnerData}
        currencyData={props.currencyData}
        userDetails={props.userDetails}
        loaderAction={props.loaderAction}
        updateToast={props.updateToast}
        language={props.language}
        history={props.history}
        toggleBookingModal={props.toggleBookingModal}
      />
    );
  }

  return (
    <VideoWrapper>
      <FanViewStyled>
        <BookingStyled.Layout
          starMode={false}
          isPublic={bookingModal.data?.isPublic}
        >
          <BookingStyled.LeftSection>
            <FanViewStyled.VideoWrapper
              isPublic={bookingModal.data?.isPublic}
              hasReaction={!isEmpty(reactionVideo)}
            >
              {!isEmpty(reactionVideo) && (
                <BookingStyled.TabWrapper>
                  <BookingStyled.TabSwitcher
                    className="star-video"
                    selected={!isReaction}
                    onClick={toggleReaction(false)}
                  >
                    {t('common.talentVideo', {
                      talent: entityData?.partnerData.talent_singular_name,
                    })}
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
                noBorder
                autoPlay
                videoSrc={currentVideo.s3_video_url}
                cover={currentVideo.s3_thumbnail_url}
                onVideoEnded={props.onVideoEnded}
                onVideoStart={props.onVideoStart}
              />
              {video && (
                <section className="action-bar-mob">{getActionBar()}</section>
              )}
            </FanViewStyled.VideoWrapper>
            <FlexBoxSB className="video-footer">
              {!bookingModal.data?.isPublic ? null : (
                <React.Fragment>
                  <span className="star-name-wrap">
                    <span id="card-star-name" className="star-name">
                      {bookingData.celebrity}
                    </span>
                  </span>
                  {!props.isStar &&
                    bookingData.request_type !==
                      requestTypesKeys.commercial && (
                      <Button
                        className="book-btn"
                        onClick={bookStar(bookingData.request_type)}
                      >
                        {t('common.bookNow')}
                      </Button>
                    )}
                </React.Fragment>
              )}
            </FlexBoxSB>
          </BookingStyled.LeftSection>
          <BookingStyled.RightSection>
            <FanViewStyled.DetailWrapper isPublic={bookingModal.isPublic}>
              {video && (
                <section className="action-bar-web">{getActionBar()}</section>
              )}
            </FanViewStyled.DetailWrapper>
            {renderCommentList()}
          </BookingStyled.RightSection>
        </BookingStyled.Layout>
      </FanViewStyled>
    </VideoWrapper>
  );
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
  activitiesList: PropTypes.object,
  setReaction: PropTypes.func.isRequired,
  onCompleteAction: PropTypes.func,
  updateRequestData: PropTypes.func.isRequired,
  resetActivitiesList: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  onVideoEnded: PropTypes.func.isRequired,
  onVideoStart: PropTypes.func.isRequired,
  updateFormBuilderProps: PropTypes.func.isRequired,
  toggleRequestFlow: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  getSuccess: PropTypes.func,
  scrollRef: PropTypes.object,
  setTabHeadHide: PropTypes.func,
  showModalSuccess: PropTypes.func,
  currencyData: PropTypes.object,
  userDetails: PropTypes.object.isRequired,
  language: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default DownloadHandler(FanView);
