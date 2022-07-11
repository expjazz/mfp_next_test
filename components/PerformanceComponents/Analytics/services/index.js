import Api from "src/lib/api";
import { axiosFetch } from "src/services/fetch";

export const getPerformanceList = (offset, limit, type, filter) => {
  return axiosFetch
    .get(
      `${Api.performance}?offset=${offset}&limit=${limit}&type=${type}&months=${filter}`,
      {},
    )
    .then(resp => resp)
    .catch(() => {});
};
