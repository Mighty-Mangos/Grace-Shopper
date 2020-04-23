import axios from 'axios'

// Action Types:
const GET_CART = 'GET_CART'
const CHECKOUT = 'CHECKOUT'

// Action Creators / Thunks
const getCart = (cartItems) => ({
  type: GET_CART,
  cartItems,
})

export const getCartThunk = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (error) {
      console.log('GetCart Thunk Error: ', error)
    }
  }
}

const checkout = (items) => ({
  type: CHECKOUT,
  items,
})
export const checkoutThunk = (checkoutObj) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/users/${checkoutObj.userId}/checkout`, checkoutObj)
      const {data} = await axios.put('/api/items/checkout', checkoutObj)
      dispatch(checkout(data))
    } catch (error) {
      console.log('Checkout Thunk Error:', error)
    }
  }
}

// Initial State
const defaultShoppingCart = []

/**
 * REDUCER
 */
export default function (state = defaultShoppingCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cartItems
    case CHECKOUT:
      return []
    default:
      return state
  }
}