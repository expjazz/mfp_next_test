/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import moment from 'moment';
import PropTypes from 'prop-types';
import { getFor, getUserImage } from 'src/utils/dataformatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLight } from '@fortawesome/pro-light-svg-icons';
import { processingStatus } from 'src/constants/requestStatusList';
import {
  findCompletedVideo,
} from 'src/utils/dataformatter';
import { requestTypes } from 'src/constants/requestTypes';
import { HeadingBold } from '../../styled';
import ToolTip from '../../../ToolTip';
import StarRating from '../../../StarRating';
import CompletedStyled from './styled';
import { isEmpty } from 'src/utils/dataStructures';

const CompletedCard = props => {
  const { t } = useTranslation();
  const [requestVideo, setRequestVideo] = useState({});

  const getImage = () => {
    if (requestVideo.s3_thumbnail_url) {
      return requestVideo.s3_thumbnail_url;
    } else if (
      requestTypes[props.data.request_type] === 'Products' &&
      props.data.product_request_details &&
      props.data.product_request_details.product &&
      props.data.product_request_details.product.product_image &&
      props.data.product_request_details.product.product_image[0]
    ) {
      return props.data.product_request_details.product.product_image[0];
    } else if (requestTypes[props.data.request_type] === 'digitalGoods') {
      if (
        props.data.product_request_details &&
        props.data.fun_stuff_request_details.fun_stuff &&
        props.data.fun_stuff_request_details.fun_stuff.sample_image
      ) {
        return props.data.fun_stuff_request_details.fun_stuff.sample_image;
      }
      return getUserImage(props.data.avatar_photo);
    } else if (
      !processingStatus.find(status => status === props.data.request_status)
    ) {
      return getUserImage(props.data.fan_photo);
    }
    return null;
  };

  const getDescription = (text) => {
    return (
      <HeadingBold>
        {text}
      </HeadingBold>
    );
  };

  const getFrom = () => {
    const requestDetails = props.data.request_details;
    if (
      requestDetails &&
      requestDetails.is_myself !== undefined &&
      props.data.occasion_id !== 18 &&
      props.data.occasion_id !== 24 &&
      !requestDetails.is_myself
    ) {
      const { templateType, stargramto } = requestDetails;
      let { stargramfrom } = requestDetails;
      if (templateType === 7 || templateType === 6) {
        stargramfrom = stargramto;
      }
      if (!isEmpty(stargramfrom))
        return stargramfrom;
    }
    return '';
  };

  const checkOther = () => {
    if (props.data.occasion_id !== 18 && props.data.occasion_id !== 24) {
      return (
        <HeadingBold>
          {
            t(getFrom(props.data) ? 'common.bookingPopup.titleGenerator1_from' : 'common.bookingPopup.titleGenerator1', {
              occasion: props.data.occasion,
              type: requestTypes[props.data.request_type] === 'Shout-out'
              ? t('bookings.shoutout')
              : t('bookings.announcement'),
              for: getFor(props.data),
              from: getFrom(props.data),
            })
          }
        </HeadingBold>
      );
    }
    return (
      <HeadingBold>
        {
          t(getFrom(props.data) ? 'common.bookingPopup.titleGenerator2_from' : 'common.bookingPopup.titleGenerator2', {
            type: requestTypes[props.data.request_type] === 'Shout-out'
            ? t('bookings.shoutout_cap')
            : t('bookings.announcement_cap'),
            for: getFor(props.data),
            from: getFrom(props.data),
          })
        }
      </HeadingBold>
    );
  };

  const renderDescription = () => {
    switch (requestTypes[props.data.request_type]) {
      case 'Q&A':
        return getDescription(t('bookings.completed.question', {
          fan: props.data.fan_first_name,
        }));
      case 'Commercial':
        return getDescription(t('bookings.completed.commercial', {
          fan: props.data.fan_first_name,
        }));
      case 'Message':
        return getDescription(t('bookings.completed.dm', {
          fan: props.data.fan_first_name,
        }));
      case 'Social Shout-out':
        return getDescription(t('bookings.completed.socialInteraction', {
          fan: props.data.fan_first_name,
        }));
      case 'Social Promotion':
        return getDescription(t('bookings.completed.socialProm', {
          fan: props.data.fan_first_name,
        }));
      case 'digitalGoods':
        return getDescription(t('bookings.completed.funItem', {
          fan: props.data.fan_first_name,
        }));
      case 'Products':
        return getDescription(t('bookings.completed.merch', {
          fan: props.data.fan_first_name,
        }));
      default:
        return checkOther();
    }
  };

  useEffect(() => {
    if (props.data.booking_id) {
      setRequestVideo(findCompletedVideo(props.data)); // get completed video
    }
  }, [props.data.booking_id]);

  const onFavoriteClick = event => {
    event.stopPropagation();
    props.onFavoriteClick(props.data.booking_id, requestVideo.video_id);
  };

  return (
    <CompletedStyled
      className={props.classes.root}
      onClick={
        processingStatus.find(status => status === props.data.request_status)
          ? () => {}
          : props.onClick
      }
      isFavorite={props.data.video_favorite}
    >
      <span
        className="favorite-icon"
        onClick={onFavoriteClick}
        role="presentation"
      >
        <FontAwesomeIcon
          icon={props.data.video_favorite ? faHeart : faHeartLight}
        />
      </span>
      <CompletedStyled.Container>
        <section className="thumbnail">
          {processingStatus.find(
            status => status === props.data.request_status,
          ) && (
            <span className="process-label">
              <Trans i18nKey="compact_card.video_is_processing">
                Video is <br /> Processing
              </Trans>
            </span>
          )}
          <CompletedStyled.ProfilePic imageUrl={getImage()} />
        </section>
        <CompletedStyled.DetailsWrapper>
          <div className="details-header">
            <span className="date">
              {moment(props.data.created_date).format('MMM D, YYYY')}
            </span>
            {props.data.fan_rating && (
              <StarRating
                readOnly
                ratingClass="rating"
                rating={props.data.fan_rating.fan_rate}
              />
            )}
          </div>
          <span className="description">{renderDescription()}</span>
          {props.data.practice_booking && (
            <ToolTip title={t('compact_card.sample_title')}>
              <span className="sample-label">
                {t('compact_card.sample_booking')}
              </span>
            </ToolTip>
          )}
          <div className="action-section">
            <ToolTip
              title={t('compact_card.video_title', {
                comment: props.data.comments,
              })}
            >
              <CompletedStyled.IconWrapper
                className="comment"
                visible={props.data.comments > 0}
              >
                <FontAwesomeIcon className="comment-icon" icon={faComment} />
              </CompletedStyled.IconWrapper>
            </ToolTip>
            <ToolTip
              title={t('compact_card.tip_title', {
                amount: props.data.tip_amount,
              })}
            >
              <CompletedStyled.IconWrapper
                className="tip"
                visible={props.data.tip_amount > 0}
              >
                $ &nbsp;<span>{t('compact_card.tip')}</span>
              </CompletedStyled.IconWrapper>
            </ToolTip>
            {!props.data.practice_booking && (
              <ToolTip
                title={t('compact_card.reaction_title', {
                  count: props.data.reaction_count,
                })}
              >
                <CompletedStyled.IconWrapper
                  className="reaction"
                  visible={props.data.reaction_count > 0}
                >
                  <span className="reaction-icon">
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  {t('compact_card.reaction')}
                </CompletedStyled.IconWrapper>
              </ToolTip>
            )}
          </div>
        </CompletedStyled.DetailsWrapper>
      </CompletedStyled.Container>
    </CompletedStyled>
  );
};


CompletedCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  onClick: PropTypes.func,
  onFavoriteClick: PropTypes.func,
};

export { CompletedCard };
