import {
  SET_INITIAL_CONSTRUCTOR,
  DELETE_CONSTRUCTOR_ITEM,
  SWAP_ITEMS,
} from '../actions/constructorActions'

function swapElements(arr, a, b) {
  return arr[a] = arr.splice(b, 1, arr[a])[0];
}

const initialState = {
  constructor: [],
}

export const constructorReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_INITIAL_CONSTRUCTOR:
      return {
        constructor: action.payload.items.slice(1, 2)
          .concat(action.payload.items.filter((_, i) => i === 1 || i === 9
            || i === 3 || i === 7 || i === 11))
      }
      
      case DELETE_CONSTRUCTOR_ITEM:
        return {
          constructor: state.constructor.filter((_, index) => index !== action.payload.index)
        }

    case SWAP_ITEMS:
      swapElements(state.constructor, action.payload.index1, action.payload.index2)
      return {
        constructor: state.constructor
      }

    default:
      return state;
  }
}
