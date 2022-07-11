import { useRouter } from 'next/router'
import {useEffect} from 'react'
import { generalLoader, useGeneral } from 'src/context/general'

const NavigationPrompt = ({when, message}) => {
  const dispatch = useGeneral()[1]
  const router = useRouter()
    useEffect(() => {
      const handleChange = url => {
        if(!when) return true
        const bool = message(url)
        if (!bool) {
          generalLoader(dispatch, false)
          throw Error('Stop redirect')
        }
      }
      router.events.on('routeChangeStart', handleChange)
      return () => {
        router.events.off('routeChangeStart', handleChange)
      }
    }, [when])

    return null;
}

export default NavigationPrompt;