import { generalLoader, updateToast } from "src/context/general";
import API from "src/lib/api";
import { axiosFetch } from "../fetch";

export const messages = (payload, callBack, dispatch, queryClient, t) => {
  generalLoader(dispatch, true)
  return axiosFetch
    .put(API.services, payload)
    .then(resp => {
      const data = queryClient.getQueryData(['loggedUser'])
      const celebrity_details = {
        ...data.celebrity_details,
        services: {
          ...data.celebrity_details.services,
          ...payload,
        },
      };
      const finalDetails = {
        user: data.user,
        celebrity_details,
      };
      queryClient.setQueryData(['loggedUser'], finalDetails)
      if (callBack) callBack(resp);
      generalLoader(dispatch, false)
      updateToast(dispatch, {
        value: true,
        message: t('common.updatedSuccessfully'),
        variant: 'success',
        global: false,
      })
    })
    .catch(exception => {
      generalLoader(dispatch, false)
      updateToast(dispatch, {
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
        global: false,
      })
    });
};
