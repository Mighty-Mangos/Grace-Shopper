import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {removeCartItemThunk, editCartThunk} from '../store/cart'
import {
  attachQuantityToCartItem,
  checkInventoryCartItemToItems,
} from './utility'
import history from '../history'
import StickyCheckoutBox from './stickyCheckoutBox'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import EmptyShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

class DisconnectedCart extends Component {
  constructor() {
    super()
    this.state = {
      addCartIssue: false,
      message: '',
      snackOpen: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //SNACKBAR HANDLERS
  handleClick = () => {
    this.setState({
      snackOpen: true,
    })
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({
      snackOpen: false,
    })
  }

  handleSubmit(event, itemId) {
    event.preventDefault()
    let userId = this.props.cart[0].userId
    this.props.removeCartItem(userId, itemId)
  }

  render() {
    return (
      <Fragment>
        <div className="container-7">
          <div className="container-1">
            {!this.props.cart.length && (
              <div id="no-items">
                <EmptyShoppingCartIcon id="empty-cart-icon" />
                <div>Cart is Empty.</div>
              </div>
            )}
            {this.props.cart.map((item) => {
              return (
                <div key={item.itemId} className="container-2">
                  <div className="container-2-img">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="pointer"
                      onClick={() => {
                        history.push(`/items/${item.itemId}`)
                      }}
                    />
                  </div>
                  <div className="container-2a">
                    <div className="container-3">
                      <div className="line-item cart-title">{item.name}</div>
                      <div className="line-item">
                        Total Price: ${(item.quantity * item.price).toFixed(2)}
                      </div>
                      <div className="line-item container-5">
                        <div>Quantity: {item.quantity}</div>
                        {/* PLUS AND MINUS LOGIC */}
                        <div className="container-6">
                          <AddCircleIcon
                            id="plus-minus-icons"
                            onClick={async () => {
                              await this.setState({
                                addCartIssue: false,
                                message: '',
                              })
                              let check = checkInventoryCartItemToItems(
                                item,
                                this.props.items,
                                this.props.cart,
                                1
                              )
                              if (check) {
                                await this.setState({
                                  addCartIssue: check,
                                  message: 'Not enough in stock!',
                                })
                              }
                              if (!this.state.addCartIssue) {
                                let itemToSend = attachQuantityToCartItem(
                                  item,
                                  this.props.cart,
                                  1
                                )
                                this.props.updateCart({
                                  user: this.props.user,
                                  item: itemToSend,
                                })
                              }
                            }}
                          />
                          <RemoveCircleIcon
                            id="plus-minus-icons"
                            onClick={async () => {
                              await this.setState({
                                addCartIssue: false,
                                message: '',
                              })
                              let quantityCheck =
                                this.props.cart.filter((cartItem) => {
                                  return cartItem.itemId === item.itemId
                                })[0].quantity - 1
                              if (quantityCheck < 1) {
                                await this.setState({
                                  addCartIssue: item.itemId,
                                  message: "Can't be less than 1!",
                                })
                              } else {
                                let itemToSend = attachQuantityToCartItem(
                                  item,
                                  this.props.cart,
                                  -1
                                )
                                this.props.updateCart({
                                  user: this.props.user,
                                  item: itemToSend,
                                })
                              }
                            }}
                          />
                        </div>
                      </div>
                      {this.state.addCartIssue === item.itemId ? (
                        <div className="error">{this.state.message}</div>
                      ) : (
                        <div> </div>
                      )}
                    </div>
                    <DeleteIcon
                      id="delete-icon"
                      onClick={(event) => {
                        let itemId = item.itemId
                        this.handleSubmit(event, itemId)
                        this.handleClick()
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <StickyCheckoutBox />
        </div>
        <Snackbar
          open={this.state.snackOpen}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MuiAlert
            severity="info"
            elevation={6}
            variant="filled"
            onClose={this.handleClose}
          >
            Removed from cart
          </MuiAlert>
        </Snackbar>
      </Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    items: state.items,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (obj) => dispatch(editCartThunk(obj)),
    removeCartItem: (userId, itemId) =>
      dispatch(removeCartItemThunk(userId, itemId)),
  }
}
const Cart = connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)
export default Cart
