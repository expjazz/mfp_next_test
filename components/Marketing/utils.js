import { Links } from './constants';

export const getSelectedRoute = (routeURL) => {
  return Links.find(route => route.url === routeURL || route.sel_url === routeURL)
}

const generateSubLink = (baseUrl, subLink) => {
  return ({
    linkName: `  - ${subLink.label}`,
    key: `${subLink.label}`,
    isQuery: true,
    url: subLink.value ? `${baseUrl}?category=${subLink.value}` : baseUrl,
  })
}

export const getLinks = (expandLinks, subListObj) => {
  const newLinks = Links.map(link => {
    const foundLink = expandLinks.find(expLink => expLink.url === link.sel_url);
    if (foundLink && subListObj[foundLink.dataKey]) {
      return {
        ...link,
        subMenu: subListObj[foundLink.dataKey].map(subLink => generateSubLink(foundLink.url, subLink))
      }
    }
    return link;
  })
  return newLinks;
}
