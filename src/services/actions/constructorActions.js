export const SET_INITIAL_CONSTRUCTOR = 'SET_INITIAL_CONSTRUCTOR';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const SWAP_ITEMS = 'SWAP_ITEMS';


export function setInitialConstructor(items) {
    return {
        type: SET_INITIAL_CONSTRUCTOR,
        payload: { items },
    };
}


export function deleteItem(index) {
    return {
        type: DELETE_CONSTRUCTOR_ITEM,
        payload: { index },
    };
}


export function swapItems(index1, index2) {
    return {
        type: SWAP_ITEMS,
        payload: { index1, index2 },
    };
}


