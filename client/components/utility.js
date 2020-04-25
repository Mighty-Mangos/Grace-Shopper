export const checkInventory = (item, allItems, cart, quantityToAdd) => {
  let totalAmtInventory = allItems.filter((eachItem) => {
    return eachItem.id === item.id
  })[0].quantity
  let cartItem = cart.filter((eachItem) => {
    return eachItem.itemId === item.id
  })[0]
  let totalCartInventory = cartItem ? cartItem.quantity : 0

  // if there isn't enough in inventory, return the item id that has the issue
  if (totalAmtInventory - totalCartInventory < quantityToAdd) {
    console.log('issue!')
    return item.id
  } else {
    console.log('gucci')
    return false
  }
}

export const attachQuantityToItem = (item, cart, quantityToAdd) => {
  let itemToSend = {...item}
  let itemInCart = cart.filter(
    (cartItem) => cartItem.itemId === itemToSend.id
  )[0]

  if (itemInCart) {
    itemToSend.quantity = itemInCart.quantity + quantityToAdd
  } else {
    itemToSend.quantity = quantityToAdd
  }

  return itemToSend
}

export const attachQuantityToCartItem = (item, cart, quantityToAdd) => {
  let itemToChange = {...item}
  let itemInCart = cart.filter(
    (cartItem) => cartItem.itemId === itemToChange.itemId
  )[0]

  itemToChange.quantity = itemInCart.quantity + quantityToAdd
  return itemToChange
}
