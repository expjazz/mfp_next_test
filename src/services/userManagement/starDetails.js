import Api from "../../lib/api";
import { axiosFetch } from "../fetch";

export const getStarCountries = () => {
  return axiosFetch(`${Api.starCountries}`).then(
    resp => resp.data && resp.data.data,
  );
};

export const getCountryList = () => {
  return axiosFetch.get(`${Api.countryList}`).then((resp) => {
    if (resp.data && resp.data.success) {
      return resp.data.data.country
    }
  }).catch(e => {
    console.log(e, 'error')
  })
}

