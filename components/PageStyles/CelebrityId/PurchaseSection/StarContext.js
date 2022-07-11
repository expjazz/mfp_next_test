import React from 'react';

export const StarContext = React.createContext({
  userData: {},
  celbData: {},
  collapsed: false,
  promoCode: {},
  showContent: false,
  isStar: false,
  isBookable: true,
  updateCollapse: () => {},
  updatePromoCode: () => {},
  updateLocalStore: () => {},
  toggContent: () => {},
  scrollToElem: () => {},
  onPurchaseComplete: () => {},
});

StarContext.displayName = 'StarGeneralPersistedData'
