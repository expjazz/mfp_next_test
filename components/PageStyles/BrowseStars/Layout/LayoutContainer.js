import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import OutterLoader from '../../../OutterLoader'
// import OutterLoader from '../../../OutterLoader'
import BrowseStarsLayoutContent from './LayoutContent'
// import InjectStyles from './InjectStyles'
// import StarShowLayout from './StarShowLayout'
// import OutterLoader from '../../../OutterLoader'
function BrowseStarsLayoutContainer(props) {
  const router = useRouter()
  // const { partnerData } = pageProps
  if (router.isFallback) {
    return <OutterLoader />
  }
  
  if (props.error) {
    return <h1>{props.error}</h1>
  }
  return (
    <BrowseStarsLayoutContent {...props}>

        {props.children}

    </BrowseStarsLayoutContent>
  )
}

export default BrowseStarsLayoutContainer
