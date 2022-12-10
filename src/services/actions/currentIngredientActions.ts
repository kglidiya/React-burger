import { IIngredient } from "../../utils/types";
export const SET_CURRENT_ITEM: 'SET_CURRENT_ITEM' = 'SET_CURRENT_ITEM';
export const DELETE_CURRENT_ITEM: 'DELETE_CURRENT_ITEM' = 'DELETE_CURRENT_ITEM';

interface ISetCurrentItem {
    readonly type: typeof SET_CURRENT_ITEM;
    readonly payload: { item: IIngredient }
}

interface IDeleteCurrentItem {
    readonly type: typeof DELETE_CURRENT_ITEM;
    readonly payload: { value: IIngredient }
}

export type TCurrentIngredientActions =
    | ISetCurrentItem
    | IDeleteCurrentItem;

export const setCurrentIngredient = (item: IIngredient): ISetCurrentItem => {
    return {
        type: SET_CURRENT_ITEM,
        payload: { item },
    };
}

export const deleteCurrentIngredient = (value: IIngredient): IDeleteCurrentItem => {

    return {
        type: DELETE_CURRENT_ITEM,
        payload: { value }
    };
}

