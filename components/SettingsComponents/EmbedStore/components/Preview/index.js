import { DialogStyled } from './styled'
import Script from 'next/script'
import React from 'react'

function PreviewEs({open, setOpen, code}) {
  return (
      <DialogStyled
        open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: 'paper-root',
        }}
      >
      <>
        <Script
          dangerouslySetInnerHTML={{__html: code}}
        />

        <div id="starsona-store"/>

        </>

      </DialogStyled>

  )
}

export default PreviewEs
