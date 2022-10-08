import { INGEDIENTS_API, sendOrder } from "../utils/api";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_ALL_ITEMS = 'SET_ALL_ITEMS';
export const SET_INITIAL_CONSTRUCTOR = 'SET_INITIAL_CONSTRUCTOR';
export const SET_HAS_ERROR = 'SET_HAS_ERROR';
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const DELETE_CURRENT_ITEM = 'DELETE_CURRENT_ITEM';
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';
export const SWAP_ITEMS = 'SWAP_ITEMS';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const INGREDIENTS_ORDER_REQUEST = 'INGREDIENTS_ORDER_REQUEST';
export const INGREDIENTS_ORDER_SUCCESS = 'INGREDIENTS_ORDER_SUCCESS';
export const INGREDIENTS_ORDER_ERROR = 'INGREDIENTS_ORDER_ERROR';

export function setAllItems(items) {
  return {
    type: SET_ALL_ITEMS,
    payload: { items },
  };
}

export function setInitialConstructor(items) {
  return {
    type: SET_INITIAL_CONSTRUCTOR,
    payload: { items },
  };
}

export function shopIsLoading(isLoading) {
  return {
    type: SET_IS_LOADING,
    payload: { isLoading },
  };
}

export function shopHasError(hasError) {
  return {
    type: SET_HAS_ERROR,
    payload: { hasError },
  };
}

export function setCurrentIngredient(item) {
  return {
    type: SET_CURRENT_ITEM,
    payload: { item },
  };
}

export function deleteCurrentIngredient() {
  return {
    type: DELETE_CURRENT_ITEM,
    payload: {}
  };
}

export function setOrderDetails(items) {
  return {
    type: SET_ORDER_DETAILS,
    payload: { items },
  };
}

export function deleteItem(index) {
  return {
    type: DELETE_CONSTRUCTOR_ITEM,
    payload: { index },
  };
}

export function setOrderNumber(number) {
  return {
    type: GET_ORDER_NUMBER,
    payload: { number },
  };
}

export function deleteOrderNumber() {
  return {
    type: DELETE_ORDER_NUMBER,
    payload: null,
  };
}

export function swapItems(index1, index2) {
  return {
    type: SWAP_ITEMS,
    payload: { index1, index2 },
  };
}

export function getAllItems() {
  return (dispatch) => {
    const getIndredientsData = async () => {
      try {
        dispatch({
          type: INGREDIENTS_ORDER_REQUEST
        })
        await fetch(INGEDIENTS_API)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(res.status);
          })
          .then((data) => {
            dispatch({
              type: INGREDIENTS_ORDER_SUCCESS,
              ingredients: data.data
            })
          });
      } catch (error) {
        console.log(error)
        dispatch({
          type: INGREDIENTS_ORDER_ERROR
        })
      }
    };
    return getIndredientsData();
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

