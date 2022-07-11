import { useGetCelebrityData } from 'customHooks/reactQueryHooks'
import { StarGlobal } from '../styled'

function InjectStyles({children, pageProps}) {

  const { data: celebrityData } = useGetCelebrityData()
  return (
    <>
      <StarGlobal
        config={{
    ...celebrityData?.celebrity_details.page_color,
    ...celebrityData?.celebrity_details.page_font,

       } }
      />
      {children}
    </>
  )
}

export default InjectStyles
