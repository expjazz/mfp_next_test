import orderStatus from 'src/constants/requestTypes/deliverStatus';

export const getStatusList = (currentStatus) => {
  if (currentStatus === 'in_progress') {
    return orderStatus.map(status => ({
      ...status,
      disabled: status.value === 'not_started',
    }))
  } else if (currentStatus === 'almost_finished') {
    return orderStatus.map(status => ({
      ...status,
      disabled: status.value === 'not_started' || status.value === 'in_progress',
    }))
  }
  return orderStatus;
}

export const getDelivStatus = (currentStatus) => {
  return orderStatus.find(status => status.value === currentStatus);
}
