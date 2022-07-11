import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const shareEntity = (method = 'get', entityId='') => {
  Api
  return axiosFetch[method](`${Api.shareEntity}${entityId ? `/${entityId}`: ''}`)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};

export const getSharePartList = () => {
  return axiosFetch(Api.partnerList)
    .then(resp => resp.data && resp.data.data)
    .catch(e =>
      e.response && e.response.data && e.response.data.error
        ? e.response.data.error
        : '',
    );
};
