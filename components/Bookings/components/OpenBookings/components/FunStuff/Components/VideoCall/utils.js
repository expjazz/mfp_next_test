import moment from 'moment';

export const getMaxDate = () => {
  return moment().add('30', 'days');
};
