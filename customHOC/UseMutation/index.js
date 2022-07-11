import React from 'react'
import { useMutation } from 'react-query'

function UseMutation(props) {
  return props.children(useMutation(props.fn, props.option))
}

export default UseMutation
