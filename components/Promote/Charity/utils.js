import moment from 'moment';

export const isFundraiserStarted = (date) => {
  if (date) {
    return moment(date).isSameOrBefore(moment(), 'day');
  }
  return false;
}

export const isFundraiserEnded = (date) => {
  if (date) {
    return moment().diff(moment(date), 'days') > 0;
  }
  return false;
}
