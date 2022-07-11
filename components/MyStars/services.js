import Api from "src/lib/api";
import { axiosFetch } from "src/services/fetch";

export const getMyStars = () => {
  return axiosFetch
    .get(Api.myStars, {})
    .then(resp => resp)
    .catch(() => {});
};

export const getDetails = (id, offset, limit) => {
  return axiosFetch
    .get(`${Api.myStarsRequest}${id}?offset=${offset}&limit=${limit}`, {})
    .then(resp => resp)
    .catch(() => {});
};
