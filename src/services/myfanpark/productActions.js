import axios from "axios";
import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const getLast2Msg = celebrityId => {
  return axiosFetch
    .get(`${Api.last2Msg}${celebrityId}`, {})
    .then(res => res)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const handleCommercialOfferings = (type, reqPayload = {}) => {
  let method = 'get';
  const api = reqPayload.id
    ? `${Api.commercialoffering}${reqPayload.id}`
    : Api.commercialoffering;
  if (type === 'add' || type === 'edit') {
    method = 'post';
  } else if (type === 'delete') {
    method = 'delete';
  }
  return axiosFetch[method](api, reqPayload)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const validatePromocode = (promocode, rate, celId) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}${Api.validatePromocode}?promocode=${promocode}&celebrity_id=${celId}&amount=${rate}`,
    {headers: {
      device: 'web'
    }}
  ).then(resp => {
    return resp.data;
  });
};

export const bookingInitiate = payload => {
  return axiosFetch.put(Api.bookingInitiate, payload).then(resp => resp.data);
};
