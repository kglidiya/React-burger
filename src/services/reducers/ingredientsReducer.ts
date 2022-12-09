import {
    INGREDIENTS_ORDER_REQUEST,
    INGREDIENTS_ORDER_SUCCESS,
    INGREDIENTS_ORDER_ERROR,
    TIngredientActions
} from '../actions/ingredientsActions'
import { IIngredient } from '../../utils/types'

export type TIngredientsState = {
    ingredientsRequest: boolean,
    ingredientsError: boolean,
    ingredients: IIngredient[]
}

const initialState: TIngredientsState = {
    ingredientsRequest: false,
    ingredientsError: false,
    ingredients: []
}

export const ingredientsReducer = (state = initialState, action: TIngredientActions): TIngredientsState => {
    switch (action.type) {
        case INGREDIENTS_ORDER_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsError: false,
            };
        }
        case INGREDIENTS_ORDER_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload.ingredients,
                ingredientsRequest: false
            };
        }
        case INGREDIENTS_ORDER_ERROR: {
            return {
                ...state,
                ingredientsError: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state
        }
    }
} 