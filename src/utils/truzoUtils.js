
/* eslint-disable camelcase */
export const redirectTruzo = ({ app_key, audience, scope, response_type, client_id, state, redirect_url }) => {
  const url = `${process.env.NEXT_PUBLIC_TRUZO_ENDPOINT}oauth/authorize?app_key=${app_key}&audience=${audience}&scope=${scope}&response_type=${response_type}&client_id=${client_id}&state=${state}&redirect_url=${redirect_url}`
  return url;
}
