/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import { Heading, LinkText, DescriptionP } from 'styles/TextStyled';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import { getRedirectURL } from 'customHooks/domUtils';
import AddToCalendar from 'components/AddToCalendar';
import { isCallReady, isCallCompleted, getCallTime } from 'src/utils/videoCall';
import BookingStyled from '../../../../../../styled';
import { Wrapper, DetailsWrap, LineDesc } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const BaseStuff = props => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const {
    fun_stuff_request_details: funStuffDetails = {},
    booking_id: bookingId,
  } = props.bookingData;
  const [callReady, setCallReady] = useState(false);

  const copyText = text => () => {
    copy(text);
    props.updateToast({
      value: true,
      message: t('common.copied_clipboard'),
      variant: 'success',
    });
  };

  useEffect(() => {
    let interval = null;
    let timer = true;
    interval = setInterval(() => {
      if (isCallReady(funStuffDetails.meeting_date) && timer && !callReady) {
        setCallReady(true);
      }
      if (timer && isCallCompleted(funStuffDetails.meeting_date, 15)) {
        timer = false;
        clearInterval(interval);
        setCallReady(false);
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <Wrapper actionTabActive={props.actionTabActive}>
      <BookingStyled.Layout starMode={false}>
        <BookingStyled.LeftSection className="left-section">
          <Heading>
            {funStuffDetails.fun_stuff.title} -{' '}
            {funStuffDetails.fun_stuff.meeting_duration} {t('common.minutes')}
          </Heading>
          <DescriptionP className="call-desc">
            {t('my_videos.event_completeion',{celebrity:props.bookingData.celebrity})}
          </DescriptionP>
          <DetailsWrap>
            <span className="sub-head">{t('common.scheduled')}</span>
            <span className="date-time">
              {getCallTime(funStuffDetails.meeting_date, entityData?.partnerData)}
            </span>
          </DetailsWrap>
          {props.bookingData.complete_status !== 'completed' && (
            <FlexCenter className="start-btn-wrp">
              <a
                href={getRedirectURL(funStuffDetails.external_link)}
                target="_blank"
                rel="noopener noreferrer"
                className={!callReady ? 'disabled-link' : ''}
              >
                <Button disabled={!callReady} isDisabled={!callReady}>
                  {t('common.start_call')}
                </Button>
              </a>
              {callReady && (
                <LinkText
                  className="link"
                  onClick={copyText(funStuffDetails.external_link)}
                >
                  {funStuffDetails.external_link}
                </LinkText>
              )}
              {!callReady && (
                <span className="d-link">{funStuffDetails.external_link}</span>
              )}
            </FlexCenter>
          )}
          {funStuffDetails.celebrity_reply && (
            <DetailsWrap>
              <span className="sub-head">{t('common.comments_to_fan')}</span>
              <DescriptionP>{funStuffDetails.celebrity_reply}</DescriptionP>
            </DetailsWrap>
          )}
          {props.bookingData.off_limit_topics && (
            <DetailsWrap>
              <span className="sub-head">
                {t('common.off_limit_topics')}
                <LineDesc>{props.bookingData.off_limit_topics}</LineDesc>
              </span>
            </DetailsWrap>
          )}
          {props.bookingData.complete_status !== 'completed' &&
            !callReady &&
            !isCallCompleted(funStuffDetails.meeting_date, 15) && (
              <FlexCenter className="add-cal">
                <AddToCalendar
                  data={{
                    startDt: funStuffDetails.meeting_date,
                    duration: funStuffDetails.fun_stuff.meeting_duration,
                    description: `Live Chat with ${props.bookingData.celebrity}`,
                    location: funStuffDetails.external_link,
                    bookingId,
                  }}
                />
              </FlexCenter>
            )}
          <DescriptionP className="call-note">
            {t('my_videos.call_note',{siteName: entityData?.partnerData?.siteName, talentSingle: entityData?.partnerData?.talentSingle})}
          </DescriptionP>
        </BookingStyled.LeftSection>
      </BookingStyled.Layout>
    </Wrapper>
  );
};

BaseStuff.propTypes = {
  bookingData: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
};

export default BaseStuff;
