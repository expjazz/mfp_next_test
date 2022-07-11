import Api from "src/lib/api";
import { axiosFetch } from "src/services/fetch";

export const getMoreTips = (payload, method = 'get') => {
  return axiosFetch[method](`${Api.moreTips}`, payload)
    .then(resp => {
      return resp.data;
    })
    .catch(err => {
      return err;
    });
};
