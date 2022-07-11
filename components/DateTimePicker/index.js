import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import {
  DialogStyled,
  Container,
  DateWrap,
  TimeWrap,
  TimeUl,
  TimeLi,
} from './styled';
import { useMediaQuery } from '@material-ui/core';

export const calculateMinTime = date => {
  const isToday = moment(date).isSame(moment(), 'day');
  if (isToday) {
    const nowAddOneHour = moment(new Date())
      .add({ hours: 1 })
      .toDate();
    return nowAddOneHour;
  }
  return moment()
    .startOf('day')
    .toDate();
};

export const getMaxTime = moment()
  .endOf('day')
  .toDate();

function DateTimePicker(props) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [minTime, setMinTime] = useState(
    props.minTime || calculateMinTime(props.selected || new Date()),
  );
  const [maxTime] = useState(props.maxTime || getMaxTime);
  const [showTime, setShowTime] = useState(false);
  const [formData, setFormData] = useState({
    date: props.selected || moment(),
    time: {},
  });

  const dateChange = value => {
    setFormData({ ...formData, date: value });
    setMinTime(calculateMinTime(value));
    setShowTime(true);
  };

  const getTime = value => () => {
    setFormData({ ...formData, time: value });
    const date = moment(formData.date).format('DD/MM/YYYY');
    const dateTime = moment(`${date} ${value}`, 'DD/MM/YYYY hh:mm a');
    props.onChange(moment(dateTime));
  };

  const onBack = () => {
    setShowTime(false);
  };

  const onSelect = () => {
    setShowTime(true);
  };

  const getTwoDigit = number => {
    return `0${number}`.slice(-2);
  };

  const getTimeLine = () => {
    const timeListAm = [];
    const timeListPm = [];
    let amPm = minTime ? moment(minTime).format('A') : 'AM';
    const minH = minTime ? Number(moment(minTime).format('HH')) : 0;
    const minM = minTime
      ? Number(
          Math.round(moment(minTime).format('common.mm') / props.timeIntervals) *
            props.timeIntervals,
        )
      : 0;
    const maxH = maxTime ? Number(moment(maxTime).format('HH')) : 23;
    const maxM = maxTime ? Number(moment(maxTime).format('mm')) : 59;
    let minMin = minM;

    for (let hour = minH; hour <= maxH; hour += 1) {
      if (hour > minH) {
        minMin = 0;
      }
      if (amPm === 'AM' && hour === 12) {
        amPm = 'PM';
      }
      for (let min = minMin; min <= maxM; min += props.timeIntervals) {
        let hourDisplay = hour;
        if (amPm === 'AM' && hour === 0) {
          hourDisplay = 12;
        } else if (amPm === 'PM' && hour > 12) {
          hourDisplay = hour - 12;
        } else {
          hourDisplay = hour;
        }
        if (amPm === 'PM') {
          timeListPm.push(
            <TimeLi
              onClick={getTime(
                `${getTwoDigit(hourDisplay)}:${getTwoDigit(min)}${amPm}`,
              )}
            >
              {getTwoDigit(hourDisplay)}:{getTwoDigit(min)} {amPm}
            </TimeLi>,
          );
        } else {
          timeListAm.push(
            <TimeLi
              onClick={getTime(
                `${getTwoDigit(hourDisplay)}:${getTwoDigit(min)}${amPm}`,
              )}
            >
              {getTwoDigit(hourDisplay)}:{getTwoDigit(min)} {amPm}
            </TimeLi>,
          );
        }
      }
    }
    return [...timeListPm, ...timeListAm];
  };

  return (
    <DialogStyled
      classes={{ paper: 'body', paperScrollPaper: 'paperScroll' }}
      open
      onClose={props.onClose}
    >
      <Container>
        <DateWrap hide={isMobile && showTime}>
          <span className="titile">{t('common.selectDate')}</span>
          <DatePicker
            inline
            timeIntervals={10}
            dateFormat="MMMM d, yyyy h:mm aa"
            onChange={dateChange}
            minDate={props.minDate}
            maxDate={props.maxDate}
            selected={formData.date}
            onSelect={onSelect}
          />
        </DateWrap>
        {(!isMobile || showTime) && (
          <TimeWrap>
            <span className="date-icon">
              {isMobile && (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="back-icon"
                  onClick={onBack}
                />
              )}
              <span className="date">
                {moment(formData.date).format('dddd, MMMM DD')}
              </span>
            </span>
            <Scrollbars
              autoHide
              renderView={scrollProps => (
                <div {...scrollProps} id="time-scroll" />
              )}
            >
              <TimeUl>{getTimeLine()}</TimeUl>
            </Scrollbars>
          </TimeWrap>
        )}
      </Container>
    </DialogStyled>
  );
}

DateTimePicker.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.oneOfType([PropTypes.object, null]),
  maxDate: PropTypes.oneOfType([PropTypes.object, null]),
  minTime: PropTypes.oneOfType([PropTypes.object, null]),
  maxTime: PropTypes.oneOfType([PropTypes.object, null]),
  selected: PropTypes.oneOfType([PropTypes.object, null]),
  timeIntervals: PropTypes.number,
};
DateTimePicker.defaultProps = {
  minDate: null,
  maxDate: null,
  minTime: null,
  maxTime: null,
  selected: null,
  timeIntervals: 10,
};

export default DateTimePicker;
