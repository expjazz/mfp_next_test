import { useGetPartner } from 'customHooks/reactQueryHooks';
import Head from 'next/head';
import React from 'react';

function Favicon() {
  const { data } =  useGetPartner()
  let faviconUrl;
  const entityId = data?.partnerData?.entity_id || ''
  if (entityId?.includes('SUPERSPORT')) {
    faviconUrl = "/images/favicon4.png"
  } else if (entityId?.includes('TTWITHME')) {
    faviconUrl = "/images/favicon.ico"
  } else {
    faviconUrl = "/images/favicon3.ico"
  }

  return (
      <Head>
        <title>{data?.partnerData?.seo_title}</title>
        <link rel="shortcut icon" href={faviconUrl} />
      </Head>
  );
}

export default Favicon;
