import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      //to check the product is exist in cart or not ,for that the current product (item.product) we want to add in cart should be check with the existing product in the cart (x.product)
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (x) => (x.product === existItem.product ? item : []) // we should map through the cartItems for each product to verify whether it is already in the cart or not if yes then return the item or else go with (x) state
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item], // take the exisiting state of the cartItems and append the new item to the state and return it
        }
      }

    default:
      return { state }
  }
}
