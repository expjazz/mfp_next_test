import moment from 'moment';

export const getTime = (time) => {
  if (time >= 0) {
    const timeMoment = moment.utc(time*1000);
    return timeMoment.isValid() ? timeMoment.format('mm:ss') : ''
  }
  return '';
}
