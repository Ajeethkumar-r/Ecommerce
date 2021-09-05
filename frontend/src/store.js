import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
const reducer = combineReducers({
  productList: productListReducer, // Get our 'productListReducer' for 'products' we have and set it to gobal state container using 'combineReducer()'
  productDetails: productDetailsReducer, // Get our 'productDetailsReducer' for 'single product' we have and set it to gobal state container using 'combineReducer()'
})

const intialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
