import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner animation='border' margin='100px' height='100px' display='block'>
      <span class='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
