import API from 'src/lib/api';
import i18n from 'i18next';
import { axiosFetch } from '../fetch';
// import { axiosFetch } from '../axiosFetch';


export const pageColors = (method = 'get', payload = {}) => {
  return axiosFetch[method](API.pageColors, payload)
    .then(resp => {
      if (resp.data && resp.data.data) {
        if (method === 'get')
          return { data: resp.data.data.colors, status: 'success' };
        return { data: resp.data.data.color, status: 'success' };
      }
      return { data: i18n.t('common.refresh_error'), status: 'error' };
    })
    .catch(err => {
      return { data: err.response.data.error.message, status: 'error' };
    });
};

export const pageFonts = (method = 'get', payload = {}) => {
  return axiosFetch[method](API.pageFonts, payload)
    .then(resp => {
      if (resp.data && resp.data.data) {
        if (method === 'get')
          return { data: resp.data.data.fonts, status: 'success' };
        return { data: resp.data.data.font, status: 'success' };
      }
      return { data: i18n.t('common.refresh_error'), status: 'error' };
    })
    .catch(err => {
      return { data: err.response.data.error.message, status: 'error' };
    });
};

export const backgroundImages = (method = 'get', payload = {}) => {
  let url = API.backgroundImages;
  if (method === 'delete') {
    url = `${url}${payload.id}`;
  }
  return axiosFetch[method](url, payload)
    .then(resp => {
      if (resp.data && resp.data.data) {
        if (method === 'get') {
          return { data: resp.data.data.images, status: 'success' };
        } else if (method === 'delete') {
          return { data: resp.data.data.cover_image, status: 'success' };
        }
        return { data: resp.data.data.message, status: 'success' };
      }
      return { data: i18n.t('common.refresh_error'), status: 'error' };
    })
    .catch(err => {
      return { data: err.response.data.error.message, status: 'error' };
    });
};

export const getInteractionList = (offset, limit, vanity) => {
  return axiosFetch
    .get(`${API.socialInteractionList}${vanity}?limit=${limit}&offset=${offset}`)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      return err;
    });
};

export const getRecentRequest = (offset, limit, vanity) => {
  return axiosFetch
    .get(`${API.recentRequestList}${vanity}?limit=${limit}&offset=${offset}`)
    .then(resp => {
      return resp;
    })
    .catch(err => {
      return err;
    });
};
