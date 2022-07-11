import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { axiosFetch } from 'src/services/fetch'
import { locStorage } from 'src/utils/localStorageUtils'

function AuthLayer(props) {
  // const router = useRouter()
  // const queryClient = useQueryClient()
  // const listenToStorage = () => {
  //   const user = locStorage.getItem('data')
  //   if (!user || router.query.logout) {
  //     queryClient.setQueryData(["loggedUser"], undefined)
  //     // queryClient.removeQueries(['loggedUser'])
  //     delete axiosFetch.defaults.headers.common.authorization
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('storage',listenToStorage);

  //   return () => {
  //     window.removeEventListener('storage', listenToStorage)
  //   }
  // }, [])
  useFetchLoggedUser(locStorage.getItem('data')?.id)

  return props.children
}

export default AuthLayer
