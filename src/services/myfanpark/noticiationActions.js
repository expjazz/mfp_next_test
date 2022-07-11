import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const updateNotification = (
  obj,
  toastGlobal = true,
  callback = false,
  showToast=true,
  isLoggedIn = false,
  loaderAction = () => {},
  updateToast = () => {},
  queryClient = null,
  celebrityData,
  t
  ) => {
  let API_URL;
  if (isLoggedIn) {
    API_URL = `${Api.updateNotification}`;
  }
  if (loaderAction) {
    loaderAction(true)
  }
  return axiosFetch
    .post(API_URL, obj)
    .then(resp => {
      if (resp.data && resp.data.success) {
        queryClient.setQueryData(["loggedUser"], {...celebrityData, user: {
          ...celebrityData?.user, notification_settings: { ...celebrityData?.user?.notification_settings, ...obj }
        }})
        // dispatch(updateNotificationFetchSuccess(resp.data.data));
        if (callback) {
          callback();
        }
      } else {
        // dispatch(updateNotificationFetchEnd());
        // dispatch(updateNotificationFetchFailed('404'));
      }
      if (loaderAction) {
        loaderAction(false)
      }
      if (showToast) {
        updateToast({
          value: true,
          message:  t('common.update_success'),
          variant: 'success',
          global: toastGlobal,
        })
      }
      return resp.data;
    })
    .catch(exception => {
      if (loaderAction) {
        loaderAction(false)
      }
      updateToast({
        value: true,
        message: exception.response.data.error.message,
        variant: 'error',
        global: toastGlobal,
      })
      return exception.response.data;
    });
};
