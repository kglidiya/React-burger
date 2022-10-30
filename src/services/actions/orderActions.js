import {
  sendOrder
} from "../../utils/api";
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export function setOrderDetails(items) {
  return {
    type: SET_ORDER_DETAILS,
    payload: { items },
  };
}

export function getOrderNumber(ingredientsId, openPopup) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    })
    sendOrder(ingredientsId)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status);
      })
      .then(data => {
        console.log(data)
        if (data.success === true) {

          dispatch({
            type: GET_ORDER_SUCCESS,
            orderNumber: data.order.number
          })
          openPopup('OrderPopup')
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

