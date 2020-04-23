import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Login, Signup, UserHome, CheckoutForm, Cart, SubmitPage} from './index'
import AllItems from './all-items'
import singleItem from './singleItem'
import ViewUsers from './viewUsers'
import {me} from '../store'
import {getItems} from '../store/items'
import {getCartThunk} from '../store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.getItems()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props.user
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/items" component={AllItems} />
        <Route path="/:sport/items" component={AllItems} />
        <Route path="/items/:id" component={singleItem} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={CheckoutForm} />
        <Route path="/submitPage" component={SubmitPage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {isLoggedIn && isAdmin && (
              <Switch>
                <Route path="/users" component={ViewUsers} />
              </Switch>
            )}
            <Route component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getItems: () => dispatch(getItems()),
    getCartItems: (userId) => dispatch(getCartThunk(userId)),
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}