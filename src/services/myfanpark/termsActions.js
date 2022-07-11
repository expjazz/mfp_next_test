import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const getTermsPolicy = () => {
  return axiosFetch(Api.termsPolicy)
    .then(resp => {
      return resp.data && resp.data.data && resp.data.data.terms_policy
    })
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};
