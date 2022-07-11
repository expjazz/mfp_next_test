// import { fetch } from '../services/fetch';

import { axiosFetch } from "src/services/fetch";

export default function resetPassword(url, data) {
  return axiosFetch.post(url, data).then(response => response).catch((exception) => { throw exception; });
}
