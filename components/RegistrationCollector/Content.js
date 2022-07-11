import { useGetPartner } from 'customHooks/reactQueryHooks'
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser'
import React from 'react'
import { toggleRegCollector, useGeneral } from 'src/context/general'
import { locStorage } from 'src/utils/localStorageUtils'

function RegCollectorContent(props) {
  const { data: fanData } = useFetchLoggedUser()
  const [state, dispatch] = useGeneral()
  const { data: entityData } = useGetPartner()
  const isLoggedIn = !!fanData
  if (!isLoggedIn && !locStorage.getItem('regCollector') && !state?.modals?.regCollector && entityData?.partnerData?.entity_id !== 'SUPERSPORT-ZA-1') {
    toggleRegCollector(dispatch, true)
  }

  return null
}

export default RegCollectorContent
