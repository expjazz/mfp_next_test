import { getlinks } from './Constants/constants';

export const getSelectedRoute = routeURL => {
  return getlinks({}).find(
    route => route.url === routeURL || route.sel_url === routeURL,
  );
};
