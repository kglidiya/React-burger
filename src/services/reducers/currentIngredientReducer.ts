import {
  SET_CURRENT_ITEM,
  DELETE_CURRENT_ITEM,
  TCurrentIngredientActions
} from '../actions/currentIngredientActions'
import { IIngredient } from '../../utils/types'

export type TCurrentIngredientState = {
  currentIngredient: IIngredient
}

const initialState: TCurrentIngredientState = {
  currentIngredient: {} as IIngredient,
}


export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientState => {
  switch (action.type) {
    case SET_CURRENT_ITEM:
      return {
        currentIngredient: action.payload.item
      }

    case DELETE_CURRENT_ITEM:
      return {
        currentIngredient: action.payload.value
      }

    default:
      return state
  }
}

