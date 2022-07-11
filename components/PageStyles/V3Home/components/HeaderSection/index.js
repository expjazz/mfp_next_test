import { useMediaQuery } from '@material-ui/core';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import React from 'react'
// import { useMedia } from '../../../../customHooks/domUtils';
import { HeadWrap, CustomStrong } from './styled'

function HeaderSection({ settings }) {
  const smallScreen = useMediaQuery('(max-width: 395px)');
  const { data: entityData } = useGetPartner()
  const treatHeadline = value => {
    if (value?.includes('[')) {
    return <h1 className="homepage-title">
      {value.split('[')[0]}
      {smallScreen && entityData?.partnerData?.entity_id !== 'SUPERSPORT-ZA-1' && <br />}
      <CustomStrong color={value.split('[')[1].split(']')[0].split(',')[0]} className='colored-main-title'>
      {value.split('[')[1].split(']')[0].split(',')[1]}

      </CustomStrong>
      {value.split(']')[1]}
    </h1>
    }
    return <h1>{value}</h1>
  }
  return (
    <HeadWrap className="title-header-wrapper">
      <div className="midle">
        {treatHeadline(settings.headline)}
        <p>
          {settings.subline}
        </p>
      </div>
    </HeadWrap>
  )
}

export default HeaderSection
