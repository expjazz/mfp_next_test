import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import Button from '../SecondaryButton';
import shareSites from './constants/shareSites.json';
import { onLinkClick } from './utils';
import { Wrapper, Dropdown as Drop } from './styled';

function AddToCalendar(props) {
  const { t } = useTranslation();
  const buttonRef = useRef(null);
  const [openDrop, toggDrop] = useState(false);
  const startTime = props.data.startDt;
  const endTime = moment(props.data.startDt).add(
    props.data.duration,
    'minutes',
  );
  const eventInDifferentTimezone = {
    description: props.data.location,
    duration: props.data.duration,
    endDatetime: moment(endTime).format('YYYYMMDDTHHmmss'),
    location: props.data.location,
    startDatetime: moment(startTime).format('YYYYMMDDTHHmmss'),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    title: props.data.description,
  };

  const onWindowClick = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      toggDrop(false);
    }
  }

  const renderCalLinks = () => {
    return Object.keys(shareSites).map(shareKey => (
      <a
        className='cal-links'
        target='_blank'
        download='add-to-calendar.ics'
        href={onLinkClick(
          shareSites[shareKey],
          eventInDifferentTimezone
        )}
      >
        {shareSites[shareKey]}
      </a>
    ))
  }

  useEffect(() => {
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, [])

  return (
    <Wrapper className='add-to-cal' ref={buttonRef}>
      <Button
        ref={buttonRef}
        secondary {...props}
        onClick={() => toggDrop(!openDrop)}
      >
        {t('common.add_calendar')}
      </Button>
      <Drop
        id="add-cal-drop"
        placement="bottom-start"
        open={openDrop}
        anchorEl={buttonRef.current}
      >
        {renderCalLinks()}
      </Drop>
    </Wrapper>
  );
}

AddToCalendar.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AddToCalendar;
