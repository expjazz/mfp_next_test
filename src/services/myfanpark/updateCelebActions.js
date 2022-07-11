import { i18n } from "next-i18next";
import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const updateProfilePhoto = (
    obj,
    showToast,
    global = true,
    updateToast = () => {},
    loaderAction = () => {},
    queryClient = {},
    celebrityData = {}
  ) => {
  const API_URL = `${Api.updatePhoto}`;

  // dispatch(updateProfilePhotoFetchStart());
  // dispatch(loaderAction(true));
  return axiosFetch
    .post(API_URL, obj)
    .then(resp => {
      if (resp.data && resp.data.success) {
        // dispatch(updateProfilePhotoFetchEnd());
        // dispatch(updateProfilePhotoFetchSuccess(resp.data.data));
        // dispatch(
        //   fetchUserDetails(getState().userDetails.settings_userDetails.id),
        // );
        const obj = {
          ...celebrityData,
          user: {
            ...celebrityData?.user,
            avatar_photo: resp.data.data.avatar_photo
          }
        }
        queryClient.setQueryData(['getCelebDetails', celebrityData?.user?.user_id], obj)
        loaderAction(false);
        if (showToast)
          updateToast({
            value: true,
            message:  i18n.t('common.update_success'),
            variant: 'success',
            global,
          })
        return resp.data.data;
      }
      // dispatch(updateProfilePhotoFetchEnd());
      // dispatch(updateProfilePhotoFetchFailed('404'));
      loaderAction(false)
    })
    .catch(exception => {
      loaderAction(false)
      if (showToast)
        updateToast({
          value: true,
          message: exception.response.data.error.message,
          variant: 'error',
          global,
        })
      // dispatch(updateProfilePhotoFetchEnd());
      // dispatch(updateProfilePhotoFetchFailed(exception));
    });
};
