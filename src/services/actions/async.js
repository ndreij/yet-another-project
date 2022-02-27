import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  SEND_ORDER,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
} from '.';
import { baseUrl, checkResponse } from '../../api.js'

export function getIngredients() {

  return function (dispatch) {

    dispatch({
      type: GET_INGREDIENTS
    })
    fetch(`${baseUrl}/ingredients`)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            data: res.data
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
        }
      }).catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
}

export function sendOrder() {

  return function (dispatch, getState) {

    const cart = getState().miscList.cart
    const cartIds = cart.map(item => item._id);
    const wrappedCartIds = { ingredients: Object.values(cartIds) }

    dispatch({
      type: SEND_ORDER
    })
    fetch(`${baseUrl}/orders`, {
      method: 'POST',
      body: JSON.stringify(wrappedCartIds),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(checkResponse)
      .then(res => {
      if (res && res.success) {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: SEND_ORDER_FAILED
        })
      }
    }).catch(err => {
      dispatch({
        type: SEND_ORDER_FAILED
      })
    })
  }
}