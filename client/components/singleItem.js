import React from 'react'
import {connect} from 'react-redux'
import {binarySearch} from './utility'
import Paper from '@material-ui/core/Paper'
import {Divider, Select, Button} from '@material-ui/core'
import {updateCartThunk} from '../store/cart'
import history from '../history'

function SingleItemView(props) {
  const allItems = props.allItems
  const itemId = props.match.params.id
  const item = binarySearch(allItems, itemId)

  //this is for setting the # on Select wheel
  const min = Math.min(10, item.quantity) || 0
  const arr = Array(min).fill('')

  return (
    <Paper className="single-item-page">
      <div className="single-item-page-container">
        <div className="single-item-image">
          <img src={item.imageUrl} alt={`${item.name} image`} />
        </div>
        <div className="description container-center-column ">
          <p className="title">{item.name && item.name.toUpperCase()}</p>

          <Divider />
          <div className="container-even-row price-quant">
            <p className="price">{`$${item.price}`}</p>
            <p className="price">Left in stock: {item.quantity}</p>
          </div>

          <p>QTY</p>
          <form onSubmit={(event) => props.handleSubmit(event, item, props)}>
            <Select native name="quantity">
              {arr.map((entry, idx) => {
                return (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}
                  </option>
                )
              })}
            </Select>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!item.quantity}
            >
              {item.quantity ? 'Add To Cart' : 'OUT OF STOCK'}
            </Button>
          </form>

          <p className="d">DESCRIPTION</p>
          <Divider />
          <p className="description-text">{item.description}</p>
        </div>
      </div>
    </Paper>
  )
}

const mapState = (state) => ({
  user: state.user,
  allItems: state.items,
})

const mapDispatch = (dispatch) => ({
  updateCart: (obj) => dispatch(updateCartThunk(obj)),
  handleSubmit: async function handleSubmit(event, currentItem, props) {
    event.preventDefault()
    const updatedItem = {
      ...currentItem,
      quantity: +event.target.quantity.value,
    }
    const objUserItem = {
      user: props.user,
      item: updatedItem,
    }
    await props.updateCart(objUserItem)
    history.push('/cart')
  },
})

export default connect(mapState, mapDispatch)(SingleItemView)
