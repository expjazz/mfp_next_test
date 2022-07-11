import React, { useState, useEffect, useRef } from 'react';

export const useScroll = ({
  headerHeight,
  node,
  isDesktop,
  loaded,
  collapsedMode
}) => {
  const [showSticky, setSticky] = useState(false);
  const scrollY = useRef(0);
  const checkScroll = () => {
    if (node.current) {
      const viewportOffset = node.current.getBoundingClientRect();
      let { top } = viewportOffset;
      const headOffset = showSticky ? headerHeight : 0;
      top = isDesktop ? top - headerHeight : top - headOffset;
      if (top <= 0 && window.scrollY > 0) {
        setSticky(true)
      } else {
        setSticky(false);
      }
    }
    scrollY.current = window.scrollY;
  }
  useEffect(() => {
    if (collapsedMode) {
      setSticky(true);
    } else if (loaded) {
      checkScroll();
      window.addEventListener('scroll', checkScroll)
      return () => {
        window.removeEventListener('scroll', checkScroll);
      }
    }
  }, [headerHeight, loaded, collapsedMode])
  return ({
    showSticky
  })
}
