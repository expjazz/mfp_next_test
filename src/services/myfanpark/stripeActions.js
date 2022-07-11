import { checkStripeRegistrationSuccess, stripeRegistrationSuccess } from "src/context/general";
import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const fetchURL = () => {
  return axiosFetch(Api.stripeRegistration)
    .then(resp => {
      if (resp.data && resp.data.success) {
        return resp.data.data.stripe_url
      } else {
      }
    })
    .catch(exception => {

    });
};

export const checkStripe = async (dispatch) => {
  const url = await fetchURL()
  stripeRegistrationSuccess(dispatch, url)
  return axiosFetch(Api.checkStripe)
    .then(resp => {
      if (resp.data && resp.data.success && isLoggedIn) {
        checkStripeRegistrationSuccess(dispatch, resp.data.data)
        // dispatch(checkStripeRegistrationSuccess(resp.data.data));
      }
    })
    .catch(exception => {

    });
};
