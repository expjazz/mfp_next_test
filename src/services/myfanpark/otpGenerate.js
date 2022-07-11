import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const generateOtp = (phoneNumber, countryCode) => {
  const obj = {
    phone_number: phoneNumber,
    country_code: countryCode,
  };
  return axiosFetch.post(Api.getOtpCode, {
    ...obj,
  }).then(resp => resp.data)
};

export const validateOtp = (phoneNumber, countryCode, code) => {
  const obj = {
    phone_number: phoneNumber,
    country_code: countryCode,
    verification_code: code,
  };
  return axiosFetch.post(Api.validateOtpCode, {
    ...obj,
  }).then(resp => resp.data)
};
