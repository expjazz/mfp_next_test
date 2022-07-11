import React from 'react';
import { StripeScriptLoader } from 'src/services/myfanpark/lazyLoad';
import GetPlace from './GetPlace';

const PlacesAutoComplete = (props) => {

  return (
    <StripeScriptLoader
      uniqueId='google-maps'
      script={`https://maps.googleapis.com/maps/api/js?key=${process.
                env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&libraries=places`}
      loader={props.loading || ''}
    >
      <GetPlace {...props} />
    </StripeScriptLoader>
  )
}

export default PlacesAutoComplete
