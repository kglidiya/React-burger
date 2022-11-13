export const SET_INITIAL_CONSTRUCTOR = 'SET_INITIAL_CONSTRUCTOR';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const SWAP_ITEMS = 'SWAP_ITEMS';
export const SET_BUN_CHOSEN = 'SET_BUN_CHOSEN';


export function setInitialConstructor() {
    return {
        type: SET_INITIAL_CONSTRUCTOR,
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

export function isBunChosen(isBun) {
    return {
        type: SET_BUN_CHOSEN,
        payload: isBun,
    };
}
