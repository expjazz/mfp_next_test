import { isBrowser } from 'customHooks/domUtils'

export const locStorage = {
  setItem: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  getItem: (key, data) => JSON.parse(localStorage.getItem(key)),
  removeItem: (key) => localStorage.removeItem(key)
}

/**
 * Helper object to store and get values from session storage
 */
export const sessStorage = {
  setItem: (key, data) => sessionStorage.setItem(key, JSON.stringify(data)),
  getItem: (key, data) => JSON.parse(sessionStorage.getItem(key)),
  removeItem: (key) => sessionStorage.removeItem(key)
}

export const isCelebLocStorage = () => {
  if (!isBrowser()) return true
  const user = locStorage.getItem('data')
  return user?.user?.role_details?.role_name !== "Celebrity"
}