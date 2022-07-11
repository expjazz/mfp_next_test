import React from 'react'
import { useQuery } from 'react-query'

function UseQuery(props) {
  return props.children(useQuery(props.queryKey, props.fn, props.option))
}

export default UseQuery