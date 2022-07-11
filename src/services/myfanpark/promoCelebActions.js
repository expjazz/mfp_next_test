
import Api from 'src/lib/api';
import { axiosFetch } from '../fetch';

export const getPromoList = (cat='', occ='', entity='') => {
  return axiosFetch
    .get(`${Api.promotionList}?category=${cat}&occasion=${occ}&entity=${entity}`, {})
    .then(resp => {
      return resp.data.data.templates
    })
    .catch(() => {
    });
};

export const getCustomPromoImgs = (id) => {
  return axiosFetch.get(Api.getCustomPromocionalImages(id)).then((resp) => {
    if (resp.data && resp.data.data && resp.data.success) {
      return resp.data.data.templates
    } else {
    }
  }).catch((exception) => {
  });
};

export const getPromoCat = () => {
  return axiosFetch
    .get(Api.promoCatList)
    .then(resp => {
      if (resp.data && resp.data.data && resp.data.success) {
        return {catList: resp.data.data.category, occasList: resp.data.data.occasions}
        ;
      }
    })
    .catch(exception => {

    });
};
