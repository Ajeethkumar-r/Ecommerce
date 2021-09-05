import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer, // Get our 'productListReducer' for 'products' we have and set it to gobal state container using 'combineReducer()'
  productDetails: productDetailsReducer, // Get our 'productDetailsReducer' for 'single product' we have and set it to gobal state container using 'combineReducer()'
  cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')) // we parse the localStorage JSON file to use here
  : []
const intialState = {
  cart: { cartIems: cartItemsFromStorage }, // all the products are available as intialState bcoz  :> while we adding the product to the cart it is done by using the products we already have through 'productList and productDetails'
}

const middleware = [thunk]

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
