import {
  SET_INITIAL_CONSTRUCTOR,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  SWAP_ITEMS,
  SET_BUN_CHOSEN,
  TConstructorActions
} from '../actions/constructorActions'
import { IIngredient } from '../../utils/types'
import uuid from 'react-uuid';

function swapElements(arr: IIngredient[], a: number, b: number) {
  return arr[a] = arr.splice(b, 1, arr[a])[0];
}

export type TConstructorState = {
  constructor: IIngredient[];
  isBunChosen: boolean
}

const initialState: TConstructorState = {
  constructor: [],
  isBunChosen: false
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {

  switch (action.type) {

    case SET_INITIAL_CONSTRUCTOR:
      return {
        constructor: [] as any,
        isBunChosen: false
      }

    case ADD_CONSTRUCTOR_ITEM:
      const item = { ...action.payload.item, uuid: uuid() }
      return {
        ...state,
        constructor: [...state.constructor, item]
      }

    case DELETE_CONSTRUCTOR_ITEM:
      return {
        ...state,
        constructor: state.constructor.filter((el) => el.uuid !== action.payload.index)
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
        isBunChosen: action.payload.isBun
      }

    default:
      return state;
  }
}
