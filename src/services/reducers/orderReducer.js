import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  SET_ORDER_DETAILS,
  SET_CURRENT_ORDER,
  DELETE_CURRENT_ORDER
} from '../actions/orderActions'


const initialState = {
  orderRequest: false,
  orderError: false,
  orderNumber: null,
  orderDetails: [],
  currentOrder: {}
}


export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderError: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequest: false
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderNumber: null,
        orderError: true,
        orderRequest: false
      };
    }
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload.items
      }

    case SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload
      }

    case DELETE_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload
      }

    default: {
      return state
    }
  }
} 