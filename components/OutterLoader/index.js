import React from 'react'
import MainLoaderWrapper from './styled'

function OutterLoader() {
  return (
    <MainLoaderWrapper>
    <MainLoaderWrapper.LoaderVideo autoPlay loop muted playsInline>
      <source src="/videos/main-loader.webm" type="video/webm" />  
      <source src="/videos/main-loader.mp4" type="video/mp4" />  
    </MainLoaderWrapper.LoaderVideo>
  </MainLoaderWrapper>
  )
}

export default OutterLoader
