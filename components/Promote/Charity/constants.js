import moment from 'moment';

const toolTips = t => ({
  addCharity: t('common.add_charity'),
  addFundraiser: t('common.add_fundraiser'),
});

const defaultStartDate = moment();
const defaultEndDate = moment();

export { toolTips, defaultStartDate, defaultEndDate };
