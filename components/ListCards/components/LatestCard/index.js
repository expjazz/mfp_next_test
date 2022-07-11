import React, { useMemo, useState } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Card, TickText } from 'styles/CommonStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getFor } from 'src/utils/dataformatter';
import OrderDetails from '../../../OrderDetails';
import QuickComment from '../../../QuickComment';
import PrimaryButton from '../../../PrimaryButton';
import { requestTypes } from 'src/constants/requestTypes';
import { findCompletedVideo } from 'src/utils/dataformatter';
// import { toggleBookingModal } from '../../../../store/shared/actions/toggleModals';
import {
  HeadingBold,
  FlexColumn,
  LightHeading,
  LeftContent,
  NewBanner,
} from '../../styled';
import CommentItem from '../../../CommentItem';
import { highlightDetails } from './utils';
import StarStyled from './styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { toggleBookingModal, useGeneral } from 'src/context/general';
import { useRouter } from 'next/router';

const LatestCard = props => {
  const router = useRouter()
  const [state, dispatch] = useGeneral()
  const { t } = useTranslation();
  const { activity } = props;
  let { request = {} } = activity;
  const [viewOrders, toggleOrders] = useState(false);
  if (!request) {
    request = {
      fan_unseen: false,
      avatar_photo: activity.fan_image,
    };
  }

  const onViewDetails = () => {
    if (props.getSelected) {
      if (request.fan_unseen && !props.starMode) {
        props.onUpdateActivityCount();
      }
      props.getSelected(request);
      return;
    }
    if (props.type === 'suggesions') {
      router.push(`/manage/storefront/fan-suggestions`);
    } else if (props.type === 'Commercial Request' && props.starMode) {
      router.push(
        `/manage/bookings?type=open&selected=${request.booking_id}`,
      );
    } else if (!props.starMode && props.type === 'Commercial Request') {
      toggleOrderDetails(true)();
    } else {
      toggleBookingModal(dispatch,
        true,
        { ...request, id: request.id },
        props.starMode,
      );
    }
  };

  const renderHeading = () => {
    switch (props.type) {
      case 'suggesions':
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={faComment} className="icons icon-comment" />
            <span className="activity desktop">
              {t('latestcard.new_suggestion')}
            </span>
            <span className="activity mobile">
              {t('latestcard.new_suggestion')}
            </span>
          </React.Fragment>
        );
      case 'Message':
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={faComment} className="icons icon-comment" />
            <span className="activity desktop">
              {t('latestcard.message_reply')}
            </span>
            <span className="activity mobile">
              {t('latestcard.message_reply')}
            </span>
          </React.Fragment>
        );
      case 'comment':
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={faComment} className="icons icon-comment" />
            <span className="activity desktop">
              {t('latestcard.new_comment_about')}
            </span>
            <span className="activity mobile">
              {t('latestcard.new_comment')}
            </span>
          </React.Fragment>
        );
      case 'reaction':
        return (
          <React.Fragment>
            <FontAwesomeIcon icon={faHeart} className="icons icon-heart" />
            <span className="activity desktop">
              {t('latestcard.reaction_video_about')}
            </span>
            <span className="activity mobile">
              {t('latestcard.video_about')}
            </span>
          </React.Fragment>
        );
      case 'tip':
        return (
          <React.Fragment>
            <span className="icons icon-tip">$</span>
            <span className="activity desktop">
              {t('latestcard.new_tip_for')}
            </span>
            <span className="activity mobile">{t('latestcard.new_tip')}</span>
          </React.Fragment>
        );
      case 'rating':
        return (
          <React.Fragment>
            <span className="icons icon-rating">★</span>
            <span className="activity desktop">
              {t('latestcard.new_rating_for')}
            </span>
            <span className="activity mobile">
              {t('latestcard.new_rating')}
            </span>
          </React.Fragment>
        );
      case 'Commercial Request':
        if (props.starMode) {
          return (
            <React.Fragment>
              <span className="activity desktop">
                {t('latestcard.needs_attention')}
              </span>
              <span className="activity mobile">
                {t('latestcard.needs_attention_cap')}
              </span>
            </React.Fragment>
          );
        }
        return null;
      default:
        return null;
    }
  };

  const checkOther = occasion => {
    if (request.occasion_id !== 18 && request.occasion_id !== 24) {
      return (
        <HeadingBold>
          {
            t('common.bookingPopup.titleGenerator1', {
              occasion: request.occasion,
              type: occasion,
              for: getFor(request)
            })
          }
        </HeadingBold>
      );
    }
    let occasionCaps = '';
    if (!isEmpty(occasion))
      occasionCaps = occasion.charAt(0).toUpperCase() + occasion.slice(1);
    return (
      <HeadingBold>
        {
          t('common.bookingPopup.titleGenerator2', {
            type: occasionCaps,
            for: getFor(request)
          })
        }
      </HeadingBold>
    );
  };

  const renderDescription = () => {
    if (props.type === 'suggesions') {
      return (
        <HeadingBold className="card-description">
          {t('latestcard.sug_req_from', {
            name: activity.activity_from_user,
          })}
        </HeadingBold>
      );
    } else if (requestTypes[request.request_type] === 'Q&A') {
      return (
        <HeadingBold className="card-description">
          {t('latestcard.qus_req_from', {
            name: request.fan_first_name,
          })}
        </HeadingBold>
      );
    } else if (requestTypes[request.request_type] === 'Shout-out') {
      return <span className="card-description">{checkOther('shoutout')}</span>;
    } else if (
      activity.activity_type === 'Commercial Request' ||
      requestTypes[request.request_type] === 'Commercial'
    ) {
      return (
        <HeadingBold
          className={`card-description ${
            activity.activity_type === 'Commercial Request' ? 'commercial' : ''
          }`}
        >
          {t('latestcard.com_req_from', {
            name: activity.activity_from_user,
          })}
        </HeadingBold>
      );
    } else if (requestTypes[request.request_type] === 'Message') {
      return (
        <span className="msg-title">
          <Trans
            i18nKey="latestcard.msg_reply"
            values={{
              date: moment(request.completed_date).format('MMMM DD'),
              year: moment(request.completed_date).format('YYYY'),
              celebrity: request.celebrity,
            }}
          >
            On Nov 04th 2020,
            <HeadingBold className="card-description">
              {request.celebrity}
            </HeadingBold>
            replied
          </Trans>
        </span>
      );
    } else if (requestTypes[request.request_type] === 'Social Shout-out') {
      return (
        <HeadingBold className="card-description">
          {t('latestcard.com_req_from', {
            name: request.fan_first_name,
          })}
        </HeadingBold>
      );
    } else if (requestTypes[request.request_type] === 'Social Promotion') {
      return (
        <HeadingBold className="card-description">
          {t('latestcard.promotion_from', {
            name: request.fan_first_name,
          })}
        </HeadingBold>
      );
    } else if (requestTypes[request.request_type] === 'digitalGoods') {
      return (
        <HeadingBold className="card-description">
          {t('latestcard.fun_req_for', {
            name:request.fan_first_name
          })}
        </HeadingBold>
      );
    } else if (requestTypes[request.request_type] === 'Products') {
      return (
        <HeadingBold className="card-description">
          {t('latestcard.fun_req_for', {
            name:request.merch_req_for
          })}
        </HeadingBold>
      );
    }
    return (
      <span className="card-description">{checkOther('announcement')}</span>
    );
  };

  const onReactionClick = (
    reactionUrl,
    reactionThumbnail,
    reactionType,
    status,
  ) => {
    toggleBookingModal(
      dispatch,
      true,
      {
        ...request,
        id: request.id,
        reactionUrl,
        reactionThumbnail,
        reactionType,
        status,
      },
      props.starMode,
    );
  };

  const toggleOrderDetails = state => () => {
    toggleOrders(state);
  };

  const renderComment = () => {
    const type =
      props.type === 'Commercial Request' ||
      props.type === 'Message' ||
      props.type === 'suggesions'
        ? 'comment'
        : props.type;
    const commercialTime = props.starMode
      ? activity.created_date
      : activity.activity_details &&
        activity.activity_details.star_approved_date;
    const commercialUser = props.starMode
      ? activity.activity_from_user
      : activity.activity_to_user;
    const commercialImage = props.starMode
      ? activity.activity_details.user_image_url
      : activity.activity_details.celebrity_image_url;
    const time =
      props.type === 'Commercial Request'
        ? commercialTime
        : activity.activity_details && activity.activity_details.created_date;
    const user =
      props.type === 'Commercial Request'
        ? commercialUser
        : activity.activity_from_user;
    let commentDetails = activity.activity_details;
    if (props.type === 'Commercial Request') {
      commentDetails = {
        comments: props.starMode
          ? activity.activity_details.fan_request
          : activity.activity_details.star_reply,
        user: {
          image_url: commercialImage,
        },
      };
    } else if (props.type === 'Message') {
      commentDetails = {
        comments: props.starMode
          ? activity.activity_details.message_request
          : activity.activity_details.message_reply,
        user: {
          image_url:
            request.avatar_photo &&
            (request.avatar_photo.thumbnail_url ||
              request.avatar_photo.image_url),
        },
      };
    } else if (props.type === 'suggesions') {
      commentDetails = {
        comments: activity.activity_details.suggestion,
        user: {
          image_url: request.avatar_photo,
        },
      };
    }

    return (
      <CommentItem
        type={type}
        user={user}
        time={time}
        commentDetails={commentDetails}
        disableAction
        onMoreClick={onViewDetails}
        commentLimit={65}
        onReactionClick={onReactionClick}
        classes={{ comment: 'comment-section', root: 'comment-root' }}
        receive
      />
    );
  };

  const renderUserImage = () => {
    const commercialPhoto =
      request.avatar_photo &&
      (request.avatar_photo.thumbnail_url || request.avatar_photo.image_url);
    const photo =
      request.fan_photo &&
      (request.fan_photo.thumbnail_url || request.avatar_photo.image_url);
    const userImage =
      props.type === 'Commercial Request' ? commercialPhoto : photo;
    return (
      <StarStyled.UserImage
        className="profile-image"
        imageUrl={userImage}
        starMode={props.starMode}
      />
    );
  };

  const onPrivacyChange = isPublic => {
    const newRequestData = cloneDeep(request);
    newRequestData.public_request = isPublic;
    props.onUpdateData(activity.id, { ...activity, request: newRequestData });
  };

  const onPaymentSuccess = bookingId => {
    props.onPaymentSuccess(bookingId, activity.id);
  };

  const onBookingCancel = () => {
    props.onCancelBooking(activity.id);
  };

  const videoId = useMemo(() => findCompletedVideo(request).video_id, [
    activity.id,
  ]);

  const highDet = highlightDetails(props, request);

  return (
    <Card>
      {viewOrders && (
        <OrderDetails
          isModal
          closeModal={toggleOrderDetails(false)}
          disableFooter
          onCheckboxChange={onPrivacyChange}
          onBookingCancel={onBookingCancel}
          onPaymentSuccess={onPaymentSuccess}
          bookingData={request}
        />
      )}
      <StarStyled
        className="star-container"
        starMode={props.starMode}
        isNew={request.fan_unseen}
        onClick={onViewDetails}
      >
        {highDet && (
          <NewBanner className="new-hightlight" willRotate>
            <span className="new-text">{highDet.text}</span>
          </NewBanner>
        )}
        <StarStyled.LeftWrapper>
          {!props.starMode && renderUserImage()}
          {props.type === 'Commercial Request' && props.starMode && (
            <LeftContent className="left-content desktop">
              <TickText className="tick-text ">{t('common.toDo')}</TickText>
            </LeftContent>
          )}
          <FlexColumn className="description-wrapper">
            <LightHeading className="heading">{renderHeading()}</LightHeading>
            <span
              className="description"
              role="presentation"
              onClick={onViewDetails}
            >
              {renderDescription()}
              {props.type === 'Commercial Request' && !props.starMode && (
                <span
                  className="action-text"
                  role="presentation"
                  onClick={onViewDetails}
                >
                  {t('common.view_details')}
                </span>
              )}
            </span>
          </FlexColumn>
        </StarStyled.LeftWrapper>
        <StarStyled.CommentContainer
          className={`comment-container ${
            !props.starMode &&
            props.type !== 'Commercial Request' &&
            props.type !== 'suggesions'
              ? ''
              : 'no-action-text'
          }`}
          isNew={request.fan_unseen}
          starMode={props.starMode && props.type !== 'Commercial Request'}
          commercialMode={props.type === 'Commercial Request'}
        >
          {renderComment()}
          {props.type !== 'suggesions' &&
            props.starMode &&
            props.type !== 'Commercial Request' &&
            requestTypes[request.request_type] !== 'Message' && (
              <span className="divider">
                <QuickComment
                  fanName={activity.activity_from_user}
                  once
                  videoId={videoId}
                  classes={{ root: 'quick-comment-root' }}
                />
              </span>
            )}
          {!props.starMode && props.type === 'Commercial Request' && (
            <PrimaryButton className="review-btn" onClick={onViewDetails}>
              {t('common.review')}
            </PrimaryButton>
          )}
          {((props.starMode && props.type === 'Commercial Request') ||
            props.type !== 'Commercial Request') &&
            props.type !== 'suggesions' && (
              <span
                className="action-text"
                role="presentation"
                onClick={onViewDetails}
              >
                {t('common.view_req')}
              </span>
            )}
          {props.type === 'suggesions' && (
            <span className="action-text view-suggestion">{t('common.viewAll')}</span>
          )}
        </StarStyled.CommentContainer>
      </StarStyled>
    </Card>
  );
};

LatestCard.defaultProps = {
  starMode: false,
  activity: {},
  onUpdateActivityCount: () => {},
  onUpdateData: () => {},
  onCancelBooking: () => {},
  onPaymentSuccess: () => {},
  getSelected: null,
};

LatestCard.propTypes = {
  type: PropTypes.string.isRequired,
  starMode: PropTypes.bool,
  activity: PropTypes.object,
  onUpdateActivityCount: PropTypes.func,
  history: PropTypes.object.isRequired,
  onUpdateData: PropTypes.func,
  onCancelBooking: PropTypes.func,
  onPaymentSuccess: PropTypes.func,
  getSelected: PropTypes.oneOfType([PropTypes.func, null]),
};

// const mapDispatchToProps = dispatch => ({
//   toggleBookingModal: (state, bookingData, starMode) =>
//     dispatch(toggleBookingModal(state, bookingData, starMode)),
// });

const LatestCardComponent = LatestCard

export { LatestCardComponent as LatestCard };
