import moment from 'moment';
// import i18n from 'i18next';
import { tzAbbr } from 'src/utils/timeUtils';
import { i18n } from 'next-i18next';
const entity = value => value
export const isCallReady = (startDate, offSet = 5) => {
  const startMom = moment(startDate);
  const endMom = moment().add(offSet, 'minutes');
  if (endMom.diff(startMom) >= 0) {
    return true;
  }
  return false;
};

export const isCallCompleted = (startDate, duration = 0) => {
  const startMom = moment(startDate).add(duration, 'minutes');
  const endMom = moment();
  if (startMom.diff(endMom) <= 0) {
    return true;
  }
  return false;
};

const getFormattedDate = date => {
  return moment(date)
    .local()
    .hours(0)
    .minutes(0)
    .seconds(0)
    .milliseconds(0);
};

export const getCallTime = (date, entity) => {
  const curDate = getFormattedDate(moment());
  const dateChk = getFormattedDate(date);
  const daysDiff = dateChk.diff(curDate, 'days');
  if (daysDiff === 0) {
    return i18n.t('common.todayTime', { time: moment(date).format('h:mma'), period: tzAbbr() });
  } else if (daysDiff === 1) {
    return i18n.t('common.tomorrowTime', { time: moment(date).format('h:mma'), period: tzAbbr() });
  }
  return i18n.t('common.dateTime', { date: moment(date).format(entity?.base_date_format), time: moment(date).format('h:mma'), period: tzAbbr() });
};
