import {
    INGREDIENTS_ORDER_REQUEST,
    INGREDIENTS_ORDER_SUCCESS,
    INGREDIENTS_ORDER_ERROR
} from './actions'

const initialState = {
    ingredientsRequest: false,
    ingredientsError: false,
    ingredients: []
}

export const ingredientsReducer = (state = initialState, action) => {
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
                ingredients: action.ingredients,
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