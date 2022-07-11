import { useRouter } from "next/router"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

export const useLastParam = () => {
  const router = useRouter()
  const arr = router.pathname.split('/')
  return arr.length ? arr[arr.length - 1] : ''
}

export const useEntityLanguage = () => {
  const [cookies, setCookie, removeCookies] = useCookies(['NEXT_LOCALE']);
  const router = useRouter()
  const localeCookie = cookies['NEXT_LOCALE']
  useEffect(() => {
    if (localeCookie !== router.locale) {
      router.push(router.asPath, undefined, { locale: localeCookie })
    }
  }, [])
}