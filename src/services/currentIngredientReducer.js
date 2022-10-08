import {
  SET_CURRENT_ITEM,
  DELETE_CURRENT_ITEM,
} from './actions'



const initialState = {
  currentIngredient: {},
}


export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM:
      return {
        currentIngredient: action.payload.item
      }

    case DELETE_CURRENT_ITEM:
      return {
        currentIngredient: action.payload
      }

    default:
      return state
  }
}

