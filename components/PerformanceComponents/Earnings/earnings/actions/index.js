export const getEarningsList = (status, filter, offset = 0, refresh = true, limit = 20, prevData = [], func = () => {}) => {
  if (status === 'pending') {
    func(filter)
  } else {
    func(offset, refresh, filter, limit, prevData);
  }
}
