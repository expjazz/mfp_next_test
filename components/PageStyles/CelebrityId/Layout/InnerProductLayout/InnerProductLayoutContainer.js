import OutterLoader from 'components/OutterLoader'
import { useRouter } from 'next/router'
import React from 'react'
import InnerProductLayoutContent from '.'
import InjectStyles from '../InjectStyles'

function InnerProductLayoutContainer(props) {
  const router = useRouter()
  // const { partnerData } = pageProps
  if (router.isFallback) {
    return <OutterLoader />
  }
  
  if (props.error) {
    return <h1>{pageProps.error}</h1>
  }
  return (
    <InnerProductLayoutContent {...props}>
      <InjectStyles pageProps={{...props}}>

        {props.children}
      </InjectStyles>
    </InnerProductLayoutContent>
  )
}

export default InnerProductLayoutContainer
