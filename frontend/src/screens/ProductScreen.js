import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import { listProductDetails,reviewProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment,setComment] = useState('')


  const dispatch = useDispatch() //be aware of using useSelector
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails //should be declared outsie of useEffect()
  
  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {success: successReview, error: errorReview } = productReviewCreate
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
 
  
  useEffect(() => {
    if (successReview) {
      alert('click OK to submit review')
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_REVIEW_CREATE_RESET})
    }

    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reviewProduct(match.params.id,{
      rating,
      comment,
    }))
  }

 

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>

      {loading ? ( //use components  loading ,error ,product :> be aware of 'product' it is not 'products'
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (
            <>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>

              <ListGroupItem>{product.description}</ListGroupItem>

              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroupItem>

              <ListGroupItem>
                <h4>${product.price}</h4>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={e => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <Button
                  onClick={addToCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup>
            </Card>
          </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                    {product.reviews.map(review => (
                    <ListGroup.Item  key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt}</p>
                        <p>{ review.comment }</p>
                    </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h2>Write a customer review</h2>
                      {errorReview && <Message variant='danger'>{ errorReview }</Message>}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control as='select' value={rating}
                            onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1-Poor</option>
                            <option value='2'>2-Fair</option>
                            <option value='3'>3-Good</option>
                            <option value='4'>4-Verygood</option>
                            <option value='5'>5-Excellent</option>
                          </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as='textarea'
                              row={2}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Button type='submit' variant='primary' >
                              Submit
                            </Button>
                          </Form.Group>
                        </Form>
                      ):
                       (<Message>please <Link to='/login'>Sing In</Link> to write review </Message>) }
                    </ListGroup.Item>
                   </ListGroup>
                     
                </Col>
              </Row>
              </>
      )}
    </>
  )
}

export default ProductScreen
