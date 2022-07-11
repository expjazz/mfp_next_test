const i18n = {
  t: value => value
}
const entity = value => value
export const Links = [
  {
    linkName: i18n.t('common.your_talent_concierge', {talentSingle:entity('talentSingle')}),
    key: 'concierge',
    url: '/manage/tools/star-concierge',
  },
];

export const expandableLinks = [{
    url:'/manage/tools/articles',
    dataKey: 'categoryArticles',
  },
  {
    url: '/manage/tools/ideas',
    dataKey: 'categoryIdeas',
}]
