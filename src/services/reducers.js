import { ingredients } from '../utils/data'
import {
  SET_IS_LOADING,
  SET_ALL_ITEMS,
  SET_HAS_ERROR,
  SET_CURRENT_ITEM,
  DELETE_CURRENT_ITEM,
  SET_ORDER_DETAILS,
  DELETE_CONSTRUCTOR_ITEM,
  GET_ORDER_NUMBER,
  SWAP_ITEMS
} from './actions'

const initialState = {
  data: [],
  draggedElement: ingredients,
  isLoading: false,
  hasError: false,
  currentIngredient: {},
  orderDetails: [],
  orderNumber: null
}

function swapElements(arr, a, b) {
  return arr[a] = arr.splice(b, 1, arr[a])[0];
}

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM:
      return {
        ...state,
        currentIngredient: action.payload.item
      }

    case DELETE_CURRENT_ITEM:
      return {
        ...state,
        currentIngredient: action.payload
      }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }

    case SET_HAS_ERROR:
      return {
        ...state,
        hasError: action.payload.hasError
      }

    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload.items
      }

    case GET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload.number
      }

    default:
      return state
  }
}



export const draggableIngredientReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_ALL_ITEMS:
      return {
        ...state,
        data: action.payload.items
      }

    case SET_CURRENT_ITEM: {
      return {
        ...state,
        draggedElement: state.draggedElement
      };
    }

    case DELETE_CONSTRUCTOR_ITEM:
      return {
        ...state,
        draggedElement: state.draggedElement.filter((_, index) => index !== action.payload.index)
      }

    case SWAP_ITEMS:
      swapElements(state.draggedElement, action.payload.index1, action.payload.index2)
      return {
        ...state,
        draggedElement: state.draggedElement
      }

    default:
      return state;
  }
}
