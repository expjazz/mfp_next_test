import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

export const fetchOccasionlist = (id, entity) => {
  
  return axiosFetch
    .get(`${Api.getOccasionList}?type=${id}${entity ? `&entity=${entity}` : entity}`)
    .then(resp => {
      if (resp.data && resp.data.success) {
        const popOccasions = resp.data.data.new_occasion_list || [];
        const occasions = resp.data.data.occasion_list
          .filter(occasion => {
            return !popOccasions.find(occ => occ.id === occasion.id);
          })
          .sort((a, b) => {
            if (a.title.toUpperCase() < b.title.toUpperCase()) {
              return -1;
            }
            return 0;
          });
        return { occasions, popOccasions }
      } 
    })
    .catch(exception => {
      console.log(expection, 'error')
    });
};