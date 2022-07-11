import shareSites from './constants/shareSites.json';

const getGoogleUrl = ({
  description,
  endDatetime,
  location,
  startDatetime,
  timezone,
  title,
}) => {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${
    startDatetime
  }/${endDatetime}${timezone && `&ctz=${timezone}`}&location=${location}&text=${title}&details=${description}`;
}

const getYahooUrl = ({
  description,
  duration,
  location,
  startDatetime,
  title,
}) => {
  return `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${
    startDatetime
  }&dur=${duration}&desc=${description}&in_loc=${location}`;
}

const getOutlookUrl = ({
  description,
  endDatetime,
  location,
  startDatetime,
  timezone,
  title,
}) => {
  return `
  https://outlook.live.com/calendar/0/deeplink/compose?body=${description}&enddt=${endDatetime}&location=${location}&path=${location}&startdt=${startDatetime}&subject=${title}`
}

const buildShare = ({
  description = '',
  ctz = '',
  endDatetime,
  location = '',
  startDatetime,
  timezone = '',
  title = '',
}) => {
  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `URL:${document.URL}`,
    'METHOD:PUBLISH',
    timezone === '' ? `DTSTART:${startDatetime}` : `DTSTART;TZID=${timezone}:${startDatetime}`,
    timezone === '' ? `DTEND:${endDatetime}` : `DTEND;TZID=${timezone}:${endDatetime}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf8,${escape(content)}`;
}

export const onLinkClick = (type, icsProps) => {
  switch(type) {
    case shareSites.GOOGLE: return getGoogleUrl(icsProps);
    case shareSites.YAHOO: return getYahooUrl(icsProps);
    case shareSites.OUTLOOK: return getOutlookUrl(icsProps);
    default: return buildShare(icsProps);
  }
}
