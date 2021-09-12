import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'

const ShippingScreen = ({ history }) => {
  const [address, setAddress] = useState('')
  const [postalcode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [placeState, setPlaceState] = useState('')
  const [city, setCity] = useState('')

  return (
    <FormContainer>
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>
    </FormContainer>
  )
}

export default ShippingScreen
