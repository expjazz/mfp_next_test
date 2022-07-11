import Api from "src/lib/api";
import { axiosFetch } from "../fetch";

const i18n = {
  t: value => value
}

const parseResult = (results) => {
  const taglist = [];
  results.forEach((searchItem) => {
    const list ={
      label: searchItem.name,
      value: searchItem.id,
    }
    taglist.push(list);
  });
  return taglist;
}
export const fetchTagsList = (searchParam, dispatch)  => {
  return axiosFetch(`${Api.getTagsList}?tag=${searchParam}`).then((resp) => {
    if (resp.data && resp.data.success) {
      return parseResult(resp.data.data.tags);
    }
  }).catch((exception) => {
    updateToast(dispatch, {
      value: true,
      message: i18n.t('common.refresh_error'),
      variant: 'error',
    })
  })
};

export const setNewTag = (newTag) => {
  const obj = {
    tags: newTag
  }
  return axiosFetch.post(Api.setTags, {
    ...obj,
  }).then(resp => resp.data);
}
