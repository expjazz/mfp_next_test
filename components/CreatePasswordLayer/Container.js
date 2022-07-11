// import CreatePassword from 'components/CreatePassword'
import { isBrowser } from 'customHooks/domUtils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
// import CreatePasswordLayer from '.'
const CreatePasswordLayer = dynamic(() => import('.'), {
  ssr: false
})
function CreatePasswordContainer(props) {
  const router = useRouter()
  if (isBrowser() && !router.isFallback) {
    return <CreatePasswordLayer>
      {props.children}
    </CreatePasswordLayer>
  }
  return props.children
}

export default CreatePasswordContainer
