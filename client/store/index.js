import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import itemsReducer from './items'
import userReducer from './user'
import allUsersReducer from './allUsers'
import cartReducer from './cart'
import searchReducer from './searchBar'

const reducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  cart: cartReducer,
  searchBar: searchReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

// after reducer is combined:
// reducer: {
//   items: [{}, {}, {},]
//   user: {},
//   cart: [{}, {}, {}]
// }
