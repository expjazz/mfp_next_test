import { cancelledBy } from 'src/constants/requestTypes';

export const cancelPrefix = (t) => ({
  [cancelledBy.timedOut]: t('open_bookings.cancelPrefix.timedOut'),
  [cancelledBy.star]: t('open_bookings.cancelPrefix.starCancel'),
  [cancelledBy.fan]: t('open_bookings.cancelPrefix.fanCancel'),
})
