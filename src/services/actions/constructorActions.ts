import { IIngredient } from "../../utils/types";
export const SET_INITIAL_CONSTRUCTOR: 'SET_INITIAL_CONSTRUCTOR' = 'SET_INITIAL_CONSTRUCTOR';
export const ADD_CONSTRUCTOR_ITEM: 'ADD_CONSTRUCTOR_ITEM' = 'ADD_CONSTRUCTOR_ITEM';
export const DELETE_CONSTRUCTOR_ITEM: 'DELETE_CONSTRUCTOR_ITEM' = 'DELETE_CONSTRUCTOR_ITEM';
export const SWAP_ITEMS: 'SWAP_ITEMS' = 'SWAP_ITEMS';
export const SET_BUN_CHOSEN: 'SET_BUN_CHOSEN' = 'SET_BUN_CHOSEN';



interface ISetInitialConstructor {
    readonly type: typeof SET_INITIAL_CONSTRUCTOR;
}

interface IAddItem {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly payload: { item: IIngredient }
}

interface IDeleteItem {
    readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
    readonly payload: { index: string | undefined }
}

interface ISwapItems {
    readonly type: typeof SWAP_ITEMS;
    readonly payload: { index1: number, index2: number }
}

interface IIsBunChosen {
    readonly type: typeof SET_BUN_CHOSEN;
    readonly payload: { isBun: boolean }
}

export type TConstructorActions =
    | ISetInitialConstructor
    | IAddItem
    | IDeleteItem
    | ISwapItems
    | IIsBunChosen;


export const setInitialConstructor = (): ISetInitialConstructor => {
    return {
        type: SET_INITIAL_CONSTRUCTOR,
    };
}

export const addItem = (item: IIngredient): IAddItem => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        payload: { item },
    };
}

export const deleteItem = (index: string | undefined): IDeleteItem => {
    return {
        type: DELETE_CONSTRUCTOR_ITEM,
        payload: { index },
    };
}

export const swapItems = (index1: number, index2: number): ISwapItems => {
    return {
        type: SWAP_ITEMS,
        payload: { index1, index2 },
    };
}

export const isBunChosen = (isBun: boolean): IIsBunChosen => {
    return {
        type: SET_BUN_CHOSEN,
        payload: { isBun },
    };
}
