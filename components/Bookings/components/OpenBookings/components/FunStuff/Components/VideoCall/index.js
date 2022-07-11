import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation,Trans } from 'react-i18next';
import moment from 'moment';
// import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { getRedirectURL } from 'customHooks/domUtils';
import { Dashed, FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import { LinkText, DescriptionP } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import AddToCalendar from 'components/AddToCalendar';
import DateTimePicker from 'components/DateTimePicker';
import { isCallReady, isCallCompleted, getCallTime } from 'src/utils/videoCall';
import { getMaxDate } from './utils';
import { CharCount } from '../../styled';
import { Wrapper, DetailsWrap } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';

function VideoCall(props) {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const {
    complete_status: completeStatus,
    fun_stuff_request_details: reqDetails,
    booking_id: bookingId,
  } = props.booking;
  const [formData, setFormData] = useState({
    link: reqDetails.external_link,
    date: reqDetails.meeting_date ? moment(reqDetails.meeting_date) : null,
    info: reqDetails.celebrity_reply ? reqDetails.celebrity_reply : '',
  });

  const [callReady, setCallReady] = useState(false);
  const [reschedule, setReshedule] = useState(false);
  const [openCal, setOpenCal] = useState(false);

  const inputChange = state => event => {
    setFormData({ ...formData, [state]: event.target.value });
  };
  const dateChange = value => {
    setFormData({ ...formData, date: value });
    setOpenCal(false);
  };
  const tiggerCalendar = () => {
    setOpenCal(true);
  };

  const calClose = () => {
    setOpenCal(false);
  };

  const completeOrder = () => {
    props.completeUpload({
      complete_status: 'completed',
      celebrity_reply: formData.info,
    });
  };

  const onSuccessReschedule = () => {
    setReshedule(false);
  };

  const notComplete = () => {
    props.denyRequest(t('open_bookings.request_not_complete'));
  };

  const callReschedule = () => {
    props.rescheduleCall(
      {
        celebrity_reply: formData.info,
        meeting_date: moment.utc(formData.date).format('MMM DD YYYY HH:mm:ss'),
        complete_status: 'in_progress',
        meeting_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      resp => ({
        ...props.booking,
        fun_stuff_request_details: {
          ...reqDetails,
          external_link: resp.external_link,
          meeting_date: moment(formData.date),
          celebrity_reply: formData.info,
        },
      }),
      onSuccessReschedule,
    );
  };

  const sendMeetingInfo = () => {
    if (reschedule) {
      callReschedule();
    } else {
      props.completeUpload(
        {
          celebrity_reply: formData.info,
          meeting_date: moment
            .utc(formData.date)
            .format('MMM DD YYYY HH:mm:ss'),
          complete_status: 'in_progress',
          meeting_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        [],
        resp => ({
          ...props.booking,
          fun_stuff_request_details: {
            ...reqDetails,
            external_link: resp.external_link,
            meeting_date: moment(formData.date),
            celebrity_reply: formData.info,
          },
          complete_status: 'in_progress',
        }),
      );
    }
  };
  const rescheduleCall = () => {
    setReshedule(true);
  };

  useEffect(() => {
    let interval = null;
    if (
      completeStatus === 'in_progress' &&
      reqDetails.fun_stuff.meeting_duration
    ) {
      let timer = true;
      interval = setInterval(() => {
        if (isCallReady(formData.date) && timer && !callReady) {
          setCallReady(true);
        }
        if (timer && isCallCompleted(formData.date, 15)) {
          timer = false;
          clearInterval(interval);
          setCallReady(false);
        }
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [completeStatus]);

  useEffect(() => {
    setFormData({
      link: reqDetails.external_link,
      date: reqDetails.meeting_date ? moment(reqDetails.meeting_date) : null,
      info: reqDetails.celebrity_reply ? reqDetails.celebrity_reply : '',
    });
  }, [
    props.booking.booking_id,
    reqDetails.external_link,
    reqDetails.meeting_date,
    reqDetails.celebrity_reply,
  ]);

  return (
    <Wrapper>
      {!reschedule && (
        <DetailsWrap>
          <span className="sub-head">
            {formData.date
              ? t('open_bookings.scheduled')
              : t('open_bookings.live_call.schedule')}
            {formData.date && (
              <span className="text date-time">
                {getCallTime(formData.date, entityData?.partnerData)}
                {completeStatus !== 'in_progress' && formData.date && (
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="fa-edit"
                    onClick={tiggerCalendar}
                  />
                )}
              </span>
            )}
          </span>
          {formData.date && (
            <i className="text italics">
              {isCallReady(formData.date, 60) ? (
                <React.Fragment>
                  {/* <a
                    href="mailto:concierge@myfanpark.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkText>Contact support</LinkText>
                  </a>
                  to reschedule this call. */}
                  <Trans
                    i18nKey="open_bookings.contact_support_txt"
                  >
                    <a
                      href="mailto:concierge@myfanpark.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkText>Contact support</LinkText>
                    </a>
                    to reschedule this call.
                  </Trans>
                </React.Fragment>
              ) : (
                t('open_bookings.call_timing')
              )}
            </i>
          )}
        </DetailsWrap>
      )}
      {completeStatus !== 'not_started' && !isEmpty(reqDetails.external_link) && (
        <React.Fragment>
          {!reschedule && !isCallCompleted(formData.date, 15) && (
            <DetailsWrap>
              <span className="sub-head">{t('open_bookings.meeting_link')}</span>
              {callReady ? (
                <a
                  href={formData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>{formData.link}</LinkText>
                </a>
              ) : (
                <LinkText className="meeting-link">{formData.link}</LinkText>
              )}
            </DetailsWrap>
          )}

          {(reschedule || formData.info) && (
            <DetailsWrap>
              <span className="sub-head">
                {reschedule ? t('common.rescheduleEvent') :t('common.comments_to_fan')}
              </span>
              <DescriptionP>
                {!reschedule ? (
                  formData.info
                ) : (
                  <React.Fragment>
                      {t('open_bookings.meeting_schedule',{purchaserPlural:entityData?.partnerData?.purchaser_plural_name})}
                      <br />
                      {t('open_bookings.previous_time')}: {getCallTime(formData.date, entityData?.partnerData)}
                  </React.Fragment>
                )}
              </DescriptionP>
            </DetailsWrap>
          )}
          {callReady && !isCallCompleted(formData.date, 15) && !reschedule && (
            <FlexCenter className="buttons">
              <a
                href={getRedirectURL(formData.link)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>{t('open_bookings.join_call')}</Button>
              </a>
              <DescriptionP className="desc-call">
                {t('open_bookings.after_schedule_text')}
              </DescriptionP>
            </FlexCenter>
          )}
        </React.Fragment>
      )}
      {completeStatus !== 'not_started' &&
        !callReady &&
        !reschedule &&
        !isCallCompleted(formData.date, 15) && (
          <FlexCenter className="cal-btns">
            <AddToCalendar
              data={{
                startDt: formData.date,
                duration: reqDetails.fun_stuff.meeting_duration,
                description: t('open_bookings.funStuff.liveChat'),
                location: formData.link,
                bookingId,
              }}
            />
            {!isCallReady(formData.date, 60) && (
              <Button className="" secondary onClick={rescheduleCall}>
                {t('open_bookings.reschedule_call')}
              </Button>
            )}
          </FlexCenter>
        )}
      {(!formData.date || reschedule) && (
        <Dashed
          className="dashed-btn"
          role="presentation"
          onClick={tiggerCalendar}
        >
          {t('open_bookings.add_date_time')}
        </Dashed>
      )}
      {(completeStatus === 'not_started' ||
        reschedule ||
        isEmpty(reqDetails.external_link)) && (
        <React.Fragment>
          <TextArea
            autoSize
            inputProps={{
              onChange: inputChange('info'),
              value: formData.info,
              maxLength: 500,
              placeholder: t('open_bookings.additional_info',{purchaserSingle:entityData?.partnerData?.purchaser_singular_name}),
              className: 'textarea',
            }}
          />
          <CharCount>
            {t("common.char_remains",{length:500 - formData.info.length})}
          </CharCount>
        </React.Fragment>
      )}
      {(completeStatus === 'not_started' ||
        isEmpty(reqDetails.external_link)) && (
        <FlexCenter className="send-btn">
          <Button
            className=""
            onClick={sendMeetingInfo}
            disabled={!formData.date}
            isDisabled={!formData.date}
          >
            {t("open_bookings.schedule_call")}
          </Button>
        </FlexCenter>
      )}
      {reschedule && (
        <FlexCenter className="send-btn">
          <Button
            className="add-to-cal"
            secondary
            onClick={() => setReshedule(false)}
          >
            {t('common.cancel')}
          </Button>
          <Button className="" onClick={sendMeetingInfo}>
            {t('common.update')}
          </Button>
        </FlexCenter>
      )}
      {isCallCompleted(formData.date) && (
        <React.Fragment>
          <span className="sub-head action-head">
            {t("open_bookings.was_call_completed")}
          </span>
          <FlexCenter>
            <Button className="add-to-cal" secondary onClick={notComplete}>
              {t('common.not_completed')}
            </Button>
            <Button onClick={completeOrder}>{t("open_bookings.completeOrder")}</Button>
          </FlexCenter>
        </React.Fragment>
      )}
      {openCal && (
        <DateTimePicker
          minDate={moment()}
          maxDate={getMaxDate()}
          timeIntervals={10}
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={dateChange}
          selected={formData.date}
          onClose={calClose}
        />
      )}
    </Wrapper>
  );
}

VideoCall.propTypes = {
  booking: PropTypes.object.isRequired,
  denyRequest: PropTypes.func.isRequired,
  completeUpload: PropTypes.func.isRequired,
  rescheduleCall: PropTypes.func.isRequired,
};

export default VideoCall;
