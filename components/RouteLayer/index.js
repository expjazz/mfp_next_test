import { faWindowMinimize } from '@fortawesome/pro-light-svg-icons'
import { useGetPartner } from 'customHooks/reactQueryHooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { generalLoader, useGeneral } from 'src/context/general'

function RouteLayer({children}) {
  const router = useRouter()
  const [state, dispatch] = useGeneral()
  const { data: partnerData } = useGetPartner()
  useEffect(() => {
    const onRouteStart = (url) => {
      if (router.asPath.includes('manage') && !url.includes('manage') && faWindowMinimize.gtag) {
        window[`ga-disable-${partnerData?.entityData?.conversion_ga}`] = false;
        window[`ga-disable-${partnerData?.entityData?.management_ga}`] = true;
      }
      if (!router.asPath.includes('manage') && url.includes('manage') && faWindowMinimize.gtag) {
        window[`ga-disable-${partnerData?.entityData?.conversion_ga}`] = true;
        window[`ga-disable-${partnerData?.entityData?.management_ga}`] = false;
      }
      if (!router.isFallback) {
        if (router.asPath.includes('manage')) {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
        generalLoader(dispatch, true)
      }
    }
    const onRouteEnd = (url) => {
      if (router.asPath.includes('manage')) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
      generalLoader(dispatch, false)
    }
    router.events.on('routeChangeStart', onRouteStart)
    router.events.on('routeChangeComplete', onRouteEnd)
    return () => {
      router.events.off('routeChangeStart', onRouteStart)
      router.events.off('routeChangeComplete', onRouteEnd)
    }
  }, [])
  return children
}

export default RouteLayer
