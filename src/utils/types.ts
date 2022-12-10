import { TConstructorActions } from "../services/actions/constructorActions";
import { TCurrentIngredientActions } from "../services/actions/currentIngredientActions";
import { TIngredientActions } from "../services/actions/ingredientsActions";
import { TOrderActions } from "../services/actions/orderActions";
import { TUserActions } from "../services/actions/usersActions";
import { TWsActions } from "../services/actions/wsActions";

export type TApplicationActions =
    | TConstructorActions
    | TCurrentIngredientActions
    | TIngredientActions
    | TOrderActions
    | TUserActions
    | TWsActions;

export interface IIngredient {
    'calories': number,
    'carbohydrates': number,
    'fat': number,
    'image': string,
    'image_large': string,
    'image_mobile': string,
    'name': string,
    'price': number,
    'proteins': number,
    'type': string,
    '__v': number,
    '_id': string,
    'uuid'?: string | undefined
}

export interface IWsResponse {
    orders: IOrder[],
    success: boolean,
    total: number,
    totalToday: number
}

export interface IOrder {
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}

export interface IOrderItemProps {
    order: IOrder,
    openPopup: (popup: string) => void,
    path: string,
    popup: string
}

export interface ICounts {
    [name: string]: number;
}