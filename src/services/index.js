import Api from "../lib/api";
import { axiosFetch } from "./fetch";

export const getTagDetails = tagName => {
  return axiosFetch(`${Api.getTagDetails}?tag=${tagName}`).then(resp => resp.data);
};

export const getStarsonaVideo = videoId => {
  return axiosFetch(`${Api.starsonaVideo}${videoId}/get/`).then(resp => resp.data);
};

export const twitterLogin = () => {
  return axiosFetch(Api.twitterLogin).then(resp => resp.data);
};

export const twitterAuth = (oauthToken, oauthVerifier) => {
  return axiosFetch(
    `${Api.twitterOauth}?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`,
  ).then(resp => resp.data);
};

export const validatePromo = promo => {
  return axiosFetch
    .post(Api.validatePromo, {
      referral_code: promo,
    })
    .then(resp => resp.data);
};

export const updateUnseenCount = () => {
  return axiosFetch(Api.updateUnseenCount).then(resp => resp.data);
};

export const markCustomImgAsViewed = (img) => {
  return axiosFetch.post(Api.postViewedCustomImg(img));
}

export const contactSupport = (topic, comments) => {
  return axiosFetch
    .post(Api.contactSupport, {
      topic,
      comments,
    })
    .then(resp => resp.data);
};

export const sharePromoProfile = (celebrity, templateId) => {
  return axiosFetch
    .post(Api.sharePromoProfile, {
      celebrity,
      template_id: templateId,
    })
    .then(resp => resp.data);
};

export const shareCustomPromoImg = (celebrity, templateId) => {
  return axiosFetch
    .post(Api.shareCustomPromoImg, {
      celebrity,
      template_id: templateId,
    })
    .then(resp => resp.data);
};


export const increaseTagViewCount = objToDispatch => {
  return axiosFetch.post(Api.increaseTagView, objToDispatch).then(resp => resp)
}

export const updateCelebrityShare = (type, shareDetails) => {
  const shareType = type === 'celebrity' ? 1 : 2;
  const data =
    type === 'celebrity'
      ? { social: shareDetails.type, promotion_template: shareDetails.tid }
      : {
          booking_id: shareDetails.bookingId,
          promotion_template: shareDetails.tid,
        };
  const objToDispatch = {
    share_type: shareType,
    ...data
  };

  // Added the share source per PM-2857, to track if the image was shared after a request completition

  if (shareDetails && shareDetails.shareSource) {
    objToDispatch.share_source = shareDetails.shareSource;
  };
  return axiosFetch
    .post(`${Api.celebrityShare}`, objToDispatch)
    .then(resp => resp.data);
};

export const commercialBooking = payload => {
  return axiosFetch.post(Api.commercialBooking, payload).then(resp => resp.data);
};

export const sendDirectMessage = (type, message, id, language = '') => {
  const payload = {
    type,
    ...(language ? { language } : {}),
    ...(type === 'request' ? { celebrity: id } : { booking_id: id }),
  };
  if (type !== 'seen') {
    payload.message = message;
  }
  return axiosFetch
    .post(Api.directMessage, payload)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const sendSocialShoutout = (type, id, reqPayload) => {
  const payload = {
    type,
    ...reqPayload,
    ...(type === 'request' ? { celebrity: id } : { booking_id: id }),
  };
  return axiosFetch
    .post(Api.socialShoutout, payload)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const sendDigitalGoods = (type, id, reqPayload) => {
  const payload = {
    type,
    ...reqPayload,
    ...(type === 'request' ? { celebrity: id } : { booking_id: id }),
  };
  return axiosFetch
    .post(Api.sendDigitalGoods, payload)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const handleDigitalGoods = (type, reqPayload = {}) => {
  let method = 'get';
  const api = reqPayload.id
    ? `${Api.digitalGoods}${reqPayload.id}`
    : Api.digitalGoods;
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

export const toggleCommercial = value => (dispatch, getState) => {
  return axiosFetch.put(Api.commercialToggle).then(resp => {
    const celebrityDetails = {
      ...getState().userDetails.settings_celebrityDetails,
      allow_commercial: value,
    };
    const userDetails = getState().userDetails.settings_userDetails;
    const finalDetails = {
      userDetails,
      celbDetails: celebrityDetails,
    };
    dispatch(updateUserDetails(finalDetails));
    return resp.data;
  });
};

export const handleProducts = (type, reqPayload = {}) => {
  let method = 'get';
  const api = reqPayload.id
    ? `${Api.sendProducts}${reqPayload.id}`
    : Api.sendProducts;
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

export const requestProduct = (type, id, reqPayload) => {
  const payload = {
    type,
    ...reqPayload,
    ...(type === 'request' ? { celebrity: id } : { booking_id: id }),
  };
  return axiosFetch
    .post(Api.requestProduct, payload)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const getSocialDetails = celebId => {
  return axiosFetch
    .get(`${Api.fetchSocialDetails}${celebId || ''}`)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const updateSocial = payload => {
  return axiosFetch
    .put(Api.updateSocial, payload)
    .then(resp => resp.data && resp.data.data)
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
