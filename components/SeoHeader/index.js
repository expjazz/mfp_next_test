import Head from 'next/head'
import { getCurrentUrl } from 'customHooks/domUtils'
import { useGetPartner } from 'customHooks/reactQueryHooks'
import React from 'react'

function SeoHeader({title, shareImage, description ,keywords, userId}) {
  const { data } = useGetPartner()
  let partnerData = data?.partnerData || {}
  const getMetaKeywords = () => {
    return keywords || ''
  }
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} data-react-helmet="true"/>
      <meta property="og:title" content={title} data-react-helmet="true"/>
      <meta property="og:image" content={shareImage} data-react-helmet="true"/>
      <meta property="og:secure_url" content={shareImage} data-react-helmet="true"/>
      <meta property="og:description" content={description} data-react-helmet="true"/>
      <meta property="og:site_name" content={partnerData.seo_site_name} data-react-helmet="true"/>
      <meta property="og:url" content={getCurrentUrl()} data-react-helmet="true"/>
      <meta property="og:type" content="website" data-react-helmet="true"/>
      <meta property="twitter:title" content={title} data-react-helmet="true"/>
      <meta property="twitter:image" content={shareImage} data-react-helmet="true"/>
      <meta property="twitter:site" content={partnerData.seo_site_name} data-react-helmet="true"/>
      <meta property="twitter:creator" content={partnerData.seo_site_name} data-react-helmet="true"/>
      <meta property="twitter:description" content={description} data-react-helmet="true"/>
      <meta property="keywords" content={getMetaKeywords()} data-react-helmet="true"/>
      <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_fbId} data-react-helmet="true"/>
      <meta property="google-play-app" content={`app-id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`} data-react-helmet="true"/>
      <meta property="al:ios:app_store_id" content={process.env.NEXT_PUBLIC_IOS_APP_ID} data-react-helmet="true"/>
      {userId && (

          <meta property="al:ios:url" content={`${process.env.NEXT_PUBLIC_ANDROID_APP_ID
      }://profile/?profile_id=${userId}`} data-react-helmet="true"/>
      )}
      <meta property="al:ios:app_name" content={process.env.NEXT_PUBLIC_IOS_APP_NAME} data-react-helmet="true"/>
      <meta property="al:android:package" content={process.env.NEXT_PUBLIC_ANDROID_APP_ID} data-react-helmet="true"/>
      {userId && (

        <meta property="al:android:url" content={`${process.env.NEXT_PUBLIC_ANDROID_APP_ID
  }://profile/?profile_id=${getUserId()}`} data-react-helmet="true"/>
)}

      <meta property="al:android:app_name" content={process.env.NEXT_PUBLIC_ANDROID_APP_NAME} data-react-helmet="true"/>
  </Head>
  )
}

export default SeoHeader
