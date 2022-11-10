import {
  sendOrder
} from "../../utils/api";
import {WS_SEND_MESSAGE} from '../actions/wsActions';
import { setInitialConstructor } from '../actions/constructorActions';
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const DELETE_CURRENT_ORDER = 'DELETE_CURRENT_ORDER'


export function setOrderDetails(items) {
  return {
    type: SET_ORDER_DETAILS,
    payload: { items },
  };
}

export function setCurrentOrder(order) {
  return {
    type: SET_CURRENT_ORDER,
    payload: { order },
  };
}

export function deleteCurrentOrder() {
  return {
    type: SET_CURRENT_ORDER,
    payload: {},
  };
}

export function getOrderNumber(ingredientsId, openPopup) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    sendOrder(ingredientsId)
      .then(data => {
        if (data.success === true) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orderNumber: data.order.number
          })
          openPopup('OrderPopup')
          dispatch(setInitialConstructor())
          dispatch({
            type: WS_SEND_MESSAGE,
            payload: data.order
          })
        } else {
          dispatch({
            type: GET_ORDER_ERROR
          })
        }
      }).catch(err => {
        console.log(err)
        dispatch({
          type: GET_ORDER_ERROR
        })
      })
  }
}

