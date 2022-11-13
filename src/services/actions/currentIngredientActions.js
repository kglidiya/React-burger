export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const DELETE_CURRENT_ITEM = 'DELETE_CURRENT_ITEM';


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

