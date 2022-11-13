import {
  SET_INITIAL_CONSTRUCTOR,
  DELETE_CONSTRUCTOR_ITEM,
  SWAP_ITEMS,
  SET_BUN_CHOSEN
} from '../actions/constructorActions'

function swapElements(arr, a, b) {
  return arr[a] = arr.splice(b, 1, arr[a])[0];
}

const initialState = {
  constructor: [],
  isBunChosen: false
}

export const constructorReducer = (state = initialState, action) => {

  switch (action.type) {

     case SET_INITIAL_CONSTRUCTOR:
      return {
        constructor: [],
        isBunChosen: false
      }


    case DELETE_CONSTRUCTOR_ITEM:
      return {
        ...state,
        constructor: state.constructor.filter((_, index) => index !== action.payload.index)
      }

    case SWAP_ITEMS:
      swapElements(state.constructor, action.payload.index1, action.payload.index2)
      return {
        ...state,
        constructor: state.constructor
      }

    case SET_BUN_CHOSEN:
      return {
        ...state,
        isBunChosen: action.payload
      }

    default:
      return state;
  }
}
