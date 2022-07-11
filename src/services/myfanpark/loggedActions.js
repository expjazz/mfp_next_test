import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const getDashboardData = (callBack, isLoggedIn) => {
  return axiosFetch
    .get(Api.dashBoard, {})
    .then(resp => {
      if (isLoggedIn) {
        if (callBack) callBack();
        return resp.data.data.dashboard
      }
    })
    .catch(() => {
      if (callBack) callBack();
    });
};

export const dashBoardUpdate = () => {
  return axiosFetch
    .get(Api.dashboardUpdate, {})
    .then()
    .catch();
};