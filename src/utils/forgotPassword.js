import { axiosFetch } from "src/services/fetch";

export default function forgotPassword(url, data) {
  return axiosFetch.post(url, data).then(response => response).catch((exception) => { throw exception; });
}
