import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      history.push(`/search/${keyword}`)
      setKeyword('')
    } else {
      history.push('/')
      setKeyword('')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex flex-nowrap '>
      <Form.Control
        type='q'
        name='search'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='search...'
        className='mr-2-sm ml-5-sm  p-1 '
      ></Form.Control>
      <span className='p-1'></span>

      <Button type='submit' variant='outline-success' className='p-1'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
